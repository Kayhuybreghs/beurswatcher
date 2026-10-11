import {
  reels,
  selectReels,
  reelSourceUpdatedAt,
  type Reel,
} from '../app/reel-data.ts';
import { parseInstagramMedia } from '../app/instagram-media.ts';
import {
  instagramCredentials,
  instagramRuntimeConfig,
} from './instagram-connection.ts';
import { hashSecret } from './instagram-security.ts';
import {
  getInstagramStore,
  type createInstagramStore,
  type InstagramEditorialSettings,
} from './instagram-store.ts';

type Store = ReturnType<typeof createInstagramStore>;
type Credentials = { userId: string; username: string; accessToken: string };
type Status = 'connected' | 'waiting' | 'needs-reconnect' | 'unavailable';
export type InstagramAdminSnapshot = {
  configured: boolean;
  connection: {
    status: Status;
    checkedAt: string | null;
    expiresAt: string | null;
    message: string;
  };
  items: Reel[];
  settings: InstagramEditorialSettings;
  revision: string;
};
export class InstagramAdminDataError extends Error {
  readonly status: number;
  readonly retryAfter: number;
  constructor(
    code: 'invalid' | 'conflict' | 'cooldown',
    status: number,
    retryAfter = 0,
  ) {
    super(code);
    this.status = status;
    this.retryAfter = retryAfter;
  }
}
class ReadError extends Error {
  readonly reconnect: boolean;
  constructor(reconnect = false) {
    super('Instagram unavailable');
    this.reconnect = reconnect;
  }
}
const object = (value: unknown): Record<string, unknown> =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
const defaultSettings = (): InstagramEditorialSettings => ({
  mode: 'automatic',
  selectedIds: [],
  titles: {},
});
const staticCatalogue = () => selectReels(reels, undefined, 24);
/* eslint-disable no-control-regex -- Editorial titles must reject hidden control characters. */
const unsafeTitleCharacters =
  /[<>\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
/* eslint-enable no-control-regex */
const keyFor = (credentials: Credentials) =>
  hashSecret(`${credentials.userId}:${credentials.accessToken}`);
const iso = (value: number | null) =>
  value !== null && Number.isFinite(value)
    ? new Date(value).toISOString()
    : null;
const messages: Record<Status, string> = {
  connected: 'De laatste controle van @beurswatcher is geslaagd.',
  waiting:
    'Instagram is nog niet gecontroleerd. De bewaarde selectie blijft beschikbaar.',
  'needs-reconnect':
    'Meld je opnieuw aan bij Instagram om de verbinding te herstellen.',
  unavailable:
    'De controle is tijdelijk niet beschikbaar. De bewaarde selectie blijft beschikbaar.',
};

export function validateInstagramSettings(
  value: unknown,
  catalogue: Reel[],
): InstagramEditorialSettings {
  const input = object(value);
  if (
    Object.keys(input).some(
      (key) => !['mode', 'selectedIds', 'titles'].includes(key),
    ) ||
    (input.mode !== 'automatic' && input.mode !== 'manual') ||
    !Array.isArray(input.selectedIds) ||
    input.selectedIds.length > 6 ||
    !input.titles ||
    typeof input.titles !== 'object' ||
    Array.isArray(input.titles)
  )
    throw new InstagramAdminDataError('invalid', 400);
  const known = new Set(catalogue.map((item) => item.id));
  const selectedIds = input.selectedIds;
  if (
    selectedIds.some((id) => typeof id !== 'string' || !known.has(id)) ||
    new Set(selectedIds).size !== selectedIds.length
  )
    throw new InstagramAdminDataError('invalid', 400);
  const titles: Record<string, string> = {};
  for (const [id, title] of Object.entries(input.titles)) {
    if (
      !known.has(id) ||
      typeof title !== 'string' ||
      unsafeTitleCharacters.test(title)
    )
      throw new InstagramAdminDataError('invalid', 400);
    const plain = title.replace(/\s+/g, ' ').trim();
    if (Array.from(plain).length > 120)
      throw new InstagramAdminDataError('invalid', 400);
    if (plain) titles[id] = plain;
  }
  return {
    mode: input.mode as InstagramEditorialSettings['mode'],
    selectedIds: [...selectedIds],
    titles,
  };
}

export function applyInstagramCuration(
  catalogue: Reel[],
  settings: InstagramEditorialSettings,
): Reel[] {
  const valid = selectReels(catalogue, undefined, 30);
  const byId = new Map(valid.map((item) => [item.id, item]));
  const selected =
    settings.mode === 'manual'
      ? settings.selectedIds.flatMap((id) =>
          byId.has(id) ? [byId.get(id)!] : [],
        )
      : valid.slice(0, 6);
  return selected.slice(0, 6).map((item) => ({
    ...item,
    title: settings.titles[item.id] || item.title,
  }));
}

export function unavailableInstagramAdminSnapshot(
  configured = false,
): InstagramAdminSnapshot {
  return {
    configured,
    connection: {
      status: 'unavailable',
      checkedAt: null,
      expiresAt: null,
      message: messages.unavailable,
    },
    items: staticCatalogue(),
    settings: defaultSettings(),
    revision: '',
  };
}

// Injection is exclusively for local tests; HTTP requests never provide these dependencies.
export function createInstagramAdminData(dependencies: {
  store: Store;
  credentials: () => Promise<Credentials | null>;
  configured: () => boolean | Promise<boolean>;
  fetcher?: typeof fetch;
  now?: () => number;
}) {
  const { store } = dependencies;
  const now = dependencies.now ?? Date.now;
  const fetcher = dependencies.fetcher ?? fetch;
  const configured = async () => {
    try {
      return await dependencies.configured();
    } catch {
      return false;
    }
  };

  async function context() {
    const [saved, health, editorial, credentialResult] = await Promise.all([
      store.get(),
      store.health(),
      store.editorial(),
      dependencies.credentials().then(
        (credentials) => ({ credentials, failed: false }),
        () => ({ credentials: null, failed: true }),
      ),
    ]);
    const credentials = credentialResult.credentials;
    const validCredentials =
      credentials &&
      credentials.username === 'beurswatcher' &&
      /^\d{1,40}$/.test(credentials.userId)
        ? credentials
        : null;
    const credentialKey = validCredentials ? keyFor(validCredentials) : '';
    let status: Status;
    if (
      saved &&
      (saved.status === 'needs-reconnect' || saved.expiresAt <= now())
    )
      status = 'needs-reconnect';
    else if (credentialResult.failed || (credentials && !validCredentials))
      status = 'unavailable';
    else if (!validCredentials || health.credentialKey !== credentialKey)
      status = 'waiting';
    else status = health.status;
    const catalogue =
      health.mediaCheckedAt === null
        ? staticCatalogue()
        : selectReels(health.items, undefined, 30);
    return {
      saved,
      health,
      editorial,
      credentials: validCredentials,
      credentialKey,
      status,
      catalogue,
    };
  }
  type Context = Awaited<ReturnType<typeof context>>;
  async function snapshot(ctx: Context): Promise<InstagramAdminSnapshot> {
    const availableIds = new Set(ctx.catalogue.map((item) => item.id));
    // Historical overrides must not make the next edit fail validation after a Reel ages out.
    const settings = {
      ...ctx.editorial.settings,
      selectedIds: ctx.editorial.settings.selectedIds.filter((id) =>
        availableIds.has(id),
      ),
      titles: Object.fromEntries(
        Object.entries(ctx.editorial.settings.titles).filter(([id]) =>
          availableIds.has(id),
        ),
      ),
    };
    return {
      configured: await configured(),
      connection: {
        status: ctx.status,
        checkedAt:
          ctx.health.credentialKey === ctx.credentialKey
            ? iso(ctx.health.checkedAt)
            : null,
        expiresAt: ctx.saved ? iso(ctx.saved.expiresAt) : null,
        message: messages[ctx.status],
      },
      items: ctx.catalogue,
      settings,
      revision: ctx.editorial.revision,
    };
  }

  async function readMeta(url: URL, credentials: Credentials) {
    try {
      const response = await fetcher(url, {
        headers: { Authorization: `Bearer ${credentials.accessToken}` },
        cache: 'no-store',
        redirect: 'error',
        signal: AbortSignal.timeout(8000),
      });
      const raw = await response.text();
      if (raw.length > 262144) throw new ReadError();
      const payload: unknown = JSON.parse(
        raw.replace(
          /"(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
          (value) => (/^\d{16,}$/.test(value) ? `"${value}"` : value),
        ),
      );
      const error = object(object(payload).error);
      if (!response.ok || Object.keys(error).length)
        throw new ReadError(error.code === 190 || error.code === 102);
      return payload;
    } catch (error) {
      if (error instanceof ReadError) throw error;
      throw new ReadError();
    }
  }

  async function check(): Promise<InstagramAdminSnapshot> {
    const before = await context();
    // Missing configuration never consumes the cooldown or makes an upstream request.
    if (
      !before.credentials ||
      (before.status === 'needs-reconnect' &&
        before.saved &&
        before.saved.expiresAt <= now())
    )
      return snapshot(before);
    const claim = await store.claimCheck(now());
    if (!claim.allowed)
      throw new InstagramAdminDataError('cooldown', 429, claim.retryAfter);
    let status: Status = 'connected';
    let items: Reel[] | undefined;
    try {
      const identityPayload = object(
        await readMeta(
          new URL(
            'https://graph.instagram.com/v26.0/me?fields=user_id,username',
          ),
          before.credentials,
        ),
      );
      if (
        Array.isArray(identityPayload.data) &&
        identityPayload.data.length !== 1
      )
        throw new ReadError();
      const identity = Array.isArray(identityPayload.data)
        ? object(identityPayload.data[0])
        : identityPayload;
      const identityId =
        typeof identity.user_id === 'string'
          ? identity.user_id
          : typeof identity.user_id === 'number' &&
              Number.isSafeInteger(identity.user_id)
            ? String(identity.user_id)
            : '';
      if (
        identityId !== before.credentials.userId ||
        typeof identity.username !== 'string' ||
        identity.username.toLowerCase() !== 'beurswatcher'
      )
        throw new ReadError(true);
      const url = new URL(
        `https://graph.instagram.com/v26.0/${before.credentials.userId}/media`,
      );
      url.searchParams.set(
        'fields',
        'id,media_type,media_url,thumbnail_url,permalink,timestamp,username,caption',
      );
      url.searchParams.set('limit', '24');
      const media = await readMeta(url, before.credentials);
      if (!Array.isArray(object(media).data)) throw new ReadError();
      items = parseInstagramMedia(media, 'beurswatcher', 24);
    } catch (error) {
      status =
        error instanceof ReadError && error.reconnect
          ? 'needs-reconnect'
          : 'unavailable';
    }
    // A reconnection/token rotation while a request was pending invalidates that response.
    const current = await context();
    if (current.credentialKey === before.credentialKey) {
      if (items) {
        const freshIds = new Set(items.map((item) => item.id));
        const selectedIds =
          current.editorial.settings.mode === 'manual'
            ? current.editorial.settings.selectedIds
            : [];
        const retained = selectedIds.flatMap((id) => {
          const old =
            current.catalogue.find((item) => item.id === id) ||
            reels.find((item) => item.id === id);
          if (!old || freshIds.has(id)) return [];
          // A selected older Reel remains linkable after it ages out of the latest 24.
          const { videoUrl: _video, ...metadata } = old;
          return [
            {
              ...metadata,
              thumbnail:
                reels.find((known) => known.id === id)?.thumbnail ||
                '/beurswatcher-logo.jpeg',
            },
          ];
        });
        items = selectReels([...items, ...retained], undefined, 30);
      }
      await store.saveCheck(claim.lease, {
        status,
        checkedAt: now(),
        credentialKey: before.credentialKey,
        ...(items === undefined ? {} : { items }),
      });
    }
    return snapshot(await context());
  }

  return {
    async get() {
      return snapshot(await context());
    },
    check,
    async save(settings: unknown, revision: unknown) {
      if (typeof revision !== 'string' || !revision || revision.length > 128)
        throw new InstagramAdminDataError('invalid', 400);
      const ctx = await context();
      const validated = validateInstagramSettings(settings, [
        ...ctx.catalogue,
        ...staticCatalogue(),
      ]);
      if (!(await store.saveEditorial(validated, revision)))
        throw new InstagramAdminDataError('conflict', 409);
      return snapshot(await context());
    },
    async publicFeed() {
      let ctx = await context();
      const age = now() - (ctx.health.checkedAt ?? 0);
      const sameCredentials =
        ctx.credentialKey && ctx.health.credentialKey === ctx.credentialKey;
      const needsCheck =
        ctx.credentials &&
        ctx.status !== 'needs-reconnect' &&
        (!sameCredentials ||
          (ctx.status === 'connected' ? age >= 15 * 60000 : age >= 60000));
      if (needsCheck) {
        try {
          await check();
        } catch (error) {
          if (
            !(error instanceof InstagramAdminDataError && error.status === 429)
          )
            throw error;
        }
        ctx = await context();
      }
      // No stale video/CDN URLs in an offline fallback. Real permalink/title metadata is retained.
      const catalogue =
        ctx.status === 'connected'
          ? ctx.catalogue
          : ctx.catalogue.map(({ videoUrl: _video, ...item }) => ({
              ...item,
              thumbnail:
                reels.find((known) => known.id === item.id)?.thumbnail ||
                '/beurswatcher-logo.jpeg',
            }));
      return {
        items: applyInstagramCuration(catalogue, ctx.editorial.settings),
        status:
          ctx.status === 'needs-reconnect'
            ? ('unavailable' as const)
            : ctx.status,
        checkedAt:
          ctx.health.credentialKey === ctx.credentialKey
            ? iso(ctx.health.checkedAt)
            : null,
        selectionDate:
          ctx.health.mediaCheckedAt === null
            ? reelSourceUpdatedAt
            : iso(ctx.health.mediaCheckedAt),
      };
    },
  };
}

export function instagramAdminData() {
  return createInstagramAdminData({
    store: getInstagramStore(),
    credentials: instagramCredentials,
    configured: async () => {
      await instagramRuntimeConfig();
      return true;
    },
  });
}

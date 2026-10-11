import {
  createCipheriv,
  createDecipheriv,
  hkdfSync,
  randomBytes,
} from 'node:crypto';
import { getAdminConfig, readAdminSession } from './instagram-admin-auth.ts';
import {
  readInstagramConfig,
  type InstagramSetupConfig,
} from './instagram-security.ts';
import {
  getInstagramStore,
  type createInstagramStore,
} from './instagram-store.ts';

type Store = ReturnType<typeof createInstagramStore>;
type Environment = NodeJS.ProcessEnv;
export type InstagramRuntimeConfig = InstagramSetupConfig & {
  setupRevision?: string;
};
export type InstagramSetupStatus = {
  available: boolean;
  configured: boolean;
  source: 'environment' | 'saved' | 'none';
  appId: string | null;
  revision: string | null;
  redirectUri: string;
  privacyUri: string;
  username: string;
  locked: boolean;
  message: string;
};
const unavailable = () => new Error('Instagram setup unavailable');
const validAppId = (value: unknown): value is string =>
  typeof value === 'string' && /^\d{1,32}$/.test(value);
const validAppSecret = (value: unknown): value is string =>
  typeof value === 'string' && /^[\x21-\x7e]{32,256}$/.test(value);
const environmentOwnsSetup = (env: Environment) =>
  Boolean(env.INSTAGRAM_APP_ID || env.INSTAGRAM_APP_SECRET);

/** Separate purposes never reuse the session signing key or each other's derived key. */
export function deriveInstagramKey(
  master: string,
  purpose: 'setup' | 'oauth' | 'token',
): Buffer {
  if (typeof master !== 'string' || !/^[\x21-\x7e]{43,256}$/.test(master))
    throw unavailable();
  return Buffer.from(
    hkdfSync(
      'sha256',
      master,
      'beurswatcher:instagram:v1',
      `instagram:${purpose}:v1`,
      32,
    ),
  );
}
export function sealInstagramAppSecret(
  appId: string,
  secret: string,
  master: string,
): string {
  if (!validAppId(appId) || !validAppSecret(secret)) throw unavailable();
  const iv = randomBytes(12);
  const cipher = createCipheriv(
    'aes-256-gcm',
    deriveInstagramKey(master, 'setup'),
    iv,
  );
  cipher.setAAD(Buffer.from(`instagram:setup:v1:${appId}`));
  const encrypted = Buffer.concat([
    cipher.update(secret, 'utf8'),
    cipher.final(),
  ]);
  return [
    'v1',
    iv.toString('base64url'),
    encrypted.toString('base64url'),
    cipher.getAuthTag().toString('base64url'),
  ].join('.');
}
export function openInstagramAppSecret(
  appId: string,
  envelope: string,
  master: string,
): string {
  try {
    if (
      !validAppId(appId) ||
      typeof envelope !== 'string' ||
      envelope.length > 512
    )
      throw unavailable();
    const [version, ivText, encryptedText, tagText, extra] =
      envelope.split('.');
    if (version !== 'v1' || extra !== undefined) throw unavailable();
    const decode = (value: string) => {
      if (!/^[A-Za-z0-9_-]+$/.test(value || '')) throw unavailable();
      const bytes = Buffer.from(value, 'base64url');
      if (bytes.toString('base64url') !== value) throw unavailable();
      return bytes;
    };
    const iv = decode(ivText),
      encrypted = decode(encryptedText),
      tag = decode(tagText);
    if (
      iv.length !== 12 ||
      tag.length !== 16 ||
      encrypted.length < 32 ||
      encrypted.length > 256
    )
      throw unavailable();
    const cipher = createDecipheriv(
      'aes-256-gcm',
      deriveInstagramKey(master, 'setup'),
      iv,
    );
    cipher.setAAD(Buffer.from(`instagram:setup:v1:${appId}`));
    cipher.setAuthTag(tag);
    const secret = Buffer.concat([
      cipher.update(encrypted),
      cipher.final(),
    ]).toString('utf8');
    if (!validAppSecret(secret)) throw unavailable();
    return secret;
  } catch {
    throw unavailable();
  }
}

export async function resolveInstagramConfig(
  env: Environment,
  store: Pick<Store, 'setup'>,
): Promise<InstagramRuntimeConfig> {
  try {
    let appId = env.INSTAGRAM_APP_ID,
      appSecret = env.INSTAGRAM_APP_SECRET;
    let setupRevision: string | undefined;
    if (!environmentOwnsSetup(env)) {
      const saved = await store.setup();
      if (!saved) throw unavailable();
      appId = saved.appId;
      appSecret = openInstagramAppSecret(
        appId,
        saved.secret,
        env.INSTAGRAM_ADMIN_SESSION_SECRET || '',
      );
      setupRevision = saved.revision;
    }
    const config = readInstagramConfig({
      ...env,
      INSTAGRAM_APP_ID: appId,
      INSTAGRAM_APP_SECRET: appSecret,
      INSTAGRAM_USERNAME: env.INSTAGRAM_USERNAME || 'beurswatcher',
      INSTAGRAM_CONNECT_SECRET:
        env.INSTAGRAM_CONNECT_SECRET ||
        deriveInstagramKey(
          env.INSTAGRAM_ADMIN_SESSION_SECRET || '',
          'oauth',
        ).toString('base64url'),
      INSTAGRAM_TOKEN_ENCRYPTION_KEY:
        env.INSTAGRAM_TOKEN_ENCRYPTION_KEY ||
        deriveInstagramKey(
          env.INSTAGRAM_ADMIN_SESSION_SECRET || '',
          'token',
        ).toString('base64'),
    });
    return {
      ...config,
      ...(setupRevision === undefined ? {} : { setupRevision }),
    };
  } catch {
    throw unavailable();
  }
}

export function createInstagramSetupService(
  env: Environment,
  store: Store,
  now = Date.now,
) {
  const admin = () => getAdminConfig(env);
  async function status(): Promise<InstagramSetupStatus> {
    const { origin } = admin();
    const [saved, connection] = await Promise.all([store.setup(), store.get()]);
    const environment = environmentOwnsSetup(env);
    let configured = false;
    try {
      await resolveInstagramConfig(env, store);
      configured = true;
    } catch {
      /* Format/configuration check only; OAuth verifies credentials. */
    }
    const active =
      connection?.status === 'connected' && connection.expiresAt > now();
    return {
      available: true,
      configured,
      source: environment ? 'environment' : saved ? 'saved' : 'none',
      appId: environment
        ? validAppId(env.INSTAGRAM_APP_ID)
          ? env.INSTAGRAM_APP_ID
          : null
        : saved?.appId || null,
      revision: environment ? null : saved?.revision || null,
      redirectUri: `${origin}/api/instagram/callback`,
      privacyUri: `${origin}/privacy`,
      username: env.INSTAGRAM_USERNAME || 'beurswatcher',
      locked: environment || active,
      message: environment
        ? 'De appgegevens worden via de hosting beheerd. Je kunt ze hier niet wijzigen.'
        : active
          ? configured
            ? 'Er is een actieve Instagram-verbinding opgeslagen. De appgegevens zijn vergrendeld zolang deze verbinding actief is.'
            : 'Er is een bestaande verbinding opgeslagen, maar de appinstellingen kunnen niet worden gelezen. Laat de websitebeheerder de oorspronkelijke beveiligingssleutel of hostinginstellingen herstellen.'
          : configured
            ? 'De appgegevens zijn opgeslagen. Geef via Instagram toestemming om de verbinding te controleren en af te ronden.'
            : saved
              ? 'De opgeslagen appgegevens kunnen niet worden gebruikt. Voer ze opnieuw in.'
              : 'Vul de Instagram-appgegevens uit Meta in. Daarna geef je via Instagram toestemming.',
    };
  }
  const json = (body: object, code = 200) =>
    Response.json(body, {
      status: code,
      headers: {
        'Cache-Control': 'no-store',
        'Referrer-Policy': 'no-referrer',
      },
    });
  const fail = (code: string, statusCode: number, error: string) =>
    json({ error, code }, statusCode);
  async function handle(request: Request): Promise<Response> {
    try {
      const config = admin();
      if (!readAdminSession(request, env))
        return fail(
          'unauthorized',
          401,
          'Log opnieuw in om de koppeling in te stellen.',
        );
      const origin = request.headers.get('origin');
      const site = request.headers.get('sec-fetch-site');
      const canonical = new URL(config.origin);
      const address = new URL(request.url);
      const host = request.headers.get('host');
      // NextURL normalizes loopback IPs to localhost. Accept that rewrite only
      // in development and only when the original Host still matches exactly.
      // Forwarded host/protocol headers are deliberately not trusted here.
      const normalizedLoopback =
        env.NODE_ENV === 'development' &&
        ['127.0.0.1', '[::1]'].includes(canonical.hostname) &&
        address.hostname === 'localhost' &&
        address.protocol === canonical.protocol &&
        address.port === canonical.port &&
        host === canonical.host;
      if (
        (host !== null && host !== canonical.host) ||
        (address.origin !== config.origin && !normalizedLoopback) ||
        (origin !== null && origin !== config.origin) ||
        (site !== null && site !== 'same-origin') ||
        (request.method !== 'GET' && origin !== config.origin)
      )
        return fail(
          'forbidden',
          403,
          'Open het beheer opnieuw op deze website.',
        );
      if (request.method === 'GET') return json(await status());
      if (request.method !== 'PUT')
        return fail('invalid', 405, 'Deze aanvraag is niet toegestaan.');
      if (
        request.headers
          .get('content-type')
          ?.split(';')[0]
          .trim()
          .toLowerCase() !== 'application/json'
      )
        return fail('invalid', 400, 'De appgegevens zijn niet geldig.');
      const MAX_BYTES = 16384;
      const declared = request.headers.get('content-length');
      if (declared && (!/^\d+$/.test(declared) || Number(declared) > MAX_BYTES))
        return fail('too-large', 413, 'De aanvraag is te groot.');
      const reader = request.body?.getReader();
      if (!reader)
        return fail(
          'invalid',
          400,
          'Vul de Instagram App ID en App Secret in.',
        );
      const chunks: Uint8Array[] = [];
      let size = 0;
      try {
        while (true) {
          const part = await reader.read();
          if (part.done) break;
          size += part.value.byteLength;
          if (size > MAX_BYTES) {
            await reader.cancel();
            return fail('too-large', 413, 'De aanvraag is te groot.');
          }
          chunks.push(part.value);
        }
      } finally {
        reader.releaseLock();
      }
      let input: unknown;
      try {
        input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      } catch {
        return fail('invalid', 400, 'De appgegevens zijn niet geldig.');
      }
      if (!input || typeof input !== 'object' || Array.isArray(input))
        return fail('invalid', 400, 'De appgegevens zijn niet geldig.');
      const fields = input as Record<string, unknown>;
      if (
        Object.keys(fields).some(
          (key) =>
            !['appId', 'appSecret', 'revision', 'confirmChange'].includes(key),
        ) ||
        !validAppId(fields.appId) ||
        !validAppSecret(fields.appSecret) ||
        !(
          fields.revision === null ||
          (typeof fields.revision === 'string' &&
            /^[a-f0-9-]{36}$/.test(fields.revision))
        ) ||
        (fields.confirmChange !== undefined && fields.confirmChange !== true)
      )
        return fail(
          'invalid',
          400,
          'Gebruik een Instagram App ID van 1–32 cijfers en een App Secret van 32–256 tekens zonder spaties.',
        );
      if (environmentOwnsSetup(env))
        return fail(
          'environment-managed',
          409,
          'Deze appgegevens worden via de hosting beheerd.',
        );
      if (fields.revision !== null && fields.confirmChange !== true)
        return fail(
          'confirmation-required',
          409,
          'Bevestig eerst dat je de opgeslagen appgegevens wilt vervangen.',
        );
      const result = await store.saveSetup(
        fields.appId,
        sealInstagramAppSecret(fields.appId, fields.appSecret, config.secret),
        fields.revision,
        now(),
      );
      if (result.error)
        return fail(
          result.error,
          409,
          result.error === 'active-connection'
            ? 'Instagram is actief verbonden. De appgegevens kunnen nu niet worden gewijzigd.'
            : 'De appgegevens zijn ondertussen gewijzigd. Laad de instellingen opnieuw.',
        );
      return json(await status());
    } catch {
      return fail(
        'unavailable',
        503,
        'De instellingen zijn tijdelijk niet beschikbaar. Probeer het later opnieuw.',
      );
    }
  }
  return { status, handle };
}

export function instagramSetupService() {
  return createInstagramSetupService(process.env, getInstagramStore());
}

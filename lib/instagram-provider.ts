import type { InstagramSetupConfig } from './instagram-security.ts';

export class InstagramProviderError extends Error {
  readonly reconnect: boolean;
  constructor(reconnect = false) {
    super('Instagram is tijdelijk niet beschikbaar');
    this.reconnect = reconnect;
  }
}

type Json = Record<string, unknown>;
const object = (value: unknown): Json =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Json)
    : {};
const first = (value: unknown): Json => {
  const body = object(value);
  return Array.isArray(body.data) ? object(body.data[0]) : body;
};
const tokenValue = (value: unknown): string => {
  if (typeof value !== 'string' || value.length < 10 || value.length > 8192)
    throw new InstagramProviderError();
  return value;
};
const identifier = (value: unknown): string => {
  if (typeof value !== 'string' && typeof value !== 'number')
    throw new InstagramProviderError();
  if (typeof value === 'number' && !Number.isSafeInteger(value))
    throw new InstagramProviderError();
  const id = String(value);
  if (!/^\d{1,40}$/.test(id)) throw new InstagramProviderError();
  return id;
};

async function requestJson(
  url: URL | string,
  init?: RequestInit,
): Promise<unknown> {
  // Token-exchange URLs are required by Meta. Never log URL, response, or caught errors.
  try {
    const response = await fetch(url, {
      ...init,
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(10000),
    });
    // Preserve large integer IDs before JSON.parse can round them. The first
    // alternative consumes entire JSON strings, so digits inside tokens stay intact.
    const raw = await response.text();
    const lossless = raw.replace(
      /"(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
      (value) => (/^\d{16,}$/.test(value) ? `"${value}"` : value),
    );
    const body: unknown = JSON.parse(lossless);
    const error = object(object(body).error);
    if (!response.ok || Object.keys(error).length)
      throw new InstagramProviderError(
        error.code === 190 || error.code === 102,
      );
    return body;
  } catch (error) {
    if (error instanceof InstagramProviderError) throw error;
    throw new InstagramProviderError();
  }
}

export function instagramAuthorizeUrl(
  config: InstagramSetupConfig,
  state: string,
) {
  const url = new URL('https://www.instagram.com/oauth/authorize');
  url.search = new URLSearchParams({
    client_id: config.appId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: 'instagram_business_basic',
    state,
    enable_fb_login: 'false',
    force_reauth: 'true',
  }).toString();
  return url.href;
}

function longToken(body: unknown) {
  const data = first(body);
  if (
    typeof data.expires_in !== 'number' ||
    !Number.isFinite(data.expires_in) ||
    data.expires_in < 86400 ||
    data.expires_in > 90 * 86400
  )
    throw new InstagramProviderError();
  return {
    accessToken: tokenValue(data.access_token),
    expiresIn: data.expires_in,
  };
}

export async function exchangeInstagramCode(
  config: InstagramSetupConfig,
  code: string,
) {
  const form = new FormData();
  Object.entries({
    client_id: config.appId,
    client_secret: config.appSecret,
    grant_type: 'authorization_code',
    redirect_uri: config.redirectUri,
    code,
  }).forEach(([key, value]) => form.set(key, value));
  const short = first(
    await requestJson('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body: form,
    }),
  );
  const shortToken = tokenValue(short.access_token);
  const shortUserId = identifier(short.user_id);
  if (short.permissions !== undefined) {
    const permissions = Array.isArray(short.permissions)
      ? short.permissions
      : (typeof short.permissions === 'string' ? short.permissions : '')
          .split(',')
          .map((s) => s.trim());
    if (!permissions.includes('instagram_business_basic'))
      throw new InstagramProviderError(true);
  }
  const url = new URL('https://graph.instagram.com/access_token');
  url.search = new URLSearchParams({
    grant_type: 'ig_exchange_token',
    client_secret: config.appSecret,
    access_token: shortToken,
  }).toString();
  const token = longToken(await requestJson(url));
  const identity = first(
    await requestJson(
      'https://graph.instagram.com/v26.0/me?fields=user_id,username',
      {
        headers: { Authorization: `Bearer ${token.accessToken}` },
      },
    ),
  );
  const userId = identifier(identity.user_id);
  if (userId !== shortUserId || typeof identity.username !== 'string')
    throw new InstagramProviderError();
  return { ...token, userId, username: identity.username.toLowerCase() };
}

export async function refreshInstagramToken(accessToken: string) {
  const url = new URL('https://graph.instagram.com/refresh_access_token');
  url.search = new URLSearchParams({
    grant_type: 'ig_refresh_token',
    access_token: accessToken,
  }).toString();
  return longToken(await requestJson(url));
}

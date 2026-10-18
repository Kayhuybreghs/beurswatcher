import type {
  InstagramNotice,
  InstagramSetupConfig,
} from './instagram-security.ts';

export type InstagramProviderFailure =
  | 'app-configuration'
  | 'permission-required'
  | 'provider-unavailable'
  | 'provider-error';

export class InstagramProviderError extends Error {
  readonly reconnect: boolean;
  readonly reason: InstagramProviderFailure;
  constructor(
    reconnect = false,
    reason: InstagramProviderFailure = 'provider-error',
  ) {
    super('Instagram is tijdelijk niet beschikbaar');
    this.reconnect = reconnect;
    this.reason = reason;
  }
}

type Json = Record<string, unknown>;
const object = (value: unknown): Json =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Json)
    : {};

function namedFailure(value: unknown): InstagramProviderFailure {
  // Classify only machine-readable values, never message text, URLs or secrets.
  // Unknown OAuthException responses do not establish a particular root cause.
  switch (value) {
    case 'invalid_client':
    case 'unauthorized_client':
    case 'redirect_uri_mismatch':
    case 'invalid_redirect_uri':
      return 'app-configuration';
    case 'invalid_scope':
    case 'insufficient_scope':
    case 'insufficient_permissions':
      return 'permission-required';
    case 'temporarily_unavailable':
    case 'server_error':
      return 'provider-unavailable';
    default:
      return 'provider-error';
  }
}

/** Call only after verifying OAuth state and consuming the one-time flow. */
export function instagramAuthorizationNotice(
  params: URLSearchParams,
): InstagramNotice | null {
  if (!params.has('error')) return null;
  if (
    params.getAll('error').length !== 1 ||
    params.getAll('error_reason').length > 1
  )
    return 'provider-error';
  const error = params.get('error');
  const reason = params.get('error_reason');
  if (
    error === 'access_denied' &&
    (reason === null || reason === 'user_denied')
  )
    return 'cancelled';
  return namedFailure(error);
}

function responseFailure(status: number, body: unknown) {
  const root = object(body);
  const error = object(root.error);
  const code = error.code;
  const reconnect = code === 190 || code === 102;
  let reason: InstagramProviderFailure;
  if (
    status === 429 ||
    status >= 500 ||
    error.is_transient === true ||
    code === 1 ||
    code === 2 ||
    code === 4 ||
    code === 17 ||
    code === 32 ||
    code === 613
  )
    reason = 'provider-unavailable';
  else if (code === 10 || code === 200) reason = 'permission-required';
  else
    reason = namedFailure(
      typeof root.error === 'string'
        ? root.error
        : error.type || root.error_type,
    );
  return new InstagramProviderError(reconnect, reason);
}

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
  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    throw new InstagramProviderError(false, 'provider-unavailable');
  }
  try {
    // Preserve large integer IDs before JSON.parse can round them. The first
    // alternative consumes entire JSON strings, so digits inside tokens stay intact.
    const raw = await response.text();
    const lossless = raw.replace(
      /"(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
      (value) => (/^\d{16,}$/.test(value) ? `"${value}"` : value),
    );
    const body: unknown = JSON.parse(lossless);
    const root = object(body);
    if (!response.ok || root.error || root.error_type)
      throw responseFailure(response.status, body);
    return body;
  } catch (error) {
    if (error instanceof InstagramProviderError) throw error;
    throw responseFailure(response.status, null);
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
      throw new InstagramProviderError(true, 'permission-required');
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

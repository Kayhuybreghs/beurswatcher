import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from 'node:crypto';

// Server-side only: deliberately imports Node crypto rather than client code.
export type InstagramSetupConfig = {
  appId: string;
  appSecret: string;
  origin: string;
  redirectUri: string;
  connectSecret: string;
  encryptionKey: Buffer;
  username: string;
};

export type InstagramNotice =
  | 'connected'
  | 'cancelled'
  | 'wrong-account'
  | 'expired'
  | 'error';

const INVITE_TTL = 7 * 24 * 60 * 60 * 1000;
const FLOW_TTL = 10 * 60 * 1000;
const NOTICE_TTL = 5 * 60 * 1000;
const MAX_SIGNED_LENGTH = 1024;
const MAX_TOKEN_BYTES = 8192;
const TOKEN_AAD = Buffer.from('instagram:token:v1', 'utf8');
const notices = new Set<InstagramNotice>([
  'connected',
  'cancelled',
  'wrong-account',
  'expired',
  'error',
]);
type Purpose = 'invite' | 'flow' | 'notice';
type SignedPayload = Record<string, unknown> & {
  purpose: Purpose;
  issuedAt: number;
  expiresAt: number;
};

const configurationError = () =>
  new Error('Instagram setup is not configured correctly');
const validSecret = (value: unknown): value is string =>
  typeof value === 'string' && /^[\x21-\x7e]{43,256}$/.test(value);
const validTime = (value: unknown): value is number =>
  typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;

function decode(value: string, maxBytes: number): Buffer | null {
  if (
    !value ||
    value.length > Math.ceil((maxBytes * 4) / 3) ||
    !/^[A-Za-z0-9_-]+$/.test(value)
  )
    return null;
  const bytes = Buffer.from(value, 'base64url');
  return bytes.length <= maxBytes && bytes.toString('base64url') === value
    ? bytes
    : null;
}

const validNonce = (value: unknown): value is string =>
  typeof value === 'string' &&
  value.length === 43 &&
  decode(value, 32)?.length === 32;

/** Secrets must be independently generated; string length cannot prove entropy. */
export function readInstagramConfig(
  env: NodeJS.ProcessEnv = process.env,
): InstagramSetupConfig {
  const appId = env.INSTAGRAM_APP_ID;
  const appSecret = env.INSTAGRAM_APP_SECRET;
  const origin =
    env.NODE_ENV === 'development' && env.INSTAGRAM_DEVELOPMENT_ORIGIN
      ? env.INSTAGRAM_DEVELOPMENT_ORIGIN
      : env.BEURSWATCHER_SITE_URL;
  const connectSecret = env.INSTAGRAM_CONNECT_SECRET;
  const encodedKey = env.INSTAGRAM_TOKEN_ENCRYPTION_KEY;
  const username = env.INSTAGRAM_USERNAME ?? 'beurswatcher';
  try {
    if (
      !appId ||
      !/^\d{1,32}$/.test(appId) ||
      !appSecret ||
      !/^[\x21-\x7e]{32,256}$/.test(appSecret)
    )
      throw configurationError();
    if (!origin || origin.length > 256) throw configurationError();
    const url = new URL(origin);
    const localDevelopment =
      env.NODE_ENV === 'development' &&
      ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
    if (
      origin !== url.origin ||
      url.username ||
      url.password ||
      (url.protocol !== 'https:' &&
        !(localDevelopment && url.protocol === 'http:'))
    )
      throw configurationError();
    if (
      !validSecret(connectSecret) ||
      !encodedKey ||
      !/^[A-Za-z0-9+/]{43}=$/.test(encodedKey)
    )
      throw configurationError();
    const encryptionKey = Buffer.from(encodedKey, 'base64');
    if (
      encryptionKey.length !== 32 ||
      encryptionKey.toString('base64') !== encodedKey ||
      connectSecret === encodedKey ||
      connectSecret === appSecret
    )
      throw configurationError();
    if (
      !/^[a-z0-9_](?:[a-z0-9_.]{0,28}[a-z0-9_])?$/.test(username) ||
      username.includes('..')
    )
      throw configurationError();
    return {
      appId,
      appSecret,
      origin,
      redirectUri: `${origin}/api/instagram/callback`,
      connectSecret,
      encryptionKey,
      username,
    };
  } catch {
    // Never attach environment values or upstream errors to a public exception.
    throw configurationError();
  }
}

function sign(payload: SignedPayload, secret: string): string {
  if (
    !validSecret(secret) ||
    !validTime(payload.issuedAt) ||
    !validTime(payload.expiresAt)
  )
    throw configurationError();
  const body = Buffer.from(JSON.stringify(payload), 'utf8').toString(
    'base64url',
  );
  const signature = createHmac('sha256', secret)
    .update(`instagram:${payload.purpose}:v1:${body}`)
    .digest('base64url');
  const result = `v1.${body}.${signature}`;
  if (result.length > MAX_SIGNED_LENGTH) throw configurationError();
  return result;
}

function verify(
  token: string,
  secret: string,
  purpose: Purpose,
  ttl: number,
  now: number,
): SignedPayload | null {
  if (
    typeof token !== 'string' ||
    token.length > MAX_SIGNED_LENGTH ||
    !validSecret(secret) ||
    !validTime(now)
  )
    return null;
  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== 'v1') return null;
  const body = decode(parts[1], 640);
  const signature = decode(parts[2], 32);
  if (!body || signature?.length !== 32) return null;
  const expected = createHmac('sha256', secret)
    .update(`instagram:${purpose}:v1:${parts[1]}`)
    .digest();
  if (!timingSafeEqual(signature, expected)) return null;
  try {
    const payload = JSON.parse(body.toString('utf8')) as SignedPayload | null;
    if (
      !payload ||
      Array.isArray(payload) ||
      payload.purpose !== purpose ||
      !validTime(payload.issuedAt) ||
      !validTime(payload.expiresAt)
    )
      return null;
    if (
      payload.issuedAt > now ||
      payload.expiresAt <= now ||
      payload.expiresAt <= payload.issuedAt ||
      payload.expiresAt - payload.issuedAt > ttl
    )
      return null;
    return payload;
  } catch {
    return null;
  }
}

/** One-time use is enforced separately by consuming the nonce in durable storage. */
export function createInvite(
  secret: string,
  now = Date.now(),
  ttlMs = INVITE_TTL,
): string {
  if (!Number.isSafeInteger(ttlMs) || ttlMs <= 0 || ttlMs > INVITE_TTL)
    throw configurationError();
  return sign(
    {
      purpose: 'invite',
      nonce: randomBytes(32).toString('base64url'),
      issuedAt: now,
      expiresAt: now + ttlMs,
    },
    secret,
  );
}

export function verifyInvite(
  token: string,
  secret: string,
  now = Date.now(),
): { nonce: string; expiresAt: number } | null {
  const payload = verify(token, secret, 'invite', INVITE_TTL, now);
  return payload && validNonce(payload.nonce)
    ? { nonce: payload.nonce, expiresAt: payload.expiresAt }
    : null;
}

/** The signed cookie must be HttpOnly, SameSite=Lax and Secure on HTTPS. */
export function createFlow(
  secret: string,
  inviteNonce: string,
  now = Date.now(),
  setupRevision?: string,
): { state: string; cookie: string } {
  if (!validNonce(inviteNonce)) throw configurationError();
  if (setupRevision !== undefined && !/^[a-f0-9-]{36}$/.test(setupRevision))
    throw configurationError();
  const nonce = randomBytes(32).toString('base64url');
  return {
    state: nonce,
    cookie: sign(
      {
        purpose: 'flow',
        inviteNonce,
        nonce,
        issuedAt: now,
        expiresAt: now + FLOW_TTL,
        ...(setupRevision === undefined ? {} : { setupRevision }),
      },
      secret,
    ),
  };
}

export function verifyFlow(
  state: string,
  cookie: string,
  secret: string,
  now = Date.now(),
): { inviteNonce: string; nonce: string; setupRevision?: string } | null {
  if (!validNonce(state)) return null;
  const payload = verify(cookie, secret, 'flow', FLOW_TTL, now);
  if (
    !payload ||
    !validNonce(payload.nonce) ||
    !validNonce(payload.inviteNonce) ||
    (payload.setupRevision !== undefined &&
      (typeof payload.setupRevision !== 'string' ||
        !/^[a-f0-9-]{36}$/.test(payload.setupRevision)))
  )
    return null;
  return timingSafeEqual(Buffer.from(state), Buffer.from(payload.nonce))
    ? {
        inviteNonce: payload.inviteNonce,
        nonce: payload.nonce,
        ...(payload.setupRevision === undefined
          ? {}
          : { setupRevision: payload.setupRevision as string }),
      }
    : null;
}

export function createNotice(
  result: InstagramNotice,
  secret: string,
  now = Date.now(),
): string {
  if (!notices.has(result)) throw configurationError();
  return sign(
    { purpose: 'notice', result, issuedAt: now, expiresAt: now + NOTICE_TTL },
    secret,
  );
}

export function verifyNotice(
  cookie: string,
  secret: string,
  now = Date.now(),
): InstagramNotice | null {
  const payload = verify(cookie, secret, 'notice', NOTICE_TTL, now);
  return payload && notices.has(payload.result as InstagramNotice)
    ? (payload.result as InstagramNotice)
    : null;
}

function tokenKey(key: Uint8Array): Buffer {
  if (!(key instanceof Uint8Array) || key.byteLength !== 32)
    throw new Error('Instagram token unavailable');
  return Buffer.from(key);
}

export function sealToken(token: string, key: Uint8Array): string {
  if (
    typeof token !== 'string' ||
    !token.length ||
    Buffer.byteLength(token, 'utf8') > MAX_TOKEN_BYTES
  )
    throw new Error('Instagram token unavailable');
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', tokenKey(key), iv);
  cipher.setAAD(TOKEN_AAD);
  const ciphertext = Buffer.concat([
    cipher.update(token, 'utf8'),
    cipher.final(),
  ]);
  return [
    'v1',
    iv.toString('base64url'),
    ciphertext.toString('base64url'),
    cipher.getAuthTag().toString('base64url'),
  ].join('.');
}

export function openToken(envelope: string, key: Uint8Array): string {
  try {
    if (typeof envelope !== 'string' || envelope.length > 11000)
      throw new Error();
    const parts = envelope.split('.');
    if (parts.length !== 4 || parts[0] !== 'v1') throw new Error();
    const iv = decode(parts[1], 12);
    const ciphertext = decode(parts[2], MAX_TOKEN_BYTES);
    const tag = decode(parts[3], 16);
    if (iv?.length !== 12 || !ciphertext?.length || tag?.length !== 16)
      throw new Error();
    const decipher = createDecipheriv('aes-256-gcm', tokenKey(key), iv);
    decipher.setAAD(TOKEN_AAD);
    decipher.setAuthTag(tag);
    return Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]).toString('utf8');
  } catch {
    throw new Error('Instagram token unavailable');
  }
}

export function hashSecret(value: string): string {
  if (
    typeof value !== 'string' ||
    !value.length ||
    Buffer.byteLength(value, 'utf8') > MAX_TOKEN_BYTES
  )
    throw new Error('Invalid Instagram identifier');
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

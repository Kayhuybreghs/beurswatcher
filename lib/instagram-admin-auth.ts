import {
  createHash,
  createHmac,
  randomBytes,
  scrypt,
  timingSafeEqual,
} from 'node:crypto';

export const ADMIN_COOKIE = 'bw_instagram_admin';
export const ADMIN_SESSION_MAX_AGE = 30 * 24 * 60 * 60;
const SESSION_DURATION = ADMIN_SESSION_MAX_AGE * 1000;
const SESSION_PURPOSE = 'instagram:admin-session:v1';

export type InstagramAdminConfig = {
  origin: string;
  secret: string;
  codeHash: string;
};

const configurationError = () =>
  new Error('Instagram beheer is niet ingesteld');
const validSecret = (secret: unknown): secret is string =>
  typeof secret === 'string' && /^[\x21-\x7e]{43,256}$/.test(secret);
const validTime = (value: unknown): value is number =>
  typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
function validCode(code: unknown): code is string {
  if (
    typeof code !== 'string' ||
    code.length < 12 ||
    code.length > 128 ||
    code !== code.trim()
  )
    return false;
  for (let index = 0; index < code.length; index++) {
    const point = code.charCodeAt(index);
    if (point < 32 || point === 127) return false;
  }
  return true;
}

function decode(value: string, expectedBytes: number): Buffer | null {
  if (
    typeof value !== 'string' ||
    !/^[A-Za-z0-9_-]+$/.test(value) ||
    value.length !== Math.ceil((expectedBytes * 4) / 3)
  )
    return null;
  const result = Buffer.from(value, 'base64url');
  return result.length === expectedBytes &&
    result.toString('base64url') === value
    ? result
    : null;
}

function parseCodeHash(
  encoded: unknown,
): { salt: Buffer; hash: Buffer } | null {
  if (typeof encoded !== 'string' || encoded.length > 160) return null;
  const [algorithm, version, saltValue, hashValue, extra] = encoded.split(':');
  if (algorithm !== 'scrypt' || version !== 'v1' || extra !== undefined)
    return null;
  const salt = decode(saltValue, 16);
  const hash = decode(hashValue, 64);
  return salt && hash ? { salt, hash } : null;
}

function deriveCode(code: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(
      code,
      salt,
      64,
      { N: 16384, r: 8, p: 1, maxmem: 32 * 1024 * 1024 },
      (error, key) => {
        if (error) reject(configurationError());
        else resolve(key);
      },
    );
  });
}

/** Generate a random access code separately; the stored value is only its salted hash. */
export async function hashAdminCode(
  code: string,
  salt: Uint8Array = randomBytes(16),
): Promise<string> {
  if (
    !validCode(code) ||
    !(salt instanceof Uint8Array) ||
    salt.byteLength !== 16
  )
    throw configurationError();
  const bytes = Buffer.from(salt);
  const hash = await deriveCode(code, bytes);
  return `scrypt:v1:${bytes.toString('base64url')}:${hash.toString('base64url')}`;
}

export async function verifyAdminCode(
  code: string,
  encodedHash: string,
): Promise<boolean> {
  if (!validCode(code)) return false;
  const stored = parseCodeHash(encodedHash);
  if (!stored) return false;
  try {
    return timingSafeEqual(await deriveCode(code, stored.salt), stored.hash);
  } catch {
    return false;
  }
}

export function getAdminConfig(
  env: NodeJS.ProcessEnv = process.env,
): InstagramAdminConfig {
  try {
    const origin =
      env.NODE_ENV === 'development' && env.INSTAGRAM_DEVELOPMENT_ORIGIN
        ? env.INSTAGRAM_DEVELOPMENT_ORIGIN
        : env.BEURSWATCHER_SITE_URL;
    const secret = env.INSTAGRAM_ADMIN_SESSION_SECRET;
    const codeHash = env.INSTAGRAM_ADMIN_CODE_HASH;
    if (
      !origin ||
      origin.length > 256 ||
      !validSecret(secret) ||
      !parseCodeHash(codeHash)
    )
      throw configurationError();
    const url = new URL(origin);
    const local =
      env.NODE_ENV === 'development' &&
      ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
    if (
      origin !== url.origin ||
      url.username ||
      url.password ||
      (url.protocol !== 'https:' && !(local && url.protocol === 'http:'))
    )
      throw configurationError();
    return { origin, secret, codeHash: codeHash! };
  } catch {
    throw configurationError();
  }
}

function codeFingerprint(codeHash: string) {
  return createHash('sha256').update(codeHash).digest('hex');
}

export function issueAdminSession(
  secret: string,
  codeHash: string,
  now = Date.now(),
): string {
  if (
    !validSecret(secret) ||
    !parseCodeHash(codeHash) ||
    !validTime(now) ||
    !validTime(now + SESSION_DURATION)
  )
    throw configurationError();
  const payload = Buffer.from(
    JSON.stringify({
      purpose: SESSION_PURPOSE,
      issuedAt: now,
      expiresAt: now + SESSION_DURATION,
      nonce: randomBytes(32).toString('base64url'),
      code: codeFingerprint(codeHash),
    }),
  ).toString('base64url');
  const signature = createHmac('sha256', secret)
    .update(`${SESSION_PURPOSE}:${payload}`)
    .digest('base64url');
  return `v1.${payload}.${signature}`;
}

export function verifyAdminSession(
  cookie: string,
  secret: string,
  codeHash: string,
  now = Date.now(),
): boolean {
  if (
    typeof cookie !== 'string' ||
    cookie.length > 1024 ||
    !validSecret(secret) ||
    !parseCodeHash(codeHash) ||
    !validTime(now)
  )
    return false;
  const [version, payload, signature, extra] = cookie.split('.');
  if (
    version !== 'v1' ||
    extra !== undefined ||
    !payload ||
    !/^[A-Za-z0-9_-]+$/.test(payload)
  )
    return false;
  const received = decode(signature, 32);
  if (!received) return false;
  const expected = createHmac('sha256', secret)
    .update(`${SESSION_PURPOSE}:${payload}`)
    .digest();
  if (!timingSafeEqual(received, expected)) return false;
  try {
    const bytes = Buffer.from(payload, 'base64url');
    if (bytes.toString('base64url') !== payload) return false;
    const session: unknown = JSON.parse(bytes.toString('utf8'));
    if (!session || typeof session !== 'object' || Array.isArray(session))
      return false;
    const values = session as Record<string, unknown>;
    if (
      values.purpose !== SESSION_PURPOSE ||
      !validTime(values.issuedAt) ||
      !validTime(values.expiresAt)
    )
      return false;
    if (
      values.issuedAt > now ||
      values.expiresAt <= now ||
      values.expiresAt - values.issuedAt !== SESSION_DURATION
    )
      return false;
    if (
      typeof values.nonce !== 'string' ||
      !decode(values.nonce, 32) ||
      typeof values.code !== 'string' ||
      !/^[a-f0-9]{64}$/.test(values.code)
    )
      return false;
    return timingSafeEqual(
      Buffer.from(values.code),
      Buffer.from(codeFingerprint(codeHash)),
    );
  } catch {
    return false;
  }
}

/** Read only the signed cookie; no Meta credentials or account connection are required. */
export function readAdminSession(
  request: Request,
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  try {
    const config = getAdminConfig(env);
    const header = request.headers.get('cookie') || '';
    if (header.length > 16384) return false;
    const matches = header
      .split(';')
      .map((value) => value.trim())
      .filter((value) => value.startsWith(`${ADMIN_COOKIE}=`));
    if (matches.length !== 1) return false;
    return verifyAdminSession(
      matches[0].slice(ADMIN_COOKIE.length + 1),
      config.secret,
      config.codeHash,
    );
  } catch {
    return false;
  }
}

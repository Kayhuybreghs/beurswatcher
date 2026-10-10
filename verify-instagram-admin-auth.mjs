import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  getAdminConfig,
  hashAdminCode,
  verifyAdminCode,
  issueAdminSession,
  verifyAdminSession,
  readAdminSession,
} from './lib/instagram-admin-auth.ts';
import { createInvite } from './lib/instagram-security.ts';

// Local test fixtures only. No real access code or deployment secret is read.
const code = 'fixed-test-code-123';
const secret = 's'.repeat(43);
const now = 1_800_000_000_000;
const codeHash = await hashAdminCode(code, Buffer.alloc(16, 7));
const changedCodeHash = await hashAdminCode(
  'different-test-code',
  Buffer.alloc(16, 8),
);
assert.match(codeHash, /^scrypt:v1:[A-Za-z0-9_-]{22}:[A-Za-z0-9_-]{86}$/);
assert.equal(await hashAdminCode(code, Buffer.alloc(16, 7)), codeHash);
assert.notEqual(await hashAdminCode(code), await hashAdminCode(code));
assert.equal(await verifyAdminCode(code, codeHash), true);
assert.equal(await verifyAdminCode('wrong-access-code', codeHash), false);
assert.equal(await verifyAdminCode(code.toUpperCase(), codeHash), false);
for (const malformed of [
  '',
  'bad',
  codeHash + ':extra',
  codeHash.replace('v1:', 'v2:'),
  codeHash.slice(0, -1),
  'x'.repeat(10000),
])
  assert.equal(await verifyAdminCode(code, malformed), false);
for (const malformedCode of [
  '',
  'short',
  'x'.repeat(129),
  ' ' + code,
  code + '\n',
  null,
]) {
  assert.equal(await verifyAdminCode(malformedCode, codeHash), false);
  await assert.rejects(() => hashAdminCode(malformedCode));
}
await assert.rejects(() => hashAdminCode(code, Buffer.alloc(15)));

const env = {
  NODE_ENV: 'production',
  BEURSWATCHER_SITE_URL: 'https://www.beurswatcher.nl',
  INSTAGRAM_ADMIN_CODE_HASH: codeHash,
  INSTAGRAM_ADMIN_SESSION_SECRET: secret,
};
assert.deepEqual(getAdminConfig(env), {
  origin: env.BEURSWATCHER_SITE_URL,
  codeHash,
  secret,
});
assert.equal(
  getAdminConfig({
    ...env,
    NODE_ENV: 'development',
    INSTAGRAM_DEVELOPMENT_ORIGIN: 'http://127.0.0.1:5198',
  }).origin,
  'http://127.0.0.1:5198',
);
assert.equal(
  getAdminConfig({
    ...env,
    INSTAGRAM_DEVELOPMENT_ORIGIN: 'http://evil.example',
  }).origin,
  env.BEURSWATCHER_SITE_URL,
);
for (const changes of [
  { INSTAGRAM_ADMIN_CODE_HASH: undefined },
  { INSTAGRAM_ADMIN_CODE_HASH: 'bad' },
  { INSTAGRAM_ADMIN_SESSION_SECRET: 'short' },
  { INSTAGRAM_ADMIN_SESSION_SECRET: secret + '\n' },
  { BEURSWATCHER_SITE_URL: undefined },
  { BEURSWATCHER_SITE_URL: 'http://www.beurswatcher.nl' },
  { BEURSWATCHER_SITE_URL: 'https://www.beurswatcher.nl/' },
  { BEURSWATCHER_SITE_URL: 'https://www.beurswatcher.nl/path' },
  { BEURSWATCHER_SITE_URL: 'https://www.beurswatcher.nl?evil' },
  { BEURSWATCHER_SITE_URL: 'https://user:password@www.beurswatcher.nl' },
  {
    NODE_ENV: 'development',
    INSTAGRAM_DEVELOPMENT_ORIGIN: 'http://evil.example',
  },
])
  assert.throws(() => getAdminConfig({ ...env, ...changes }), {
    message: 'Instagram beheer is niet ingesteld',
  });

const session = issueAdminSession(secret, codeHash, now);
assert.equal(verifyAdminSession(session, secret, codeHash, now), true);
assert.notEqual(issueAdminSession(secret, codeHash, now), session);
assert.equal(
  verifyAdminSession(
    session,
    secret,
    codeHash,
    now + ADMIN_SESSION_MAX_AGE * 1000 - 1,
  ),
  true,
);
assert.equal(
  verifyAdminSession(
    session,
    secret,
    codeHash,
    now + ADMIN_SESSION_MAX_AGE * 1000,
  ),
  false,
);
assert.equal(verifyAdminSession(session, secret, codeHash, now - 1), false);
assert.equal(verifyAdminSession(session, secret, changedCodeHash, now), false);
assert.equal(verifyAdminSession(session, 't'.repeat(43), codeHash, now), false);
assert.equal(
  verifyAdminSession(createInvite(secret, now), secret, codeHash, now),
  false,
);
for (const malformed of [
  '',
  'bad',
  session + '.',
  session.replace('v1.', 'v2.'),
  'x'.repeat(10000),
  null,
])
  assert.equal(verifyAdminSession(malformed, secret, codeHash, now), false);
const [version, encoded, signature] = session.split('.');
const payload = JSON.parse(Buffer.from(encoded, 'base64url'));
assert.ok(!JSON.stringify(payload).includes(code));
const signed = (values, context = 'instagram:admin-session:v1') => {
  const body = Buffer.from(JSON.stringify(values)).toString('base64url');
  return `v1.${body}.${createHmac('sha256', secret).update(`${context}:${body}`).digest('base64url')}`;
};
assert.equal(
  verifyAdminSession(
    `${version}.${Buffer.from(JSON.stringify({ ...payload, expiresAt: payload.expiresAt + 1 })).toString('base64url')}.${signature}`,
    secret,
    codeHash,
    now,
  ),
  false,
);
assert.equal(
  verifyAdminSession(
    signed({ ...payload, purpose: 'instagram:invite:v1' }),
    secret,
    codeHash,
    now,
  ),
  false,
);
assert.equal(
  verifyAdminSession(
    signed(payload, 'instagram:invite:v1'),
    secret,
    codeHash,
    now,
  ),
  false,
);
assert.equal(
  verifyAdminSession(
    signed({ ...payload, expiresAt: payload.expiresAt + 1 }),
    secret,
    codeHash,
    now,
  ),
  false,
);
assert.equal(
  verifyAdminSession(
    signed({ ...payload, nonce: 'bad' }),
    secret,
    codeHash,
    now,
  ),
  false,
);
assert.throws(() => issueAdminSession('short', codeHash, now));
assert.throws(() => issueAdminSession(secret, 'bad', now));
assert.throws(() => issueAdminSession(secret, codeHash, Number.NaN));

const previous = Object.fromEntries(
  Object.keys(env).map((key) => [key, process.env[key]]),
);
try {
  Object.assign(process.env, env);
  const fresh = issueAdminSession(secret, codeHash);
  const request = (cookie) =>
    new Request('https://www.beurswatcher.nl/api/instagram/admin/session', {
      headers: cookie === undefined ? {} : { cookie },
    });
  assert.equal(readAdminSession(request(`${ADMIN_COOKIE}=${fresh}`)), true);
  assert.equal(
    readAdminSession(
      request(`other=value; ${ADMIN_COOKIE}=${fresh}; extra=value`),
    ),
    true,
  );
  assert.equal(
    readAdminSession(
      request(`${ADMIN_COOKIE}=${fresh}; ${ADMIN_COOKIE}=${fresh}`),
    ),
    false,
  );
  assert.equal(readAdminSession(request()), false);
  assert.equal(readAdminSession(request(`${ADMIN_COOKIE}=bad`)), false);
  process.env.INSTAGRAM_ADMIN_CODE_HASH = changedCodeHash;
  assert.equal(readAdminSession(request(`${ADMIN_COOKIE}=${fresh}`)), false);
  delete process.env.INSTAGRAM_ADMIN_SESSION_SECRET;
  assert.equal(readAdminSession(request(`${ADMIN_COOKIE}=${fresh}`)), false);
} finally {
  for (const [key, value] of Object.entries(previous)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

console.log(
  'Instagram admin code hashing, configuration, cookie integrity, expiry, purpose isolation and session revocation on code rotation passed.',
);

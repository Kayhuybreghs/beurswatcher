import assert from 'node:assert/strict';
import { createCipheriv } from 'node:crypto';
import {
  readInstagramConfig,
  createInvite,
  verifyInvite,
  createFlow,
  verifyFlow,
  createNotice,
  verifyNotice,
  sealToken,
  openToken,
  hashSecret,
} from './lib/instagram-security.ts';

// Fixed fixtures are for deterministic checks only; never use them in deployment.
const now = 1_800_000_000_000;
const secret = 's'.repeat(43);
const otherSecret = 'x'.repeat(43);
const key = Buffer.alloc(32, 17);
const env = {
  NODE_ENV: 'production',
  BEURSWATCHER_SITE_URL: 'https://www.beurswatcher.nl',
  INSTAGRAM_APP_ID: '123456789',
  INSTAGRAM_APP_SECRET: 'a'.repeat(32),
  INSTAGRAM_CONNECT_SECRET: secret,
  INSTAGRAM_TOKEN_ENCRYPTION_KEY: key.toString('base64'),
};
const config = readInstagramConfig(env);
assert.equal(
  readInstagramConfig({
    ...env,
    INSTAGRAM_DEVELOPMENT_ORIGIN: 'http://127.0.0.1:5198',
  }).origin,
  env.BEURSWATCHER_SITE_URL,
);
assert.equal(
  readInstagramConfig({
    ...env,
    NODE_ENV: 'development',
    INSTAGRAM_DEVELOPMENT_ORIGIN: 'http://127.0.0.1:5198',
  }).origin,
  'http://127.0.0.1:5198',
);
assert.equal(config.username, 'beurswatcher');
assert.equal(
  config.redirectUri,
  'https://www.beurswatcher.nl/api/instagram/callback',
);
assert.deepEqual(config.encryptionKey, key);
assert.equal(
  readInstagramConfig({ ...env, INSTAGRAM_USERNAME: 'other_account' }).username,
  'other_account',
);
assert.equal(
  readInstagramConfig({
    ...env,
    NODE_ENV: 'development',
    BEURSWATCHER_SITE_URL: 'http://localhost:5198',
  }).origin,
  'http://localhost:5198',
);
assert.equal(
  readInstagramConfig({
    ...env,
    NODE_ENV: 'development',
    BEURSWATCHER_SITE_URL: 'http://127.0.0.1:5198',
  }).origin,
  'http://127.0.0.1:5198',
);
for (const changes of [
  { INSTAGRAM_APP_ID: undefined },
  { INSTAGRAM_APP_ID: '123/not-an-id' },
  { INSTAGRAM_APP_SECRET: 'short' },
  { INSTAGRAM_CONNECT_SECRET: 'short' },
  { INSTAGRAM_TOKEN_ENCRYPTION_KEY: Buffer.alloc(31).toString('base64') },
  { INSTAGRAM_TOKEN_ENCRYPTION_KEY: key.toString('base64').slice(0, -1) },
  {
    INSTAGRAM_TOKEN_ENCRYPTION_KEY: key.toString('base64'),
    INSTAGRAM_CONNECT_SECRET: key.toString('base64'),
  },
  { BEURSWATCHER_SITE_URL: 'http://www.beurswatcher.nl' },
  { BEURSWATCHER_SITE_URL: 'http://localhost:5198' },
  { NODE_ENV: 'development', BEURSWATCHER_SITE_URL: 'http://evil.example' },
  { BEURSWATCHER_SITE_URL: 'https://www.beurswatcher.nl/' },
  { BEURSWATCHER_SITE_URL: 'https://www.beurswatcher.nl/path' },
  { BEURSWATCHER_SITE_URL: 'https://www.beurswatcher.nl?redirect=evil' },
  { BEURSWATCHER_SITE_URL: 'https://user:secret@www.beurswatcher.nl' },
  { INSTAGRAM_USERNAME: '../other' },
  { INSTAGRAM_USERNAME: '@beurswatcher' },
])
  assert.throws(() => readInstagramConfig({ ...env, ...changes }), {
    message: 'Instagram setup is not configured correctly',
  });

const invitation = createInvite(secret, now);
const invitationData = verifyInvite(invitation, secret, now);
assert.equal(invitationData.expiresAt, now + 7 * 24 * 60 * 60 * 1000);
assert.notEqual(
  createInvite(secret, now),
  invitation,
  'Every invitation has a fresh nonce',
);
assert.equal(verifyInvite(invitation, secret, invitationData.expiresAt), null);
assert.ok(verifyInvite(invitation, secret, invitationData.expiresAt - 1));
assert.equal(verifyInvite(invitation, secret, now - 1), null);
assert.equal(verifyInvite(invitation, otherSecret, now), null);
assert.equal(verifyInvite(invitation.replace('v1.', 'v2.'), secret, now), null);
assert.equal(verifyInvite('x'.repeat(100_000), secret, now), null);
assert.equal(verifyInvite(invitation, secret, Number.NaN), null);
assert.equal(verifyInvite(null, secret, now), null);
for (const ttl of [-1, 0, 1.5, Number.NaN, 7 * 24 * 60 * 60 * 1000 + 1])
  assert.throws(() => createInvite(secret, now, ttl));
assert.equal(
  verifyInvite(createInvite(secret, now, 1000), secret, now + 1000),
  null,
);
const alteredInvite = invitation.split('.');
const alteredPayload = JSON.parse(Buffer.from(alteredInvite[1], 'base64url'));
alteredPayload.expiresAt += 1000;
alteredInvite[1] = Buffer.from(JSON.stringify(alteredPayload)).toString(
  'base64url',
);
assert.equal(
  verifyInvite(alteredInvite.join('.'), secret, now),
  null,
  'Expiry cannot be extended without the secret',
);

const flow = createFlow(secret, invitationData.nonce, now);
assert.deepEqual(verifyFlow(flow.state, flow.cookie, secret, now), {
  inviteNonce: invitationData.nonce,
  nonce: flow.state,
});
assert.notEqual(
  createFlow(secret, invitationData.nonce, now).state,
  flow.state,
);
assert.equal(
  verifyFlow(Buffer.alloc(32).toString('base64url'), flow.cookie, secret, now),
  null,
);
assert.equal(
  verifyFlow(flow.state, flow.cookie, secret, now + 10 * 60 * 1000),
  null,
);
assert.equal(verifyFlow(flow.state, flow.cookie, otherSecret, now), null);
assert.equal(verifyFlow(flow.state, invitation, secret, now), null);
assert.equal(verifyInvite(flow.cookie, secret, now), null);
assert.equal(verifyFlow('bad', flow.cookie, secret, now), null);
assert.throws(() => createFlow(secret, 'bad', now));

for (const result of [
  'connected',
  'cancelled',
  'wrong-account',
  'expired',
  'app-configuration',
  'permission-required',
  'provider-unavailable',
  'provider-error',
  'error',
]) {
  const notice = createNotice(result, secret, now);
  assert.equal(verifyNotice(notice, secret, now), result);
  const forged = notice.split('.');
  const payload = JSON.parse(
    Buffer.from(forged[1], 'base64url').toString('utf8'),
  );
  payload.result = result === 'cancelled' ? 'provider-error' : 'cancelled';
  forged[1] = Buffer.from(JSON.stringify(payload)).toString('base64url');
  assert.equal(verifyNotice(forged.join('.'), secret, now), null);
  assert.equal(verifyNotice(notice, secret, now + 5 * 60 * 1000), null);
  assert.equal(verifyNotice(notice, otherSecret, now), null);
  assert.equal(verifyInvite(notice, secret, now), null);
  assert.equal(verifyFlow(flow.state, notice, secret, now), null);
}
assert.throws(() => createNotice('not-a-result', secret, now));
assert.equal(verifyNotice(invitation, secret, now), null);
assert.equal(verifyNotice(flow.cookie, secret, now), null);

const plaintext = 'test-access-token-never-log';
const encrypted = sealToken(plaintext, key);
assert.equal(openToken(encrypted, key), plaintext);
assert.ok(!encrypted.includes(plaintext));
assert.notEqual(
  sealToken(plaintext, key),
  encrypted,
  'Fresh GCM IV for every encryption',
);
assert.throws(() => openToken(encrypted, Buffer.alloc(32, 18)), {
  message: 'Instagram token unavailable',
});
for (const position of [1, 2, 3]) {
  const parts = encrypted.split('.');
  const changed = Buffer.from(parts[position], 'base64url');
  changed[0] ^= 1;
  parts[position] = changed.toString('base64url');
  assert.throws(() => openToken(parts.join('.'), key), {
    message: 'Instagram token unavailable',
  });
}
for (const malformed of [
  'v1.bad.bad.bad',
  encrypted + '.',
  encrypted.replace('v1.', 'v2.'),
  'x'.repeat(100_000),
])
  assert.throws(() => openToken(malformed, key));
assert.throws(() => sealToken('', key));
assert.throws(() => sealToken('x'.repeat(8193), key));
assert.throws(() => sealToken(plaintext, Buffer.alloc(31)));
const wrongContextIv = Buffer.alloc(12, 1);
const wrongContextCipher = createCipheriv('aes-256-gcm', key, wrongContextIv);
wrongContextCipher.setAAD(Buffer.from('another-token-context'));
const wrongContextData = Buffer.concat([
  wrongContextCipher.update(plaintext),
  wrongContextCipher.final(),
]);
assert.throws(
  () =>
    openToken(
      [
        'v1',
        wrongContextIv.toString('base64url'),
        wrongContextData.toString('base64url'),
        wrongContextCipher.getAuthTag().toString('base64url'),
      ].join('.'),
      key,
    ),
  { message: 'Instagram token unavailable' },
);
assert.equal(
  hashSecret('abc'),
  'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
);
assert.notEqual(hashSecret(invitationData.nonce), hashSecret(flow.state));
assert.throws(() => hashSecret(''));

console.log(
  'Instagram configuration, expiring invitations, browser-bound flow state, signed notices and authenticated token encryption passed.',
);

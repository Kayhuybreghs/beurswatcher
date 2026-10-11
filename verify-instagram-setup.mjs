import assert from 'node:assert/strict';
import test from 'node:test';
import { randomBytes } from 'node:crypto';
import { createClient } from '@libsql/client';
import { NextRequest } from 'next/server.js';
import { createInstagramStore } from './lib/instagram-store.ts';
import {
  hashAdminCode,
  issueAdminSession,
  ADMIN_COOKIE,
} from './lib/instagram-admin-auth.ts';
import {
  createInstagramSetupService,
  deriveInstagramKey,
  sealInstagramAppSecret,
  openInstagramAppSecret,
  resolveInstagramConfig,
} from './lib/instagram-setup.ts';
import { resolveInstagramCredentials } from './lib/instagram-connection.ts';
import {
  createFlow,
  verifyFlow,
  sealToken,
  openToken,
} from './lib/instagram-security.ts';

// Isolated SQLite and generated fixtures only; never contacts Meta or production storage.
const master = randomBytes(48).toString('base64url');
const secret = 'fictional-app-secret-for-local-tests-only';
const appId = '123456789012345';
const origin = 'https://beurswatcher.example';
const codeHash = await hashAdminCode('fictional-admin-access-code');
const env = {
  BEURSWATCHER_SITE_URL: origin,
  INSTAGRAM_ADMIN_SESSION_SECRET: master,
  INSTAGRAM_ADMIN_CODE_HASH: codeHash,
  NODE_ENV: 'production',
};
const cookie = `${ADMIN_COOKIE}=${issueAdminSession(master, codeHash)}`;
const now = Date.now();
const record = (token = 'encrypted-fixture', expiresAt = now + 86400000) => ({
  userId: '17840000000000001',
  username: 'beurswatcher',
  token,
  expiresAt,
  refreshedAt: now,
});

function fixture(t, environment = env) {
  const client = createClient({ url: 'file::memory:' });
  t.after(() => client.close());
  const store = createInstagramStore(client);
  return {
    client,
    store,
    service: createInstagramSetupService(environment, store, () => now),
  };
}
function request(method = 'GET', input, headers = {}) {
  return new Request(`${origin}/api/instagram/admin/setup`, {
    method,
    headers: {
      cookie,
      origin,
      'sec-fetch-site': 'same-origin',
      ...(method === 'PUT' ? { 'content-type': 'application/json' } : {}),
      ...headers,
    },
    ...(input === undefined
      ? {}
      : { body: typeof input === 'string' ? input : JSON.stringify(input) }),
  });
}
const input = (revision = null, extra = {}) => ({
  appId,
  appSecret: secret,
  revision,
  ...extra,
});
async function save(service, revision = null, extra = {}) {
  const response = await service.handle(request('PUT', input(revision, extra)));
  return { status: response.status, body: await response.json() };
}

await test('HKDF keys are stable, purpose-separated and require a strong master', () => {
  const keys = ['setup', 'oauth', 'token'].map((purpose) =>
    deriveInstagramKey(master, purpose),
  );
  assert.equal(new Set(keys.map((key) => key.toString('hex'))).size, 3);
  assert.deepEqual(keys[0], deriveInstagramKey(master, 'setup'));
  assert.notDeepEqual(keys[0], deriveInstagramKey(`${master}x`, 'setup'));
  assert.throws(() => deriveInstagramKey('short', 'setup'));
});
await test('setup encryption authenticates key, app ID, payload and purpose', () => {
  const sealed = sealInstagramAppSecret(appId, secret, master);
  assert.equal(openInstagramAppSecret(appId, sealed, master), secret);
  assert.notEqual(sealed, sealInstagramAppSecret(appId, secret, master));
  assert.throws(() => openInstagramAppSecret('999', sealed, master));
  assert.throws(() => openInstagramAppSecret(appId, sealed, `${master}x`));
  const parts = sealed.split('.');
  parts[2] = `a${parts[2].slice(1)}`;
  if (parts.join('.') !== sealed)
    assert.throws(() => openInstagramAppSecret(appId, parts.join('.'), master));
  assert.throws(() => openToken(sealed, deriveInstagramKey(master, 'setup')));
  assert.throws(() =>
    openInstagramAppSecret(
      appId,
      sealToken(secret, deriveInstagramKey(master, 'setup')),
      master,
    ),
  );
});
await test('fresh setup GET and save expose only safe fields; credentials are encrypted', async (t) => {
  const { service, store, client } = fixture(t);
  const fresh = await service.status();
  assert.equal(fresh.source, 'none');
  assert.equal(fresh.configured, false);
  const saved = await save(service);
  assert.equal(saved.status, 200);
  assert.equal(saved.body.configured, true);
  assert.equal(saved.body.locked, false);
  assert.equal(saved.body.source, 'saved');
  assert.equal(saved.body.redirectUri, `${origin}/api/instagram/callback`);
  const data = await store.setup();
  const serialized = JSON.stringify(saved.body);
  for (const sensitive of [
    secret,
    master,
    data.secret,
    deriveInstagramKey(master, 'token').toString('base64'),
  ])
    assert.ok(!serialized.includes(sensitive));
  assert.equal(
    JSON.stringify(
      (await client.execute('SELECT * FROM instagram_app_setup')).rows,
    ).includes(secret),
    false,
  );
  const config = await resolveInstagramConfig(env, store);
  assert.equal(config.appSecret, secret);
  assert.equal(config.setupRevision, saved.body.revision);
  assert.equal(
    await store.get(),
    null,
    'saving is never presented as account connection',
  );
});
await test('authenticated GET works without Origin but rejects a cross-site request', async (t) => {
  const { service } = fixture(t);
  const same = request();
  same.headers.delete('origin');
  assert.equal((await service.handle(same)).status, 200);
  assert.equal(
    (
      await service.handle(
        request('GET', undefined, { 'sec-fetch-site': 'cross-site' }),
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await service.handle(
        request('GET', undefined, { origin: 'https://other.example' }),
      )
    ).status,
    403,
  );
});
await test('real NextRequest loopback normalization accepts only the exact development Host and port', async (t) => {
  const developmentOrigin = 'http://127.0.0.1:5197';
  const { service } = fixture(t, {
    ...env,
    NODE_ENV: 'development',
    INSTAGRAM_DEVELOPMENT_ORIGIN: developmentOrigin,
  });
  const nextRequest = (method = 'GET', headers = {}, port = '5197') =>
    new NextRequest(`http://127.0.0.1:${port}/api/instagram/admin/setup`, {
      method,
      headers: {
        cookie,
        host: `127.0.0.1:${port}`,
        origin: developmentOrigin,
        'sec-fetch-site': 'same-origin',
        ...(method === 'PUT' ? { 'content-type': 'application/json' } : {}),
        ...headers,
      },
      ...(method === 'PUT' ? { body: JSON.stringify(input()) } : {}),
    });
  const get = nextRequest();
  assert.equal(
    new URL(get.url).hostname,
    'localhost',
    'the installed framework genuinely normalizes the URL',
  );
  assert.equal((await service.handle(get)).status, 200);
  assert.equal((await service.handle(nextRequest('PUT'))).status, 200);
  assert.equal(
    (await service.handle(nextRequest('GET', { host: 'localhost:5197' })))
      .status,
    403,
  );
  assert.equal(
    (
      await service.handle(
        nextRequest('GET', {
          host: 'other.example',
          'x-forwarded-host': '127.0.0.1:5197',
        }),
      )
    ).status,
    403,
  );
  assert.equal(
    (await service.handle(nextRequest('GET', {}, '5198'))).status,
    403,
  );
  assert.equal(
    (
      await service.handle(
        nextRequest('GET', { origin: 'http://localhost:5197' }),
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await service.handle(
        nextRequest('GET', { 'sec-fetch-site': 'cross-site' }),
      )
    ).status,
    403,
  );
  const production = fixture(t).service;
  assert.equal((await production.handle(nextRequest())).status, 403);
});
await test('unauthenticated, bad origin, absent origin and incorrect MIME are rejected', async (t) => {
  const { service, store } = fixture(t);
  for (const method of ['GET', 'PUT'])
    assert.equal(
      (
        await service.handle(
          request(method, method === 'PUT' ? input() : undefined, {
            cookie: '',
          }),
        )
      ).status,
      401,
    );
  assert.equal(
    (
      await service.handle(
        request('PUT', input(), { origin: 'https://other.example' }),
      )
    ).status,
    403,
  );
  const noOrigin = request('PUT', input());
  noOrigin.headers.delete('origin');
  assert.equal((await service.handle(noOrigin)).status, 403);
  assert.equal(
    (
      await service.handle(
        request('PUT', input(), { 'content-type': 'text/plain' }),
      )
    ).status,
    400,
  );
  assert.equal(await store.setup(), null);
});
await test('strict input types, fields, lengths and malformed JSON do not reach storage', async (t) => {
  const { service, store } = fixture(t);
  const invalid = [
    null,
    [],
    {},
    '{',
    input(null, { appId: 123 }),
    input(null, { appSecret: [secret] }),
    input(null, { appId: '1'.repeat(33) }),
    input(null, { appSecret: 'x'.repeat(31) }),
    input(null, { appSecret: 'x'.repeat(257) }),
    input(null, { appSecret: ` ${secret}` }),
    input(null, { revision: undefined }),
    input(null, { username: 'other' }),
    input(null, { confirmChange: false }),
  ];
  for (const value of invalid)
    assert.equal((await service.handle(request('PUT', value))).status, 400);
  assert.equal(await store.setup(), null);
});
await test('body size cap applies to actual streamed bytes and declared size', async (t) => {
  const { service } = fixture(t);
  assert.equal(
    (await service.handle(request('PUT', 'x'.repeat(16385)))).status,
    413,
  );
  assert.equal(
    (
      await service.handle(
        request('PUT', input(), { 'content-length': '16385' }),
      )
    ).status,
    413,
  );
});
await test('saved configuration update requires confirmation and current revision', async (t) => {
  const { service } = fixture(t);
  const first = await save(service);
  assert.equal(
    (await save(service, first.body.revision)).body.code,
    'confirmation-required',
  );
  assert.equal((await save(service)).body.code, 'conflict');
  const changed = await save(service, first.body.revision, {
    confirmChange: true,
  });
  assert.equal(changed.status, 200);
  assert.notEqual(changed.body.revision, first.body.revision);
  assert.equal(
    (await save(service, first.body.revision, { confirmChange: true })).body
      .code,
    'conflict',
  );
});
await test('active connection locks setup atomically; old callback cannot save after setup changes', async (t) => {
  const { service, store } = fixture(t);
  const first = await save(service);
  const second = await save(service, first.body.revision, {
    confirmChange: true,
  });
  await assert.rejects(
    store.save(record(), 'old-callback', now, first.body.revision),
  );
  assert.equal(await store.get(), null);
  assert.equal(await store.inviteUsed('old-callback'), false);
  await store.save(record(), 'current-callback', now, second.body.revision);
  const blocked = await save(service, second.body.revision, {
    confirmChange: true,
  });
  assert.equal(blocked.body.code, 'active-connection');
  assert.equal((await service.status()).locked, true);
});
await test('concurrent writes for the same revision have one winner and one explicit conflict', async (t) => {
  const { service } = fixture(t);
  const results = await Promise.all([save(service), save(service)]);
  assert.deepEqual(
    results.map((result) => result.status).sort((a, b) => a - b),
    [200, 409],
  );
  assert.equal(
    results.find((result) => result.status === 409).body.code,
    'conflict',
  );
});
await test('expired connection can be replaced but cannot later refresh a stale token', async (t) => {
  const { service, store, client } = fixture(t);
  const first = await save(service);
  await store.save(
    record('old-token', now - 1),
    'expired-flow',
    now,
    first.body.revision,
  );
  const previous = await store.get();
  await client.execute(
    "UPDATE instagram_connection SET lease='pending-refresh' WHERE id=1",
  );
  previous.lease = 'pending-refresh';
  assert.equal(
    (await save(service, first.body.revision, { confirmChange: true })).status,
    200,
  );
  await store.finishRefresh(previous, 'stale-finish', now + 86400000, now);
  const connection = await store.get();
  assert.equal(connection.status, 'needs-reconnect');
  assert.equal(connection.token, 'old-token');
});
await test('flow revision is authenticated and old config revisions cannot resume', () => {
  const flow = createFlow(
    master,
    randomBytes(32).toString('base64url'),
    now,
    '12345678-1234-1234-1234-123456789012',
  );
  assert.equal(
    verifyFlow(flow.state, flow.cookie, master, now).setupRevision,
    '12345678-1234-1234-1234-123456789012',
  );
  assert.equal(verifyFlow(flow.state, flow.cookie, master, now + 600001), null);
});
await test('environment config wins and explicit old keys remain byte-for-byte compatible', async (t) => {
  const oldKey = randomBytes(32).toString('base64'),
    oldSigning = randomBytes(48).toString('base64url');
  const configuredEnv = {
    ...env,
    INSTAGRAM_APP_ID: '222',
    INSTAGRAM_APP_SECRET: secret,
    INSTAGRAM_CONNECT_SECRET: oldSigning,
    INSTAGRAM_TOKEN_ENCRYPTION_KEY: oldKey,
  };
  const { service, store } = fixture(t, configuredEnv);
  await store.saveSetup(
    appId,
    sealInstagramAppSecret(appId, secret, master),
    null,
    now,
  );
  const config = await resolveInstagramConfig(configuredEnv, store);
  assert.equal(config.appId, '222');
  assert.equal(config.connectSecret, oldSigning);
  assert.equal(config.encryptionKey.toString('base64'), oldKey);
  assert.equal(config.setupRevision, undefined);
  assert.equal((await service.status()).source, 'environment');
  assert.equal((await save(service)).body.code, 'environment-managed');
  const noMaster = { ...configuredEnv };
  delete noMaster.INSTAGRAM_ADMIN_SESSION_SECRET;
  assert.equal((await resolveInstagramConfig(noMaster, store)).appId, '222');
});
await test('partial env never mixes with saved setup; missing master fails closed; no env mutation', async (t) => {
  const { service, store } = fixture(t);
  await save(service);
  await assert.rejects(
    resolveInstagramConfig({ ...env, INSTAGRAM_APP_ID: '222' }, store),
  );
  await assert.rejects(
    resolveInstagramConfig({ ...env, INSTAGRAM_APP_SECRET: secret }, store),
  );
  await assert.rejects(
    resolveInstagramConfig(
      { ...env, INSTAGRAM_ADMIN_SESSION_SECRET: '' },
      store,
    ),
  );
  const before = JSON.stringify(env);
  await resolveInstagramConfig(env, store);
  assert.equal(JSON.stringify(env), before);
  assert.equal(
    (
      await resolveInstagramConfig(
        {
          ...env,
          INSTAGRAM_APP_ID: '',
          INSTAGRAM_APP_SECRET: '',
          INSTAGRAM_CONNECT_SECRET: '',
          INSTAGRAM_TOKEN_ENCRYPTION_KEY: '',
          INSTAGRAM_USERNAME: '',
        },
        store,
      )
    ).username,
    'beurswatcher',
  );
});
await test('managed invalid, expired or unreadable token never falls back to legacy credentials', async (t) => {
  const { service, store, client } = fixture(t);
  const saved = await save(service);
  const config = await resolveInstagramConfig(env, store);
  const legacy = {
    ...env,
    INSTAGRAM_ACCESS_TOKEN: 'legacy-token',
    INSTAGRAM_USER_ID: '999',
  };
  await store.save(
    record(sealToken('managed-token', config.encryptionKey)),
    'flow',
    now,
    saved.body.revision,
  );
  assert.equal(
    (await resolveInstagramCredentials(legacy, store, now)).accessToken,
    'managed-token',
  );
  await client.execute(
    "UPDATE instagram_connection SET status='needs-reconnect' WHERE id=1",
  );
  await assert.rejects(resolveInstagramCredentials(legacy, store, now));
  await client.execute({
    sql: "UPDATE instagram_connection SET status='connected',expires_at=? WHERE id=1",
    args: [now - 1],
  });
  await assert.rejects(resolveInstagramCredentials(legacy, store, now));
  await client.execute({
    sql: "UPDATE instagram_connection SET token='invalid',expires_at=? WHERE id=1",
    args: [now + 86400000],
  });
  await assert.rejects(resolveInstagramCredentials(legacy, store, now));
});
await test('master rotation reports locked unreadable setup honestly, without secret echo', async (t) => {
  const { service, store } = fixture(t);
  const first = await save(service);
  await store.save(record(), 'flow', now, first.body.revision);
  const rotated = createInstagramSetupService(
    { ...env, INSTAGRAM_ADMIN_SESSION_SECRET: `${master}x` },
    store,
    () => now,
  );
  const result = await rotated.status();
  assert.equal(result.configured, false);
  assert.equal(result.locked, true);
  assert.match(result.message, /websitebeheerder/);
  assert.ok(!JSON.stringify(result).includes(secret));
});

import assert from 'node:assert/strict';
import test from 'node:test';
import { createClient } from '@libsql/client';
import { createInstagramStore } from './lib/instagram-store.ts';
import {
  applyInstagramCuration,
  createInstagramAdminData,
  InstagramAdminDataError,
  validateInstagramSettings,
} from './lib/instagram-admin-data.ts';
import { parseInstagramMedia } from './app/instagram-media.ts';
import { reels } from './app/reel-data.ts';

// All provider requests are injected local Responses; databases live only in memory.
const NOW = Date.UTC(2026, 9, 10, 12);
const USER_ID = '17841405793187218';
const TOKEN = 'local-test-token-never-real';
const SECRET_DETAIL = 'private-provider-detail-must-not-be-returned';
const credentials = {
  userId: USER_ID,
  username: 'beurswatcher',
  accessToken: TOKEN,
};
const manual = (selectedIds = [], titles = {}) => ({
  mode: 'manual',
  selectedIds,
  titles,
});
const automatic = { mode: 'automatic', selectedIds: [], titles: {} };
const media = (index, overrides = {}) => ({
  id: `test-${index}`,
  username: 'beurswatcher',
  media_type: 'VIDEO',
  media_url: `https://scontent.cdninstagram.com/test-${index}.mp4`,
  thumbnail_url: `https://scontent.cdninstagram.com/test-${index}.jpg`,
  permalink: `https://www.instagram.com/beurswatcher/reel/UnitFixture${index}/`,
  timestamp: new Date(NOW - index * 60000).toISOString(),
  caption: `Video ${index}: beleggen uitgelegd`,
  ...overrides,
});

function gateway() {
  const state = {
    calls: [],
    identity: { user_id: USER_ID, username: 'beurswatcher' },
    items: Array.from({ length: 8 }, (_, index) => media(index)),
    error: null,
    rawIdentity: null,
  };
  state.fetch = async (input, options) => {
    const url = new URL(input);
    assert.equal(url.origin, 'https://graph.instagram.com');
    assert.equal(options.headers.Authorization, `Bearer ${TOKEN}`);
    assert.equal(options.cache, 'no-store');
    assert.equal(options.redirect, 'error');
    assert.ok(options.signal instanceof AbortSignal);
    assert.equal(url.searchParams.has('access_token'), false);
    state.calls.push(url);
    if (state.error)
      return new Response(JSON.stringify({ error: state.error }), {
        status: 400,
      });
    if (url.pathname === '/v26.0/me') {
      assert.equal(url.searchParams.get('fields'), 'user_id,username');
      return new Response(state.rawIdentity || JSON.stringify(state.identity));
    }
    assert.equal(url.pathname, `/v26.0/${USER_ID}/media`);
    assert.equal(url.searchParams.get('limit'), '24');
    assert.equal(
      url.searchParams.get('fields'),
      'id,media_type,media_url,thumbnail_url,permalink,timestamp,username,caption',
    );
    return new Response(JSON.stringify({ data: state.items }));
  };
  return state;
}

async function fixture(exercise) {
  const client = createClient({ url: 'file::memory:' });
  const store = createInstagramStore(client);
  const upstream = gateway();
  const state = { now: NOW, credentials, configured: true };
  const dependencies = {
    store,
    credentials: async () => state.credentials,
    configured: () => state.configured,
    fetcher: (...args) => upstream.fetch(...args),
    now: () => state.now,
  };
  const service = createInstagramAdminData(dependencies);
  try {
    await exercise({ client, store, upstream, state, dependencies, service });
  } finally {
    client.close();
  }
}

const invalid = (error) =>
  error instanceof InstagramAdminDataError &&
  error.status === 400 &&
  error.message === 'invalid';

test('automatic chooses the newest six; manual preserves editorial order and can be empty', () => {
  const catalogue = parseInstagramMedia(
    { data: Array.from({ length: 10 }, (_, index) => media(index)) },
    'beurswatcher',
    24,
  );
  assert.deepEqual(
    applyInstagramCuration(catalogue.reverse(), automatic).map(
      (item) => item.id,
    ),
    Array.from({ length: 6 }, (_, index) => `test-${index}`),
  );
  assert.deepEqual(
    applyInstagramCuration(
      catalogue,
      manual(['test-7', 'test-2', 'test-9']),
    ).map((item) => item.id),
    ['test-7', 'test-2', 'test-9'],
  );
  assert.deepEqual(applyInstagramCuration(catalogue, manual()), []);
});

test('editorial settings accept only known IDs and plain, bounded titles', () => {
  const catalogue = parseInstagramMedia({ data: [media(1)] });
  assert.deepEqual(
    validateInstagramSettings(
      manual(['test-1'], { 'test-1': '  Een   heldere\n titel  ' }),
      catalogue,
    ),
    manual(['test-1'], { 'test-1': 'Een heldere titel' }),
  );
  assert.equal(
    validateInstagramSettings(
      manual([], { 'test-1': '🔭'.repeat(120) }),
      catalogue,
    ).titles['test-1'].length,
    240,
  );
  for (const value of [
    { ...manual(), mode: ['manual'] },
    { ...manual(), mode: null },
    manual(['unknown']),
    manual(['test-1', 'test-1']),
    manual([], { unknown: 'Titel' }),
    manual([], { 'test-1': '<img src=x onerror=alert(1)>' }),
    manual([], { 'test-1': 'Verborgen\u0000inhoud' }),
    manual([], { 'test-1': '🔭'.repeat(121) }),
    { ...manual(), url: 'https://untrusted.example/video' },
    { ...manual(), titles: [] },
    { ...manual(), selectedIds: 'test-1' },
  ])
    assert.throws(() => validateInstagramSettings(value, catalogue), invalid);
  assert.throws(
    () =>
      validateInstagramSettings(
        manual(Array.from({ length: 7 }, (_, index) => `test-${index}`)),
        parseInstagramMedia(
          { data: Array.from({ length: 7 }, (_, index) => media(index)) },
          'beurswatcher',
          24,
        ),
      ),
    invalid,
  );
});

test('provider captions become safe Unicode titles; catalogue stays bounded and rejects foreign URLs', () => {
  const items = Array.from({ length: 30 }, (_, index) => media(index));
  items[0].caption = '#beleggen\n<b>🔭</b>'.repeat(1) + '🔭'.repeat(150);
  items[1].permalink = 'https://untrusted.example/reel/x';
  items[2].media_url = 'https://untrusted.example/video.mp4';
  const parsed = parseInstagramMedia({ data: items }, 'beurswatcher', 100);
  assert.equal(parsed.length, 24);
  assert.equal(Array.from(parsed[0].title).length, 120);
  assert.equal(parsed[0].title.includes('<'), false);
  assert.equal(
    parsed.some((item) => item.id === 'test-1'),
    false,
  );
  assert.equal(parsed.find((item) => item.id === 'test-2').videoUrl, undefined);
});

test('missing credentials stay waiting; checking does not fetch or consume a cooldown', () =>
  fixture(async ({ service, state, upstream }) => {
    state.credentials = null;
    state.configured = false;
    const snapshot = await service.check();
    assert.equal(snapshot.configured, false);
    assert.equal(snapshot.connection.status, 'waiting');
    assert.equal(snapshot.connection.checkedAt, null);
    assert.ok(snapshot.items.length > 0);
    assert.equal(upstream.calls.length, 0);
    state.credentials = credentials;
    assert.equal((await service.check()).connection.status, 'connected');
    assert.equal(upstream.calls.length, 2);
  }));

test('a successful identity and media check is persisted without credentials in the snapshot', () =>
  fixture(async ({ service, upstream, dependencies }) => {
    assert.equal((await service.get()).connection.status, 'waiting');
    assert.equal(upstream.calls.length, 0);
    const result = await service.check();
    assert.equal(result.connection.status, 'connected');
    assert.equal(result.connection.checkedAt, new Date(NOW).toISOString());
    assert.equal(result.items.length, 8);
    assert.equal(result.items[0].title, 'Video 0: beleggen uitgelegd');
    const serialized = JSON.stringify(result);
    assert.equal(serialized.includes(TOKEN), false);
    assert.equal(serialized.includes(USER_ID), false);
    assert.equal(serialized.includes('credentialKey'), false);
    assert.deepEqual(
      await createInstagramAdminData(dependencies).get(),
      result,
    );
    assert.equal(upstream.calls.length, 2);
  }));

test('wrapped identity and a raw numeric Instagram user ID are read without precision loss', () =>
  fixture(async ({ service, upstream }) => {
    upstream.rawIdentity = `{"data":[{"user_id":${USER_ID},"username":"BeursWatcher"}]}`;
    assert.equal((await service.check()).connection.status, 'connected');
    assert.equal(upstream.calls.length, 2);
  }));

test('an account mismatch never requests media or reports connected', () =>
  fixture(async ({ service, upstream }) => {
    upstream.identity.username = 'someone_else';
    const result = await service.check();
    assert.equal(result.connection.status, 'needs-reconnect');
    assert.equal(upstream.calls.length, 1);
    assert.equal((await service.publicFeed()).status, 'unavailable');
    assert.equal(upstream.calls.length, 1);
  }));

test('auth error 190 keeps saved metadata but removes stale video/CDN URLs from public fallback', () =>
  fixture(async ({ service, upstream, state }) => {
    await service.check();
    state.now += 60000;
    upstream.error = { code: 190, message: SECRET_DETAIL, access_token: TOKEN };
    const result = await service.check();
    assert.equal(result.connection.status, 'needs-reconnect');
    assert.equal(result.items.length, 8);
    assert.equal(JSON.stringify(result).includes(SECRET_DETAIL), false);
    const feed = await service.publicFeed();
    assert.equal(feed.status, 'unavailable');
    assert.equal(feed.items.length, 6);
    assert.ok(
      feed.items.every(
        (item) => !item.videoUrl && item.thumbnail.startsWith('/'),
      ),
    );
    assert.equal(upstream.calls.length, 3);
  }));

test('transient provider failure is sanitized and retries after a minute', () =>
  fixture(async ({ service, upstream, state }) => {
    upstream.fetch = async () => {
      throw new Error(`${TOKEN}:${SECRET_DETAIL}`);
    };
    const result = await service.check();
    assert.equal(result.connection.status, 'unavailable');
    assert.equal(JSON.stringify(result).includes(TOKEN), false);
    await assert.rejects(
      service.check(),
      (error) => error.status === 429 && error.retryAfter === 60,
    );
    state.now += 60000;
    const recovered = gateway();
    upstream.fetch = recovered.fetch;
    assert.equal((await service.check()).connection.status, 'connected');
    assert.equal(recovered.calls.length, 2);
  }));

test('concurrent checks have one durable winner and report cooldown in whole seconds', () =>
  fixture(async ({ service, upstream, state, dependencies }) => {
    const results = await Promise.allSettled(
      Array.from({ length: 8 }, () => service.check()),
    );
    assert.equal(
      results.filter((result) => result.status === 'fulfilled').length,
      1,
    );
    const rejected = results.filter((result) => result.status === 'rejected');
    assert.ok(
      rejected.every(
        (result) =>
          result.reason.status === 429 && result.reason.retryAfter === 60,
      ),
    );
    assert.equal(upstream.calls.length, 2);
    state.now += 1234;
    await assert.rejects(
      createInstagramAdminData(dependencies).check(),
      (error) => error.status === 429 && error.retryAfter === 59,
    );
    state.now = NOW + 60000;
    assert.equal((await service.check()).connection.status, 'connected');
    assert.equal(upstream.calls.length, 4);
  }));

test('simultaneous editorial saves with the same revision cannot overwrite one another', () =>
  fixture(async ({ service }) => {
    const initial = await service.get();
    const first = manual([initial.items[0].id], {
      [initial.items[0].id]: 'Eerste keuze',
    });
    const second = manual([initial.items[1].id]);
    const results = await Promise.allSettled([
      service.save(first, initial.revision),
      service.save(second, initial.revision),
    ]);
    const winners = results.filter((result) => result.status === 'fulfilled');
    const losers = results.filter((result) => result.status === 'rejected');
    assert.equal(winners.length, 1);
    assert.equal(losers.length, 1);
    assert.equal(losers[0].reason.status, 409);
    const stored = await service.get();
    assert.deepEqual(stored.settings, winners[0].value.settings);
    assert.notEqual(stored.revision, initial.revision);
  }));

test('public content reflects editorial changes immediately without refreshing upstream', () =>
  fixture(async ({ service, upstream }) => {
    let snapshot = await service.check();
    snapshot = await service.save(
      manual(['test-7', 'test-2'], { 'test-7': 'Mijn gekozen titel' }),
      snapshot.revision,
    );
    let feed = await service.publicFeed();
    assert.deepEqual(
      feed.items.map((item) => item.id),
      ['test-7', 'test-2'],
    );
    assert.equal(feed.items[0].title, 'Mijn gekozen titel');
    assert.equal(upstream.calls.length, 2);
    snapshot = await service.save(manual(), snapshot.revision);
    feed = await service.publicFeed();
    assert.deepEqual(feed.items, []);
    assert.equal(feed.status, 'connected');
    assert.equal(upstream.calls.length, 2);
    await assert.rejects(
      service.save(manual(['arbitrary-provider-id']), snapshot.revision),
      invalid,
    );
  }));

test('selected older Reels remain ordered link-only items when they age out of the latest 24', () =>
  fixture(async ({ service, upstream, state }) => {
    let snapshot = await service.check();
    snapshot = await service.save(
      manual(['test-7', 'test-2']),
      snapshot.revision,
    );
    state.now += 60000;
    upstream.items = Array.from({ length: 24 }, (_, index) =>
      media(100 + index, {
        timestamp: new Date(NOW + (24 - index) * 60000).toISOString(),
      }),
    );
    snapshot = await service.check();
    assert.equal(snapshot.items.length, 26);
    const feed = await service.publicFeed();
    assert.deepEqual(
      feed.items.map((item) => item.id),
      ['test-7', 'test-2'],
    );
    assert.ok(
      feed.items.every(
        (item) => item.videoUrl === undefined && item.thumbnail.startsWith('/'),
      ),
    );
    assert.equal(feed.status, 'connected');
  }));

test('automatic settings prune aged-out titles and selections so the next edit can be saved', () =>
  fixture(async ({ service, upstream, state }) => {
    let snapshot = await service.check();
    snapshot = await service.save(
      {
        mode: 'automatic',
        selectedIds: ['test-7'],
        titles: { 'test-7': 'Oude aangepaste titel' },
      },
      snapshot.revision,
    );
    state.now += 60000;
    upstream.items = Array.from({ length: 24 }, (_, index) =>
      media(100 + index, {
        timestamp: new Date(NOW + (24 - index) * 60000).toISOString(),
      }),
    );
    snapshot = await service.check();
    assert.deepEqual(snapshot.settings, automatic);
    assert.equal(
      snapshot.items.some((item) => item.id === 'test-7'),
      false,
    );
    const revised = await service.save(
      {
        ...snapshot.settings,
        titles: { 'test-100': 'Nieuwe aangepaste titel' },
      },
      snapshot.revision,
    );
    assert.equal(
      revised.settings.titles['test-100'],
      'Nieuwe aangepaste titel',
    );
    assert.equal(
      (await service.publicFeed()).items[0].title,
      'Nieuwe aangepaste titel',
    );
    await assert.rejects(
      service.save(
        { ...revised.settings, titles: { arbitrary: 'Geen bekende video' } },
        revised.revision,
      ),
      invalid,
    );
  }));

test('empty live media is a valid connected empty feed and is not replaced with static cards', () =>
  fixture(async ({ service, upstream }) => {
    upstream.items = [];
    const result = await service.check();
    assert.equal(result.connection.status, 'connected');
    assert.deepEqual(result.items, []);
    assert.deepEqual((await service.publicFeed()).items, []);
  }));

test('fallback selections can be deliberately hidden before Instagram is configured', () =>
  fixture(async ({ service, state, upstream }) => {
    state.credentials = null;
    const initial = await service.get();
    await service.save(manual(), initial.revision);
    const feed = await service.publicFeed();
    assert.deepEqual(feed.items, []);
    assert.equal(feed.status, 'waiting');
    assert.equal(upstream.calls.length, 0);
  }));

test('an expired stored connection requires reconnection without an upstream request', () =>
  fixture(async ({ service, store, upstream }) => {
    await store.save(
      {
        userId: USER_ID,
        username: 'beurswatcher',
        token: 'encrypted-fixture',
        expiresAt: NOW - 1,
        refreshedAt: NOW - 86400000,
      },
      'expired-invite',
      NOW,
    );
    const result = await service.check();
    assert.equal(result.connection.status, 'needs-reconnect');
    assert.equal(result.connection.expiresAt, new Date(NOW - 1).toISOString());
    assert.equal(upstream.calls.length, 0);
  }));

test('a reconnect invalidates an older in-flight check even if the injected credentials stay equal', () =>
  fixture(async ({ service, store, upstream }) => {
    let started;
    let release;
    const entered = new Promise((resolve) => {
      started = resolve;
    });
    const gate = new Promise((resolve) => {
      release = resolve;
    });
    const original = upstream.fetch;
    upstream.fetch = async (...args) => {
      const response = await original(...args);
      if (new URL(args[0]).pathname.endsWith('/media')) {
        started();
        await gate;
      }
      return response;
    };
    const pending = service.check();
    await entered;
    await store.save(
      {
        userId: USER_ID,
        username: 'beurswatcher',
        token: 'new-encrypted-fixture',
        expiresAt: NOW + 60 * 86400000,
        refreshedAt: NOW,
      },
      'new-invite',
      NOW,
    );
    release();
    const result = await pending;
    assert.equal(result.connection.status, 'waiting');
    assert.equal(result.connection.checkedAt, null);
    assert.equal((await store.health()).mediaCheckedAt, null);
    assert.deepEqual(
      result.items.map((item) => item.id),
      reels.map((item) => item.id),
    );
  }));

test('login attempts are atomic: five per bucket per 15 minutes, then durable Retry-After', () =>
  fixture(async ({ store, client }) => {
    const results = await Promise.all(
      Array.from({ length: 20 }, () =>
        store.loginAttempt('local-fixture-bucket', NOW),
      ),
    );
    assert.equal(results.filter((result) => result.allowed).length, 5);
    assert.ok(
      results
        .filter((result) => !result.allowed)
        .every((result) => result.retryAfter === 900),
    );
    assert.deepEqual(
      await createInstagramStore(client).loginAttempt(
        'local-fixture-bucket',
        NOW + 1234,
      ),
      { allowed: false, retryAfter: 899 },
    );
    assert.deepEqual(
      await store.loginAttempt('different-fixture-bucket', NOW),
      { allowed: true, retryAfter: 0 },
    );
    assert.deepEqual(
      await store.loginAttempt('local-fixture-bucket', NOW + 900000),
      { allowed: true, retryAfter: 0 },
    );
    await store.clearLoginAttempts('local-fixture-bucket');
    assert.deepEqual(
      await store.loginAttempt('local-fixture-bucket', NOW + 900001),
      { allowed: true, retryAfter: 0 },
    );
  }));

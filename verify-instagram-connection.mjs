import assert from 'node:assert/strict';
import test from 'node:test';
import { createClient } from '@libsql/client';
import {
  InstagramProviderError,
  exchangeInstagramCode,
  instagramAuthorizeUrl,
  refreshInstagramToken,
} from './lib/instagram-provider.ts';
import { createInstagramStore } from './lib/instagram-store.ts';

// Local unit tests only: no real credentials, Meta calls, or persistent databases.
const DAY = 86400000;
const HOUR = 3600000;
const NOW = Date.UTC(2026, 9, 10, 12);
const USER_ID = '17840000000000001';
const SHORT_TOKEN = 'test-short-token-never-real';
const LONG_TOKEN = 'test-long-token-never-real';
const REFRESHED_TOKEN = 'test-refreshed-token-never-real';
const SENSITIVE = 'upstream-private-detail-must-not-escape';
const config = {
  appId: '123456789',
  appSecret: 'test-app-secret-never-real',
  origin: 'https://beurswatcher.example',
  redirectUri: 'https://beurswatcher.example/api/instagram/callback',
  username: 'beurswatcher',
};

const shortResponse = (extra = {}) => ({
  access_token: SHORT_TOKEN,
  user_id: USER_ID,
  permissions: 'instagram_business_basic',
  ...extra,
});
const longResponse = (extra = {}) => ({
  access_token: LONG_TOKEN,
  token_type: 'bearer',
  expires_in: 60 * 86400,
  ...extra,
});
const identityResponse = (extra = {}) => ({
  user_id: USER_ID,
  username: 'BeursWatcher',
  ...extra,
});
const ok = (body) => ({ body, status: 200 });

async function withFetch(responses, exercise) {
  const originalFetch = globalThis.fetch;
  const remaining = [...responses];
  const calls = [];
  globalThis.fetch = async (input, init) => {
    calls.push({ url: new URL(String(input)), init });
    const response = remaining.shift();
    if (!response) throw new Error('Unexpected additional mocked request');
    if (response.networkError) throw new Error(response.networkError);
    return new Response(response.raw ?? JSON.stringify(response.body), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  };
  try {
    await exercise(calls);
    assert.equal(remaining.length, 0, 'Every expected request was exercised');
    assert.equal(
      calls.length,
      responses.length,
      'No unexpected request escaped the stub',
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function rejectsSafely(action, reconnect = false) {
  await assert.rejects(action, (error) => {
    assert.ok(error instanceof InstagramProviderError);
    assert.equal(error.message, 'Instagram is tijdelijk niet beschikbaar');
    assert.equal(error.reconnect, reconnect);
    const exposed = `${error.message}\n${error.stack}\n${JSON.stringify(error)}`;
    for (const secret of [
      SENSITIVE,
      SHORT_TOKEN,
      LONG_TOKEN,
      config.appSecret,
    ]) {
      assert.equal(
        exposed.includes(secret),
        false,
        'Provider errors must not expose secrets',
      );
    }
    assert.equal(error.cause, undefined);
    return true;
  });
}

async function withStore(exercise) {
  const client = createClient({ url: 'file::memory:' });
  try {
    await exercise(createInstagramStore(client));
  } finally {
    client.close();
  }
}

const connectionRecord = (extra = {}) => ({
  userId: USER_ID,
  username: 'beurswatcher',
  token: 'test-encrypted-envelope-original',
  expiresAt: NOW + 10 * DAY,
  refreshedAt: NOW - 2 * DAY,
  ...extra,
});

await test('authorization requests only read permission and preserves callback/state', () => {
  const state = 'random-state-with-+/?=&';
  const url = new URL(instagramAuthorizeUrl(config, state));
  assert.equal(url.origin, 'https://www.instagram.com');
  assert.equal(url.pathname, '/oauth/authorize');
  assert.deepEqual(Object.fromEntries(url.searchParams), {
    client_id: config.appId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: 'instagram_business_basic',
    state,
    enable_fb_login: 'false',
    force_reauth: 'true',
  });
  assert.equal(url.href.includes(config.appSecret), false);
});

await test('code exchange supports flat and wrapped token/identity responses', async (t) => {
  for (const wrapped of [false, true]) {
    await t.test(wrapped ? 'wrapped data arrays' : 'flat objects', async () => {
      const wrap = (body) => (wrapped ? { data: [body] } : body);
      await withFetch(
        [
          ok(wrap(shortResponse())),
          ok(longResponse()),
          ok(wrap(identityResponse())),
        ],
        async (calls) => {
          assert.deepEqual(
            await exchangeInstagramCode(config, 'one-time-code'),
            {
              accessToken: LONG_TOKEN,
              expiresIn: 60 * 86400,
              userId: USER_ID,
              username: 'beurswatcher',
            },
          );
          assert.equal(
            calls[0].url.href,
            'https://api.instagram.com/oauth/access_token',
          );
          assert.equal(calls[0].init.method, 'POST');
          assert.ok(calls[0].init.body instanceof FormData);
          assert.deepEqual(Object.fromEntries(calls[0].init.body), {
            client_id: config.appId,
            client_secret: config.appSecret,
            grant_type: 'authorization_code',
            redirect_uri: config.redirectUri,
            code: 'one-time-code',
          });
          assert.equal(calls[1].url.origin, 'https://graph.instagram.com');
          assert.equal(calls[1].url.pathname, '/access_token');
          assert.deepEqual(Object.fromEntries(calls[1].url.searchParams), {
            grant_type: 'ig_exchange_token',
            client_secret: config.appSecret,
            access_token: SHORT_TOKEN,
          });
          assert.equal(calls[2].url.origin, 'https://graph.instagram.com');
          assert.match(calls[2].url.pathname, /^\/v\d+\.\d+\/me$/);
          assert.equal(
            calls[2].url.searchParams.get('fields'),
            'user_id,username',
          );
          assert.equal(
            calls[2].init.headers.Authorization,
            `Bearer ${LONG_TOKEN}`,
          );
          for (const { init } of calls) {
            assert.equal(init.cache, 'no-store');
            assert.equal(init.redirect, 'error');
            assert.ok(init.signal instanceof AbortSignal);
          }
        },
      );
    });
  }
});

await test('a permission array is accepted when the basic permission is granted', async () => {
  await withFetch(
    [
      ok(shortResponse({ permissions: ['instagram_business_basic'] })),
      ok(longResponse()),
      ok(identityResponse()),
    ],
    async () => {
      assert.equal(
        (await exchangeInstagramCode(config, 'code')).userId,
        USER_ID,
      );
    },
  );
});

await test('large numeric account IDs retain every digit and token strings stay unchanged', async () => {
  const exactId = '17841405793187218';
  const tokenWithDigits = 'token-17841405793187218-"12345678901234567"';
  await withFetch(
    [
      {
        status: 200,
        raw: `{"data":[{"access_token":${JSON.stringify(SHORT_TOKEN)},"user_id":${exactId},"permissions":"instagram_business_basic"}]}`,
      },
      ok(longResponse({ access_token: tokenWithDigits })),
      {
        status: 200,
        raw: `{"data":[{"user_id":${exactId},"username":"BeursWatcher"}]}`,
      },
    ],
    async () => {
      const result = await exchangeInstagramCode(config, 'code');
      assert.equal(result.userId, exactId);
      assert.equal(result.accessToken, tokenWithDigits);
    },
  );
});

await test('missing required permission stops exchange and requests reconnection', async (t) => {
  for (const permissions of [
    '',
    [],
    ['instagram_business_manage_comments'],
    'instagram_business_content_publish',
  ]) {
    await t.test(
      `permission value ${JSON.stringify(permissions)}`,
      async () => {
        await withFetch([ok(shortResponse({ permissions }))], async () => {
          await rejectsSafely(
            () => exchangeInstagramCode(config, 'code'),
            true,
          );
        });
      },
    );
  }
});

await test('invalid token-account IDs are rejected before later requests', async (t) => {
  for (const user_id of [
    undefined,
    '',
    'abc',
    '-42',
    '1.5',
    ' 123',
    '1'.repeat(41),
  ]) {
    await t.test(`invalid ID ${String(user_id)}`, async () => {
      await withFetch([ok(shortResponse({ user_id }))], async () => {
        await rejectsSafely(() => exchangeInstagramCode(config, 'code'));
      });
    });
  }
  await t.test('unsafe exponent-form numeric ID', async () => {
    await withFetch(
      [
        {
          status: 200,
          raw: `{"access_token":${JSON.stringify(SHORT_TOKEN)},"user_id":1e30}`,
        },
      ],
      async () => {
        await rejectsSafely(() => exchangeInstagramCode(config, 'code'));
      },
    );
  });
});

await test('identity must be well formed and match the token account', async (t) => {
  for (const [name, identity] of [
    ['different account', identityResponse({ user_id: '17840000000000002' })],
    ['malformed ID', identityResponse({ user_id: 'not-an-id' })],
    [
      'different numeric ID',
      identityResponse({ user_id: Number.MAX_SAFE_INTEGER + 1 }),
    ],
    ['missing username', identityResponse({ username: undefined })],
    ['missing wrapped identity', { data: [] }],
  ]) {
    await t.test(name, async () => {
      await withFetch(
        [ok(shortResponse()), ok(longResponse()), ok(identity)],
        async () => {
          await rejectsSafely(() => exchangeInstagramCode(config, 'code'));
        },
      );
    });
  }
});

await test('invalid token lifetimes and malformed refresh tokens are rejected', async (t) => {
  for (const expires_in of [
    undefined,
    0,
    -1,
    86399,
    '5184000',
    NaN,
    Infinity,
    90 * 86400 + 1,
  ]) {
    await t.test(`invalid expiry ${String(expires_in)}`, async () => {
      await withFetch([ok(longResponse({ expires_in }))], async () => {
        await rejectsSafely(() => refreshInstagramToken(LONG_TOKEN));
      });
    });
  }
  for (const access_token of [undefined, '', 'short', 'x'.repeat(8193)]) {
    await t.test(
      `invalid token length ${access_token?.length ?? 'missing'}`,
      async () => {
        await withFetch([ok(longResponse({ access_token }))], async () => {
          await rejectsSafely(() => refreshInstagramToken(LONG_TOKEN));
        });
      },
    );
  }
});

await test('refresh uses the official grant and accepts the returned lifetime', async () => {
  await withFetch(
    [ok(longResponse({ access_token: REFRESHED_TOKEN }))],
    async (calls) => {
      assert.deepEqual(await refreshInstagramToken(LONG_TOKEN), {
        accessToken: REFRESHED_TOKEN,
        expiresIn: 60 * 86400,
      });
      assert.equal(calls[0].url.origin, 'https://graph.instagram.com');
      assert.equal(calls[0].url.pathname, '/refresh_access_token');
      assert.deepEqual(Object.fromEntries(calls[0].url.searchParams), {
        grant_type: 'ig_refresh_token',
        access_token: LONG_TOKEN,
      });
    },
  );
});

await test('provider failures are sanitized and distinguish expired authorization', async (t) => {
  for (const [name, response, reconnect] of [
    [
      'Meta code 190',
      { status: 400, body: { error: { code: 190, message: SENSITIVE } } },
      true,
    ],
    [
      'Meta code 102',
      { status: 400, body: { error: { code: 102, message: SENSITIVE } } },
      true,
    ],
    [
      'temporary server error',
      { status: 503, body: { error: { code: 2, message: SENSITIVE } } },
      false,
    ],
    [
      'network exception',
      { networkError: `${SENSITIVE}:${LONG_TOKEN}` },
      false,
    ],
    [
      'invalid JSON',
      { status: 200, raw: `not-json:${SENSITIVE}:${config.appSecret}` },
      false,
    ],
  ]) {
    await t.test(name, async () => {
      await withFetch([response], async () => {
        await rejectsSafely(() => refreshInstagramToken(LONG_TOKEN), reconnect);
      });
    });
  }
});

await test('parallel callback flow consumption has exactly one winner', async () => {
  await withStore(async (store) => {
    assert.equal(await store.get(), null);
    const results = await Promise.all(
      Array.from({ length: 16 }, () => store.consumeFlow('flow-hash', NOW)),
    );
    assert.equal(results.filter(Boolean).length, 1);
    assert.equal(await store.consumeFlow('flow-hash', NOW + 1), false);
    assert.equal(await store.consumeFlow('independent-flow-hash', NOW), true);
  });
});

await test('invitation consumption and saving are atomic under duplicate callbacks', async () => {
  await withStore(async (store) => {
    await store.save(connectionRecord(), 'first-invite', NOW);
    const candidates = [
      connectionRecord({ token: 'test-encrypted-envelope-A' }),
      connectionRecord({ token: 'test-encrypted-envelope-B' }),
    ];
    const results = await Promise.allSettled(
      candidates.map((record) => store.save(record, 'same-invite', NOW)),
    );
    const successful = results.flatMap((result, index) =>
      result.status === 'fulfilled' ? [index] : [],
    );
    assert.equal(successful.length, 1);
    assert.equal(
      results.filter((result) => result.status === 'rejected').length,
      1,
    );
    assert.equal(await store.inviteUsed('same-invite'), true);
    const winner = await store.get();
    assert.equal(winner.token, candidates[successful[0]].token);
    await assert.rejects(() =>
      store.save(
        connectionRecord({ token: 'replayed-token' }),
        'same-invite',
        NOW + 1,
      ),
    );
    assert.deepEqual(
      await store.get(),
      winner,
      'Replay must not partially overwrite the connection',
    );
  });
});

await test('parallel refresh claims acquire one lease', async () => {
  await withStore(async (store) => {
    await store.save(connectionRecord(), 'invite', NOW);
    const results = await Promise.all(
      Array.from({ length: 16 }, () => store.claimRefresh(NOW)),
    );
    const winners = results.filter(Boolean);
    assert.equal(winners.length, 1);
    assert.ok(winners[0].lease);
    await store.finishRefresh(winners[0], REFRESHED_TOKEN, NOW + 60 * DAY, NOW);
    const current = await store.get();
    assert.equal(current.token, REFRESHED_TOKEN);
    assert.equal(current.expiresAt, NOW + 60 * DAY);
    assert.equal(current.refreshedAt, NOW);
    assert.equal(current.lease, '');
    assert.equal(
      await store.claimRefresh(NOW + DAY),
      null,
      'Fresh tokens should not refresh again',
    );
  });
});

await test('tokens younger than 24 hours cannot be claimed for refresh', async () => {
  await withStore(async (store) => {
    await store.save(
      connectionRecord({ refreshedAt: NOW - HOUR }),
      'invite',
      NOW,
    );
    assert.equal(await store.claimRefresh(NOW), null);
  });
});

await test('reconnecting prevents an old refresh from overwriting or disabling the new account', async () => {
  await withStore(async (store) => {
    await store.save(connectionRecord(), 'initial-invite', NOW);
    const previous = await store.claimRefresh(NOW);
    assert.ok(previous);
    await store.save(
      connectionRecord({
        token: 'newly-connected-encrypted-token',
        refreshedAt: NOW,
      }),
      'new-invite',
      NOW + 1,
    );
    const reconnected = await store.get();
    assert.notEqual(reconnected.revision, previous.revision);
    await store.finishRefresh(
      previous,
      'stale-refresh-token',
      NOW + 60 * DAY,
      NOW + 2,
    );
    assert.deepEqual(await store.get(), reconnected);
    await store.failRefresh(previous, true);
    assert.deepEqual(await store.get(), reconnected);
  });
});

await test('a superseded lease cannot complete or fail a newer refresh on the same connection', async () => {
  await withStore(async (store) => {
    await store.save(connectionRecord(), 'invite', NOW);
    const oldLease = await store.claimRefresh(NOW);
    const nextTime = NOW + 6 * HOUR + 1;
    const newLease = await store.claimRefresh(nextTime);
    assert.ok(oldLease);
    assert.ok(newLease);
    assert.equal(newLease.revision, oldLease.revision);
    assert.notEqual(newLease.lease, oldLease.lease);
    await store.finishRefresh(
      oldLease,
      'stale-token',
      nextTime + 60 * DAY,
      nextTime,
    );
    await store.failRefresh(oldLease, true);
    assert.deepEqual(await store.get(), newLease);
    await store.finishRefresh(
      newLease,
      REFRESHED_TOKEN,
      nextTime + 60 * DAY,
      nextTime,
    );
    assert.equal((await store.get()).token, REFRESHED_TOKEN);
  });
});

await test('expired tokens require reconnection and are never handed to the refresh worker', async () => {
  await withStore(async (store) => {
    await store.save(connectionRecord({ expiresAt: NOW }), 'invite', NOW);
    assert.equal(await store.claimRefresh(NOW), null);
    assert.equal((await store.get()).status, 'needs-reconnect');
  });
});

await test('transient failures retain the connection and defer a retry for six hours', async () => {
  await withStore(async (store) => {
    await store.save(connectionRecord(), 'invite', NOW);
    const previous = await store.claimRefresh(NOW);
    assert.ok(previous);
    await store.failRefresh(previous, false);
    const current = await store.get();
    assert.equal(current.status, 'connected');
    assert.equal(current.token, previous.token);
    assert.equal(current.lease, '');
    assert.equal(await store.claimRefresh(NOW + HOUR), null);
    assert.ok(await store.claimRefresh(NOW + 6 * HOUR + 1));
  });
});

await test('authorization failures stop subsequent automatic refresh attempts', async () => {
  await withStore(async (store) => {
    await store.save(connectionRecord(), 'invite', NOW);
    const previous = await store.claimRefresh(NOW);
    assert.ok(previous);
    await store.failRefresh(previous, true);
    assert.equal((await store.get()).status, 'needs-reconnect');
    assert.equal(await store.claimRefresh(NOW + 7 * HOUR), null);
  });
});

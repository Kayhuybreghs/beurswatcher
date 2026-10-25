import assert from 'node:assert/strict';
import test from 'node:test';
import {
  instagramConnectFailure,
  instagramConnectErrorMessage,
} from './app/instagram-connect-errors.ts';

test('known pre-OAuth failures preserve an actionable category', () => {
  for (const [code, status, action] of [
    ['session-expired', 401, /Log opnieuw in/],
    ['wrong-origin', 403, /dezelfde browser/],
    ['setup-unavailable', 503, /Instellingen controleren/],
    ['start-unavailable', 503, /Instagram is nog niet geopend/],
  ]) {
    const failure = instagramConnectFailure(code);
    assert.equal(failure.status, status);
    assert.equal(failure.body.code, code);
    assert.match(instagramConnectErrorMessage(status, failure.body), action);
  }
});

test('unknown, malformed and mismatched responses cannot claim a specific cause', () => {
  const fallback = instagramConnectErrorMessage(0, null);
  assert.match(fallback, /oorzaak is nog niet vastgesteld/);
  for (const body of [
    null,
    'setup-unavailable',
    ['setup-unavailable'],
    {},
    { code: 503 },
    { code: 'provider-said-secret' },
    { code: 'constructor' },
    { code: 'toString' },
    { code: '__proto__' },
  ])
    assert.equal(instagramConnectErrorMessage(503, body), fallback);
  assert.equal(
    instagramConnectErrorMessage(403, { code: 'setup-unavailable' }),
    fallback,
  );
});

test('raw API messages, nested data and credentials never become user-facing copy', () => {
  const privateText = 'do-not-display-test-secret-or-oauth-code';
  for (const code of ['setup-unavailable', 'unknown']) {
    const message = instagramConnectErrorMessage(503, {
      code,
      error: privateText,
      message: privateText,
      details: { token: privateText },
      url: `https://www.instagram.com/oauth/authorize?state=${privateText}`,
    });
    assert.equal(message.includes(privateText), false);
    assert.equal(message.includes('/oauth/authorize'), false);
  }
});

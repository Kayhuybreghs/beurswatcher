import assert from 'node:assert/strict';
const origin = process.env.SITE_ORIGIN || 'http://localhost:5186';
for (const path of [
  '/',
  '/artikelen',
  '/artikelen/wereld-etf-basis',
  '/tools/box-3',
  '/markt/macro',
  '/partners/delta',
  '/nieuwsbrief',
  '/contact',
  '/tools',
  '/tools/etf-kosten',
  '/tools/doelvermogen',
  '/tools/aflossen-of-beleggen',
  '/tools/compound-interest',
  '/markt',
  '/markt/earnings',
  '/markt/indices',
  '/events',
  '/events/beleggersborrel-utrecht-2026',
  '/zakelijk-samenwerken',
  '/over',
  '/zoeken',
  '/tools/inflatie',
  '/tools/lump-sum-dca',
  '/tools/dividend',
  '/beleggen/portfolio',
  '/beleggen/reizen',
  '/artikelen/portefeuille-in-overzicht',
  '/artikelen/reisvoordelen-afwegen',
  '/partners',
  '/partners/scalable-capital',
  '/beleggen',
  '/beleggen/pensioen',
]) {
  const r = await fetch(origin + path);
  assert.equal(r.status, 200, path);
  console.log(path + ' 200');
}
const missing = await fetch(origin + '/bestaat-echt-niet');
assert.equal(missing.status, 404);
console.log('404 correct');
const request = (path, method, data) =>
  fetch(origin + path, {
    method,
    headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify(data),
  });
assert.equal(
  (
    await request('/api/nieuwsbrief', 'POST', {
      email: 'geen-email',
      consent: true,
    })
  ).status,
  400,
);
const email = 'verification-' + Date.now() + '@example.invalid';
const post = await request('/api/nieuwsbrief', 'POST', {
  email,
  consent: true,
});
assert.equal(post.status, 200);
const result = await post.json();
assert.ok(result.unsubscribeToken);
const repeat = await request('/api/nieuwsbrief', 'POST', {
  email,
  consent: true,
});
assert.equal((await repeat.json()).unsubscribeToken, null);
const wrong = await request('/api/nieuwsbrief', 'DELETE', {
  email,
  token: 'wrong-token'.repeat(5),
});
assert.equal(wrong.status, 400);
const remove = await request('/api/nieuwsbrief', 'DELETE', {
  email,
  token: result.unsubscribeToken,
});
assert.equal(remove.status, 200);
assert.equal(
  (
    await request('/api/contact', 'POST', {
      name: '',
      email: 'x',
      message: 'x',
    })
  ).status,
  400,
);
console.log(
  'Aanmelden, dubbele aanmelding, tokenbeveiliging, afmelden en invoervalidatie geslaagd',
);

for (const business of [
  { type: 'business', interest: 'Kennismaken' },
  { type: 'business', company: 'Lokale test', interest: 'Ongeldig onderwerp' },
  { type: 'unsupported' },
]) {
  const invalidBusiness = await request('/api/contact', 'POST', {
    name: 'Formuliercontrole',
    email: 'route-test@example.invalid',
    message: 'Controle van zakelijke invoervalidatie.',
    ...business,
  });
  assert.equal(
    invalidBusiness.status,
    400,
    'Ongeldige zakelijke velden worden afgewezen',
  );
}
console.log('Zakelijke formulierinvoer gevalideerd');

const feed = await fetch(origin + '/api/markt');
assert.equal(feed.status, 200);
const payload = await feed.json();
assert.equal(payload.mode, 'demo');
assert.ok(payload.markets.length >= 6);
assert.equal(payload.asOf, null);
console.log('Markt API geeft expliciete voorbeelddata terug');

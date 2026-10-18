import assert from 'node:assert/strict';
import { articles } from './app/data.ts';
import { guides, guideSources } from './app/guide-data.ts';

// Run against a built local preview or the public deployment. This reads pages;
// it never submits a sitemap, requests indexing, or changes Search Console.
const origin = process.argv[2] || 'http://127.0.0.1:5198';
const decode = (value) =>
  value.replace(
    /&(amp|quot|apos|#x27|lt|gt);/g,
    (_, entity) =>
      ({ amp: '&', quot: '"', apos: "'", '#x27': "'", lt: '<', gt: '>' })[
        entity
      ],
  );

async function pageAt(path) {
  const response = await fetch(origin + path, {
    headers: { 'User-Agent': 'facebookexternalhit/1.1' },
    signal: AbortSignal.timeout(15000),
  });
  const html = await response.text();
  const metadata = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => ({
    key: tag.match(/(?:name|property)="([^"]+)"/)?.[1],
    value: decode(tag.match(/content="([^"]*)"/)?.[1] || ''),
  }));
  return {
    response,
    html,
    metadata,
    title: decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || ''),
  };
}

for (const path of [
  '/seo-controle-pagina-bestaat-niet',
  '/uitleg/seo-controle-bestaat-niet',
]) {
  const { response, html, metadata, title } = await pageAt(path);
  assert.equal(response.status, 404, path);
  assert.equal(title, 'Pagina niet gevonden | Beurswatcher', path);
  assert.ok(
    !html.includes('rel="canonical"'),
    path + ': no homepage canonical',
  );
  const robotTokens = metadata
    .filter((m) => m.key === 'robots')
    .flatMap((m) => m.value.split(',').map((v) => v.trim()));
  assert.ok(robotTokens.includes('noindex'), path + ': noindex');
  assert.ok(
    !robotTokens.includes('index'),
    path + ': no conflicting inherited index',
  );
  for (const key of ['og:title', 'twitter:title']) {
    assert.equal(
      metadata.find((m) => m.key === key)?.value,
      title,
      path + ': honest shared error preview',
    );
  }
}

for (const article of articles) {
  const path = '/artikelen/' + article.slug;
  const { response, html, metadata, title } = await pageAt(path);
  assert.equal(response.status, 200, path);
  assert.equal(title, `Voorbeeld: ${article.title} | Beurswatcher`, path);
  assert.ok(html.includes('REDACTIONEEL VOORBEELD'), path + ': visible label');
  assert.ok(
    metadata.some((m) => m.key === 'robots' && m.value.includes('noindex')),
    path,
  );
  for (const key of ['description', 'og:description', 'twitter:description']) {
    assert.ok(
      metadata
        .find((m) => m.key === key)
        ?.value.startsWith(
          'Redactioneel voorbeeld, nog niet inhoudelijk beoordeeld door Daniel. ',
        ),
      path + ': ' + key,
    );
  }
}

for (const guide of guides) {
  const path = '/uitleg/' + guide.slug;
  const { response, html, title } = await pageAt(path);
  assert.equal(response.status, 200, path);
  assert.equal(
    title,
    `${guide.title} | Beurswatcher`,
    path + ': general guide is not a sample blog',
  );
  const graph = [
    ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
  ].flatMap((match) => {
    const data = JSON.parse(match[1]);
    return data['@graph'] || [data];
  });
  const citation = graph.find((item) => item['@type'] === 'Article')?.citation;
  assert.equal(
    citation?.url,
    guideSources[guide.source][1],
    path + ': citation',
  );
  const visibleSource = decode(
    html.match(/<aside class="guide-evidence"[^>]*>([\s\S]*?)<\/aside>/)?.[1] || '',
  );
  assert.ok(
    visibleSource.includes(`href="${citation.url}"`),
    path + ': citation is a visible link',
  );
}

console.log(
  JSON.stringify(
    {
      origin,
      notFoundResponses: 2,
      honestSamplePreviews: articles.length,
      visibleGuideCitations: guides.length,
      result: 'passed',
    },
    null,
    2,
  ),
);

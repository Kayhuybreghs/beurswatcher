import assert from 'node:assert/strict';
import { guides } from './app/guide-data.ts';
import { topicContent } from './app/topic-content.ts';
import { topicInlineLinks } from './app/topic-inline-links.ts';

// Exercise the deployed routes and crosslinks, not only the source records.
const base = process.argv[2] || 'http://127.0.0.1:5186';
const canonical = 'https://beurswatcher.vercel.app';
const escape = (s) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;');
const html = async (path) => {
  const r = await fetch(base + path);
  assert.equal(r.status, 200, path);
  return r.text();
};
assert.equal(new Set(guides.map((g) => g.slug)).size, guides.length);
const toolSlugs = [...new Set(guides.map((g) => g.tool))];
assert.equal(toolSlugs.length, 9);
const sitemap = await html('/sitemap.xml');
for (const g of guides) {
  const path = '/uitleg/' + g.slug;
  const page = await html(path);
  assert.ok(page.includes('<h1>' + escape(g.title) + '</h1>'), path + ' title');
  assert.ok(
    page.includes('rel="canonical" href="' + canonical + path + '"'),
    path + ' canonical',
  );
  assert.ok(
    page.includes('href="/tools/' + g.tool + '"'),
    path + ' calculator link',
  );
  assert.ok(sitemap.includes(canonical + path), path + ' sitemap');
  const script = [
    ...page.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
  ].map((x) => JSON.parse(x[1]));
  const graph = script.find((x) => x['@graph'])?.['@graph'];
  assert.ok(graph, path + ' structured data');
  assert.deepEqual(
    graph
      .find((x) => x['@type'] === 'FAQPage')
      .mainEntity.map((q) => [q.name, q.acceptedAnswer.text]),
    g.faq,
  );
  for (const [q] of g.faq)
    assert.ok(page.includes(escape(q)), path + ' visible FAQ');
  for (const topic of g.topics)
    assert.ok(topicContent[topic], path + ' existing topic');
}
for (const tool of toolSlugs) {
  const page = await html('/tools/' + tool);
  const related = guides.filter((g) => g.tool === tool);
  assert.ok(related.length >= 2);
  for (const g of related)
    assert.ok(
      page.includes('href="/uitleg/' + g.slug + '"'),
      tool + ' backlink',
    );
}
for (const [slug, content] of Object.entries(topicContent)) {
  const page = await html('/verdieping/' + slug);
  const inline = [
    ...page.matchAll(/<a[^>]*class="topic-inline-link"[^>]*>(.*?)<\/a>/gs),
  ];
  assert.equal(inline.length, 2, slug + ' exactly two links in the prose');
  for (const link of topicInlineLinks[slug]) {
    assert.ok(
      inline.some(
        ([anchor, label]) =>
          anchor.includes('href="' + link.href + '"') &&
          label === escape(link.text),
      ),
      slug + ' contextual link',
    );
    await html(link.href);
  }
  assert.ok(page.includes(escape(content.title)), slug + ' content');
  assert.ok(page.includes('onderwerp-vragen'), slug + ' FAQ');
  for (const [heading] of content.sections)
    assert.ok(page.includes(escape(heading)), slug + ' chapter');
  if (content.example) {
    assert.ok(
      page.includes(escape(content.example.title)),
      slug + ' worked example',
    );
    assert.ok(
      page.includes('id="praktijkvoorbeeld"'),
      slug + ' example anchor',
    );
  }
  for (const [, url] of content.sources || [])
    assert.ok(
      page.includes('href="' + escape(url) + '"'),
      slug + ' source link',
    );
}
const example = await html('/artikelen/een-plan-voor-onrust');
assert.match(example, /name="robots" content="noindex, follow"/);
assert.ok(!sitemap.includes('/artikelen/een-plan-voor-onrust'));
assert.equal((await fetch(base + '/uitleg/bestaat-niet')).status, 404);
console.log(
  `${guides.length} guide routes, ${toolSlugs.length} tool backlink collections, ${Object.keys(topicContent).length} topic pages, canonical URLs, FAQ schema, sitemap and example noindex passed on ${base}`,
);

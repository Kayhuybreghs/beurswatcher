import assert from 'node:assert/strict';
import { guides } from './app/guide-data.ts';
import { topics } from './app/data.ts';

// Verify the HTML delivered to crawlers before anyone opens the accordions.
const base = process.argv[2] || 'http://127.0.0.1:5198';
async function mainAt(path) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const main = html.match(
    /<main\b[^>]*id="inhoud"[^>]*>([\s\S]*?)<\/main>/,
  )?.[1];
  assert.ok(main, path + ': rendered page content, not the loading boundary');
  return main;
}
const linksIn = (html) =>
  [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((m) => m[1]);
const archive = await mainAt('/artikelen');
const directory = archive.slice(
  archive.indexOf('class="topic-directory"'),
  archive.indexOf('class="journal-library"'),
);
const directoryLinks = new Set(linksIn(directory));
for (const [slug] of topics) {
  assert.ok(
    directoryLinks.has('/verdieping/' + slug),
    'Topic available before interaction: ' + slug,
  );
}
assert.equal(
  (archive.match(/role="tab"/g) || []).length,
  0,
  'Filters must not claim a tabpanel relationship',
);
assert.ok(
  archive.includes(
    '<fieldset class="article-category-filters" aria-label="Filter artikelen op onderwerp"',
  ),
);
assert.equal(
  (archive.match(/aria-pressed="true"/g) || []).length,
  1,
  'One active category filter',
);
assert.ok(
  archive.includes('class="journal-count" aria-live="polite"'),
  'Announce updated result count',
);

let topicReturnLinks = 0;
for (const guide of guides) {
  const main = await mainAt('/uitleg/' + guide.slug);
  assert.ok(
    main.includes('aria-label="Kruimelpad"'),
    guide.slug + ': visible breadcrumbs',
  );
  assert.ok(
    main.includes('aria-current="page"'),
    guide.slug + ': current page indicated',
  );
  assert.ok(
    main.includes('aria-label="Inhoud van deze uitleg"'),
    guide.slug + ': content navigation',
  );
  const relatedTopics =
    main.match(/<nav class="guide-topic-links"[^>]*>([\s\S]*?)<\/nav>/)?.[1] ||
    '';
  const actual = linksIn(relatedTopics).sort((a, b) => a.localeCompare(b));
  assert.deepEqual(
    actual,
    guide.topics
      .map((slug) => '/verdieping/' + slug)
      .sort((a, b) => a.localeCompare(b)),
    guide.slug + ': all relevant topic paths',
  );
  topicReturnLinks += actual.length;
}
for (const [slug] of topics) {
  const main = await mainAt('/verdieping/' + slug);
  assert.ok(
    main.includes('aria-label="Kruimelpad"'),
    slug + ': visible breadcrumbs',
  );
  assert.ok(
    main.includes('aria-current="page"'),
    slug + ': current page indicated',
  );
  const inlineCount = (main.match(/class="topic-inline-link"/g) || []).length;
  assert.ok(inlineCount <= 2, slug + ': at most two prose links');
  const collection = main.slice(main.indexOf('class="topic-story-collection"'));
  const heading = collection
    .match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1]
    .replace(/<!--.*?-->/g, '');
  if (slug === 'dividend') assert.equal(heading, 'Verder lezen over dividend.');
  if (slug === 'portfolio')
    assert.equal(heading, 'Verder lezen over portefeuilles.');
}
console.log(
  JSON.stringify(
    {
      origin: base,
      crawlableDirectoryTopics: topics.length,
      guideTopicReturnLinks: topicReturnLinks,
      visibleBreadcrumbPages: guides.length + topics.length,
      filterSemantics: 'passed',
      topicProseLinkLimit: 'passed',
    },
    null,
    2,
  ),
);

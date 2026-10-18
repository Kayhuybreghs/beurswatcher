import assert from 'node:assert/strict';
import { guides } from './app/guide-data.ts';
import { guideAnalyses } from './app/guide-analyses.ts';
import { topicInvestigations } from './app/topic-investigations.ts';
import { guideSourceNotes } from './app/guide-source-notes.ts';
import { articles } from './app/data.ts';
import { educationRevision } from './app/education-revision.ts';

const base = process.argv[2] || 'http://127.0.0.1:5198';
const escape = (text) =>
  String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;');
async function read(path) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const main = html.match(
    /<main\b[^>]*id="inhoud"[^>]*>([\s\S]*?)<\/main>/,
  )?.[1];
  assert.ok(main, 'Server renders main content: ' + path);
  return { html, main };
}
let checkedRows = 0;
for (const guide of guides) {
  const { main, html } = await read('/uitleg/' + guide.slug);
  assert.ok(
    main.includes(escape(guideSourceNotes[guide.slug])),
    guide.slug + ': precise source note visible',
  );
  assert.ok(main.includes('id="bron"'), guide.slug + ': source anchor');
  assert.ok(
    main.includes('dateTime="' + educationRevision.iso + '"'),
    guide.slug + ': visible revision date',
  );
  assert.ok(
    html.includes('"dateModified":"' + educationRevision.iso + '"'),
    guide.slug + ': matching schema date',
  );
  for (const paragraph of guide.example[1].split('\n\n'))
    assert.ok(
      main.includes(escape(paragraph)),
      guide.slug + ': full worked example',
    );
  const analysis = guideAnalyses[guide.slug];
  if (analysis) {
    assert.ok(
      main.includes(escape(analysis.title)) &&
        main.includes(escape(analysis.method)),
      guide.slug + ': complete analysis in initial HTML',
    );
    const table = main.match(/<table>([\s\S]*?)<\/table>/)?.[1];
    assert.ok(table, guide.slug + ': real semantic table');
    assert.equal(
      (table.match(/scope="col"/g) || []).length,
      analysis.columns.length,
    );
    assert.equal(
      (table.match(/scope="row"/g) || []).length,
      analysis.rows.length,
    );
    for (const row of analysis.rows)
      for (const value of row)
        assert.ok(
          table.includes(
            escape(
              typeof value === 'number' ? value.toLocaleString('nl-NL') : value,
            ),
          ),
          guide.slug + ': table value ' + value,
        );
    checkedRows += analysis.rows.length;
    assert.ok(
      main.includes('Download de tabel en aannames (CSV)'),
      guide.slug + ': export control',
    );
  }
}
for (const [slug, investigation] of Object.entries(topicInvestigations)) {
  const { main } = await read('/verdieping/' + slug);
  for (const text of [
    investigation.title,
    investigation.intro,
    ...investigation.steps.flat(),
    investigation.conclusion,
    investigation.trap,
    investigation.evidence,
  ])
    assert.ok(main.includes(escape(text)), slug + ': complete case text');
  assert.ok(
    main.includes('id="uitgewerkt"') && main.includes('id="onderwerp-bronnen"'),
    slug + ': working content anchors',
  );
  if (!guides.some((g) => g.topics.includes(slug)))
    assert.ok(
      !main.includes('topic-blog-search'),
      slug + ': no empty search promise',
    );
}
for (const path of [
  '/artikelen',
  '/zoeken',
  ...Object.keys(topicInvestigations).map((s) => '/verdieping/' + s),
]) {
  const { main } = await read(path);
  for (const article of articles)
    assert.ok(
      !main.includes('href="/artikelen/' + article.slug + '"'),
      path + ': samples not promoted',
    );
}
for (const article of articles) {
  const { html } = await read('/artikelen/' + article.slug);
  assert.match(
    html,
    /name="robots" content="noindex, follow"/,
    article.slug + ': old sample preserved but noindex',
  );
}
console.log(
  JSON.stringify(
    {
      base,
      guides: guides.length,
      analyses: Object.keys(guideAnalyses).length,
      checkedRows,
      topicCases: Object.keys(topicInvestigations).length,
      oldSamples: articles.length,
      checks:
        'SSR content, source notes, revision dates/schema, table semantics/values, absence of promoted samples, retained noindex routes',
    },
    null,
    2,
  ),
);

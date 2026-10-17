import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { guides } from '../app/guide-data.ts';

// Guide bodies remain the sole editable source. Browser lists only need this projection.
const index = guides.map((guide) => ({
  slug: guide.slug,
  tool: guide.tool,
  category: guide.category,
  topics: guide.topics,
  title: guide.title,
  summary: guide.summary,
  read: Math.max(
    2,
    Math.ceil(
      [
        guide.problem,
        guide.summary,
        ...guide.sections.flat(),
        ...guide.faq.flat(),
        ...guide.example,
      ]
        .join(' ')
        .split(/\s+/).length / 200,
    ),
  ),
}));

assert.equal(new Set(index.map((guide) => guide.slug)).size, index.length);
for (const guide of index) {
  for (const key of ['slug', 'tool', 'category', 'title', 'summary']) {
    assert.ok(
      typeof guide[key] === 'string' && guide[key].length,
      `${guide.slug}: missing ${key}`,
    );
  }
  assert.ok(
    guide.topics.length &&
      guide.topics.every((topic) => typeof topic === 'string'),
  );
}

const destination = new URL(
  '../app/generated/guide-index.json',
  import.meta.url,
);
const serialized = JSON.stringify(index, null, 2) + '\n';
let existing;
try {
  existing = await readFile(destination, 'utf8');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

if (process.argv.includes('--check')) {
  assert.ok(existing, 'Guide index missing. Run npm run generate:guide-index.');
  assert.deepEqual(
    JSON.parse(existing),
    index,
    'Guide index is stale. Run npm run generate:guide-index before checking or publishing.',
  );
  console.log(
    `Guide index checked: ${index.length} summaries match the source, including reading times.`,
  );
} else {
  await mkdir(new URL('../app/generated/', import.meta.url), {
    recursive: true,
  });
  if (existing !== serialized) await writeFile(destination, serialized);
  console.log(
    `Guide index prepared: ${index.length} summaries; article bodies remain outside the list module.`,
  );
}

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire, registerHooks } from 'node:module';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Verify actual route metadata, schema, sitemap and Next redirect matching.
// No requests are sent to Search Console or another indexing service.
const require = createRequire(import.meta.url);
const ts = require('typescript');
require('next/dist/server/node-environment-baseline');
const {
  unstable_getResponseFromNextConfig,
  getRedirectUrl,
} = require('next/experimental/testing/server');
const { renderToStaticMarkup } = require('react-dom/server');
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('.') && !/\.[a-z0-9]+$/i.test(specifier)) {
      for (const extension of ['.ts', '.tsx']) {
        try {
          return nextResolve(specifier + extension, context);
        } catch {
          /* Try the next supported extension. */
        }
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    // Node renders metadata/markup only; the production build and browser check CSS.
    if (url.endsWith('.css') && url.includes('/app/')) {
      assert.ok(readFileSync(new URL(url), 'utf8').length, 'Stylesheet exists');
      return { format: 'module', shortCircuit: true, source: 'export default {};' };
    }
    if (url.endsWith('.tsx') && url.includes('/app/')) {
      return {
        format: 'module',
        shortCircuit: true,
        source: ts.transpileModule(readFileSync(new URL(url), 'utf8'), {
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            jsx: ts.JsxEmit.ReactJSX,
          },
        }).outputText,
      };
    }
    return nextLoad(url, context);
  },
});

if (!process.argv.includes('--mode')) {
  for (const mode of ['production', 'preview']) {
    const child = spawnSync(
      process.execPath,
      [fileURLToPath(import.meta.url), '--mode', mode],
      {
        env: { ...process.env, BEURSWATCHER_SITE_URL: '', VERCEL_ENV: mode },
        encoding: 'utf8',
      },
    );
    assert.equal(child.status, 0, child.stderr + child.stdout);
    console.log(child.stdout.trim());
  }
} else {
  const preview = process.env.VERCEL_ENV === 'preview';
  const { siteUrl, resolveSiteUrl, productionSiteUrl, legacySiteUrl } =
    await import('./app/site-config.ts');
  const {
    contentRoutes,
    isIndexablePage,
    metadataForPage,
    robotsForPage,
    notFoundMetadata,
  } = await import('./app/seo.ts');
  const { default: sitemap } = await import('./app/sitemap.ts');
  const { default: robots } = await import('./app/robots.ts');
  const { guides, guideSources } = await import('./app/guide-data.ts');
  const { articles } = await import('./app/data.ts');
  const { PageSchema, SiteSchema } = await import('./app/site-schema.tsx');
  const { GuideSchema } = await import('./app/guide-schema.tsx');
  const { GuidePage } = await import('./app/guide-pages.tsx');
  const { educationRevision } = await import('./app/education-revision.ts');
  const { default: nextConfig } = await import('./next.config.ts');

  assert.equal(siteUrl, 'https://www.beurswatcher.nl');
  assert.equal(
    notFoundMetadata.title.absolute,
    'Pagina niet gevonden | Beurswatcher',
  );
  assert.equal(notFoundMetadata.robots.index, false);
  assert.equal(notFoundMetadata.robots.follow, !preview);
  assert.equal(
    notFoundMetadata.alternates,
    undefined,
    '404 must not canonicalize to home',
  );
  assert.equal(notFoundMetadata.openGraph.url, undefined);
  assert.equal(
    notFoundMetadata.openGraph.title,
    notFoundMetadata.title.absolute,
  );
  assert.equal(notFoundMetadata.twitter.title, notFoundMetadata.title.absolute);
  assert.deepEqual(
    robotsForPage(),
    preview
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large' },
    'Root layout policy for home and maker page',
  );
  for (const setting of [
    undefined,
    '',
    ' ',
    productionSiteUrl,
    productionSiteUrl + '/',
    legacySiteUrl,
  ]) {
    assert.equal(resolveSiteUrl(setting), productionSiteUrl);
  }
  for (const invalid of [
    'bad',
    'http://www.beurswatcher.nl',
    'https://beurswatcher.nl',
    'https://beurs-wijzer.nl',
    'https://www.beurswatcher.nl/tools',
    'https://www.beurswatcher.nl?x=1',
    'https://name:password@www.beurswatcher.nl',
  ]) {
    assert.throws(() => resolveSiteUrl(invalid), undefined, invalid);
  }
  assert.equal(new Set(contentRoutes).size, contentRoutes.length);
  const titles = new Set();
  const descriptions = new Set();
  const scriptData = (element) =>
    [
      ...renderToStaticMarkup(element).matchAll(
        /<script type="application\/ld\+json">(.*?)<\/script>/gs,
      ),
    ].flatMap((match) => {
      const data = JSON.parse(match[1]);
      return data['@graph'] || [data];
    });
  const siteGraph = scriptData(SiteSchema());
  assert.equal(
    siteGraph.find((item) => item['@type'] === 'WebSite').url,
    siteUrl + '/',
  );

  for (const path of contentRoutes) {
    const metadata = metadataForPage(path);
    assert.equal(metadata.alternates.canonical, `${siteUrl}/${path}`, path);
    assert.equal(metadata.openGraph.url, `${siteUrl}/${path}`, path);
    assert.ok(metadata.openGraph.images.length > 0, path + ' sharing image');
    assert.equal(metadata.twitter.title, metadata.openGraph.title, path);
    assert.equal(metadata.twitter.description, metadata.description, path);
    assert.equal(metadata.twitter.card, 'summary_large_image', path);
    assert.equal(
      metadata.robots?.index === false,
      preview || !isIndexablePage(path),
      path + ' indexability',
    );
    assert.equal(
      metadata.robots?.['max-image-preview'],
      !preview && isIndexablePage(path) ? 'large' : undefined,
      path + ' large image previews only on public indexable pages',
    );
    if (preview) assert.equal(metadata.robots?.follow, false, path);
    assert.ok(!titles.has(metadata.title), path + ' duplicate title');
    assert.ok(
      !descriptions.has(metadata.description),
      path + ' duplicate description',
    );
    titles.add(metadata.title);
    descriptions.add(metadata.description);

    const schema = PageSchema({ path });
    if (!isIndexablePage(path)) {
      assert.equal(schema, null);
      continue;
    }
    const graph = scriptData(schema);
    const page = graph.find(
      (item) => item['@id'] === siteUrl + '/' + path + '#webpage',
    );
    assert.equal(page.url, metadata.alternates.canonical);
    const breadcrumbs = graph.find(
      (item) => item['@type'] === 'BreadcrumbList',
    ).itemListElement;
    assert.equal(breadcrumbs[0].item, siteUrl + '/');
    assert.equal(breadcrumbs.at(-1).item, page.url);
    breadcrumbs.forEach((crumb, index) => {
      assert.equal(crumb.position, index + 1);
      assert.equal(new URL(crumb.item).origin, siteUrl);
      assert.ok(crumb.name);
    });
  }
  const sitemapUrls = sitemap().map((entry) => entry.url);
  assert.equal(new Set(sitemapUrls).size, sitemapUrls.length);
  assert.equal(
    sitemapUrls.length,
    preview ? 0 : contentRoutes.filter(isIndexablePage).length + 2,
  );
  for (const url of sitemapUrls) {
    assert.equal(new URL(url).origin, siteUrl);
    const path = new URL(url).pathname.slice(1);
    assert.ok(
      path === '' || path === 'achter-de-website' || isIndexablePage(path),
    );
  }
  assert.equal(
    robots().sitemap,
    preview ? undefined : siteUrl + '/sitemap.xml',
  );
  for (const article of articles) {
    assert.ok(!sitemapUrls.includes(siteUrl + '/artikelen/' + article.slug));
    const metadata = metadataForPage('artikelen/' + article.slug);
    assert.equal(metadata.title, 'Voorbeeld: ' + article.title);
    for (const description of [
      metadata.description,
      metadata.openGraph.description,
      metadata.twitter.description,
    ]) {
      assert.ok(
        description.startsWith(
          'Redactioneel voorbeeld, nog niet inhoudelijk beoordeeld door Daniel. ',
        ),
        article.slug + ' preview must disclose its unreviewed example status',
      );
    }
    assert.ok(metadata.openGraph.title.startsWith('Voorbeeld: '));
  }
  for (const guide of guides) {
    const metadata = metadataForPage('uitleg/' + guide.slug);
    assert.equal(metadata.title, guide.title);
    assert.equal(metadata.description, guide.summary);
    const graph = scriptData(GuideSchema({ slug: guide.slug }));
    const article = graph.find((item) => item['@type'] === 'Article');
    assert.equal(
      article.mainEntityOfPage['@id'],
      siteUrl + '/uitleg/' + guide.slug + '#webpage',
    );
    assert.equal(article.author.name, 'Beurswatcher');
    assert.equal(article.datePublished, undefined);
    assert.equal(article.dateModified, educationRevision.iso);
    assert.deepEqual(article.citation, {
      '@type': 'CreativeWork',
      name: guideSources[guide.source][0],
      url: guideSources[guide.source][1],
    });
    const visibleSource = renderToStaticMarkup(
      GuidePage({ slug: guide.slug }),
    ).match(/<aside class="guide-evidence"[^>]*>([\s\S]*?)<\/aside>/)?.[1];
    assert.ok(visibleSource, guide.slug + ' visible source block');
    assert.ok(
      visibleSource.includes(
        `href="${article.citation.url.replaceAll('&', '&amp;')}"`,
      ),
      guide.slug + ' structured citation matches the visible source link',
    );
    assert.ok(
      visibleSource.includes(article.citation.name.replaceAll('&', '&amp;')),
      guide.slug + ' structured citation name is visible',
    );
    assert.deepEqual(
      graph
        .find((item) => item['@type'] === 'FAQPage')
        .mainEntity.map((item) => [item.name, item.acceptedAnswer.text]),
      guide.faq,
    );
  }

  for (const host of [
    'beurswatcher.nl',
    'beurswatcher.vercel.app',
    'www.beurswatcher.nl',
    'localhost:5198',
    'beurswatcher-preview.vercel.app',
    'beurswatcherxvercelxapp',
  ]) {
    const response = await unstable_getResponseFromNextConfig({
      url: `https://${host}/tools/rendement?start=10000&mode=vergelijk`,
      nextConfig,
    });
    const shouldRedirect = [
      'beurswatcher.nl',
      'beurswatcher.vercel.app',
    ].includes(host);
    assert.equal(response.status, shouldRedirect ? 308 : 200, host);
    assert.equal(
      getRedirectUrl(response),
      shouldRedirect
        ? siteUrl + '/tools/rendement?start=10000&mode=vergelijk'
        : null,
      host,
    );
  }
  for (const privatePath of ['/beheer/instagram', '/koppelen/instagram']) {
    const response = await unstable_getResponseFromNextConfig({
      url: siteUrl + privatePath,
      nextConfig,
    });
    assert.match(
      response.headers.get('x-robots-tag') || '',
      /noindex/,
      privatePath,
    );
  }
  console.log(
    `SEO ${preview ? 'preview' : 'production'}: ${contentRoutes.length} unique route metadata records, ${guides.length} truthful guide schemas, ${sitemapUrls.length} canonical sitemap URLs and canonical redirects passed.`,
  );
}

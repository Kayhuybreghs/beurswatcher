import { siteUrl } from './site-config';
import { metadataForPage, isIndexablePage } from './seo';
import { guides } from './guide-data';
import { partners, toolItems } from './data';

export const websiteId = siteUrl + '/#website';
export const publisher = {
  '@type': 'Organization',
  '@id': siteUrl + '/#organization',
  name: 'Beurswatcher',
  url: siteUrl + '/',
  logo: siteUrl + '/icon.svg',
  sameAs: ['https://www.instagram.com/beurswatcher/'],
};
const websiteBuilder = {
  '@type': 'Organization',
  '@id': siteUrl + '/#website-builder',
  name: 'Sitesnit',
  url: 'https://www.sitesnit.nl/',
};

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

// The footer and maker page support this credit. It applies to the website's
// design/development, never to authorship of Beurswatcher's financial content.
export function SiteSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          publisher,
          websiteBuilder,
          {
            '@type': 'WebSite',
            '@id': websiteId,
            name: 'Beurswatcher',
            url: siteUrl + '/',
            inLanguage: 'nl-NL',
            publisher: { '@id': publisher['@id'] },
            contributor: { '@id': websiteBuilder['@id'] },
            creditText: 'Webdesign en ontwikkeling door Sitesnit.',
          },
        ],
      }}
    />
  );
}

export function PageSchema({ path }: { path: string }) {
  if (!isIndexablePage(path)) return null;
  const metadata = metadataForPage(path);
  const title = metadata.title as string;
  const url = siteUrl + '/' + path;
  const [section, slug] = path.split('/');
  const parent =
    section === 'uitleg' || section === 'verdieping'
      ? { name: 'Verdieping', item: siteUrl + '/artikelen' }
      : slug && ['tools', 'partners', 'markt'].includes(section)
        ? {
            name: { tools: 'Tools', partners: 'Partners', markt: 'Markt' }[
              section
            ],
            item: siteUrl + '/' + section,
          }
        : undefined;
  const leafName =
    partners.find((partner) => path === 'partners/' + partner.slug)?.name ||
    toolItems.find((tool) => path === 'tools/' + tool.slug)?.title ||
    title;
  const crumbs = [
    { name: 'Home', item: siteUrl + '/' },
    ...(parent ? [parent] : []),
    { name: leafName, item: url },
  ];
  const guide = guides.find((item) => path === 'uitleg/' + item.slug);
  const pageType =
    path === 'over'
      ? 'AboutPage'
      : path === 'contact' || path === 'zakelijk-samenwerken'
        ? 'ContactPage'
        : ['artikelen', 'tools', 'partners', 'markt'].includes(path) ||
            section === 'verdieping'
          ? 'CollectionPage'
          : 'WebPage';
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': pageType,
            '@id': url + '#webpage',
            url,
            name: title,
            description: metadata.description,
            inLanguage: 'nl-NL',
            isPartOf: { '@id': websiteId },
            publisher: { '@id': publisher['@id'] },
            breadcrumb: { '@id': url + '#breadcrumb' },
            ...(guide ? { mainEntity: { '@id': url + '#article' } } : {}),
          },
          {
            '@type': 'BreadcrumbList',
            '@id': url + '#breadcrumb',
            itemListElement: crumbs.map((crumb, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              ...crumb,
            })),
          },
        ],
      }}
    />
  );
}

export function MakerSchema({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const url = siteUrl + '/achter-de-website';
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': url + '#webpage',
        name: title,
        description,
        url,
        inLanguage: 'nl-NL',
        isPartOf: { '@id': websiteId },
        publisher: { '@id': publisher['@id'] },
        about: { '@id': websiteId },
        mentions: { '@id': websiteBuilder['@id'] },
        relatedLink: [
          'https://www.sitesnit.nl/projecten/beurswatcher',
          websiteBuilder.url,
        ],
      }}
    />
  );
}

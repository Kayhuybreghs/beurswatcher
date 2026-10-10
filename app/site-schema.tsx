import { siteUrl } from './site-config';

export const websiteId = siteUrl + '/#website';
export const publisher = {
  '@type': 'Organization',
  '@id': siteUrl + '/#organization',
  name: 'Beurswatcher',
  url: siteUrl + '/',
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

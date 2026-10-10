import { guides } from './guide-data';
import { siteUrl } from './site-config';
import { JsonLd, publisher, websiteId } from './site-schema';
export function GuideSchema({ slug }: { slug: string }) {
  const g = guides.find((g) => g.slug === slug);
  if (!g) return null;
  const base = siteUrl;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': base + '/uitleg/' + g.slug + '#article',
        headline: g.title,
        description: g.summary,
        mainEntityOfPage: base + '/uitleg/' + g.slug,
        inLanguage: 'nl-NL',
        isPartOf: { '@id': websiteId },
        author: publisher,
        publisher,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { name: 'Beurswatcher', item: base },
          { name: 'Verdieping', item: base + '/artikelen' },
          { name: g.title, item: base + '/uitleg/' + g.slug },
        ].map((x, i) => ({ '@type': 'ListItem', position: i + 1, ...x })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: g.faq.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  };
  return <JsonLd data={data} />;
}

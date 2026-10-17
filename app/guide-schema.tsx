import { guides, guideSources } from './guide-data';
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
        mainEntityOfPage: { '@id': base + '/uitleg/' + g.slug + '#webpage' },
        inLanguage: 'nl-NL',
        isPartOf: { '@id': websiteId },
        author: publisher,
        publisher,
        citation: {
          '@type': 'CreativeWork',
          name: guideSources[g.source][0],
          url: guideSources[g.source][1],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': base + '/uitleg/' + g.slug + '#vragen',
        isPartOf: { '@id': base + '/uitleg/' + g.slug + '#webpage' },
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

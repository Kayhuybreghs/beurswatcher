import { guides } from './guide-data';
export function GuideSchema({ slug }: { slug: string }) {
  const g = guides.find((g) => g.slug === slug);
  if (!g) return null;
  const base = 'https://beurswatcher.vercel.app';
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: g.title,
        description: g.summary,
        mainEntityOfPage: base + '/uitleg/' + g.slug,
        inLanguage: 'nl-NL',
        author: { '@type': 'Organization', name: 'Beurswatcher', url: base },
        publisher: { '@type': 'Organization', name: 'Beurswatcher', url: base },
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
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

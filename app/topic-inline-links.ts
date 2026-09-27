export type TopicInlineLink = { section: number; text: string; href: string };

// Deliberately curated: at most two contextual links in each topic's prose.
export const topicInlineLinks: Record<string, TopicInlineLink[]> = {
  'markt-economie': [
    { section: 0, text: 'Inflatie', href: '/tools/inflatie' },
    { section: 4, text: 'macroagenda op Beurswatcher', href: '/markt/macro' },
  ],
  belasting: [
    { section: 1, text: 'box 3-indicatie', href: '/tools/box-3' },
    {
      section: 3,
      text: 'aftrekbare lijfrentestorting',
      href: '/verdieping/pensioen',
    },
  ],
  beginnen: [
    { section: 0, text: 'noodbuffer', href: '/verdieping/vermogen' },
    { section: 1, text: 'Een ETF', href: '/verdieping/etfs' },
  ],
  etfs: [
    { section: 2, text: 'herbeleggende variant', href: '/verdieping/dividend' },
    { section: 4, text: 'ETF-kostentool', href: '/tools/etf-kosten' },
  ],
  aandelen: [
    { section: 3, text: 'aparte dividendpagina', href: '/verdieping/dividend' },
    {
      section: 4,
      text: 'calculator met een vast rendement',
      href: '/tools/rendement',
    },
  ],
  strategie: [
    { section: 2, text: 'gefaseerd instappen', href: '/tools/lump-sum-dca' },
    { section: 3, text: 'Herbalanceren', href: '/verdieping/portfolio' },
  ],
  vermogen: [
    {
      section: 2,
      text: 'einddatum en maandbedrag',
      href: '/tools/doelvermogen',
    },
    { section: 3, text: 'koopkracht van dat bedrag', href: '/tools/inflatie' },
  ],
  pensioen: [
    { section: 2, text: 'fiscale behandeling', href: '/verdieping/belasting' },
    { section: 4, text: 'doelvermogentool', href: '/tools/doelvermogen' },
  ],
  zakelijk: [
    { section: 2, text: 'privévermogen', href: '/verdieping/belasting' },
    {
      section: 3,
      text: 'de totale kwetsbaarheid',
      href: '/verdieping/strategie',
    },
  ],
  reizen: [
    {
      section: 2,
      text: 'jaarlijkse kaartkosten',
      href: '/partners/american-express',
    },
    { section: 4, text: 'commerciële samenwerkingen', href: '/partners' },
  ],
  dividend: [
    { section: 1, text: 'winst en kasstroom', href: '/verdieping/aandelen' },
    { section: 4, text: 'dividendtool', href: '/tools/dividend' },
  ],
  portfolio: [
    {
      section: 0,
      text: 'dezelfde grootste posities',
      href: '/verdieping/etfs',
    },
    { section: 3, text: 'Herbalanceren', href: '/verdieping/strategie' },
  ],
};

export function linkedTopicText(slug: string, section: number, text: string) {
  const link = topicInlineLinks[slug]?.find((item) => item.section === section);
  if (!link || !text.includes(link.text)) return { before: text };
  const position = text.indexOf(link.text);
  return {
    before: text.slice(0, position),
    link,
    after: text.slice(position + link.text.length),
  };
}

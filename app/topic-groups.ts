export type TopicGroup = {
  slug: string;
  name: string;
  description: string;
  icon:
    | 'Globe'
    | 'ReceiptText'
    | 'Compass'
    | 'Layers'
    | 'ChartNoAxesCombined'
    | 'Network'
    | 'Wallet'
    | 'Landmark'
    | 'Building2'
    | 'Plane';
  categories: string[];
  links: [string, string][];
};
export const topicGroups: TopicGroup[] = [
  {
    slug: 'markt-economie',
    name: 'Markt & economie',
    description:
      'Wat inflatie, rente en economische groei betekenen voor de beurs.',
    icon: 'Globe',
    categories: ['Markt', 'Macro'],
    links: [
      ['De economische basis', '/verdieping/markt-economie'],
      ['De macroagenda', '/markt/macro'],
      ['Koopkracht onderzoeken', '/tools/inflatie'],
    ],
  },
  {
    slug: 'belasting',
    name: 'Belasting & vermogen',
    description:
      'Box 3, werkelijk rendement en het verschil met toeslagen en pensioen.',
    icon: 'ReceiptText',
    categories: [],
    links: [
      ['Belasting & vermogen begrijpen', '/verdieping/belasting'],
      ['Box 3: wat berekent de tool?', '/uitleg/box-3-indicatie-2026'],
      ['Box 3 indicatie maken', '/tools/box-3'],
    ],
  },
  {
    slug: 'beginnen',
    name: 'Beginnen met beleggen',
    description:
      'Wat je koopt, welk geld je kunt missen en hoe spreiding en kosten werken.',
    icon: 'Compass',
    categories: ['Strategie'],
    links: [
      ['Beginnen met beleggen: de basis', '/verdieping/beginnen'],
      ['Risico en beleggingsstrategie', '/verdieping/strategie'],
      ['Bereken mogelijke vermogensgroei', '/tools/rendement'],
    ],
  },
  {
    slug: 'etfs',
    name: 'ETF’s',
    description:
      'De index, overlap, uitkeringen, valuta en kosten van een fonds begrijpen.',
    icon: 'Layers',
    categories: ['ETF'],
    links: [
      ['Alles over ETF’s', '/verdieping/etfs'],
      [
        'Wat doen fondskosten op lange termijn?',
        '/uitleg/etf-kosten-lange-termijn',
      ],
      ['ETF-kosten vergelijken', '/tools/etf-kosten'],
    ],
  },
  {
    slug: 'aandelen',
    name: 'Aandelen & dividend',
    description: 'Bedrijfsresultaten, waardering en dividend samen beoordelen.',
    icon: 'ChartNoAxesCombined',
    categories: ['Aandelen', 'Dividend'],
    links: [
      ['Aandelen begrijpen', '/verdieping/aandelen'],
      ['Hoe werkt dividend?', '/verdieping/dividend'],
      ['Dividend doorrekenen', '/tools/dividend'],
    ],
  },
  {
    slug: 'strategie',
    name: 'Strategie & portefeuille',
    description:
      'Je verdeling kiezen, instappen, herbalanceren en omgaan met tegenvallers.',
    icon: 'Network',
    categories: ['Strategie', 'Portfolio'],
    links: [
      ['Strategie & horizon', '/verdieping/strategie'],
      ['Spreiding en overlap in je portefeuille', '/verdieping/portfolio'],
      ['Ineens of gespreid beleggen', '/tools/lump-sum-dca'],
    ],
  },
  {
    slug: 'vermogen',
    name: 'Sparen & vermogen',
    description:
      'Buffers, spaardoelen, inflatie en bescherming van je banktegoed.',
    icon: 'Wallet',
    categories: ['Vermogen'],
    links: [
      ['Sparen & vermogen', '/verdieping/vermogen'],
      ['Inflatie & koopkracht', '/tools/inflatie'],
      ['Maandinleg voor een doelbedrag berekenen', '/tools/doelvermogen'],
      ['Box 3 indicatie', '/tools/box-3'],
    ],
  },
  {
    slug: 'pensioen',
    name: 'Pensioen',
    description:
      'AOW, werkgeverspensioen, lijfrente en eerder stoppen met werken.',
    icon: 'Landmark',
    categories: ['Pensioen'],
    links: [
      ['De onderdelen van pensioen', '/verdieping/pensioen'],
      ['Sparen en vermogen opbouwen', '/verdieping/vermogen'],
      ['Maandinleg voor een doelbedrag berekenen', '/tools/doelvermogen'],
    ],
  },
  {
    slug: 'zakelijk',
    name: 'Zakelijk vermogen',
    description:
      'Welk geld je bedrijf nodig heeft en wat je met reserves kunt doen.',
    icon: 'Building2',
    categories: ['Zakelijk'],
    links: [
      ['Zakelijk beleggen', '/verdieping/zakelijk'],
      ['Bereken mogelijke vermogensgroei', '/tools/rendement'],
    ],
  },
  {
    slug: 'reizen',
    name: 'Reizen & voordelen',
    description:
      'De echte waarde van punten, bonussen en kaartvoordelen berekenen.',
    icon: 'Plane',
    categories: ['Reizen'],
    links: [
      ['Reiskaarten, punten en voorwaarden', '/verdieping/reizen'],
      [
        'American Express: kosten en mogelijkheden',
        '/partners/american-express',
      ],
    ],
  },
];

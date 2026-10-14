import type { Metadata } from 'next';
import { articles, partners, toolItems, topics } from './data';
import { guides } from './guide-data';
import { topicContent } from './topic-content';
import { partnerFacts } from './partner-facts';
import { isPreviewDeployment, siteUrl } from './site-config';

export { siteUrl };
export const homeTitle = 'Beleggen begrijpen en zelf berekenen | Beurswatcher';
export const homeDescription =
  'Lees uitleg over beleggen, vermogen en pensioen. Bereken gratis je inleg, rendement en kosten, en bekijk beurskoersen en de macro-agenda.';

// These are actual pages, not extra landing pages created for search engines.
const pageCopy: Record<string, { title: string; description: string }> = {
  artikelen: {
    title: 'Verdieping: uitleg over beleggen, vermogen en pensioen',
    description:
      'Lees begrijpelijke uitleg over ETF’s, aandelen, belasting, sparen en pensioen. Kies een onderwerp of zoek een artikel en vind de bijbehorende rekentool.',
  },
  tools: {
    title: 'Gratis rekentools voor beleggen en vermogen',
    description:
      'Bereken mogelijke vermogensgroei, benodigde maandinleg, ETF-kosten en koopkracht. Vergelijk scenario’s met gratis tools, zonder account.',
  },
  markt: {
    title: 'Marktinformatie: indices, stijgers, dalers en agenda',
    description:
      'Bekijk beursindices, stijgers en dalers, wisselkoersen en de macro-agenda voor Nederland en de Verenigde Staten. Koersen kunnen vertraagd zijn.',
  },
  'markt/macro': {
    title: 'Macro-agenda Nederland en Verenigde Staten',
    description:
      'Bekijk geplande economische publicaties uit Nederland en de Verenigde Staten. Filter de agenda op land en onderwerp en lees de uitleg bij de cijfers.',
  },
  'markt/earnings': {
    title: 'Bedrijfsresultaten: voorbeeldagenda',
    description:
      'Een voorbeeld van een agenda voor bedrijfsresultaten. Lees welke rol omzet, winst en verwachtingen spelen bij het beoordelen van een kwartaalbericht.',
  },
  partners: {
    title: 'Partners: brokers, pensioen en financiële diensten',
    description:
      'Lees wat Scalable Capital, Saxo, Delta, Brand New Day en American Express aanbieden. Bekijk de verschillen, kosten en voorwaarden om zelf af te wegen.',
  },
  events: {
    title: 'Events van Beurswatcher',
    description:
      'Hier vind je nieuwe bijeenkomsten van Beurswatcher zodra ze zijn aangekondigd. Er staan op dit moment geen events gepland.',
  },
  over: {
    title: 'Over Beurswatcher en Daniel van der Roest',
    description:
      'Lees waarom Daniel van der Roest Beurswatcher begon en hoe begrijpelijke uitleg en gratis rekentools helpen om zelf geldzaken te onderzoeken.',
  },
  nieuwsbrief: {
    title: 'Aanmelden voor de nieuwsbrief',
    description:
      'Meld je aan voor de toekomstige nieuwsbrief van Beurswatcher over beleggen, vermogen en rekentools. Je kunt je aanmelding weer verwijderen.',
  },
  contact: {
    title: 'Contact met Beurswatcher',
    description:
      'Stuur Beurswatcher een vraag over de website, een artikel of een rekentool. Ook suggesties voor onderwerpen kun je via het contactformulier delen.',
  },
  'zakelijk-samenwerken': {
    title: 'Zakelijk samenwerken met Beurswatcher',
    description:
      'Bespreek een redactioneel of zakelijk voorstel met Beurswatcher. Geef aan namens welk bedrijf je contact opneemt en wat je wilt voorstellen.',
  },
  zoeken: {
    title: 'Zoeken naar uitleg en rekentools',
    description:
      'Zoek binnen Beurswatcher naar artikelen, onderwerpen en gratis rekentools over beleggen, vermogen en pensioen.',
  },
  privacy: {
    title: 'Privacy en gegevensgebruik',
    description:
      'Lees welke gegevens de website verwerkt bij een contactbericht of nieuwsbriefaanmelding, en welke externe diensten worden gebruikt.',
  },
  colofon: {
    title: 'Colofon: bronnen, redactie en rekentools',
    description:
      'Lees over de bronnen van Beurswatcher, redactionele voorbeelden, fotografie en de aannames en beperkingen van de rekentools.',
  },
  afmelden: {
    title: 'Nieuwsbriefaanmelding verwijderen',
    description:
      'Verwijder je aanmelding voor de nieuwsbrief van Beurswatcher.',
  },
};

const toolCopy: Record<string, { title: string; description: string }> = {
  rendement: {
    title: 'Rendement berekenen: inleg en vermogensgroei',
    description:
      'Bereken wat een startbedrag en maandelijkse inleg kunnen opbouwen. Vergelijk rendementsscenario’s en bekijk je inleg en berekende groei apart.',
  },
  'etf-kosten': {
    title: 'ETF-kosten vergelijken op lange termijn',
    description:
      'Vergelijk wat twee jaarlijkse kostenpercentages doen met je eindvermogen. Reken met dezelfde inleg, looptijd en hetzelfde brutorendement.',
  },
  doelvermogen: {
    title: 'Doelvermogen berekenen: benodigde maandinleg',
    description:
      'Bereken hoeveel je per maand moet inleggen voor een gekozen eindbedrag. Pas startkapitaal, looptijd en verwacht rendement aan en vergelijk.',
  },
  'aflossen-of-beleggen': {
    title: 'Aflossen of beleggen: scenario’s vergelijken',
    description:
      'Vergelijk extra aflossen met een beleggingsscenario. Bekijk het verschil tussen bespaarde rente en onzeker rendement, met uitleg over de beperkingen.',
  },
  'box-3': {
    title: 'Box 3 berekenen in 2026: indicatie en uitleg',
    description:
      'Bereken een indicatie voor box 3 in 2026 met spaargeld, beleggingen en schulden. Bekijk de aannames en controleer je situatie bij de Belastingdienst.',
  },
  'compound-interest': {
    title: 'Rente op rente berekenen: samengestelde groei',
    description:
      'Bereken hoe rente op rente werkt bij een startbedrag en vaste inleg. Vergelijk looptijden en zie welk deel van het eindbedrag uit groei bestaat.',
  },
  inflatie: {
    title: 'Inflatie berekenen: koopkracht van je geld',
    description:
      'Bereken hoeveel koopkracht een bedrag verliest door inflatie. Pas het inflatiepercentage en de looptijd aan en vergelijk euro’s van nu en later.',
  },
  'lump-sum-dca': {
    title: 'Ineens of gespreid beleggen: vergelijk scenario’s',
    description:
      'Vergelijk ineens beleggen met gespreid instappen voor hetzelfde bedrag. Onderzoek hoe een gekozen koersverloop de uitkomst beïnvloedt.',
  },
  dividend: {
    title: 'Dividend herbeleggen of uitkeren: bereken het verschil',
    description:
      'Vergelijk dividend herbeleggen met apart houden. Pas inleg, koersgroei en dividend aan en bekijk het berekende totaalvermogen per scenario.',
  },
};

export function isIndexablePage(path: string) {
  // These example articles still await Daniel’s own editorial content.
  return (
    contentRoutes.includes(path) &&
    !articles.some((article) => path === 'artikelen/' + article.slug) &&
    !['zoeken', 'afmelden', 'markt/earnings'].includes(path)
  );
}

export function sharingMetadata(
  title: string,
  description: string,
  path: string,
  article = false,
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const image = {
    url: siteUrl + '/opengraph-image',
    width: 1200,
    height: 630,
    alt: 'Beurswatcher: begrijpelijke uitleg over geld en gratis rekentools.',
  };
  return {
    openGraph: {
      title,
      description,
      url: siteUrl + '/' + path,
      type: article ? 'article' : 'website',
      locale: 'nl_NL',
      siteName: 'Beurswatcher',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export const contentRoutes = [
  ...Object.keys(pageCopy),
  ...guides.map((guide) => 'uitleg/' + guide.slug),
  ...articles.map((article) => 'artikelen/' + article.slug),
  ...toolItems.map((tool) => 'tools/' + tool.slug),
  ...partners.map((partner) => 'partners/' + partner.slug),
  ...topics.map(([slug]) => 'verdieping/' + slug),
];

export function metadataForPage(path: string): Metadata {
  const article = articles.find((item) => path === 'artikelen/' + item.slug);
  const guide = guides.find((item) => path === 'uitleg/' + item.slug);
  const tool = toolItems.find((item) => path === 'tools/' + item.slug);
  const partner = partners.find((item) => path === 'partners/' + item.slug);
  const topic = path.startsWith('verdieping/')
    ? topicContent[path.slice('verdieping/'.length)]
    : undefined;
  const title =
    pageCopy[path]?.title ||
    guide?.title ||
    topic?.title ||
    article?.title ||
    (tool && toolCopy[tool.slug]?.title) ||
    tool?.title ||
    (partner && partnerFacts[partner.slug].headline.replace(/\.$/, '')) ||
    'Pagina niet gevonden';
  const description =
    pageCopy[path]?.description ||
    guide?.summary ||
    topic?.summary ||
    article?.intro ||
    (tool && toolCopy[tool.slug]?.description) ||
    (tool &&
      `${tool.text} Pas de invoer aan en vergelijk de uitkomsten. Lees ook de rekenaannames en beperkingen.`) ||
    (partner && partnerFacts[partner.slug].description) ||
    'Deze pagina bestaat niet. Bekijk de artikelen en rekentools van Beurswatcher.';
  const noindex = isPreviewDeployment || !isIndexablePage(path);
  const url = `${siteUrl}/${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    ...sharingMetadata(
      `${title} | Beurswatcher`,
      description,
      path,
      Boolean(guide || article),
    ),
  };
}

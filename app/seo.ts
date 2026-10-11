import type { Metadata } from 'next';
import { articles, partners, toolItems, topics } from './data';
import { guides } from './guide-data';
import { topicContent } from './topic-content';
import { partnerFacts } from './partner-facts';
import { siteUrl } from './site-config';

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
    tool?.title ||
    (partner && partnerFacts[partner.slug].headline.replace(/\.$/, '')) ||
    'Pagina niet gevonden';
  const description =
    pageCopy[path]?.description ||
    guide?.summary ||
    topic?.summary ||
    article?.intro ||
    (tool &&
      `${tool.text} Pas de invoer aan en vergelijk de uitkomsten. Lees ook de rekenaannames en beperkingen.`) ||
    (partner && partnerFacts[partner.slug].description) ||
    'Deze pagina bestaat niet. Bekijk de artikelen en rekentools van Beurswatcher.';
  const noindex =
    Boolean(article) ||
    ['zoeken', 'afmelden', 'markt/earnings'].includes(path) ||
    !contentRoutes.includes(path);
  const url = `${siteUrl}/${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${title} | Beurswatcher`,
      description,
      url,
      type: guide || article ? 'article' : 'website',
      locale: 'nl_NL',
      siteName: 'Beurswatcher',
    },
  };
}

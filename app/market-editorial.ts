// Editorially checked snapshot, not an automatic publisher feed.
export type NewsItem = {
  eventId: string;
  title: string;
  summary: string;
  context: string;
  category: string;
  source: string;
  url: string;
  publishedAt: string;
};
export const newsCheckedAt = '2026-09-09';
export const newsItems: NewsItem[] = [
  {
    eventId: 'oil-stocks-2026-09-09',
    title: 'Duurdere olie zet aandelen onder druk.',
    summary:
      'Amerikaanse aandelen daalden terwijl Brent weer boven $100 kwam. Energiebedrijven bewogen tegen de bredere markt in.',
    context:
      'Volg energie als kostenfactor voor bedrijven en als onderdeel van inflatie.',
    category: 'ENERGIE & BEURZEN',
    source: 'Associated Press',
    url: 'https://apnews.com/article/d1284eb72934a3b076c14449bc087fbd',
    publishedAt: '2026-09-09',
  },
  {
    eventId: 'us-bond-etf-flows-2026-09-09',
    title: 'Obligatiebeleggers kiezen een kortere looptijd.',
    summary:
      'Amerikaanse ETF-beleggers zoeken vooral kort- en middellopende obligaties op. De vraag naar langlopende fondsen blijft achter, meldt Reuters op basis van fondsinstromen.',
    context:
      'De looptijd helpt verklaren hoe gevoelig een obligatiefonds is voor veranderende rente.',
    category: 'RENTE & ETF’S',
    source: 'Reuters via StreetInsider',
    url: 'https://www.streetinsider.com/Reuters/US%2BETF%2Binvestors%2Bfavour%2Bshorter%2Btenor%2Bbonds%2Bas%2Binterest%2Brate%2Brisks%2Brise/27039760.html',
    publishedAt: '2026-09-09',
  },
  {
    eventId: 'clay-funding-2026-09-09',
    title: 'AI-bedrijf Clay haalt $115 miljoen op.',
    summary:
      'De nieuwe financieringsronde waardeert Clay op $7,1 miljard. Het bedrijf ontwikkelt AI-toepassingen voor verkoop en marketing.',
    context:
      'Een private financieringswaardering is iets anders dan een beurskoers of gerealiseerde winst.',
    category: 'TECHNOLOGIE & KAPITAAL',
    source: 'Reuters via StreetInsider',
    url: 'https://www.streetinsider.com/Reuters/Clay%2Bvalued%2Bat%2B%247.1%2Bbillion%2Bin%2Blatest%2Bfunding%2Bround%2Bas%2BAI%2Bagent%2Bstartups%2Brun%2Bhot/27041685.html',
    publishedAt: '2026-09-09',
  },
];
export function uniqueNews(items: NewsItem[]) {
  const events = new Set<string>(),
    urls = new Set<string>();
  return items.filter((item) => {
    const url = new URL(item.url);
    const canonical = url.origin + url.pathname.replace(/\/$/, '');
    if (events.has(item.eventId) || urls.has(canonical)) return false;
    events.add(item.eventId);
    urls.add(canonical);
    return true;
  });
}
export const policyDates = [
  { date: '2026-09-10', place: 'Berlijn' },
  { date: '2026-10-29', place: 'Frankfurt' },
  { date: '2026-12-17', place: 'Frankfurt' },
];
export const policySource =
  'https://www.ecb.europa.eu/press/calendars/mgcgc/html/index.en.html';

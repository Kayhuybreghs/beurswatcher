import { topicLessons, type TopicLesson } from './topic-lessons.ts';
export type TopicContent = {
  title: string;
  summary: string;
  sections: [string, string][];
  checklist: string[];
  faq: [string, string][];
  tool: string;
  example?: TopicLesson['example'];
  comparison?: TopicLesson['comparison'];
  sources?: TopicLesson['sources'];
};
const topicIntroductions: Record<
  string,
  Pick<TopicContent, 'title' | 'summary' | 'tool' | 'checklist'>
> = {
  'markt-economie': {
    title: 'Markt & economie',
    summary:
      'Een economisch cijfer krijgt betekenis door de context: welke periode beschrijft het, wat veranderde er en waarom kan het relevant zijn voor beleggers?',
    tool: 'inflatie',
    checklist: [
      'Welke periode en definitie horen bij het cijfer?',
      'Is dit een eerste schatting of een herziening?',
      'Wat is feit en wat is mijn interpretatie?',
      'Welke vraag roept dit op voor mijn plan?',
    ],
  },
  belasting: {
    title: 'Belasting & vermogen',
    summary:
      'Fiscale regels kunnen invloed hebben op wat je overhoudt. Begin bij het juiste belastingjaar, de categorie van je vermogen en de grenzen van de berekening.',
    tool: 'box-3',
    checklist: [
      'Over welk belastingjaar gaat mijn vraag?',
      'Welke vermogenscategorie is van toepassing?',
      'Welke onderdelen neemt de tool niet mee?',
      'Welke officiële gegevens ontbreken nog?',
    ],
  },
  beginnen: {
    title: 'Beginnen met beleggen',
    summary:
      'Een goede start begint bij je doel, je beschikbare geld en de tijd die je hebt. Begrijp eerst je keuzes en maak daarna pas een berekening of productvergelijking.',
    tool: 'rendement',
    checklist: [
      'Wat is het doel van dit geld?',
      'Welke uitgaven moet mijn buffer opvangen?',
      'Wanneer kan ik het bedrag nodig hebben?',
      'Wat betekent een verlies voor mijn plan?',
    ],
  },
  etfs: {
    title: 'ETF’s begrijpen',
    summary:
      'Een ETF is een fonds dat op de beurs wordt verhandeld. Kijk verder dan de naam: de index, inhoud, kosten en risico’s bepalen wat je werkelijk onderzoekt.',
    tool: 'etf-kosten',
    checklist: [
      'Welke index en welke markt volgt het fonds?',
      'Hoe geconcentreerd zijn de grootste posities?',
      'Welke kosten vallen buiten het fondspercentage?',
      'Wat gebeurt er met dividend?',
    ],
  },
  aandelen: {
    title: 'Aandelen & bedrijven',
    summary:
      'Een aandeel is meer dan een koersgrafiek. Begrijp hoe het bedrijf geld verdient, wat er kan veranderen en welke verwachtingen in de prijs kunnen zitten.',
    tool: 'rendement',
    checklist: [
      'Waar verdient het bedrijf geld mee?',
      'Hoe ontwikkelt de schuld zich?',
      'Welke groeiverwachting neem ik aan?',
      'Welke informatie zou mijn analyse veranderen?',
    ],
  },
  dividend: {
    title: 'Dividend & uitkeringen',
    summary:
      'Dividend is een uitkering aan aandeelhouders. Onderzoek het samen met koersontwikkeling en bekijk wat herbeleggen of apart houden in een scenario verandert.',
    tool: 'dividend',
    checklist: [
      'Is het genoemde rendement inclusief dividend?',
      'Wat gebeurt er met ontvangen uitkeringen?',
      'Welke kosten spelen bij herbeleggen?',
      'Kan de uitkering worden verlaagd?',
    ],
  },
  strategie: {
    title: 'Strategie & je beleggingsplan',
    summary:
      'Een strategie verbindt je doel met regels voor inleggen, risico en onderhoud. Het helpt wanneer je vooraf weet wat je doet als omstandigheden veranderen.',
    tool: 'lump-sum-dca',
    checklist: [
      'Welke regels kan ik daadwerkelijk volhouden?',
      'Wat doe ik bij een daling?',
      'Wanneer beoordeel ik mijn plan opnieuw?',
      'Welke aannames zijn nog onzeker?',
    ],
  },
  portfolio: {
    title: 'Je portefeuille in overzicht',
    summary:
      'Losse posities vormen samen één vermogen. Kijk naar hun gezamenlijke blootstelling, kosten en rol in je plan, niet alleen naar de namen in je app.',
    tool: 'etf-kosten',
    checklist: [
      'Welke risico’s komen in meerdere posities terug?',
      'Wat zijn mijn grootste concentraties?',
      'Welke kosten betaal ik over het totaal?',
      'Wanneer wijkt de verdeling van mijn plan af?',
    ],
  },
  vermogen: {
    title: 'Sparen & vermogen opbouwen',
    summary:
      'Geef je geld een bestemming: een buffer, een concreet doel of opbouw voor later. Tijd, inleg, koopkracht en kosten maken samen het verschil.',
    tool: 'doelvermogen',
    checklist: [
      'Welk deel moet direct beschikbaar zijn?',
      'Wat is mijn doelbedrag en einddatum?',
      'Is het doel in euro’s van nu of later?',
      'Kan ik de maandinleg volhouden?',
    ],
  },
  pensioen: {
    title: 'Pensioen & later',
    summary:
      'Begin bij je verwachte inkomsten en uitgaven voor later. Een losse vermogensberekening helpt een doel onderzoeken, maar is geen complete pensioenplanning.',
    tool: 'doelvermogen',
    checklist: [
      'Welke inkomsten verwacht ik en vanaf wanneer?',
      'Welke uitgaven wil ik kunnen betalen?',
      'Hoe is inflatie in de bedragen verwerkt?',
      'Welke voorwaarden gelden bij aanvullend opbouwen?',
    ],
  },
  zakelijk: {
    title: 'Zakelijk vermogen',
    summary:
      'Een zakelijk saldo kan nodig zijn voor belastingen, werkkapitaal of investeringen. Onderzoek eerst wat werkelijk vrij beschikbaar is voordat je naar rendement kijkt.',
    tool: 'rendement',
    checklist: [
      'Welke betalingen liggen al vast?',
      'Wat gebeurt er bij tijdelijk lagere omzet?',
      'Welk bedrag is werkelijk langdurig beschikbaar?',
      'Welke fiscale en juridische voorwaarden gelden?',
    ],
  },
  reizen: {
    title: 'Reizen & kaartvoordelen',
    summary:
      'Een voordeel heeft pas waarde als je het daadwerkelijk gebruikt. Vergelijk kaartkosten en voorwaarden met je bestaande reisgedrag en uitgaven.',
    tool: 'inflatie',
    checklist: [
      'Zou ik dit voordeel zonder kaart ook gebruiken?',
      'Welke kosten maak ik extra?',
      'Wat zijn de belangrijkste voorwaarden?',
      'Blijft de vergelijking gunstig zonder welkomstactie?',
    ],
  },
};

export const topicContent: Record<string, TopicContent> = Object.fromEntries(
  Object.entries(topicIntroductions).map(([slug, intro]) => [
    slug,
    { ...intro, ...topicLessons[slug] },
  ]),
);

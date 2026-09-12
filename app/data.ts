import { taxConfig } from './calculations.ts';
export const markets = [
  { name: 'AEX', value: 934.21, change: 0.42 },
  { name: 'S&P 500', value: 5842.47, change: 0.67 },
  { name: 'NASDAQ', value: 18239.92, change: 1.12 },
  { name: 'DAX', value: 18640.18, change: -0.23 },
  { name: 'Bitcoin', value: 67430, change: 2.14 },
  { name: 'EUR/USD', value: 1.0842, change: 0.08 },
  { name: 'Dow Jones', value: 42118.45, change: 0.36 },
  { name: 'Euro Stoxx', value: 4893.14, change: 0.31 },
  { name: 'Goud', value: 2340.5, change: -0.18 },
  { name: 'VIX', value: 14.62, change: -2.34 },
];
export const articles = [
  {
    slug: 'verder-dan-de-koers',
    category: 'Markt',
    title: 'Een koers vertelt wat er gebeurt. Maar nog niet waarom.',
    intro:
      'Over verwachtingen, bedrijfswinsten en het verhaal achter de cijfers.',
    image: '/amsterdam.jpg',
    read: 6,
    sections: [
      [
        'Prijs is een momentopname',
        'Een aandeel is een klein belang in een onderneming. De koers is de prijs waartegen kopers en verkopers elkaar op dat moment vinden. Achter die prijs zitten uiteenlopende verwachtingen: over toekomstige winst, rente, concurrentie en risico. Een stijgende koers zegt dus niet automatisch dat het bedrijf vandaag beter presteert. Het kan ook betekenen dat beleggers minder somber zijn dan gisteren.',
      ],
      [
        'De lat ligt soms hoger dan de uitslag',
        'Stel dat een onderneming haar winst met tien procent laat groeien. Dat klinkt positief. Maar als beleggers vijftien procent verwachtten, kan de koers toch dalen. De verrassing ten opzichte van de verwachting is dan belangrijker dan de groei zelf. Wie een kwartaalbericht leest, doet er daarom goed aan om omzet, marge en kasstroom naast de verwachtingen te leggen.',
      ],
      [
        'Kijk naar een reeks, niet naar één dag',
        'Een enkele beursdag bevat veel ruis. Bekijk liever meerdere kwartalen: groeit de vrije kasstroom mee met de winst? Hoe ontwikkelt de schuld zich? En welke aannames liggen onder de vooruitzichten van het bestuur? Zo ontstaat context voor koersbewegingen, zonder te doen alsof elke beweging volledig te verklaren is.',
      ],
      [
        'Maak je eigen uitgangspunten zichtbaar',
        'Schrijf vóór een belegging op wat je van het bedrijf verwacht en waardoor je van mening zou veranderen. Dat maakt het makkelijker om nieuw bedrijfsnieuws te beoordelen. Een koersdaling is op zichzelf geen bewijs dat je analyse fout is; een blijvende verslechtering van de onderliggende onderneming kan dat wel zijn.',
      ],
    ],
  },
  {
    slug: 'halfgeleiders-meer-dan-ai',
    category: 'Aandelen',
    title: 'Halfgeleiders: kijk verder dan het AI-verhaal.',
    intro:
      'Van orderboek tot investeringscyclus. Wat de chipsector werkelijk aandrijft.',
    image: '/wafer.jpg',
    read: 5,
    sections: [
      [
        'Een keten met verschillende rollen',
        'Chipontwerpers, fabrikanten en leveranciers van machines hebben verschillende verdienmodellen. Een sterke vraag naar rekenkracht werkt niet op ieder bedrijf op hetzelfde moment door. Kijk daarom eerst welk onderdeel van de keten je onderzoekt.',
      ],
      [
        'Orders zijn nog geen kasstroom',
        'Een orderboek geeft zicht op mogelijke toekomstige omzet. Levermomenten, klantinvesteringen en voorraden bepalen wanneer die omzet daadwerkelijk binnenkomt. Vergelijk de ontwikkeling van orders met marges en vrije kasstroom.',
      ],
      [
        'Cyclische groei vraagt om context',
        'De sector kent periodes van forse investeringen en periodes waarin klanten hun voorraden afbouwen. Een uitzonderlijk sterk kwartaal is geen vanzelfsprekende basis voor alle toekomstige jaren. Werk met meerdere scenario’s en houd rekening met concentratie bij klanten en geografische beperkingen.',
      ],
    ],
  },
  {
    slug: 'wereld-etf-basis',
    category: 'ETF',
    title: 'Eén wereld-ETF. Een wereld aan verschillen.',
    intro:
      'Wat je eigenlijk koopt als je wereldwijd belegt, en welke details ertoe doen.',
    read: 5,
    sections: [
      [
        'Wereldwijd is niet overal evenveel',
        'Een index die weegt naar beurswaarde geeft grotere ondernemingen meer gewicht. Daardoor kunnen enkele landen en sectoren een groot deel van een wereldfonds bepalen. Wereldwijd betekent dus niet dat iedere regio even zwaar meetelt.',
      ],
      [
        'Lees de index vóór je het fonds kiest',
        'Kijk welke landen en bedrijfsgroottes de index bevat. Opkomende markten en kleinere ondernemingen zitten niet automatisch in elk wereldfonds. Het essentiële-informatiedocument en de indexmethodologie laten zien wat wel en niet wordt gevolgd.',
      ],
      [
        'Kosten zijn meer dan een percentage',
        'Naast de jaarlijkse fondskosten kunnen transactiekosten en het verschil tussen koop- en verkoopprijs meespelen. Ook het verschil tussen het fondsresultaat en de index verdient aandacht. Vergelijk fondsen op dezelfde uitgangspunten en valuta.',
      ],
    ],
  },
  {
    slug: 'rente-en-waardering',
    category: 'Macro',
    title: 'Waarom rente zoveel meer is dan een percentage.',
    intro:
      'De verbinding tussen centrale banken, waarderingen en jouw portefeuille.',
    read: 4,
    sections: [
      [
        'Geld vandaag en geld later',
        'Een bedrag dat pas over tien jaar binnenkomt, heeft vandaag een andere waarde. De rente beïnvloedt de manier waarop beleggers toekomstige kasstromen waarderen. Een hogere vereiste vergoeding voor risico kan de huidige waardering drukken.',
      ],
      [
        'Niet iedere onderneming reageert gelijk',
        'Ondernemingen met veel herfinanciering kunnen gevoeliger zijn voor rentebewegingen. Bedrijven met veel contanten hebben andere effecten. Kijk naar de looptijd van schulden en de afspraken over vaste of variabele rente.',
      ],
      [
        'Verwachtingen bewegen eerder',
        'Markten reageren vaak al voordat een centrale bank een besluit neemt. Daarom leidt een renteverlaging niet vanzelf tot een koersstijging: die verlaging kan al in de prijs zijn verwerkt.',
      ],
    ],
  },
  {
    slug: 'dividend-is-geen-gratis-geld',
    category: 'Dividend',
    title: 'Dividend is geen gratis geld. Wat is het dan wel?',
    intro:
      'Waarom de uitkering alleen nooit het hele beleggingsverhaal vertelt.',
    read: 4,
    sections: [
      [
        'Een uitkering uit het bedrijf',
        'Bij een dividenduitkering verlaat geld de onderneming en gaat het naar aandeelhouders. Beoordeel daarom niet alleen de ontvangen inkomsten, maar ook het totale rendement: koersontwikkeling plus uitkeringen.',
      ],
      [
        'Houdbaarheid boven hoogte',
        'Een hoog dividendpercentage kan ontstaan door een sterk gedaalde koers. Onderzoek of de kasstroom de uitkering kan dragen en hoeveel ruimte er overblijft voor investeringen en schuldafbouw.',
      ],
      [
        'Herbeleggen verandert het groeipad',
        'Wie uitkeringen herbelegt, vergroot het aantal beleggingseenheden. Dat kan op lange termijn bijdragen aan samengestelde groei, maar de uiteindelijke opbrengst blijft onzeker. Gebruik de rekentool om verschillende aannames te vergelijken.',
      ],
    ],
  },
  {
    slug: 'een-plan-voor-onrust',
    category: 'Strategie',
    title: 'Maak je beleggingsplan als de beurs rustig is.',
    intro:
      'Een helder proces helpt wanneer de headlines steeds harder klinken.',
    read: 4,
    sections: [
      [
        'Begin bij de bestemming',
        'Een beleggingshorizon geeft richting aan je keuzes. Geld dat binnenkort nodig is, vraagt een andere afweging dan geld dat lange tijd kan blijven staan. Houd een buffer buiten je beleggingsplan.',
      ],
      [
        'Schrijf je beslisregels op',
        'Leg vast waarom je een belegging bezit, hoe groot die positie mag zijn en wanneer je opnieuw naar de verdeling kijkt. Een concreet proces voorkomt dat iedere nieuwsdag een nieuw plan oplevert.',
      ],
      [
        'Plan ook voor tegenvallers',
        'Reken naast een gunstig scenario ook met lager rendement en tijdelijke dalingen. Een model is geen voorspelling. Het helpt vooral om te zien welke aannames zwaar wegen.',
      ],
    ],
  },
  {
    slug: 'pensioen-buiten-de-koers',
    category: 'Pensioen',
    title: 'Je pensioen begint met overzicht.',
    intro: 'Breng eerst je bestaande opbouw, doelen en looptijd in kaart.',
    read: 4,
    sections: [
      [
        'Bekijk wat er al is',
        'Een pensioenplan begint met inzicht in bestaande regelingen en verwachte uitgaven. Het overzicht van je pensioenuitvoerder laat zien welke aanspraken je hebt opgebouwd.',
      ],
      [
        'Beschikbaarheid telt mee',
        'Geld in een pensioenproduct is doorgaans minder vrij beschikbaar dan geld op een gewone beleggingsrekening. Voorwaarden en fiscale regels bepalen welke inleg mogelijk is en wanneer uitkeringen plaatsvinden.',
      ],
      [
        'Vergelijk op dezelfde basis',
        'Bekijk kosten, beleggingsmogelijkheden en uitkeringsvoorwaarden in samenhang. Een productkeuze volgt uit je situatie; een aantrekkelijk tarief alleen is onvoldoende.',
      ],
    ],
  },
  {
    slug: 'portefeuille-in-overzicht',
    category: 'Portfolio',
    title:
      'Je beleggingen staan verspreid. Je overzicht hoeft dat niet te zijn.',
    intro:
      'Breng posities, verdeling en aannames bij elkaar voordat je opnieuw kiest.',
    read: 4,
    image: '',
    sections: [
      [
        'Begin bij het geheel',
        'Een losse rekening laat maar een deel van je vermogen zien. Zet beleggingen naast elkaar en noteer waar overlap zit: verschillende fondsen kunnen voor een groot deel in dezelfde bedrijven beleggen.',
      ],
      [
        'Kijk naar verdeling en concentratie',
        'Een overzicht helpt je zien hoeveel van je portefeuille samenhangt met één sector, regio of type belegging. De verdeling zegt iets over concentratie, maar is op zichzelf geen persoonlijk advies over een geschikte allocatie.',
      ],
      [
        'Een tracker is gereedschap',
        'Een portfoliotracker kan posities bundelen en ontwikkelingen zichtbaar maken. Controleer welke koppelingen werken, welke gegevens je deelt en welke functies betaald zijn. Een tracker voert je beleggingsplan niet voor je uit.',
      ],
    ],
  },
  {
    slug: 'reisvoordelen-afwegen',
    category: 'Reizen',
    title: 'Een reisvoordeel is pas waardevol als je het gebruikt.',
    intro:
      'Vergelijk kaartkosten met je eigen reisgedrag, acceptatie en bestaande verzekeringen.',
    read: 4,
    image: '',
    sections: [
      [
        'Begin bij reizen die je echt maakt',
        'Maak een lijst van de reizen die je verwacht en de voorzieningen die je normaal zou betalen. Een voordeel dat je anders niet gebruikt, is niet automatisch een besparing.',
      ],
      [
        'Lees wat een verzekering dekt',
        'Controleer dekking, uitsluitingen, eigen risico en betalingsvoorwaarden. Leg die naast je bestaande verzekeringen om te zien of er overlap is. Een opvallende voordeelnaam vertelt nog niet welke voorwaarden gelden.',
      ],
      [
        'Tel de totale kosten mee',
        'Zet de maandbijdrage om naar een jaarbedrag en bekijk eventuele valuta- en overige kosten. Controleer ook acceptatie en betaalvoorwaarden. Reisvoordelen en punten zijn geen beleggingsrendement.',
      ],
    ],
  },
];
export const toolItems = [
  {
    slug: 'rendement',
    title: 'Rendement calculator',
    text: 'Ontdek wat jouw inleg en horizon kunnen betekenen.',
  },
  {
    slug: 'etf-kosten',
    title: 'ETF-kosten vergelijken',
    text: 'Een klein kostenverschil. Een groot effect op lange termijn.',
  },
  {
    slug: 'doelvermogen',
    title: 'Doelvermogen calculator',
    text: 'Van een bedrag voor later naar je maandelijkse inleg.',
  },
  {
    slug: 'aflossen-of-beleggen',
    title: 'Aflossen of beleggen',
    text: 'Leg rentebesparing en beleggingsscenario’s naast elkaar.',
  },
  {
    slug: 'box-3',
    title: 'Box 3 calculator',
    text: 'Een heldere indicatie van je vermogensbelasting in 2026.',
  },
  {
    slug: 'compound-interest',
    title: 'Samengestelde rente',
    text: 'Zie het effect van rendement op rendement.',
  },
  {
    slug: 'inflatie',
    title: 'Inflatie & koopkracht',
    text: 'Ontdek wat hetzelfde bedrag later nog kan kopen.',
  },
  {
    slug: 'lump-sum-dca',
    title: 'Ineens of gespreid beleggen',
    text: 'Vergelijk instapmomenten bij verschillende koerspaden.',
  },
  {
    slug: 'dividend',
    title: 'Dividend herbeleggen',
    text: 'Bekijk uitkeren en herbeleggen naast elkaar.',
  },
];
export const partners = [
  {
    slug: 'scalable-capital',
    name: 'Scalable Capital',
    category: 'Broker',
    text: 'Voor het onderzoeken van zelfstandig beleggen en periodiek investeren.',
    url: 'https://nl.scalable.capital/',
  },
  {
    slug: 'delta',
    name: 'Delta',
    category: 'Portfoliotracker',
    text: 'Breng verschillende beleggingen samen in één overzicht.',
    url: 'https://delta.app/',
  },
  {
    slug: 'brand-new-day',
    name: 'Brand New Day',
    category: 'Pensioenbeleggen',
    text: 'Verdiep je in aanvullende pensioenopbouw en de bijbehorende voorwaarden.',
    url: 'https://new.brandnewday.nl/',
  },
  {
    slug: 'saxo',
    name: 'Saxo',
    category: 'Broker',
    text: 'Onderzoek de mogelijkheden voor actieve en zakelijke beleggers.',
    url: 'https://www.home.saxo/nl-nl',
  },
  {
    slug: 'american-express',
    name: 'American Express',
    category: 'Reizen & rewards',
    text: 'Verdiep je in kaartvoorwaarden, kosten en reisvoordelen.',
    url: 'https://www.americanexpress.com/nl/',
  },
];
export const topics = [
  ['beginnen', 'Beginnen'],
  ['vermogen', 'Vermogen'],
  ['aandelen', 'Aandelen'],
  ['etfs', 'ETF'],
  ['dividend', 'Dividend'],
  ['strategie', 'Strategie'],
  ['pensioen', 'Pensioen'],
  ['zakelijk', 'Zakelijk'],
  ['portfolio', 'Portfolio'],
  ['reizen', 'Reizen'],
];
export const taxSource =
  'https://www.belastingdienst.nl/wps/wcm/connect/nl/box-3/content/berekening-box-3-inkomen-2026';
export function futureValue(
  initial: number,
  monthly: number,
  annual: number,
  years: number,
) {
  const r = Math.pow(1 + annual / 100, 1 / 12) - 1,
    n = years * 12;
  return (
    initial * Math.pow(1 + r, n) +
    (Math.abs(r) < 1e-10
      ? monthly * n
      : (monthly * (Math.pow(1 + r, n) - 1)) / r)
  );
}
export function boxTax(
  savings: number,
  investments: number,
  debt: number,
  partner: boolean,
) {
  const persons = partner ? 2 : 1,
    deductible = Math.max(0, debt - taxConfig.debtThreshold * persons),
    base = savings + investments - deductible,
    exempt = taxConfig.exemption * persons,
    share = base > 0 ? Math.max(0, base - exempt) / base : 0;
  return {
    tax: Math.max(
      0,
      (savings * taxConfig.savingsRate +
        investments * taxConfig.investmentRate -
        deductible * taxConfig.debtRate) *
        share *
        taxConfig.taxRate,
    ),
    base: Math.max(0, base - exempt),
    exempt,
  };
}

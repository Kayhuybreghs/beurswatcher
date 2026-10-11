export const partnerFacts: Record<
  string,
  {
    headline: string;
    description: string;
    benefits: string[];
    less: string;
    cost: string;
    costSource: string;
    source: string;
    steps: string[];
    checkedAt: string;
  }
> = {
  'scalable-capital': {
    checkedAt: '11 oktober 2026',
    headline: 'Beleggingsplannen, een wereld-ETF en rente bij Scalable.',
    description:
      'Lees hoe je periodiek belegt, hoe de Scalable wereld-ETF is opgebouwd en wat het Overnight account doet met geld dat je niet belegt. Met de kosten, voorwaarden en risico’s erbij.',
    benefits: [
      'Beleggingsplannen vanaf € 1.',
      'Geen uitvoeringskosten voor beleggingsplannen; productkosten en spreads kunnen wel gelden.',
      'Een gratis FREE-abonnement naast het betaalde PRIME+.',
    ],
    less: 'Je wilt dat iemand een persoonlijk beleggingsplan voor je maakt, of je hebt het geld op korte termijn nodig.',
    cost: 'FREE: € 0 per maand. PRIME+: € 4,99 per maand. Losse transacties, handelsplaatsen en productkosten hebben eigen voorwaarden.',
    costSource: 'https://nl.scalable.capital/trading-kosten',
    source: 'https://nl.scalable.capital/',
    steps: [
      'Kies je belegging',
      'Bepaal je vaste inleg',
      'Controleer kosten en voorwaarden',
    ],
  },
  delta: {
    checkedAt: '11 oktober 2026',
    headline: 'Je beleggingen bijhouden met Delta.',
    description:
      'Breng beleggingen van verschillende rekeningen samen, volg je portefeuille en bekijk het overzicht via een iPhone-widget. Lees wat Delta wel en niet kan koppelen.',
    benefits: [
      'Verschillende soorten beleggingen in één overzicht.',
      'Handmatige transacties voor posities zonder automatische koppeling.',
      'Bekijk hoe de waarde en verdeling van je beleggingen veranderen.',
    ],
    less: 'Je zoekt een broker om orders te plaatsen of verwacht dat iedere rekening automatisch kan worden gekoppeld.',
    cost: 'Een gratis basisversie met maximaal tien beleggingen. Extra functies via betaalde abonnementen; prijzen verschillen per locatie.',
    costSource: 'https://delta.app/en/pro',
    source: 'https://delta.app/en/features',
    steps: ['Breng posities samen', 'Bekijk de verdeling', 'Volg het totaal'],
  },
  'brand-new-day': {
    checkedAt: '11 oktober 2026',
    headline: 'Pensioen opbouwen bij Brand New Day.',
    description:
      'Lees over pensioenbeleggen, pensioensparen en je fiscale inlegruimte. Wat kun je aftrekken, welke kosten betaal je en wanneer kun je het geld gebruiken?',
    benefits: [
      'Kiezen uit modelportefeuilles of zelf fondsen kiezen.',
      'Inleggen voor aanvullend pensioen.',
      'Belastingvoordeel kan mogelijk zijn binnen je persoonlijke fiscale ruimte.',
    ],
    less: 'Je wilt vrij over je geld kunnen beschikken of hebt je fiscale ruimte en bestaande pensioen nog niet in beeld.',
    cost: 'Pensioenrekening-beleggen: € 49 afsluitkosten, 0,50% stortingskosten en 0,44% jaarlijkse servicekosten. Daar komen fondskosten bij, afhankelijk van de gekozen fondsen.',
    costSource: 'https://new.brandnewday.nl/pensioenrekening-beleggen/',
    source:
      'https://new.brandnewday.nl/de-spelregels-en-voordelen-van-de-pensioenrekening/',
    steps: [
      'Bekijk je bestaande pensioen',
      'Controleer je fiscale ruimte',
      'Onderzoek pensioenbeleggen',
    ],
  },
  saxo: {
    checkedAt: '11 oktober 2026',
    headline: 'Zelf beleggen bij Saxo: België en zakelijk Nederland.',
    description:
      'Wat regelt Saxo voor Belgische beleggers en hoe werkt een zakelijke rekening in Nederland? Bekijk de mogelijkheden apart: per land en rekening gelden andere voorwaarden.',
    benefits: [
      'Belgische beurstaks automatisch afgehandeld bij Saxo België.',
      'Een afzonderlijke rekening voor zakelijk beleggen in Nederland.',
      'Periodiek beleggen met AutoInvest waar beschikbaar.',
      'Overzichten van je aankopen, verkopen en beleggingen.',
    ],
    less: 'Het geld is nodig voor belastingen, vaste lasten of andere bedrijfsreserves. Complexe producten zijn niet voor iedere belegger passend.',
    cost: 'Tarieven hangen af van rekeningniveau en product. Zakelijke klantonderzoekkosten kunnen gelden, afhankelijk van de bedrijfsstructuur. Bekijk de volledige actuele tarieflijst.',
    costSource: 'https://www.home.saxo/nl-nl/rates-and-conditions/',
    source: 'https://www.home.saxo/nl-nl/accounts/corporate',
    steps: [
      'Bepaal welke reserves nodig zijn',
      'Bepaal hoelang je geld kunt missen',
      'Vergelijk rekening en kosten',
    ],
  },
  'american-express': {
    checkedAt: '11 oktober 2026',
    headline: 'Reisvoordelen van American Express.',
    description:
      'Lees hoe punten sparen, loungetoegang en Privium werken. Vergelijk de kosten en voorwaarden van de kaarten met de voordelen die je daadwerkelijk gebruikt.',
    benefits: [
      'Membership Rewards bij de Gold Card.',
      'Reisvoorzieningen en verzekeringen afhankelijk van de kaart.',
      'Verschillende kaarten om kosten en gebruik naast elkaar te leggen.',
    ],
    less: 'Je gebruikt de voordelen weinig, de kaart wordt niet voldoende geaccepteerd of je kunt het volledige saldo niet maandelijks betalen.',
    cost: 'Gold: € 20 per maand. Platinum: € 75 per maand. Controleer overige kosten, verzekeringsvoorwaarden en welke voordelen je daadwerkelijk benut.',
    costSource:
      'https://www.americanexpress.com/nl-nl/creditcard/platinum-card/',
    source: 'https://www.americanexpress.com/nl-nl/creditcard/gold-card/',
    steps: [
      'Bekijk je reisgedrag',
      'Tel bruikbare voordelen',
      'Vergelijk met de kaartkosten',
    ],
  },
};

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
  }
> = {
  'scalable-capital': {
    headline: 'Zelf beleggen bij Scalable Capital.',
    description:
      'Scalable Capital is een broker waarmee je zelf aandelen en ETF’s kiest. Met een beleggingsplan kun je periodiek inleggen.',
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
    headline: 'Je beleggingen bijhouden met Delta.',
    description:
      'Delta is een app om je beleggingen bij te houden. Je brengt ze samen in één overzicht door rekeningen te koppelen of transacties zelf in te voeren. Niet iedere rekening kan worden gekoppeld. Je belegt je geld niet bij Delta.',
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
    headline: 'Pensioenbeleggen bij Brand New Day.',
    description:
      'Met de pensioenrekening-beleggen van Brand New Day kun je aanvullend pensioen opbouwen in beleggingsfondsen. De rekening is fiscaal geblokkeerd: dit is geld voor later.',
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
    headline: 'Zakelijk beleggen bij Saxo.',
    description:
      'Saxo biedt zelfstandig beleggen en zakelijke beleggingsrekeningen. Onderzoek eerst welk geld je onderneming kan missen en welke rekening bij de rechtsvorm past.',
    benefits: [
      'Een afzonderlijke rekening voor zakelijk beleggen.',
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
    headline: 'Reisvoordelen van American Express.',
    description:
      'American Express biedt betaalkaarten met kaartafhankelijke reisvoordelen, punten en verzekeringen. De waarde hangt af van je gebruik, acceptatie en de voorwaarden.',
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
// Commercial relationships with the listed providers have not been confirmed.
// Add supplied affiliate URLs only after Daniel confirms the relationship and link.
export const affiliateLinks: Record<string, string> = {};

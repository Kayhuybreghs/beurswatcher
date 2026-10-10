export type Journey = {
  article: string;
  topic: string;
  tool: string;
  partner: string;
  question: string;
  reason: string;
};
export const journeys: Record<string, Journey> = {
  Portfolio: {
    article: 'portefeuille-in-overzicht',
    topic: 'portfolio',
    tool: 'rendement',
    partner: 'delta',
    question: 'Hoe is je portefeuille verdeeld?',
    reason:
      'Breng posities samen en onderzoek de verdeling van je portefeuille.',
  },
  Reizen: {
    article: 'reisvoordelen-afwegen',
    topic: 'reizen',
    tool: 'inflatie',
    partner: 'american-express',
    question: 'Welke reisvoordelen gebruik je echt?',
    reason: 'Vergelijk kaartvoorwaarden en kosten met je eigen reisgedrag.',
  },
  ETF: {
    article: 'wereld-etf-basis',
    topic: 'etfs',
    tool: 'etf-kosten',
    partner: 'scalable-capital',
    question: 'Wat kosten je beleggingen over 20 jaar?',
    reason:
      'Na het fonds komt de broker. Vergelijk de kosten voor jouw manier van beleggen.',
  },
  Aandelen: {
    article: 'halfgeleiders-meer-dan-ai',
    topic: 'aandelen',
    tool: 'rendement',
    partner: 'delta',
    question: 'Wat betekent een ander groeiscenario?',
    reason:
      'Houd je verschillende posities en hun ontwikkeling overzichtelijk bij.',
  },
  Markt: {
    article: 'verder-dan-de-koers',
    topic: 'markt-economie',
    tool: 'rendement',
    partner: 'delta',
    question: 'Waarom reageert de beurs op economische cijfers?',
    reason: 'Bekijk hoe je je portefeuille als geheel kunt blijven volgen.',
  },
  Macro: {
    article: 'rente-en-waardering',
    topic: 'markt-economie',
    tool: 'aflossen-of-beleggen',
    partner: 'scalable-capital',
    question: 'Wat betekent een rentewijziging voor beleggers?',
    reason: 'Onderzoek welke broker past als je zelf wilt beleggen.',
  },
  Strategie: {
    article: 'een-plan-voor-onrust',
    topic: 'strategie',
    tool: 'doelvermogen',
    partner: 'scalable-capital',
    question: 'Hoeveel wil je inleggen en voor hoelang?',
    reason: 'Een vaste inleg vraagt om een dienst die past bij je aanpak.',
  },
  Dividend: {
    article: 'dividend-is-geen-gratis-geld',
    topic: 'dividend',
    tool: 'dividend',
    partner: 'delta',
    question: 'Wat gebeurt er als je rendement herbelegt?',
    reason:
      'Volg uitkeringen en beleggingen in de context van je totale portefeuille.',
  },
  Pensioen: {
    article: 'pensioen-buiten-de-koers',
    topic: 'pensioen',
    tool: 'doelvermogen',
    partner: 'brand-new-day',
    question: 'Welk vermogen wil je later opbouwen?',
    reason:
      'Voor aanvullend pensioen zijn de voorwaarden van een pensioenproduct relevant.',
  },
  Zakelijk: {
    article: 'een-plan-voor-onrust',
    topic: 'zakelijk',
    tool: 'rendement',
    partner: 'saxo',
    question: 'Welk bedrijfsvermogen kun je langere tijd missen?',
    reason:
      'Bekijk welke mogelijkheden en voorwaarden gelden voor zakelijk beleggen.',
  },
};
export const toolTopics: Record<string, string> = {
  inflatie: 'Macro',
  dividend: 'Dividend',
  'lump-sum-dca': 'Strategie',
  rendement: 'Strategie',
  'compound-interest': 'Dividend',
  'aflossen-of-beleggen': 'Macro',
  'box-3': 'Strategie',
  'etf-kosten': 'ETF',
  doelvermogen: 'Pensioen',
};
export const partnerDetails: Record<
  string,
  {
    intent: string;
    fit: string;
    angle: string;
    consider: string[];
    check: string[];
    topic: string;
  }
> = {
  'scalable-capital': {
    intent: 'Periodiek beleggen',
    fit: 'Je wilt zelfstandig beleggen en onderzoeken hoe een vaste inleg in jouw aanpak past.',
    angle:
      'Vergelijk de broker op aanbod, handelskosten en periodiek inleggen.',
    consider: [
      'Een vaste routine voor je inleg',
      'Het aanbod van aandelen en ETF’s',
      'Inzicht in kosten per transactie en beleggingsplan',
    ],
    check: [
      'Vergelijk tarieven voor jouw verwachte handelsfrequentie.',
      'Lees de voorwaarden voor geldsaldi, orderuitvoering en overdracht.',
    ],
    topic: 'ETF',
  },
  delta: {
    intent: 'Portefeuille bijhouden',
    fit: 'Je houdt beleggingen op verschillende plekken bij en wilt de samenhang blijven zien.',
    angle:
      'Beleggingen van verschillende rekeningen in één overzicht bijhouden.',
    consider: [
      'Overzicht van meerdere posities',
      'Ontwikkeling van je portefeuille',
      'Aandacht voor verdeling en concentratie',
    ],
    check: [
      'Controleer welke rekeningen en beleggingen worden ondersteund.',
      'Bekijk de privacy- en abonnementsvoorwaarden voordat je koppelt.',
    ],
    topic: 'Aandelen',
  },
  'brand-new-day': {
    intent: 'Pensioen opbouwen',
    fit: 'Je wilt onderzoeken hoe je aanvullend vermogen voor later kunt opbouwen.',
    angle:
      'Onderzoek de kosten en voorwaarden voor aanvullende pensioenopbouw.',
    consider: [
      'De bestaande pensioenopbouw meenemen',
      'Een lange beleggingshorizon',
      'Kosten over de volledige looptijd vergelijken',
    ],
    check: [
      'Pensioenproducten beperken de vrije beschikbaarheid van geld.',
      'Fiscale ruimte en voorwaarden hangen af van jouw situatie.',
    ],
    topic: 'Pensioen',
  },
  saxo: {
    intent: 'Zakelijk & zelfstandig beleggen',
    fit: 'Je onderzoekt mogelijkheden voor je onderneming of wilt zelfstandig beleggen.',
    angle: 'Wat heeft je onderneming nodig voordat geld belegd kan worden?',
    consider: [
      'Liquiditeit en beleggingshorizon',
      'Passend productaanbod',
      'Rapportage en administratieve eisen',
    ],
    check: [
      'Controleer de voorwaarden voor jouw rechtsvorm en land.',
      'Beoordeel kosten, complexiteit en risico per gekozen product.',
    ],
    topic: 'Zakelijk',
  },
  'american-express': {
    intent: 'Reizen & kaartvoordelen',
    fit: 'Je reist en wilt beoordelen of de kaartvoorwaarden bij je gebruik passen.',
    angle: 'Voordelen zijn pas waardevol wanneer je ze ook gebruikt.',
    consider: [
      'Jaarlijkse kosten versus daadwerkelijk gebruik',
      'Acceptatie op je reisbestemmingen',
      'De voorwaarden van verzekeringen en voordelen',
    ],
    check: [
      'Vergelijk de totale kaartkosten met de voordelen die je werkelijk benut.',
      'Controleer uitsluitingen, valutakosten en betaalvoorwaarden.',
    ],
    topic: 'Reizen',
  },
};

import { requiredMonthly, taxConfig } from './calculations.ts';
import {
  dividendScenario,
  entryScenario,
  type MarketPath,
} from './scenario-math.ts';

export type GuideAnalysis = {
  title: string;
  question: string;
  assumptions: string[];
  columns: string[];
  rows: (string | number)[][];
  findings: [string, string][];
  method: string;
  limitation: string;
  nextStep: string;
};

const euro = (value: number) =>
  new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
const percent = (value: number, decimals = 2) =>
  new Intl.NumberFormat('nl-NL', { maximumFractionDigits: decimals }).format(
    value,
  ) + '%';
const rounded = (value: number) => Math.round(value);

// All examples below are synthetic teaching scenarios. No historical market data
// or claims about Daniel's portfolio are used. Keep calculations unrounded until display.
export const analysisMath = {
  monthlyValue(
    initial: number,
    monthly: number,
    annual: number,
    years: number,
  ) {
    const factor = (1 + annual / 100) ** (1 / 12),
      months = years * 12;
    const annuity =
      Math.abs(factor - 1) < 1e-10
        ? months
        : (factor ** months - 1) / (factor - 1);
    return initial * factor ** months + monthly * annuity;
  },
  requiredMonthly,
  costs(initial: number, annual: number, fee: number, years: number) {
    let end = initial,
      paid = 0;
    for (let year = 0; year < years; year++) {
      end *= 1 + annual / 100;
      const charge = (end * fee) / 100;
      paid += charge;
      end -= charge;
    }
    const withoutFees = initial * (1 + annual / 100) ** years;
    return {
      end,
      paid,
      lostGrowth: withoutFees - end - paid,
      difference: withoutFees - end,
    };
  },
  twoYears(initial: number, first: number, second: number) {
    const factor = (1 + first / 100) * (1 + second / 100);
    return {
      end: initial * factor,
      arithmetic: (first + second) / 2,
      geometric: (Math.sqrt(factor) - 1) * 100,
    };
  },
  inflation(initial: number, annual: number, inflation: number, years: number) {
    const nominal = initial * (1 + annual / 100) ** years;
    return {
      nominal,
      real: nominal / (1 + inflation / 100) ** years,
      realAnnual: ((1 + annual / 100) / (1 + inflation / 100) - 1) * 100,
    };
  },
  payoff(
    initial: number,
    netInterest: number,
    investment: number,
    years: number,
  ) {
    const repayment = initial + ((initial * netInterest) / 100) * years;
    const invested = initial * (1 + investment / 100) ** years;
    return {
      repayment,
      invested,
      difference: invested - repayment,
      reinvestedSavings: initial * (1 + netInterest / 100) ** years,
      breakEven: ((1 + (netInterest / 100) * years) ** (1 / years) - 1) * 100,
    };
  },
  simpleBox3(total: number, investmentShare: number, partner = false) {
    const investments = total * investmentShare,
      savings = total - investments;
    const forfait =
      savings * taxConfig.savingsRate + investments * taxConfig.investmentRate;
    const taxableShare =
      total > 0
        ? Math.max(0, total - taxConfig.exemption * (partner ? 2 : 1)) / total
        : 0;
    return {
      savings,
      investments,
      forfait,
      tax: forfait * taxableShare * taxConfig.taxRate,
    };
  },
};

const returnRates = [-3, 0, 3, 6, 9];
const returns = returnRates.map((rate) => ({
  rate,
  end: analysisMath.monthlyValue(10000, 150, rate, 20),
}));
const fees = [0, 0.15, 0.5, 1].map((fee) => ({
  fee,
  ...analysisMath.costs(10000, 6, fee, 20),
}));
const goals = [10, 20, 30].flatMap((years) =>
  [0, 3, 6].map((rate) => {
    const monthly = requiredMonthly(100000, 10000, rate, years);
    return { years, rate, monthly, own: 10000 + monthly * years * 12 };
  }),
);
const pairs = [
  [5, 5],
  [20, -10],
  [-10, 20],
  [30, -20],
  [50, -40],
  [-20, -20],
];
const geometry = pairs.map(([first, second]) => ({
  first,
  second,
  ...analysisMath.twoYears(10000, first, second),
}));
const inflationInputs = [
  [0, 2],
  [2, 2],
  [2, 4],
  [5, 2],
  [5, 4],
  [5, 6],
];
const purchasingPower = inflationInputs.map(([rate, inflation]) => ({
  rate,
  inflation,
  ...analysisMath.inflation(10000, rate, inflation, 20),
}));
const payoff = [-3, 0, 2, 4, 6].map((rate) => ({
  rate,
  ...analysisMath.payoff(10000, 4, rate, 10),
}));
const taxMix = [0, 0.25, 0.5, 0.75, 1].map((share) =>
  analysisMath.simpleBox3(100000, share),
);
const paths: [MarketPath, string][] = [
  ['steady', 'Gelijkmatige groei'],
  ['early-drop', 'Daling in maand 2'],
  ['late-drop', 'Daling in maand 59'],
];
const entry = paths.flatMap(([path, label]) =>
  [0, 2].map((cashRate) => {
    const result = entryScenario(12000, 6, 5, 12, cashRate, path).at(-1)!;
    return { path, label, cashRate, ...result };
  }),
);
const dividends = [-6, -3, 0, 3, 6].map((growth) => ({
  growth,
  ...dividendScenario(10000, growth, 3, 10).at(-1)!,
}));

export const guideAnalyses: Record<string, GuideAnalysis> = {
  'rendement-scenario-kiezen': {
    title: 'Dezelfde inleg, vijf verschillende uitkomsten',
    question:
      'Hoe afhankelijk is je eindbedrag van het rendement dat je invult? We houden alle andere invoer gelijk, inclusief de maandelijkse stortingen. Zo zie je hoeveel van het resultaat door eigen geld komt en hoeveel door de gekozen rendementsaanname.',
    assumptions: [
      '€ 10.000 startkapitaal en € 150 aan het einde van elke maand.',
      'Looptijd: 20 jaar; totale eigen inleg € 46.000.',
      'Vijf fictieve, constante jaarrendementen; geen kosten, belasting of inflatie.',
    ],
    columns: [
      'Jaarrendement',
      'Eigen inleg (€)',
      'Eindvermogen (€)',
      'Groei of verlies (€)',
    ],
    rows: returns.map((r) => [
      percent(r.rate),
      46000,
      rounded(r.end),
      rounded(r.end - 46000),
    ]),
    findings: [
      [
        'Een hoger saldo kan toch verlies betekenen',
        `Bij −3% blijft ${euro(returns[0].end)} over. Dat is meer dan het startkapitaal, maar ${euro(46000 - returns[0].end)} minder dan alle stortingen samen. Alleen begin- en eindsaldo vergelijken zou dit verlies verbergen.`,
      ],
      [
        'De invoer maakt een groot verschil',
        `Bij 6% komt de uitkomst ${euro(returns[3].end - returns[1].end)} hoger uit dan bij 0%. Dat bedrag is volledig afhankelijk van de aanname; de eigen inleg is in beide rijen gelijk. Een hoge uitkomst bewijst daarom niet dat je maandbedrag voldoende is.`,
      ],
      [
        'Gebruik ook de ongunstige rij',
        'De negatieve rij is een gevoeligheidscontrole, geen voorspelling van twintig verliesjaren. Bekijk welk eindbedrag nog bruikbaar is voor je doel en welk maandbedrag je ook bij tegenvallende koersen kunt volhouden.',
      ],
    ],
    method:
      'Het maandrendement is (1 + jaarrendement)^(1/12) − 1. Eerst groeit het bestaande saldo, daarna komt de maandstorting erbij. We tellen alle 240 stortingen apart op en trekken die samen met het startkapitaal van het eindvermogen af. Afgerond wordt pas voor de tabel.',
    limitation:
      'Een constante lijn bevat geen echte koersvolgorde, crisismomenten of kansverdeling. De rijen vertellen niet hoe waarschijnlijk een uitkomst is. Ook met een positieve langetermijnaanname kun je op het moment van opnemen verlies hebben.',
    nextStep:
      'Vul in de rendementstool eerst je eigen startbedrag en maandinleg in. Vergelijk daarna nul, een lagere aanname en je oorspronkelijke aanname, zonder tegelijk de looptijd te veranderen.',
  },
  'etf-kosten-lange-termijn': {
    title: 'Kosten betalen én groei mislopen',
    question:
      'Is het verschil tussen twee eindbedragen hetzelfde als de betaalde kosten? Deze berekening splitst het nadeel op: bedragen die daadwerkelijk uit het modelvermogen verdwijnen en groei die dat verdwenen geld daarna niet meer oplevert.',
    assumptions: [
      '€ 10.000 eenmalige inleg, 20 jaar, ieder jaar 6% brutorendement.',
      'Kosten worden ieder jaar na de brutogroei over het dan aanwezige vermogen berekend.',
      'Geen extra stortingen, orderkosten, belasting of inflatie; 0% kosten is alleen een rekenreferentie.',
    ],
    columns: [
      'Jaarlijkse kosten',
      'Eindvermogen (€)',
      'Betaalde kosten (€)',
      'Misgelopen groei (€)',
      'Totaal verschil met 0% (€)',
    ],
    rows: fees.map((f) => [
      percent(f.fee),
      rounded(f.end),
      rounded(f.paid),
      rounded(f.lostGrowth),
      rounded(f.difference),
    ]),
    findings: [
      [
        'De kostenfactuur verklaart niet het hele verschil',
        `Bij 1% kosten verdwijnt in dit model ${euro(fees[3].paid)} aan kosten. Het eindbedrag is ${euro(fees[3].difference)} lager dan zonder kosten. De resterende ${euro(fees[3].lostGrowth)} is gemiste groei op eerder afgeboekte bedragen.`,
      ],
      [
        'Vergelijk dezelfde bruto belegging',
        `Het verschil tussen 0,15% en 1% kosten is ${euro(fees[1].end - fees[3].end)} na twintig jaar. Dat is alleen een kostenvergelijking doordat het brutorendement gelijk blijft. Twee echte ETF’s kunnen ook een andere index, spreiding of uitvoering hebben.`,
      ],
      [
        'Voorkom dubbel aftrekken',
        'Een gepubliceerd fondsresultaat bevat doorgaans al doorlopende fondskosten. Trek hetzelfde kostenpercentage daar niet nogmaals vanaf. Controleer daarnaast welke handels- en rekeningkosten buiten dat fondsresultaat vallen.',
      ],
    ],
    method:
      'Per jaar: vermogen × 1,06; vervolgens dat bedrag × kostenpercentage afboeken. We sommeren de jaarlijkse afboekingen. Het totale eindverschil minus die som is de misgelopen groei. De getoonde kolommen zijn afzonderlijk afgerond en kunnen daardoor € 1 van een optelsom afwijken.',
    limitation:
      'Dit is een vereenvoudigd jaarlijks kostenmodel. Fondsen verwerken kosten in de praktijk op andere momenten. De tabel is geen vergelijking van actuele brokertarieven en kent geen wisselende rendementen of tracking difference.',
    nextStep:
      'Gebruik de ETF-kostentool voor vergelijkbare jaarlijkse percentages. Noteer losse order- en rekeningkosten daarnaast, en controleer of je rendementsinvoer vóór of ná fondskosten is.',
  },
  'honderdduizend-euro-opbouwen': {
    title: '€ 100.000: wat veranderen tien extra jaren?',
    question:
      'Een doelbedrag zegt weinig zonder een datum en rendementsaanname. We rekenen negen combinaties door. Daardoor zie je welke ruimte meer tijd geeft én hoeveel van die ruimte afhankelijk is van onzekere groei.',
    assumptions: [
      'Doel: € 100.000 nominaal; startkapitaal € 10.000.',
      'Maandelijkse storting aan het einde van de maand, telkens hetzelfde bedrag.',
      'Looptijden 10, 20 en 30 jaar; fictieve rendementen 0%, 3% en 6%; geen kosten of belasting.',
    ],
    columns: [
      'Looptijd (jaar)',
      'Jaarrendement',
      'Maandinleg (€)',
      'Totale eigen inleg (€)',
      'Berekende groei (€)',
    ],
    rows: goals.map((g) => [
      g.years,
      percent(g.rate),
      rounded(g.monthly),
      rounded(g.own),
      rounded(100000 - g.own),
    ]),
    findings: [
      [
        'Meer tijd helpt ook zonder rendement',
        `Bij 0% daalt de benodigde maandinleg van ${euro(goals[0].monthly)} in tien jaar naar ${euro(goals[6].monthly)} in dertig jaar. Er is dan geen beleggingsgroei: dezelfde ontbrekende € 90.000 wordt simpelweg over meer maanden verdeeld.`,
      ],
      [
        'Rendement verlaagt de berekende inleg, niet de onzekerheid',
        `Bij twintig jaar vraagt 0% om ${euro(goals[3].monthly)} per maand en 6% om ${euro(goals[5].monthly)}. Met de lagere inleg bereik je het doel in het model alleen wanneer die rendementsaanname uitkomt. De tabel bevat geen zekerheid dat dit gebeurt.`,
      ],
      [
        'Het doel heeft nog geen vaste koopkracht',
        '€ 100.000 over dertig jaar is niet hetzelfde als € 100.000 vandaag. Bepaal eerst of je een nominaal bedrag bedoelt of de toekomstige prijs van een uitgave. Bij dat laatste moet het doelbedrag eventueel met inflatie meegroeien.',
      ],
    ],
    method:
      'We lossen de maandinleg op uit het eindbedrag van startkapitaal plus maandstortingen. Bij 0% delen we € 90.000 door het aantal maanden. Totale inleg en groei gebruiken het ongeronde maandbedrag; daardoor zijn ze niet exact te reconstrueren met alleen de afgeronde tabelinleg.',
    limitation:
      'Iedere rij rekent met een vaste storting en gelijkmatig rendement. De tabel houdt geen rekening met werkloosheid, onderbrekingen of belastingen. Een langere beleggingsduur verlaagt niet alle risico’s en is geen belofte van herstel.',
    nextStep:
      'Kies in de doelvermogentool eerst je beschikbare looptijd. Controleer vervolgens een lager rendement en vergelijk het benodigde maandbedrag met wat je werkelijk kunt missen.',
  },
  'gemiddeld-en-samengesteld-rendement': {
    title: 'Gemiddeld 5% kan toch vermogen kosten',
    question:
      'Waarom leveren twee jaarpercentages met hetzelfde gemiddelde verschillende eindbedragen op? We nemen steeds twee jaren en houden het startbedrag gelijk. De berekening laat ook zien wanneer de volgorde van die jaren wel en niet uitmaakt.',
    assumptions: [
      '€ 10.000 startkapitaal; twee fictieve jaarresultaten per rij.',
      'Geen stortingen, opnames, kosten, dividend buiten het rendement of belasting.',
      'Rekenkundig gemiddelde: percentages optellen en delen door twee. Samengesteld: het constante jaarpercentage dat dezelfde eindwaarde geeft.',
    ],
    columns: [
      'Jaar 1',
      'Jaar 2',
      'Gemiddelde',
      'Samengesteld per jaar',
      'Eindvermogen (€)',
    ],
    rows: geometry.map((g) => [
      percent(g.first),
      percent(g.second),
      percent(g.arithmetic),
      percent(g.geometric),
      rounded(g.end),
    ]),
    findings: [
      [
        'Hetzelfde gemiddelde, een ander bedrag',
        `Twee keer 5% levert ${euro(geometry[0].end)} op. Eerst 30% en daarna −20% heeft ook gemiddeld 5%, maar eindigt op ${euro(geometry[3].end)}. De daling wordt dan over een inmiddels groter bedrag berekend.`,
      ],
      [
        'Een positief gemiddelde kan samengaan met verlies',
        `De combinatie +50% en −40% heeft gemiddeld 5%, maar laat ${euro(geometry[4].end)} over. Het passende samengestelde jaarpercentage is ${percent(geometry[4].geometric)}. Dat negatieve getal beschrijft de vermogensontwikkeling beter dan het positieve rekenkundige gemiddelde.`,
      ],
      [
        'Volgorde vraagt om context',
        'De rijen +20%/−10% en −10%/+20% eindigen gelijk, omdat er tussendoor geen geld bij komt of af gaat. Bij periodieke inleg of opnames kan de volgorde wél verschil maken. Gebruik deze tweejarenvergelijking daarom niet als bewijs dat timing altijd onbelangrijk is.',
      ],
    ],
    method:
      'Eindvermogen = € 10.000 × (1 + jaar 1) × (1 + jaar 2). Het samengestelde jaarpercentage is de vierkantswortel van eindvermogen/startvermogen, minus één. We rekenen percentages eerst als decimalen en ronden pas de presentatie af.',
    limitation:
      'De zes rijen zijn geconstrueerde voorbeelden, geen geselecteerde historische beursjaren. Ze zeggen niets over verwachte schommelingen of een geschikt risiconiveau. Ze maken één rekenverschil controleerbaar.',
    nextStep:
      'Controleer bij een rendementscijfer of het om een rekenkundig gemiddelde, samengesteld rendement of totaalrendement gaat voordat je het in de rente-op-rentetool gebruikt.',
  },
  'nominaal-en-reeel-rendement': {
    title: 'Een groter saldo koopt niet altijd meer',
    question:
      'Hoeveel houdt groei over nadat prijzen zijn gestegen? In elke rij groeit hetzelfde startbedrag twintig jaar. Daarna rekenen we het saldo terug naar de koopkracht van vandaag. Zo vergelijken we een rekeningbedrag met wat je ervan kunt kopen.',
    assumptions: [
      '€ 10.000 startkapitaal, 20 jaar, geen extra inleg of opnames.',
      'Constante fictieve rendementen en inflatiepercentages; geen kosten en belasting.',
      'Koopkracht wordt uitgedrukt in euro’s van het beginjaar; persoonlijke uitgaven kunnen anders in prijs veranderen.',
    ],
    columns: [
      'Rendement',
      'Inflatie',
      'Nominaal eindbedrag (€)',
      'Koopkracht vandaag (€)',
      'Reëel per jaar',
    ],
    rows: purchasingPower.map((p) => [
      percent(p.rate),
      percent(p.inflation),
      rounded(p.nominal),
      rounded(p.real),
      percent(p.realAnnual),
    ]),
    findings: [
      [
        'Rendement en inflatie tegen elkaar wegstrepen heeft grenzen',
        `Bij 5% rendement en 2% inflatie is het reële jaarresultaat ${percent(purchasingPower[3].realAnnual)}, niet exact 3%. Over twintig jaar correspondeert ${euro(purchasingPower[3].nominal)} op de rekening met ${euro(purchasingPower[3].real)} aan koopkracht van vandaag.`,
      ],
      [
        'Een positief rendement kan koopkrachtverlies zijn',
        `Bij 2% rendement en 4% inflatie groeit het saldo naar ${euro(purchasingPower[2].nominal)}, maar de koopkracht daalt naar ${euro(purchasingPower[2].real)}. Het saldo alleen laat dus niet zien of een latere uitgave beter betaalbaar wordt.`,
      ],
      [
        'Gelijke percentages houden koopkracht in dit model gelijk',
        `Bij 2% rendement én 2% inflatie blijft de koopkracht ${euro(purchasingPower[1].real)}. De rekeningwaarde neemt wel toe. Kosten of belasting zouden deze gelijkheid doorbreken wanneer ze nog niet in het ingevoerde rendement zijn verwerkt.`,
      ],
    ],
    method:
      'Nominaal bedrag = startbedrag × (1 + rendement)^20. Deel dat door (1 + inflatie)^20 voor koopkracht. Het reële jaarpercentage is (1 + rendement)/(1 + inflatie) − 1. Dit voorkomt de benadering waarbij inflatie alleen wordt afgetrokken.',
    limitation:
      'Een gemiddeld inflatiecijfer is geen persoonlijke boodschappenmand. Wonen, reizen en zorg kunnen andere prijsveranderingen hebben. Ook zijn rendement en inflatie in werkelijkheid niet ieder jaar constant; deze tabel voorspelt geen toekomstige prijsreeks.',
    nextStep:
      'Bereken in de inflatietool de toekomstige prijs van je concrete doel. Houd bij je vermogensberekening nominale bedragen en bedragen in huidige koopkracht vervolgens duidelijk uit elkaar.',
  },
  'aflossen-of-beleggen-afwegen': {
    title: 'Wat doe je met de rente die je bespaart?',
    question:
      'Een aflosvergelijking hangt niet alleen af van rente en beleggingsrendement. Ook de bestemming van het bespaarde maandbedrag telt. Hier vergelijken we extra aflossen met beleggen, terwijl we de vermeden rentebetalingen apart houden tegen 0% rente.',
    assumptions: [
      '€ 10.000 beschikbaar, tien jaar, een fictief constant netto rentetarief van 4%.',
      'Het vergeleken schulddeel blijft anders tien jaar € 10.000; geen vergoeding voor extra aflossen.',
      'Bij aflossen wordt jaarlijks € 400 bespaarde rente apart gehouden tegen 0%; bij beleggen blijft die rentelast bestaan.',
      'Beleggingspercentages zijn na kosten en belasting gedacht; er komt geen extra storting bij.',
    ],
    columns: [
      'Beleggingsrendement',
      'Belegging na 10 jaar (€)',
      'Minder schuld + bespaarde cash (€)',
      'Verschil beleggen − aflossen (€)',
    ],
    rows: payoff.map((p) => [
      percent(p.rate),
      rounded(p.invested),
      rounded(p.repayment),
      rounded(p.difference),
    ]),
    findings: [
      [
        'Bespaarde rente wordt niet vanzelf herbelegd',
        `Bij aflossen bestaat de ${euro(payoff[0].repayment)} uit € 10.000 minder schuld en € 4.000 apart gehouden rentebesparing. Dat is geen vrij belegbaar eindbedrag: het schuldverschil zit in de woning of lening.`,
      ],
      [
        'De bestemming van de besparing verschuift het omslagpunt',
        `Met renteloos apart gehouden besparingen ligt het rekenkundige omslagpunt bij ${percent(payoff[0].breakEven)} per jaar. Zou iedere besparing weer tegen 4% groeien, dan is de vergelijkingswaarde ${euro(payoff[0].reinvestedSavings)} en ligt het omslagpunt op 4%. Die herbelegging is een extra aanname.`,
      ],
      [
        'Een gunstig scenario is nog geen gelijkwaardig risico',
        `Bij 6% eindigt beleggen ${euro(payoff[4].difference)} hoger dan deze aflosroute; bij −3% juist ${euro(-payoff[0].difference)} lager. Een gekozen rendement is onzeker, terwijl een rentebesparing afhangt van je werkelijke contract en fiscale positie.`,
      ],
    ],
    method:
      'Aflosroute: € 10.000 schuldverschil plus 10 × € 400 bewaarde cash. Beleggingsroute: € 10.000 × (1 + rendement)^10. Beide beginnen met hetzelfde beschikbare geld en dezelfde overige inkomsten en uitgaven. De tabel laat het vermogensverschil zien, niet de totale huishoudbalans.',
    limitation:
      'Dit model geldt niet rechtstreeks voor een annuïtaire of lineaire hypotheek. Renteaftrek, renteherziening, aflosvergoedingen, risicoklasse en box 3 kunnen de vergelijking veranderen. De calculator gebruikt een model met herbelegde rentebesparing; lees die aanname naast deze variant.',
    nextStep:
      'Vraag eerst je echte netto rentelast en aflosvoorwaarden op. Bepaal daarna of je bespaarde betalingen uitgeeft, bewaart of herbelegt voordat je scenario’s in de tool vergelijkt.',
  },
  'box-3-indicatie-2026': {
    title: 'Hetzelfde vermogen, een andere forfaitaire indicatie',
    question:
      'Waarom kan € 100.000 spaargeld een andere box 3-indicatie geven dan € 100.000 beleggingen? We veranderen alleen de vermogensverdeling. Het totale vermogen, de vrijstelling en het belastingjaar blijven gelijk.',
    assumptions: [
      '2026, één persoon zonder fiscale partner of schulden; € 100.000 op de peildatum.',
      `Banktegoeden ${percent(taxConfig.savingsRate * 100)} forfaitair, overige bezittingen ${percent(taxConfig.investmentRate * 100)}; tarief ${percent(taxConfig.taxRate * 100)} en vrijstelling ${euro(taxConfig.exemption)}.`,
      'Het forfaitaire rendementspercentage voor banktegoeden is nog niet definitief. Geen bijzondere vrijstellingen, vastgoed of buitenlandse situaties.',
    ],
    columns: [
      'Banktegoed (€)',
      'Beleggingen (€)',
      'Forfaitair rendement vóór vrijstelling (€)',
      'Belastingindicatie (€)',
      'Als % totaal vermogen',
    ],
    rows: taxMix.map((t) => [
      rounded(t.savings),
      rounded(t.investments),
      rounded(t.forfait),
      rounded(t.tax),
      percent((t.tax / 100000) * 100),
    ]),
    findings: [
      [
        'De categorie verandert de rekenbasis',
        `Volledig banktegoed geeft circa ${euro(taxMix[0].tax)}; volledig beleggingen circa ${euro(taxMix[4].tax)}. Het verschil van ${euro(taxMix[4].tax - taxMix[0].tax)} komt hier uitsluitend uit de gebruikte forfaits. Het is geen voorspelling van je werkelijke beleggingswinst.`,
      ],
      [
        'De vrijstelling wordt niet per categorie herhaald',
        `Bij € 50.000 banktegoed en € 50.000 beleggingen is de indicatie ${euro(taxMix[2].tax)}. Beide categorieën krijgen samen één vrijstelling. De volledige vrijstelling afzonderlijk op beide bedragen toepassen zou de heffing te laag voorstellen.`,
      ],
      [
        'Controleer ook de ondergrens',
        `Met uitsluitend dit vermogen is de forfaitaire indicatie op of onder ${euro(taxConfig.exemption)} nul. Met een fiscale partner is € 100.000 samen in dit eenvoudige voorbeeld eveneens onder de gezamenlijke grens. Dat zegt niets over eventueel ander vermogen dat nog moet meetellen.`,
      ],
    ],
    method:
      'We berekenen banktegoed × bankforfait plus beleggingen × beleggingsforfait. Daarna vermenigvuldigen we met (vermogen − vrijstelling)/vermogen, begrensd op minimaal nul, en met het belastingtarief. Dit is een ongeronde indicatie; aangifteafronding kan enkele euro’s verschillen.',
    limitation:
      'Deze tabel gebruikt de voorlopige forfaitaire route, geen berekening van werkelijk rendement. Voor werkelijk rendement gelden andere regels. Ook is dit geen voorstel om vermogen rond de peildatum te verschuiven. Controleer de officiële berekening en de uiteindelijke gegevens voor 2026.',
    nextStep:
      'Verzamel je volledige peildatumsaldi en open de box 3-tool voor een eerste indicatie. Gebruik voor je aangifte en de vergelijking met werkelijk rendement de Belastingdienst.',
  },
  'ineens-of-gespreid-beleggen': {
    title: 'Zelfde eindkoers, ander effect van instappen',
    question:
      'Kan gespreid instappen anders uitpakken als de markt uiteindelijk precies even hoog eindigt? We bouwen drie fictieve koerspaden met hetzelfde eindpunt. Alleen de route en de rente op nog niet ingelegd geld veranderen.',
    assumptions: [
      '€ 12.000 is vanaf het begin beschikbaar; vergelijking over vijf jaar.',
      'Ineens volledig beleggen of twaalf keer € 1.000 aan het begin van de eerste twaalf maanden.',
      'Alle paden eindigen op dezelfde marktwaarde: 6% samengesteld per jaar over vijf jaar.',
      'Een schokpad bevat één daling van 25%; overige maanden zijn zo berekend dat hetzelfde eindpunt ontstaat. Cashrente blijft apart staan.',
    ],
    columns: [
      'Fictief koerspad',
      'Cashrente',
      'Ineens (€)',
      'Gespreid incl. cash (€)',
      'Verschil gespreid − ineens (€)',
    ],
    rows: entry.map((e) => [
      e.label,
      percent(e.cashRate),
      rounded(e.lump),
      rounded(e.staged),
      rounded(e.staged - e.lump),
    ]),
    findings: [
      [
        'De vroege daling raakt de routes anders',
        `Met een daling in maand 2 en 0% cashrente eindigt gespreid instappen ${euro(entry[2].staged - entry[2].lump)} hoger dan ineens. Een groot deel van het geld wordt in dit geconstrueerde pad pas na de daling belegd.`,
      ],
      [
        'Een late daling beschermt de eerdere spreiding niet',
        `Bij de daling in maand 59 is al het geplande geld ingelegd. Gespreid instappen eindigt bij 0% cashrente ${euro(entry[4].lump - entry[4].staged)} lager dan ineens. De hogere groei in de andere maanden is nodig om alle paden op hetzelfde punt te laten eindigen.`,
      ],
      [
        'Cashrente is een aparte invoer',
        `In het gelijkmatige pad verbetert 2% cashrente de gespreide uitkomst met ${euro(entry[1].staged - entry[0].staged)} ten opzichte van 0%. Die rente verandert het koerspad niet en mag niet worden vergeten wanneer aanbieders een rentevergoeding bieden.`,
      ],
    ],
    method:
      'De markt begint op 100. Het eindpunt is 100 × 1,06^5. Voor het schokpad is de factor van ieder ander maandrendement (1,06^5/0,75)^(1/59). We kopen aan het maandbegin, verwerken daarna het maandrendement en de rente op resterende cash. Eindbedragen bevatten ook die cash.',
    limitation:
      'Dit is geen historische backtest of kansberekening. De schokken en het gelijke eindpunt zijn bewust gekozen om timing te isoleren. Uit drie synthetische paden volgt geen percentage waarmee één aanpak vaker wint. Kosten, belasting en wisselende cashrente ontbreken.',
    nextStep:
      'Gebruik de instaptool met hetzelfde totaalbedrag en dezelfde horizon. Vergelijk alle koerspaden en controleer of je werkelijk al over het hele bedrag beschikt.',
  },
  'dividend-herbeleggen-of-uitkeren': {
    title: 'Herbeleggen wint niet in ieder scenario',
    question:
      'Wat verandert er als dividend teruggaat naar beleggingen of als cash blijft staan? We tellen bij beide routes al het vermogen mee. Daardoor krijgt herbeleggen niet ten onrechte een voordeel doordat ontvangen uitkeringen buiten de vergelijking vallen.',
    assumptions: [
      '€ 10.000 startkapitaal; tien jaar; geen extra stortingen.',
      'Ieder jaar 3% dividend over de portefeuillewaarde aan het jaarbegin; daarna een aparte koersverandering.',
      'Dividend wordt aan het jaareinde herbelegd of renteloos apart gehouden; cash wordt niet uitgegeven.',
      'Koersgroei is exclusief dividend. Geen belastingen, kosten of wijziging van het dividendpercentage.',
    ],
    columns: [
      'Jaarlijkse koersgroei',
      'Herbelegd vermogen (€)',
      'Portefeuille zonder herbeleggen (€)',
      'Bewaarde cash (€)',
      'Totaal zonder herbeleggen (€)',
      'Verschil (€)',
    ],
    rows: dividends.map((d) => [
      percent(d.growth),
      rounded(d.reinvested),
      rounded(d.capital),
      rounded(d.cash),
      rounded(d.capital + d.cash),
      rounded(d.reinvested - d.capital - d.cash),
    ]),
    findings: [
      [
        'Bij vlakke koersen komt het verschil uit herbelegging',
        `Met 0% koersgroei eindigt herbeleggen op ${euro(dividends[2].reinvested)}. Apart houden geeft € 10.000 portefeuille plus ${euro(dividends[2].cash)} cash. Het verschil is ${euro(dividends[2].reinvested - dividends[2].capital - dividends[2].cash)}, niet het volledige ontvangen dividend.`,
      ],
      [
        'Extra blootstelling kan ook tegenwerken',
        `Bij −6% jaarlijkse koersgroei is het herbelegde eindbedrag ${euro(dividends[0].reinvested)}. De route met bewaarde cash heeft samen ${euro(dividends[0].capital + dividends[0].cash)}. Eerder uitgekeerde cash ontsnapt daar aan latere koersdalingen; herbelegd geld niet.`,
      ],
      [
        'Een dividendpercentage is geen vaste euro-uitkering',
        'Omdat dividend hier telkens over de beginwaarde wordt berekend, daalt of stijgt de euro-uitkering mee met die waarde. Een bedrijf dat een vast bedrag per aandeel betaalt vraagt om andere aannames. Tel dividend bovendien niet nogmaals op bij een rendement waarin het al zit.',
      ],
    ],
    method:
      'Herbeleggen: elk jaar beginvermogen × (1 + koersgroei + dividendpercentage). Apart houden: de portefeuille groeit alleen met de koers; het dividend op haar beginwaarde gaat naar een afzonderlijke cashpot. Het totaal van portefeuille en cash wordt vergeleken met herbeleggen.',
    limitation:
      'Een constant dividendpercentage en constant koerspad zijn modelkeuzes, geen voorspelling van bedrijven of ETF’s. Werkelijke uitkeringen kunnen veranderen of stoppen. De cashroute bevat geen rente, consumptie of dividendbelasting.',
    nextStep:
      'Vergelijk in de dividendtool zowel negatieve als positieve koersgroei. Lees steeds het totaal inclusief apart gehouden cash en controleer of het gebruikte rendement dividend al bevat.',
  },
};

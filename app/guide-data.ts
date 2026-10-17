export type Guide = {
  slug: string;
  tool: string;
  category: string;
  topics: string[];
  title: string;
  summary: string;
  problem: string;
  sections: [string, string][];
  example: [string, string];
  faq: [string, string][];
  source: keyof typeof guideSources;
};
export const guideSources = {
  investing: [
    'AFM · uitgangspunten bij beleggen',
    'https://www.afm.nl/nl-nl/consumenten/themas/zelf-beleggen/is-beleggen-iets-voor-jou',
  ],
  fees: [
    'Investor.gov · kosten begrijpen',
    'https://www.investor.gov/introduction-investing/getting-started/understanding-fees',
  ],
  tracking: [
    'iShares · fondskosten en afwijking van de index vergelijken',
    'https://www.ishares.com/uk/individual/en/education/getting-started-with-etfs/investor-education/compare-global-investment-options',
  ],
  dca: [
    'Investor.gov · gespreid inleggen',
    'https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging',
  ],
  tax: [
    'Belastingdienst · voorlopige aanslag box 3 in 2026',
    'https://www.belastingdienst.nl/wps/wcm/connect/nl/box-3/content/berekening-box-3-inkomen-2026',
  ],
  inflation: [
    'ECB · rente, inflatie en koopkracht',
    'https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me/html/nominal_and_real_interest_rates.nl.html',
  ],
  compound: [
    'Investor.gov · samengestelde groei berekenen',
    'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator',
  ],
  returns: [
    'FINRA · totaalrendement en jaarlijks rendement',
    'https://syndication.finra.org/content/how-are-your-investments-doing-returns-explained',
  ],
  dividend: [
    'Investor.gov · aandelen en dividend',
    'https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks',
  ],
  mortgage: [
    'AFM · voorwaarden en vergoeding bij vervroegd aflossen',
    'https://www.afm.nl/nl-nl/consumenten/themas/hypotheken/vervroegd-aflossen',
  ],
  buffer: [
    'Nibud · wat een financiële buffer wel en niet opvangt',
    'https://bufferberekenaar.nibud.nl/over-deze-tool',
  ],
} as const;
export const guides: Guide[] = [
  {
    slug: 'maandelijks-beleggen-berekenen',
    tool: 'rendement',
    category: 'Vermogen',
    topics: ['beginnen', 'vermogen'],
    title: 'Maandelijks beleggen: wat kan je inleg opbouwen?',
    summary:
      'Je mogelijke eindbedrag hangt af van startkapitaal, maandinleg, tijd en rendement. Vergelijk meerdere aannames en bekijk je eigen inleg apart van de berekende groei.',
    problem:
      'Een maandbedrag voelt overzichtelijk. Wat het over twintig jaar kan betekenen, is lastiger voor te stellen. Een berekening maakt de aannames zichtbaar.',
    sections: [
      [
        'Begin met een vol te houden bedrag',
        'Neem een maandbedrag dat past naast je vaste lasten, buffer en geplande uitgaven. De calculator weet niet of je dit bedrag kunt missen. Noteer daarom eerst je ruimte in het budget en kies daarna je rekenbedrag.',
      ],
      [
        'Lees inleg en groei afzonderlijk',
        'Je eindbedrag bestaat uit eigen geld en de ontwikkeling ervan. Bij een maandinleg van € 100 is je extra inleg na tien jaar € 12.000. Dat deel ontstaat door jouw bijdragen, ook als het rendement nul is.',
      ],
      [
        'Verander één aanname tegelijk',
        'Houd je inleg gelijk en vergelijk een kortere en langere horizon. Probeer vervolgens een lager rendement. De vloeiende groeilijn in het model maakt verschillen inzichtelijk, maar echte koersen bewegen onregelmatig en kunnen dalen.',
      ],
      [
        'Zo telt een maandelijkse storting mee',
        'De tool rekent een jaarrendement om naar een bijpassend maandpercentage. Bij 6% per jaar is dat ongeveer 0,487% per maand: twaalf maandstappen samen leveren dan 6% op. Iedere storting telt vanaf het einde van die maand mee. De laatste storting krijgt daardoor geen volledig jaar groei, terwijl het startkapitaal de hele looptijd meedoet.',
      ],
    ],
    example: [
      'Nulrendement als controle',
      '€ 1.000 starten plus 120 maanden € 100 is € 13.000 bij 0% rendement. Kosten, belasting en inflatie zijn in dit voorbeeld niet verwerkt.',
    ],
    faq: [
      [
        'Is maandelijks beleggen gegarandeerd winstgevend?',
        'Nee. Regelmatig inleggen neemt het beleggingsrisico niet weg. Je kunt ook na jaren minder overhouden dan je hebt ingelegd.',
      ],
      [
        'Kan ik wisselende maandbedragen invullen?',
        'Dit model rekent met een vaste maandinleg. Gebruik afzonderlijke scenario’s wanneer je wilt onderzoeken wat een lager of hoger bedrag doet.',
      ],
      [
        'Wat wordt € 100 per maand in tien jaar?',
        'Met € 1.000 startkapitaal, € 100 inleg aan ieder maandeinde en steeds 6% jaarrendement komt het model uit op ongeveer € 18.038. Daarvan heb je zelf € 13.000 ingelegd. Zonder dat startkapitaal is de uitkomst lager. Kosten, belasting en inflatie zijn hier niet verwerkt; het rendement is alleen een rekenaanname.',
      ],
    ],
    source: 'compound',
  },
  {
    slug: 'rendement-scenario-kiezen',
    tool: 'rendement',
    category: 'Strategie',
    topics: ['beginnen', 'strategie'],
    title: 'Welk rendement vul je in een calculator in?',
    summary:
      'Een rendementspercentage is een rekenaanname, geen verwachting op maat. Gebruik verschillende scenario’s en bepaal welke onderdelen de tool buiten beschouwing laat.',
    problem:
      'Eén optimistisch percentage geeft snel een aantrekkelijk eindbedrag. Het vertelt weinig over wat er gebeurt als de toekomst anders loopt.',
    sections: [
      [
        'Werk met een bandbreedte',
        'Bereken bijvoorbeeld een scenario met weinig groei, een scenario zonder groei en een hoger scenario. Deze percentages zijn zelfgekozen rekenwaarden. Koppel er geen kans of zekerheid aan als je die niet kunt onderbouwen.',
      ],
      [
        'Controleer bruto en netto',
        'Een bruto rendement is vóór kosten en belastingen. Als je die zelf al in je aanname verwerkt, trek ze niet nogmaals af. De rendementtool verwerkt niet automatisch jouw persoonlijke fiscale situatie.',
      ],
      [
        'Kijk ook naar verlies onderweg',
        'Een vast jaarrendement laat de route naar het eindbedrag weg. Twee portefeuilles kunnen dezelfde eindwaarde hebben en onderweg heel anders bewegen. Een berekende eindwaarde zegt daarom niet hoeveel onrust of verlies je kunt dragen.',
      ],
      [
        'Reken een tegenvaller in euro’s uit',
        'Bij een koersdaling van 30% wordt € 10.000 tijdelijk € 7.000, zolang je niets toevoegt of opneemt. Voor herstel naar € 10.000 is daarna ongeveer 42,9% stijging nodig. Dit is een afzonderlijke rekensom, geen voorspeld koerspad. Geld dat je tijdens de daling moet opnemen, doet niet meer mee aan een mogelijk herstel.',
      ],
    ],
    example: [
      'Dezelfde invoer, een andere uitkomst',
      '€ 10.000 zonder extra inleg wordt na twintig jaar € 10.000 bij 0%, ongeveer € 18.061 bij 3% en € 32.071 bij 6% per jaar. Kosten, belasting en inflatie ontbreken. Het verschil toont hoe gevoelig het resultaat is voor je invoer; geen van de percentages is een verwachting of garantie.',
    ],
    faq: [
      [
        'Is het standaardpercentage een advies?',
        'Nee. Het is een invulvoorbeeld om de calculator te demonstreren.',
      ],
      [
        'Kan rendement negatief zijn?',
        'Ja. Verliezen horen bij het mogelijke verloop van beleggingen. Controleer altijd of je plan ook bij tegenvallers uitvoerbaar blijft.',
      ],
    ],
    source: 'investing',
  },
  {
    slug: 'eerder-beginnen-of-meer-inleggen',
    tool: 'rendement',
    category: 'Vermogen',
    topics: ['vermogen', 'strategie'],
    title: 'Eerder beginnen of meer inleggen: wat verandert er?',
    summary:
      'Meer inleg verhoogt je eigen bijdrage. Een langere looptijd geeft het bestaande geld langer de tijd om te groeien of te dalen. Vergelijk beide effecten los van elkaar.',
    problem:
      'Wat maakt meer verschil: langer beleggen of elke maand meer inleggen? Verander één van beide om de uitkomsten te kunnen vergelijken.',
    sections: [
      [
        'Maak eerst een basisscenario',
        'Leg een startbedrag, maandbedrag, looptijd en rendement vast. Bewaar die invoer. Zonder een vaste basis is het moeilijk te zien waardoor een verschil ontstaat.',
      ],
      [
        'Vergelijk tijd met tijd',
        'Verleng alleen de looptijd. Je legt dan ook meer maanden geld in. Een hoger eindbedrag komt dus niet uitsluitend door samengestelde groei; een deel komt uit extra eigen bijdragen.',
      ],
      [
        'Vergelijk inleg met inleg',
        'Verhoog daarna alleen het maandbedrag en herstel de oorspronkelijke horizon. Controleer hoeveel extra eigen geld dit vraagt. Een groot toekomstbedrag is pas bruikbaar als de maandelijkse bijdrage haalbaar is.',
      ],
    ],
    example: [
      'Drie scenario’s bij hetzelfde rekenrendement',
      'Zonder startkapitaal, met vaste 6% groei en stortingen aan het maandeinde, levert € 100 per maand na twintig jaar circa € 45.344 op (€ 24.000 eigen inleg). Dertig jaar geeft circa € 97.451 (€ 36.000 inleg). € 150 per maand gedurende twintig jaar geeft circa € 68.016, ook bij € 36.000 inleg. Tijd en inleg zijn zo apart te vergelijken. Kosten, belasting en inflatie ontbreken.',
    ],
    faq: [
      [
        'Kan ik gemiste jaren precies inhalen?',
        'Alleen binnen de gekozen rekenaannames kun je een benodigd bedrag afleiden. Toekomstige rendementen zijn niet bekend.',
      ],
      [
        'Waarom telt een langere horizon niet alleen als meer rendement?',
        'Omdat je bij vaste maandinleg ook meer stortingen doet. Kijk daarom steeds naar het totaal van de inleg.',
      ],
    ],
    source: 'compound',
  },
  {
    slug: 'etf-kosten-lange-termijn',
    tool: 'etf-kosten',
    category: 'ETF',
    topics: ['etfs', 'portfolio'],
    title: 'ETF-kosten op lange termijn: wat doet een klein verschil?',
    summary:
      'Jaarlijkse kosten verlagen het bedrag dat verder kan groeien. Vergelijk twee kostenpercentages bij hetzelfde brutorendement, dezelfde inleg en dezelfde looptijd.',
    problem:
      'Een verschil van enkele tienden van een procent lijkt klein. In een langlopend rekenmodel werkt dat verschil ieder jaar opnieuw door.',
    sections: [
      [
        'Vergelijk onder gelijke voorwaarden',
        'Houd je startbedrag, maandinleg en looptijd gelijk. Verander alleen de jaarlijkse kosten. Anders meng je het kosteneffect met verschillen in je inleg of rendement.',
      ],
      [
        'Begrijp hoe de tool rekent',
        'Het model combineert de bruto groeifactor met de overblijvende factor na kosten. Bij 6% bruto groei en 1% kosten is dat 1,06 × 0,99 − 1 = 4,94% netto in het model. De werkelijke afrekening van een fonds kan anders verlopen.',
      ],
      [
        'Lees het verschil als scenario',
        'Het eindverschil omvat zowel de kosten als gemiste groei op de betaalde bedragen. Het is geen factuur en geen volledige vergelijking van twee ETF’s. Hun inhoud, risico en gevolgde index kunnen ook verschillen.',
      ],
    ],
    example: [
      'Wat doet het kostenverschil met € 10.000?',
      'Met € 10.000 startkapitaal, geen extra inleg, twintig jaar en constant 6% brutorendement komt 0,15% jaarlijkse kosten uit op ongeveer € 31.123. Bij 1% is dat € 26.231: circa € 4.891 minder. Dit modelverschil omvat ook misgelopen groei; het is niet alleen de opgetelde kostenfactuur. Belastingen, inflatie en losse transactiekosten ontbreken.',
    ],
    faq: [
      [
        'Is de goedkoopste ETF automatisch de beste?',
        'Nee. Kosten zijn één eigenschap; kijk ook naar wat het fonds daadwerkelijk aanhoudt en volgt.',
      ],
      [
        'Vergelijkt de tool brokertarieven?',
        'Nee. De berekening is een model voor jaarlijkse procentuele kosten, geen tariefvergelijker voor aanbieders.',
      ],
    ],
    source: 'fees',
  },
  {
    slug: 'ter-en-overige-beleggingskosten',
    tool: 'etf-kosten',
    category: 'ETF',
    topics: ['etfs'],
    title: 'Welke kosten betaal je bij een ETF?',
    summary:
      'Een jaarlijks fondspercentage is niet automatisch je volledige kostenplaatje. Maak onderscheid tussen doorlopende fondskosten, handelen en eventuele kosten van je rekening.',
    problem:
      'Het jaarlijkse kostenpercentage van een fonds omvat niet automatisch alle kosten die je betaalt. Wat reken je daarnaast mee?',
    sections: [
      [
        'Lees eerst het kostendocument',
        'Controleer in de actuele productinformatie wat het genoemde percentage dekt. Noteer de naam, datum en eenheid. Een bedrag per order kun je niet rechtstreeks vergelijken met een percentage per jaar.',
      ],
      [
        'Maak een lijst van losse posten',
        'Zet kosten voor kopen, verkopen, valuta en je rekening apart. Neem alleen posten op die bij jouw gebruik horen. De spread is het verschil tussen bied- en laatprijs; die is niet hetzelfde als een vast jaarlijks tarief.',
      ],
      [
        'Gebruik de calculator voor het afgebakende deel',
        'Voer twee jaarlijkse kostenpercentages in om alleen dat effect te onderzoeken. Tel niet blind vaste transactiekosten bij het fondspercentage op: hun relatieve gewicht hangt af van je ordergrootte en vermogen.',
      ],
      [
        'Wat betekent TER?',
        'TER staat voor Total Expense Ratio: een jaarlijks kostenpercentage van het fonds. Het woord “total” betekent niet dat je persoonlijke brokerkosten zijn inbegrepen. Een fonds met 0,20% TER en € 3 orderkosten vergelijk je daarom niet op alleen die 0,20%. Zet de fondskosten en de kosten van je aankopen afzonderlijk naast elkaar.',
      ],
    ],
    example: [
      'Wat kost € 2 per aankoop?',
      'Een denkbeeldige ordervergoeding van € 2 is 2% van een aankoop van € 100 en 0,2% van € 1.000. Dit is een rekenvoorbeeld, geen tarief van een broker.',
    ],
    faq: [
      [
        'Kan ik alle kosten in de tool invoeren?',
        'Nee. De tool modelleert twee jaarlijkse percentages. Losse order- en valutakosten moet je apart beoordelen.',
      ],
      [
        'Waar vind ik de werkelijke kosten?',
        'In de actuele fondsdocumenten en het kostenoverzicht van je aanbieder. Controleer ook eventuele voorwaarden of uitzonderingen.',
      ],
    ],
    source: 'fees',
  },
  {
    slug: 'kosten-en-rendement-eerlijk-vergelijken',
    tool: 'etf-kosten',
    category: 'ETF',
    topics: ['etfs', 'strategie'],
    title: 'Kosten en rendement vergelijken zonder dubbel te rekenen',
    summary:
      'Controleer of een rendement vóór of na kosten is weergegeven. De ETF-kostentool verwacht een bruto rekenaanname en verwerkt daar de ingevoerde jaarlijkse kosten in.',
    problem:
      'Een fondsresultaat gebruiken en dezelfde kosten daarna nog eens aftrekken kan het berekende resultaat onbedoeld te laag maken.',
    sections: [
      [
        'Schrijf de definitie erbij',
        'Noteer bij elk rendementsgetal: welke periode, welke valuta, inclusief of exclusief uitkeringen, en vóór of na welke kosten. Ontbreekt die informatie, dan is een vergelijking onvoldoende afgebakend.',
      ],
      [
        'Houd de bron en het model uit elkaar',
        'De calculator simuleert een constant brutorendement. Hij haalt geen historische ETF-resultaten op en weet niet of een gekopieerd percentage al netto is. Controleer dat zelf voordat je de invoer kiest.',
      ],
      [
        'Tracking difference is een resultaat, geen extra tarief',
        'Tracking difference is het verschil tussen het rendement van een fonds en zijn index. Stel dat de index over één jaar 8% oplevert en het fonds na fondskosten 7,8%, beide in dezelfde valuta en met herbelegde uitkeringen. Dan blijft het fonds 0,2 procentpunt achter. Tel daar niet nog eens de TER bij op: het effect van die fondskosten zit al in het netto fondsresultaat. Andere oorzaken kunnen ook meespelen; het verschil hoeft niet precies gelijk te zijn aan de TER. Je eigen brokerkosten kunnen nog buiten dit resultaat vallen.',
      ],
      [
        'Voorkom schijnprecisie',
        'Een uitkomst op de euro nauwkeurig volgt uit de invoer. Dat maakt de toekomst niet op de euro voorspelbaar. Rond voor je planning af en vergelijk meerdere scenario’s.',
      ],
    ],
    example: [
      'Bruto invoer herkennen',
      'Het model met 5% bruto groei en 0,20% jaarlijkse kosten gebruikt 1,05 × 0,998 − 1 = 4,79%. Voer niet alvast 4,79% in en trek daarna opnieuw 0,20% af.',
    ],
    faq: [
      [
        'Kan ik twee verschillende indices zo vergelijken?',
        'Je kunt het kosteneffect isoleren, maar hun toekomstige bruto resultaten hoeven niet gelijk te zijn.',
      ],
      [
        'Is een historisch netto rendement voldoende voor een prognose?',
        'Nee. Het beschrijft een afgelopen periode en vormt geen zekerheid voor de volgende.',
      ],
    ],
    source: 'tracking',
  },
  {
    slug: 'honderdduizend-euro-opbouwen',
    tool: 'doelvermogen',
    category: 'Vermogen',
    topics: ['vermogen', 'beginnen'],
    title: '€ 100.000 opbouwen: hoeveel moet je per maand inleggen?',
    summary:
      'Je benodigde maandinleg hangt af van het bedrag dat je al hebt, hoeveel tijd je hebt en het rendement waarmee je rekent. Bereken de inleg voor € 100.000 of een ander doelbedrag.',
    problem:
      'Je wilt € 100.000 opbouwen. Hoeveel moet je dan iedere maand inleggen, en wat verandert er als je meer of minder tijd hebt?',
    sections: [
      [
        'Geef je doel een einddatum',
        '€ 100.000 over tien jaar vraagt een andere inleg dan hetzelfde bedrag over dertig jaar. Vul een horizon in die hoort bij het moment waarop je het geld wilt gebruiken.',
      ],
      [
        'Neem alleen beschikbaar startkapitaal mee',
        'Je noodbuffer en geld voor geplande uitgaven zijn niet automatisch startkapitaal voor dit doel. Maak het onderscheid voordat je gaat rekenen.',
      ],
      [
        'Toets de uitkomst aan je budget',
        'De calculator stort steeds aan het einde van de maand en houdt het rendement constant. Is de berekende maandinleg onhaalbaar, onderzoek dan een ander doel of een langere horizon. Een hoger ingevoerd rendement lost geen budgetprobleem op.',
      ],
    ],
    example: [
      'Zonder rendement',
      'Van € 10.000 naar € 100.000 in twintig jaar vraagt bij 0% rendement € 375 per maand. Dit is € 90.000 verdeeld over 240 maanden, vóór eventuele kosten of belasting.',
    ],
    faq: [
      [
        'Is € 100.000 genoeg voor financiële vrijheid?',
        'Dat hangt onder meer af van uitgaven, andere inkomsten en de periode die je wilt overbruggen. Het is geen universele grens.',
      ],
      [
        'Waarom kan de maandinleg nul worden?',
        'Dan bereikt het startbedrag binnen de gekozen aannames al het doel. Dat betekent niet dat dit in werkelijkheid zeker gebeurt.',
      ],
      [
        'Hoe komt het voorbeeld met ongeveer € 150 per maand tot stand?',
        'Met € 10.000 startkapitaal, twintig jaar tijd en constant 6% rendement berekent de tool ongeveer € 149,81 inleg aan ieder maandeinde voor een eindbedrag van € 100.000. Bij 0% is dat € 375 per maand. Dat grote verschil laat zien hoe sterk de uitkomst van de rendementsaanname afhangt. Kosten, belasting en inflatie zijn in beide voorbeelden niet verwerkt.',
      ],
    ],
    source: 'compound',
  },
  {
    slug: 'sparen-voor-een-doel',
    tool: 'doelvermogen',
    category: 'Vermogen',
    topics: ['vermogen'],
    title: 'Sparen voor een doel: maak het maandbedrag concreet',
    summary:
      'Trek je beschikbare startbedrag van je doel af en verdeel het verschil over de resterende maanden. Met een renteaanname kun je daarnaast het effect van groei onderzoeken.',
    problem:
      'Een toekomstige aankoop staat wel op je wensenlijst, maar nog niet als concreet bedrag in je maandbudget.',
    sections: [
      [
        'Maak het doelbedrag compleet',
        'Tel relevante bijkomende uitgaven mee. Een doel voor een verbouwing kan bijvoorbeeld ook ruimte voor onvoorziene kosten nodig hebben. De calculator kent die onderdelen niet.',
      ],
      [
        'Begin eenvoudig met nul procent',
        'Een nulscenario laat zien hoeveel eigen inleg nodig is zonder groei. Dat is een controleerbaar vertrekpunt. Een positieve renteaanname kun je daarna als extra scenario toevoegen.',
      ],
      [
        'Herhaal de berekening bij veranderingen',
        'Een andere prijs, einddatum of reeds gespaard bedrag verandert je benodigde bijdrage. Werk de invoer bij in plaats van het oude maandbedrag ongemerkt te blijven gebruiken.',
      ],
    ],
    example: [
      'Een doel over vijf jaar',
      'Voor € 20.000 over zestig maanden, met € 5.000 beschikbaar en 0% groei, is € 250 per maand nodig. Het doelbedrag is nominaal.',
    ],
    faq: [
      [
        'Kiest de tool een spaarrekening?',
        'Nee. Hij rekent met jouw aanname en vergelijkt geen actuele spaartarieven.',
      ],
      [
        'Wordt het doel automatisch duurder door inflatie?',
        'Nee. Bereken een eventuele prijsstijging eerst apart en gebruik daarna het aangepaste doelbedrag.',
      ],
    ],
    source: 'compound',
  },
  {
    slug: 'doelvermogen-en-koopkracht',
    tool: 'doelvermogen',
    category: 'Vermogen',
    topics: ['vermogen', 'pensioen'],
    title: 'Doelvermogen en koopkracht: euro’s van later begrijpen',
    summary:
      'Een doel in toekomstige euro’s is iets anders dan hetzelfde bedrag aan koopkracht vandaag. Kies eerst welke betekenis je bedoelt en reken daarna je maandinleg uit.',
    problem:
      'Je bereikt in het model precies je doel, maar kunt er door prijsstijgingen mogelijk minder mee kopen dan je nu verwacht.',
    sections: [
      [
        'Benoem de waarde van je doel',
        'Een nominaal doel is een bedrag op de rekening. Een koopkrachtdoel gaat over wat je ermee wilt kunnen kopen. Zet bij je plan expliciet welke van de twee je bedoelt.',
      ],
      [
        'Pas het bedrag vóór de berekening aan',
        'Bij een constante inflatieaanname is het toekomstige prijsniveau de huidige prijs maal (1 + inflatie) tot de macht van het aantal jaren. Gebruik het aangepaste bedrag als invoer voor doelvermogen.',
      ],
      [
        'Houd aannames consistent',
        'Combineer niet zomaar een voor inflatie verhoogd doel met een rendement waaruit inflatie al is verwijderd. Dan verwerk je hetzelfde effect dubbel. De doelvermogentool rekent standaard nominaal.',
      ],
    ],
    example: [
      'Van koopkracht naar maandinleg',
      'Voor de koopkracht van € 100.000 vandaag heb je bij 2% inflatie over twintig jaar ongeveer € 148.595 nodig: € 100.000 × 1,02^20. Vul dat bedrag als doel in. Met € 10.000 startkapitaal en 6% nominaal jaarrendement vraagt het model dan circa € 257 per maand. Zonder inflatiecorrectie, met € 100.000 als doel, is dat circa € 150. De maandinleg blijft in beide berekeningen gelijk; je stort aan het einde van de maand. Kosten en belasting ontbreken. Inflatie en rendement zijn aannames, geen voorspellingen.',
    ],
    faq: [
      [
        'Rekent de tool automatisch met inflatie?',
        'Nee. De doelvermogentool verwerkt het bedrag dat jij invult.',
      ],
      [
        'Welke inflatie moet ik kiezen?',
        'Onderzoek meerdere aannames. Je persoonlijke uitgaven kunnen anders veranderen dan het gemiddelde prijsniveau.',
      ],
    ],
    source: 'inflation',
  },
  {
    slug: 'rente-op-rente-uitleg',
    tool: 'compound-interest',
    category: 'Vermogen',
    topics: ['beginnen', 'vermogen'],
    title: 'Rente op rente: hoe werkt samengestelde groei?',
    summary:
      'Bij samengestelde groei bereken je rente of rendement ook over eerdere opbrengsten die blijven staan. De calculator gebruikt een vast percentage; bij beleggen is dat rendement niet gegarandeerd.',
    problem:
      'Vijf procent per jaar levert niet ieder jaar hetzelfde bedrag op. Als de opbrengst blijft staan, wordt het percentage daarna over een ander bedrag berekend.',
    sections: [
      [
        'Het bedrag verandert mee',
        'Bij € 1.000 en 5% groei is het bedrag na één jaar € 1.050. Nog eens 5% wordt over die € 1.050 berekend. Na twee jaar is dat € 1.102,50, vóór kosten en belasting.',
      ],
      [
        'Een vaste rente is niet hetzelfde als beleggen',
        'Je kunt met hetzelfde rekenmodel een vaste rente of een aangenomen beleggingsrendement berekenen. Bij beleggingen zijn de opbrengsten onzeker en kunnen negatieve jaren het resultaat verlagen.',
      ],
      [
        'Inleg heeft een eigen timing',
        'Nieuw geld doet pas mee vanaf het moment waarop het is ingelegd. Daarom is een jaarinleg op dag één niet hetzelfde als twaalf stortingen gedurende het jaar.',
      ],
      [
        'De formule zonder extra inleg',
        'Eindbedrag = startbedrag × (1 + jaarrendement)^aantal jaren. Gebruik 0,05 voor 5%. Bij enkelvoudige rente wordt de opbrengst steeds alleen over het oorspronkelijke bedrag berekend: € 1.000 × (1 + 0,05 × 2) = € 1.100. Bij rente op rente is dezelfde som € 1.102,50. Met maandelijkse stortingen krijgt iedere storting een eigen resterende looptijd.',
      ],
    ],
    example: [
      'Controleer de tweede periode',
      'Bij twee jaar 5% is de groei over € 1.000 samen 10,25%, niet 10%. De extra € 2,50 is in dit voorbeeld groei op eerdere groei.',
    ],
    faq: [
      [
        'Werkt samengestelde groei ook bij verlies?',
        'Ja. Een negatieve verandering verlaagt de basis voor de volgende periode.',
      ],
      [
        'Moet ik opbrengsten laten staan?',
        'Voor groei over eerdere opbrengsten moeten die opbrengsten onderdeel blijven van het vermogen.',
      ],
    ],
    source: 'compound',
  },
  {
    slug: 'gemiddeld-en-samengesteld-rendement',
    tool: 'compound-interest',
    category: 'Strategie',
    topics: ['strategie', 'portfolio'],
    title: 'Gemiddeld rendement is niet hetzelfde als samengestelde groei',
    summary:
      'Het gewone gemiddelde van jaarpercentages vertelt niet precies hoe je vermogen verandert. Daarvoor vermenigvuldig je de groeifactoren van de afzonderlijke perioden.',
    problem:
      'Een plusjaar en een even groot minjaar lijken elkaar op te heffen. Toch kan je bedrag na beide jaren lager zijn.',
    sections: [
      [
        'Reken met factoren',
        'Een jaar +20% geeft factor 1,20. Een jaar −20% geeft factor 0,80. Samen is dat 0,96: je houdt 96% van het oorspronkelijke bedrag over, als er geen tussentijdse inleg is.',
      ],
      [
        'Kies het passende jaarpercentage',
        'Een constant groeipercentage dat dezelfde begin- en eindwaarde oplevert heet een samengesteld jaarlijks rendement, ook wel CAGR. Zonder tussentijdse stortingen of opnames is de formule: (eindbedrag / beginbedrag)^(1 / aantal jaren) − 1. Van € 1.000 naar € 960 in twee jaar is dat ongeveer −2,02% per jaar. Het gewone gemiddelde van +20% en −20% is 0%; dat beschrijft dus niet dezelfde vermogensgroei.',
      ],
      [
        'Let op tussentijdse stortingen',
        'Als je geld toevoegt of opneemt, vertelt alleen de verhouding tussen begin- en eindwaarde niet meer je beleggingsrendement. Je eigen stortingen moeten apart worden gehouden.',
      ],
    ],
    example: [
      'Plus twintig, min twintig',
      '€ 1.000 wordt eerst € 1.200 en daarna € 960. Het gemiddelde van de twee percentages is 0%, maar het totale resultaat is −4%.',
    ],
    faq: [
      [
        'Voorspelt een samengesteld rendement de toekomst?',
        'Nee. Het kan een afgelopen periode samenvatten of als rekenaanname dienen.',
      ],
      [
        'Laat de calculator echte koersschommelingen zien?',
        'De samengestelde-rentetool werkt met een constant gekozen percentage. Het is geen historische portefeuille-analyse.',
      ],
    ],
    source: 'returns',
  },
  {
    slug: 'inflatie-koopkracht-berekenen',
    tool: 'inflatie',
    category: 'Vermogen',
    topics: ['vermogen', 'pensioen', 'markt-economie'],
    title: 'Inflatie berekenen: wat blijft er van je koopkracht over?',
    summary:
      'Als prijzen stijgen, kun je met hetzelfde bedrag minder kopen. De inflatietool berekent wat de koopkracht van je geld na een gekozen aantal jaren is, uitgedrukt in euro’s van nu.',
    problem:
      'Het bedrag op de rekening kan gelijk blijven terwijl je er minder goederen en diensten mee kunt kopen.',
    sections: [
      [
        'Onderscheid bedrag en koopkracht',
        'Een saldo van € 10.000 blijft nominaal € 10.000 als er geen rente, kosten of opnamen zijn. Bij stijgende prijzen vertegenwoordigt dat saldo later minder koopkracht.',
      ],
      [
        'Gebruik samengestelde inflatie',
        'Voor meerdere jaren wordt de prijsstijging niet simpelweg opgeteld. Bij een vaste inflatie i en n jaren is de prijsfactor (1 + i)^n. Om toekomstige euro’s in koopkracht van nu uit te drukken, deel je het bedrag door die factor. Voor de toekomstige prijs van iets dat je vandaag kunt kopen, vermenigvuldig je juist. De twee uitkomsten beantwoorden verschillende vragen.',
      ],
      [
        'Vergelijk verschillende looptijden',
        'Zet dezelfde aanname naast vijf, tien en twintig jaar. De uitkomsten laten zien hoe gevoelig een langlopend doel voor prijsveranderingen is. Je eigen uitgavenpatroon kan afwijken van het gemiddelde.',
      ],
    ],
    example: [
      'Tien jaar bij twee procent',
      '€ 10.000 zonder rente heeft bij precies 2% inflatie na tien jaar ongeveer € 8.203 koopkracht in euro’s van nu. Het nominale bedrag blijft € 10.000.',
    ],
    faq: [
      [
        'Voegt de tool spaarrente toe?',
        'Nee. Deze tool berekent alleen het effect van inflatie. Het bedrag op de rekening blijft gelijk.',
      ],
      [
        'Is inflatie elk jaar gelijk?',
        'Nee. De constante invoer is een vereenvoudiging om het effect te onderzoeken.',
      ],
    ],
    source: 'inflation',
  },
  {
    slug: 'spaargeld-en-inflatie',
    tool: 'inflatie',
    category: 'Vermogen',
    topics: ['vermogen'],
    title: 'Spaargeld en inflatie: waarom je buffer een ander doel heeft',
    summary:
      'Inflatie kan de koopkracht van spaargeld verminderen. Een buffer heeft daarnaast een praktische functie: geld beschikbaar houden voor onverwachte uitgaven.',
    problem:
      'Een koopkrachtberekening laat verlies zien. Dat betekent niet dat ieder beschikbaar bedrag daarom naar beleggingen moet.',
    sections: [
      [
        'Geef geld een functie',
        'Geld voor een kapotte wasmachine heeft een andere horizon dan geld voor later. Noteer per pot wanneer je het nodig kunt hebben en hoeveel onzekerheid daarbij past.',
      ],
      [
        'Lees de calculator binnen zijn grenzen',
        'Het model houdt het geldbedrag constant en voegt geen rente toe. De uitkomst is daardoor geen volledige vergelijking tussen sparen en beleggen.',
      ],
      [
        'Werk je bufferbedrag bij',
        'Als de kosten van vervanging of levensonderhoud stijgen, kan hetzelfde bufferbedrag minder afdekken. Bekijk periodiek of je doelbedrag nog past bij je huishouden en verplichtingen.',
      ],
      [
        'Houd inkomensverlies apart',
        'Een reserve voor reparaties is niet hetzelfde als geld om een periode zonder inkomen te overbruggen. De Nibud BufferBerekenaar richt zich op noodzakelijke vervanging en onderhoud; een inkomensgat valt daar niet onder. Bereken dat apart. Een tekort van € 600 per maand gedurende drie maanden vraagt bijvoorbeeld € 1.800, naast het geld voor reparaties en andere doelen.',
      ],
    ],
    example: [
      'Beschikbaarheid heeft een functie',
      'Een reservering van € 2.000 voor een vervanging kan later te laag zijn als de prijs stijgt. De vraag is eerst hoeveel je wilt reserveren en wanneer je het nodig hebt.',
    ],
    faq: [
      [
        'Moet mijn noodbuffer rendement opleveren?',
        'De kernfunctie is beschikbaarheid voor onverwachte uitgaven. Rendement is een aparte afweging.',
      ],
      [
        'Laat de inflatietool zien wat beleggen oplevert?',
        'Nee. Daarvoor gebruik je een andere berekening met eigen rendementsaannames en risico’s.',
      ],
    ],
    source: 'buffer',
  },
  {
    slug: 'nominaal-en-reeel-rendement',
    tool: 'inflatie',
    category: 'Vermogen',
    topics: ['vermogen', 'strategie'],
    title: 'Nominaal en reëel rendement: wat is het verschil?',
    summary:
      'Nominaal rendement beschrijft de groei van het geldbedrag. Reëel rendement corrigeert die groei voor inflatie. Exact reken je met de verhouding tussen beide groeifactoren.',
    problem:
      'Je saldo groeit, maar het is niet direct duidelijk of je er ook meer van kunt kopen.',
    sections: [
      [
        'Zet beide percentages op dezelfde periode',
        'Gebruik bijvoorbeeld een jaarrendement en de prijsverandering over hetzelfde jaar. Een maandpercentage naast een jaarpercentage geeft geen bruikbare vergelijking.',
      ],
      [
        'Gebruik de exacte verhouding',
        'Bij nominaal rendement r en inflatie i is de reële verandering (1 + r) / (1 + i) − 1. Rendement minus inflatie is alleen een benadering.',
      ],
      [
        'Houd kosten en belasting apart',
        'Benoem of je nominale rendement al na kosten is. De inflatietool laat alleen het koopkrachteffect bij een onveranderlijk bedrag zien; hij rekent niet automatisch een persoonlijke netto portefeuille door.',
      ],
    ],
    example: [
      'Vijf procent groei, twee procent inflatie',
      '1,05 / 1,02 − 1 is ongeveer 2,94% reële groei. Dit rekenvoorbeeld laat kosten en belasting buiten beschouwing.',
    ],
    faq: [
      [
        'Kan een stijgend saldo toch koopkracht verliezen?',
        'Ja, wanneer het prijsniveau sterker stijgt dan je saldo.',
      ],
      [
        'Waarom is aftrekken niet exact?',
        'Omdat je de verandering in geld vergelijkt met een veranderd prijsniveau. Daarvoor deel je de groeifactoren.',
      ],
    ],
    source: 'inflation',
  },
  {
    slug: 'aflossen-of-beleggen-afwegen',
    tool: 'aflossen-of-beleggen',
    category: 'Strategie',
    topics: ['vermogen', 'strategie'],
    title: 'Extra aflossen of beleggen: welke vragen stel je eerst?',
    summary:
      'Vergelijk niet alleen schuld­rente met een verwacht rendement. Beschikbaarheid van je geld, onzekerheid, voorwaarden en belasting kunnen de afweging veranderen.',
    problem:
      'Je hebt een bedrag over. Minder schuld of meer belegd vermogen klinkt als een rekensom, maar beide keuzes hebben andere gevolgen.',
    sections: [
      [
        'Controleer de schuldvoorwaarden',
        'Bekijk of extra aflossen is toegestaan en of daarvoor kosten gelden. Noteer de rentevaste periode en het bedrag waarop de rente wordt berekend. Een algemene calculator kent jouw overeenkomst niet.',
      ],
      [
        'Vergelijk zekerheid en onzekerheid',
        'Niet meer betalen over een afgelost schulddeel is anders dan een onzeker beleggingsresultaat. Vul een mogelijk rendement niet in alsof het een gegarandeerde besparing is.',
      ],
      [
        'Neem beschikbaarheid mee',
        'Geld dat je gebruikt voor aflossen is meestal niet direct weer opneembaar. Houd een afzonderlijke buffer in beeld. Hypotheekrenteaftrek en fiscale effecten worden niet persoonlijk door de tool vastgesteld.',
      ],
      [
        'Wat laat de afloslijn werkelijk zien?',
        'De tool behandelt je netto rentebesparing alsof je die ieder jaar opnieuw tegen hetzelfde percentage inzet. Bij € 10.000 en 4% is de modelwaarde na tien jaar daardoor ongeveer € 14.802. Dit is geen bedrag dat je van je bank ontvangt en geen berekening van je resterende hypotheekschuld. Een werkelijk aflosschema, veranderende rente en kosten voor extra aflossen kunnen anders uitpakken.',
      ],
    ],
    example: [
      'Een eenvoudige eerste vergelijking',
      'Over € 10.000 schuld tegen 4% is de bruto rente voor één heel jaar € 400, als de schuld anders gelijk blijft. Dit negeert aflosschema, kosten en belasting.',
    ],
    faq: [
      [
        'Geeft de tool aan wat ik moet kiezen?',
        'Nee. De uitkomst is een vergelijking binnen ingevulde aannames, geen persoonlijk advies.',
      ],
      [
        'Is hypotheekrenteaftrek inbegrepen?',
        'Niet als persoonlijke fiscale berekening. Bekijk de uitleg in de tool en beoordeel jouw situatie afzonderlijk.',
      ],
    ],
    source: 'mortgage',
  },
  {
    slug: 'aflossen-of-beleggen-omslagpunt',
    tool: 'aflossen-of-beleggen',
    category: 'Strategie',
    topics: ['strategie'],
    title: 'Het omslagpunt tussen aflossen en beleggen begrijpen',
    summary:
      'Een rekenkundig omslagpunt is het punt waarop twee modeluitkomsten gelijk zijn. Het maakt een onzeker beleggingsscenario niet gelijkwaardig aan minder schuld.',
    problem:
      'Een verschil van een paar euro kan in een calculator als winnaar voelen, terwijl de onzekerheid veel groter is dan dat verschil.',
    sections: [
      [
        'Begin met identieke uitgangspunten',
        'Gebruik hetzelfde bedrag en dezelfde looptijd. Houd ook rekening met de vraag wat er gebeurt met eventuele bespaarde rentebetalingen: uitgeven, sparen en herbeleggen zijn verschillende scenario’s.',
      ],
      [
        'Onderzoek de gevoeligheid',
        'Verlaag het aangenomen rendement en verleng of verkort de periode. Als een kleine wijziging de uitkomst omdraait, is de vergelijking sterk afhankelijk van die aanname.',
      ],
      [
        'Het omslagpunt in deze calculator',
        'Bij gelijke startbedragen en looptijden zijn de modeluitkomsten gelijk als het beleggingsrendement min de ingevoerde jaarlijkse belastingdruk gelijk is aan de netto schuld­rente. Bij 4% netto rente en 1 procentpunt belastingdruk ligt dat rekenpunt dus op 5% brutorendement. Het aftrekken van die belastingdruk is een vereenvoudiging, geen box 3-berekening. Beleggingskosten moet je nog afzonderlijk beoordelen.',
      ],
      [
        'Maak de niet-financiële voorwaarden zichtbaar',
        'Rust door een lagere schuld, flexibiliteit en risico zijn niet in één berekend eindbedrag samen te vatten. Schrijf ze naast de uitkomst voordat je conclusies trekt.',
      ],
    ],
    example: [
      'Geen gegarandeerde voorsprong',
      'Een scenario dat bij 6% gunstiger uitvalt kan bij 2% anders uitpakken. Beide percentages zijn invulwaarden; de tool kent de toekomstige markt niet.',
    ],
    faq: [
      [
        'Is een hoger verwacht rendement voldoende om te kiezen?',
        'Nee. Het verschil moet samen met risico, kosten, belastingen en beschikbaarheid worden beoordeeld.',
      ],
      [
        'Kan ik kosten voor extra aflossen negeren?',
        'Nee. Als jouw overeenkomst zulke kosten kent, horen ze in je eigen afweging thuis.',
      ],
    ],
    source: 'mortgage',
  },
  {
    slug: 'box-3-indicatie-2026',
    tool: 'box-3',
    category: 'Belasting',
    topics: ['belasting', 'vermogen'],
    title: 'Box 3 in 2026: wat berekent de indicatietool?',
    summary:
      'De tool maakt een vereenvoudigde indicatie met de uitgangspunten voor de voorlopige aanslag 2026. Het resultaat is geen definitieve aanslag of berekening van werkelijk rendement.',
    problem:
      'Voor spaargeld en beleggingen gebruikt de tool verschillende vaste rendementspercentages. Daarom hangt de uitkomst ook af van de verdeling van je vermogen.',
    sections: [
      [
        'Splits je invoer',
        'Gebruik voor 2026 de vermogenswaarden op 1 januari 2026. De tool rekent met 1,28% voor banktegoeden, 6% voor beleggingen en andere bezittingen en 2,70% voor aftrekbare schulden. Dit zijn fiscale rekenpercentages, geen voorspelling van je opbrengst.',
      ],
      [
        'Lees het resultaat als indicatie',
        'De Belastingdienst noemt de percentages voor banktegoeden en schulden bij de voorlopige aanslag voorlopig. De persoonlijke aangifte kan afwijken van deze vereenvoudigde tool.',
      ],
      [
        'Waarom 36% niet over je hele vermogen gaat',
        'Eerst worden het berekende rendement en de grondslag na drempels bepaald. Het heffingsvrije vermogen bedraagt € 59.357 per persoon. Het tarief van 36% wordt toegepast op het toegerekende box 3-inkomen. De tool optimaliseert geen verdeling tussen fiscale partners.',
      ],
      [
        'Controleer de officiële uitleg',
        'Bij een lager werkelijk rendement kan de uiteindelijke heffing anders uitvallen. De calculator stelt dat niet vast. Gebruik voor aangifte of besluitvorming de actuele Belastingdienstinformatie.',
      ],
    ],
    example: [
      '€ 100.000 sparen of beleggen, zonder fiscale partner',
      'Met alleen € 100.000 banktegoed, geen schulden en € 59.357 heffingsvrij vermogen resteert € 40.643 grondslag. Bij 1,28% forfait en 36% belasting is de indicatie circa € 187. Bestaat hetzelfde bedrag volledig uit beleggingen, dan geeft 6% forfait circa € 878. Dit vereenvoudigde voorbeeld gebruikt de uitgangspunten voor de voorlopige aanslag; werkelijk rendement en uitzonderingen zijn niet doorgerekend.',
    ],
    faq: [
      [
        'Berekent dit mijn werkelijke rendement?',
        'Nee. De tool maakt een schatting met vaste rendementspercentages, niet met je werkelijk behaalde resultaat.',
      ],
      [
        'Kan ik de uitkomst overnemen in mijn aangifte?',
        'Niet zonder je persoonlijke gegevens, uitzonderingen en de officiële berekening te controleren.',
      ],
    ],
    source: 'tax',
  },
  {
    slug: 'box-3-gegevens-verzamelen',
    tool: 'box-3',
    category: 'Belasting',
    topics: ['belasting', 'vermogen'],
    title: 'Box 3 berekenen: welke gegevens leg je klaar?',
    summary:
      'Begin bij het juiste belastingjaar en verzamel de bijbehorende vermogensgegevens. Vul een indicatietool pas in wanneer duidelijk is welke categorie ieder bedrag vertegenwoordigt.',
    problem:
      'Losse actuele saldi zijn niet vanzelf de juiste invoer voor een fiscale berekening.',
    sections: [
      [
        'Controleer het jaar en de peildatum',
        'Voor deze forfaitaire berekening gebruik je 1 januari 2026. Leg bank- en beleggingsoverzichten met die peildatum klaar, ook van buitenlandse rekeningen. Een huidig saldo in je app kan een andere datum beschrijven.',
      ],
      [
        'Controleer de categorie',
        'Een gewone betaal- of spaarrekening hoort bij banktegoeden. Privé gehouden aandelen, obligaties en ETF’s vallen doorgaans onder beleggingen en andere bezittingen. Neem alleen schulden mee die in box 3 thuishoren. Vul die vóór de schuldendrempel in: de tool verwerkt zelf € 3.800 per persoon. Trek die drempel dus niet tweemaal af.',
      ],
      [
        'Neem niet zomaar je hele vermogen over',
        'Je eigen woning die onder de eigenwoningregeling valt hoort in box 1. Die woning tel je hier dus niet als belegging mee. Ook ondernemingsvermogen en aandelen die bij een aanmerkelijk belang horen vallen buiten deze eenvoudige box 3-indicatie. Controleer bij een afwijkend product eerst de fiscale categorie; de naam van de aanbieder bepaalt die niet.',
      ],
      [
        'Bewaar de onderbouwing',
        'Leg vast welke stukken je hebt gebruikt en welke bedragen je hebt uitgesloten. Een bewaarde calculatoruitkomst vervangt de onderliggende informatie niet.',
      ],
    ],
    example: [
      'Eerst ordenen, daarna rekenen',
      'Staat op 1 januari € 15.000 op je betaalrekening, € 25.000 op een gewone spaarrekening en € 60.000 in privé gehouden ETF’s? Dan vul je € 40.000 banktegoeden en € 60.000 beleggingen in. Vul niet daarnaast nogmaals het totale vermogen van € 100.000 in. Dit voorbeeld veronderstelt dat alles in box 3 valt, zonder vrijgestelde producten of andere uitzonderingen.',
    ],
    faq: [
      [
        'Is een bedrag op mijn bankapp voldoende?',
        'Controleer eerst of de datum aansluit op de gevraagde invoer.',
      ],
      [
        'Houdt de tool rekening met alle uitzonderingen?',
        'Nee. Het is een vereenvoudigde indicatie met de beperkingen die bij de tool staan.',
      ],
    ],
    source: 'tax',
  },
  {
    slug: 'ineens-of-gespreid-beleggen',
    tool: 'lump-sum-dca',
    category: 'Strategie',
    topics: ['strategie', 'beginnen'],
    title: 'Ineens of gespreid beleggen met een beschikbaar bedrag',
    summary:
      'Bij ineens instappen doet het volledige bedrag direct mee. Bij gespreid instappen beleg je het beschikbare bedrag in delen; het resterende geld wacht buiten de markt.',
    problem:
      'Je hebt een bedrag beschikbaar. Wat verandert er als je het direct belegt of verspreid over meerdere maanden inlegt?',
    sections: [
      [
        'Maak onderscheid met maandelijkse besparingen',
        'Een bestaand bedrag spreiden is een andere situatie dan iedere maand nieuw geld uit je inkomen beleggen. Deze tool onderzoekt het eerste: alles is op dag één beschikbaar.',
      ],
      [
        'Vergelijk hetzelfde koerspad',
        'Beide methoden volgen in de tool dezelfde koersbewegingen. Alleen het moment waarop je inlegt verschilt. Zo kun je de gevolgen daarvan vergelijken.',
      ],
      [
        'Bekijk ook het wachtende geld',
        'Geld dat nog niet belegd is, doet niet mee aan koersstijgingen of -dalingen. In dit model kun je er spaarrente voor kiezen. Die ontvangen rente blijft apart op de spaarrekening meetellen.',
      ],
      [
        'Wat gebeurt er als de markt alleen stijgt?',
        'In een gelijkmatig stijgend scenario doet direct ingelegd geld langer mee aan de stijging. Later aankopen betekent dan een hogere prijs. Bij een vroege daling kan het omgekeerde gebeuren. Spreiden vermindert hoeveel van je bedrag meteen aan de markt blootstaat, maar is geen verzekering tegen verlies. Ook herhaalde orderkosten kunnen het verschil veranderen; die zitten niet in dit model.',
      ],
    ],
    example: [
      'Twaalf gelijke delen',
      'In het gelijkmatige toolscenario met € 12.000, vijf jaar, 6% groei en 0% rente op wachtend geld eindigt ineens beleggen rond € 16.059. Spreiden over twaalf maandelijkse stortingen komt op circa € 15.638. Beide starten de eerste aankoop direct; de gespreide variant belegt eerst € 1.000. Dit verschil van circa € 421 hoort alleen bij dit fictieve koerspad, zonder kosten of belasting.',
    ],
    faq: [
      [
        'Voorkomt spreiden verlies?',
        'Nee. Eenmaal ingelegd geld blijft aan marktbewegingen blootgesteld.',
      ],
      [
        'Is dit een voorspelling van de beste instapdag?',
        'Nee. De getoonde koerspaden zijn illustratieve scenario’s.',
      ],
    ],
    source: 'dca',
  },
  {
    slug: 'gespreid-instappen-en-koersdalingen',
    tool: 'lump-sum-dca',
    category: 'Strategie',
    topics: ['strategie', 'portfolio'],
    title: 'Een vroege of late koersdaling: waarom timing verschil maakt',
    summary:
      'Bij tussentijdse inleg telt niet alleen de uiteindelijke marktwaarde, maar ook de prijzen waartegen je koopt. Een vroege daling en een late daling kunnen daardoor anders uitpakken.',
    problem:
      'Twee marktverlopen eindigen gelijk. Toch kan je portefeuille een andere eindwaarde hebben als je onderweg geld toevoegt.',
    sections: [
      [
        'Volg de inlegmomenten',
        'Elke aankoop krijgt een eigen instapprijs. Bij lagere prijzen koop je met hetzelfde bedrag meer eenheden. Dat helpt alleen wanneer je de latere waarde en het hele koerspad meeneemt.',
      ],
      [
        'Vergelijk de vaste scenario’s',
        'De tool gebruikt een gelijkmatig verloop, een vroege daling en een late daling. Ze eindigen bij dezelfde marktwaarde. Dat is bewust gekozen om het timingverschil te isoleren.',
      ],
      [
        'Trek geen algemene conclusie uit één pad',
        'Een specifieke simulatie kan gunstig uitvallen voor spreiden of ineens instappen. Dat bewijst niet dat die keuze altijd wint. De werkelijke volgorde van marktbewegingen is onbekend.',
      ],
    ],
    example: [
      'Dezelfde markt-eindwaarde, andere aankopen',
      'Koop fictief twee keer voor € 100. Bij prijzen van eerst € 100 en daarna € 50 krijg je 1 + 2 = 3 eenheden. Zijn die op de einddatum € 100 waard, dan heb je € 300. Koop je beide keren tegen € 100, dan heb je bij dezelfde eindprijs € 200. De lage tussenprijs maakt in dit voorbeeld verschil, maar herstel naar € 100 is geen zekerheid. Kosten en belasting ontbreken.',
    ],
    faq: [
      [
        'Is de getoonde daling een verwachting?',
        'Nee. De daling is een illustratief onderdeel van het rekenmodel.',
      ],
      [
        'Waarom blijft de markt-eindwaarde gelijk?',
        'Zo laat de vergelijking vooral het effect van de volgorde en instapmomenten zien.',
      ],
    ],
    source: 'dca',
  },
  {
    slug: 'dividend-herbeleggen-of-uitkeren',
    tool: 'dividend',
    category: 'Dividend',
    topics: ['dividend', 'aandelen'],
    title: 'Dividend herbeleggen of apart houden: wat verandert er?',
    summary:
      'Herbelegd dividend wordt onderdeel van het belegd vermogen. Zonder herbeleggen blijft de uitkering in dit model als renteloos geld meetellen, zodat je totale vermogen eerlijk wordt vergeleken.',
    problem:
      'Alleen de portefeuillewaarde vergelijken kan de uitgekeerde bedragen uit beeld laten verdwijnen.',
    sections: [
      [
        'Vergelijk het totaal',
        'Tel bij niet herbeleggen de ontvangen uitkeringen mee naast de resterende portefeuille. Anders lijkt herbeleggen beter doordat een deel van het vermogen ontbreekt in de vergelijking.',
      ],
      [
        'Begrijp de timing',
        'De tool berekent dividend over het vermogen aan het begin van het jaar. Bij herbeleggen wordt het aan het eind van het jaar toegevoegd. Dit is een vaste modelaanname; uitkeringsmomenten in de praktijk verschillen.',
      ],
      [
        'Let op kosten en onzekerheid',
        'Dividend kan worden verlaagd of overgeslagen. Belastingen en transactiekosten kunnen de opbrengst beïnvloeden en zijn niet verwerkt in deze eenvoudige simulatie.',
      ],
      [
        'Het dividendpercentage is geen extra gratis rendement',
        'Bij een uitkering verlaat geld de onderneming. In werkelijkheid hangt de koersontwikkeling ook daarmee samen. Het model gebruikt een afzonderlijk dividendpercentage en koersgroei exclusief dividend. Een aanname van 0% koersgroei en 3% dividend betekent dus 3% totaalopbrengst in dat model; het belooft niet dat een uitkering de koers onaangetast laat.',
      ],
    ],
    example: [
      'Tien jaar bij een vaste uitkeringsaanname',
      'Bij € 10.000, 0% koersgroei en 3% dividend geeft jaarlijks herbeleggen na tien jaar circa € 13.439. Zonder herbeleggen blijft € 10.000 belegd en staat € 3.000 dividend apart: samen € 13.000. Het verschil van circa € 439 komt door de opbrengst over herbelegde uitkeringen. Dividend blijft in werkelijkheid onzeker; kosten, belasting en inflatie ontbreken.',
    ],
    faq: [
      [
        'Verdwijnt uitgekeerd dividend uit de vergelijking?',
        'Nee. Het telt mee als apart gehouden geld, zonder rente, zolang je het niet uitgeeft.',
      ],
      [
        'Is dividend gegarandeerd?',
        'Nee. De calculator houdt de ingevoerde opbrengst constant, maar een onderneming hoeft dat niet te doen.',
      ],
    ],
    source: 'dividend',
  },
  {
    slug: 'dividend-en-totaalrendement',
    tool: 'dividend',
    category: 'Dividend',
    topics: ['dividend', 'aandelen', 'portfolio'],
    title: 'Dividend en totaalrendement: voorkom dubbel tellen',
    summary:
      'Totaalrendement omvat koersontwikkeling én uitkeringen. De dividendtool vraagt koersgroei exclusief dividend en daarnaast een afzonderlijk dividendpercentage.',
    problem:
      'Als je een totaalrendement als koersgroei invoert en er nog dividend bovenop zet, reken je dezelfde opbrengst mogelijk twee keer mee.',
    sections: [
      [
        'Controleer welk rendement je gebruikt',
        'Zoek bij een historisch percentage de definitie. Een totaalrendementsreeks verwerkt uitkeringen anders dan een kale koersreeks. Zonder die context is het getal niet geschikt als invoer.',
      ],
      [
        'Gebruik afzonderlijke aannames',
        'Vul alleen koersgroei in het groeiveld in. Het dividendveld is een aparte aanname. De tool kan niet herkennen of jouw oorspronkelijke bron beide al heeft samengevoegd.',
      ],
      [
        'Bekijk de onderneming achter de uitkering',
        'Een hoog dividendpercentage kan samenhangen met een gedaalde koers. Het percentage op zichzelf bewijst daarom niet dat de belegging aantrekkelijk of stabiel is.',
      ],
    ],
    example: [
      'Een koersstijging en een uitkering samen',
      'Je koopt een fictief aandeel voor € 100, ontvangt € 3 dividend en eindigt met een koers van € 104. Zonder herbeleggen of andere geldstromen is het totaalrendement (104 − 100 + 3) / 100 = 7%, vóór kosten en belasting. De koersgroei alleen is 4%. 7% invoeren als koersgroei en daar 3% dividend bij zetten zou dezelfde uitkering dubbel meetellen.',
    ],
    faq: [
      [
        'Zijn dividend en winst hetzelfde?',
        'Nee. Dividend is een uitkering; de winst van een onderneming kan ook worden ingehouden of voor andere doeleinden worden gebruikt.',
      ],
      [
        'Waarom vraagt de tool twee percentages?',
        'Om koersgroei en uitkeringen afzonderlijk te modelleren en herbeleggen te kunnen vergelijken.',
      ],
    ],
    source: 'returns',
  },
];

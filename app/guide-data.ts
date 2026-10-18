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
  etfTrading: [
    'Investor.gov · ETF-kosten, bied-laatspread en beursprijs',
    'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-24',
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
      '€ 3.600 ineens is niet hetzelfde als twaalf keer € 300',
      'Staat € 3.600 vanaf de eerste dag een heel jaar tegen een aangenomen 6% groei, dan eindigt het op € 3.816. Stort je twaalf keer € 300 aan het maandeinde, dan is het eindbedrag ongeveer € 3.698. Beide bevatten € 3.600 eigen geld, maar de maandstortingen doen gemiddeld korter mee. Het verschil van circa € 118 is een timingverschil, geen extra inleg.\n\nControleer dit in de tool met eerst € 3.600 startkapitaal en € 0 maandinleg, en daarna € 0 startkapitaal en € 300 maandinleg. Houd één jaar en 6% gelijk. Bij 0% eindigen beide routes op € 3.600. Met een negatief constant rendement pakt de latere inleg juist minder ongunstig uit. De vergelijking veronderstelt dat het volledige bedrag al beschikbaar is; beleggen met geleend geld of toekomstige salarissen is een andere situatie. Kosten, belasting en inflatie ontbreken.',
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
      'Vergelijk je eindbedrag met álle stortingen, niet alleen je startkapitaal. De vijf scenario’s hieronder laten zien dat een hoger saldo toch verlies kan betekenen.',
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
        'Bij een koersdaling van 30% daalt € 10.000 naar € 7.000, zolang je niets toevoegt of opneemt. Voor herstel naar € 10.000 is daarna ongeveer 42,9% stijging nodig. Of en wanneer dat herstel plaatsvindt, is onzeker; verlies kan blijvend zijn. Dit is een afzonderlijke rekensom, geen voorspeld koerspad. Geld dat je tijdens de daling moet opnemen, doet niet meer mee aan een mogelijk herstel.',
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
      'Eerder beginnen en daarna stoppen: maakt dat altijd meer op?',
      'Neem één einddatum over dertig jaar. Route A legt alleen de eerste tien jaar € 100 per maand in en laat het daarna twintig jaar staan: € 12.000 eigen inleg. Route B wacht tien jaar en legt daarna twintig jaar € 100 per maand in: € 24.000 eigen inleg. Bij constant 6% rendement en stortingen aan het maandeinde eindigt A op circa € 52.107 en B op € 45.344. De extra groeitijd compenseert in dat gekozen scenario de lagere inleg.\n\nBij 0% gebeurt dat niet: A houdt € 12.000 over en B € 24.000. “Vroeg beginnen wint altijd” volgt dus niet uit het eerste voorbeeld. Om A na te rekenen bereken je eerst tien jaar maandinleg; gebruik die ongeronde eindwaarde daarna als startkapitaal voor twintig jaar zonder extra stortingen. Beide routes gebruiken dezelfde einddatum en hetzelfde percentage. Kosten, belasting en inflatie ontbreken; het rendement is geen verwachting.',
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
      'Bij € 10.000 startkapitaal, twintig jaar en 6% brutogroei geeft 1% kosten circa € 4.891 minder eindvermogen dan 0,15%. Een deel is gemiste groei. Bekijk de uitsplitsing.',
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
        'Zet kosten voor kopen, verkopen, valuta en je rekening apart. Neem alleen posten op die bij jouw gebruik horen. De spread is het verschil tussen bied- en laatprijs; die is niet hetzelfde als een vast jaarlijks tarief. Bij een biedprijs van € 99,90 en een laatprijs van € 100,10 koop je direct voor € 100,10 en verkoop je direct voor € 99,90. Als die prijzen niet veranderen, kost die heen-en-terugtransactie € 0,20 per eenheid, nog vóór eventuele orderkosten. De spread kan tijdens de handel veranderen.',
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
      'Minder orders scheelt kosten, maar verandert ook je instapmoment',
      'Stel dat je € 2.400 per jaar wilt aankopen en een fictieve vaste ordervergoeding van € 3 betaalt, bovenop het aankoopbedrag. Twaalf aankopen van € 200 kosten samen € 36. Vier aankopen van € 600 kosten € 12. Dat is respectievelijk 1,5% en 0,5% van het jaarlijkse aankoopbedrag, naast eventuele fondskosten, spread en valuta. Het verschil is € 24, niet 1% over je hele portefeuille ieder jaar.\n\nDit bewijst niet dat per kwartaal kopen altijd beter is. Een deel van je geld wacht dan langer buiten de markt. Stijgende of dalende koersen en rente op wachtend geld veranderen het totaalresultaat. Controleer bovendien of je aanbieder echt per order rekent: bij een procentueel tarief zonder minimum kan de vergelijking anders uitvallen. Het nuttige resultaat is hier een aparte kostenpost in euro’s, die je niet ongemerkt als jaarlijkse TER in de kostentool invoert.',
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
    source: 'etfTrading',
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
      'Dezelfde fondskosten twee keer: ruim € 1.000 verschil in het model',
      'Bij 5% bruto groei en 0,20% jaarlijkse kosten is de netto groeifactor 1,05 × 0,998 = 1,0479. € 10.000 zonder extra inleg wordt daarmee na twintig jaar circa € 25.492. Wie 4,79% als bruto rendement invult en daarna opnieuw 0,20% kosten aftrekt, rekent met 1,0479 × 0,998. Die uitkomst is circa € 24.491: ongeveer € 1.001 te laag door dubbel rekenen.\n\nHet oplossen van die fout betekent niet dat alle overige kosten verdwijnen. Een brokervergoeding kan bijvoorbeeld nog buiten een netto fondsresultaat vallen. Noteer daarom per bron welke kosten al verwerkt zijn. Is dat onduidelijk, gebruik het percentage dan niet als vergelijkbare bruto invoer. De vaste 5% is hier een rekenaanname, geen historisch of verwacht resultaat; belastingen, inflatie en losse kosten zijn niet meegenomen.',
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
      'Met € 10.000 startkapitaal en twintig jaar is voor € 100.000 circa € 150 per maand nodig bij 6% groei, of € 375 bij 0%. Zonder kosten of belasting. Vergelijk negen scenario’s.',
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
      'Een jaar overslaan verandert het maandbedrag',
      'Voor € 20.000 over vijf jaar, met € 5.000 beschikbaar en 0% groei, is € 250 per maand nodig. Stel dat je het eerste jaar niets toevoegt, terwijl de einddatum gelijk blijft. Er resteert dan nog steeds € 15.000, maar nog maar 48 maanden: € 312,50 per maand. Blijf je € 250 storten, dan eindig je op € 17.000 en ontbreekt € 3.000.\n\nJe kunt het tekort dus concreet benoemen voordat je een renteaanname aanpast. Controleer de actuele prijs, de echte resterende tijd en het werkelijk gespaarde saldo opnieuw. Als het hogere maandbedrag niet past, verandert de rekensom alleen door een ander doelbedrag, meer tijd of daadwerkelijk extra geld. Een hoger ingevuld rendement maakt de gemiste stortingen niet zeker goed. Dit nulscenario bevat geen kosten, belasting of prijsstijging van het doel.',
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
      'Het doel is geïndexeerd. Zijn je stortingen dat ook?',
      'Voor de koopkracht van € 100.000 vandaag is bij 2% inflatie over twintig jaar circa € 148.595 nodig. Met € 10.000 startkapitaal en 6% nominaal rendement vraagt dat ongeveer € 257 per maand, telkens aan het maandeinde. De storting blijft in dit model twintig jaar hetzelfde nominale bedrag. Zij wordt dus niet ieder jaar automatisch 2% hoger. Kosten en belasting ontbreken.\n\nDat onderscheid is belangrijk wanneer je een berekening in euro’s van vandaag wilt maken. Bij 6% rendement en 2% inflatie is het exacte reële rendement 1,06/1,02 − 1, ongeveer 3,92%. Een constant maandbedrag in huidige koopkracht zou in toekomstige euro’s moeten meestijgen met prijzen. Dat is een andere afspraak dan een vaste nominale storting. Gebruik daarom in deze tool het toekomstige doelbedrag met nominaal rendement. Vul niet tegelijk dat hogere doel én een voor inflatie verlaagd rendement in; dan meng je twee verschillende waardematen.',
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
      '6% per jaar delen door twaalf is niet altijd de juiste maandrente',
      'Bij een effectief jaarrendement van 6% hoort een maandpercentage van (1,06^(1/12) − 1) × 100 = ongeveer 0,4868%. Twaalf van die maandstappen samen geven weer precies 6%. Neem je in plaats daarvan 6%/12 = 0,5% en laat je dat iedere maand samenstellen, dan komt het jaar uit op ongeveer 6,1678%. Op € 10.000 zonder stortingen is dat € 10.616,78 tegenover € 10.600.\n\nBeide notaties kunnen in financiële producten voorkomen; de fout is ze behandelen alsof ze hetzelfde betekenen. Controleer of een bron een effectief jaarrendement of een nominale rente met een bepaalde bijschrijffrequentie geeft. De Beurswatcher-berekening zet een effectief jaarpercentage om naar bijpassende maandstappen. Zij bepaalt niet de contractuele rente van een rekening. Kosten en belasting zijn in deze controle weggelaten.',
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
      'Een jaar +50% en daarna −40% heeft gemiddeld 5% rendement, maar samen verlies je 10%. Zes voorbeelden laten zien waarom je groeifactoren moet vermenigvuldigen.',
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
      'Een eigen uitgavenmandje kan anders bewegen dan één inflatiecijfer',
      'Neem een fictief maandbudget van € 1.000: € 500 wonen, € 200 energie en € 300 overige uitgaven. Veronderstel voor één jaar respectievelijk 0%, 10% en 2% prijsstijging. Hetzelfde mandje kost daarna € 500 + € 220 + € 306 = € 1.026: een stijging van 2,6%. Het gewone gemiddelde van de drie percentages, 4%, klopt hier niet, omdat je niet aan iedere categorie evenveel besteedt.\n\nDit is geen alternatieve officiële inflatiemeting. Het laat zien waarom gewichten ertoe doen wanneer je een concreet spaardoel of budget beoordeelt. De officiële index omvat veel meer producten en een eigen meetmethode. Je kunt de inflatietool gebruiken om het effect van een gekozen gemiddelde te onderzoeken, maar verwacht niet dat die automatisch je persoonlijke uitgaven voorspelt. Het voorbeeld houdt hoeveelheden gelijk en negeert dat je door prijsverandering andere producten kunt gaan kopen.',
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
      'Koopkrachtverlies en een tekort op de betaaldag zijn andere problemen',
      'Stel dat € 2.000 apart staat voor een mogelijke vervanging die vandaag € 2.000 kost. Bij 3% prijsstijging kost hetzelfde product over een jaar € 2.060. Zonder rente ontbreekt € 60. Als het geld ondertussen belegd was en precies op de betaaldag 20% lager stond, was er nog € 1.600: een tekort van € 460 tegenover diezelfde prijs. De daling van 20% is een gekozen tegenvoorbeeld, geen voorspelling.\n\nHet ene risico is een geleidelijk duurder wordende uitgave; het andere is onvoldoende beschikbaar geld wanneer de rekening komt. Een verwachte langetermijnopbrengst lost dat tweede risico niet automatisch op. Controleer daarom eerst het vervangingsbedrag en hoe snel je het nodig kunt hebben, en pas daarna eventuele rente of groei. Dit voorbeeld zegt niet dat ieder huishouden € 2.000 buffer nodig heeft. Andere spullen, verplichtingen en inkomensrisico’s vragen om een eigen inventarisatie.',
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
      'Bij 5% rendement en 2% inflatie groeit je koopkracht met circa 2,94% per jaar, vóór kosten en belasting. Vergelijk zes combinaties van saldo en koopkracht.',
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
      'Bewaar je bespaarde rente of geef je die uit? Dat verandert de aflosvergelijking. Reken het verschil door en houd schuldvermindering, cash en beleggingsrisico uit elkaar.',
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
      'Een kleine voorsprong verdwijnt door één ontbrekende kostenpost',
      'In het model met herbelegde rentebesparing wordt € 10.000 bij 4% na tien jaar circa € 14.802. Een belegging bij constant 4,1% na jaarlijkse kosten en belasting wordt circa € 14.945. De berekende voorsprong is slechts € 143. Gaat van het beleggingsbedrag eerst een eenmalige kost van € 100 af, dan groeit € 9.900 tegen 4,1% naar circa € 14.796. De voorsprong is daarmee verdwenen.\n\nDe € 100 is geen werkelijk aanbiederstarief. Het voorbeeld toont hoe gevoelig een kleine modelmarge is voor een vergeten invoer. Verwerk die eenmalige kost niet alsof ze ieder jaar over het hele vermogen terugkomt. Omgekeerd kunnen kosten voor extra aflossen de aflosroute veranderen. En ook zonder zulke kosten maakt een voorsprong van 0,1 procentpunt een onzeker rendement niet vergelijkbaar met een contractuele rentebesparing. Het volledige hypotheekverloop en persoonlijke fiscale effecten zijn hier niet berekend.',
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
      '€ 100.000 banktegoed geeft circa € 187; hetzelfde bedrag in beleggingen circa € 878. Voorlopige indicaties voor 2026, zonder partner of schuld. Bekijk de berekening en grenzen.',
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
      'De schuldendrempel per ongeluk twee keer aftrekken',
      'Stel dat je zonder fiscale partner € 10.000 aan schulden hebt die volledig in box 3 mogen meetellen. De schuldendrempel voor 2026 is € 3.800 per persoon. De tool verwacht € 10.000 als invoer en houdt daarna € 6.200 aftrekbare schuld over. Vul je zelf al € 6.200 in, dan trekt de tool opnieuw € 3.800 af en rekent hij met slechts € 2.400. Dat is een invoerfout, geen andere fiscale uitkomst voor dezelfde gegevens.\n\nBewaar dus zowel het oorspronkelijke saldo als de toegepaste drempel, met duidelijke namen. Controleer eerst dat de schuld werkelijk in box 3 hoort; een hypotheek die onder de eigenwoningregeling valt kun je niet op basis van dit voorbeeld toevoegen. Gebruik de saldi op 1 januari 2026 voor de forfaitaire berekening. De berekening van werkelijk rendement heeft andere regels en is niet wat deze tool uitvoert.',
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
      'Bij een gelijke eindkoers kan een vroege daling spreiden helpen en een late daling niet. Vergelijk drie fictieve koerspaden en het effect van rente op wachtend geld.',
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
      'Je gemiddelde aankoopprijs is niet het gemiddelde van de koersen',
      'Koop drie keer voor € 100 bij fictieve koersen van € 100, € 80 en € 120. Je krijgt 1 + 1,25 + 0,8333 = ongeveer 3,0833 eenheden. De gemiddelde aankoopprijs is het totale aankoopbedrag gedeeld door het aantal eenheden: € 300/3,0833, ongeveer € 97,30. Het gewone gemiddelde van de drie koersen is € 100. Dat geeft een ander antwoord omdat je bij de lage koers meer eenheden koopt.\n\nDit is geen bewijs van winst. Bij een eindkoers van € 90 zijn de gekochte eenheden samen € 277,50 waard, dus minder dan de ingelegde € 300. Een lagere gemiddelde aankoopprijs neemt het risico van een lagere eindkoers niet weg. De berekening veronderstelt dat fracties gekocht kunnen worden, zonder orderkosten, belasting of afronding op hele stukken. Wanneer je telkens evenveel stukken koopt in plaats van evenveel euro’s inlegt, geldt een andere weging.',
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
      'Herbeleggen vergroot ook de blootstelling aan koersdalingen. Vijf scenario’s vergelijken herbeleggen met de portefeuille plus bewaarde cash, zodat dividend niet uit beeld verdwijnt.',
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
      'Een verkeerde rendementsdefinitie telt ieder jaar opnieuw door',
      'Een fictief aandeel begint op € 100, eindigt op € 104 en keert € 3 uit. Zonder andere geldstromen is het totaalrendement 7% en de koersgroei 4%. In de dividendtool passen bij dit éénjaarsvoorbeeld dus 4% koersgroei en 3% dividend. Voer je 7% als koersgroei in plus 3% dividend, dan modelleer je onbedoeld 10% totaalopbrengst.\n\nAls je dezelfde fictieve verhoudingen vijf jaar constant houdt en jaarlijks herbelegt, wordt € 10.000 bij 7% ongeveer € 14.026. De foutieve 10% geeft circa € 16.105: ongeveer € 2.080 te veel. Dat verschil komt uit de definitiefout, niet uit een betere belegging. Een werkelijke historische totaalrendementsreeks kun je niet altijd simpel splitsen door één dividendpercentage af te trekken: timing en herbelegging kunnen verschillen. Gebruik de productdefinitie en kies voor een model afzonderlijke, duidelijk benoemde aannames. Kosten, belasting en veranderende uitkeringen ontbreken.',
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

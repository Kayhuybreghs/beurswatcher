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
  dca: [
    'Investor.gov · gespreid inleggen',
    'https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging',
  ],
  tax: [
    'Belastingdienst · voorlopige aanslag box 3 in 2026',
    'https://www.belastingdienst.nl/wps/wcm/connect/nl/box-3/content/berekening-box-3-inkomen-2026',
  ],
  math: [
    'Investor.gov · financiële rekentools',
    'https://www.investor.gov/use-financial-tools-and-calculators',
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
    ],
    source: 'math',
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
    ],
    example: [
      'Dezelfde invoer, een andere uitkomst',
      'Laat startkapitaal, maandbedrag en looptijd staan. Reken eerst met 0%, daarna met 3% en 6%. Het verschil toont de gevoeligheid voor de aanname, niet welk scenario waarschijnlijk wordt.',
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
      'Je kunt een toekomstig doel beïnvloeden via tijd en inleg. Om te zien wat elk afzonderlijk doet, moet je vergelijkingen zorgvuldig opzetten.',
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
      'Extra inleg herkennen',
      '€ 50 meer per maand vraagt over twintig jaar € 12.000 extra eigen geld. De calculator toont daarnaast het effect van het veronderstelde rendement op die bijdragen.',
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
    source: 'math',
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
      'Eén variabele veranderen',
      'Vergelijk 0,15% en 1% jaarlijkse kosten bij gelijke overige invoer. Wissel vervolgens de horizon tussen tien en twintig jaar om het tijdseffect te onderzoeken.',
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
    title: 'TER en overige kosten: wat vergelijk je bij een ETF?',
    summary:
      'Een jaarlijks fondspercentage is niet automatisch je volledige kostenplaatje. Maak onderscheid tussen doorlopende fondskosten, handelen en eventuele kosten van je rekening.',
    problem:
      'Twee percentages naast elkaar zetten is eenvoudig. Begrijpen welke kosten erin zitten, vraagt een extra stap.',
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
    ],
    example: [
      'Een vast bedrag in perspectief',
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
    source: 'math',
  },
  {
    slug: 'honderdduizend-euro-opbouwen',
    tool: 'doelvermogen',
    category: 'Vermogen',
    topics: ['vermogen', 'beginnen'],
    title: '€ 100.000 opbouwen: hoeveel moet je per maand inleggen?',
    summary:
      'Het benodigde maandbedrag volgt uit je doel, startkapitaal, horizon en gekozen rendement. Gebruik de doelvermogentool om terug te rekenen vanuit € 100.000 of je eigen doelbedrag.',
    problem:
      'Een rond doelbedrag motiveert, maar vertelt nog niet wat het vandaag van je budget vraagt.',
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
    ],
    source: 'math',
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
    source: 'math',
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
      'Een doel dat meegroeit',
      '€ 10.000 koopkracht vandaag vraagt bij precies 2% jaarlijkse inflatie over tien jaar ongeveer € 12.190. De inflatieaanname is een voorbeeld, geen voorspelling.',
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
    source: 'math',
  },
  {
    slug: 'rente-op-rente-uitleg',
    tool: 'compound-interest',
    category: 'Vermogen',
    topics: ['beginnen', 'vermogen'],
    title: 'Rente op rente: hoe werkt samengestelde groei?',
    summary:
      'Bij samengestelde groei telt eerder behaalde groei mee in de volgende periode. Het effect werkt alleen zo als opbrengsten in het vermogen blijven en het model de gekozen groei daadwerkelijk haalt.',
    problem:
      'Een percentage per jaar lijkt lineair, terwijl het bedrag waarop dat percentage werkt steeds verandert.',
    sections: [
      [
        'Het bedrag verandert mee',
        'Bij € 1.000 en 5% groei is het bedrag na één jaar € 1.050. Nog eens 5% wordt over die € 1.050 berekend. Na twee jaar is dat € 1.102,50, vóór kosten en belasting.',
      ],
      [
        'Een vaste rente is niet hetzelfde als beleggen',
        'Een wiskundige groeifactor kan beide situaties illustreren. Bij beleggingen zijn de opbrengsten echter onzeker en kunnen negatieve jaren het resultaat verlagen.',
      ],
      [
        'Inleg heeft een eigen timing',
        'Nieuw geld doet pas mee vanaf het moment waarop het is ingelegd. Daarom is een jaarinleg op dag één niet hetzelfde als twaalf stortingen gedurende het jaar.',
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
    source: 'math',
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
        'Een constant groeipercentage dat dezelfde begin- en eindwaarde oplevert heet een samengesteld jaarlijks rendement. Het is bruikbaar om een reeks samen te vatten, maar verbergt de schommelingen onderweg.',
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
    source: 'math',
  },
  {
    slug: 'inflatie-koopkracht-berekenen',
    tool: 'inflatie',
    category: 'Vermogen',
    topics: ['vermogen', 'pensioen', 'markt-economie'],
    title: 'Inflatie berekenen: wat blijft er van je koopkracht over?',
    summary:
      'Je berekent toekomstige koopkracht door een vast bedrag te delen door de samengestelde inflatiefactor. De inflatietool drukt die koopkracht uit in euro’s van nu.',
    problem:
      'Het bedrag op de rekening kan gelijk blijven terwijl je er minder goederen en diensten mee kunt kopen.',
    sections: [
      [
        'Onderscheid bedrag en koopkracht',
        'Een saldo van € 10.000 blijft nominaal € 10.000 als er geen rente, kosten of opnamen zijn. Bij stijgende prijzen vertegenwoordigt dat saldo later minder koopkracht.',
      ],
      [
        'Gebruik samengestelde inflatie',
        'Voor meerdere jaren wordt de prijsstijging niet simpelweg opgeteld. Bij een vaste inflatie i en n jaren is de factor (1 + i)^n. De calculator gebruikt dit model.',
      ],
      [
        'Vergelijk een paar horizonten',
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
        'Nee. Deze tool isoleert inflatie bij een vast nominaal bedrag.',
      ],
      [
        'Is inflatie elk jaar gelijk?',
        'Nee. De constante invoer is een vereenvoudiging om het effect te onderzoeken.',
      ],
    ],
    source: 'math',
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
    source: 'investing',
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
    source: 'math',
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
    source: 'investing',
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
    source: 'math',
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
      'Spaargeld en beleggingen worden in het forfaitaire model verschillend behandeld. Daardoor zegt alleen je totale vermogen onvoldoende over de uitkomst.',
    sections: [
      [
        'Splits je invoer',
        'Zet spaargeld, beleggingen en schulden in de juiste velden. Lees bij de calculator welk belastingjaar en welke aannames worden gebruikt.',
      ],
      [
        'Lees het resultaat als indicatie',
        'De Belastingdienst noemt de percentages voor banktegoeden en schulden bij de voorlopige aanslag voorlopig. De persoonlijke aangifte kan afwijken van deze vereenvoudigde tool.',
      ],
      [
        'Controleer de officiële uitleg',
        'Bij een lager werkelijk rendement kan de uiteindelijke heffing anders uitvallen. De calculator stelt dat niet vast. Gebruik voor aangifte of besluitvorming de actuele Belastingdienstinformatie.',
      ],
    ],
    example: [
      'Een invoercontrole',
      'Vergelijk eerst twee gelijke totaalbedragen met een andere verdeling over sparen en beleggen. Zo zie je welk effect de categorie-indeling in dit model heeft.',
    ],
    faq: [
      [
        'Berekent dit mijn werkelijke rendement?',
        'Nee. De tool toont een forfaitaire indicatie.',
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
        'Gebruik de datum die bij het gekozen fiscale model hoort. Meng geen actuele koersen met een historisch banksaldo zonder te weten of dat passend is.',
      ],
      [
        'Controleer de categorie',
        'Een productnaam vertelt niet altijd hoe een bezit fiscaal wordt behandeld. Raadpleeg bij twijfel de officiële toelichting of een deskundige.',
      ],
      [
        'Bewaar de onderbouwing',
        'Leg vast welke stukken je hebt gebruikt en welke bedragen je hebt uitgesloten. Een bewaarde calculatoruitkomst vervangt de onderliggende informatie niet.',
      ],
    ],
    example: [
      'Eerst ordenen, daarna rekenen',
      'Maak een overzicht met product, saldo, datum en fiscale categorie. Vul de totalen daarna in de tool in en controleer of je geen bedrag dubbel hebt geteld.',
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
      'Je hebt al een bedrag klaarstaan, maar twijfelt over het moment van instappen. De timing beïnvloedt de route en de uitkomst.',
    sections: [
      [
        'Maak onderscheid met maandelijkse besparingen',
        'Een bestaand bedrag spreiden is een andere situatie dan iedere maand nieuw geld uit je inkomen beleggen. Deze tool onderzoekt het eerste: alles is op dag één beschikbaar.',
      ],
      [
        'Vergelijk hetzelfde koerspad',
        'De tool laat beide methoden dezelfde marktbeweging volgen. Daardoor is zichtbaar wat de timing van inleg doet, zonder stiekem een andere markt voor elke methode te gebruiken.',
      ],
      [
        'Bekijk ook het wachtende geld',
        'Geld dat nog niet belegd is, mist zowel stijgingen als dalingen. In dit model kun je er spaarrente voor kiezen. Die ontvangen rente blijft apart als cash meetellen.',
      ],
    ],
    example: [
      'Twaalf gelijke delen',
      'Bij € 12.000 verdeeld over twaalf maanden wordt telkens € 1.000 ingelegd. Bekijk naast een gelijkmatig pad ook een vroege en late daling.',
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
      'Het eindpunt blijft gelijk',
      'Laat bedrag, looptijd en groeiaanname staan. Wissel alleen het koerspad. Bekijk hoe het verschil tussen ineens en gespreid verandert door de timing.',
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
    source: 'math',
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
    ],
    example: [
      'Een uitkering apart zichtbaar',
      'Bij € 10.000, 0% koersgroei en 3% dividend is de eerste modeluitkering € 300. Daarna verschilt de basis voor het volgende jaar wanneer je die uitkering herbelegt.',
    ],
    faq: [
      [
        'Verdwijnt uitgekeerd dividend uit de vergelijking?',
        'Nee. Het telt mee als renteloos cashbedrag zolang je het niet uitgeeft.',
      ],
      [
        'Is dividend gegarandeerd?',
        'Nee. De calculator houdt de ingevoerde opbrengst constant, maar een onderneming hoeft dat niet te doen.',
      ],
    ],
    source: 'math',
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
      'Drie procent is geen bonus bovenop alles',
      'Wanneer een genoemd totaalrendement al 3% dividend bevat, mag je dat niet nogmaals toevoegen. Kies voor de tool expliciet een aanname voor koersgroei zonder dividend.',
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
    source: 'math',
  },
];

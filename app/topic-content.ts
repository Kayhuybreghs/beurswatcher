export type TopicContent = {
  title: string;
  summary: string;
  sections: [string, string][];
  checklist: string[];
  faq: [string, string][];
  tool: string;
};
export const topicContent: Record<string, TopicContent> = {
  'markt-economie': {
    title: 'Markt & economie',
    summary:
      'Een economisch cijfer krijgt betekenis door de context: welke periode beschrijft het, wat veranderde er en waarom kan het relevant zijn voor beleggers?',
    tool: 'inflatie',
    sections: [
      [
        'Begin bij het oorspronkelijke cijfer',
        'Controleer land, periode en definitie. Een maandelijkse prijsverandering is iets anders dan een jaarvergelijking. Een eerste publicatie kan later worden herzien; vermeld daarom welke versie je bespreekt.',
      ],
      [
        'Scheid waarneming en interpretatie',
        'Wat is daadwerkelijk gepubliceerd en wat leid je daaruit af? Maak dat onderscheid expliciet. Dezelfde inflatie- of groeipublicatie kan verschillende gevolgen hebben voor bedrijven, huishoudens en markten.',
      ],
      [
        'Verbind actualiteit met een beleggingsvraag',
        'Onderzoek welke aanname in je eigen plan wordt geraakt. Eén publicatie is geen zelfstandig koop- of verkoopsignaal. De macroagenda helpt vooruitkijken; Beurswatchers eigen analyses kunnen daar inhoudelijk op aansluiten.',
      ],
    ],
    checklist: [
      'Welke periode en definitie horen bij het cijfer?',
      'Is dit een eerste schatting of een herziening?',
      'Wat is feit en wat is mijn interpretatie?',
      'Welke vraag roept dit op voor mijn plan?',
    ],
    faq: [
      [
        'Neemt Beurswatcher nieuws van andere websites over?',
        'Nee. De site biedt eigen uitleg en verdieping. Bronlinks bij marktgegevens verwijzen naar de herkomst van die gegevens.',
      ],
      [
        'Zijn de kalenderdata al gepubliceerde uitslagen?',
        'Nee. De macroagenda toont geselecteerde geplande momenten en vermeldt de controle-datum.',
      ],
    ],
  },
  belasting: {
    title: 'Belasting & vermogen',
    summary:
      'Fiscale regels kunnen invloed hebben op wat je overhoudt. Begin bij het juiste belastingjaar, de categorie van je vermogen en de grenzen van de berekening.',
    tool: 'box-3',
    sections: [
      [
        'Benoem eerst welke vraag je onderzoekt',
        'Belasting op vermogen, pensioenopbouw en een mogelijke invloed op toeslagen zijn verschillende vragen. Gebruik een antwoord over het ene onderwerp niet automatisch voor het andere.',
      ],
      [
        'Controleer jaar en persoonlijke situatie',
        'Bedragen, percentages en voorwaarden kunnen veranderen. Bewaar de officiële informatie die bij het onderzochte jaar hoort. Een algemeen voorbeeld houdt niet vanzelf rekening met partners, uitzonderingen of bijzondere bezittingen.',
      ],
      [
        'Gebruik de indicatie als voorbereiding',
        'De box 3-tool geeft een vereenvoudigde uitkomst binnen zijn aannames. Hij bepaalt geen toeslagrecht en rekent geen werkelijk rendement of complete aangifte uit. Verzamel bij een persoonlijke vraag de relevante gegevens en laat onduidelijkheden apart beoordelen.',
      ],
    ],
    checklist: [
      'Over welk belastingjaar gaat mijn vraag?',
      'Welke vermogenscategorie is van toepassing?',
      'Welke onderdelen neemt de tool niet mee?',
      'Welke officiële gegevens ontbreken nog?',
    ],
    faq: [
      [
        'Kan ik hiermee mijn toeslagen berekenen?',
        'Nee. Daarvoor gelden eigen regels en gegevens; de box 3-tool doet die berekening niet.',
      ],
      [
        'Waar controleer ik de gebruikte fiscale uitgangspunten?',
        'Bij de box 3-tool staat de verwijzing naar de Belastingdienst en het gebruikte jaar.',
      ],
    ],
  },
  beginnen: {
    title: 'Beginnen met beleggen',
    summary:
      'Een goede start begint bij je doel, je beschikbare geld en de tijd die je hebt. Begrijp eerst je keuzes en maak daarna pas een berekening of productvergelijking.',
    tool: 'rendement',
    sections: [
      [
        'Je uitgangspunt is je eigen situatie',
        'Breng vaste lasten, geplande uitgaven en je buffer in beeld. Geld dat je binnenkort nodig kunt hebben heeft een andere functie dan geld voor de lange termijn. Een calculator toetst je huishoudbudget niet.',
      ],
      [
        'Leer het verschil tussen product en plan',
        'Een aandeel geeft een belang in een onderneming. Een fonds kan meerdere beleggingen bevatten. Geen van beide vertelt vanzelf hoeveel risico bij jouw doel past. Schrijf eerst op waarom je wilt beleggen en wanneer je het geld verwacht te gebruiken.',
      ],
      [
        'Maak je eerste scenario controleerbaar',
        'Kies een startbedrag en maandinleg. Vergelijk de uitkomst bij verschillende looptijden en groeiaannames. Kijk naar de eigen inleg en besef dat een gladde grafiek de mogelijke verliezen onderweg niet toont.',
      ],
    ],
    checklist: [
      'Wat is het doel van dit geld?',
      'Welke uitgaven moet mijn buffer opvangen?',
      'Wanneer kan ik het bedrag nodig hebben?',
      'Wat betekent een verlies voor mijn plan?',
    ],
    faq: [
      [
        'Moet ik eerst een specifiek aandeel kiezen?',
        'Begin bij je doel en de eigenschappen die een belegging daarvoor moet hebben. Een productkeuze komt daarna.',
      ],
      [
        'Kan ik met een klein bedrag leren rekenen?',
        'Ja. De tools werken ook met kleine bedragen. Bij echte aankopen kunnen vaste kosten relatief zwaar wegen.',
      ],
    ],
  },
  etfs: {
    title: 'ETF’s begrijpen',
    summary:
      'Een ETF is een fonds dat op de beurs wordt verhandeld. Kijk verder dan de naam: de index, inhoud, kosten en risico’s bepalen wat je werkelijk onderzoekt.',
    tool: 'etf-kosten',
    sections: [
      [
        'Onderzoek de inhoud van het fonds',
        'Bekijk welke beleggingen erin zitten en hoe zwaar ze wegen. Veel posities betekenen niet automatisch dat landen, sectoren of ondernemingen gelijk verdeeld zijn. Controleer overlap als je meerdere fondsen combineert.',
      ],
      [
        'Vergelijk op dezelfde basis',
        'Noteer welke index wordt gevolgd, wat met uitkeringen gebeurt en welke valuta bij de cijfers hoort. Vergelijk geen koersrendement met een rendement waarin dividend al is verwerkt.',
      ],
      [
        'Maak kosten zichtbaar',
        'Lees de actuele productdocumenten en de kosten van je aanbieder. Gebruik de rekentool om het effect van jaarlijkse percentages te isoleren; gebruik die uitkomst niet als volledige vergelijking tussen fondsen.',
      ],
    ],
    checklist: [
      'Welke index en welke markt volgt het fonds?',
      'Hoe geconcentreerd zijn de grootste posities?',
      'Welke kosten vallen buiten het fondspercentage?',
      'Wat gebeurt er met dividend?',
    ],
    faq: [
      [
        'Is iedere ETF breed gespreid?',
        'Nee. Een fonds kan ook op een kleine sector of specifieke strategie zijn gericht.',
      ],
      [
        'Moet ik alleen naar het laagste percentage kijken?',
        'Nee. Begrijp eerst wat je koopt en vergelijk daarna kosten bij vergelijkbare eigenschappen.',
      ],
    ],
  },
  aandelen: {
    title: 'Aandelen & bedrijven',
    summary:
      'Een aandeel is meer dan een koersgrafiek. Begrijp hoe het bedrijf geld verdient, wat er kan veranderen en welke verwachtingen in de prijs kunnen zitten.',
    tool: 'rendement',
    sections: [
      [
        'Van bedrijfsmodel naar kasstroom',
        'Begin met klanten, producten en concurrenten. Onderzoek vervolgens of omzet ook leidt tot winst en geld dat daadwerkelijk binnenkomt. Boekhoudkundige winst en vrije kasstroom zijn verschillende begrippen.',
      ],
      [
        'De prijs hoort bij de analyse',
        'Een sterk bedrijf is niet tegen iedere prijs dezelfde belegging. Vergelijk aannames over groei en marges met de waardering, en beschrijf wat er mis kan gaan. Een enkel kengetal is geen complete analyse.',
      ],
      [
        'Maak je eigen onderzoek herhaalbaar',
        'Schrijf je hoofdredenen, onzekerheden en controlemomenten op. Gebruik nieuwe bedrijfsinformatie om die aannames te toetsen. Laat een losse koersbeweging niet automatisch je hele redenering vervangen.',
      ],
    ],
    checklist: [
      'Waar verdient het bedrijf geld mee?',
      'Hoe ontwikkelt de schuld zich?',
      'Welke groeiverwachting neem ik aan?',
      'Welke informatie zou mijn analyse veranderen?',
    ],
    faq: [
      [
        'Betekent een lagere koers dat een aandeel goedkoop is?',
        'Niet automatisch. Ook de vooruitzichten kunnen zijn verslechterd.',
      ],
      [
        'Zijn de rekentools een aandelenwaardering?',
        'Nee. Ze onderzoeken financiële scenario’s en bepalen geen koopprijs voor een onderneming.',
      ],
    ],
  },
  dividend: {
    title: 'Dividend & uitkeringen',
    summary:
      'Dividend is een uitkering aan aandeelhouders. Onderzoek het samen met koersontwikkeling en bekijk wat herbeleggen of apart houden in een scenario verandert.',
    tool: 'dividend',
    sections: [
      [
        'Een uitkering is geen losstaand rendement',
        'Beoordeel het totale resultaat van je belegging, inclusief koersbewegingen. Een uitkering kan samengaan met een lagere beurswaarde. Het dividendpercentage is daarom geen volledige maatstaf voor succes.',
      ],
      [
        'Kijk naar de houdbaarheid',
        'Onderzoek of de onderneming de uitkering kan dragen. Kasstroom, investeringen en schulden kunnen invloed hebben op toekomstige betalingen. Een vorig dividend is geen garantie voor het volgende.',
      ],
      [
        'Vergelijk dezelfde vermogensonderdelen',
        'Bij herbeleggen blijft de opbrengst belegd. Houd je de opbrengst apart, tel die dan mee naast de portefeuille. De tool doet dit automatisch als renteloos geld, vóór kosten en belasting.',
      ],
    ],
    checklist: [
      'Is het genoemde rendement inclusief dividend?',
      'Wat gebeurt er met ontvangen uitkeringen?',
      'Welke kosten spelen bij herbeleggen?',
      'Kan de uitkering worden verlaagd?',
    ],
    faq: [
      [
        'Is een hoog dividendpercentage altijd gunstig?',
        'Nee. Het kan ook samenhangen met een fors gedaalde koers of twijfel over toekomstige uitkeringen.',
      ],
      [
        'Kan de tool dividendbelasting doorrekenen?',
        'Deze dividendtool doet dat niet. De aannames en beperkingen staan bij de berekening.',
      ],
    ],
  },
  strategie: {
    title: 'Strategie & je beleggingsplan',
    summary:
      'Een strategie verbindt je doel met regels voor inleggen, risico en onderhoud. Het helpt wanneer je vooraf weet wat je doet als omstandigheden veranderen.',
    tool: 'lump-sum-dca',
    sections: [
      [
        'Maak je plan concreet',
        'Leg doel, horizon, beschikbare inleg en de functie van je buffer vast. Beschrijf welke schommelingen praktisch en emotioneel draaglijk zijn. Een plan dat je niet kunt volhouden is weinig bruikbaar.',
      ],
      [
        'Spreek af wanneer je opnieuw kijkt',
        'Kies vaste momenten om je aannames en verdeling te beoordelen. Veranderingen in inkomen of doel kunnen aanleiding zijn om eerder te kijken. Iedere beursdag een andere koers zien is op zichzelf geen nieuw plan.',
      ],
      [
        'Onderzoek timing met gelijke scenario’s',
        'Bij een reeds beschikbaar bedrag kun je ineens en gespreid instappen vergelijken. Houd bedrag en marktpad gelijk. Een illustratieve uitkomst bewijst niet welke route de toekomst zal winnen.',
      ],
    ],
    checklist: [
      'Welke regels kan ik daadwerkelijk volhouden?',
      'Wat doe ik bij een daling?',
      'Wanneer beoordeel ik mijn plan opnieuw?',
      'Welke aannames zijn nog onzeker?',
    ],
    faq: [
      [
        'Moet een strategie ingewikkeld zijn?',
        'Nee. Duidelijke, uitvoerbare regels zijn belangrijker dan veel stappen of producten.',
      ],
      [
        'Is maandelijks nieuw geld beleggen hetzelfde als een bedrag spreiden?',
        'Nee. Bij nieuw inkomen is het toekomstige geld nog niet beschikbaar. De timingtool onderzoekt een bedrag dat je al hebt.',
      ],
    ],
  },
  portfolio: {
    title: 'Je portefeuille in overzicht',
    summary:
      'Losse posities vormen samen één vermogen. Kijk naar hun gezamenlijke blootstelling, kosten en rol in je plan, niet alleen naar de namen in je app.',
    tool: 'etf-kosten',
    sections: [
      [
        'Kijk door producten heen',
        'Twee fondsen kunnen veel dezelfde ondernemingen bevatten. Bekijk de onderliggende verdeling en tel overlap mee. Het aantal regels op je rekening is geen maat voor echte spreiding.',
      ],
      [
        'Geef iedere positie een rol',
        'Benoem waarom een positie onderdeel is van je portefeuille. Als twee producten precies hetzelfde doel hebben, onderzoek dan of die combinatie iets toevoegt of vooral onderhoud vraagt.',
      ],
      [
        'Onderhoud met een reden',
        'Door koersbewegingen verandert de verdeling. Herbalanceren betekent die verdeling opnieuw afstemmen op je gekozen uitgangspunt. Weeg eventuele transactiekosten en fiscale gevolgen mee voordat je handelt.',
      ],
    ],
    checklist: [
      'Welke risico’s komen in meerdere posities terug?',
      'Wat zijn mijn grootste concentraties?',
      'Welke kosten betaal ik over het totaal?',
      'Wanneer wijkt de verdeling van mijn plan af?',
    ],
    faq: [
      [
        'Betekenen meer fondsen altijd meer spreiding?',
        'Nee. Verschillende fondsen kunnen grotendeels dezelfde inhoud hebben.',
      ],
      [
        'Kan Beurswatcher mijn rekening inlezen?',
        'De huidige tools werken met bedragen die je zelf invult. Ze halen je persoonlijke portefeuille niet op.',
      ],
    ],
  },
  vermogen: {
    title: 'Sparen & vermogen opbouwen',
    summary:
      'Geef je geld een bestemming: een buffer, een concreet doel of opbouw voor later. Tijd, inleg, koopkracht en kosten maken samen het verschil.',
    tool: 'doelvermogen',
    sections: [
      [
        'Werk met verschillende tijdshorizonten',
        'Zet geld voor onverwachte uitgaven apart van geld voor een doel met een lange looptijd. Een totaalbedrag kan meerdere functies hebben, elk met een andere behoefte aan beschikbaarheid.',
      ],
      [
        'Maak het doel meetbaar',
        'Kies bedrag en einddatum. Reken vervolgens terug naar een maandbedrag en toets dat aan je budget. Verander een onhaalbaar doel niet alleen door een optimistischer rendement in te vullen.',
      ],
      [
        'Denk in koopkracht',
        'Een toekomstig saldo vertelt niet wat je ermee kunt kopen. Gebruik de inflatietool om dat verschil te begrijpen en houd kosten en fiscale aspecten apart in je afweging.',
      ],
    ],
    checklist: [
      'Welk deel moet direct beschikbaar zijn?',
      'Wat is mijn doelbedrag en einddatum?',
      'Is het doel in euro’s van nu of later?',
      'Kan ik de maandinleg volhouden?',
    ],
    faq: [
      [
        'Is vermogen hetzelfde als besteedbaar geld?',
        'Nee. Bezittingen kunnen vastzitten, schommelen of pas later beschikbaar komen.',
      ],
      [
        'Welk bedrag betekent financiële vrijheid?',
        'Dat is persoonlijk en hangt onder meer af van uitgaven, andere inkomsten en de periode die je wilt overbruggen.',
      ],
    ],
  },
  pensioen: {
    title: 'Pensioen & later',
    summary:
      'Begin bij je verwachte inkomsten en uitgaven voor later. Een losse vermogensberekening helpt een doel onderzoeken, maar is geen complete pensioenplanning.',
    tool: 'doelvermogen',
    sections: [
      [
        'Verzamel het bestaande overzicht',
        'Bekijk de informatie van je pensioenuitvoerders en je persoonlijke pensioenoverzicht. Noteer welke bedragen verwacht zijn, vanaf wanneer ze ingaan en welke onzekerheden erbij horen.',
      ],
      [
        'Vergelijk inkomsten en uitgaven',
        'Werk met eenzelfde prijsniveau en periode. Een maandbedrag van nu past niet zonder toelichting naast een bedrag in toekomstige euro’s. Neem mogelijke veranderingen in wonen en huishouden mee.',
      ],
      [
        'Houd productvoorwaarden apart',
        'Vrij belegbaar vermogen en een pensioenproduct kunnen sterk verschillen in beschikbaarheid en fiscale behandeling. De doelvermogentool berekent geen jaarruimte, aftrek of pensioenuitkering. Controleer die onderdelen afzonderlijk.',
      ],
    ],
    checklist: [
      'Welke inkomsten verwacht ik en vanaf wanneer?',
      'Welke uitgaven wil ik kunnen betalen?',
      'Hoe is inflatie in de bedragen verwerkt?',
      'Welke voorwaarden gelden bij aanvullend opbouwen?',
    ],
    faq: [
      [
        'Berekent deze website mijn jaarruimte?',
        'Nee. Gebruik daarvoor actuele officiële informatie of een passende persoonlijke berekening.',
      ],
      [
        'Kan ik de doelvermogentool toch gebruiken?',
        'Ja, voor een afgebakend vermogensdoel. De tool vervangt geen pensioen- of fiscale planning.',
      ],
    ],
  },
  zakelijk: {
    title: 'Zakelijk vermogen',
    summary:
      'Een zakelijk saldo kan nodig zijn voor belastingen, werkkapitaal of investeringen. Onderzoek eerst wat werkelijk vrij beschikbaar is voordat je naar rendement kijkt.',
    tool: 'rendement',
    sections: [
      [
        'Scheid verplichtingen en vrije ruimte',
        'Maak een planning van verwachte ontvangsten en betalingen. Een hoog saldo op één dag zegt weinig over het bedrag dat de onderneming later kan missen.',
      ],
      [
        'Benoem de horizon van iedere reservering',
        'Geld voor een machine volgend jaar heeft een andere rol dan vermogen zonder directe bestemming. Neem ook tegenvallende inkomsten en onverwachte uitgaven in het overzicht op.',
      ],
      [
        'Laat structuur en belasting apart beoordelen',
        'De gevolgen verschillen per rechtsvorm en situatie. De algemene rekentools houden geen rekening met vennootschapsbelasting, uitkeringen naar privé of andere ondernemingsspecifieke voorwaarden.',
      ],
    ],
    checklist: [
      'Welke betalingen liggen al vast?',
      'Wat gebeurt er bij tijdelijk lagere omzet?',
      'Welk bedrag is werkelijk langdurig beschikbaar?',
      'Welke fiscale en juridische voorwaarden gelden?',
    ],
    faq: [
      [
        'Is de rendementtool een zakelijk advies?',
        'Nee. Hij laat een bedrag groeien volgens ingevulde aannames en kent de onderneming niet.',
      ],
      [
        'Is een zakelijk beleggingsaccount voldoende voor de afweging?',
        'Nee. De rekening is slechts een middel; liquiditeit, doel en voorwaarden moeten eerst duidelijk zijn.',
      ],
    ],
  },
  reizen: {
    title: 'Reizen & kaartvoordelen',
    summary:
      'Een voordeel heeft pas waarde als je het daadwerkelijk gebruikt. Vergelijk kaartkosten en voorwaarden met je bestaande reisgedrag en uitgaven.',
    tool: 'inflatie',
    sections: [
      [
        'Reken vanuit je bestaande gebruik',
        'Maak een lijst van voordelen waarvoor je anders echt zou betalen. Een theoretische winkelwaarde is niet automatisch een persoonlijke besparing. Extra uitgeven om een voordeel te benutten kan het resultaat omdraaien.',
      ],
      [
        'Controleer de voorwaarden',
        'Let op geldigheid, beschikbaarheid, uitsluitingen en mogelijke bijbetalingen. Punten en miles kunnen veranderen in waarde; een vast eurobedrag is zonder concrete inwisseling moeilijk te onderbouwen.',
      ],
      [
        'Zet jaarlijkse kosten ernaast',
        'Vergelijk de werkelijk bruikbare voordelen met de vaste en variabele kosten. Deze website geeft algemene uitleg en productinformatie; persoonlijke ervaringen van Daniel worden pas toegevoegd wanneer hij ze heeft aangeleverd.',
      ],
    ],
    checklist: [
      'Zou ik dit voordeel zonder kaart ook gebruiken?',
      'Welke kosten maak ik extra?',
      'Wat zijn de belangrijkste voorwaarden?',
      'Blijft de vergelijking gunstig zonder welkomstactie?',
    ],
    faq: [
      [
        'Zijn punten hetzelfde als geld?',
        'Niet zonder meer. Waarde en bruikbaarheid hangen af van de inwisselmogelijkheden en voorwaarden.',
      ],
      [
        'Zijn alle voordelen persoonlijke ervaringen van Daniel?',
        'Nee. Algemene productinformatie en eigen ervaringen zijn verschillende soorten inhoud.',
      ],
    ],
  },
};

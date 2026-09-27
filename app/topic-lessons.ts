export type TopicLesson = {
  sections: [string, string][];
  example: { title: string; body: string; figures: [string, string][] };
  comparison: { title: string; rows: [string, string][] };
  sources: [string, string][];
  faq: [string, string][];
};

const afm = [
  'AFM · kosten van beleggen',
  'https://www.afm.nl/nl-nl/consumenten/themas/zelf-beleggen/wat-kost-beleggen',
] as [string, string];
const stocks = [
  'Investor.gov · aandelen',
  'https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks',
] as [string, string];
const etfSource = [
  'Investor.gov · ETF’s',
  'https://www.investor.gov/introduction-investing/investing-basics/investment-products/mutual-funds-and-exchange-traded-2',
] as [string, string];
const tax = [
  'Belastingdienst · box 3 in 2026',
  'https://www.belastingdienst.nl/wps/wcm/connect/nl/box-3/content/berekening-box-3-inkomen-2026',
] as [string, string];
const actualTax = [
  'Belastingdienst · werkelijk rendement',
  'https://www.belastingdienst.nl/wps/wcm/connect/nl/box-3/content/wat-is-mijn-werkelijk-rendement',
] as [string, string];
const pension = [
  'Rijksoverheid · opbouw pensioenstelsel',
  'https://www.rijksoverheid.nl/themas/werk/pensioen/opbouw-pensioenstelsel',
] as [string, string];
const annuity = [
  'Belastingdienst · lijfrentepremies aftrekken',
  'https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/lijfrente/aftrekken-lijfrentepremies/',
] as [string, string];
const dnb = [
  'DNB · depositogarantie',
  'https://www.dnb.nl/betrouwbare-financiele-sector/nederlandse-depositogarantie/vragen-nederlandse-depositogarantie/',
] as [string, string];

export const topicLessons: Record<string, TopicLesson> = {
  dividend: {
    sections: [
      [
        'Waar dividend vandaan komt',
        'Dividend is geld of een andere uitkering die een onderneming aan aandeelhouders beschikbaar stelt. De uitkering is niet verplicht alleen omdat vorig jaar ook werd betaald. Een bedrijf moet afwegen wat nodig is voor investeringen, verplichtingen en financiële ruimte.\n\nBij het beoordelen van dividend begin je daarom bij het bedrijf. Is de winst terugkerend, komt er voldoende cash binnen en welke investeringen zijn noodzakelijk? Een uitkering uit een incidentele verkoop heeft een andere betekenis dan een betaling die door de gewone bedrijfsactiviteiten kan worden gedragen.',
      ],
      [
        'Een hoog dividendrendement kan een waarschuwingssignaal zijn',
        'Het dividendrendement is de uitkering per aandeel gedeeld door de koers. Gebruik je het laatst betaalde dividend, dan kijk je achteruit. Gebruik je een verwachte uitkering, dan reken je met een schatting. De twee percentages zijn niet zomaar uitwisselbaar.\n\nEen dalende koers kan het berekende percentage verhogen zonder dat het bedrijf meer uitkeert. Mogelijk verwacht de markt juist dat de uitkering onder druk komt. Kijk daarom naar dekking door winst en kasstroom, de schuldpositie en toekomstige financieringsbehoeften. Een hoog percentage op zichzelf is geen bewijs van veiligheid.',
      ],
      [
        'Waarom dividend geen gratis extra vermogen is',
        'Wanneer een onderneming cash uitkeert, verdwijnt die cash uit de onderneming en komt zij bij de aandeelhouder terecht. Op de ex-dividenddatum wordt een aandeel zonder recht op die eerstvolgende uitkering verhandeld. Onder verder gelijke omstandigheden past de waarde zich aan. De werkelijke koers beweegt daarnaast door andere marktfactoren.\n\nVoor je resultaat kijk je daarom naar koersverandering plus ontvangen uitkeringen. Alleen naar de dividendbetaling kijken kan een verlies aan beurswaarde verbergen. Ook bij een uitkerende ETF moet je de uitgekeerde bedragen meenemen als je deze met een herbeleggende variant vergelijkt.',
      ],
      [
        'Herbeleggen en opnemen hebben verschillende doelen',
        'Bij herbeleggen koop je met de opbrengst nieuwe beleggingen. Daardoor blijft meer vermogen blootgesteld aan toekomstige koersbewegingen en uitkeringen. Dit kan samengestelde groei ondersteunen, maar vergroot ook het bedrag dat bij een daling geraakt kan worden.\n\nGebruik je dividend voor uitgaven, dan heeft het geld een andere functie. Houd je het apart op een rekening, tel dat geld mee wanneer je de totale vermogensontwikkeling vergelijkt. Anders vergelijk je een portefeuille inclusief herbelegde opbrengsten met een portefeuille waarbij de opbrengsten ten onrechte buiten beeld blijven.',
      ],
      [
        'Vergelijk netto en met dezelfde aannames',
        'Transactiekosten bij herbeleggen en belasting kunnen de ontvangen of herbelegde bedragen veranderen. Het precieze fiscale resultaat hangt af van de belegging en je situatie. Neem niet aan dat iedere bruto uitkering volledig beschikbaar is voor een nieuwe aankoop.\n\nDe dividendtool vergelijkt een vereenvoudigd scenario met herbeleggen en een scenario met renteloos apart gehouden uitkeringen. Hij modelleert geen toekomstige dividendbesluiten of persoonlijke belasting. Gebruik de uitkomst om het mechanisme te begrijpen en toets de concrete productgegevens apart.',
      ],
    ],
    example: {
      title: 'De uitkering stijgt niet, het percentage wel',
      body: 'Een fictief aandeel betaalt € 3 dividend bij een koers van € 60: dat is 5%. Daalt de koers naar € 40 en gebruik je dezelfde uitkering, dan staat er 7,5%. Je krijgt nog steeds € 3 per aandeel, voor zover die uitkering wordt gehandhaafd. De hogere verhouding is in dit voorbeeld het gevolg van de lagere koers.',
      figures: [
        ['€ 3', 'gebruikte jaaruitkering'],
        ['5%', 'bij een koers van € 60'],
        ['7,5%', 'bij een koers van € 40'],
      ],
    },
    comparison: {
      title: 'Drie begrippen die je uit elkaar houdt',
      rows: [
        [
          'Dividend per aandeel',
          'Het bedrag van de uitkering; historisch, vastgesteld of verwacht.',
        ],
        [
          'Dividendrendement',
          'De verhouding tussen die uitkering en de gekozen koers.',
        ],
        [
          'Totaalrendement',
          'Koersverandering en uitkeringen samen, met duidelijke afspraken over kosten en belasting.',
        ],
      ],
    },
    sources: [
      stocks,
      [
        'Investor.gov · dividenddatum',
        'https://www.investor.gov/introduction-investing/investing-basics/glossary/ex-dividend-dates',
      ],
    ],
    faq: [
      [
        'Kan dividend worden verlaagd?',
        'Ja. De financiële situatie en besluiten van de onderneming kunnen veranderen. Een lange reeks betalingen garandeert geen volgende uitkering.',
      ],
      [
        'Is een dividendbelegging hetzelfde als een spaarrekening?',
        'Nee. Zowel de beurswaarde als toekomstige uitkeringen kunnen veranderen. Een uitkeringsritme maakt de hoofdsom niet gegarandeerd.',
      ],
      [
        'Waarom telt de tool apart gehouden cash mee?',
        'Omdat die cash ook onderdeel is van je resultaat zolang je het niet hebt uitgegeven. Alleen portefeuillewaarden vergelijken zou de opgenomen uitkeringen negeren.',
      ],
    ],
  },
  portfolio: {
    sections: [
      [
        'Kijk naar het geheel achter de losse posities',
        'Een portefeuille is de combinatie van je beleggingen. Om die te begrijpen, kijk je verder dan het aantal regels in je app. Een fonds kan veel bedrijven bevatten, terwijl verschillende fondsen juist dezelfde grootste posities delen.\n\nMaak een overzicht van de waarde per positie en bereken het percentage van het totaal. Bekijk vervolgens de onderliggende landen, sectoren, valuta en soorten beleggingen. Zo ontdek je of je werkelijk verschillende bronnen van risico hebt of vooral dezelfde blootstelling in meerdere verpakkingen.',
      ],
      [
        'Geef iedere positie een aantoonbare rol',
        'Een positie kan bedoeld zijn als brede basis, als een specifieke aanvulling of voor een andere looptijd. Schrijf die rol op. Als je niet kunt uitleggen wat een extra fonds toevoegt, is het moeilijk te beoordelen of de extra kosten en het onderhoud gerechtvaardigd zijn.\n\nNeem ook inkomen en andere bezittingen mee in je totaalbeeld. Een onderneming, woning en aandelen van je werkgever kunnen risico’s toevoegen die in het portefeuilleoverzicht niet zichtbaar zijn. Het gaat niet alleen om wat beweegt in de brokerapp, maar om wat er gebeurt als meerdere onderdelen tegelijk tegenvallen.',
      ],
      [
        'Bereken kosten gewogen, niet als simpel gemiddelde',
        'Een fonds waarin 80% van je belegde bedrag zit, telt zwaarder mee dan een fonds met 20%. Bereken doorlopende percentages daarom met de werkelijke vermogensgewichten. Vaste rekeningkosten en transactiekosten voeg je afzonderlijk toe.\n\nOok rendementscijfers vragen om een consistente vergelijking. Een absolute toename van het saldo kan door nieuwe stortingen komen. Gebruik voor een beoordeling van de beleggingen cijfers die geldstromen op een passende manier verwerken en vergelijk dezelfde periode, valuta en behandeling van uitkeringen.',
      ],
      [
        'Onderhoud begint bij de afgesproken verdeling',
        'Door koersbewegingen kan de portefeuille verschuiven. De vraag is dan niet alleen welke positie het goed heeft gedaan, maar of het totale risico nog bij je doel past. Een sterk gegroeid onderdeel kan een groter deel van mogelijke toekomstige verliezen bepalen.\n\nHerbalanceren brengt de verdeling terug naar een gekozen uitgangspunt. Dat kan soms met nieuwe inleg, zonder direct te verkopen. Onderzoek kosten en fiscale gevolgen van transacties en leg vast wanneer een afwijking groot genoeg is om te handelen. Het doel is beheersing van de verdeling, niet voorspellen welke positie morgen stijgt.',
      ],
      [
        'Maak je overzicht bruikbaar voor beslissingen',
        'Bewaar per positie de waarde, het gewicht, de rol, relevante kosten en de belangrijkste risico’s. Noteer daarnaast de peildatum. Een overzicht zonder datum combineert al snel bedragen die niet goed vergelijkbaar zijn.\n\nWerk met een vast controle­moment en voeg alleen informatie toe die je beslissing ondersteunt. Een dashboard met tientallen grafieken kan minder duidelijk zijn dan een korte tabel met de drie grootste concentraties. Beurswatcher leest je persoonlijke rekening niet in; de tools helpen specifieke vragen doorrekenen met je eigen invoer.',
      ],
    ],
    example: {
      title: 'Het gewogen kostenpercentage',
      body: 'Stel dat 80% van een portefeuille in een fonds met 0,20% jaarlijkse kosten zit en 20% in een fonds met 0,50%. Het gewogen percentage is 0,80 × 0,20% + 0,20 × 0,50% = 0,26%. Over een onveranderde waarde van € 10.000 is dat circa € 26 per jaar, exclusief andere kosten.',
      figures: [
        ['80% × 0,20%', 'eerste fonds'],
        ['20% × 0,50%', 'tweede fonds'],
        ['0,26%', 'gewogen percentage'],
      ],
    },
    comparison: {
      title: 'Van rekeningoverzicht naar portefeuilleoverzicht',
      rows: [
        [
          'Wat bezit ik?',
          'De waarde en het gewicht van iedere positie op dezelfde peildatum.',
        ],
        [
          'Waar ben ik van afhankelijk?',
          'Onderliggende bedrijven, sectoren, regio’s en de samenhang met je inkomen.',
        ],
        [
          'Wat vraagt onderhoud?',
          'Afwijkingen van de gewenste verdeling, totale kosten en veranderde doelen.',
        ],
      ],
    },
    sources: [
      afm,
      [
        'Investor.gov · vermogensverdeling',
        'https://www.investor.gov/introduction-investing/getting-started/asset-allocation',
      ],
    ],
    faq: [
      [
        'Hoeveel posities zijn genoeg?',
        'Er is geen magisch aantal. De inhoud en onderlinge overlap bepalen veel meer dan het aantal namen. Eén breed fonds kan meer spreiden dan meerdere smalle fondsen.',
      ],
      [
        'Moet ik winnaars altijd verkopen bij herbalanceren?',
        'Niet automatisch. Je kijkt naar de gewenste verdeling en kunt soms nieuwe inleg gebruiken. Het gaat om de rol en het gewicht van een positie, niet om een los label winnaar of verliezer.',
      ],
      [
        'Waarom wijkt mijn saldoverandering af van mijn rendement?',
        'Stortingen en opnamen veranderen het saldo ook. Een groter saldo kan grotendeels uit eigen inleg bestaan; een passende rendementsberekening houdt rekening met geldstromen.',
      ],
    ],
  },
  'markt-economie': {
    sections: [
      [
        'Wat vertellen inflatie, groei en werkgelegenheid?',
        'Inflatie beschrijft de verandering van een prijsniveau. Een daling van 4% naar 2% betekent dat prijzen gemiddeld minder snel stijgen; het betekent niet dat het eerdere prijsniveau terugkeert. Economische groei gaat over de productie van goederen en diensten. Bij reële groei is het effect van prijsveranderingen uit de vergelijking gehaald.\n\nWerkgelegenheid geeft weer een ander stukje van het beeld. Meer banen kunnen wijzen op een sterke vraag, terwijl stijgende werkloosheid juist op verzwakking kan wijzen. Geen van deze cijfers beschrijft de hele economie. Samen helpen ze begrijpen of consumenten en bedrijven meer ruimte krijgen, of juist onder druk staan.',
      ],
      [
        'Waarom reageert de beurs soms anders dan je verwacht?',
        'Een beurskoers weerspiegelt ook verwachtingen over de toekomst. Daardoor kan een op zichzelf goed cijfer toch tegenvallen als beleggers op een nog sterkere uitkomst rekenden. Omgekeerd kan een zwak cijfer meevallen ten opzichte van een sombere verwachting.\n\nMaak bij een publicatie onderscheid tussen de vorige uitkomst, de verwachte uitkomst en het nieuwe cijfer. Controleer of het vorige cijfer is herzien. Een vergelijking met een oude, inmiddels aangepaste uitkomst kan een verkeerd beeld geven. Een koersreactie bewijst bovendien niet dat één cijfer de enige oorzaak was: rente, bedrijfsnieuws en positionering kunnen tegelijk veranderen.',
      ],
      [
        'Hoe rente doorwerkt naar bedrijven en beleggingen',
        'Rente is de prijs van lenen en een vergoeding voor uitlenen. Een hogere rente kan financiering duurder maken voor een onderneming die nieuwe schuld nodig heeft. Dat effect is anders bij een bedrijf met veel cash of lang vastgezette leningen. Huishoudens kunnen ondertussen minder ruimte krijgen om te besteden.\n\nBeleggers vergelijken daarnaast toekomstige opbrengsten met alternatieven die rente geven. Verandert de vereiste vergoeding, dan verandert ook wat zij vandaag voor toekomstige kasstromen willen betalen. Dat is een reden waarom rente en waarderingen samen kunnen bewegen. Het is geen vaste regel dat iedere renteverlaging aandelen laat stijgen: de reden voor de verlaging doet ertoe.',
      ],
      [
        'Lees de periode voordat je de conclusie leest',
        'Een stijging ten opzichte van vorige maand is een andere vergelijking dan een stijging ten opzichte van dezelfde maand vorig jaar. Een jaarcijfer kan afnemen doordat een uitzonderlijk hoge maand uit de vergelijking valt. De nieuwste maand hoeft dan niet ineens goedkoop te zijn geworden.\n\nSeizoenscorrectie probeert terugkerende patronen, zoals vakanties of jaarlijkse prijsmomenten, uit een reeks te halen. Vergelijk daarom dezelfde maatstaf en noteer welke definitie je gebruikt. Voor Nederland zijn CBS-publicaties een vertrekpunt; bij Amerikaanse inflatie en arbeidsmarktgegevens is dat onder meer het BLS.',
      ],
      [
        'Van macrofeit naar een vraag over je plan',
        'Begin niet met de vraag welk aandeel je bij het volgende cijfer moet kopen. Onderzoek eerst welke aanname wordt geraakt: je koopkracht, de financieringslasten van een bedrijf of de tijd die je hebt om een doel te halen. Dat maakt het nieuws bruikbaar zonder dat ieder bericht een transactie wordt.\n\nBij een eigen analyse hoort een controleerbare redenering: dit is gepubliceerd, dit zou het kunnen betekenen, dit is nog onzeker. De macroagenda op Beurswatcher laat geselecteerde geplande momenten voor Nederland en de VS zien. Een geplande publicatie is nog geen uitslag en de agenda is geen complete automatische datastroom.',
      ],
    ],
    example: {
      title: 'Minder inflatie, toch hogere prijzen',
      body: 'Een fictief boodschappenmandje kost eerst € 100. Na 4% inflatie kost het € 104. Stijgen de prijzen het jaar daarna met 2%, dan wordt het € 106,08. De inflatie is gehalveerd, maar het mandje is opnieuw duurder. Dit onderscheid helpt voorkomen dat een lagere inflatieverwachting wordt gelezen als een prijsdaling.',
      figures: [
        ['€ 100', 'startprijs'],
        ['€ 104', 'na 4%'],
        ['€ 106,08', 'daarna nog 2%'],
      ],
    },
    comparison: {
      title: 'Drie cijfers naast elkaar',
      rows: [
        [
          'Vorige uitkomst',
          'Wat eerder werd gemeten. Controleer revisies voordat je vergelijkt.',
        ],
        [
          'Verwachting',
          'Een schatting vooraf, met onzekerheid. Niet hetzelfde als de officiële publicatie.',
        ],
        [
          'Nieuwe uitkomst',
          'De gepubliceerde meting. Lees land, periode, eenheid en definitie erbij.',
        ],
      ],
    },
    sources: [
      [
        'BLS · prijsindex en meetmethoden',
        'https://www.bls.gov/cpi/questions-and-answers.htm',
      ],
      [
        'BLS · seizoenscorrectie',
        'https://www.bls.gov/cpi/seasonal-adjustment/questions-and-answers.htm',
      ],
      [
        'ECB · monetair beleid',
        'https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me/html/what-is-monetary-policy.en.html',
      ],
    ],
    faq: [
      [
        'Waarom staan de VS in een Nederlandse agenda?',
        'Amerikaanse economische cijfers kunnen verwachtingen over rente, valuta en internationale bedrijven beïnvloeden. Een belegging die je in euro’s koopt, kan nog steeds veel blootstelling aan de Amerikaanse economie hebben.',
      ],
      [
        'Is een recessie hetzelfde als een dalende beurs?',
        'Nee. Een recessie beschrijft economische activiteit; een beurskoers is een prijs die ook op verwachtingen reageert. De markt kan al dalen vóór zwakke cijfers verschijnen, of herstellen terwijl de gepubliceerde economie nog zwak is.',
      ],
      [
        'Kan ik aan één inflatiecijfer zien wat de rente gaat doen?',
        'Nee. Centrale banken kijken naar meerdere gegevens en verwachtingen. Ook de samenstelling en hardnekkigheid van inflatie spelen mee. Maak van één publicatie geen zekere voorspelling.',
      ],
    ],
  },
  belasting: {
    sections: [
      [
        'Waarom je eerst de juiste belastingbox bepaalt',
        'In Nederland worden verschillende soorten inkomen verschillend behandeld. Box 1 gaat onder meer over werk en de eigen woning. Box 2 gaat over inkomen uit een aanmerkelijk belang, bijvoorbeeld een voldoende groot aandelenbelang in een eigen bv. Box 3 gaat over sparen en beleggen voor zover bezittingen en schulden daar fiscaal thuishoren.\n\nDaarom kun je een uitkomst voor privébeleggingen niet zomaar gebruiken voor geld in een bv, een eigen woning of een kwalificerende lijfrente. De naam van de rekening vertelt niet altijd het hele verhaal. De juridische eigenaar, het product en het belastingjaar bepalen welke regels je moet onderzoeken.',
      ],
      [
        'Wat een forfaitaire box 3-berekening doet',
        'Een forfait is een voorgeschreven rekenaanname. De box 3-indicatie op deze website onderscheidt spaargeld, overige bezittingen en relevante schulden en gebruikt de instellingen voor het vermelde jaar. Vervolgens spelen onder meer de schuldendrempel en het heffingsvrije vermogen mee. Het belastingtarief wordt toegepast op het berekende voordeel, niet simpelweg op je volledige banksaldo.\n\nVoor deze berekening is de samenstelling van het vermogen op de peildatum relevant. Bewaar jaaroverzichten en controleer welke bedragen al zijn ingevuld. De voorbeeldtool behandelt geen volledige aangifte en bijzondere situaties kunnen een andere uitwerking hebben.',
      ],
      [
        'Werkelijk rendement is meer dan ontvangen rente',
        'Naast de forfaitaire berekening kan de tegenbewijsregeling relevant zijn wanneer het werkelijk rendement lager is. Werkelijk rendement omvat volgens de Belastingdienst niet alleen ontvangen inkomsten, maar ook waardeveranderingen. Een aandeel hoeft dus niet verkocht te zijn voordat de verandering van waarde kan meetellen.\n\nDe fiscale definitie is niet automatisch hetzelfde als het rendementscijfer in je brokerapp. Stortingen, onttrekkingen, verschillende bezittingen en de regels voor het onderzochte jaar vragen om een eigen berekening. De Beurswatcher-tool berekent deze route niet. Gebruik de officiële uitleg om te bepalen welke administratie je nodig hebt.',
      ],
      [
        'Vrijstellingen, toeslagen en pensioen zijn aparte vragen',
        'Heffingsvrij vermogen in box 3 betekent niet dat hetzelfde bedrag zonder gevolgen geldt voor iedere toeslag. Toeslagen kennen eigen vermogensgrenzen en voorwaarden. Ook een fiscale partner kan invloed hebben op wat je gezamenlijk moet beoordelen.\n\nEen aftrekbare lijfrentestorting heeft weer een ander doel en andere regels. Fiscaal voordeel hangt samen met beschikbare aftrekruimte en productvoorwaarden; het is geen algemene korting op ieder bedrag dat je opzijzet. Maak daarom een onderscheid tussen belasting verminderen, geld beschikbaar houden en vermogen voor later opbouwen.',
      ],
      [
        'Zo bereid je een bruikbare berekening voor',
        'Verzamel het belastingjaar, de jaaroverzichten van rekeningen en beleggingen, gegevens over relevante schulden en eventuele andere bezittingen. Leg vast welke bedragen je bruto gebruikt en welke posten je al hebt uitgesloten. Daarmee kun je controleren of dezelfde post niet tweemaal meetelt.\n\nVergelijk vervolgens de tooluitkomst met de officiële berekenwijze voor dat jaar. Noteer wat niet is verwerkt, zoals werkelijk rendement, specifieke uitzonderingen of gevolgen voor toeslagen. Het nuttige resultaat is een begrijpelijke indicatie plus een gerichte vervolgvraag; niet een schijnbaar exact bedrag waarvan de uitgangspunten ontbreken.',
      ],
    ],
    example: {
      title: 'Een storting is geen beleggingswinst',
      body: 'Een portefeuille begint op € 20.000. Je stort gedurende het jaar € 5.000 en eindigt op € 26.000. Zonder uitkeringen of andere geldstromen is het verschil door waardeverandering € 1.000, niet € 6.000. Dit eenvoudige administratievoorbeeld is geen complete box 3-berekening, maar laat zien waarom je inleg apart moet vastleggen.',
      figures: [
        ['€ 20.000', 'beginwaarde'],
        ['€ 5.000', 'eigen storting'],
        ['€ 1.000', 'waardeverandering'],
      ],
    },
    comparison: {
      title: 'Welke vraag hoort waar?',
      rows: [
        [
          'Forfaitaire indicatie',
          'Rekenen met de vermogensverdeling, drempels en percentages van het betreffende jaar.',
        ],
        [
          'Werkelijk rendement',
          'Onderzoeken welke inkomsten en waardeveranderingen onder de fiscale definitie vallen.',
        ],
        [
          'Toeslagen of lijfrente',
          'Een afzonderlijke berekening met eigen voorwaarden; niet inbegrepen in de box 3-tool.',
        ],
      ],
    },
    sources: [tax, actualTax, annuity],
    faq: [
      [
        'Is het percentage in de tool mijn belastingpercentage over al mijn geld?',
        'Nee. Onderscheid het aangenomen rendement, het berekende belastbare voordeel en het belastingtarief. Het uiteindelijke bedrag hangt af van de hele berekening.',
      ],
      [
        'Kan ik de uitkomst gebruiken voor een ander belastingjaar?',
        'Niet zonder opnieuw te controleren. Percentages, drempels en regels kunnen wijzigen. Bij de calculator staat het gebruikte jaar; een oude uitkomst is geen actuele aangifteberekening.',
      ],
      [
        'Heb ik zonder verkoop geen werkelijk rendement?',
        'Dat volgt niet uit de fiscale definitie. Ook waardeveranderingen kunnen meetellen. Lees de officiële uitleg voor jouw vermogensbestanddelen en belastingjaar.',
      ],
    ],
  },
  beginnen: {
    sections: [
      [
        'Beleggen begint met geld een bestemming geven',
        'Sparen en beleggen dienen niet precies hetzelfde doel. Geld voor onverwachte uitgaven moet beschikbaar zijn als je het nodig hebt. Een belegging kan juist op dat moment minder waard zijn. Scheid daarom je noodbuffer en geplande aankopen van geld dat je voor een langer doel wilt inzetten.\n\nMaak je doel concreet: waarvoor is het bedrag, wanneer wil je het gebruiken en hoeveel ruimte heb je om die datum te verschuiven? Een vakantie volgend jaar vraagt een andere afweging dan vermogen voor over twintig jaar. Een lange horizon geeft meer tijd, maar neemt de kans op verlies niet weg.',
      ],
      [
        'Wat koop je eigenlijk?',
        'Met een aandeel neem je een belang in een onderneming. Je resultaat hangt samen met de waarde van dat belang en eventuele uitkeringen. Met een obligatie leen je geld uit aan een uitgever; afspraken over rente en aflossing maken de terugbetaling nog niet risicoloos.\n\nEen beleggingsfonds bundelt geld voor meerdere beleggingen. Een ETF is een fonds dat op de beurs wordt verhandeld. Het fonds kan bijvoorbeeld aandelen of obligaties bevatten, maar ook op een smal thema gericht zijn. Het productetiket is dus pas het begin: de onderliggende beleggingen bepalen veel van het risico.',
      ],
      [
        'Spreiding beschermt niet tegen iedere daling',
        'Als je al je geld in één bedrijf belegt, kan een tegenvaller bij dat bedrijf een groot deel van je vermogen raken. Spreiding over ondernemingen, sectoren en regio’s kan die afhankelijkheid verkleinen. Toch kunnen veel beleggingen tegelijk dalen, bijvoorbeeld wanneer financiering duurder wordt of de economie verslechtert.\n\nKijk ook naar risico buiten je beleggingsrekening. Wie werkt bij een bedrijf en veel aandelen van datzelfde bedrijf bezit, heeft inkomen en vermogen deels van dezelfde bron afhankelijk gemaakt. Een lijst met veel fondsnamen kan ondertussen weinig spreiding toevoegen wanneer die fondsen dezelfde ondernemingen bevatten.',
      ],
      [
        'Inleg, kosten en gedrag zijn concreter dan een voorspelling',
        'Je kunt vooraf bepalen hoeveel je inlegt, welke kosten je accepteert en wanneer je je plan evalueert. Het toekomstige rendement kun je niet vastzetten door een percentage in een calculator te kiezen. Maak daarom ook een scenario met minder groei en een scenario waarin je tijdelijk minder kunt inleggen.\n\nBij kleine aankopen verdienen vaste kosten extra aandacht. € 2 kosten op € 50 inleg is 4% van dat bedrag; op € 500 is het 0,4%. Dat zegt niet welke aanbieder je moet kiezen, maar maakt duidelijk waarom de kostenstructuur bij je manier van inleggen moet passen.',
      ],
      [
        'Van eerste aankoop naar een onderhoudbaar plan',
        'Schrijf vóór een aankoop op wat je koopt, waarom het in je plan past en welke risico’s je begrijpt. Lees de productinformatie en de tarieven van de aanbieder. Controleer bij de toezichthouder of de aanbieder de benodigde vergunning heeft; toezicht garandeert geen rendement.\n\nSpreek daarna met jezelf af wanneer je opnieuw kijkt. Een verandering in je inkomen, doel of noodzakelijke uitgaven is een goede reden om je plan te heroverwegen. Een rood dagcijfer alleen geeft nog geen antwoord op de vraag of je oorspronkelijke reden veranderd is.',
      ],
    ],
    example: {
      title: 'Wat doet een daling met jouw bedrag?',
      body: 'Een fictieve belegging van € 5.000 daalt 30% en is daarna € 3.500 waard. Om weer op € 5.000 te komen is vervolgens ongeveer 42,9% stijging nodig. Vraag vooraf wat je zou doen als je juist dan het geld nodig hebt. Dit rekensommetje maakt verlies concreter dan het label “gemiddeld risico”.',
      figures: [
        ['€ 5.000', 'beginwaarde'],
        ['€ 3.500', 'na 30% daling'],
        ['42,9%', 'nodig voor herstel'],
      ],
    },
    comparison: {
      title: 'Een eerste plan in drie regels',
      rows: [
        [
          'Doel & tijd',
          'Benoem waarvoor je opbouwt en wanneer beschikbaarheid belangrijk wordt.',
        ],
        [
          'Inleg & buffer',
          'Leg vast welk geld beschikbaar blijft en welk bedrag je kunt blijven missen.',
        ],
        [
          'Keuzes & onderhoud',
          'Beschrijf je spreiding, maximale kosten en vaste evaluatiemomenten.',
        ],
      ],
    },
    sources: [
      stocks,
      afm,
      [
        'AFM · praktische checklist',
        'https://www.afm.nl/en/consumenten/themas/zelf-beleggen/is-beleggen-iets-voor-jou/praktische-checklist-bij-beleggen',
      ],
    ],
    faq: [
      [
        'Met welk bedrag moet ik beginnen?',
        'Er is geen universeel startbedrag. Beschikbaarheid van een buffer, je budget, productminimum en kosten zijn bepalender dan een mooi rond bedrag. Oefenen met een berekening verplicht je niet om meteen te beleggen.',
      ],
      [
        'Is maandelijks beleggen altijd veiliger?',
        'Het verspreidt aankoopmomenten, maar maakt een risicovolle belegging niet veilig. Een langdurige daling kan ook een portefeuille met maandelijkse inleg raken.',
      ],
      [
        'Moet ik iedere dag mijn rekening bekijken?',
        'Dagelijks controleren is niet nodig om een langetermijnplan te hebben. Kies een ritme dat past bij je aanpak en let op relevante veranderingen in je situatie en beleggingen.',
      ],
    ],
  },
  etfs: {
    sections: [
      [
        'De ETF is de verpakking, de inhoud bepaalt je risico',
        'Een ETF bundelt beleggingen in een fonds waarvan je participaties op de beurs kunt verhandelen. Veel ETF’s volgen een index, maar er bestaan ook actief beheerde ETF’s. Een index legt volgens bepaalde regels vast welke beleggingen meetellen en hoe zwaar ze wegen.\n\nEen wereldwijd klinkende naam zegt niet dat ieder land vertegenwoordigd is. Een fonds kan ontwikkelde markten volgen en opkomende markten uitsluiten. Ook kleine ondernemingen kunnen ontbreken. Bekijk daarom de indexbeschrijving, landenverdeling en grootste posities voordat je twee fondsen als hetzelfde beschouwt.',
      ],
      [
        'Waarom honderden posities toch geconcentreerd kunnen zijn',
        'Bij een naar beurswaarde gewogen aandelenindex krijgen grote ondernemingen doorgaans een groter gewicht. Vijfhonderd posities betekent dan niet vijfhonderd gelijke stukjes. Een relatief kleine groep bedrijven kan een groot deel van het fonds bepalen.\n\nCombineer je een brede aandelen-ETF met een technologiefonds, dan voeg je mogelijk dezelfde grote bedrijven opnieuw toe. Dat kan een bewuste keuze zijn, maar is niet automatisch extra spreiding. Bereken de gezamenlijke weging: het percentage dat je in het fonds stopt vermenigvuldigd met het gewicht van de onderneming in dat fonds.',
      ],
      [
        'Uitkerend, herbeleggend en de betekenis van valuta',
        'Een uitkerende fondsvariant betaalt ontvangen opbrengsten volgens de fondsvoorwaarden uit. Een herbeleggende variant houdt die in het fonds. Bij vergelijken moet je daarom rekening houden met uitkeringen: alleen de koerslijnen naast elkaar zetten kan een scheef beeld geven.\n\nEen notering in euro’s verwijdert niet vanzelf valutarisico. De handelsvaluta, de rapportagevaluta van het fonds en de valuta van de onderliggende beleggingen zijn verschillende dingen. Een valuta-afgedekte variant probeert een omschreven deel van dat risico te beperken; die afdekking heeft eigen kenmerken en kosten. Lees wat daadwerkelijk wordt afgedekt.',
      ],
      [
        'Kijk verder dan alleen het kostenpercentage',
        'De doorlopende fondskosten worden in het fonds verwerkt. Daarnaast kun je bij je aanbieder te maken krijgen met transactiekosten, rekeningkosten of kosten voor het wisselen van valuta. De bied-laatspread is het verschil tussen de prijs waartegen je direct kunt kopen en verkopen.\n\nVergelijk ook hoe goed het fonds zijn doel volgt. Tracking difference is het rendementsverschil met de gevolgde index over een periode; tracking error beschrijft de beweeglijkheid van dat verschil. Dat zijn verschillende maatstaven. Vergelijk dezelfde periode, valuta en behandeling van dividend en trek kosten niet dubbel af van een al netto gerapporteerd rendement.',
      ],
      [
        'Een factsheet lezen in een vaste volgorde',
        'Begin bij doel en index, kijk vervolgens naar onderliggende posities, concentratie, uitkeringen en kosten. Controleer daarna de productstructuur: houdt het fonds beleggingen rechtstreeks aan, gebruikt het derivaten of een combinatie? Bij iedere werkwijze horen eigen aandachtspunten.\n\nLeg van twee kandidaten dezelfde kenmerken naast elkaar. Pas als je begrijpt of ze dezelfde markt en risico’s vertegenwoordigen, wordt een kostenvergelijking zinvol. De ETF-kostentool isoleert het effect van twee jaarlijkse percentages; hij kiest geen fonds en verwerkt niet automatisch de volledige tarievenlijst van je broker.',
      ],
    ],
    example: {
      title: 'Twee fondsen, dezelfde onderneming',
      body: 'Stel: 80% van je portefeuille zit in fonds A, waarin bedrijf X 5% weegt. De overige 20% zit in fonds B, waarin X 10% weegt. Je totale blootstelling is 80% × 5% + 20% × 10% = 6%. Het tweede fonds heeft de positie in X dus groter gemaakt. De percentages zijn fictief.',
      figures: [
        ['4%', 'via fonds A'],
        ['2%', 'via fonds B'],
        ['6%', 'bedrijf X in totaal'],
      ],
    },
    comparison: {
      title: 'Vergelijk deze kenmerken samen',
      rows: [
        [
          'Markt & index',
          'Welke landen, sectoren en bedrijfsgroottes doen wel of niet mee?',
        ],
        [
          'Uitkering & valuta',
          'Wat gebeurt er met opbrengsten en welk valutarisico houd je over?',
        ],
        [
          'Kosten & uitvoering',
          'Wat betaal je in het fonds én bij de aanbieder, en hoe wijkt het resultaat af van de index?',
        ],
      ],
    },
    sources: [etfSource, afm],
    faq: [
      [
        'Zijn alle ETF’s geschikt als brede basis?',
        'Nee. Een sectorfonds, hefboomproduct of sterk geconcentreerde strategie heeft andere eigenschappen dan een breed gespreid fonds. Het woord ETF alleen zegt daar weinig over.',
      ],
      [
        'Is herbeleggend altijd beter dan uitkerend?',
        'Niet voor ieder doel. Beschikbare kasstromen, mogelijke herbeleggingskosten en fiscale behandeling kunnen verschillen. Vergelijk het totale resultaat en de praktische rol in je eigen plan.',
      ],
      [
        'Waarom kan de beursprijs afwijken van de fondswaarde?',
        'Je handelt op de beurs tegen een marktprijs. Die kan boven of onder de waarde van de onderliggende beleggingen liggen. Liquiditeit en handelsomstandigheden spelen mee; bekijk de spread en productdocumenten.',
      ],
    ],
  },
  aandelen: {
    sections: [
      [
        'Van aandeelhouder naar bedrijfsmodel',
        'Een aandeel vertegenwoordigt een belang in een onderneming. Je belegt daarmee in toekomstige bedrijfsresultaten tegen de prijs die je vandaag betaalt. Begin dus bij hoe het bedrijf geld verdient: wie zijn de klanten, waarvoor betalen zij en waarom kiezen zij voor dit bedrijf?\n\nEen eenmalige verkoop, terugkerend abonnement en omzet uit grondstoffen reageren anders op de economie. Onderzoek afhankelijkheid van grote klanten, leveranciers en vergunningen. Een herkenbaar merk is een nuttig startpunt, maar vertelt nog niet hoe winstgevend de onderneming is of hoe sterk haar positie blijft.',
      ],
      [
        'Omzet is niet hetzelfde als winst of cash',
        'Omzet is de opbrengst uit verkopen. Daar gaan kosten vanaf voordat winst overblijft. De winstmarge laat zien welk deel van de omzet winst wordt, maar zegt zonder context weinig: een kapitaalintensieve fabriek heeft andere kosten dan een softwarebedrijf.\n\nWinst in de boekhouding is ook niet hetzelfde als geld op de rekening. Klanten kunnen later betalen, voorraden kunnen groeien en investeringen kunnen veel cash vragen. Kijk daarom naast de winst naar het kasstroomoverzicht. Vraag wat er na noodzakelijke investeringen overblijft en of dat geld beschikbaar is voor schuldafbouw, groei of uitkeringen.',
      ],
      [
        'Een goed bedrijf kan een dure belegging zijn',
        'De koers-winstverhouding deelt de prijs per aandeel door de winst per aandeel. Een verhouding van twintig betekent dat je twintig maal die gebruikte jaarwinst betaalt. Het is geen terugverdienbelofte en zonder positieve winst is het kengetal beperkt bruikbaar.\n\nVergelijk bedrijven met aandacht voor groei, schuld, marges en de kwaliteit van de winst. Een lage verhouding kan duiden op een aantrekkelijke prijs, maar ook op afnemende winst of een eenmalige meevaller. Bij een hoge verhouding kan al veel toekomstige groei zijn ingeprijsd. Onderzoek welke aanname nodig is om de prijs te rechtvaardigen.',
      ],
      [
        'Dividend is onderdeel van het totaal',
        'Dividend is een uitkering aan aandeelhouders. Het dividendrendement deelt de uitkering door de koers. Als de koers fors daalt terwijl de laatst betaalde uitkering gelijk blijft, loopt dat percentage op. Dat maakt een hoge uitkomst niet vanzelf aantrekkelijk.\n\nBeoordeel of de onderneming de uitkering kan dragen naast investeringen en schuldverplichtingen. Tel voor je eigen resultaat koersverandering en ontvangen dividend samen. Een grote uitkering die gepaard gaat met waardeverlies levert niet automatisch vermogensgroei op. Op de aparte dividendpagina lees je meer over uitkeren en herbeleggen.',
      ],
      [
        'Maak je analyse toetsbaar',
        'Noteer in gewone woorden waarom je een onderneming interessant vindt en welke twee of drie ontwikkelingen die redenering ondersteunen. Voeg toe wat je oordeel zou veranderen, zoals verlies van klanten, oplopende schuld of structureel lagere marges.\n\nGebruik jaarverslagen, tussentijdse cijfers en officiële bedrijfsmededelingen om die aannames te toetsen. Onderscheid terugkerende prestaties van eenmalige posten. Een calculator met een vast rendement vervangt deze analyse niet: hij laat zien wat een aanname rekenkundig doet, maar niet of het bedrijf die aanname waarmaakt.',
      ],
    ],
    example: {
      title: 'Lagere koers, toch dezelfde waardering',
      body: 'Een fictief aandeel kost € 50 en verdient € 2,50 per aandeel: de koers-winstverhouding is 20. Later daalt de koers naar € 40, maar ook de jaarwinst naar € 2. De verhouding blijft 20. De koers is 20% lager, maar ten opzichte van die winst is het aandeel niet goedkoper geworden.',
      figures: [
        ['€ 50 / € 2,50', 'eerst: 20 maal winst'],
        ['€ 40 / € 2', 'later: 20 maal winst'],
        ['−20%', 'koers én winst'],
      ],
    },
    comparison: {
      title: 'Drie vragen aan de jaarcijfers',
      rows: [
        [
          'Resultatenrekening',
          'Groeit de omzet winstgevend en welke posten zijn eenmalig?',
        ],
        [
          'Balans',
          'Hoeveel schuld, cash en andere verplichtingen staan tegenover de bezittingen?',
        ],
        [
          'Kasstroomoverzicht',
          'Komt de winst ook als geld binnen en hoeveel daarvan is nodig voor investeringen?',
        ],
      ],
    },
    sources: [
      stocks,
      [
        'SEC · financiële overzichten lezen',
        'https://www.sec.gov/files/investor/pubs/begfinstmtguide.htm',
      ],
    ],
    faq: [
      [
        'Is een aandeel van € 5 goedkoper dan een aandeel van € 100?',
        'De prijs per stuk zegt zonder het aantal aandelen en de bedrijfsresultaten weinig. Voor waardering kijk je naar de waarde van het bedrijf en wat daar tegenover staat, niet alleen naar het koersbedrag.',
      ],
      [
        'Moet ieder goed bedrijf dividend betalen?',
        'Nee. Een bedrijf kan geld ook investeren of schuld aflossen. De vraag is hoe verstandig het kapitaal wordt gebruikt en welke risico’s daarbij horen.',
      ],
      [
        'Kan ik alleen op de koers-winstverhouding selecteren?',
        'Dat is een onvolledig beeld. Groei, balans, kasstromen en eenmalige resultaten kunnen de betekenis van hetzelfde getal sterk veranderen.',
      ],
    ],
  },
  strategie: {
    sections: [
      [
        'Maak van een ambitie een uitvoerbaar plan',
        '“Vermogen opbouwen” geeft richting, maar nog geen beslisregels. Een bruikbaar plan benoemt doel, tijd, inleg, gewenste beschikbaarheid en hoeveel onzekerheid je kunt dragen. Je financiële draagkracht en je gevoel bij schommelingen zijn niet altijd hetzelfde.\n\nIemand met een stabiel inkomen kan technisch ruimte hebben voor verlies en er toch slecht van slapen. Andersom kan iemand zich comfortabel voelen met risico terwijl het geld binnenkort nodig is. De verdeling moet passen bij beide kanten. Kies geen risiconiveau alleen omdat een calculator dan het gewenste eindbedrag laat zien.',
      ],
      [
        'De verdeling bepaalt meer dan losse namen',
        'Vermogensverdeling gaat over de rol van verschillende soorten bezittingen, bijvoorbeeld aandelen, obligaties en beschikbaar spaargeld. Aandelen kunnen sterk bewegen. Obligaties kennen onder meer rente- en kredietrisico. Spaargeld biedt beschikbaarheid, maar kan koopkracht verliezen.\n\nBinnen ieder onderdeel kun je vervolgens spreiden. Twee aandelenfondsen zijn niet noodzakelijk twee verschillende risico’s. Bekijk landen, sectoren en de grootste onderliggende posities. Een mix is pas een strategie wanneer duidelijk is waarom ieder onderdeel erin zit en wat het moet bijdragen.',
      ],
      [
        'Instappen: nieuw inkomen of een bestaand bedrag?',
        'Maandelijks een deel van je inkomen beleggen is iets anders dan een bedrag dat vandaag al beschikbaar is over twaalf maanden uitsmeren. In het eerste geval kun je het toekomstige salaris nog niet beleggen. In het tweede geval kies je bewust hoe lang een deel buiten de markt blijft.\n\nBij stijgende koersen kan eerder beleggen gunstiger uitpakken; bij een daling aan het begin kan gefaseerd instappen helpen. Je weet het toekomstige koerspad niet. Vergelijk daarom meerdere paden en neem mee welke aanpak je ook emotioneel kunt volhouden. Eén gunstige voorbeeldgrafiek is geen bewijs voor een universele winnaar.',
      ],
      [
        'Herbalanceren is onderhoud aan de verdeling',
        'Door koersverschillen verandert het gewicht van posities. Als aandelen harder stijgen dan de rest, kan je portefeuille risicovoller worden dan je oorspronkelijk bedoelde. Herbalanceren brengt de verdeling weer in lijn met je gekozen uitgangspunt.\n\nJe kunt nieuwe inleg gebruiken voor een onderdeel dat relatief klein is geworden, of bestaande posities aanpassen. De tweede route kan transactiekosten en fiscale gevolgen hebben. Leg vooraf vast wanneer je kijkt, bijvoorbeeld op een periodiek moment of bij een duidelijke afwijking. Dat voorkomt dat iedere marktbeweging een nieuwe beslissing wordt.',
      ],
      [
        'Bereid de moeilijke momenten voor',
        'Een plan wordt pas echt getest bij een tegenvaller. Denk vooraf aan verlies van inkomen, onverwachte uitgaven en een forse beursdaling. Bepaal welk deel van je vermogen beschikbaar blijft en wanneer je inleg tijdelijk kunt verlagen.\n\nLeg ook vast welke informatie relevant is om je strategie te wijzigen. Een veranderd doel of structureel andere financiële situatie kan een goede reden zijn. De populariteit van een sector op sociale media is op zichzelf geen toets van je plan. Een eenvoudig plan dat je begrijpt is beter te beoordelen dan regels die je telkens achteraf verandert.',
      ],
    ],
    example: {
      title: 'Een verdeling verschuift vanzelf',
      body: 'Een fictieve portefeuille begint met € 6.000 aandelen en € 4.000 in een tweede onderdeel. Stijgen alleen de aandelen 25%, dan worden die € 7.500. De totale waarde is € 11.500 en aandelen wegen nu 65,2% in plaats van 60%. Of je aanpast, volgt uit je plan. Deze verdeling is een rekenvoorbeeld, geen aanbevolen portefeuille.',
      figures: [
        ['60%', 'aandelen bij start'],
        ['€ 11.500', 'nieuwe totale waarde'],
        ['65,2%', 'nieuw aandelengewicht'],
      ],
    },
    comparison: {
      title: 'Wat kun je vooraf vastleggen?',
      rows: [
        [
          'Opbouwen',
          'Een haalbare inleg, de rol van ieder onderdeel en een grens aan kosten.',
        ],
        [
          'Onderhouden',
          'Wanneer je controleert, wat een relevante afwijking is en hoe je nieuwe inleg gebruikt.',
        ],
        [
          'Aanpassen',
          'Welke veranderingen in doel, inkomen of risico aanleiding zijn voor een nieuw plan.',
        ],
      ],
    },
    sources: [
      [
        'Investor.gov · vermogensverdeling en herbalanceren',
        'https://www.investor.gov/additional-resources/general-resources/publications-research/info-sheets/beginners-guide-asset',
      ],
      afm,
    ],
    faq: [
      [
        'Hoe vaak moet ik herbalanceren?',
        'Er is geen ritme dat voor ieder plan het beste is. Kies een controlewijze die je kunt uitvoeren en weeg transactiekosten en de grootte van de afwijking mee. Vaak handelen is geen doel op zichzelf.',
      ],
      [
        'Kan een plan veranderen?',
        'Ja. Een plan moet passen bij je leven. Maak wel onderscheid tussen een veranderde situatie en een tijdelijke koersreactie, en schrijf op waarom je de regels aanpast.',
      ],
      [
        'Kan ik een daling voorkomen door gespreid in te stappen?',
        'Nee. Je spreidt aankoopmomenten, maar zodra het geld belegd is blijft het aan de gekozen risico’s blootgesteld.',
      ],
    ],
  },
  vermogen: {
    sections: [
      [
        'Maak onderscheid tussen saldo, buffer en vermogen',
        'Je banksaldo laat zien wat op een rekening staat. Je nettovermogen is breder: bezittingen minus schulden. Een woning kan veel waarde vertegenwoordigen terwijl dat geld niet direct beschikbaar is. Andersom kan een hoog banksaldo deels bestemd zijn voor rekeningen die binnenkort komen.\n\nGeef beschikbaar geld daarom een functie. Een noodbuffer vangt onverwachte noodzakelijke uitgaven op. Een reservering is voor iets dat je al ziet aankomen, zoals onderhoud of een verhuizing. Langetermijnvermogen heeft weer een ander doel. Eén groot bedrag zonder indeling maakt het lastiger om te beoordelen wat je werkelijk kunt missen.',
      ],
      [
        'Koppel ieder doel aan tijd en beschikbaarheid',
        'Voor een doel op korte termijn is de vraag vooral of het bedrag op tijd beschikbaar is. Voor een doel over vele jaren spelen koopkracht, groei en onzekerheid sterker mee. Een vaste deadline en een flexibel doel vragen niet dezelfde aanpak.\n\nSparen, een deposito en beleggen verschillen in toegang tot geld en risico. Bij een deposito kunnen afspraken gelden over looptijd en vervroegd opnemen. Een belegging kan op de gewenste datum lager staan. Vergelijk dus niet alleen het percentage, maar ook wat er gebeurt als je het geld eerder nodig hebt.',
      ],
      [
        'Reken terug vanuit een doelbedrag',
        'Een doel wordt concreet wanneer je er een einddatum en maandbedrag aan koppelt. Begin eventueel zonder rendement: het nog benodigde bedrag gedeeld door het aantal maanden. Zo zie je welk deel puur uit je eigen bijdragen moet komen.\n\nVoeg daarna verschillende rente- of rendementsaannames toe. Als de uitkomst onhaalbaar is, kun je inleg, horizon of doelbedrag onderzoeken. Alleen een hoger rendement kiezen lost het budgetprobleem niet op; het verschuift de onzekerheid naar de toekomst. Houd ook rekening met momenten waarop je tijdelijk minder kunt sparen.',
      ],
      [
        'Nominale groei is niet hetzelfde als meer kunnen kopen',
        'Nominaal gaat over het bedrag in euro’s. Reëel gaat over de koopkracht van dat bedrag. Als je saldo 2% groeit terwijl prijzen 3% stijgen, kun je met het grotere saldo gemiddeld toch minder kopen. Exact vergelijk je groeifactoren: 1,02 gedeeld door 1,03 is ongeveer 0,9903.\n\nEen toekomstig doelbedrag moet daarom duidelijk zijn: bedoel je € 50.000 op de rekening, of de koopkracht die € 50.000 vandaag heeft? Gebruik voor dat tweede doel een expliciete inflatieaanname. Je persoonlijke kostenpatroon kan anders veranderen dan een algemene prijsindex.',
      ],
      [
        'Bescherming en spreiding van spaargeld',
        'Voor in aanmerking komende banktegoeden beschermt de Nederlandse depositogarantie in beginsel tot € 100.000 per persoon per bank. Meerdere merknamen kunnen onder dezelfde bankvergunning vallen. Controleer dus de bank achter de rekening en welk garantiestelsel van toepassing is.\n\nDeze bescherming is niet hetzelfde als een garantie op de waarde van beleggingen. Een aandelenfonds kan dalen, ook wanneer je het via een bank koopt. Controleer bij een product wat je juridisch aanhoudt: een banktegoed, een fonds of iets anders. Die vraag is belangrijker dan hoe de rekening in een app wordt genoemd.',
      ],
    ],
    example: {
      title: 'Een doel zonder rendementsbelofte',
      body: 'Je wilt over vijf jaar € 20.000 beschikbaar hebben en begint met € 5.000. Zonder rente, kosten of belasting resteert € 15.000 over 60 maanden: € 250 per maand. Dat is je controlepunt. Een berekening met rendement kun je ernaast zetten, maar die maakt een onzekere opbrengst niet gegarandeerd.',
      figures: [
        ['€ 20.000', 'doelbedrag'],
        ['60 maanden', 'tijd om op te bouwen'],
        ['€ 250', 'per maand bij 0%'],
      ],
    },
    comparison: {
      title: 'Drie potten, drie verschillende vragen',
      rows: [
        [
          'Noodbuffer',
          'Wat moet direct beschikbaar zijn voor onverwachte noodzakelijke uitgaven?',
        ],
        [
          'Gepland doel',
          'Welk bedrag heb ik op welke datum nodig en hoe vast staat die datum?',
        ],
        [
          'Lange termijn',
          'Welke onzekerheid past bij de horizon en hoeveel koopkracht wil ik opbouwen?',
        ],
      ],
    },
    sources: [
      dnb,
      [
        'ECB · nominale en reële rente',
        'https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me/html/nominal_and_real_interest_rates.en.html',
      ],
    ],
    faq: [
      [
        'Hoe groot moet mijn buffer zijn?',
        'Dat hangt af van je huishouden, bezittingen, inkomstenzekerheid en uitgaven. Maak een inventaris van mogelijke vervangingen en tegenvallers. Een vast bedrag van iemand anders is geen beoordeling van jouw situatie.',
      ],
      [
        'Is iedere spaarapp beschermd tot € 100.000?',
        'Niet automatisch. Controleer de juridische vorm, de bank en het toepasselijke garantiestelsel. Meerdere rekeningen bij dezelfde bank leveren niet elk een nieuwe grens per persoon op.',
      ],
      [
        'Kan een hoger saldo toch minder waard zijn?',
        'Ja, in koopkracht. Als prijzen sneller stijgen dan je geldbedrag, kun je gemiddeld minder kopen. Kosten en belasting kunnen het verschil verder beïnvloeden.',
      ],
    ],
  },
  pensioen: {
    sections: [
      [
        'Pensioen bestaat uit verschillende inkomensbronnen',
        'De Nederlandse pensioenopbouw wordt vaak in drie pijlers beschreven: AOW, pensioen via werk en individuele aanvullende voorzieningen. Daarnaast kun je vrij vermogen hebben dat je later wilt gebruiken. Niet iedereen bouwt via een werkgever evenveel op, en niet iedere werkgever heeft een pensioenregeling.\n\nBegin daarom met je eigen overzicht, niet met een algemeen streefbedrag. Noteer per bron wanneer de uitkering ingaat, welke bedragen worden getoond en welke onzekerheid erbij hoort. Een verwachte uitkering is iets anders dan een bedrag dat je vandaag al vrij op een rekening hebt staan.',
      ],
      [
        'Vergelijk bedragen die hetzelfde betekenen',
        'Een bruto jaarbedrag kun je niet rechtstreeks vergelijken met netto maanduitgaven. Deel eerst bedragen naar dezelfde periode in en controleer of ze in euro’s van nu of toekomstige euro’s staan. Ook belastingen en veranderingen in het huishouden kunnen verschil maken.\n\nMaak vervolgens een uitgavenbeeld voor later. Woonlasten kunnen afnemen, maar zorg, onderhoud of reizen kunnen een andere rol krijgen. Het doel is geen perfecte voorspelling van ieder bonnetje. Het gaat om herkennen welke vaste lasten moeten worden gedekt en waar ruimte of onzekerheid zit.',
      ],
      [
        'Aanvullend opbouwen: vrij vermogen of lijfrente?',
        'Vrij sparen of beleggen houdt geld doorgaans flexibeler beschikbaar, maar kent de fiscale behandeling die bij die bezittingen hoort. Een kwalificerende lijfrente is gekoppeld aan voorwaarden voor opbouw en uitkering. Een mogelijke aftrek is daarom niet los te zien van de beperkingen van het product.\n\nBij lijfrente kan aftrek afhangen van je jaar- en reserveringsruimte. Jaarruimte 2026 is gebaseerd op je situatie in 2025. Ook als je via werk pensioen opbouwt, kan een tekort bestaan. Controleer de officiële berekening met de juiste inkomens- en pensioengegevens voordat je aanneemt dat een storting aftrekbaar is.',
      ],
      [
        'Eerder stoppen vraagt een overbrugging',
        'Wil je stoppen met werken voordat bepaalde uitkeringen ingaan, dan ontstaat een aparte periode die je moet financieren. Maak die periode zichtbaar in je planning. Het totale vermogen voor later vertelt nog niet welk deel op dat moment daadwerkelijk beschikbaar is.\n\nEen geblokkeerd product is niet zomaar een vrij opneembare buffer. Kijk naar de voorwaarden en de fiscale gevolgen van de uitkeringsfase. Verdeel je vraag daarom in opbouwen, overbruggen en inkomen ontvangen. Eén calculator met een eindbedrag beantwoordt niet alle drie.',
      ],
      [
        'De opnamefase heeft eigen risico’s',
        'Tijdens opbouw voeg je meestal geld toe. Tijdens gebruik haal je geld weg. Een sterke daling aan het begin van een opnameperiode kan daardoor extra zwaar wegen: verkocht vermogen doet niet meer mee aan een mogelijk later herstel. De volgorde van rendementen kan dan belangrijk zijn.\n\nOnderzoek verschillende levensduren, uitgaven en tegenvallers. Gebruik geen vast opnamepercentage alsof het een levenslange garantie is. De doelvermogentool helpt een bedrag en benodigde inleg onderzoeken, maar rekent geen netto pensioenuitkering, jaarruimte of volledige opnameplanning uit.',
      ],
    ],
    example: {
      title: 'Eerst de overbruggingsperiode zichtbaar maken',
      body: 'Stel dat je twee jaar lang € 1.500 per maand uit vrij vermogen wilt aanvullen voordat een andere inkomstenbron start. Zonder inflatie, rendement, belasting of extra buffer vraagt die periode € 36.000. Dat is alleen de overbrugging; daarna moet de langere inkomensplanning nog steeds kloppen.',
      figures: [
        ['24 maanden', 'overbrugging'],
        ['€ 1.500', 'maandelijkse aanvulling'],
        ['€ 36.000', 'eenvoudige uitgangssom'],
      ],
    },
    comparison: {
      title: 'Drie vragen voor later',
      rows: [
        [
          'Opbouw',
          'Welke inkomstenbronnen bouw ik al op en welk aanvullend doel ontbreekt?',
        ],
        [
          'Beschikbaarheid',
          'Welk geld is vrij beschikbaar vóór de start van AOW of pensioen?',
        ],
        [
          'Uitkering',
          'Wat ontvang ik naar verwachting netto, hoe lang en met welke onzekerheden?',
        ],
      ],
    },
    sources: [
      pension,
      annuity,
      [
        'Rijksoverheid · persoonlijk pensioenoverzicht',
        'https://www.rijksoverheid.nl/vraag-en-antwoord/pensioen/waar-heb-ik-recht-op-als-ik-met-pensioen-ga',
      ],
    ],
    faq: [
      [
        'Is pensioenbeleggen hetzelfde als vrij beleggen?',
        'Nee. Een kwalificerend pensioen- of lijfrenteproduct heeft eigen voorwaarden voor opbouw, beschikbaarheid en uitkering. Mogelijke aftrek hoort bij dat geheel, niet alleen bij het woord beleggen.',
      ],
      [
        'Hoe weet ik of ik een pensioentekort heb?',
        'Maak onderscheid tussen je gewenste inkomen voor later en het fiscale begrip voor aftrekruimte. Bekijk je pensioenoverzicht en gebruik voor jaarruimte de officiële berekening met de juiste jaargegevens.',
      ],
      [
        'Is mijn volledige storting altijd aftrekbaar?',
        'Nee. Je beschikbare ruimte en de voorwaarden zijn bepalend. Controleer die vooraf; een groter gestort bedrag betekent niet automatisch meer aftrek.',
      ],
    ],
  },
  zakelijk: {
    sections: [
      [
        'Een hoog banksaldo is niet automatisch vrij vermogen',
        'Op een zakelijke rekening kan geld staan dat nog nodig is voor belastingen, leveranciers, salarissen of een toekomstige investering. Een saldo is een momentopname. Om te bepalen wat langer beschikbaar is, heb je zicht nodig op wanneer ontvangsten en betalingen plaatsvinden.\n\nMaak een liquiditeitsbegroting per maand en neem ook rustige perioden mee. Een onderneming kan winstgevend zijn en toch tijdelijk geld tekortkomen doordat klanten later betalen. Beleggen met geld dat je nodig hebt om de bedrijfsvoering draaiende te houden, kan dat probleem juist vergroten.',
      ],
      [
        'Winst en kasruimte beantwoorden verschillende vragen',
        'Winst beschrijft opbrengsten en kosten over een periode. Kasruimte gaat over geld dat daadwerkelijk beschikbaar is. Een verzonden factuur kan omzet opleveren terwijl de klant nog niet heeft betaald. Een grote investering kan veel geld kosten terwijl de boekhoudkundige kosten over meerdere jaren worden verdeeld.\n\nKijk daarom naar debiteuren, voorraad, betaaltermijnen en geplande investeringen. Vraag hoeveel ruimte overblijft als betalingen later binnenkomen of de omzet tegenvalt. Pas het gedeelte dat ook in zo’n scenario beschikbaar blijft, komt in beeld voor een langere bestemming.',
      ],
      [
        'De rechtsvorm bepaalt de vervolgvraag',
        'Geld in een bv is niet hetzelfde als privévermogen van de aandeelhouder. Ook bij een eenmanszaak moet worden beoordeeld welke bezittingen ondernemingsvermogen zijn en welke privé. De rekeningnaam alleen bepaalt de fiscale behandeling niet.\n\nDe keuze om vermogen in een onderneming te houden, privé beschikbaar te maken of aanvullend voor later op te bouwen raakt verschillende regels. Een rendementstool rekent die structuur niet door. Laat de relevante fiscale en juridische gevolgen beoordelen voordat je een algemene groeigrafiek gebruikt als argument voor een zakelijke transactie.',
      ],
      [
        'Koppel de bestemming aan de bedrijfsplanning',
        'Geld voor een machine over achttien maanden heeft een andere functie dan geld zonder voorziene bestemming. Beschikbaarheid op de juiste datum kan belangrijker zijn dan een hoger verwacht rendement. Kijk bij ieder product naar opnamevoorwaarden, koersrisico, kosten en de wijze van bewaren.\n\nNeem ook de samenhang met je bedrijf mee. Als omzet sterk afhankelijk is van één sector, kan een belegging in dezelfde sector de totale kwetsbaarheid vergroten. Het lijkt vertrouwd, maar bedrijf en vermogen kunnen dan tegelijk geraakt worden.',
      ],
      [
        'Leg beheer en verantwoordelijkheden vast',
        'Noteer het doel, het beschikbare bedrag, de horizon en wie wijzigingen mag uitvoeren. Maak duidelijk welke reserve buiten de beleggingen blijft en op welke momenten de liquiditeitsplanning opnieuw wordt beoordeeld. Zorg dat de administratie geldstromen en resultaten kan onderscheiden.\n\nEen zakelijk beleggingsaccount is een uitvoeringsmiddel. Vergelijk aanbieders pas wanneer de randvoorwaarden duidelijk zijn: toegang voor bevoegde personen, rapportages, kosten, productaanbod en ondersteuning van de rechtsvorm. Een aantrekkelijke interface zegt weinig over de geschiktheid voor jouw bedrijfsproces.',
      ],
    ],
    example: {
      title: 'Van rekeningstand naar mogelijke ruimte',
      body: 'Een fictieve onderneming heeft € 80.000 op de rekening. Daarvan is € 20.000 nodig voor belastingen, € 25.000 voor geplande betalingen en € 15.000 voor een bedrijfsbuffer. Er resteert € 20.000 om verder te onderzoeken. Dat is nog geen automatisch belegbaar bedrag: toekomstige kasstromen en tegenvallers moeten ook zijn bekeken.',
      figures: [
        ['€ 80.000', 'rekeningstand'],
        ['€ 60.000', 'reserves en verplichtingen'],
        ['€ 20.000', 'verder te onderzoeken'],
      ],
    },
    comparison: {
      title: 'Drie lagen in zakelijk geld',
      rows: [
        [
          'Bedrijfsvoering',
          'Geld dat nodig is om normale betalingen en schommelingen in ontvangsten op te vangen.',
        ],
        [
          'Geplande investeringen',
          'Geld met een concrete bestemming en datum, zoals apparatuur of uitbreiding.',
        ],
        [
          'Langere bestemming',
          'Ruimte die ook na een tegenvallerscenario beschikbaar blijft; pas daarna volgt de productafweging.',
        ],
      ],
    },
    sources: [
      [
        'KVK · liquiditeitsbegroting',
        'https://www.kvk.nl/geldzaken/liquiditeitsbegroting/',
      ],
      dnb,
    ],
    faq: [
      [
        'Kan ik de box 3-tool gebruiken voor mijn bv?',
        'Nee. De tool is bedoeld voor een afgebakende privé-indicatie. Een bv kent een andere fiscale behandeling en geld naar privé brengen kan afzonderlijke gevolgen hebben.',
      ],
      [
        'Is een buffer hetzelfde als geld dat niets oplevert?',
        'Nee. De buffer heeft een bedrijfsfunctie: betalingsverplichtingen kunnen nakomen als ontvangsten tegenvallen. Alleen naar gemist rendement kijken negeert die functie.',
      ],
      [
        'Moet zakelijk vermogen altijd worden belegd?',
        'Nee. De bedrijfsplanning kan juist om beschikbaarheid of een korte looptijd vragen. Een keuze volgt uit doel en risico, niet uit het feit dat er tijdelijk een saldo staat.',
      ],
    ],
  },
  reizen: {
    sections: [
      [
        'Begin bij je reisgedrag, niet bij de bonus',
        'Een kaart of loyaliteitsprogramma is pas nuttig als de voordelen aansluiten op uitgaven en reizen die je toch al van plan was. Een hoge welkomstbonus kan aandacht trekken, maar zegt weinig over de kosten en bruikbaarheid na het eerste jaar.\n\nNoteer hoe vaak je reist, welke luchthavens je gebruikt, of je flexibel bent met data en welke betaalmethoden je normaal gebruikt. Iemand die één vaste schoolvakantie heeft, kan een puntenprogramma anders benutten dan iemand die buiten drukke perioden kan vertrekken. Waarde is dus persoonlijk gebruik, niet de hoogste geadverteerde mogelijkheid.',
      ],
      [
        'Punten zijn geen euro’s op een spaarrekening',
        'De waarde van punten hangt af van de manier waarop je ze inzet. Een transfer naar een reispartner, een boeking of een andere besteding kan een andere tegenwaarde geven. Beschikbaarheid, toeslagen, geldigheid en omzettingsregels kunnen het praktische resultaat beïnvloeden.\n\nReken daarom met de prijs van een alternatief dat je zelf werkelijk zou boeken. Een dure premiumreis gebruiken als vergelijkingsprijs overschat je besparing als je die reis zonder punten nooit zou kopen. Trek verplichte bijbetalingen en belastingen van de besparing af voordat je een waarde per punt berekent.',
      ],
      [
        'Tel alleen voordelen die je daadwerkelijk gebruikt',
        'Een loungebezoek, tegoed of verzekering heeft niet automatisch de volledige lijstprijs als waarde voor jou. Bepaal of je het voordeel nodig hebt, of er beperkingen zijn en welk bedrag je er anders zelf aan zou uitgeven. Tel een voordeel niet dubbel mee in verschillende rekensommen.\n\nZet daar de jaarlijkse kaartkosten, eventuele wisselkosten en andere gebruikskosten tegenover. Reken een normaal jaar zonder eenmalige bonus door. Zo zie je of het product ook aantrekkelijk blijft wanneer de eerste beloning is verdwenen.',
      ],
      [
        'Verzekering en betaalgemak vragen om voorwaarden',
        'Een kaartverzekering kan voorwaarden hebben over betaling van de reis, verzekerde personen, reisduur en uitsluitingen. Kijk naar de actuele polis van de specifieke kaart. De aanwezigheid van het woord reisverzekering is geen bewijs dat jouw situatie gedekt is.\n\nControleer ook acceptatie op je bestemmingen, betaaltermijnen en kosten bij een vreemde valuta of geldopname. Zorg dat je betalingen kunt voldoen zonder extra uitgaven te doen alleen om punten te verdienen. Het voordeel moet passen binnen het bestaande budget; extra consumptie kan de beloning ruimschoots overtreffen.',
      ],
      [
        'Vergelijk het eerste jaar met de jaren erna',
        'Maak twee overzichten: een startjaar met een eventuele bonus en een normaal vervolgjaar. Noteer per voordeel de voorwaarden, je verwachte gebruik en een conservatieve waarde. Trek de totale kosten af en vergelijk met een eenvoudiger alternatief.\n\nBeurswatcher maakt commerciële samenwerkingen zichtbaar. Een partnerlink bepaalt niet of een product voor jou past. Op deze onderwerp­pagina leer je de vergelijking maken; op een partnerpagina horen de specifieke productkenmerken en gecontroleerde voorwaarden. Persoonlijke ervaringen worden alleen toegevoegd als Daniel ze zelf aanlevert.',
      ],
    ],
    example: {
      title: 'Een bonus kan een duur vervolgjaar verbergen',
      body: 'Een fictieve kaart kost € 240 per jaar. Je gebruikt in een normaal jaar voordelen die je zelf op € 150 waardeert. Zonder bonus is het verschil −€ 90. Een eenmalige bonus ter waarde van € 200 maakt het eerste jaar +€ 110, maar verandert het normale vervolgjaar niet. Dit zijn geen tarieven of voordelen van een bestaande kaart.',
      figures: [
        ['€ 240', 'fictieve jaarkosten'],
        ['€ 150', 'zelf gebruikte waarde'],
        ['−€ 90', 'normaal jaar'],
      ],
    },
    comparison: {
      title: 'Van geadverteerd naar werkelijk voordeel',
      rows: [
        [
          'Welkomstbonus',
          'Eenmalig, vaak met voorwaarden. Houd deze apart van de structurele waarde.',
        ],
        [
          'Doorlopende voordelen',
          'Tel alleen je echte gebruik en een prijs die je anders zelf zou betalen.',
        ],
        [
          'Totale kosten',
          'Neem abonnement, gebruikskosten en noodzakelijke bijbetalingen mee.',
        ],
      ],
    },
    sources: [
      [
        'American Express · Nederlandse kaartvoorwaarden',
        'https://www.americanexpress.com/nl-nl/bedrijf/legaal/website-regels-en-voorschriften/',
      ],
    ],
    faq: [
      [
        'Zijn meer punten altijd meer voordeel?',
        'Nee. Het gaat om wat je er bruikbaar mee kunt doen na kosten en bijbetalingen. Een groot puntensaldo zonder passende beschikbaarheid kan voor jou weinig waarde hebben.',
      ],
      [
        'Moet ik extra uitgeven om een bonus te halen?',
        'Beoordeel de voorwaarden tegen je normale budget. Als je aankopen doet die je anders niet zou doen, zijn dat extra kosten en geen gratis beloning.',
      ],
      [
        'Kan ik een kaartverzekering als vervanging gebruiken?',
        'Vergelijk de actuele dekking met wat je nodig hebt. Let onder meer op betaalvoorwaarden, verzekerde personen, duur en uitsluitingen. Ga niet alleen af op de productnaam.',
      ],
    ],
  },
};

export type TopicInvestigation = {
  title: string;
  intro: string;
  steps: [string, string][];
  conclusion: string;
  trap: string;
  evidence: string;
  guide?: { slug: string; label: string };
};

// Zelfstandig uitgewerkte, fictieve leercasussen. Geen klantverhalen,
// productaanbevelingen of beschrijving van Daniels eigen beleggingen.
export const topicInvestigations: Record<string, TopicInvestigation> = {
  beginnen: {
    title: 'Er staat € 20.000 op je rekening. Welk deel kun je lang missen?',
    intro:
      'Een banksaldo vertelt hoeveel geld er staat, maar niet waarvoor het nodig is. In dit fictieve huishouden heeft een groot deel al een bestemming. De bedragen zijn voorbeelden, geen aanbevolen bufferbedragen.',
    steps: [
      [
        'Splits het saldo voordat je een belegging kiest',
        'Van de € 20.000 is € 8.000 bedoeld voor een auto over achttien maanden. Daarnaast is € 5.000 gereserveerd voor onderhoud en vervanging van spullen, en € 3.000 voor een mogelijke periode met minder inkomen. Er blijft € 4.000 over zonder geplande besteding. De reserveringen overlappen hier niet: hetzelfde geld kan niet tegelijk de auto en een inkomensgat betalen.',
      ],
      [
        'Vertaal verlies naar een bedrag dat je merkt',
        'Een daling van 40% maakt van € 4.000 nog € 2.400: een verlies van € 1.600. Dat is een stressvoorbeeld, geen voorspelling of maximaal mogelijk verlies. De auto en andere reserveringen blijven in dit voorbeeld beschikbaar, omdat ze buiten de belegging staan. Zou je de volledige € 20.000 beleggen, dan houdt dezelfde daling nog € 12.000 over tegenover € 16.000 aan gereserveerde uitgaven.',
      ],
      [
        'Controleer of die € 4.000 werkelijk vrij blijft',
        'Bekijk ook schulden, inkomen en uitgaven die nog niet in het overzicht staan. Een verhuizing of een aflopend contract kan de verdeling veranderen. Houd bij een maandelijkse inleg rekening met jaarlijkse rekeningen: een positief maandsaldo in februari zegt weinig als de verzekering in maart wordt afgeschreven.',
      ],
    ],
    conclusion:
      'De uitkomst is geen opdracht om € 4.000 te beleggen. Je hebt vastgesteld welk bedrag nader onderzocht kan worden, zonder geld voor bekende uitgaven mee te rekenen. Pas daarna komen beleggingsvorm, looptijd en kosten aan bod.',
    trap: 'Risico willen nemen en een verlies kunnen betalen zijn verschillende dingen. Een hoge risicobereidheid maakt een naderende rekening niet kleiner.',
    evidence:
      'Controleer dit met je rekeningoverzichten en geplande uitgaven. De praktische checklist van de AFM onder Bronnen behandelt geld kunnen missen, looptijd en risico.',
  },
  etfs: {
    title: 'Twee ETF’s, maar toch 16% in hetzelfde bedrijf',
    intro:
      'Je bezit € 5.000 in een brede aandelen-ETF en € 5.000 in een thematische ETF. De fondsen en bedrijven in deze casus zijn fictief. We onderzoeken de onderliggende aandelen, zonder koersverandering of kosten mee te rekenen.',
    steps: [
      [
        'Reken de fondsweging om naar jouw euro’s',
        'Bedrijf X vormt 8% van de brede ETF en 24% van de thematische ETF. Via het eerste fonds bezit je economisch € 400 in X; via het tweede € 1.200. Samen is dat € 1.600 van je totale € 10.000, dus 16%. De afzonderlijke percentages optellen tot 32% zou fout zijn: beide fondsen vertegenwoordigen maar de helft van je portefeuille.',
      ],
      [
        'Kijk verder dan die ene grootste positie',
        'Bedrijf Y weegt respectievelijk 4% en 12%. Dat levert € 200 plus € 600 op, samen 8% van je portefeuille. X en Y vormen daardoor gezamenlijk 24%. De fondsen kunnen daarnaast dezelfde sectoren of landen zwaar wegen. Twee verschillende fondsnamen betekenen dus niet automatisch dat de gevoeligheid voor een sector halveert.',
      ],
      [
        'Vergelijk gegevens van hetzelfde moment',
        'Open de volledige posities van beide aanbieders en noteer publicatiedatum, bedrijfsnaam en weging. Alleen de tien grootste posities bekijken laat kleinere overlap buiten beeld. Heb je ook losse aandelen X, tel die mee. Gebruiken de twee overzichten verschillende peildata, noteer dat dan: je berekening is geen exacte gezamenlijke momentopname.',
      ],
    ],
    conclusion:
      'De thematische ETF voegt hier vooral extra blootstelling aan X en Y toe. Of dat gewenst is, hangt af van de verdeling die je bewust zoekt. Het aantal ETF’s is daarvoor geen bruikbare maatstaf.',
    trap: 'Een wereldwijde naam of honderden posities zegt weinig over de weging van de grootste bedrijven. Veel kleine posities compenseren niet vanzelf een paar grote.',
    evidence:
      'Gebruik de actuele posities, indexmethodiek en het prospectus van de fondsen. De uitleg van Investor.gov onder Bronnen behandelt ETF-structuur en spreiding; de percentages hierboven zijn illustratief.',
  },
  aandelen: {
    title: 'Een aandeel kost zestien keer de winst. Welke winst?',
    intro:
      'Een fictieve fabrikant heeft 40 miljoen aandelen en een koers van € 20. De beurswaarde is daarmee € 800 miljoen. Het jaarverslag meldt € 50 miljoen nettowinst. Alle bedragen hieronder zijn verzonnen om de beoordeling te oefenen.',
    steps: [
      [
        'Haal de eenmalige meevaller uit elkaar',
        'De gerapporteerde winst per aandeel is € 50 miljoen gedeeld door 40 miljoen: € 1,25. De koers-winstverhouding is € 20 gedeeld door € 1,25, dus 16. Maar de nettowinst bevat € 10 miljoen winst na belasting uit een eenmalige verkoop. Zonder die post resteert € 40 miljoen, of € 1 per aandeel. Op die eenvoudige aangepaste basis betaal je twintig keer de winst.',
      ],
      [
        'Volg het geld naar het kasstroomoverzicht',
        'De bedrijfsactiviteiten leveren € 38 miljoen aan kasstroom op. Nieuwe machines kosten € 28 miljoen. Na die investeringsuitgaven resteert € 10 miljoen, vóór verdere financieringsbewegingen en uitkeringen. Dat is iets anders dan € 50 miljoen boekwinst. Onderzoek bijvoorbeeld of klanten later betalen, voorraden oplopen of de machines juist een tijdelijke uitbreiding zijn.',
      ],
      [
        'Beoordeel wat de correctie wel en niet bewijst',
        'De aangepaste verhouding van 20 is nog geen oordeel dat het aandeel duur is. Daarvoor ontbreken onder meer toekomstige winstverwachtingen, schulden, noodzakelijke vervangingsinvesteringen en de prijs van vergelijkbare ondernemingen. Controleer ook of zogenaamd eenmalige kosten ieder jaar terugkeren. Zowel de onderneming als een belegger kan door selectieve correcties een te gunstig beeld maken.',
      ],
    ],
    conclusion:
      'Dezelfde koers levert twee verschillende winstverhoudingen op. Je belangrijkste bevinding is welke winst erin zit en hoeveel geld beschikbaar blijft, niet welk getal het aantrekkelijkst klinkt.',
    trap: 'Een kasstroomverschil is een onderzoeksvraag, geen bewijs van fraude of een slecht bedrijf. Eén jaar kan worden beïnvloed door betaalmomenten en investeringen.',
    evidence:
      'Zoek de winst-en-verliesrekening, het kasstroomoverzicht en de toelichting op bijzondere posten. De SEC-handleiding onder Bronnen legt uit hoe deze overzichten samenhangen.',
  },
  dividend: {
    title:
      '€ 80 miljoen dividend betalen met € 60 miljoen overgebleven kasstroom',
    intro:
      'Een fictief bedrijf betaalt € 0,80 dividend op 100 miljoen aandelen. Dat vraagt € 80 miljoen. De nettowinst is € 100 miljoen. Op het eerste gezicht past de uitkering binnen de winst, maar daarmee is de beoordeling niet klaar.',
    steps: [
      [
        'Bereken eerst de uitkering ten opzichte van de winst',
        'Het bedrijf keert 80% van de nettowinst uit: € 80 miljoen gedeeld door € 100 miljoen. Van die jaarwinst wordt € 20 miljoen niet uitgekeerd. Dit percentage, de payout ratio, zegt hoeveel van de winst wordt uitgekeerd. Het laat nog niet zien hoeveel geld daadwerkelijk binnenkwam of nodig is om machines en gebouwen te onderhouden.',
      ],
      [
        'Controleer of het geld uit de bedrijfsvoering komt',
        'De operationele kasstroom is € 95 miljoen. Uitgaven aan machines en andere bedrijfsmiddelen bedragen € 35 miljoen. In deze vereenvoudigde berekening resteert € 60 miljoen. De dividendbetaling ligt daar € 20 miljoen boven. Dat verschil moet ergens vandaan komen, bijvoorbeeld uit bestaand kasgeld, een verkoop of nieuwe financiering.',
      ],
      [
        'Onderzoek of het verschil tijdelijk is',
        'Een eenmalig tekort bewijst niet dat dividend meteen moet worden verlaagd. Misschien zijn dit jaar uitzonderlijk veel machines gekocht of betalen klanten volgende maand. Komt het tekort meerdere jaren terug, onderzoek dan hoe de kaspositie, schulden en investeringen zich ontwikkelen. Kijk ook of er naast dividend aandelen worden ingekocht: dat vraagt eveneens geld.',
      ],
    ],
    conclusion:
      'De uitkering is in dit voorbeeld gedekt door boekwinst, maar niet volledig door de kasstroom na investeringen. Dat verschil moet je kunnen verklaren voordat je de uitkering als duurzaam beschouwt.',
    trap: 'Een dividend dat tot nu toe steeds is betaald, is geen gegarandeerd inkomen. Alleen naar het percentage ten opzichte van de beurskoers kijken mist de financiering erachter.',
    evidence:
      'Controleer dividendbesluiten, kasstromen, investeringen en schuldmutaties over meerdere jaren. Investor.gov beschrijft dividend als mogelijke opbrengst van aandelen, niet als verplichte uitkering.',
    guide: {
      slug: 'dividend-en-totaalrendement',
      label: 'Lees hoe dividend en koersverandering samen je resultaat bepalen',
    },
  },
  portfolio: {
    title: 'Kun je met € 2.000 nieuwe inleg terug naar 60/40?',
    intro:
      'Een fictieve portefeuille bestaat uit € 8.000 aandelen en € 2.000 obligaties. De eerder gekozen verdeling was 60% aandelen en 40% obligaties. Dat is hier alleen een rekenuitgangspunt, geen aanbevolen verdeling voor iedere belegger.',
    steps: [
      [
        'Bereken eerst wat alleen bijstorten verandert',
        'Je stort € 2.000 bij en koopt daarvan uitsluitend obligaties. Daarna bezit je € 8.000 aandelen en € 4.000 obligaties: samen € 12.000. De verhouding wordt ongeveer 66,7% tegenover 33,3%. Je komt dichter bij het doel, maar bereikt het nog niet. Het oorspronkelijke aandelenbedrag is gelijk gebleven terwijl het totaal is gegroeid.',
      ],
      [
        'Vergelijk bijstorten met verkopen',
        'Zonder aandelen te verkopen is in totaal ongeveer € 3.333,33 nieuwe inleg nodig: € 1.333,33 meer dan de beschikbare € 2.000. Dan is € 8.000 gelijk aan 60% van het totaal. Met alleen € 2.000 nieuwe inleg hoort bij € 12.000 een aandelenbedrag van € 7.200. Om dan exact 60/40 te bereiken, zou je € 800 aandelen verkopen en dat bedrag boven op de nieuwe inleg aan obligaties besteden.',
      ],
      [
        'Bepaal of exact herstellen de moeite waard is',
        'De bedragen veronderstellen onveranderde koersen, geen kosten en vrij deelbare beleggingen. In de praktijk kunnen transactiekosten, beschikbare coupures en toepasselijke belastingregels een rol spelen. Een vooraf gekozen bandbreedte kan ruimte laten om via volgende stortingen bij te sturen. Controleer eerst of de oorspronkelijke verdeling nog past bij de looptijd en het doel.',
      ],
    ],
    conclusion:
      'Nieuwe inleg kan verkopen beperken, maar niet ieder bedrag herstelt iedere afwijking. Reken met de portefeuille ná de storting. Zo weet je of je volledig herstelt of alleen dichterbij komt.',
    trap: 'Herbalanceren haalt risico niet weg. Ook obligaties kunnen dalen; teruggaan naar een verhouding zegt niets over gegarandeerde opbrengst.',
    evidence:
      'Gebruik de actuele marktwaarde van alle posities. Investor.gov bespreekt drie manieren van herbalanceren, waaronder nieuwe inleg richten op de categorie die te klein is geworden.',
  },
  strategie: {
    title:
      'Je belegging daalt 20%. Moet je doelbedrag, looptijd of inleg veranderen?',
    intro:
      'In dit fictieve voorbeeld wil iemand over drie jaar € 30.000 gebruiken. Er is € 25.000 belegd en maximaal € 200 per maand beschikbaar. We rekenen zonder toekomstig rendement, kosten of belasting om de betaalbaarheid afzonderlijk zichtbaar te maken.',
    steps: [
      [
        'Leg vast wat vóór de daling nodig was',
        'Bij € 25.000 ontbreekt € 5.000. Verdeeld over 36 maanden is dat ongeveer € 139 per maand. Dat past binnen het maandbudget. Maar het doel hangt nog steeds samen met de waarde van de belegging: een rekenuitkomst zonder rendement betekent niet dat het bestaande vermogen niet meer kan dalen.',
      ],
      [
        'Reken de nieuwe situatie door zonder herstel te veronderstellen',
        'Na 20% koersverlies resteert € 20.000. Het tekort tot het doel is nu € 10.000: ongeveer € 278 per maand gedurende 36 maanden. Met de beschikbare € 200 groeit het bedrag zonder rendement slechts tot € 27.200. Je mist dan € 2.800. Meer risico nemen kan geen zekere oplossing voor dat tekort leveren.',
      ],
      [
        'Vergelijk drie echte aanpassingen',
        'Is € 30.000 noodzakelijk, dan vraagt € 10.000 aanvullen met € 200 per maand 50 maanden in plaats van 36. Is de datum vast, dan kan een lagere uitgave nodig zijn of moet er aantoonbaar extra geld beschikbaar komen. Noteer welke voorwaarde onderhandelbaar is. Geld dat op een vaste, nabije datum nodig is, vraagt bovendien een andere risicobeoordeling dan geld zonder geplande opname.',
      ],
    ],
    conclusion:
      'De daling verandert de rekensom, niet automatisch de juiste reactie. Je kunt pas kiezen wanneer duidelijk is of bedrag, datum of maandbudget mag wijzigen. Verwacht beursherstel is geen vierde zekerheid.',
    trap: 'Een hoger rendementspercentage invullen lost een onbetaalbaar doel alleen op het scherm op. Het maakt de vereiste opbrengst niet waarschijnlijker of gegarandeerd.',
    evidence:
      'Controleer het doelbedrag, de uiterste betaaldatum en aantoonbare maandruimte. Investor.gov koppelt de verdeling van beleggingen aan looptijd, financiële situatie en risico.',
    guide: {
      slug: 'sparen-voor-een-doel',
      label: 'Lees hoe je doelbedrag, termijn en maandinleg samen beoordeelt',
    },
  },
  'markt-economie': {
    title: 'De inflatie halveert, terwijl prijzen niet dalen. Hoe kan dat?',
    intro:
      'Een lager inflatiepercentage klinkt als goedkoper boodschappen doen. Met vier fictieve indexstanden zie je waarom dat niet hoeft te kloppen. Dit zijn lesgetallen, geen actuele cijfers voor Nederland of de Verenigde Staten.',
    steps: [
      [
        'Reken met de juiste vergelijkingsmaand',
        'De prijsindex stond vorig jaar in januari op 100 en in februari op 102. Dit jaar is de index in januari én februari 104. De jaarstijging is in januari 4%: 104 gedeeld door 100, min één. In februari is die ongeveer 1,96%: 104 gedeeld door 102, min één. Het jaarpercentage halveert bijna terwijl het prijsniveau deze maand gelijk blijft.',
      ],
      [
        'Scheid een basiseffect van een nieuwe prijsbeweging',
        'De verandering komt hier volledig door de hogere vergelijkingsbasis van vorig jaar. Het maandverschil van januari naar februari is 0%. In een echte publicatie kunnen een basiseffect en nieuwe prijsstijgingen tegelijk optreden. Controleer of het maandcijfer voor seizoenen is gecorrigeerd. Vergelijk geen gecorrigeerde maandreeks met een ongecorrigeerde reeks alsof definities gelijk zijn.',
      ],
      [
        'Lees ook de status van het eerdere cijfer',
        'Een publicatiedatum vertelt wanneer een cijfer verschijnt; de verslagperiode vertelt waarover het gaat. Een nieuwe tabel kan bovendien eerder gepubliceerde cijfers aanpassen. De gewone Amerikaanse CPI-U en CPI-W worden niet routinematig herzien wegens late gegevens, maar seizoengecorrigeerde reeksen kunnen wel wijzigen bij de jaarlijkse herberekening. Bewaar daarom zowel de gebruikte reeks als de publicatiedatum bij een vergelijking.',
      ],
    ],
    conclusion:
      'In dit voorbeeld zijn prijzen nog steeds hoger dan een jaar geleden. Het lagere jaarpercentage bewijst geen prijsdaling en voorspelt op zichzelf geen renteverlaging of beursreactie.',
    trap: 'Een eerder cijfer uit een oude nieuwsregel vergelijken met een nieuw cijfer uit een herziene tabel kan een verschil tonen dat deels door herziening ontstaat.',
    evidence:
      'Controleer indexstand, verslagmaand, seizoencorrectie en eventuele revisie in de oorspronkelijke CBS- of BLS-publicatie. De BLS-uitleg onder Bronnen beschrijft de verschillende reeksen.',
    guide: {
      slug: 'inflatie-koopkracht-berekenen',
      label: 'Lees wat inflatie over meerdere jaren met koopkracht doet',
    },
  },
  belasting: {
    title: 'Verlies op aandelen en rente op spaargeld: wat tel je samen?',
    intro:
      'Deze fictieve box 3-casus gebruikt de huidige uitleg van de Belastingdienst over werkelijk rendement. Er zijn alleen spaargeld en aandelen, geen schulden, aan- of verkopen of andere bezittingen. Het is geen volledige aangifteberekening.',
    steps: [
      [
        'Scheid ontvangen inkomen van waardeverandering',
        'De aandelen zijn aan het begin van het jaar € 30.000 waard en aan het einde € 28.000. Daarnaast is € 900 dividend ontvangen. Het spaargeld van € 40.000 levert € 800 rente op. De aandelenwaarde is exclusief het apart ontvangen dividend. De rekensom is daardoor min € 2.000, plus € 900, plus € 800: in totaal min € 300.',
      ],
      [
        'Beoordeel het totaal, niet alleen het verlies',
        'Je kunt voor werkelijk rendement niet alleen het verlies op aandelen selecteren en de rente weglaten. Volgens de huidige regels wordt het negatieve totale werkelijk rendement in dit voorbeeld op nul gesteld. Het verlies kan niet naar een ander jaar worden meegenomen. Bij werkelijk rendement wordt geen heffingsvrij vermogen afgetrokken; dat begrip hoort bij de berekening met fictief rendement.',
      ],
      [
        'Houd de twee berekeningen uit elkaar',
        'Voor fictief rendement zijn de bezittingen en schulden op 1 januari en hun categorie relevant. Voor werkelijk rendement zijn ook de ontvangen opbrengsten en waardeveranderingen gedurende het jaar nodig. Stortingen, aankopen of onttrekkingen zouden de eenvoudige vergelijking hierboven veranderen. Alleen twee saldofoto’s opsturen is dan onvoldoende om het rendement vast te stellen.',
      ],
    ],
    conclusion:
      'De casus laat zien waarom een koersverlies niet hetzelfde is als het totale fiscale rendement. Je verzamelt de gegevens voor beide methoden; een losse tooluitkomst vervangt de toepasselijke aangifteregels niet.',
    trap: 'Gebruik geen algemene beleggingsrendementsberekening als fiscale berekening. Kosten, vrijstellingen en bijzondere bezittingen worden fiscaal niet vanzelf op dezelfde manier behandeld.',
    evidence:
      'Bewaar jaaroverzichten, dividend- en rentebedragen en transacties. De actuele uitleg van de Belastingdienst onder Bronnen is leidend voor het betreffende belastingjaar.',
    guide: {
      slug: 'box-3-gegevens-verzamelen',
      label: 'Lees welke gegevens je voor een box 3-berekening verzamelt',
    },
  },
  vermogen: {
    title: '€ 150 extra rente, maar je hebt het geld drie maanden eerder nodig',
    intro:
      'Je hebt in dit fictieve voorbeeld € 15.000 spaargeld. Over negen maanden staat een betaling van € 12.000 gepland. Je vergelijkt vrij opneembaar sparen tegen 2% met een deposito van twaalf maanden tegen 3%. Dit zijn geen actuele aanbiedingen.',
    steps: [
      [
        'Vergelijk eerst gelijke looptijden',
        'Als het volledige bedrag een jaar blijft staan en de rentes gelijk blijven, levert 2% bruto € 300 op en 3% bruto € 450. Het verschil is € 150, zonder belasting en extra kosten. Maar deze vergelijking gebruikt twaalf maanden. Jij moet al na negen maanden kunnen betalen. Een aantrekkelijk jaarbedrag lost dat verschil in beschikbaarheid niet op.',
      ],
      [
        'Lees de opnamevoorwaarden vóór je de rente optelt',
        'Stel dat het deposito tussentijds niet kan worden opgenomen. Dan is de volledige € 15.000 vastzetten onverenigbaar met de geplande betaling, tenzij er aantoonbaar ander geld beschikbaar komt. Als opname wél kan, controleer dan wanneer, tegen welke vergoeding en of je rente verliest. Reken pas daarna het netto voordeel voor jouw daadwerkelijke gebruiksperiode uit.',
      ],
      [
        'Onderzoek welk deel echt een jaar kan blijven staan',
        'Zonder andere uitgaven resteert na de geplande € 12.000 nog € 3.000. Het renteverschil over uitsluitend die € 3.000 is bij dezelfde aannames € 30 per jaar. Ook dat bedrag kan nog nodig zijn als buffer. Splits dus eerst beschikbaarheid en looptijd; vergelijk vervolgens rente en voorwaarden per deel.',
      ],
    ],
    conclusion:
      'De bruikbare vergelijking gaat niet over de hoogste rente op € 15.000, maar over de rente op het bedrag dat werkelijk vast kan staan. Beschikbaarheid heeft hier een concreet bedrag en een datum.',
    trap: 'Depositogarantie is geen belofte dat je een lopend deposito vervroegd mag opnemen. Bescherming bij bankfalen en contractuele beschikbaarheid zijn verschillende zaken.',
    evidence:
      'Controleer de spaarvoorwaarden, betaaldatum en bankvergunning. DNB licht depositogarantie toe; de voorwaarden van de aanbieder bepalen de looptijd en mogelijkheden voor opname.',
    guide: {
      slug: 'spaargeld-en-inflatie',
      label: 'Lees hoe je spaarrente naast inflatie beoordeelt',
    },
  },
  pensioen: {
    title: '€ 120.000 vermogen: hoeveel aanvulling is dat eigenlijk?',
    intro:
      'In dit fictieve budget zijn de uitgaven € 2.300 netto per maand en is het verwachte pensioeninkomen € 1.900 netto vanaf de gekozen ingangsdatum. Alles staat in koopkracht van vandaag; jaarlijkse uitgaven zijn al over de maanden verdeeld.',
    steps: [
      [
        'Vertaal het maandverschil naar meerdere jaren',
        'De ontbrekende € 400 per maand is € 4.800 per jaar. Over 25 jaar is dat € 120.000; over 30 jaar € 144.000. Deze eenvoudige optelling veronderstelt nul rendement na inflatie, kosten en belasting. Het is geen veilige opnamegrens. Een ander verloop van uitgaven, inkomen of rendement geeft een andere uitkomst.',
      ],
      [
        'Controleer of er eerst een periode zonder pensioeninkomen is',
        'Wil je twee jaar vóór die ingangsdatum stoppen en ontbreekt dan alle inkomen, dan vraagt alleen die periode € 2.300 maal 24: € 55.200. Daarna begint pas het tekort van € 400 per maand. Twee overbruggingsjaren plus 25 aanvullende jaren vragen in deze vereenvoudigde optelling € 175.200. Dit zijn verschillende perioden; tel dezelfde maanden niet tweemaal.',
      ],
      [
        'Controleer of het vermogen op tijd beschikbaar is',
        'Vrij spaargeld, beleggingen en een geblokkeerde pensioenrekening kun je niet zonder meer als één opneembare pot behandelen. Kijk naar ingangsdata, uitkeringsvoorwaarden en belasting. Controleer in pensioenoverzichten of een bedrag bruto of netto is en welke aannames gelden voor toekomstige koopkracht. Vergelijk geen bruto jaaruitkering met netto maanduitgaven.',
      ],
    ],
    conclusion:
      '€ 120.000 zegt pas iets naast het verwachte tekort en de jaren waarin dat tekort optreedt. Dezelfde pot kan voldoende lijken voor aanvulling, maar onvoldoende zijn wanneer je ook eerder wilt stoppen.',
    trap: 'Een gemiddelde levensduur of een vast rendementspercentage maakt een uitkeringsduur niet zeker. Deze optelling verwerkt geen wisselende beursjaren of langere levensduur.',
    evidence:
      'Gebruik je eigen uitgaven, pensioenoverzichten en ingangsdata. Rijksoverheid legt de pensioenonderdelen uit; de Belastingdienst beschrijft fiscale voorwaarden voor lijfrente.',
  },
  zakelijk: {
    title: '€ 90.000 op de zakelijke rekening, maar slechts € 2.000 ruimte',
    intro:
      'Een fictief bedrijf wil weten hoeveel geld tijdelijk kan worden gemist. Er staat € 90.000 op de bank. De onderstaande bedragen zijn kasbetalingen, geen winstberekening. Het bedrijf kiest voor deze casus een minimale kasreserve van € 15.000.',
    steps: [
      [
        'Trek de betalingen van deze maand af',
        'Deze maand moet € 15.000 belasting worden betaald, € 28.000 aan personeel en leveranciers en € 12.000 voor een machine. Dat is samen € 55.000. Zonder overige ontvangsten of betalingen resteert € 35.000. Na de gekozen reserve van € 15.000 lijkt er € 20.000 over. Maar dit is alleen het einde van de eerste maand.',
      ],
      [
        'Schuif een klantbetaling één maand door',
        'Volgende maand is er € 18.000 aan uitgaven boven op de overige ontvangsten. Een aparte klantfactuur van € 25.000 wordt in het basisscenario ook die maand betaald. Komt die pas de maand erna, dan daalt het saldo eerst van € 35.000 naar € 17.000. Boven de reserve blijft op dat moment slechts € 2.000 over.',
      ],
      [
        'Toets de voorgenomen belegging aan het laagste saldo',
        'Had het bedrijf de aanvankelijk vrij lijkende € 20.000 vastgezet, dan zou het saldo bij de vertraagde klantbetaling op min € 3.000 uitkomen: € 35.000 min € 20.000 min € 18.000. De reserve wordt dan met € 18.000 onderschreden. Een later positief jaartotaal betaalt een rekening op de eerdere vervaldag niet.',
      ],
    ],
    conclusion:
      'In dit stressscenario is € 2.000 de resterende ruimte boven de gekozen reserve, geen aanbeveling om dat bedrag te beleggen. Andere vertragingen, onverwachte kosten of betaalmomenten binnen de maand kunnen ook die ruimte wegnemen.',
    trap: 'Winst, facturen en geld op de bank zijn geen uitwisselbare bedragen. Een verstuurde factuur is pas beschikbare kasruimte als de betaling binnen is.',
    evidence:
      'Controleer vervaldata, belastingbetalingen en realistische ontvangstmomenten. De KVK-uitleg over liquiditeitsbegrotingen onder Bronnen maakt dit onderscheid tussen winst en betaalbaarheid.',
  },
  reizen: {
    title: '40.000 punten voor een vlucht: voordeel of dure omweg?',
    intro:
      'Een fictieve vlucht kost € 420 in geld of 40.000 punten plus € 120 aan bijbetaling. De kaart kost in dit voorbeeld € 180 per jaar. Deze bedragen zijn uitsluitend illustratief en horen niet bij een actuele kaartaanbieding.',
    steps: [
      [
        'Trek de bijbetaling af van een bruikbare ticketprijs',
        'Als je deze vlucht anders daadwerkelijk voor € 420 zou boeken, besparen de punten € 300: € 420 min € 120. Per punt is dat € 0,0075, dus 0,75 eurocent. Niet € 420 gedeeld door het puntensaldo, want de bijbetaling verdwijnt niet. Controleer dezelfde reisdata, bagage en wijzigingsvoorwaarden voordat je tickets gelijk noemt.',
      ],
      [
        'Tel het hele kaartjaar mee',
        'Stel dat dit de enige gebruikte beloning is en alle punten via gewone, geplande uitgaven zijn verdiend. Na € 180 kaartkosten resteert € 120 berekend voordeel. Extra uitgaven puur om een bonus te halen horen ook in de afweging. Koop je daardoor voor € 200 iets wat je anders niet zou kopen, dan verdwijnt dit voordeel volledig.',
      ],
      [
        'Vergelijk met wat je zonder punten echt zou kiezen',
        'Misschien voldoet een ander ticket van € 260 net zo goed. Vergeleken met die optie bespaar je door inwisseling slechts € 140 vóór de kaartkosten: € 260 min € 120. Na de kaartkosten kom je € 40 negatief uit. Een hoge catalogusprijs van een luxe vlucht is geen persoonlijke besparing als je die vlucht anders nooit zou kopen.',
      ],
    ],
    conclusion:
      'Hetzelfde puntensaldo levert hier twee verschillende uitkomsten op. Het verschil zit in het alternatief dat je werkelijk zou betalen, de bijbetaling en de kosten om de punten te verzamelen.',
    trap: 'Punten zijn geen vast bedrag in euro’s. Beschikbaarheid, overdracht, inwisselvoorwaarden en ongebruikte voordelen kunnen het haalbare voordeel veranderen.',
    evidence:
      'Bewaar de geldprijs, puntenprijs, bijbetaling en kaartvoorwaarden voor dezelfde boeking. American Express beschrijft onder Bronnen de inwissel- en overdrachtsmogelijkheden; controleer ook het betrokken reisprogramma.',
  },
};

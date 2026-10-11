import {
  scalableLinks,
  brandNewDayLinks,
  saxoReferral,
  amexReferral,
  suppliedGuides,
} from './partner-links';

export type PartnerEditorialLink = {
  label: string;
  href: string;
  commercial?: boolean;
};
export type PartnerEditorialSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  links?: PartnerEditorialLink[];
  note?: string;
};
export type PartnerEditorialContent = {
  sections: PartnerEditorialSection[];
  guide?: { title: string; description: string; href: string };
  sources: { label: string; href: string }[];
  checkedAt: string;
  commercial: boolean;
  disclosure: string;
  riskNote: string;
};

// Based on Daniel's supplied collaboration document. Product claims checked
// against the primary sources below on 11 October 2026; no invented experience.
const commercialDisclosure =
  'Beurswatcher werkt samen met deze aanbieder. Links met “Commerciële link” zijn affiliate- of verwijzingslinks: Beurswatcher kan daarvoor een vergoeding ontvangen. De uitleg is geen persoonlijke aanbeveling.';

export const partnerEditorial: Record<string, PartnerEditorialContent> = {
  'scalable-capital': {
    checkedAt: '11 oktober 2026',
    commercial: true,
    disclosure: commercialDisclosure,
    riskNote:
      'Beleggen kent risico’s. Je kunt je inleg verliezen. Deze uitleg is algemene informatie, geen persoonlijk beleggingsadvies.',
    sections: [
      {
        id: 'beleggingsplannen',
        title: 'Automatisch beleggen vanaf € 1',
        paragraphs: [
          'Iedere maand zelf ETF’s of aandelen kopen vraagt om een vaste routine. Met een beleggingsplan bij Scalable Capital stel je vooraf in waarin je wilt beleggen, hoeveel je inlegt en hoe vaak. Daarna worden de aankopen automatisch uitgevoerd.',
          'Een beleggingsplan kan vanaf € 1. Voor de uitvoering rekent Scalable € 0 orderkosten. Dat betekent niet dat beleggen kosteloos is: fondskosten, spreads en eventuele andere kosten kunnen blijven gelden. Een spread is het verschil tussen de koop- en verkoopprijs.',
          'Je kunt bijvoorbeeld iedere maand € 250 in dezelfde wereld-ETF inleggen. Het bedrag is aan te passen en een plan is te pauzeren. Zo hoef je niet iedere maand een nieuwe order in te voeren. Je blijft zelf verantwoordelijk voor de keuze van de belegging en de hoogte van je inleg.',
        ],
        note: 'Regelmatig inleggen voorkomt geen koersverlies. Het voorbeeld van € 250 is geen aanbevolen inleg.',
        links: [
          {
            label: 'Bekijk de ETF-beleggingsplannen',
            href: scalableLinks.etfPlan,
            commercial: true,
          },
        ],
      },
      {
        id: 'wereld-etf',
        title: 'Hoe werkt de Scalable wereld-ETF?',
        paragraphs: [
          'Scalable Capital en Xtrackers hebben samen de Scalable MSCI AC World Xtrackers UCITS ETF 1C ontwikkeld. Deze ETF volgt de MSCI ACWI: een index met grote en middelgrote bedrijven uit ontwikkelde en opkomende landen. Per eind september 2026 bevatte de index circa 2.400 bedrijven uit 47 landen.',
          'Met één ETF krijg je zo blootstelling aan verschillende regio’s, waaronder de Verenigde Staten, Europa, Japan en opkomende markten. Dat is brede spreiding, maar geen gelijke verdeling: grotere bedrijven en landen wegen zwaarder mee. De index bevat niet alle beursgenoteerde bedrijven ter wereld.',
          'De ETF gebruikt een combinatie van fysieke en synthetische replicatie. Voor een deel koopt het fonds aandelen. Voor een ander deel gebruikt het afspraken met financiële tegenpartijen om het indexrendement te volgen. Dat brengt ook tegenpartijrisico mee. Het aantal indexbedrijven is dus niet hetzelfde als het aantal aandelen dat het fonds rechtstreeks bezit.',
          'De jaarlijkse lopende fondskosten (TER) bedragen bij controle 0,15%. Ontvangen inkomsten worden in het fonds herbelegd. De TER omvat niet automatisch al je kosten als belegger: denk ook aan handelskosten en het verschil tussen koop- en verkoopprijs. Lees het essentiële-informatiedocument voordat je een ETF kiest.',
        ],
        note: 'Ook een wereldwijd gespreide ETF kan sterk in waarde dalen. Een lage TER is op zichzelf geen reden om een fonds te kiezen.',
        links: [
          {
            label: 'Bekijk de wereld-ETF en productdocumenten',
            href: scalableLinks.worldEtf,
            commercial: true,
          },
          {
            label: 'Lees hoe ETF-kosten werken',
            href: '/uitleg/etf-kosten-lange-termijn',
          },
        ],
      },
      {
        id: 'overnight',
        title: 'Rente op geld dat je niet belegt',
        paragraphs: [
          'Geld voor een buffer of een aankoop op korte termijn wil je misschien beschikbaar houden. Het Overnight account van Scalable Capital is een afzonderlijk product voor geld dat je niet in aandelen of ETF’s belegt. Verwar het niet met het gewone geldsaldo op een brokerrekening.',
          'Bij controle op 11 oktober 2026 vermeldt Scalable 2,60% variabele rente per jaar voor het Overnight account. De rente wordt dagelijks berekend en maandelijks bijgeschreven. Het percentage kan veranderen en je geld staat niet voor een vaste looptijd vast.',
          'Bij € 25.000 is 2,60% ongeveer € 650 bruto rente over één jaar, als het percentage en het saldo dat hele jaar gelijk blijven. Dit eenvoudige voorbeeld laat maandelijkse herbelegging van rente en belastingen buiten beschouwing. Controleer de actuele rente voordat je bedragen vergelijkt.',
          'De manier waarop je geld wordt aangehouden, maakt verschil. Zonder PRIME+ kan Scalable het verdelen over partnerbanken en/of gekwalificeerde geldmarktfondsen. Bij PRIME+ wordt het volgens de huidige voorwaarden over maximaal vijf banken verdeeld. Bekijk de daadwerkelijke verdeling in je account.',
          'Banktegoeden vallen onder de voorwaarden van het toepasselijke depositogarantiestelsel, doorgaans tot € 100.000 per persoon per bank. Andere tegoeden bij dezelfde bank tellen daarbij mee. Geldmarktfondsen hebben geen depositogarantie. Hun vermogen wordt afgescheiden gehouden, maar dat voorkomt geen beleggingsverlies en is geen garantie dat je altijd je volledige inleg terugkrijgt.',
        ],
        note: 'Variabele rente. Geldmarktfondsen kennen marktrisico; bescherming van banktegoeden en fondsvermogen is niet hetzelfde.',
        links: [
          {
            label: 'Controleer de actuele Overnight-rente',
            href: scalableLinks.overnight,
            commercial: true,
          },
        ],
      },
      {
        id: 'andere-mogelijkheden',
        title: 'Een brokerrekening of kinderrekening vergelijken',
        paragraphs: [
          'Naast beleggingsplannen biedt Scalable een brokerrekening voor losse aankopen. FREE heeft geen vaste maandelijkse abonnementskosten. PRIME+ kost bij controle € 4,99 per maand. Orderkosten hangen af van het abonnement, de handelsplaats, het product en het orderbedrag. Bekijk daarom de volledige tarieflijst voor de manier waarop jij wilt beleggen.',
          'Er is ook een kinderrekening. Hiervoor gelden aparte openingsvoorwaarden voor het kind en de wettelijke vertegenwoordigers. Een eventuele vergoeding van fondskosten geldt alleen voor geselecteerde ETF’s en onder voorwaarden. Controleer wie het vermogen bezit en wat er verandert wanneer het kind meerderjarig wordt.',
        ],
        links: [
          {
            label: 'Bekijk de brokerrekening',
            href: scalableLinks.broker,
            commercial: true,
          },
          {
            label: 'Vergelijk FREE en PRIME+',
            href: scalableLinks.prime,
            commercial: true,
          },
          {
            label: 'Lees over de kinderrekening',
            href: scalableLinks.child,
            commercial: true,
          },
        ],
      },
    ],
    sources: [
      {
        label: 'Scalable — tarieven en beleggingsplannen',
        href: 'https://nl.scalable.capital/trading-kosten',
      },
      {
        label: 'DWS — productinformatie en essentiële-informatiedocument',
        href: 'https://etf.dws.com/nl-nl/LU2903252349-scalable-msci-ac-world-xtrackers-ucits-etf-1c/',
      },
      {
        label: 'MSCI — samenstelling van de ACWI-index',
        href: 'https://www.msci.com/documents/10199/8d97d244-4685-4200-a24c-3e2942e3adeb',
      },
      {
        label: 'Scalable — Overnight en bescherming van tegoeden',
        href: 'https://nl.scalable.capital/overnight-account',
      },
      {
        label: 'Scalable — kinderrekening',
        href: 'https://nl.scalable.capital/kinderrekening',
      },
    ],
  },
  delta: {
    checkedAt: '11 oktober 2026',
    commercial: true,
    disclosure:
      'Beurswatcher werkt samen met Delta. De onderstaande links gaan naar de officiële productinformatie. De persoonlijke toelichting over de iPhone-widget is aangeleverd door Daniel.',
    riskNote:
      'Delta is een hulpmiddel voor portefeuilleoverzicht, geen broker of persoonlijk beleggingsadvies. Controleer geïmporteerde gegevens en ondersteunde koppelingen.',
    sections: [
      {
        id: 'portefeuilleoverzicht',
        title: 'Je beleggingen op één plek bijhouden',
        paragraphs: [
          'Beleg je bij meerdere brokers, dan is je totale portefeuille niet altijd in één app te zien. Delta brengt verschillende beleggingen samen. Je ziet hoe de totale waarde verandert en welke posities bijdragen aan winst of verlies.',
          'Je kunt transacties zelf invoeren of een ondersteunde rekening koppelen. Bij een automatische koppeling leest Delta gegevens in; de koppeling geeft Delta geen recht om geld te verplaatsen of namens jou te handelen. Niet iedere broker of rekening wordt ondersteund en er kan vertraging in de gegevens zitten.',
          'Omdat Delta aankopen, verkopen en andere transacties meeneemt, kun je de ontwikkeling van je eigen portefeuille volgen. Controleer wel of inleg, kosten, valuta en ontbrekende transacties correct zijn verwerkt. Een verkeerd of onvolledig overzicht kan een vertekend rendement tonen.',
          'De gratis Basic-versie ondersteunt bij controle maximaal tien verschillende beleggingen in één portefeuille. Voor meer posities en uitgebreidere analyses zijn betaalde PRO- en PRO+-abonnementen beschikbaar. Bekijk welke functies je daadwerkelijk nodig hebt voordat je een abonnement kiest.',
        ],
        links: [
          {
            label: 'Bekijk de functies van Delta',
            href: 'https://delta.app/en/features',
          },
          {
            label: 'Vergelijk gratis en betaalde abonnementen',
            href: 'https://delta.app/en/pro',
          },
        ],
      },
      {
        id: 'iphone-widget',
        title: 'Je portefeuille op het beginscherm van je iPhone',
        paragraphs: [
          'Daniel gebruikt graag de iPhone-widget van Delta. Daarmee kun je de ontwikkeling van je portefeuille zien zonder steeds de app te openen. Dit is zijn persoonlijke voorkeur, geen aanwijzing dat je je beleggingen voortdurend hoeft te volgen.',
          'Delta biedt verschillende iOS-widgets voor het begin- en toegangsscherm. Afhankelijk van de gekozen widget kun je je portefeuille of afzonderlijke beleggingen volgen. Je voegt de widget via je iPhone toe en kiest in de instellingen welke informatie je wilt zien.',
          'Voor wie meerdere beleggingsapps gebruikt, kan dat een handig centraal overzicht zijn. Controleer in de actuele app welke widgets en abonnementsfuncties beschikbaar zijn. De getoonde waarden kunnen afwijken van de laatste koers bij je broker.',
        ],
        note: 'Een widget verandert het risico van je beleggingen niet. Deel alleen de rekeninggegevens die voor de gekozen koppeling nodig zijn.',
        links: [
          {
            label: 'Bekijk de uitleg voor iPhone-widgets',
            href: 'https://support.delta.app/en/articles/6563350-introduction-to-ios-widgets',
          },
        ],
      },
    ],
    sources: [
      {
        label: 'Delta — functies en koppelingen',
        href: 'https://delta.app/en/features',
      },
      { label: 'Delta — abonnementen', href: 'https://delta.app/en/pro' },
      {
        label: 'Delta — iOS-widgets instellen',
        href: 'https://support.delta.app/en/articles/6563350-introduction-to-ios-widgets',
      },
    ],
  },
  'brand-new-day': {
    checkedAt: '11 oktober 2026',
    commercial: true,
    disclosure: commercialDisclosure,
    riskNote:
      'Pensioenvermogen is geblokkeerd. Fiscaal voordeel hangt af van je persoonlijke situatie en de geldende regels. Bij pensioenbeleggen kun je geld verliezen.',
    sections: [
      {
        id: 'jaarruimte',
        title: 'Wanneer kun je je pensioeninleg aftrekken?',
        paragraphs: [
          'Met een pensioenrekening kun je zelf aanvullend vermogen voor later opbouwen. Binnen je beschikbare jaarruimte en eventuele reserveringsruimte kan de inleg aftrekbaar zijn in box 1. Daardoor kan je inkomstenbelasting over dat jaar lager uitvallen. Niet iedereen heeft die ruimte en het voordeel is niet voor iedereen hetzelfde.',
          'Jaarruimte hangt onder meer samen met je inkomen en de pensioenopbouw van het voorgaande jaar. Onder voorwaarden kun je niet-benutte ruimte uit eerdere jaren gebruiken als reserveringsruimte. Bereken daarom eerst hoeveel je in jouw situatie fiscaal voordelig mag inleggen.',
          'Vermogen op een kwalificerende pensioenrekening valt tijdens de opbouw niet in box 3. Daar staat tegenover dat het geld bedoeld is voor pensioen. Je kunt het niet vrij opnemen zoals op een gewone beleggingsrekening. Over de latere uitkeringen betaal je inkomstenbelasting; belastingvoordeel tijdens de opbouw betekent dus niet dat het geld voor altijd belastingvrij is.',
        ],
        note: 'Te veel inleggen geeft niet automatisch extra aftrek. Voortijdig opnemen kan inkomstenbelasting en revisierente veroorzaken.',
        links: [
          {
            label: 'Bereken je jaarruimte bij Brand New Day',
            href: brandNewDayLinks.allowance,
            commercial: true,
          },
        ],
      },
      {
        id: 'beleggen-of-sparen',
        title: 'Pensioenbeleggen of pensioensparen?',
        paragraphs: [
          'Bij pensioenbeleggen wordt je inleg belegd in fondsen. De waarde kan stijgen en dalen. Bij Brand New Day kun je kiezen uit modelportefeuilles of zelf fondsen selecteren. Een modelportefeuille bepaalt de verdeling tussen bijvoorbeeld aandelen en obligaties; die verdeling heeft invloed op het risico.',
          'Wil je aanvullend pensioen opbouwen zonder dat vermogen op de beurs te beleggen, dan is er ook pensioensparen. Je ontvangt dan rente. Afhankelijk van het product kan die variabel zijn of voor een periode worden vastgezet. Kijk bij een deposito ook naar de looptijd en de beperkingen voor het opnemen of overboeken van geld.',
          'Voor beide vormen gelden fiscale voorwaarden en is het geld voor pensioen bestemd. Na de opbouwfase gebruik je het vermogen voor periodieke uitkeringen. De toegestane startdatum en uitkeringsduur hangen af van het gekozen product en de wettelijke regels. Het is geen vrij opneembare pot die je standaard in één keer laat uitbetalen.',
        ],
        note: 'Sparen en beleggen hebben verschillende risico’s. Beoordeel ook inflatie, kosten, looptijd en de beschikbaarheid van je geld.',
        links: [
          {
            label: 'Bekijk de pensioenrekening en mogelijkheden',
            href: brandNewDayLinks.pension,
            commercial: true,
          },
          {
            label: 'Lees de basis over pensioen',
            href: '/verdieping/pensioen',
          },
        ],
      },
      {
        id: 'periodieke-inleg',
        title: 'Je pensioeninleg automatisch laten lopen',
        paragraphs: [
          'Je kunt een periodieke inleg instellen, zodat je niet iedere maand opnieuw hoeft over te maken. Je bepaalt zelf het bedrag en kunt het aanpassen wanneer je inkomen of andere verplichtingen veranderen.',
          'Automatiseren vervangt de jaarlijkse controle niet. Bekijk opnieuw je fiscale ruimte, je bestaande pensioenopbouw en of de gekozen verdeling nog bij de looptijd past. Bij beleggen kunnen marktschommelingen invloed hebben op het bedrag dat later beschikbaar is.',
          'Let ook op de kosten. Voor de pensioenrekening-beleggen noemt Brand New Day bij controle € 49 afsluitkosten, 0,50% stortingskosten en 0,44% jaarlijkse servicekosten. Daarnaast betaal je fondskosten; die verschillen per portefeuille of gekozen fonds. Pensioensparen kent eigen tarieven en voorwaarden.',
        ],
        links: [
          {
            label: 'Bekijk pensioenbeleggen bij Brand New Day',
            href: brandNewDayLinks.pension,
            commercial: true,
          },
        ],
      },
    ],
    sources: [
      {
        label: 'Brand New Day — pensioenrekening-beleggen',
        href: 'https://new.brandnewday.nl/pensioenrekening-beleggen/',
      },
      {
        label: 'Brand New Day — fiscale regels en voorwaarden',
        href: 'https://new.brandnewday.nl/de-spelregels-en-voordelen-van-de-pensioenrekening/',
      },
      {
        label: 'Belastingdienst — lijfrente en aftrek',
        href: 'https://www.belastingdienst.nl/wps/wcm/connect/nl/aftrek-en-kortingen/content/aftrekken-lijfrentepremies',
      },
    ],
  },
  saxo: {
    checkedAt: '11 oktober 2026',
    commercial: true,
    disclosure: commercialDisclosure,
    riskNote:
      'Je belegt zelf en kunt je inleg verliezen. Nederlandse en Belgische rekeningen hebben verschillende voorwaarden en fiscale regels.',
    sections: [
      {
        id: 'belgie',
        title: 'Saxo voor beleggers in België',
        paragraphs: [
          'Voor Belgische beleggers kan de administratie rond een brokerrekening meewegen in de keuze. Bij een Belgische Saxo-rekening houdt Saxo volgens de Belgische informatie de beurstaks (TOB) in en draagt die af. Je hoeft deze taks voor zulke transacties dan niet zelf af te handelen.',
          'Dat betekent niet dat al je fiscale verplichtingen zijn overgenomen. Andere belastingen en aangiftes hangen af van je beleggingen en persoonlijke situatie. Controleer daarom altijd de voorwaarden voor Belgische klanten en de actuele fiscale informatie.',
          'Via Saxo kun je onder meer aandelen, ETF’s en obligaties op verschillende beurzen kopen. Je kiest zelf waarin je belegt. Een groot aanbod maakt spreiding mogelijk, maar maakt een afzonderlijke belegging niet automatisch passend of minder risicovol.',
        ],
        note: 'Deze uitleg gaat over België. Gebruik hiervoor de Belgische productpagina hieronder; de aangeleverde verwijzingslink van Beurswatcher is niet bevestigd voor Belgische rekeningen.',
        links: [
          {
            label: 'Bekijk de officiële informatie voor België',
            href: 'https://www.home.saxo/nl-be',
          },
        ],
      },
      {
        id: 'zakelijk',
        title: 'Zelf beleggen met vermogen uit je onderneming',
        paragraphs: [
          'Heb je geld binnen je BV dat je voor langere tijd kunt missen? Met een zakelijke beleggingsrekening houd je beleggingen van de onderneming gescheiden van je privévermogen. Belastingen, vaste lasten en andere benodigde bedrijfsreserves horen bij die afweging.',
          'Saxo biedt zakelijke rekeningen waarmee je zelf orders kunt plaatsen in onder meer aandelen, ETF’s, obligaties en beleggingsfondsen. Een zakelijke rekening betekent niet dat Saxo automatisch het vermogen voor je beheert. Jij maakt de beleggingskeuzes, tenzij je afzonderlijk een andere dienst afspreekt.',
          'De voorwaarden en het klantonderzoek hangen af van de rechtsvorm en het land. Ook kunnen aanvullende kosten of een LEI-identificatie nodig zijn. Bekijk vooraf het productaanbod, de tarieven en welke overzichten je voor de administratie nodig hebt. Bespreek fiscale vragen over je onderneming met je eigen deskundige.',
        ],
        note: 'Beleg geen geld dat nodig is voor belastingen of de bedrijfsvoering. Koersverlies kan ook het vermogen van je onderneming raken.',
        links: [
          {
            label: 'Bekijk de zakelijke rekening en voorwaarden',
            href: 'https://www.home.saxo/nl-nl/accounts/corporate',
          },
          {
            label: 'Bekijk Saxo via Beurswatcher',
            href: saxoReferral,
            commercial: true,
          },
        ],
      },
    ],
    sources: [
      {
        label: 'Saxo — Belgische website en fiscale informatie',
        href: 'https://www.home.saxo/nl-be',
      },
      {
        label: 'Saxo — zakelijke rekening Nederland',
        href: 'https://www.home.saxo/nl-nl/accounts/corporate',
      },
      {
        label: 'Saxo — tarieven en voorwaarden',
        href: 'https://www.home.saxo/nl-nl/rates-and-conditions/',
      },
    ],
  },
  'american-express': {
    checkedAt: '11 oktober 2026',
    commercial: true,
    disclosure: commercialDisclosure,
    riskNote:
      'Een betaalkaart is geen belegging. Vergelijk de kaartkosten met voordelen die je echt gebruikt, controleer acceptatie en betaal je rekening volgens de voorwaarden.',
    sections: [
      {
        id: 'punten',
        title: 'Punten sparen met uitgaven die je toch al doet',
        paragraphs: [
          'Met bepaalde American Express-kaarten spaar je Membership Rewards-punten bij betalingen. Bij de reguliere Gold en Platinum Card gaat het doorgaans om één punt per bestede euro. Je kunt punten onder voorwaarden overzetten naar deelnemende reisprogramma’s, zoals Flying Blue, British Airways en Singapore Airlines.',
          'De waarde van een punt is niet vast. Ze hangt af van de manier waarop je punten gebruikt, de beschikbaarheid en de omrekenverhouding van het betreffende programma. Een puntenaantal is daarom geen gegarandeerde gratis vlucht of vast geldbedrag. Belastingen en toeslagen kunnen nog gelden.',
          'Er zijn regelmatig welkomstacties voor nieuwe kaarthouders. Het puntenaantal, de vereiste besteding en de voorwaarden verschillen per actie. Controleer de actuele aanbieding en voorkom dat je extra uitgeeft alleen om een bonus te halen.',
        ],
        links: [
          {
            label: 'Bekijk de actuele Platinum-aanbieding',
            href: amexReferral,
            commercial: true,
          },
        ],
      },
      {
        id: 'kaarten-vergelijken',
        title: 'Welke kaartvoordelen gebruik je werkelijk?',
        paragraphs: [
          'Een uitgebreidere kaart kost meer en biedt doorgaans meer reisvoorzieningen. Vergelijk daarom de jaarlijkse bijdrage met je eigen gebruik. Denk aan hoeveel je reist, of je bestaande verzekeringen al dekking bieden en of de kaart wordt geaccepteerd waar je betaalt.',
          'De reguliere Blue, Green, Gold en Platinum Cards verschillen in puntenopbouw en voorzieningen. Bij controle bedragen de standaard maandelijkse bijdragen respectievelijk € 3, € 6,50, € 20 en € 75. Eventuele vrijstellingen of acties hebben eigen voorwaarden.',
        ],
        bullets: [
          'Blue: één Membership Rewards-punt per € 2 besteding. De kaartbijdrage kan vervallen bij minimaal € 3.000 jaarbesteding, volgens de voorwaarden.',
          'Green: Membership Rewards-punten sparen, met een beperkter pakket dan Gold en Platinum.',
          'Gold: onder meer punten sparen, vier Priority Pass-loungebezoeken per lidmaatschapsjaar en kaartgebonden reis- en verzekeringsvoordelen.',
          'Platinum: een uitgebreider pakket met loungetoegang, Privium Plus voor de hoofdkaarthouder en aanvullende reisvoorzieningen, onder de geldende voorwaarden.',
          'Flying Blue-kaarten: een aparte kaartreeks voor wie Flying Blue Miles wil sparen. De voorwaarden en eventuele XP-voordelen verschillen van de reguliere Membership Rewards-kaarten.',
        ],
        note: 'De verwijzingslink op deze pagina gaat naar Platinum. Gebruik voor een vergelijking van alle kaarten de officiële kaartvergelijking.',
        links: [
          {
            label: 'Vergelijk alle kaarten bij American Express',
            href: 'https://www.americanexpress.com/nl-nl/creditcard/cards/?filter=membershiprewards',
          },
        ],
      },
      {
        id: 'luchthaven',
        title: 'Wat heb je aan lounges en Privium?',
        paragraphs: [
          'Met Platinum kun je onder voorwaarden gebruikmaken van het Global Lounge Collection-netwerk met meer dan 1.550 lounges. Daaronder vallen deelnemende Priority Pass-lounges en Centurion Lounges. Reservering, capaciteit, openingstijden en de regels van de betreffende lounge kunnen de toegang beperken.',
          'Of je een gast kunt meenemen en of daar kosten aan verbonden zijn, verschilt per loungeprogramma. De voorwaarden van Priority Pass zijn niet automatisch dezelfde als die van Centurion of andere lounges. Controleer die voor je reis.',
          'Privium Plus is bij Platinum inbegrepen voor de hoofdkaarthouder, na aanmelding en onder de voorwaarden van Privium. Op Schiphol geeft dat onder meer toegang tot Privium-faciliteiten, voorrang bij security en waar van toepassing versnelde grenspassage. Businessclass inchecken is alleen mogelijk bij deelnemende luchtvaartmaatschappijen en volgens hun voorwaarden.',
          'Ook voor reis-, annulerings- en aankoopverzekeringen gelden dekkingsgrenzen en uitsluitingen. Soms moet een reis of aankoop met de kaart betaald zijn. Tel alleen voordelen mee die je werkelijk kunt en gaat gebruiken; een langere lijst voorzieningen maakt een duurdere kaart niet vanzelf voordeliger.',
        ],
        links: [
          {
            label: 'Bekijk Platinum en de actuele voorwaarden',
            href: amexReferral,
            commercial: true,
          },
        ],
      },
    ],
    guide: {
      title: 'De AMEX-gids van Beurswatcher',
      description:
        'Achtergronduitleg in een PDF. Let op: de gids bevat een welkomstactie die op 31 augustus 2026 is verlopen. De genoemde bonus geldt niet meer; controleer de huidige voordelen en voorwaarden bij American Express.',
      href: suppliedGuides.amex,
    },
    sources: [
      {
        label: 'American Express — kaarten en bijdragen',
        href: 'https://www.americanexpress.com/nl-nl/creditcard/',
      },
      {
        label: 'American Express — Platinum en voorwaarden',
        href: 'https://www.americanexpress.com/nl-nl/creditcard/platinum-card/',
      },
      {
        label: 'American Express — Gold en voorwaarden',
        href: 'https://www.americanexpress.com/nl-nl/creditcard/gold-card/',
      },
    ],
  },
};

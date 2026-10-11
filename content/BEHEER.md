# Beheer door Kay

Bijgewerkt op 11 oktober 2026. Kay verwerkt gewone websitecontent in de repository en publiceert via GitHub/Vercel. Daniel levert inhoud en feedback aan. De aparte, afgeschermde Instagram-beheerpagina is beperkt tot de Reel-selectie en koppeling; er is geen algemeen CMS voor artikelen of pagina’s.

## Inhoudsbestanden

- app/data.ts: artikelen en basisgegevens. Voorbeeldartikelen pas als eigen blogs presenteren nadat Daniel ze inhoudelijk heeft aangeleverd of goedgekeurd.
- app/about-copy.ts: de aangeleverde tekst voor Over mij.
- app/guide-data.ts: algemene uitleg bij calculators, met vragen, voorbeelden en FAQ’s. Controleer voorbeelden opnieuw wanneer een rekenmodel verandert.
- app/topic-content.ts en app/topic-lessons.ts: algemene hoofdstukken, aandachtspunten, voorbeelden en bronnen per onderwerp. Dit zijn geen eigen analyses of persoonlijke beleggingsgegevens van Daniel.
- app/learning-library.ts en app/topic-directory.tsx: samenhang tussen onderwerpen, uitleg, herkenbare voorbeeldblogs en tools.
- app/topic-inline-links.ts: maximaal twee inhoudelijk gekozen interne links per onderwerp. verify-learning.mjs controleert de gerenderde links en bestemmingen.
- app/partner-editorial.ts: uitgewerkte ontvangen partnercopy, met bronnen, controledatum, kanttekeningen en gidsverwijzingen.
- app/partner-facts.ts: compacte partnerinformatie. Houd die gelijk aan de langere producttekst.
- app/partner-links.ts: exact ontvangen trackinglinks en gids-URL’s. Wijzig trackingparameters niet om zelf een andere product- of landbestemming te construeren.
- app/partner-pages.tsx en app/partner-overview.tsx: de weergave van partnerinformatie. Ontvangen materiaal, correcties en te bevestigen afspraken staan in [PARTNER_PUBLICATIE.md](PARTNER_PUBLICATIE.md).
- app/brand-events.tsx: de lege eventagenda. Het eerder aangekondigde event is geannuleerd; de pagina blijft beschikbaar voor toekomstige bevestigde bijeenkomsten.

## Redactionele richting

Beurswatcher legt uit wat een bezoeker kan lezen, leren, berekenen of vergelijken. Schrijf nuchter, toegankelijk en concreet, met korte zinnen die hun betekenis behouden. Persoonlijke achtergrond en ontvangen persoonlijke ervaringen mogen aan Daniel worden toegeschreven; verzin geen ervaringen, resultaten of aanbevelingen.

Geen externe nieuwsartikelen, nieuwsaggregator of automatisch overgenomen samenvattingen. De markthub geeft marktgegevens en publicatieplanning. Externe links dienen als bron, productinformatie of herkenbare sociale/commerciële bestemming.

Algemene educatie is geen persoonlijk financieel advies. Een disclaimer corrigeert geen ongefundeerde belofte. Zet korte relevante risico- en voorwaardeninformatie bij de inhoud, zonder dezelfde lange tekst overal te herhalen. Onderscheid beleggen, sparen, geblokkeerd pensioenvermogen en betaalkaartvoordelen. Benoem een bekende commerciële relatie herkenbaar; verzin de beloning of het bezoekersvoordeel niet.

## Marktweergaven en macroplanning

app/market-hub.tsx en app/tradingview-overview.ts gebruiken TradingView. De huidige indexreferenties zijn FOREX.com CFD-prijzen voor S&P 500, Nasdaq 100 en Dow Jones. De zichtbare tekst vermeldt dat deze kunnen afwijken van officiële indexstanden. Vertraagde Amerikaanse aandelenbewegingen staan apart. Een geladen script bewijst niet dat ieder instrument data heeft; controleer de echte widget in de browser. Geen scraping of herverdeling via een eigen API.

app/api/markt/route.ts retourneert nog demoFeed uit app/market-data.ts. Deze adapter blijft voorbeelddata; verwar hem niet met de externe weergaven. Controleer oude markt-subpagina’s op voorbeeldlabels voordat ze anders worden gepresenteerd.

app/api/macro/route.ts haalt kosteloos CBS OData-planning (NL) en de BEA JSON-releasekalender (VS) op, zonder sleutel of abonnement. De selecties komen uit app/macro-parsers.ts; er worden geen nieuwsartikelen geïmporteerd. Succesvolle gecombineerde resultaten worden maximaal één uur in procesgeheugen bewaard; bij bronproblemen wordt eerder opnieuw geprobeerd. Dit is ophalen op aanvraag, geen garantie op een zelfstandig elk uur draaiend proces.

app/macro-snapshot.json is de gedateerde noodkopie. Een bruikbare kopie wordt als bewaarde planning getoond; de herstelcode begrenst de bruikbaarheid op zeven dagen. Niet-beschikbare bronnen krijgen geen verzonnen actuele planning.

Alleen de Amerikaanse selectie uit app/macro-data.ts wordt als aanvullende handmatige BLS/Fed-planning gebruikt. Controleer de bronnen en werk macroCheckedAt alleen bij na een echte controle. De huidige waarde is 26 september 2026 en bewijst niet dat nadien niets is gewijzigd. Er zijn geen consensusverwachtingen, live uitslagen of gegarandeerd volledige dekking. Tijden worden in Europe/Amsterdam weergegeven. Trading Economics is een externe kalender, geen aangesloten API.

ECB-wisselkoersen worden via /api/wisselkoersen opgehaald en gecachet. Behoud bron en werkelijke peildatum bij storingen. Bronnen: [CBS](https://www.cbs.nl/nl-nl/publicatieplanning), [BEA](https://www.bea.gov/news/schedule), [BLS](https://www.bls.gov/schedule/), [Federal Reserve](https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm), [ECB](https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml), [TradingView](https://www.tradingview.com/widget-docs/).

## Instagram en formulieren

De actuele status voor de beperkte Instagram-beheerpagina staat in [INSTAGRAM-KOPPELEN.md](INSTAGRAM-KOPPELEN.md). Automatisch nieuwe Reels ophalen vereist nog echte Meta-configuratie, accounttoestemming en eindcontrole. Gewone contentplaatsing blijft bij Kay.

De contact- en nieuwsbriefendpoints bewaren gegevens in de geconfigureerde database. Controleer opslag, foutmeldingen en afmelden met de bedoelde omgeving. Databaseopslag is niet hetzelfde als e-mailbezorging of een actieve nieuwsbriefcampagne; claim die pas wanneer afzonderlijk ingesteld en getest.

## Zoekmachines en domein

app/site-config.ts beheert de canonieke host voor metadata, Open Graph, sitemap en schema. De toegestane productiehosts zijn https://beurswatcher.vercel.app en https://www.beurswatcher.nl; zonder BEURSWATCHER_SITE_URL valt de code terug op de Vercel-host. De bedoelde eigen-domeininstelling is BEURSWATCHER_SITE_URL=https://www.beurswatcher.nl. Het is een buildinstelling: na wijziging opnieuw bouwen.

De oorspronkelijke mededeling dat het domein op 8 oktober niet bereikbaar was, is geen actuele status. Deze documentatieronde voert geen nieuwe DNS-, HTTPS-, Vercel- of Search Console-controle uit. Controleer de productieomgeving wanneer domeinconfiguratie verandert.

Bij de www-instelling retourneert de Next-configuratie 308-redirects van beurswatcher.vercel.app en beurswatcher.nl naar hetzelfde pad op www.beurswatcher.nl, met behoud van queryparameters. Andere deploymenthosts en lokale previews krijgen deze domeinredirect niet. Voorkom tegengestelde Vercel-redirects en test rechtstreeks een tool, onderwerp en uitlegpagina.

Algemene uitlegpagina’s hebben eigen titels, beschrijvingen, canonicals en inhoudsgebonden schema. app/sitemap.ts bevat de bedoelde publieke pagina’s. Voorbeeldblogs, zoeken en afgeschermde beheerpagina’s staan niet in de sitemap; behoud hun passende noindex. /markt/macro staat wel in de sitemap en is niet dezelfde route als een oude voorbeeldagenda. Verander een voorbeeldblog pas naar indexeerbaar wanneer label, inhoud, metadata en sitemap samen zijn bijgewerkt.

**Geen sitemap indienen en geen indexeringsverzoek versturen zonder een nieuwe uitdrukkelijke opdracht van Kay.** Een bestaande sitemap-URL en correct domein zijn geen opdracht om die in Search Console in te dienen. Een geldige canonical bewijst geen indexering.

## Makercredit

app/site-schema.tsx noemt Beurswatcher als uitgever en Sitesnit als bijdrager aan webdesign en ontwikkeling. Dit sluit aan op de zichtbare footercredit en lokale makerpagina. Financiële uitleg krijgt geen Sitesnit-auteurschap. De makerpagina verwijst naar de juiste Sitesnit-case en homepage.

Deze vermelding garandeert geen backlinkwaarde of hogere positie. Geen verborgen links, trefwoordherhalingen of verzonnen commerciële afspraken toevoegen. De voorwaarden van de Sitesnit-relatie en eventuele vergoeding, korting of verplichte linkplaatsing zijn niet in dit dossier bevestigd; beoordeel disclosure en linkattributen op basis van de werkelijke afspraak. JSON-LD vervangt die beoordeling niet.

## Publicatiecontrole

1. Controleer de inhoud tegen bron en datum. Houd ontvangen partnercopy apart van onbekende beloningsafspraken; volg [PARTNER_PUBLICATIE.md](PARTNER_PUBLICATIE.md).
2. Test links, dropdowns, filters, downloads en relevante routes op desktop en mobiel. Controleer dat de vervallen eventinschrijving niet opnieuw zichtbaar is.
3. Draai bij codewijzigingen typecheck, lint, toepasselijke tests en productiebuild. Controleer calculatorvoorbeelden tegen de berekeningen. Bij uitsluitend documentwijzigingen volstaan inhouds- en diffcontroles.
4. Publiceer alleen binnen de actuele opdracht en naar het juiste Beurswatcher-project. Een geslaagde lokale controle bewijst niet dat productie is bijgewerkt.
5. Controleer na een deployment echte statuscodes, redirects, canonicals, robots.txt, sitemap-inhoud en schema. Sitemap indienen blijft uitgesloten tot nieuwe toestemming.

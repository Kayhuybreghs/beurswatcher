# Inhoud en bronnen van Beurswatcher

Bijgewerkt op 11 oktober 2026. Kay beheert gewone websitecontent in de repository; er is geen algemeen CMS. Daniel levert teksten, eigen analyses en correcties aan.

## Waar staat wat?

- [BEHEER.md](BEHEER.md): inhoudsbestanden, marktdata, zoekmachines en publicatiecontroles.
- [DANIEL_AANLEVERING.md](DANIEL_AANLEVERING.md): ontvangen materiaal en concrete openstaande vragen.
- [PARTNER_PUBLICATIE.md](PARTNER_PUBLICATIE.md): herkomst van partnercopy en links, correcties, primaire bronnen en commerciële bevestigingen.
- [INSTAGRAM-KOPPELEN.md](INSTAGRAM-KOPPELEN.md): beperkte Instagram-beheerpagina, koppeling en echte activeringstest.

## Partners

De partnercopy en aangeleverde links voor Scalable Capital, Delta, Brand New Day, Saxo en American Express zijn ontvangen. app/partner-editorial.ts bevat de uitgewerkte tekst, bronvermeldingen, controledatum en relevante kanttekeningen. app/partner-facts.ts bevat compacte productinformatie. app/partner-links.ts bewaart de exact aangeleverde tracking- en gidslinks.

Er is geen aangeleverde Delta-affiliate-URL; Delta-knoppen gebruiken officiële productinformatie. De Saxo-link is op 11 oktober 2026 gecontroleerd en opent de algemene Nederlandse rekeningopeningspagina. Dat bevestigt geen Belgische of zakelijke aanmeldroute of specifieke aanbieding. De American Express-verwijzing is specifiek voor Platinum; de vergelijking van alle kaarten gebruikt een gewone officiële vergelijkingslink.

De AMEX-gids bevat een verlopen actie en krijgt direct bij de link een waarschuwing. De pensioengids blijft buiten publieke downloads tot de onjuiste formulering over 10% ineens opnemen is gecorrigeerd. Geen van beide oorspronkelijke Drive-bestanden wordt aangepast. Banners zijn niet aangeleverd. Zie [het publicatiedossier](PARTNER_PUBLICATIE.md).

## Uitleg en eigen artikelen

Onderwerp- en tooluitleg is algemene educatieve inhoud. Presenteer die niet als Daniels eigen analyse, portefeuilledata of goedgekeurde persoonlijke visie. Voorbeeldblogs houden hun voorbeeldlabel en noindex totdat echte, goedgekeurde blogs ze vervangen. Geen externe nieuwsartikelen, gekopieerde nieuwssamenvattingen of nieuwsaggregator toevoegen.

## Events

Het eerder aangekondigde event gaat niet door. app/brand-events.tsx toont daarom dat er nog geen nieuw event is aangekondigd. /events blijft beschikbaar. Voeg pas na bevestiging een nieuwe datum, locatie, programma en inschrijflink toe; behandel oude ticketlinks of conceptprogramma’s niet als actueel aanbod.

## Marktgegevens

- **Markthub en Home:** app/market-hub.tsx gebruikt TradingView met bronvermelding. app/tradingview-overview.ts configureert FOREX.com CFD-referentieprijzen voor S&P 500, Nasdaq 100 en Dow Jones. Deze kunnen afwijken van officiële indexstanden; het zijn geen FRED-dagkoersen. De aparte widget toont Amerikaanse koersbewegingen. Beschikbaarheid en vertraging liggen bij de bron.
- **Macroagenda:** /api/macro haalt CBS (Nederland) en BEA (Verenigde Staten) automatisch op, aangevuld met handmatig gecontroleerde BLS/Fed-momenten. De agenda bevat planning, geen live uitslagen of verwachtingen. Trading Economics is geen aangesloten API.
- **Wisselkoersen:** /api/wisselkoersen gebruikt de ECB en toont bron en peildatum; een bewaarde snapshot krijgt geen nieuw verzonnen tijdstip.
- **Oude voorbeeldadapter:** /api/markt en app/market-data.ts bevatten nog expliciete voorbeelddata. Een werkende externe widget maakt deze adapter niet live.

Bronnen: [TradingView](https://www.tradingview.com/widget-docs/), [CBS-publicatieplanning](https://www.cbs.nl/nl-nl/publicatieplanning), [BEA-publicaties](https://www.bea.gov/news/schedule), [ECB-koersen](https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml).

## Reels

De ReelRail staat op Home en Over mij. reels.json is de bestaande handmatige basisselectie; de aparte Instagram-beheerpagina kan de selectie beheren. Automatische nieuwe media en echte tokenvernieuwing zijn pas bevestigd na Meta-configuratie, toestemming en eindcontrole met Daniels account. Gebruik [de actuele Instagram-instructies](INSTAGRAM-KOPPELEN.md); bewaar geen toegangstokens in contentbestanden.

## Publicatie

Controleer tekst en links samen met de zichtbare pagina, inclusief mobiel. Een nieuwe controledatum vraagt een echte broncontrole; een deployment alleen verandert geen redactionele datum. **Dien de sitemap niet in zonder een nieuwe, expliciete opdracht.**

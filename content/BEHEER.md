# Beheer door Kay

De website heeft geen CMS, klantdashboard of publiceeromgeving. Kay verwerkt aangeleverde teksten in de repository en publiceert via GitHub/Vercel. Daniel levert inhoud en feedback aan; beheer en plaatsing blijven een dienst van Kay.

- `app/data.ts`: eigen artikelen en basisgegevens. De huidige artikelen zijn educatieve voorbeelden; vervang deze door goedgekeurde eigen blogs en pas het voorbeeldlabel pas dan aan.
- `app/about-copy.ts`: de tekst uit Daniels aangeleverde Word-document.
- `app/guide-data.ts`: 22 algemene uitlegpagina’s voor de negen calculators. Elk onderwerp heeft een eigen vraag, kort antwoord, uitleg, rekenvoorbeeld en FAQ. Controleer voorbeelden tegen de calculator bij modelwijzigingen.
- `app/topic-content.ts`: de inhoudelijke basis, aandachtspunten en FAQ’s per hoofdonderwerp.
- `app/topic-lessons.ts`: uitgebreide hoofdstukken, voorbeelden, begrippenvergelijkingen en primaire bronnen voor alle 12 onderwerpen. Houd voorbeelden fictief en onderscheid algemene uitleg van Daniels persoonlijke visie.
- `app/learning-library.ts`: combineert algemene uitleg en herkenbaar gemarkeerde voorbeeldblogs voor zoeken en filteren.
- `app/topic-directory.tsx`: onderwerpen, artikelcategorieën en bijbehorende tools.
- `app/partner-facts.ts`: productinformatie (controleer de bestaande bestandsindeling bij wijzigingen); persoonlijke partnerteksten volgen na aanlevering.
- `app/api/macro/route.ts`: gratis CBS OData-kalender (NL) en BEA JSON-releasekalender (VS), automatisch opgehaald en maximaal een uur in servergeheugen bewaard. Geen sleutel of abonnement. `app/macro-parsers.ts` selecteert alleen macropublicaties; geen artikelen worden geïmporteerd. `app/macro-snapshot.json` is de gedateerde noodkopie, bij bronuitval maximaal zeven dagen bruikbaar en zichtbaar als bewaarde planning.
- `app/macro-data.ts`: aanvullende BLS/Fed-momenten blijven handmatig gecontroleerd en als zodanig gelabeld. Controleer die bronnen en werk `macroCheckedAt` bij. De API omvat geen live uitslagen, consensus, volledige Amerikaanse kalender of indexkoersen. Tijden worden naar Europe/Amsterdam omgerekend. Test met `node verify-macro.mjs https://beurswatcher.vercel.app`.
- `app/topic-inline-links.ts`: maximaal twee handgekozen interne links per onderwerp; tekst en hoofdstuk zijn expliciet gekozen. `verify-learning.mjs` controleert de gerenderde links en bestemmingen.

## Redactionele richting

Beurswatcher spreekt vanuit het merk. Persoonlijke achtergrond staat op Over mij. Het uitgangspunt is het heft in eigen handen nemen: begrijpen, zelf onderzoeken en bewuste financiële keuzes maken. Geen rendementsgaranties.

Geen externe nieuwsartikelen, nieuwsaggregator of automatisch overgenomen samenvattingen. De markthub bevat marktdata, koersbewegingen en de macroagenda. Externe links zijn uitsluitend achtergrondbronnen en noodzakelijke product-/sociallinks. Verdieping bestaat uit eigen uitleg en blogs van Beurswatcher.

## Zoekmachines en voorbeeldblogs

De uitlegpagina’s hebben unieke titels, beschrijvingen, canonieke links en Article/FAQ/Breadcrumb-gegevens die overeenkomen met de zichtbare inhoud. `app/sitemap.ts` neemt uitleg, tools en onderwerp­pagina’s mee. De bestaande voorbeeldblogs hebben `noindex` en staan niet in de sitemap. Bij vervanging door goedgekeurde blogs: pas zowel het voorbeeldlabel in de bibliotheek en artikelpagina als de metadata en sitemap aan. Algemene uitleg is niet gepresenteerd als een persoonlijke visie of goedgekeurde tekst van Daniel.

`app/site-config.ts` beheert het publieke domein voor alle canonieke links, Open Graph-URL’s, de sitemap, robots.txt en gestructureerde gegevens, inclusief de makerpagina. De buildinstelling `BEURSWATCHER_SITE_URL` accepteert alleen `https://beurswatcher.vercel.app` en `https://www.beurswatcher.nl`. Zonder instelling blijft de huidige Vercel-URL gelden. Gebruik geen lokale of tijdelijke preview-URL als canonical.

## Voorbereiding eigen domein

Doel: `https://www.beurswatcher.nl`, met behoud van de bestaande paginapaden. Op 8 oktober 2026 gaven `beurswatcher.nl` en `www.beurswatcher.nl` bij onze DNS-controle geen adres terug (NXDOMAIN). HTTPS was niet bereikbaar. Dit zegt niet of het domein beschikbaar is of wie de eigenaar is. Registratie, eigendom, DNS en koppeling aan het Vercel-project zijn nog niet bevestigd.

De domeinwissel staat daarom **niet aan**. Ook zijn geen DNS-records, Vercel-instellingen of publieke websites gewijzigd.

Bij de latere, goedgekeurde overstap:

1. Bevestig het domeineigendom en koppel zowel `www.beurswatcher.nl` als `beurswatcher.nl` aan hetzelfde Beurswatcher-project. Gebruik de actuele DNS-instructies die Vercel voor dat project toont; verzin geen IP-adres of CNAME.
2. Controleer dat de nieuwe host daadwerkelijk deze website serveert en een geldig HTTPS-certificaat heeft. Test ook een tool, een onderwerp en een uitlegpagina rechtstreeks.
3. Zet pas dan `BEURSWATCHER_SITE_URL=https://www.beurswatcher.nl` in de productie-buildomgeving en bouw opnieuw. Canonicals, Open Graph, sitemap en schema nemen gezamenlijk die waarde over. Alleen een runtimevariabele wijzigen werkt niet voor reeds statisch opgebouwde pagina’s.
4. De nieuwe build stuurt verzoeken met host `beurswatcher.vercel.app` of `beurswatcher.nl` met HTTP 308 naar hetzelfde pad op `www.beurswatcher.nl`. Queryparameters blijven behouden. Lokale previews, andere deploymenthosts en de `www`-host zelf krijgen deze redirect niet. Oude paginapad-aliases blijven eveneens werken. Vermijd een tegengestelde domeinredirect in Vercel; dat veroorzaakt een lus.
5. Controleer de live HTTP-statussen, redirects, canonicals, robots.txt, sitemap en gestructureerde gegevens. De bestaande `noindex` voor voorbeeldblogs, zoeken en de voorbeeldagenda blijft bewust behouden. Draai `verify-learning.mjs` met dezelfde domeininstelling als de gecontroleerde build.
6. Verifieer de oude en nieuwe site in Search Console, dien de nieuwe sitemap in en gebruik waar van toepassing de adreswijziging. Controleer daarna indexering en 404-meldingen. Behoud oude-domeinredirects minstens een jaar, bij voorkeur langer, en werk beheerde profiel- en verwijzingslinks bij.

Een voorbereide canonical of geslaagde lokale build bewijst geen domeinkoppeling, Search Console-eigendom of indexering. Die controles volgen na de daadwerkelijke overstap. Zie [Google: site verhuizen](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) en [canonieke URL’s](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## Macroplanning

De huidige selectie is handmatig gecontroleerd en geen volledige automatische kalender. Klikken opent uitleg en de officiële bron. De filters werken lokaal op de geselecteerde momenten; afgelopen datums verdwijnen uit de standaardselectie. Trading Economics is alleen een expliciete externe kalenderlink, geen gekoppelde databron. Er zijn geen nieuwe betaalde diensten of accounts aangemaakt.

## Publiceren

### Makercredit in structured data

`app/site-schema.tsx` legt Beurswatcher vast als uitgever en Sitesnit als bijdrager aan het webdesign en de ontwikkeling. De gedeelde websitegegevens verschijnen één keer per pagina en sluiten aan op de zichtbare footercredit. Op `/achter-de-website` beschrijft `AboutPage` de makerpagina, met de twee bestaande Sitesnit-bestemmingen als gerelateerde links. De financiële uitleg behoudt Beurswatcher als auteur en uitgever. De identifiers volgen de ingestelde `BEURSWATCHER_SITE_URL`.

Dit is feitelijke naamsvermelding, geen garantie op extra backlinks of een hogere positie. Voeg geen verborgen links, trefwoordherhalingen, verzonnen commerciële afspraken of Sitesnit-auteurschap aan financiële artikelen toe. De commerciële relatie en eventuele vergoeding, korting of verplichte linkplaatsing zijn nog niet bevestigd. Bevestig die vóór publicatie om de bestaande zichtbare links en eventuele disclosure correct te beoordelen; JSON-LD vervangt die beoordeling niet. Deze aanpassing is lokaal ter beoordeling en publiceert niets.

Controleer gewijzigde routes, mobiele menu’s en filters. Voer typecheck, toepasselijke tests en de productiebuild uit. Publiceer naar de gekoppelde GitHub-branch en controleer de Vercel-deployment.

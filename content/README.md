# Inhoud bijwerken

## Reels

`reels.json` bevat de centrale selectie, gecontroleerd op 9 september 2026. Dit is handmatig beheerde inhoud; de site claimt geen automatische Instagram-feed. De originele permalinks staan per item in het bestand. De zes thumbnails komen van de openbare OG-afbeeldingen van die oorspronkelijke Beurswatcher-Reels en staan in `public/reels/`.

Voeg een item toe met `id`, `url`, `thumbnail`, `title`, `publishedAt` (YYYY-MM-DD) en `tags`. Kopieer het bijbehorende, toegestane beeld naar `public/reels/` en gebruik `/reels/bestandsnaam.jpg` als pad. Titels zijn korte redactionele omschrijvingen. Zet de datum van de controle in `updatedAt` en bouw de site opnieuw.

Gebruik alleen geverifieerde Reels van het officiële profiel. De adapter in `app/reel-data.ts` verwijdert dubbele of onvolledige items, sorteert nieuwste eerst en toont maximaal zes passende items. Tags sluiten aan bij de onderwerpen, zoals ETF, Strategie, Pensioen, Vermogen, Aandelen, Markt en Dividend. Een topic zonder passende Reel toont geen verzonnen inhoud. Een ontbrekend beeld krijgt een merkfallback.

Voor latere automatische synchronisatie kan dezelfde adapter worden gevoed vanuit een geautoriseerde Instagram-integratie. Kay beheert de configuratie; er komt geen CMS. Bewaar API-sleutels uitsluitend op de server. De zichtbare rail hoeft daarvoor niet te veranderen.

## Partners

Productteksten, officiële bronnen en de controledatum staan in `app/partner-facts.ts`. Kosten verschillen per product en kunnen wijzigen. Controleer de gekoppelde officiële pagina’s bij iedere inhoudelijke update. Vul later uitsluitend de goedgekeurde affiliate-URL’s in `affiliateLinks` in, met dezelfde slug als de partner. De knop en commerciële vermelding passen zich hierop aan.

Scalable gaat over zelf beleggen en periodieke inleg; Delta over portefeuilleoverzicht; Brand New Day over geblokkeerd pensioenbeleggen; Saxo over zakelijk beleggen; AMEX uitsluitend over reizen en werkelijk gebruikte kaartvoordelen. Persoonlijke ervaringen worden pas toegevoegd wanneer Daniel ze zelf aanlevert en goedkeurt.

## Events

`communityEvent` in `app/brand.tsx` bevat de gecontroleerde informatie voor de Beleggersborrel. Bron: [officiële ticketpagina](https://weeztix.shop/95kumuq5), details gecontroleerd op 8 september 2026. De overzichtspagina verwijst naar de detailpagina en vandaar naar de officiële ticketverkoop. Er zijn geen claims over beschikbare plaatsen. Toekomstige formats zijn ideeën, geen aangekondigde evenementen.

## Indexkoersen: nog aan te sluiten

`/api/markt`, de indexkoersen en de earningspagina zijn expliciet voorbeelden. De macroagenda is een handmatig gecontroleerde selectie van officiële NL/VS-publicaties. Het hoofdmarktoverzicht heeft echte ECB-informatie zoals hieronder beschreven. Een echte indexfeed vereist een geschikte databron, credentials en rechten voor openbare weergave. Het brononderzoek is geen actieve integratie.

- Twelve Data: [API-documentatie](https://twelvedata.com/docs/introduction/overview), [indexdekking](https://twelvedata.com/indices) en [commercieel gebruik](https://support.twelvedata.com/en/articles/5332349-commercial-and-personal-usage). Controleer het bedrijfsabonnement en afzonderlijke indexrechten.
- EODHD: [economische gebeurtenissen](https://eodhd.com/financial-apis/economic-events-data-api), [earningskalender](https://eodhd.com/financial-apis/calendar-upcoming-earnings-ipos-and-splits) en [commerciële licentie](https://eodhd.com/commercial-pricing). Openbare weergave moet in de overeenkomst zijn gedekt.

Na selectie moeten naast `app/market-data.ts` ook de vaste ticker, homepagecijfers en historische voorbeeldreeksen worden vervangen. Tijdstip, vertraging, herkomst en foutstatus moeten op de site herkenbaar blijven.


## Plaatsing, nieuws en ECB

Dezelfde `ReelRail` verschijnt op Home en Over mij. Tags blijven bewaard als metadata; plaats geen automatisch themagerelateerde rail onder elke pagina.

Externe nieuwsartikelen zijn verwijderd. Beurswatcher publiceert eigen blogs en verdieping. Kay beheert inhoud via de code en GitHub; er is geen CMS of publiceeromgeving voor de klant. Zie `BEHEER.md`.

ECB-XML: https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml. Gebruikbeleid: https://www.ecb.europa.eu/stats/ecb_statistics/governance_and_quality_framework/html/usage_policy.de.html. ECB-bron en peildatum zijn in beeld. Wisselkoersen worden server-side opgehaald via `/api/wisselkoersen` en één uur gecachet. Bij uitval blijft de laatst bekende snapshot met het juiste label zichtbaar. Een hogere datum wordt niet verzonnen bij storingen. `app/macro-data.ts` bevat de geselecteerde officiële macroplanning voor Nederland en de VS; controleer de bronnen bij redactionele updates.

Conceptprogramma’s voor Events staan in `app/event-program.tsx`; Daniel moet inhoud, timing en eventuele online bijeenkomst definitief vaststellen. Verwijder het conceptlabel pas na bevestiging.

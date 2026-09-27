# Actieve gratis kalenderkoppeling — 27 september 2026

De eerdere conclusie hieronder is achterhaald voor de geselecteerde CBS- en BEA-publicaties: beide officiële feeds zijn rechtstreeks getest met HTTP 200 en nu aangesloten via `/api/macro`.

- Nederland: https://www.cbs.nl/odata/v1/Events — OData, filter op taal en publicatiedatum. Specificatie: https://www.cbs.nl/odata/swagger.html. Gebruik onder CC BY 4.0 met bronvermelding: https://www.cbs.nl/nl-nl/over-ons/website/copyright.
- Verenigde Staten: https://apps.bea.gov/API/signup/release_dates.json — officiële JSON-releasekalender, gelinkt vanuit https://www.bea.gov/news/schedule. Nationale bbp-, PCE/inkomen/bestedingen- en handelsmomenten geselecteerd. Vrij hergebruik: https://www.bea.gov/help/faq/147.
- Geen accounts, sleutels of betaalde API-abonnementen. De bestaande hostinglimieten blijven van toepassing.
- CBS filtert andere onderwerpen en Caribisch Nederland uit. Eigen korte toelichtingen; geen externe nieuwsartikelen of gekopieerde samenvattingen.
- BLS ICS gaf HTTP 403 in de directe test. Geen omzeiling toegepast. De bestaande BLS/Fed-selectie blijft apart zichtbaar als handmatig gecontroleerd. Deze combinatie is dus geen volledige automatische NL/VS-kalender.
- Opvragen: één uur servercache, vijf minuten CDN-cache; ophalen op bezoek, geen betaalde cron. Bij een bronstoring wordt alleen die bron vervangen door een maximaal zeven dagen oude, expliciet gedateerde kopie. Daarna ontbreekt die bron met een foutmelding. Andere bronnen blijven werken.
- Geen actuals, consensusverwachtingen of beurskoersen. Onbekende publicatietijden blijven onbekend. Tijden met offsets worden in Europe/Amsterdam getoond.

## Eerder onderzoek (historisch; onderstaande conclusie niet meer actueel)

# Economische kalender: gratis bronnen onderzocht

Gecontroleerd op 27 september 2026. Onderzoek, geen aangesloten feed. De bestaande kalender blijft een handmatig gecontroleerde NL/VS-selectie.

## Trading Economics

- API ondersteunt landen en datumbereiken: https://docs.tradingeconomics.com/economic_calendar/country/
- Toegang met een sleutel via een abonnement: https://docs.tradingeconomics.com/get_started/
- Geen bevestigd gratis productieaanbod gevonden voor alleen NL/VS. Een landenfilter is geen gratis licentie. Controleer openbare herpublicatie bij een eventuele offerte: https://tradingeconomics.com/api/pricing.aspx

## Alternatieven

| Optie | Wat is bevestigd? | Wat ontbreekt nog? |
| --- | --- | --- |
| TradingView-widget | Publieke kalenderwidget, filters en inbouwcode. https://www.tradingview.com/widget-docs/widgets/calendars/economic-calendar/ | Geen vrije JSON-API of volledige controle over het ontwerp. Nederlandse dekking eerst in de daadwerkelijke widget controleren; behoud hun bronvermelding. |
| Finance Calendar | De geïndexeerde eigen API-documentatie vermeldt gratis commercieel gebruik met zichtbare bronlink. https://www.financecalendar.com/api/ | Zowel de webopvraag als de directe API-test kon niet worden geverifieerd; de directe test gaf HTTP 403. Nederlandse dekking en betrouwbaarheid niet vastgesteld. Niet aangesloten. |
| Business Quant | Eigen documentatie vermeldt gratis Amerikaanse kalender-API met API-key. https://businessquant.com/docs/api/economic-calendar | Geen Nederlandse dekking beschreven. Voorwaarden voor een openbare commerciële website en feitelijke respons moeten nog worden gecontroleerd. Geen account aangemaakt. |
| XOOMAR | Eigen documentatie beschrijft een gratis Amerikaanse kalenderendpoint zonder sleutel. https://xoomar.com/markets/api/calendar | Directe test gaf HTTP 403. Gratis licentie is beperkter dan commerciële licentie; niet aannemen dat een volledige kalender opnieuw publiceren gratis mag. https://xoomar.com/terms |
| Officiële BLS-kalender | Automatisch bijgewerkte iCalendar-publicatieplanning van BLS: https://www.bls.gov/schedule/news_release/cpi.htm en https://www.bls.gov/schedule/news_release/bls.ics | Alleen BLS-publicaties, geen complete VS-kalender, geen consensusverwachtingen of uitslagen in de planning. Een eigen parser, tijdzoneverwerking, cache en foutafhandeling zijn nodig. |
| CBS | Officiële Nederlandse publicatieplanning: https://www.cbs.nl/nl-nl/publicatieplanning | Geen complete kalender-JSON-API bevestigd. RSS voor gepubliceerde berichten is niet hetzelfde als planning en wordt niet gebruikt om een nieuwsfeed toe te voegen. |

## Keuze voor de volgende stap

Voor een snelle inbouw is een TradingView-widget het onderzoeken waard. Controleer NL/VS-dekking en mobiele bediening voordat het bestaande overzicht wordt vervangen.

Voor de eigen Beurswatcher-vormgeving is een samenvoeging van officiële publicatieplanningen een mogelijkheid. Dat bespaart mogelijk abonnementskosten, maar vraagt ontwikkeling en brononderhoud en levert niet vanzelf dezelfde gegevens als Trading Economics. Geen complete gratis NL/VS-API is in deze controle zowel functioneel als qua herpublicatie bevestigd.

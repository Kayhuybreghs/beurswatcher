# Instagram en marktdata — koppelingen

## Instagram: eenvoudige koppeling voorbereid, wacht op Meta-configuratie en toestemming

Dezelfde ReelRail staat op Home en Over. De huidige selectie bestaat uit echte Reel-covers. De primaire knop opent de officiële Instagram-speler binnen Beurswatcher; de externe Instagram-link is afzonderlijk herkenbaar. Instagram kan de speler blokkeren wanneer inloggen nodig is, embeds uitstaan of de video niet beschikbaar is.

De afgeschermde pagina `/beheer/instagram` laat Daniel met een toegangscode de verbinding controleren, maximaal zes Reels kiezen/ordenen en de kaarttitels aanpassen. Automatisch de nieuwste zes tonen is de andere optie. De keuze wordt afzonderlijk van de mediacache gelezen. Instagram verbinden vereist eerst de Meta-appconfiguratie en daarna Daniels toestemming; tokens kopiëren is niet nodig. De oudere eenmalige `/koppelen/instagram`-route blijft als terugvalmogelijkheid bestaan. De bevestigde accountnaam is **@beurswatcher**, het profiel met circa 44.000 volgers; niet @beurswatchers. Volledige voorbereiding, gebruik en controles staan in [Instagram beheren](INSTAGRAM-KOPPELEN.md).

`/api/instagram/reels` gebruikt Instagram Login v26.0 en uitsluitend `instagram_business_basic` voor een Creator/Business-account. De verbinding bewaart het token versleuteld in Turso. De endpoint verifieert de accountnaam, valideert media-URL-hosts, beperkt de selectie tot Reels en geeft geen tokens of upstreamfouten terug. De oude servervariabelen `INSTAGRAM_USER_ID` en `INSTAGRAM_ACCESS_TOKEN` blijven bruikbaar voor een handmatige verbinding totdat de beheerde verbinding is opgeslagen.

Zonder deze gegevens retourneert de API `waiting` en een opgeslagen selectie. Na koppeling haalt de server op aanvraag maximaal eens per 15 minuten nieuwe Reels op; open pagina's verversen elke 15 minuten en bij terugkeer naar de tab. Bij storingen blijft de beheerde selectie beschikbaar. Dit is geen zelfstandig periodiek achtergrondproces.

Bij een beschikbare video-URL werkt de eigen speler: hover met muis speelt gedempt, verlaten pauzeert; tikken start met geluid, opnieuw tikken pauzeert; slechts één video tegelijk; buiten beeld en bij verlaten van de tab pauzeert de video. Voor verminderde beweging begint geen hover-preview. Als Instagram geen directe video aanbiedt (bijvoorbeeld vanwege gelicentieerde muziek), blijft de officiële embed beschikbaar. Er zijn nog geen afzonderlijke ondertitelbestanden aangeleverd.

De dagelijkse, beveiligde Vercel-taak vernieuwt geldige tokens vanaf maximaal dertig dagen resterende geldigheid. Ingetrokken of verlopen toegang vereist een nieuwe persoonlijke link. Nog vóór activering regelen: Meta-appconfiguratie, eventuele uitnodiging voor het eigen/beheerde account, toestemming en mediarechten, ondertitels indien beschikbaar, en de echte eindcontrole. De serverkoppeling en eigen videospeler zijn nog niet met Daniels toegang end-to-end getest; automatische vernieuwing is lokaal met gesimuleerde Meta-antwoorden getest, nog niet op zijn echte token.

Bronnen:
- https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login
- https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/get-started
- https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/business-login
- https://developers.facebook.com/documentation/instagram-platform/reference/instagram-media
- https://developers.facebook.com/documentation/instagram-platform/oembed

## Gratis marktdata

De markthub en mini-hub op Home gebruiken officiële TradingView-widgets, met intacte bronvermelding. De huidige configuratie in `app/tradingview-overview.ts` gebruikt FOREX.com CFD-referentieprijzen voor S&P 500, Nasdaq 100 en Dow Jones. Deze kunnen afwijken van de officiële indexstanden; het zijn geen FRED-dagkoersen. De aparte bewegingenwidget toont Amerikaanse stijgers, dalers en actieve aandelen. Dekking, beschikbaarheid en vertraging hangen van de bron af. Er worden geen widgetgegevens gescrapet of in een eigen API herverdeeld.

ECB-koersen blijven via de eigen server-API beschikbaar. De beleidskalender filtert verlopen data en verwijst naar de ECB. Externe nieuwsartikelen en de nieuwsaggregator zijn verwijderd; de markthub toont marktgegevens en publicatieplanning. Algemene uitleg en eigen blogs staan onder Verdieping, met herkenbare labels voor bestaande voorbeeldblogs. De ticker, eerdere homepage-radarkaart en oude markt-subpagina's kunnen expliciet gemarkeerde voorbeelddata bevatten. AEX-cijfers zijn niet toegevoegd als echte data: de widgets geven geen gegarandeerde AEX-dekking.

Bronnen:
- https://www.tradingview.com/widget-docs/
- https://www.tradingview.com/widget-docs/faq/data/
- https://www.tradingview.com/policies/
- https://www.ecb.europa.eu/services/using-our-site/disclaimer/html/index.en.html

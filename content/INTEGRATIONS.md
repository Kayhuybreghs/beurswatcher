# Instagram en marktdata — koppelingen

## Instagram: wacht op toegang van Daniël

Dezelfde ReelRail staat op Home en Over. De huidige selectie bestaat uit echte Reel-covers. De primaire knop opent de officiële Instagram-speler binnen Beurswatcher; de externe Instagram-link is afzonderlijk herkenbaar. Instagram kan de speler blokkeren wanneer inloggen nodig is, embeds uitstaan of de video niet beschikbaar is.

`/api/instagram/reels` is voorbereid voor de Instagram API met Instagram Login v26.0. Zet uitsluitend server-side `INSTAGRAM_USER_ID` en de geheime `INSTAGRAM_ACCESS_TOKEN` in `.env.local` (lokaal) of Vercel Environment Variables (online). Plak tokens niet in frontendcode of chats. Gebruik een Business/Creator-account van @beurswatcher met `instagram_business_basic`. De endpoint verifieert de accountnaam, valideert media-URL-hosts, beperkt de selectie tot Reels en geeft geen tokens of upstreamfouten terug.

Zonder deze gegevens retourneert de API `waiting` en een opgeslagen selectie. Na koppeling haalt de server op aanvraag maximaal eens per 15 minuten nieuwe Reels op; open pagina's verversen elke 15 minuten en bij terugkeer naar de tab. Bij storingen blijft de beheerde selectie beschikbaar. Dit is geen zelfstandig periodiek achtergrondproces.

Bij een beschikbare video-URL werkt de eigen speler: hover met muis speelt gedempt, verlaten pauzeert; tikken start met geluid, opnieuw tikken pauzeert; slechts één video tegelijk; buiten beeld en bij verlaten van de tab pauzeert de video. Voor verminderde beweging begint geen hover-preview. Als Instagram geen directe video aanbiedt (bijvoorbeeld vanwege gelicentieerde muziek), blijft de officiële embed beschikbaar. Er zijn nog geen afzonderlijke ondertitelbestanden aangeleverd.

Nog vóór activering regelen: accounttoegang, token en mediarechten, ondertitels indien beschikbaar, en een plan voor tokenvernieuwing. Een long-lived token verloopt na 60 dagen; deze versie vernieuwt of bewaart tokens niet automatisch. Vernieuw veilig voor het verlopen of voeg daarvoor later beveiligde opslag en een refresh-job toe. De serverkoppling en eigen videospeler zijn nog niet met Daniëls echte toegang end-to-end getest.

Bronnen:
- https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login
- https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/get-started
- https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/business-login
- https://developers.facebook.com/documentation/instagram-platform/reference/instagram-media
- https://developers.facebook.com/documentation/instagram-platform/oembed

## Gratis marktdata

De markthub en mini-hub op Home gebruiken officiële TradingView-widgets, met intacte bronvermelding. S&P 500 en Nasdaq 100 staan als dagelijkse FRED-indexreeksen getoond, conform het officiële widgetvoorbeeld; dit zijn geen CFD's. De gebruiker kan maand-, jaar- en meerjarige perioden kiezen. De aparte bewegingenwidget toont Amerikaanse aandelen. Coverage en vertraging verschillen per beurs. Er worden geen widgetgegevens gescrapet of in een eigen API herverdeeld.

ECB-koersen blijven via de eigen server-API beschikbaar. De beleidskalender filtert verlopen data en verwijst naar de ECB. Nieuws is nog steeds een afzonderlijk gedateerde redactionele selectie, geen automatische nieuwsfeed. De ticker, eerdere homepage-radarkaart en oude markt-subpagina's kunnen expliciet gemarkeerde voorbeelddata bevatten. AEX-cijfers zijn niet toegevoegd als echte data: de widgets geven geen gegarandeerde AEX-dekking.

Bronnen:
- https://www.tradingview.com/widget-docs/widgets/charts/symbol-overview/demos/indices-overview/
- https://www.tradingview.com/widget-docs/widgets/watchlists/hotlists/
- https://www.tradingview.com/widget-docs/faq/data/
- https://www.tradingview.com/policies/
- https://www.ecb.europa.eu/services/using-our-site/disclaimer/html/index.en.html

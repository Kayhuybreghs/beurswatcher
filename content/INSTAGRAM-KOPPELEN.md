# Instagram beheren — Beurswatcher

## Voor Daniel

De vaste, afgeschermde ingang is **https://www.beurswatcher.nl/beheer/instagram**, met een afzonderlijke toegangscode. De teksten spreken vanuit de websitebouwer: “ik” en “mij”.

Daniel kan op deze pagina de eenmalige Meta-inrichting doorlopen, de verbinding controleren, automatisch de nieuwste zes Reels tonen of zelf maximaal zes kiezen, zijn selectie ordenen en de kaarttitels aanpassen. Wijzigingen gelden pas na opslaan. Een lege handmatige selectie verbergt de Reel-sectie. De oorspronkelijke Instagram-posts veranderen niet; dit is geen algemeen CMS.

**Het juiste account is @beurswatcher**, Daniels profiel met circa 44.000 volgers bij controle op 10 oktober 2026. Het andere account @beurswatchers wordt niet gekoppeld.

## Wat nog nodig is

De beheerpagina kan vóór de Meta-koppeling al de bestaande echte Reel-selectie beheren. Automatisch nieuwe video's ophalen is pas bevestigd nadat het echte account toestemming heeft gegeven. De echte OAuth- en tokenvernieuwingstest zijn nog niet afgerond.

1. Log in bij Meta Developers en maak/selecteer de app voor het eigen/beheerde professionele account. Gebruik **Instagram API with Instagram Login**, de Instagram App ID en Instagram App Secret. Creator of Business is vereist; voor deze route is geen Facebook-pagina nodig.
2. Voeg @beurswatcher toe aan de toegestane accounts. Laat Daniel indien nodig eerst de uitnodiging als app-tester accepteren. Voor eigen/beheerde accounts met de juiste approl beschrijft Meta Standard Access; voor andere accounts kan App Review nodig zijn.
3. Registreer exact `https://www.beurswatcher.nl/api/instagram/callback` als OAuth redirect URI. De enige scope is `instagram_business_basic`; geen publicatierecht of privéberichten.
4. Configureer de vereiste appgegevens eerlijk, waaronder `https://www.beurswatcher.nl/privacy`. Beschrijf hoe toestemming kan worden ingetrokken en opgeslagen accountgegevens op verzoek verwijderd kunnen worden.
5. Open **https://www.beurswatcher.nl/beheer/instagram** en doorloop het stappenplan. Het bevat kopieerknoppen voor de callback- en privacy-URL. Vul de **Instagram App ID** en **Instagram App Secret** daar in. Gebruik niet het Instagram-wachtwoord of de algemene Facebook App ID. Het geheim wordt versleuteld in de bestaande database opgeslagen en nooit teruggestuurd naar de browser. Daniel heeft hiervoor geen Vercel-toegang nodig; opnieuw publiceren is niet nodig.
6. Klik op **Instagram verbinden**, meld je aan bij @beurswatcher en geef toestemming. Na terugkeer controleert de website het echte account en de media. Opgeslagen appgegevens zijn nog geen geslaagde koppeling: “Verbonden” berust op een echte accountcontrole.

De website kan geen Meta-account of Meta-app namens Daniel aanmaken, Meta-formulieren overslaan of goedkeuring garanderen. Eventuele approllen, testeruitnodigingen en controles worden op Meta zelf afgehandeld. Een reeds actieve verbinding kan niet via het instellingenformulier naar een andere app worden omgezet. Vervanging van opgeslagen appgegevens vóór activering vraagt expliciete bevestiging.

### Serverbasis voor de websitebeheerder

Deze bestaande serverconfiguratie blijft nodig. De twee Meta-appgegevens kunnen dus via de beheerpagina worden toegevoegd. Een volledig omgevingspaar heeft voorrang en maakt het formulier alleen-lezen; een onvolledig omgevingspaar moet eerst door de beheerder worden hersteld.

| Variabele | Inhoud |
| --- | --- |
| `BEURSWATCHER_SITE_URL` | `https://www.beurswatcher.nl` |
| `INSTAGRAM_ADMIN_CODE_HASH` | Gezouten scrypt-hash van de toegangscode |
| `INSTAGRAM_ADMIN_SESSION_SECRET` | Onafhankelijk willekeurig sessiegeheim, minimaal 43 tekens |
| `INSTAGRAM_APP_ID`, `INSTAGRAM_APP_SECRET` | Optioneel alternatief voor het beveiligde formulier; altijd als volledig paar |
| `INSTAGRAM_USERNAME` | `beurswatcher` |
| `INSTAGRAM_CONNECT_SECRET` | Optionele expliciete sleutel, minimaal 43 tekens; anders apart afgeleid van het admin-sessiegeheim |
| `INSTAGRAM_TOKEN_ENCRYPTION_KEY` | Optionele expliciete sleutel van 32 bytes in standaard base64; anders apart afgeleid van het admin-sessiegeheim |
| `CRON_SECRET` | Onafhankelijk willekeurig geheim, minimaal 32 tekens |
| `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` | Bestaande productiedatabase met schrijfrechten |

Voor Instagram wordt bij een lege primaire database-URL het volledige beheerde paar `storage_TURSO_DATABASE_URL` / `storage_TURSO_AUTH_TOKEN` gebruikt. De URL van de ene configuratie wordt niet gemengd met het token van de andere.

Bewaar geen geheimen in Git, screenshots of clientcode. Geef Preview geen productiedatabase. Het admin-sessiegeheim dient als hoofdsleutel voor afzonderlijk afgeleide sleutels voor appopslag, OAuth-state en tokenopslag. Bestaande expliciete OAuth- en tokensleutels blijven voor die doelen gelden. **Wijzig het admin-sessiegeheim of een gebruikte versleutelingssleutel niet zonder migratie:** anders kunnen opgeslagen appgegevens en tokens onleesbaar worden. Alleen de toegangscode wijzigen kan via een nieuwe codehash; daarvoor hoeft de hoofdsleutel niet te veranderen.

## Toegangscode en overdracht

`node scripts/create-instagram-admin.mjs` (Node 22.18+) genereert een willekeurige toegangscode en een onafhankelijk sessiegeheim. Het weigert bestaande bestanden te overschrijven. De genegeerde map `outputs/instagram-admin` bevat:

- `production-secrets.json`: alleen hash en sessiegeheim voor de server; nooit doorsturen.
- `toegang-voor-daniel.txt`: de vaste link, toegangscode en een kort bericht om zelf door te sturen.

Controleer de echte productie-login vóór overdracht. Deel code en link privé. De website verstuurt geen berichten. Een gewijzigde codehash plus nieuwe deployment maakt oude sessies ongeldig.

De code zelf staat niet in de database of browseropslag. De sessie gebruikt een HttpOnly-cookie, Secure op HTTPS, SameSite=Lax en een looptijd van dertig dagen. Uitloggen verwijdert de cookie op dat apparaat. Inlogpogingen worden duurzaam beperkt; rauwe IP-adressen worden niet opgeslagen.

De oudere eenmalige `/koppelen/instagram`-uitnodiging blijft beschikbaar voor bestaande expliciete omgevingsconfiguratie. De oude uitnodigingsscripts lezen geen appgegevens uit de database. Gebruik voor de nieuwe zelfservice-inrichting altijd de vaste beheerpagina.

Zijn appgegevens door een gewijzigde hoofdsleutel onleesbaar geworden terwijl een verbinding actief staat, dan blijft vervangen geblokkeerd. De websitebeheerder moet de oorspronkelijke sleutel herstellen of een gecontroleerde migratie uitvoeren. Dit kan Daniel niet oplossen door nogmaals op verbinden te klikken.

## Werking en grenzen

- Nieuwe media worden bij bezoek opgehaald na maximaal vijftien minuten sinds de vorige succesvolle controle. Open pagina's verversen elke vijftien minuten en bij terugkeer naar de tab.
- Selectie en titels worden bij iedere feedaanvraag gelezen. Herlaad de website om opgeslagen wijzigingen direct te zien. Een oudere bewerking overschrijft niet stilzwijgend een nieuwere.
- De beheerknop controleert maximaal eenmaal per minuut. De getoonde datum vertelt wanneer de status echt is gecontroleerd; niet dat de toestemming sindsdien onmogelijk is ingetrokken.
- De beveiligde Vercel-taak op `0 6 * * *` (UTC, dagelijks) vernieuwt geldige tokens vanaf dertig dagen resterende geldigheid, nooit binnen de eerste 24 uur. Dit vereist de volledige Meta-configuratie. Ingetrokken/verlopen toestemming vraagt opnieuw verbinden.
- Tijdelijke fouten behouden de laatste gegevens. Veilige permalinks en titels blijven bruikbaar; verouderde directe video-URL's worden niet als werkende video's gepresenteerd.
- Er is geen e-mail- of WhatsApp-waarschuwing geactiveerd. Controleer de beheerpagina en Vercel Cron/Logs.
- Tokens zijn AES-256-GCM-versleuteld. OAuth gebruikt ondertekende browserstate en eenmalige registratie. Alleen het bevestigde account wordt aanvaard.
- Beheer- en koppelpagina's zijn noindex en staan niet in het menu of de sitemap. Elke beheer-API controleert de sessie; noindex vervangt authenticatie niet.
- Instagram kan directe weergave beperken, bijvoorbeeld door muziekrechten. De officiële embed of herkenbare link naar het origineel blijft dan nodig.
- Oude handmatige omgevingstokens blijven alleen compatibiliteit totdat een beheerde verbinding is opgeslagen. Een verlopen beheerde verbinding valt daar nooit stilzwijgend op terug.

## Oplevercontroles

Controleer authenticatie, ongeldige codes, no-store/noindex, selectie/volgorde/titels, bewust lege selectie, conflicterende saves, accountisolatie, tokenopslag, typecheck/lint/build en de pagina op desktop en telefoon. Controleer voor appinrichting ook versleutelde opslag, geen teruggestuurd appgeheim, bescherming tegen aanvragen van een andere site, de bevestiging voor vervangen, gelijktijdige wijzigingen en een OAuth-callback voor inmiddels vervangen instellingen. Test met fictieve appgegevens uitsluitend in een geïsoleerde lokale database; sla deze nooit op in productie.

Vóór echte Instagram-activering: Daniel autoriseert het echte account; controleer recente Reels en hover/tap-weergave. Controleer verkeerde accountkeuze, weigering, OAuth-hergebruik en de echte Vercel-taak. Echte tokenvernieuwing kan pas vanaf 24 uur na tokenuitgifte getest worden. Gesimuleerde tests zijn daarvan geen bewijs.

**Geen sitemap indienen.** Dat blijft wachten op een uitdrukkelijke opdracht.

## Primaire documentatie

- https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/business-login.md
- https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/get-started.md
- https://developers.facebook.com/documentation/instagram-platform/app-review
- https://developers.facebook.com/documentation/instagram-platform/reference/refresh_access_token

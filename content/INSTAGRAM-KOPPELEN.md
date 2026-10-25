# Instagram beheren — Beurswatcher

## Voor Daniel

De vaste, afgeschermde ingang is **https://www.beurswatcher.nl/beheer/instagram**, met een afzonderlijke toegangscode. De teksten spreken vanuit de websitebouwer: “ik” en “mij”.

Daniel kan op deze pagina de eenmalige Meta-inrichting doorlopen, de verbinding controleren, automatisch de nieuwste zes Reels tonen of zelf maximaal zes kiezen, zijn selectie ordenen en de kaarttitels aanpassen. Wijzigingen gelden pas na opslaan. Een lege handmatige selectie verbergt de Reel-sectie. De oorspronkelijke Instagram-posts veranderen niet; dit is geen algemeen CMS.

**Het juiste account is @beurswatcher**, Daniels profiel met circa 44.000 volgers bij controle op 10 oktober 2026. Het andere account @beurswatchers wordt niet gekoppeld.

## Wat nog nodig is

De beheerpagina kan vóór de Meta-koppeling al de bestaande echte Reel-selectie beheren. Automatisch nieuwe video's ophalen is pas bevestigd nadat het echte account toestemming heeft gegeven. Deze handleiding bewijst niet dat Daniel zijn Meta-app al heeft ingericht. Een echte accountverbinding, het ophalen van recente Reels en tokenvernieuwing moeten afzonderlijk worden gecontroleerd; gesimuleerde tests bevestigen dat niet.

### Korte uitleg om Daniel te sturen

Hoi Daniel, open https://www.beurswatcher.nl/beheer/instagram op je laptop en log in met de toegangscode die je hebt gekregen. Houd deze pagina open naast Meta. De uitleg bestaat uit zes stappen: je accounts controleren, de juiste Meta-app openen of maken, @beurswatcher toevoegen, de website-adressen invullen, twee appgegevens veilig opslaan en Instagram verbinden. Je Facebook-account gebruik je voor Meta Developers; bij de Instagram-toestemming log je in als @beurswatcher. Loop je vast? Klik op **Ik wil hulp bij het instellen**, kopieer het hulpbericht en stuur dat naar mij. Zet erbij welke knop of melding je ziet. Stuur geen wachtwoord, App Secret, token of toegangscode mee.

**Eerlijke status:** de beheerpagina en veilige opslag zijn voorbereid. De actuele beheerstatus moet uitwijzen wat al is opgeslagen en of @beurswatcher echt verbonden is. Een opgeslagen App ID is geen bewijs van een geslaagde verbinding. De pagina toont deze statussen afzonderlijk. Zonder het Meta-scherm of een concrete foutmelding is niet vastgesteld waarom Daniel vastloopt.

### Eenmalige inrichting in zes stappen

#### 1. Zet je browser en accounts klaar

Open de vaste beheerpagina in een gewone browser, bij voorkeur op een laptop. Houd de beheerpagina en Meta in dezelfde browser open. De Beurswatcher-toegangscode is alleen voor de website; het is geen Facebook- of Instagram-wachtwoord.

- Bij **Meta Developers** gebruik je je eigen Facebook-account waarmee je de app gaat beheren. Registreer zo nodig via https://developers.facebook.com/async/registration. Meta vraagt om eigen telefoon-/e-mailverificatie, voorwaarden en een beroepskeuze. Vul die zelf naar waarheid in.
- Bij **Instagram** gebruik je het account **@beurswatcher**, niet @beurswatchers of je privéprofiel. Controleer de gebruikersnaam voordat je toestemming geeft.
- @beurswatcher moet een professioneel **Creator- of Business-account** zijn. Voor de gebruikte Instagram Login-route is geen gekoppelde Facebook-pagina nodig.

#### 2. Open of maak de juiste Meta-app

Open https://developers.facebook.com/apps/. Heb je al een app voor deze website, open die eerst; maak niet bij iedere poging een nieuwe. Een nieuwe app start via https://developers.facebook.com/apps/creation/. Gebruik als herkenbare naam **Beurswatcher website** en je eigen contactadres.

De officiële Instagram-apphandleiding beschrijft **Other / Overig → Business → Instagram → Set up**. In een dashboard met producten staat Instagram onder **Add Product**. Na het instellen moet je **API setup with Instagram login** kunnen openen. Als jouw wizard een specifieke Instagram-usecase aanbiedt, controleer na aanmaak eveneens dat deze Instagram Login-instelling beschikbaar is. De plaats en benaming van de usecase kunnen verschillen; de eerder gebruikte tekst “Manage messaging and content on Instagram” is geen gegarandeerde knopnaam.

Vraagt de wizard om een businessportfolio, dan documenteert Meta ook **I don’t want to connect a business portfolio yet**. Kies een bestaand portfolio alleen als het werkelijk van jou is en je het bewust wilt gebruiken. Voor de eigen-account-route is een portfolio niet door de Instagram Login-flow vereist.

**Zie je alleen Unified Login of Facebook Login?** Vul de gegevens daarvan niet op goed geluk in. De bestaande website gebruikt **Instagram API with Instagram Login**. Meta beveelt inmiddels Unified Login aan voor nieuwe integraties, maar die route gebruikt andere permissies, tokens en een andere API-host en vereist een businessportfolio. De officiële apphandleiding beschrijft nog steeds hoe Instagram Login aan een nieuwe app wordt toegevoegd; dat bewijst niet welke wizardvariant jouw account te zien krijgt. Stuur mij bij een afwijkend scherm de schermnaam via het hulpbericht, zonder geheime velden.

#### 3. Voeg @beurswatcher toe en accepteer een eventuele uitnodiging

Open in de app **Instagram → API setup with Instagram login** en voeg het Instagram-account toe. Meta noemt ook **App Roles → Roles** als plaats om accounts toe te voegen of te verwijderen. Meld je in het Instagram-venster aan met @beurswatcher. De officiële handleiding vereist dat het toegevoegde testaccount openbaar is.

Krijg je een testeruitnodiging of blijft die op **Pending / In afwachting** staan, accepteer de uitnodiging dan vanuit het juiste Instagram-account. Alleen uitnodigen is niet voldoende. Zoek in Instagram naar **Apps en websites** en eventuele **Testeruitnodigingen / Tester invites**. Dit is een herkenningshulp: het exacte huidige Instagram-menupad is niet bevestigd en kan verschillen tussen telefoon en browser. Staat er geen uitnodiging, stuur dan de exacte melding naar mij; ga niet andere accounts uitnodigen of rollen verwijderen om te proberen.

Voor eigen/beheerde professionele accounts die aan de app zijn toegevoegd, noemt Meta **Standard Access** als voldoende. In Development mode kunnen gebruikers met een passende approl toestemming geven. **Advanced Access, App Review en bedrijfsverificatie zijn niet standaard een stap voor deze ene eigen accountverbinding.** Zet de app niet willekeurig op Live om een foutmelding te verhelpen. Voor toegang van andere accounts zonder passende rol gelden aanvullende eisen. Een app publiceren bij Meta en de Beurswatcher-website publiceren zijn verschillende dingen.

#### 4. Plak de website-adressen in de juiste velden

Open **Instagram → API setup with Instagram login → Set up Instagram business login → Business login settings**. De nummering van dit onderdeel kan verschillen. Voeg het terugkeeradres toe als **Redirect URL / OAuth Redirect URI** en sla op.

| Veld bij Meta | In te vullen waarde |
| --- | --- |
| Instagram Business Login: **Redirect URL / OAuth Redirect URI** | `https://www.beurswatcher.nl/api/instagram/callback` |
| **App settings → Basic → Privacy Policy URL** | `https://www.beurswatcher.nl/privacy` |
| **User Data Deletion: instructie-URL** | `https://www.beurswatcher.nl/privacy#instagram` |

Neem de OAuth-URL exact over: met `https://www.`, het volledige pad en zonder extra slash of spatie. Meta vermeldt dat het dashboard soms een slash toevoegt; controleer de opgeslagen waarde.

**Niet alle velden met “callback” zijn hetzelfde.** Plak het OAuth-adres niet in **Webhooks Callback URL**, **Deauthorize Callback URL** of een technische **Data Deletion Callback**. De privacysectie is een pagina met verwijderinstructies; kies daarvoor de instructie-URL-optie, niet een technische callback. Deze website haalt Reels zelf op en gebruikt daarvoor geen webhook. Een scherm met **Verify token**, **Generate token**, berichten of publicatierechten hoef je voor deze koppeling niet uit te voeren. Blokkeert Meta het opslaan op zo'n veld, geef de veldnaam door via het hulpbericht in plaats van zelf waarden te verzinnen.

#### 5. Sla de twee Instagram-appgegevens veilig op

Zoek in **Instagram → API setup with Instagram login → Set up Instagram business login → Business login settings** naar **Instagram App ID** en **Instagram App Secret**. Kopieer deze naar de twee velden op https://www.beurswatcher.nl/beheer/instagram en sla ze daar op.

Gebruik niet de algemene Facebook App ID/Secret uit **App settings → Basic**, je Instagram-wachtwoord of een gegenereerd access token. Beide Instagram-appgegevens moeten uit dezelfde Meta-app komen. Stuur het App Secret niet via WhatsApp, e-mail of een screenshot naar mij. De beveiligde beheerpagina slaat het geheim versleuteld op en stuurt het niet terug naar de browser. Daniel heeft hiervoor geen Vercel-toegang nodig; opnieuw publiceren is niet nodig.

**Appgegevens opgeslagen** betekent uitsluitend dat de website de instellingen heeft opgeslagen. Het bevestigt niet dat Meta ze accepteert of dat Instagram al gekoppeld is.

#### 6. Verbind via de website en controleer echte Reels

Klik op de Beurswatcher-beheerpagina op **Instagram verbinden**. Meld je aan als **@beurswatcher**, controleer de gebruikersnaam en geef de gevraagde toestemming. De website vraagt alleen `instagram_business_basic` om accountgegevens en media te lezen; geen publicatierecht of toegang tot privéberichten.

Laat Instagram terugkeren naar de beheerpagina. Controleer daar de echte verbindingsstatus, de juiste gebruikersnaam en het moment van de controle. Controleer vervolgens dat recente Reels van dit account zijn opgehaald en op de website afspelen. De zes bestaande handmatig gekozen video's zijn op zichzelf geen bewijs van een werkende automatische feed.

Blijft de pagina op **Koppeling nog niet ingesteld**, **Niet verbonden** of een foutmelding staan, dan is het niet afgerond. Kopieer het hulpbericht en vul aan op welke stap je vastloopt en welke melding Meta toont. Deel geen volledige OAuth-adresbalk: die kan tijdelijke codes bevatten. Keer na een verlopen poging terug naar de beheerpagina en start daar opnieuw; hergebruik geen oude toestemmings- of callbacklink.

### Hulp en grenzen

Na een mislukte verbinding opent de uitleg automatisch. Veilige foutcategorieën maken onderscheid tussen appconfiguratie, ontbrekende toestemming, tijdelijke onbeschikbaarheid en een onbekende oorzaak. Alleen een herkenbare weigering geldt als annulering. Het hulpbericht bevat uitsluitend de vaste beheer-URL, status, geopende stap en eventueel een gecontroleerde melding; geen ruwe Meta-fout, tokens, appgeheim of OAuth-URL. Daniel verstuurt het zelf; de website verstuurt geen berichten.

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

Gecontroleerd op **25 oktober 2026**, via de officiële `.md`-weergaven van Meta (HTTP 200). De handleidingen beschrijven niet noodzakelijk exact dezelfde dashboardvariant die Daniel ziet. De specifieke Instagram Login-voorwaarden en API-routevergelijking maken het onderscheid tussen het eigen account met Standard Access en toegang voor andere accounts; algemene publicatie-/reviewhoofdstukken zijn geen opdracht om alle stappen standaard uit te voeren.

- [Meta developerregistratie](https://developers.facebook.com/documentation/development/register): Facebook-login en eigen telefoon-/e-mailverificatie.
- [Meta-app maken](https://developers.facebook.com/documentation/development/create-an-app): appnaam, contactadres, usecases en optionele businessportfoliokeuze.
- [Business-app via Other](https://developers.facebook.com/documentation/development/create-an-app/other-app-types): gedocumenteerde alternatieve aanmaakroute en product toevoegen.
- [Instagram-app maken](https://developers.facebook.com/documentation/instagram-platform/create-an-instagram-app): Business-app, Instagram Login, account toevoegen en businesslogin-instellingen.
- [Instagram Platform Overview](https://developers.facebook.com/documentation/instagram-platform/overview): Creator/Business, Standard/Advanced Access en verschillen tussen Unified Login, Instagram Login en Facebook Login.
- [Business Login for Instagram](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/business-login): juiste Instagram-appgegevens, exacte redirect-URI, toestemming en tokenvernieuwing.
- [Get started with Instagram Login](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/get-started): account en media ophalen.
- [App Roles](https://developers.facebook.com/documentation/development/build-and-test/app-roles) en [App Modes](https://developers.facebook.com/documentation/development/build-and-test/app-modes): rollen en Development/Live. De daar beschreven Facebook Authorized App Tester-route is geen bevestiging van het actuele Instagram-menu.
- [Basic Settings](https://developers.facebook.com/documentation/development/create-an-app/app-dashboard/basic-settings): privacy- en verwijderinstructievelden.
- [Data Deletion Callback en FAQ](https://developers.facebook.com/documentation/development/create-an-app/app-dashboard/data-deletion-callback): onderscheid tussen verwijderinstructies en een technische callback.

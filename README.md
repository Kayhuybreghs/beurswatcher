# Beurswatcher

Het platform van Daniël: uitleg over beleggen, artikelen, gratis rekentools, marktinformatie, partners en events. Gebouwd met Next.js App Router, React en Tailwind CSS.

## Lokaal starten

Gebruik Node.js 22 LTS en pnpm 10.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:5186. Voor de productieversie: `pnpm build` en vervolgens `pnpm start`.

## Hosten op Vercel

1. Kies **Add New → Project** in Vercel en importeer de GitHub-repository **beurswatcher**.
2. Gebruik **Next.js** als Framework Preset en de hoofdmap `./` als Root Directory.
3. Laat Build Command (`pnpm build`) en Output Directory op de standaardinstellingen. Kies Node.js **22.x**.
4. Voeg de benodigde Environment Variables hieronder toe. Gebruik afzonderlijke databases voor Preview en Production.
5. Klik **Deploy**. Daarna levert Vercel een HTTPS-link die ook op een telefoon werkt. Nieuwe commits op de productiebranch worden automatisch opnieuw gebouwd.

Geen Vite-configuratie, Worker-binding of aangepaste outputmap nodig. De website en rekentools kunnen zonder externe sleutels bouwen en laden.

## Database voor contact en nieuwsbrief

Maak een Turso/libSQL-database aan en zet in **Vercel → Settings → Environment Variables**:

| Variabele | Waarde |
| --- | --- |
| `TURSO_DATABASE_URL` | De `libsql://…`-URL van de database |
| `TURSO_AUTH_TOKEN` | Het database-token met schrijfrechten |

De twee tabellen worden bij de eerste aanvraag automatisch aangemaakt. Zonder online database geven de formulieren een foutmelding en wordt geen succesvolle inschrijving of verzending gesimuleerd. Berichten en inschrijvingen worden opgeslagen; deze versie verstuurt nog geen e-mails en bevat geen beheeromgeving voor de inzendingen.

Lokaal wordt `.data/beurswatcher.db` gebruikt. Deze database en eventuele eerdere lokale previewgegevens worden niet naar GitHub verstuurd. Een bestaande lokale database wordt niet automatisch online geïmporteerd. Voor eigen instellingen: kopieer `.env.example` naar `.env.local`.

## Instagram en marktdata

- `INSTAGRAM_USER_ID` en `INSTAGRAM_ACCESS_TOKEN`: uitsluitend server-side instellen zodra Daniëls accounttoegang beschikbaar is. Tot die tijd blijft de beheerde Reel-selectie zichtbaar. Details en beperkingen: [koppelingen](content/INTEGRATIONS.md).
- De markthub gebruikt TradingView-widgets met bronvermelding. Wisselkoersen komen via de ECB. Gemarkeerde voorbeelddata blijft herkenbaar als voorbeeld; nieuws is een gedateerde redactionele selectie.
- Affiliate-links en definitieve eventinformatie moeten nog door Daniël worden aangeleverd. De website presenteert voorbeeldprogramma’s als voorbeeld.

## Controleren

```sh
pnpm build
pnpm typecheck
pnpm exec oxlint app db
pnpm test
```

Met een lokale productiepreview op poort 5186: `node verify-routes.mjs`. Deze controle schrijft tijdelijke testinschrijvingen en verwijdert die weer. Gebruik deze controle alleen tegen een testdatabase, niet tegen de live website. `SITE_ORIGIN` kan de lokale testpoort aanpassen.

## Projectindeling

- `app/`: pagina’s, gedeelde onderdelen, styling en server-API’s.
- `app/calculations.ts` en `app/scenario-math.ts`: rekenlogica.
- `db/`: databaseverbinding en schema.
- `public/`: logo, favicon en lokale media.
- `content/`: redactionele afspraken, bronnen en integratie-informatie.

API-sleutels, databases, tijdelijke telefoonlinks en lokale buildbestanden horen niet in versiebeheer. Bronvermeldingen en licenties van afbeeldingen, marktdata en externe embeds blijven behouden.

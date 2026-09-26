# Beheer door Kay

De website heeft geen CMS, klantdashboard of publiceeromgeving. Kay verwerkt aangeleverde teksten in de repository en publiceert via GitHub/Vercel. Daniel levert inhoud en feedback aan; beheer en plaatsing blijven een dienst van Kay.

- `app/data.ts`: eigen artikelen en basisgegevens. De huidige artikelen zijn educatieve voorbeelden; vervang deze door goedgekeurde eigen blogs en pas het voorbeeldlabel pas dan aan.
- `app/about-copy.ts`: de tekst uit Daniels aangeleverde Word-document.
- `app/topic-directory.tsx`: onderwerpen, artikelcategorieën en bijbehorende tools.
- `app/partner-facts.ts`: productinformatie (controleer de bestaande bestandsindeling bij wijzigingen); persoonlijke partnerteksten volgen na aanlevering.
- `app/macro-data.ts`: geselecteerde officiële macroplanning voor NL/VS. Controleer CBS, BLS en Fed bij updates, werk de controle-datum en zichtbare datum in `macro-calendar.tsx` bij. Datums met tijd bevatten een expliciete UTC-offset. Amerikaanse en Europese zomertijd wisselen op verschillende dagen.

## Redactionele richting

Beurswatcher spreekt vanuit het merk. Persoonlijke achtergrond staat op Over mij. Het uitgangspunt is het heft in eigen handen nemen: begrijpen, zelf onderzoeken en bewuste financiële keuzes maken. Geen rendementsgaranties.

Geen externe nieuwsartikelen, nieuwsaggregator of automatisch overgenomen samenvattingen. De markthub bevat marktdata, koersbewegingen en de macroagenda. Externe links zijn uitsluitend bronnen bij data en noodzakelijke product-/sociallinks. Verdieping bestaat uit eigen blogs.

## Macroplanning

De huidige selectie is handmatig gecontroleerd en geen volledige automatische kalender. Klikken opent uitleg en de officiële bron. De filters werken lokaal op de geselecteerde momenten; afgelopen datums verdwijnen uit de standaardselectie. Trading Economics is alleen een expliciete externe kalenderlink, geen gekoppelde databron. Er zijn geen nieuwe betaalde diensten of accounts aangemaakt.

## Publiceren

Controleer gewijzigde routes, mobiele menu’s en filters. Voer typecheck, toepasselijke tests en de productiebuild uit. Publiceer naar de gekoppelde GitHub-branch en controleer de Vercel-deployment.

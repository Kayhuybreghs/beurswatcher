import { ArrowRight, ArrowUpRight } from 'lucide-react';
import styles from './setup.module.css';

export function SetupWalkthrough({
  stage,
  onNext,
}: {
  stage: number;
  onNext: () => void;
}) {
  return (
    <>
      {stage === 0 && (
        <>
          <p>
            Daniel, je stelt dit één keer in. Daarna kan de website nieuwe Reels
            ophalen. Meta is het bedrijf achter Instagram. De ‘Meta-app’ is een
            instelling voor de koppeling; je installeert niets op je telefoon.
          </p>
          <ol className={styles.instructions}>
            <li>
              Open deze beheerpagina op een laptop in{' '}
              <strong>Chrome, Safari of Edge</strong>. Open Meta straks in een
              tweede tabblad van diezelfde browser. Begin niet vanuit het
              ingebouwde venster van WhatsApp of Instagram.
            </li>
            <li>
              Houd de <strong>toegangscode voor deze beheerpagina</strong> bij
              de hand. Dit is de code die je van mij hebt gekregen. Deze code
              hoort alleen bij Beurswatcher.
            </li>
            <li>
              Je gebruikt je{' '}
              <strong>eigen Facebook-account voor Meta Developers</strong>. Bij
              de laatste toestemming log je in op Instagram als{' '}
              <strong>@beurswatcher</strong>. Vul die wachtwoorden alleen bij
              Facebook of Instagram zelf in.
            </li>
            <li>
              @beurswatcher moet een openbaar{' '}
              <strong>professioneel account: Creator of Business</strong> zijn.
              Controleer dat in de accountinstellingen van Instagram. Voor deze
              koppeling is geen gekoppelde Facebook-pagina nodig.
            </li>
          </ol>
          <div className={styles.outcome}>
            <strong>Klaar voor de volgende stap?</strong> Je kunt inloggen op
            beide accounts en hebt deze beheerpagina open in een gewone browser.
          </div>
        </>
      )}
      {stage === 1 && (
        <>
          <p>
            Log eerst in bij Meta. Daarna maak je één app voor de
            Beurswatcher-website. Heb je die al? Open dan de bestaande app.
          </p>
          <div className={styles.actionLinks}>
            <a
              className={styles.primaryButton}
              href="https://business.facebook.com/business/loginpage/?next=https%3A%2F%2Fdevelopers.facebook.com%2Fapps%2F"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Meta for Developers{' '}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <ol className={styles.instructions}>
            <li>
              Klik op de knop hierboven. Kies op de Meta-aanmeldpagina{' '}
              <strong>Doorgaan met Facebook</strong> en log in met je eigen
              Facebook-account. Vraagt Meta eerst om een developerregistratie?
              Doorloop die zelf: voorwaarden, verificatie van je telefoon of
              e-mail en eventueel een beroepskeuze. Houd deze beheerpagina open.
            </li>
            <li>
              Kies <strong>Create App / App maken</strong>. Gebruik als naam{' '}
              <strong>Beurswatcher website</strong> en je eigen
              contact-e-mailadres.
            </li>
            <li>
              Kies de toepassing voor Instagram als die wordt aangeboden. De
              officiële Instagram-handleiding beschrijft ook deze route:{' '}
              <strong>
                Other / Overig → Business → Add product → Instagram → Set up
              </strong>
              . ‘Business’ is hier de categorie van de app.
            </li>
            <li>
              Vraagt Meta om een bedrijfsportfolio? Als je geen portfolio wilt
              koppelen en de optie beschikbaar is, kies je{' '}
              <strong>I don’t want to connect a business portfolio yet</strong>.
            </li>
            <li>
              Open bij het Instagram-product{' '}
              <strong>API setup with Instagram login</strong>. Dit is de route
              waarop deze website is ingesteld.
            </li>
          </ol>
          <p className={styles.notice}>
            <strong>Zie je alleen ‘Unified Login’ of ‘Facebook Login’?</strong>{' '}
            Deze routes gebruiken andere instellingen. Vul daarvoor geen
            appgegevens in. Open het Instagram-product in je app en controleer
            of je ‘API setup with Instagram login’ kunt kiezen. Ontbreekt die
            optie, dan kun je met die app deze stappen niet afronden.
          </p>
          <details className={styles.help}>
            <summary>
              Moet ik de app publiceren of een bedrijfscontrole aanvragen?
            </summary>
            <p>
              Voor je eigen professionele account dat aan deze app is toegevoegd
              beschrijft Meta Standard Access. Een app kan daarvoor in
              Development mode blijven, met toegang voor de toegevoegde
              accounts/rollen. Advanced Access en App Review zijn niet standaard
              nodig om alleen je eigen Reels op te halen. Zet de app dus niet op
              goed geluk op Live om een foutmelding op te lossen.
            </p>
          </details>
          <div className={styles.outcome}>
            <strong>Dit wil je zien:</strong> je app ‘Beurswatcher website’, met
            het onderdeel ‘API setup with Instagram login’ geopend. De
            schermnamen kunnen per Meta-account iets verschillen.
          </div>
        </>
      )}
      {stage === 2 && (
        <>
          <p>
            Meta moet weten welk Instagram-account deze app mag gebruiken.
            Alleen de app aanmaken geeft de website nog geen toegang.
          </p>
          <ol className={styles.instructions}>
            <li>
              Open in je Meta-app{' '}
              <strong>Instagram → API setup with Instagram login</strong>. Zoek
              de optie om een Instagram-account toe te voegen. Meta noemt ook{' '}
              <strong>App Roles → Roles</strong> als plek om accountrollen toe
              te voegen.
            </li>
            <li>
              Voeg het openbare professionele account{' '}
              <strong>@beurswatcher</strong> toe. Controleer de gebruikersnaam
              als je meerdere Instagram-accounts beheert. Geef later bij het
              verbinden ook ditzelfde account toestemming.
            </li>
            <li>
              Verstuurt Meta een <strong>testeruitnodiging</strong>? Open het
              juiste Instagram-account en accepteer de uitnodiging. Volg
              daarvoor de instructie die Meta bij die uitnodiging toont. De
              menunamen kunnen verschillen. ‘Uitnodiging verstuurd’ is nog geen
              bevestigde toegang.
            </li>
            <li>
              Ga terug naar Meta en controleer of het account is toegevoegd en
              er geen uitnodiging meer op acceptatie wacht.
            </li>
          </ol>
          <p className={styles.notice}>
            Zie je <strong>Generate token / Token genereren</strong>? Je hoeft
            geen toegangstoken te kopiëren of op deze website te plakken. De
            website haalt het token zelf op nadat jij in de laatste stap
            toestemming geeft.
          </p>
          <details className={styles.help}>
            <summary>
              Mijn account staat er niet tussen of de uitnodiging blijft open
            </summary>
            <p>
              Controleer eerst de gebruikersnaam, het professionele accounttype
              en of je de uitnodiging in hetzelfde Instagram-account hebt
              geaccepteerd. De website kan deze Meta-instellingen nog niet voor
              je controleren. Ga terug naar de accountrollen in je Meta-app en
              kijk of de uitnodiging nog op ‘Pending / In afwachting’ staat.
            </p>
          </details>
          <div className={styles.outcome}>
            <strong>Dit wil je zien:</strong> @beurswatcher is aan de Meta-app
            toegevoegd en een eventuele uitnodiging is geaccepteerd.
          </div>
        </>
      )}
      <button type="button" className={styles.next} onClick={onNext}>
        {
          [
            'Verder: de Meta-app instellen',
            'Verder: @beurswatcher toevoegen',
            'Verder: de website-adressen invullen',
          ][stage]
        }
        <ArrowRight size={15} aria-hidden="true" />
      </button>
    </>
  );
}

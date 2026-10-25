import { ArrowUpRight } from 'lucide-react';
import styles from './setup.module.css';

export function SearchConsoleHelp() {
  return (
    <section
      className={styles.panel}
      id="google-search-console"
      aria-labelledby="google-connect-heading"
    >
      <div className={styles.heading}>
        <div>
          <span className={styles.kicker}>Instagram vinden via Google</span>
          <h2 id="google-connect-heading">
            Je Instagram in Google Search Console.
          </h2>
          <p>
            Bekijk hoe mensen je Instagram-profiel en posts vinden via Google.
            Deze koppeling staat los van het ophalen van Reels voor deze
            website.
          </p>
        </div>
        <a
          className={styles.primaryButton}
          href="https://search.google.com/search-console/welcome"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Google Search Console{' '}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div className={styles.body}>
        <details className={styles.help}>
          <summary>Zo koppel je @beurswatcher aan Search Console</summary>
          <ol className={styles.instructions}>
            <li>
              Open Google Search Console via de knop hierboven. Log in met het{' '}
              <strong>
                eigen Google-account waarin je de Instagram-cijfers wilt beheren
              </strong>
              .
            </li>
            <li>
              Zie je al een website? Open linksboven de propertykiezer en kies{' '}
              <strong>+ Property toevoegen</strong>. Kies bij{' '}
              <strong>Instagram → Toevoegen</strong>. Op het welkomstscherm kun
              je deze optie direct kiezen.
            </li>
            <li>
              Google toont{' '}
              <strong>‘Google toegang geven tot je Instagram-account’</strong>.
              Lees welke gegevens worden gevraagd. Als je akkoord bent, kies je{' '}
              <strong>Akkoord en doorgaan</strong>.
            </li>
            <li>
              Volg de inlog- en verificatiestappen voor{' '}
              <strong>@beurswatcher</strong>. Controleer steeds of het juiste
              account geselecteerd is. Je hebt voor deze Google-koppeling geen
              App ID of App Secret uit het formulier hierboven nodig.
            </li>
            <li>
              Wacht op de bevestiging van Google en kies{' '}
              <strong>Naar property / Go to property</strong>. De eerste cijfers
              kunnen enkele dagen op zich laten wachten.
            </li>
          </ol>
          <p>
            Dit zijn cijfers over je zichtbaarheid in Google, niet de weergaven
            binnen de Instagram-app. Controleer in Search Console of het
            koppelen is gelukt; de status bovenaan deze beheerpagina gaat alleen
            over Reels op de website.
          </p>
          <p>
            Staat Instagram er niet tussen? Google rolt deze functie geleidelijk
            uit. Lukt een stap niet? Maak een screenshot zonder geheime gegevens
            of adresbalk en stuur die naar mij.
          </p>
          <a
            className={styles.next}
            href="https://support.google.com/webmasters/answer/17148418?hl=nl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Uitleg van Google <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </details>
      </div>
    </section>
  );
}

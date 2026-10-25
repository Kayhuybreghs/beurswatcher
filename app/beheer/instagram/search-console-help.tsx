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
          <span className={styles.kicker}>Google Search Console</span>
          <h2 id="google-connect-heading">Instagram koppelen aan Google</h2>
          <p>
            Hiermee zie je hoe vaak je Instagram-profiel en berichten in Google
            verschijnen en hoeveel mensen erop klikken. Je gebruikt hiervoor je
            eigen Google-account en het Instagram-account @beurswatcher.
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
        <ol
          className={styles.guideSteps}
          aria-label="Instagram koppelen aan Search Console"
        >
          <li>
            <h3>Log in met je eigen Google-account</h3>
            <p>
              Klik op <strong>Open Google Search Console</strong>. Er opent een
              nieuw tabblad. Log in met het Google-account dat je hiervoor wilt
              gebruiken. Controleer rechtsboven via je profielfoto of je in het
              juiste account zit.
            </p>
          </li>
          <li>
            <h3>Voeg Instagram toe</h3>
            <p>
              Klik op <strong>Toevoegen</strong> naast Instagram. Zie je eerst
              een website-overzicht? Klik dan linksboven op de naam van de
              website en kies <strong>+ Property toevoegen</strong>. Daarna kies
              je <strong>Instagram → Toevoegen</strong>.
            </p>
          </li>
          <li>
            <h3>Bekijk de gevraagde toegang</h3>
            <p>
              Je ziet{' '}
              <strong>Google toegang geven tot je Instagram-account</strong>.
              Lees welke gegevens Google wil gebruiken. Wil je die toegang
              geven? Klik dan op <strong>Akkoord en doorgaan</strong>.
            </p>
          </li>
          <li>
            <h3>Kies @beurswatcher op Instagram</h3>
            <p>
              Log in als Instagram daarom vraagt. Controleer dat
              <strong> @beurswatcher</strong> is geselecteerd en volg de
              bevestiging op het scherm. Beheer je meerdere accounts? Kies dan
              eerst Beurswatcher voordat je verdergaat.
            </p>
          </li>
          <li>
            <h3>Open je Instagram-overzicht</h3>
            <p>
              Wacht tot Google bevestigt dat het account is toegevoegd. Klik op{' '}
              <strong>Naar property</strong> of <strong>Go to property</strong>.
              Controleer of het overzicht bij @beurswatcher hoort. De eerste
              cijfers kunnen een paar dagen op zich laten wachten.
            </p>
          </li>
        </ol>
        <div className={styles.guideNote}>
          <h3>Wat je na het koppelen kunt zien</h3>
          <p>
            Search Console laat zien hoe je Instagram-content het doet in
            Google. De weergaven en likes binnen Instagram vind je nog steeds in
            Instagram zelf.
          </p>
          <p>
            Voor deze stappen heb je geen Meta-app, App ID of App Secret nodig.
            Wil je ook automatisch Reels op Beurswatcher tonen? Doorloop dan het
            aparte{' '}
            <a href="#instagram-setup">stappenplan voor Reels op de website</a>.
          </p>
          <p>
            <strong>Geen Instagram-optie zichtbaar?</strong> Google maakt deze
            functie geleidelijk beschikbaar. Je kunt hem pas toevoegen zodra de
            optie in jouw Google-account verschijnt.
          </p>
        </div>
        <a
          className={styles.next}
          href="https://support.google.com/webmasters/answer/17148418?hl=nl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bekijk de handleiding van Google{' '}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

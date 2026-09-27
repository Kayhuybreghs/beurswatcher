import { ArrowDown, ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from './site-link';

export function WebsiteStory() {
  return (
    <article className="website-story">
      <nav className="ws-breadcrumb" aria-label="Kruimelpad">
        <Link href="/">Beurswatcher</Link>
        <span aria-hidden="true">/</span>
        <span>Achter deze website</span>
      </nav>
      <header className="ws-hero">
        <div className="ws-intro">
          <p className="ws-label">ACHTER DEZE WEBSITE · SITESNIT</p>
          <h1>
            Een scherpe blik.
            <br />
            Een <em>eigen plek.</em>
          </h1>
          <p className="ws-lead">
            Van een kort inzicht naar ruimte om zelf verder te kijken. Sitesnit
            ontwierp en bouwde het digitale thuis van Beurswatcher.
          </p>
          <a className="ws-text-link" href="#de-gedachte">
            Ontdek de gedachte achter het platform <ArrowDown size={17} />
          </a>
        </div>
        <div
          className="ws-map"
          aria-label="De route door Beurswatcher: ontdekken, onderzoeken en afwegen"
        >
          <div className="ws-map-top">
            <span>BEURSWATCHER / HET IDEE</span>
            <span className="ws-dot" />
          </div>
          <p>
            Een goede vraag
            <br />
            <strong>brengt je verder.</strong>
          </p>
          <ol>
            <li>
              <span>01</span>
              <div>
                <strong>Ontdekken</strong>
                <small>Een onderwerp dat je raakt</small>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Onderzoeken</strong>
                <small>Uitleg én je eigen berekening</small>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Afwegen</strong>
                <small>Een volgende stap die bij je past</small>
              </div>
            </li>
          </ol>
          <div className="ws-map-note">
            Het heft in eigen handen nemen.
            <ArrowUpRight size={22} />
          </div>
        </div>
      </header>

      <section
        className="ws-story"
        id="de-gedachte"
        aria-labelledby="ws-thought"
      >
        <div className="ws-story-heading">
          <p className="ws-label">DE GEDACHTE ACHTER DE KLIKKEN</p>
          <h2 id="ws-thought">
            Inhoud die
            <br />
            je op weg helpt.
          </h2>
          <p>
            Beurswatcher maakt geldvragen begrijpelijk. Die gedachte zie je
            terug in de opbouw, de vormgeving en de keuzes binnen deze website.
          </p>
        </div>
        <div className="ws-chapters">
          <section>
            <span className="ws-number">01 / RUIMTE VOOR INHOUD</span>
            <h3>De vraag komt eerst.</h3>
            <p>
              Wie meer wil weten over beleggen, begint niet altijd bij hetzelfde
              onderwerp. Daarom bundelt de verdieping uitleg rond herkenbare
              vragen over onder meer ETF’s, vermogen en pensioen. Vanuit een
              onderwerp kun je gericht verder lezen.
            </p>
            <Link className="ws-text-link" href="/artikelen">
              Bekijk hoe de verdieping is ingedeeld <ArrowRight size={17} />
            </Link>
          </section>
          <section>
            <span className="ws-number">02 / VAN LEZEN NAAR PROBEREN</span>
            <h3>Inzicht krijgt een vervolg.</h3>
            <p>
              Een uitleg over rendement wordt concreter als je zelf met inleg en
              looptijd kunt rekenen. De rekentools en uitlegpagina’s verwijzen
              naar elkaar. Zo kun je een scenario onderzoeken en meteen
              terugvinden welke aannames erachter zitten.
            </p>
            <Link className="ws-text-link" href="/tools">
              Ontdek de rekentools <ArrowRight size={17} />
            </Link>
          </section>
          <section>
            <span className="ws-number">03 / EEN HERKENBAAR GEHEEL</span>
            <h3>Dezelfde blik. Op ieder scherm.</h3>
            <p>
              Het diepblauw, het geel en de verrekijker vormen het vertrekpunt.
              Heldere typografie, rustige leesvlakken en gerichte beweging geven
              de inhoud een eigen karakter. Op een telefoon schuift de indeling
              mee: van navigatie tot de bediening van een rekentool.
            </p>
          </section>
        </div>
      </section>

      <section className="ws-case" aria-labelledby="ws-case-title">
        <div className="ws-case-mark" aria-hidden="true">
          <span>
            B<span className="ws-mark-dot">.</span>
          </span>
          <small>
            VAN IDEE
            <br />
            NAAR PLATFORM
          </small>
        </div>
        <div className="ws-case-copy">
          <p className="ws-label">HET PROJECT VAN DICHTBIJ</p>
          <h2 id="ws-case-title">Waarom het werkt zoals het werkt.</h2>
          <p>
            Benieuwd naar de ontwerpkeuzes en de ontwikkeling? In de projectcase
            op Sitesnit zie je hoe de identiteit, de inhoud en de interactieve
            onderdelen van Beurswatcher bij elkaar komen.
          </p>
          <a
            className="ws-button ws-button-light"
            href="https://www.sitesnit.nl/projecten/beurswatcher"
          >
            Bekijk de Beurswatcher-case <ArrowUpRight size={19} />
          </a>
          <span className="ws-destination">
            Op sitesnit.nl · Ontwerp & ontwikkeling
          </span>
        </div>
      </section>

      <section className="ws-invite" aria-labelledby="ws-invite-title">
        <p className="ws-label">JOUW IDEE, EEN EIGEN WEBSITE</p>
        <h2 id="ws-invite-title">
          Wat wil jij
          <br />
          <em>in beweging brengen?</em>
        </h2>
        <p>
          Een expertise die gezien mag worden. Een dienst die beter uitgelegd
          kan worden. Of een platform waar mensen graag terugkomen. Ontdek hoe
          Sitesnit jouw verhaal kan vertalen naar een website op maat.
        </p>
        <a className="ws-button ws-button-dark" href="https://www.sitesnit.nl/">
          Ontdek wat Sitesnit voor je kan maken <ArrowUpRight size={19} />
        </a>
        <span className="ws-destination">
          Bekijk het werk en neem contact op via Sitesnit.
        </span>
      </section>
    </article>
  );
}

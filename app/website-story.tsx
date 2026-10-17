import Image from 'next/image';
import { ArrowDown, ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from './site-link';
import './site-credits.css';

// Local V2 review only: the owner must confirm the commercial relationship
// before publication and the final rel/disclosure choice. See the review report.
export function WebsiteStory() {
  return (
    <article className="credit-story">
      <nav className="credit-breadcrumb" aria-label="Kruimelpad">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Over deze website</span>
      </nav>
      <header className="credit-intro">
        <div className="credit-brand" aria-label="Sitesnit">
          <Image
            src="/sitesnit/logo.png"
            alt=""
            width={42}
            height={42}
            unoptimized
          />
          <span>Sitesnit</span>
        </div>
        <p className="eyebrow">Over ontwerp en ontwikkeling</p>
        <h1>
          Wie bouwde de <span>Beurswatcher-website?</span>
        </h1>
        <div className="credit-intro-copy">
          <p>
            Sitesnit verzorgde de visuele identiteit, het webdesign en de
            ontwikkeling van Beurswatcher, inclusief de interface van de
            rendementcalculator. Achter Sitesnit staat Kay Huybreghs:
            webdesigner en ontwikkelaar van websites en interactieve
            toepassingen.
          </p>
          <a className="credit-jump" href="#eigen-website">
            Zelf een website of rekentool laten maken?
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
      </header>

      <section
        className="credit-project"
        aria-labelledby="credit-project-title"
      >
        <div className="credit-project-intro">
          <h2 id="credit-project-title">
            Een berekening die je zelf kunt onderzoeken
          </h2>
          <div>
            <p>
              Wat verandert er als je meer inlegt, langer doorgaat of een andere
              rendementsaanname gebruikt? In de rendementcalculator kun je die
              keuzes aanpassen en het berekende verschil terugzien.
            </p>
            <p>
              De opgave was om niet alleen een bedrag te tonen, maar ook
              begrijpelijk te maken waar het vandaan komt.
            </p>
          </div>
        </div>
        <figure className="credit-figure">
          <div className="credit-figure-label">
            <span>De rendementcalculator</span>
            <span>Voorbeeldgegevens</span>
          </div>
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="/projecten/rendementcalculator-mobiel.png"
              width="351"
              height="1653"
            />
            <Image
              src="/projecten/rendementcalculator-desktop.png"
              width={1080}
              height={884}
              alt="Beurswatcher-rendementcalculator met invoervelden en een grafiek van eigen inleg en berekende groei."
              loading="eager"
              unoptimized
            />
          </picture>
          <figcaption>
            De rendementcalculator: je invoer naast het scenario, met eigen
            inleg en berekende groei afzonderlijk zichtbaar.
          </figcaption>
        </figure>
        <div className="credit-contributions">
          <section>
            <span aria-hidden="true">01</span>
            <h3>Je uitgangspunten bij de uitkomst</h3>
            <p>
              Startkapitaal, maandinleg, looptijd, rendement en inflatie staan
              in verband met de berekening. Zo kun je een aanname aanpassen en
              bekijken wat er in het scenario verandert.
            </p>
          </section>
          <section>
            <span aria-hidden="true">02</span>
            <h3>Inleg, groei en koopkracht apart</h3>
            <p>
              De calculator onderscheidt wat je zelf inlegt, de berekende
              samengestelde groei en het effect van inflatie op de koopkracht.
              De uitkomst is een scenario op basis van je invoer, geen
              voorspelling.
            </p>
          </section>
          <section>
            <span aria-hidden="true">03</span>
            <h3>Dezelfde website, anders ingedeeld op je telefoon</h3>
            <p>
              De blauw-gele uitstraling loopt door in artikelen, navigatie en
              rekentools. Op een kleiner scherm worden de onderdelen anders
              verdeeld, met een eigen lees- en navigatievolgorde.
            </p>
          </section>
        </div>
        <div className="credit-case">
          <p>
            De projectpagina op Sitesnit laat zien hoe het ontwerp en de
            calculator zijn uitgewerkt.
          </p>
          <a href="https://www.sitesnit.nl/projecten/beurswatcher">
            Bekijk het Beurswatcher-project bij Sitesnit
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        className="credit-offer"
        id="eigen-website"
        aria-labelledby="credit-offer-title"
        tabIndex={-1}
      >
        <h2 id="credit-offer-title">
          Een eigen idee voor een website of rekentool?
        </h2>
        <div>
          <p>
            Denk aan een bedrijfswebsite die je aanbod helder uitlegt, een
            calculator waarmee klanten opties vergelijken of een
            aanvraagformulier dat de juiste informatie verzamelt.
          </p>
          <p>
            Sitesnit ontwerpt en bouwt zulke onderdelen rond jouw bedrijf. Dat
            hoeft niets met beleggen te maken te hebben. Je kunt een volledige
            website laten uitwerken of bespreken welke interactieve functie je
            bestaande website nodig heeft.
          </p>
          <p>
            Op Sitesnit bekijk je de mogelijkheden en het werk. Je plannen
            bespreek je rechtstreeks met Kay.
          </p>
          <a className="credit-primary" href="https://www.sitesnit.nl/">
            Bekijk websites en rekentools bij Sitesnit
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <small>Deze knop opent de website van Sitesnit.</small>
        </div>
      </section>
      <Link className="credit-back" href="/">
        <ArrowLeft size={17} aria-hidden="true" />
        Terug naar Beurswatcher
      </Link>
    </article>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from './site-link';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  MousePointer2,
} from 'lucide-react';

const perspectives = [
  {
    name: 'Het merk',
    label: '01 / HERKENBAAR VANAF DE EERSTE BLIK',
    title: 'Geen willekeurige huisstijl. Echt Beurswatcher.',
    text: 'De verrekijker, het diepblauw en het geel waren het vertrekpunt. Sitesnit vertaalde die identiteit naar typografie, vlakken en beweging die samen één herkenbaar platform vormen.',
    benefit:
      'Voor jouw bedrijf: een uitstraling die past bij wie je bent en wat je aanbiedt.',
  },
  {
    name: 'De route',
    label: '02 / IEDERE PAGINA HEEFT EEN ROL',
    title: 'Van nieuwsgierig naar een volgende stap.',
    text: 'Onderwerpen, uitleg en rekentools staan niet los van elkaar. Een bezoeker kan vanuit een vraag verder lezen, zelf rekenen en terug naar de uitleg. Die samenhang is onderdeel van het ontwerp.',
    benefit:
      'Voor jouw bedrijf: bezoekers helpen begrijpen wat je doet en waar ze vervolgens terechtkunnen.',
  },
  {
    name: 'De interactie',
    label: '03 / EEN IDEE DAT JE KUNT GEBRUIKEN',
    title: 'Niet alleen vertellen. Laten ervaren.',
    text: 'Voor Beurswatcher zijn rekentools een manier om abstracte onderwerpen tastbaar te maken. De bediening, de uitkomst en de uitleg horen bij elkaar, ook op een klein scherm.',
    benefit:
      'Voor jouw bedrijf: een praktische functie die aansluit op de vragen van je klanten.',
  },
];

export function WebsiteStory() {
  const [active, setActive] = useState(0);
  const [period, setPeriod] = useState(10);
  const current = perspectives[active];
  return (
    <div className="maker-page">
      <a className="skip" href="#maker-content">
        Naar de inhoud
      </a>
      <header className="maker-header">
        <Link className="maker-back" href="/">
          <ArrowLeft size={15} /> Terug naar Beurswatcher
        </Link>
        <span className="maker-wordmark">
          <Image
            src="/sitesnit/logo.png"
            alt="Sitesnit"
            width={52}
            height={52}
            unoptimized
          />
        </span>
        <a className="maker-header-cta" href="#jouw-website">
          Jouw website <ArrowDown size={14} />
        </a>
      </header>
      <main id="maker-content" className="maker-content">
        <section className="maker-hero" aria-labelledby="maker-title">
          <div className="maker-hero-top">
            <span>BEURSWATCHER × SITESNIT</span>
            <span>ONTWERP & ONTWIKKELING</span>
          </div>
          <div className="maker-hero-grid">
            <h1 id="maker-title">
              Ook zo’n website.
              <br />
              Maar dan
              <br />
              <em>helemaal jij.</em>
            </h1>
            <div className="maker-hero-aside">
              <span className="maker-spark" aria-hidden="true">
                ↗
              </span>
              <p>Je bent bij de maker van Beurswatcher.</p>
              <p>
                Sitesnit vertaalt jouw verhaal naar een website met een eigen
                uitstraling, een heldere route en functies die iets toevoegen.
              </p>
              <a href="#het-werk" className="maker-inline">
                Kijk mee achter het ontwerp <ArrowDown size={18} />
              </a>
            </div>
          </div>
          <div className="maker-hero-bottom">
            <span>
              Gemaakt voor Beurswatcher.
              <br />
              <strong>Ontworpen vanuit het merk.</strong>
            </span>
            <span>
              01 — ONTDEK HET WERK <ArrowDown size={16} />
            </span>
          </div>
        </section>

        <section
          className="maker-work maker-wrap"
          id="het-werk"
          aria-labelledby="maker-work-title"
        >
          <div className="maker-section-intro">
            <p className="maker-kicker">EEN WEBSITE IS EEN REEKS KEUZES</p>
            <h2 id="maker-work-title">
              Het verschil zit
              <br />
              in de samenhang.
            </h2>
            <p>
              Een mooie eerste indruk is het begin. Klik door de drie onderdelen
              en ontdek wat Sitesnit voor dit platform heeft uitgewerkt.
            </p>
          </div>
          <fieldset
            className="maker-switch"
            aria-label="Bekijk een onderdeel van het project"
          >
            {perspectives.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={active === index}
                aria-controls="maker-demonstration"
                onClick={() => setActive(index)}
              >
                <span>0{index + 1}</span>
                {item.name}
                <ArrowUpRight size={17} />
              </button>
            ))}
          </fieldset>
          <div className="maker-showcase" id="maker-demonstration">
            <div className="maker-stage" data-view={active}>
              <div className="maker-browser">
                <div className="maker-browser-bar">
                  <span aria-hidden="true">● ● ●</span>
                  <span>beurswatcher</span>
                  <span>↗</span>
                </div>
                <div className="maker-preview" key={active}>
                  {active === 0 && (
                    <div className="maker-brand-preview">
                      <span className="maker-mini-logo">
                        beurs
                        <br />
                        watcher<span>.</span>
                      </span>
                      <p>
                        Kijk verder.
                        <br />
                        <strong>Kom verder.</strong>
                      </p>
                      <div className="maker-preview-rule" />
                      <span>Een eigen blik op beleggen.</span>
                      <div
                        className="maker-swatches"
                        aria-label="Merkpalet: diepblauw, geel en lichtblauw"
                      >
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>
                  )}
                  {active === 1 && (
                    <div className="maker-route-preview">
                      <span>VAN VRAAG NAAR INZICHT</span>
                      <h3>Waar begin je?</h3>
                      <ol>
                        <li>
                          <b>01</b>
                          <div>
                            <strong>Een onderwerp ontdekken</strong>
                            <small>Bijvoorbeeld: vermogen opbouwen</small>
                          </div>
                        </li>
                        <li>
                          <b>02</b>
                          <div>
                            <strong>De uitleg begrijpen</strong>
                            <small>Wat doen tijd, inleg en rendement?</small>
                          </div>
                        </li>
                        <li>
                          <b>03</b>
                          <div>
                            <strong>Zelf een scenario onderzoeken</strong>
                            <small>Van lezen naar de rekentool</small>
                          </div>
                        </li>
                      </ol>
                    </div>
                  )}
                  {active === 2 && (
                    <div className="maker-tool-preview">
                      <span>INTERACTIE IN HET KLEIN</span>
                      <h3>
                        Een schuifje.
                        <br />
                        Een ander perspectief.
                      </h3>
                      <div className="maker-demo-value">
                        {period} <small>jaar</small>
                      </div>
                      <svg viewBox="0 0 300 85" aria-hidden="true">
                        <path d="M0 78 H300" stroke="#d4dde9" />
                        <path
                          d={`M0 78 Q160 70 300 ${75 - period * 2.1}`}
                          fill="none"
                          stroke="#0d315d"
                          strokeWidth="3"
                        />
                        <path
                          d="M0 78 L300 60"
                          fill="none"
                          stroke="#b78d00"
                          strokeWidth="2"
                          strokeDasharray="5 4"
                        />
                      </svg>
                      <label htmlFor="maker-years">
                        Probeer het zelf <span>{period} jaar</span>
                      </label>
                      <input
                        id="maker-years"
                        type="range"
                        min="5"
                        max="30"
                        value={period}
                        onChange={(e) => setPeriod(Number(e.target.value))}
                      />
                      <small>
                        Ontwerpdemonstratie, geen rendementsberekening.
                      </small>
                    </div>
                  )}
                </div>
              </div>
              <span className="maker-stage-caption">
                <MousePointer2 size={14} />{' '}
                {active === 2
                  ? 'Beweeg de schuif en zie het verschil'
                  : 'Een detail uit de aanpak, uitgelicht'}
              </span>
            </div>
            <div
              className="maker-explanation"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="maker-kicker">{current.label}</span>
              <h3>{current.title}</h3>
              <p>{current.text}</p>
              <div className="maker-takeaway">
                <ArrowUpRight size={23} />
                <p>{current.benefit}</p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="maker-fit maker-wrap"
          aria-labelledby="maker-fit-title"
        >
          <div>
            <p className="maker-kicker">
              DEZELFDE AANDACHT. JOUW EIGEN VERHAAL.
            </p>
            <h2 id="maker-fit-title">
              Wat moet jouw
              <br />
              website voor je doen?
            </h2>
            <p>
              Je hoeft geen beleggingsplatform te hebben om met Sitesnit te
              werken. Het vertrekpunt is jouw bedrijf, jouw bezoeker en de stap
              die je die bezoeker wilt laten zetten.
            </p>
          </div>
          <div className="maker-needs">
            <div>
              <span>01</span>
              <h3>Je aanbod helder maken</h3>
              <p>
                Een duidelijke opbouw die laat zien wat je doet, voor wie en
                waarom iemand voor jou kan kiezen.
              </p>
            </div>
            <div>
              <span>02</span>
              <h3>Je merk laten voelen</h3>
              <p>
                Een eigen visuele richting die doorloopt van de eerste indruk
                tot de kleinste onderdelen.
              </p>
            </div>
            <div>
              <span>03</span>
              <h3>Een idee laten werken</h3>
              <p>
                Een handige tool of andere interactie, wanneer die je bezoeker
                daadwerkelijk verder helpt.
              </p>
            </div>
          </div>
        </section>

        <section
          className="maker-next"
          id="jouw-website"
          aria-labelledby="maker-next-title"
        >
          <div className="maker-wrap maker-next-grid">
            <div>
              <p className="maker-kicker">VAN BEURSWATCHER NAAR JOUW IDEE</p>
              <h2 id="maker-next-title">
                Jij kent je bedrijf.
                <br />
                <em>
                  Sitesnit denkt mee
                  <br />
                  over je website.
                </em>
              </h2>
              <p>
                Heb je een nieuw idee, of past je huidige website niet meer bij
                je bedrijf? Bekijk het werk van Sitesnit en vertel waar je
                naartoe wilt.
              </p>
              <ul>
                <li>
                  <Check size={17} /> Ontwerp vanuit jouw merk en doelen
                </li>
                <li>
                  <Check size={17} /> Aandacht voor inhoud, navigatie en mobiel
                </li>
                <li>
                  <Check size={17} /> Ontwerp en ontwikkeling bij elkaar
                </li>
              </ul>
              <a className="maker-primary" href="https://www.sitesnit.nl/">
                Ontdek Sitesnit voor jouw website <ArrowUpRight size={21} />
              </a>
              <span className="maker-link-note">
                Bekijk de mogelijkheden en neem contact op via sitesnit.nl.
              </span>
            </div>
            <aside className="maker-case-note">
              <span className="maker-case-index">BW / 01</span>
              <p>
                Eerst het hele
                <br />
                project bekijken?
              </p>
              <span>
                Lees hoe de keuzes voor Beurswatcher zijn vertaald naar dit
                platform.
              </span>
              <a href="https://www.sitesnit.nl/projecten/beurswatcher">
                Bekijk de projectcase <ArrowUpRight size={19} />
              </a>
              <small>Beurswatcher × Sitesnit</small>
            </aside>
          </div>
        </section>
      </main>
      <div className="maker-end">
        <span className="maker-wordmark">
          <Image
            src="/sitesnit/logo.png"
            alt="Sitesnit"
            width={52}
            height={52}
            unoptimized
          />
        </span>
        <p>De maker achter Beurswatcher.</p>
        <Link href="/">
          Terug naar Beurswatcher <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

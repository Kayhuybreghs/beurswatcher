'use client';
import { PartnerOverview } from './partner-overview';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Check,
  Minus,
  Info,
  Compass,
  BookOpen,
} from 'lucide-react';
import Link from './site-link';
import { partners } from './data';
import { partnerDetails } from './journey-data';
import { partnerFacts } from './partner-facts';
import { partnerEditorial } from './partner-editorial';
import styles from './partner-editorial.module.css';
import { NextSteps } from './journeys';
import { Newsletter } from './newsletter';
export function PartnerVisual({ slug }: { slug: string }) {
  return (
    <div className={'partner-visual pv-' + slug} aria-hidden="true">
      {slug === 'delta' ? (
        <>
          <div className="allocation-ring">
            <span>
              JOUW
              <br />
              TOTAALBEELD
            </span>
          </div>
          <div className="allocation-labels">
            <span>
              <i />
              Aandelen
            </span>
            <span>
              <i />
              ETF’s
            </span>
            <span>
              <i />
              Overig
            </span>
          </div>
        </>
      ) : slug === 'brand-new-day' ? (
        <div className="future-stairs">
          <span>Je basis</span>
          <span>Je werk</span>
          <span>
            Je eigen opbouw <ArrowUpRight />
          </span>
          <b>Onderdelen van je pensioen.</b>
        </div>
      ) : slug === 'american-express' ? (
        <div className="travel-visual">
          <Compass size={58} />
          <span>JOUW VOLGENDE REIS</span>
          <b>Voordeel × gebruik</b>
          <span>VERGELIJK VOORDELEN EN KAARTKOSTEN</span>
        </div>
      ) : (
        <div className="plan-visual">
          <span>
            {slug === 'saxo' ? 'PARTICULIER & ZAKELIJK' : 'JE VASTE RITME'}
          </span>
          <div>
            {['JAN', 'FEB', 'MRT', 'APR', 'MEI'].map((m, i) => (
              <span key={m}>
                <i style={{ height: 40 + i * 20 }} />
                {m}
              </span>
            ))}
          </div>
          <b>
            {slug === 'saxo'
              ? 'Geld voor de lange termijn.'
              : 'Periodiek geld inleggen.'}
          </b>
        </div>
      )}
    </div>
  );
}
export function PartnerPages({ slug }: { slug?: string }) {
  const partner = partners.find((p) => p.slug === slug);
  if (partner) {
    const d = partnerDetails[partner.slug],
      f = partnerFacts[partner.slug],
      editorial = partnerEditorial[partner.slug],
      hasCommercialLinks = editorial.sections.some((section) =>
        section.links?.some((link) => link.commercial),
      );
    return (
      <div className={styles.page}>
        <Link href="/partners" className="back-link">
          <ArrowLeft size={17} /> Alle aanbieders
        </Link>
        <section className={`service-hero ${styles.hero}`}>
          <div>
            <span className="eyebrow">
              {partner.name.toUpperCase()} /{' '}
              {partner.slug === 'saxo'
                ? 'PARTICULIER & ZAKELIJK'
                : d.intent.toUpperCase()}
            </span>
            <h1>{f.headline}</h1>
            <p>{f.description}</p>
            <Link className="button" href="#partner-uitleg">
              Lees de uitleg over {partner.name} <ArrowRight size={18} />
            </Link>
            <span className="service-label">
              {hasCommercialLinks
                ? 'Bevat commerciële links'
                : editorial.commercial
                  ? 'Samenwerking · productinformatie'
                  : 'Productinformatie'}
            </span>
          </div>
          <PartnerVisual slug={partner.slug} />
        </section>
        <aside
          className={styles.disclosure}
          aria-label="Over de links op deze pagina"
        >
          <Info size={19} aria-hidden="true" />
          <p>{editorial.disclosure}</p>
        </aside>
        <div className={styles.editorialLayout} id="partner-uitleg">
          <nav
            className={styles.contents}
            aria-label={`Op deze pagina over ${partner.name}`}
          >
            <span className="eyebrow">OP DEZE PAGINA</span>
            <ol>
              {editorial.sections.map((section, i) => (
                <li key={section.id}>
                  <Link href={`#${section.id}`}>
                    <span aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="#jouw-afweging">Functies en kosten</Link>
              </li>
              <li>
                <Link href="#bronnen">Bronnen en controle</Link>
              </li>
            </ol>
          </nav>
          <div className={styles.editorialBody}>
            {editorial.sections.map((section, i) => (
              <section
                className={styles.chapter}
                id={section.id}
                key={section.id}
                aria-labelledby={`${section.id}-titel`}
              >
                <div className={styles.chapterHeading}>
                  <span aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 id={`${section.id}-titel`}>{section.title}</h2>
                </div>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={`${section.id}-p-${index}`}>{paragraph}</p>
                ))}
                {section.bullets?.length ? (
                  <ul className={styles.bullets}>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {section.note ? (
                  <p className={styles.sectionNote}>{section.note}</p>
                ) : null}
                {section.links?.length ? (
                  <div className={styles.sectionLinks}>
                    {section.links.map((link) => {
                      const internal = link.href.startsWith('/');
                      return (
                        <div className={styles.linkItem} key={link.href}>
                          <Link
                            className="button"
                            href={link.href}
                            target={internal ? undefined : '_blank'}
                            rel={
                              internal
                                ? undefined
                                : link.commercial
                                  ? 'sponsored noopener noreferrer'
                                  : 'noopener noreferrer'
                            }
                          >
                            {link.label}{' '}
                            {internal ? (
                              <ArrowRight size={17} aria-hidden="true" />
                            ) : (
                              <ArrowUpRight size={17} aria-hidden="true" />
                            )}
                          </Link>
                          <small>
                            {internal
                              ? 'Lees verder op Beurswatcher'
                              : link.commercial
                                ? 'Commerciële link · opent bij de aanbieder'
                                : 'Externe informatie · opent in een nieuw tabblad'}
                          </small>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </section>
            ))}
            {editorial.guide ? (
              <aside
                className={styles.guide}
                aria-labelledby="handleiding-titel"
              >
                <BookOpen size={26} aria-hidden="true" />
                <div>
                  <span className="eyebrow">PRAKTISCHE UITLEG</span>
                  <h2 id="handleiding-titel">{editorial.guide.title}</h2>
                  <p>{editorial.guide.description}</p>
                  <Link
                    href={editorial.guide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open de handleiding{' '}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                  <small>
                    Externe handleiding op Google Drive · opent in een nieuw
                    tabblad
                  </small>
                </div>
              </aside>
            ) : null}
          </div>
        </div>
        <section
          className={styles.summary}
          id="jouw-afweging"
          aria-labelledby="functies-kosten-titel"
        >
          <div className={styles.summaryIntro}>
            <span className="eyebrow">KORT OP EEN RIJ</span>
            <h2 id="functies-kosten-titel">
              Functies en kosten van {partner.name}.
            </h2>
            <p>
              Controleer welke mogelijkheden je gebruikt en welke voorwaarden
              voor jou gelden.
            </p>
          </div>
          <div className={styles.summaryGrid}>
            <div>
              <ul className={styles.benefits}>
                {f.benefits.map((benefit) => (
                  <li key={benefit}>
                    <Check size={17} aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.fit}>
                <div>
                  <h3>
                    <Check size={17} aria-hidden="true" /> Interessant als…
                  </h3>
                  <p>{d.fit}</p>
                </div>
                <div>
                  <h3>
                    <Minus size={17} aria-hidden="true" /> Minder passend als…
                  </h3>
                  <p>{f.less}</p>
                </div>
              </div>
            </div>
            <aside className={styles.costs}>
              <span className="eyebrow">KOSTEN EN VOORWAARDEN</span>
              <h3>Welke kosten betaal je?</h3>
              <p>{f.cost}</p>
              <Link
                href={f.costSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                Controleer de actuele kosten{' '}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <small>
                Gecontroleerd op {f.checkedAt}. Tarieven kunnen veranderen.
              </small>
            </aside>
          </div>
          {editorial.riskNote ? (
            <p className={styles.riskNote}>
              <Info size={16} aria-hidden="true" />
              <span>{editorial.riskNote}</span>
            </p>
          ) : null}
        </section>
        <section
          className={styles.sources}
          id="bronnen"
          aria-label="Bronnen en controle"
        >
          <details>
            <summary>
              <span>Bronnen en controle</span>
              <small>Laatst gecontroleerd: {editorial.checkedAt}</small>
              <span aria-hidden="true">+</span>
            </summary>
            <ul>
              {editorial.sources.map((source) => (
                <li key={source.href}>
                  <Link
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </section>
        {d.topic !== 'Reizen' ? (
          <>
            <NextSteps topic={d.topic} from="partner" />
          </>
        ) : (
          <div className="travel-check">
            <Compass />
            <div>
              <h2>Tel alleen voordelen die je zelf gebruikt.</h2>
              <p>
                Maak een lijst van je reizen, bestaande verzekeringen en
                verwachte kaartgebruik. Vergelijk die met de jaarlijkse kosten
                en de voorwaarden. Punten zijn geen beleggingsrendement.
              </p>
            </div>
          </div>
        )}
        <Newsletter context="education" variant="compact" />
      </div>
    );
  }
  return <PartnerOverview />;
}

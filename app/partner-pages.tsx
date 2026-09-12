'use client';
import { PartnerOverview } from './partner-overview';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Check,
  Minus,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import Link from './site-link';
import { partners } from './data';
import { partnerDetails } from './journey-data';
import { partnerFacts, affiliateLinks } from './partner-facts';
import { NextSteps } from './journeys';
import { Newsletter } from './widgets';
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
          <b>Later begint nu.</b>
        </div>
      ) : slug === 'american-express' ? (
        <div className="travel-visual">
          <Compass size={58} />
          <span>JOUW VOLGENDE REIS</span>
          <b>Voordeel × gebruik</b>
          <span>AFWEGEN BEGINT BIJ JE PLANNEN</span>
        </div>
      ) : (
        <div className="plan-visual">
          <span>{slug === 'saxo' ? 'BEDRIJFSVERMOGEN' : 'JE VASTE RITME'}</span>
          <div>
            {['JAN', 'FEB', 'MRT', 'APR', 'MEI'].map((m, i) => (
              <span key={m}>
                <i style={{ height: 40 + i * 20 }} />
                {m}
              </span>
            ))}
          </div>
          <b>
            {slug === 'saxo' ? 'Een eigen horizon.' : 'Elke maand een stap.'}
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
      url = affiliateLinks[partner.slug];
    return (
      <>
        <Link href="/partners" className="back-link">
          <ArrowLeft size={17} /> Alle samenwerkingen
        </Link>
        <section className="service-hero">
          <div>
            <span className="eyebrow">
              {partner.name.toUpperCase()} / {d.intent.toUpperCase()}
            </span>
            <h1>{f.headline}</h1>
            <p>{f.description}</p>
            <Link className="button" href="#jouw-afweging">
              Past dit bij jou? <ArrowRight size={18} />
            </Link>
            <span className="service-label">Commerciële samenwerking</span>
          </div>
          <PartnerVisual slug={partner.slug} />
        </section>
        <div className="service-route">
          {f.steps.map((s, i) => (
            <div key={s}>
              <span>0{i + 1}</span>
              <b>{s}</b>
              <ArrowRight size={18} />
            </div>
          ))}
        </div>
        <section className="service-detail" id="jouw-afweging">
          <div>
            <span className="eyebrow">DE PRAKTISCHE WAARDE</span>
            <h2>Wat heb je eraan?</h2>
            <div className="service-benefits">
              {f.benefits.map((b, i) => (
                <div key={b}>
                  <span>0{i + 1}</span>
                  <p>{b}</p>
                </div>
              ))}
            </div>
            <div className="fit-panel">
              <div>
                <Check />
                <h3>Interessant als…</h3>
                <p>{d.fit}</p>
              </div>
              <div>
                <Minus />
                <h3>Minder passend als…</h3>
                <p>{f.less}</p>
              </div>
            </div>
          </div>
          <aside className="service-decision">
            <ShieldCheck size={25} />
            <span className="eyebrow">KOSTEN EN VOORWAARDEN</span>
            <h3>Wat neem je mee in je keuze?</h3>
            <p>{f.cost}</p>
            <Link
              href={url || f.source}
              className="button yellow"
              target="_blank"
              rel={url ? 'sponsored noreferrer' : 'noreferrer'}
            >
              {url
                ? `Bekijk ${partner.name}`
                : 'Bekijk de officiële informatie'}
              <ArrowUpRight size={18} />
            </Link>
            <Link
              className="source-link"
              href={f.costSource}
              target="_blank"
              rel="noreferrer"
            >
              Bron: actuele kosten & voorwaarden ↗
            </Link>
            <small>
              Gecontroleerd op 9 september 2026. Tarieven kunnen veranderen.
            </small>
            <p className="disclosure">
              Beurswatcher werkt commercieel samen met {partner.name}.{' '}
              {url
                ? 'Bij een aanmelding via deze link kan Beurswatcher een vergoeding ontvangen.'
                : 'Deze link leidt naar de officiële productinformatie.'}
            </p>
          </aside>
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
      </>
    );
  }
  return <PartnerOverview />;
}

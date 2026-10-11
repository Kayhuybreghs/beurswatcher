'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Plus, Minus, Info } from 'lucide-react';
import Link from './site-link';
import { partners } from './data';
import { partnerFacts } from './partner-facts';
import { partnerDetails } from './journey-data';
import { PartnerVisual } from './partner-pages';
import styles from './partner-editorial.module.css';
const purposes: Record<string, string> = {
  'scalable-capital': 'Periodiek beleggen',
  delta: 'Portefeuille bijhouden',
  'brand-new-day': 'Pensioen opbouwen',
  saxo: 'Particulier & zakelijk',
  'american-express': 'Reisvoordelen afwegen',
};
export function PartnerOverview() {
  const [active, setActive] = useState<string | null>(partners[0].slug),
    root = useRef<HTMLDivElement>(null),
    manual = useRef(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const observe = new IntersectionObserver(
      (entries) => {
        if (
          manual.current ||
          !matchMedia(
            '(min-width: 1100px) and (min-height: 800px) and (hover: hover)',
          ).matches
        )
          return;
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.getAttribute('data-partner'));
      },
      {
        rootMargin: `-${Math.round(innerHeight * 0.23)}px 0px -${Math.round(innerHeight * 0.48)}px 0px`,
        threshold: 0,
      },
    );
    root.current
      ?.querySelectorAll('[data-partner]')
      .forEach((el) => observe.observe(el));
    const unlock = () => {
      if (
        !matchMedia(
          '(min-width: 1100px) and (min-height: 800px) and (hover: hover)',
        ).matches
      )
        return;
      manual.current = false;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (
          manual.current ||
          !matchMedia(
            '(min-width: 1100px) and (min-height: 800px) and (hover: hover)',
          ).matches
        )
          return;
        const candidates = [
          ...(root.current?.querySelectorAll('[data-partner]') || []),
        ].filter((el) => {
          const r = el.getBoundingClientRect();
          return r.top < innerHeight * 0.6 && r.bottom > innerHeight * 0.3;
        });
        if (candidates.length)
          setActive(candidates[0].getAttribute('data-partner'));
      }, 120);
    };
    const keyUnlock = (e: KeyboardEvent) => {
      if (
        [
          'PageDown',
          'PageUp',
          'ArrowDown',
          'ArrowUp',
          'Home',
          'End',
          ' ',
        ].includes(e.key)
      )
        unlock();
    };
    addEventListener('keydown', keyUnlock);
    addEventListener('wheel', unlock, { passive: true });
    addEventListener('touchmove', unlock, { passive: true });
    return () => {
      observe.disconnect();
      clearTimeout(timer);
      removeEventListener('keydown', keyUnlock);
      removeEventListener('wheel', unlock);
      removeEventListener('touchmove', unlock);
    };
  }, []);
  function choose(slug: string) {
    manual.current = true;
    setActive(slug);
    requestAnimationFrame(() =>
      document.getElementById('partner-' + slug)?.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
        block: 'start',
      }),
    );
  }
  return (
    <>
      <section className="partner-directory-hero">
        <div>
          <span className="eyebrow">PARTNERS / DIENSTEN UITGELEGD</span>
          <h1>
            Vergelijk diensten,
            <br />
            <em>functies en kosten.</em>
          </h1>
          <p>
            Van beleggen en pensioen tot je portefeuille bijhouden en
            reisvoordelen. Lees wat deze vijf aanbieders doen, wat het kost en
            welke voorwaarden je moet controleren.
          </p>
        </div>
        <aside
          className={`partner-disclosure ${styles.overviewDisclosure}`}
          aria-label="Commerciële links"
        >
          <Info size={20} aria-hidden="true" />
          Beurswatcher werkt samen met de genoemde aanbieders. Bij commerciële
          links kan Beurswatcher een vergoeding ontvangen. Je herkent deze aan
          het label ‘Commerciële link’.
        </aside>
      </section>
      <div className="partner-quicklook">
        {partners.map((p, i) => (
          <button key={p.slug} onClick={() => choose(p.slug)}>
            <span>0{i + 1}</span>
            <strong>{p.name}</strong>
            <small>{purposes[p.slug]}</small>
            <ArrowUpRight size={18} />
          </button>
        ))}
      </div>
      <section className="partner-walkthrough">
        <aside>
          <span className="eyebrow">PER AANBIEDER</span>
          <h2>
            Wat kun je ermee
            <br />
            en wat kost het?
          </h2>
          <p>
            Kies een aanbieder om functies, kosten en beperkingen te bekijken.
            Op de detailpagina vind je de bronnen en meer uitleg.
          </p>
          <div className="partner-step-nav">
            {partners.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => choose(p.slug)}
                aria-pressed={active === p.slug}
              >
                <span>0{i + 1}</span>
                {p.name}
                <ArrowRight size={14} />
              </button>
            ))}
          </div>
        </aside>
        <div className="partner-stops" ref={root}>
          {partners.map((p, i) => {
            const f = partnerFacts[p.slug],
              open = active === p.slug;
            return (
              <article
                id={'partner-' + p.slug}
                data-partner={p.slug}
                className={'partner-stop ' + (open ? 'is-open' : '')}
                key={p.slug}
              >
                <button
                  className="partner-stop-heading"
                  aria-expanded={open}
                  aria-controls={'partner-content-' + p.slug}
                  onClick={() => {
                    manual.current = true;
                    setActive(open ? null : p.slug);
                  }}
                >
                  <span>0{i + 1}</span>
                  <div>
                    <small>{purposes[p.slug]}</small>
                    <h2>{p.name}</h2>
                  </div>
                  {open ? <Minus /> : <Plus />}
                </button>
                <p className="partner-short">{f.description}</p>
                <div
                  className="partner-open-content"
                  id={'partner-content-' + p.slug}
                  hidden={!open}
                >
                  <PartnerVisual slug={p.slug} />
                  <div className="partner-open-copy">
                    <span className="eyebrow">WAT HEB JE ERAAN?</span>
                    <ul>
                      {f.benefits.slice(0, 2).map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <p>
                      <b>Interessant als:</b> {partnerDetails[p.slug].fit}
                    </p>
                    <p className="partner-cost-note">
                      <b>Kosten:</b> {f.cost}
                    </p>
                    <Link className="button" href={'/partners/' + p.slug}>
                      Lees meer over {p.name} <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="business-invite">
        <div>
          <span className="eyebrow">VOOR MERKEN EN BEDRIJVEN</span>
          <h2>Een samenwerking bespreken?</h2>
        </div>
        <Link href="/zakelijk-samenwerken" className="button yellow">
          Samenwerken met Beurswatcher <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}

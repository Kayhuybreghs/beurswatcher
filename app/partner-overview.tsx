'use client';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Minus,
  ShieldCheck,
} from 'lucide-react';
import Link from './site-link';
import { partners } from './data';
import { partnerFacts } from './partner-facts';
import { partnerDetails } from './journey-data';
import { PartnerVisual } from './partner-pages';
const purposes: Record<string, string> = {
  'scalable-capital': 'Periodiek beleggen',
  delta: 'Portefeuille bijhouden',
  'brand-new-day': 'Pensioen opbouwen',
  saxo: 'Zakelijk beleggen',
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
          <span className="eyebrow">PARTNERS / DE MATCH MET JOUW PLAN</span>
          <h1>
            Een dienst is pas goed
            <br />
            <em>als je er iets aan hebt.</em>
          </h1>
          <p>
            Vijf verschillende diensten. Ontdek wat ze doen, voor wie ze bedoeld
            zijn en waar je op let.
          </p>
        </div>
        <span className="partner-disclosure">
          <ShieldCheck size={20} />
          Commerciële samenwerkingen.
          <br />
          Met de context erbij.
        </span>
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
          <span className="eyebrow">STAP VOOR STAP</span>
          <h2>
            Wat past bij
            <br />
            jouw vraag?
          </h2>
          <p>
            Scroll door de diensten of open zelf een bedrijf. De belangrijkste
            informatie staat meteen bij elkaar.
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
                      <b>Past bij:</b> {partnerDetails[p.slug].fit}
                    </p>
                    <p className="partner-cost-note">
                      <b>Neem mee:</b> {f.cost}
                    </p>
                    <Link className="button" href={'/partners/' + p.slug}>
                      Bekijk de volledige afweging <ArrowUpRight size={17} />
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
          <h2>Ook iets waardevols toe te voegen?</h2>
        </div>
        <Link href="/zakelijk-samenwerken" className="button yellow">
          Samenwerken met Beurswatcher <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}

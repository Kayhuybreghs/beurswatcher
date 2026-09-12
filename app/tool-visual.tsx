'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Target } from 'lucide-react';
import { futureValue } from './data';
import { netOfFees, requiredMonthly } from './calculations';
import { dividendScenario } from './scenario-math';
const money = (v: number) =>
  new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(v);
export function useVisualDeck(key = '') {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const media = matchMedia('(hover: none), (pointer: coarse)');
    let observer: IntersectionObserver | undefined;
    const setup = () => {
      observer?.disconnect();
      setActive(null);
      if (!media.matches) return;
      const visible = new Set<Element>();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5)
              visible.add(entry.target);
            else visible.delete(entry.target);
          }
          const best = [...visible].sort((a, b) => {
            const ra = a.getBoundingClientRect(),
              rb = b.getBoundingClientRect();
            return (
              Math.abs(ra.top + ra.height / 2 - innerHeight / 2) -
              Math.abs(rb.top + rb.height / 2 - innerHeight / 2)
            );
          })[0];
          setActive((current) => {
            const previous = [...visible].find(
              (el) => el.getAttribute('data-motion-card') === current,
            );
            if (previous && best) {
              const a = previous.getBoundingClientRect(),
                b = best.getBoundingClientRect();
              if (
                Math.abs(a.top + a.height / 2 - innerHeight / 2) <=
                Math.abs(b.top + b.height / 2 - innerHeight / 2) + 80
              )
                return current;
            }
            return best?.getAttribute('data-motion-card') || null;
          });
        },
        { threshold: [0, 0.5, 0.65, 0.85, 1], rootMargin: '-8% 0px -8% 0px' },
      );
      root.current
        ?.querySelectorAll('[data-motion-card]')
        .forEach((el) => observer?.observe(el));
    };
    setup();
    media.addEventListener('change', setup);
    return () => {
      observer?.disconnect();
      media.removeEventListener('change', setup);
    };
  }, [key]);
  const events = (slug: string) => ({
    'data-motion-card': slug,
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse') setActive(slug);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse') setActive(null);
    },
    onFocus: () => setActive(slug),
    onBlur: () => setActive(null),
  });
  return { root, active, events };
}
export function ToolVisual({
  slug,
  active = false,
}: {
  slug: string;
  active?: boolean;
}) {
  const [phase, setProgress] = useState(1);
  const progress = active ? phase : 1;
  useEffect(() => {
    if (!active || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 1700);
      setProgress(1 - (1 - p) ** 2);
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active]);
  const years = Math.round(progress * 20),
    isFees = slug === 'etf-kosten',
    isDividend = slug === 'dividend';
  const first = isFees
    ? futureValue(10000, 250, netOfFees(6, 0.15), years)
    : isDividend
      ? dividendScenario(10000, 4, 3, years).at(-1)!.reinvested
      : futureValue(10000, 250, 6, years);
  const second = isFees
    ? futureValue(10000, 250, netOfFees(6, 1), years)
    : isDividend
      ? (() => {
          const d = dividendScenario(10000, 4, 3, years).at(-1)!;
          return d.capital + d.cash;
        })()
      : 10000 + years * 3000;
  return (
    <div
      className={'tool-scene scene-' + slug + (active ? ' motion-active' : '')}
      aria-hidden="true"
      style={{ '--scene-progress': progress } as React.CSSProperties}
    >
      <div className="scene-caption">
        <span>
          {isFees
            ? 'DEZELFDE INLEG. ANDERE KOSTEN.'
            : isDividend
              ? 'GEEF DIVIDEND MEER TIJD'
              : slug === 'inflatie'
                ? 'DE WAARDE VAN JE EURO'
                : slug === 'lump-sum-dca'
                  ? 'HETZELFDE BEDRAG. ANDERE START.'
                  : 'EEN SCENARIO IN BEELD'}
        </span>
        <ArrowUpRight size={16} />
      </div>
      {['rendement', 'etf-kosten', 'dividend'].includes(slug) ? (
        <>
          <div className="scene-value">
            <strong>{money(isFees ? first - second : first)}</strong>
            <span>
              {isFees
                ? 'verschil door kosten'
                : isDividend
                  ? 'met herbeleggen'
                  : 'vermogen na ' + years + ' jaar'}
            </span>
          </div>
          <svg className="scene-chart" viewBox="0 0 320 108">
            <path className="scene-grid" d="M0 18H320 M0 54H320 M0 90H320" />
            <path
              className="scene-wash"
              d="M4 99C110 95 205 65 312 9V108H4Z"
              opacity={progress * 0.08}
            />
            <path
              className="scene-line scene-secondary"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - progress}
              d={
                isFees || isDividend
                  ? 'M4 99C110 95 205 85 312 44'
                  : 'M4 99L312 71'
              }
            />
            <path
              className="scene-line"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - progress}
              d="M4 99C110 95 205 65 312 9"
            />
            <circle
              cx={4 + 308 * progress}
              cy={99 - 90 * progress ** 1.85}
              r="4"
            />
          </svg>
          <div className="scene-legend">
            <span>
              <i />
              {isFees
                ? '0,15% kosten'
                : isDividend
                  ? 'Herbeleggen'
                  : 'Met rendement'}
            </span>
            <span>
              <i />
              {isFees
                ? '1% kosten'
                : isDividend
                  ? 'Uitkering apart'
                  : 'Eigen inleg'}
            </span>
          </div>
          <small>
            {isDividend
              ? '€ 10.000 · 4% groei + 3% dividend · 20 jaar'
              : '€ 10.000 + € 250 p/m · 6% bruto · 20 jaar'}
          </small>
        </>
      ) : slug === 'doelvermogen' ? (
        <>
          <div className="scene-goal">
            <svg viewBox="0 0 120 120">
              <circle className="goal-base" cx="60" cy="60" r="51" />
              <circle
                className="goal-fill"
                cx="60"
                cy="60"
                r="51"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - progress}
              />
            </svg>
            <Target size={29} />
            <b>{Math.round(progress * 100)}%</b>
          </div>
          <div className="scene-goal-label">
            <span>JOUW DOEL</span>
            <strong>€ 100.000</strong>
            <b>
              {money(requiredMonthly(100000, 10000, 6, 20))} per maand{' '}
              <ArrowUpRight size={16} />
            </b>
          </div>
          <small>€ 10.000 start · 20 jaar · 6% rendement</small>
        </>
      ) : slug === 'inflatie' ? (
        <>
          <div className="scene-value">
            <strong>{money(10000 / 1.025 ** (progress * 20))}</strong>
            <span>koopkracht na {years} jaar</span>
          </div>
          <div className="power-meter">
            <div>
              <span>Bedrag op je rekening</span>
              <b>€ 10.000</b>
            </div>
            <i />
            <div>
              <span>Wat je ermee kunt kopen</span>
              <b>{Math.round(100 / 1.025 ** (progress * 20))}%</b>
            </div>
            <i style={{ width: 100 / 1.025 ** (progress * 20) + '%' }} />
          </div>
          <small>Geen rendement · 2,5% inflatie · 20 jaar</small>
        </>
      ) : slug === 'lump-sum-dca' ? (
        <>
          <div className="scene-value">
            <strong>€ 12.000</strong>
            <span>één startbedrag, twee routes</span>
          </div>
          <div className="entry-lanes">
            <div>
              <span>Ineens</span>
              <i style={{ height: 70 * progress + 8 }} />
              <b>€ 12.000</b>
            </div>
            <div>
              <span>Gespreid</span>
              <section>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <i
                    key={i}
                    style={{
                      height:
                        8 + 24 * Math.max(0, Math.min(1, progress * 6 - i)),
                    }}
                  />
                ))}
              </section>
              <b>6 × € 2.000</b>
            </div>
          </div>
          <small>Dezelfde markt · een ander instapmoment</small>
        </>
      ) : slug === 'box-3' ? (
        <>
          <div className="scene-value">
            <strong>€ 100.000</strong>
            <span>vermogen heeft verschillende delen</span>
          </div>
          <div className="scene-tax-bar">
            <i style={{ flex: 0.25 * progress }} />
            <i style={{ flex: 0.75 * progress }} />
          </div>
          <div className="scene-tax-labels">
            <span>
              Spaargeld<b>€ 25.000</b>
            </span>
            <span>
              Beleggingen<b>€ 75.000</b>
            </span>
          </div>
          <small>Voorbeeldverdeling · bereken je eigen indicatie</small>
        </>
      ) : slug === 'compound-interest' ? (
        <>
          <div className="scene-value">
            <strong>{money(futureValue(10000, 0, 6, years))}</strong>
            <span>rendement op rendement</span>
          </div>
          <div className="compound-columns">
            {[1, 10, 20].map((y) => (
              <div key={y}>
                <b>{money(futureValue(10000, 0, 6, y * progress))}</b>
                <i
                  style={{
                    height:
                      (futureValue(10000, 0, 6, y * progress) / 32071) * 75,
                  }}
                />
                <span>{y} jaar</span>
              </div>
            ))}
          </div>
          <small>€ 10.000 eenmalig · 6% rendement</small>
        </>
      ) : (
        <>
          <div className="scene-value">
            <strong>Twee routes.</strong>
            <span>Wat doet € 10.000 in 20 jaar?</span>
          </div>
          <div className="decision-bars">
            {[3, 6].map((r, i) => (
              <div key={r}>
                <span>{i ? 'Beleggen · 6%' : 'Besparing · 3%'}</span>
                <i style={{ width: (i ? 100 : 57) * progress + '%' }} />
                <b>{money(futureValue(10000, 0, r, years))}</b>
              </div>
            ))}
          </div>
          <small>Vereenvoudigd · vóór kosten en belasting</small>
        </>
      )}
    </div>
  );
}

'use client';
import { useState, useEffect, useRef, memo } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Target,
  MoveUpRight,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from './site-link';
import { Chart, eur, Newsletter } from './widgets';
import { futureValue, markets } from './data';
import { requiredMonthly, netOfFees } from './calculations';
import { demoSeries } from './market-data';
import { BrandMark, AboutBeurswatcher } from './brand';
import { AnimatedNumber } from './motion';
import { ToolShelf } from './experience';
import { ReelRail } from './reels';
import { MarketMiniHub } from './market-hub';

export function BrandHero() {
  const [focus, setFocus] = useState('Vermogen');
  const monthly = requiredMonthly(100000, 10000, 6, 20);
  return (
    <section className="watch-hero">
      <div className="hero-orbit" aria-hidden="true" />
      <div className="watch-hero-copy">
        <span className="brand-kicker">
          <span /> Uitleg over geld. Gratis rekentools.
        </span>
        <h1>
          Beleggen begrijpen.
          <br />
          <span>Zelf rekenen.</span>
        </h1>
        <p>
          Lees hoe beleggen, pensioen en vermogen werken. Bereken zelf wat
          inleg, rendement en kosten betekenen voor je geld. Gratis en zonder
          account.
        </p>
        <div className="hero-actions">
          <Link className="button yellow" href="/artikelen">
            Lees de artikelen <ArrowRight size={19} />
          </Link>
          <Link href="/tools" className="hero-instagram">
            Gebruik de gratis tools <ArrowRight size={16} />
          </Link>
        </div>
        <div className="hero-signature">
          <BrandMark />
          <span>
            Het heft in eigen handen nemen.
            <small>Met begrijpelijke uitleg en berekeningen.</small>
          </span>
        </div>
      </div>
      <div className="radar-stack">
        <div className="radar-back" aria-hidden="true" />
        <div className="radar-board">
          <div className="radar-top">
            <span>
              <i /> WAT KUN JE HIER DOEN?
            </span>
            <MoveUpRight size={25} />
          </div>
          <Tabs value={focus} onValueChange={(v) => setFocus(String(v))}>
            <TabsList>
              {['De beurs', 'Vermogen', 'Pensioen'].map((v) => (
                <TabsTrigger key={v} value={v}>
                  {v}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="radar-content" key={focus}>
            {focus === 'Vermogen' ? (
              <>
                <span className="radar-label">
                  REKENVOORBEELD / EEN DOEL VAN
                </span>
                <strong className="radar-number">
                  € 100.000<span>→</span>
                </strong>
                <h2>
                  Hoeveel moet je
                  <br />
                  per maand beleggen?
                </h2>
                <div className="radar-growth">
                  <Chart
                    mini
                    values={Array.from({ length: 21 }, (_, y) =>
                      futureValue(10000, monthly, 6, y),
                    )}
                  />
                  <span>
                    <b>{eur(monthly)}</b> per maand
                  </span>
                </div>
                <p className="radar-note">
                  Rekenvoorbeeld: € 10.000 start · 20 jaar · 6% rendement.
                  Zonder kosten of belasting.
                </p>
                <Link className="radar-action" href="/tools/doelvermogen">
                  Bereken je maandelijkse inleg <ArrowRight size={20} />
                </Link>
              </>
            ) : focus === 'De beurs' ? (
              <>
                <span className="radar-label">AEX / VOORBEELDKOERS</span>
                <strong className="radar-number">
                  {markets[0].value.toLocaleString('nl-NL')}
                  <small>+0,42%</small>
                </strong>
                <h2>
                  Bekijk indices,
                  <br />
                  stijgers en dalers.
                </h2>
                <div className="radar-growth">
                  <Chart mini values={demoSeries('AEX', '1D')} />
                </div>
                <p className="radar-note">
                  Illustratieve gegevens. Geen live koersen.
                </p>
                <Link className="radar-action" href="/markt">
                  Bekijk de marktinformatie <ArrowRight size={20} />
                </Link>
              </>
            ) : (
              <>
                <span className="radar-label">
                  HOE IS JE PENSIOEN OPGEBOUWD?
                </span>
                <strong className="radar-number">
                  3 delen
                  <span>
                    <Target size={40} />
                  </span>
                </strong>
                <h2>
                  AOW, je werkgever
                  <br />
                  en eigen aanvulling.
                </h2>
                <div className="pension-stack">
                  <span>
                    01 <b>AOW</b>
                  </span>
                  <span>
                    02 <b>Via je werk</b>
                  </span>
                  <span>
                    03 <b>Wat je zelf opbouwt</b>
                  </span>
                </div>
                <p className="radar-note">
                  Lees hoe deze onderdelen verschillen en waar je jouw
                  opgebouwde pensioen kunt terugvinden.
                </p>
                <Link className="radar-action" href="/verdieping/pensioen">
                  Lees de uitleg over pensioen <ArrowRight size={20} />
                </Link>
              </>
            )}
          </div>
        </div>
        <span className="radar-sticker">
          GRATIS TOOLS
          <br />
          <b>zonder account ↗</b>
        </span>
      </div>
      <div className="hero-bottom">
        <span>BELEGGEN · VERMOGEN · PENSIOEN · GELDZAKEN</span>
        <span>
          Hieronder: uitleg en tools <ArrowDown size={15} />
        </span>
      </div>
    </section>
  );
}

const pathChapters = [
  {
    tag: '01 / BEGRIJPEN',
    title: 'Hoeveel moet je beleggen voor € 100.000?',
    copy: 'Dit voorbeeld begint met € 10.000 en rekent twintig jaar door. Je uitkomst hangt af van inleg, looptijd en rendement. Rendement is onzeker.',
    action: 'Lees hoe deze berekening werkt',
    href: '/uitleg/honderdduizend-euro-opbouwen',
  },
  {
    tag: '02 / BEREKENEN',
    title: 'Wat vraagt dat per maand?',
    copy: 'Bij 6% rendement per jaar is ongeveer € 150 per maand nodig. Vul in de tool je eigen bedragen en looptijd in en vergelijk de uitkomst.',
    action: 'Bereken je maandelijkse inleg',
    href: '/tools/doelvermogen',
  },
  {
    tag: '03 / KOSTEN VERGELIJKEN',
    title: 'Wat houd je over na fondskosten?',
    copy: 'Bij 1% jaarlijkse fondskosten houd je minder over dan bij 0,15%. Vergelijk het verschil bij dezelfde inleg en hetzelfde brutorendement.',
    action: 'Vergelijk jaarlijkse fondskosten',
    href: '/tools/etf-kosten',
  },
];
const PathDisplay = memo(function PathDisplay({ stage }: { stage: number }) {
  const monthly = requiredMonthly(100000, 10000, 6, 20),
    a = futureValue(10000, monthly, netOfFees(6, 0.15), 20),
    b = futureValue(10000, monthly, netOfFees(6, 1), 20);
  return (
    <div className="path-display">
      {stage === 0 ? (
        <>
          <span className="path-overline">STEL, DIT IS JOUW DOEL</span>
          <strong className="path-big-number">€ 100.000</strong>
          <p className="path-display-heading">Waar wil je naartoe?</p>
          <div className="path-goal-bars">
            <span>
              <i style={{ width: '10%' }} />
              Startkapitaal <b>€ 10.000</b>
            </span>
            <span>
              <i style={{ width: '100%' }} />
              Je doel <b>€ 100.000</b>
            </span>
          </div>
          <div className="path-assumptions">
            <span>20 jaar de tijd</span>
            <span>6% jaarrendement</span>
          </div>
          <p className="path-fine">
            Een scenario om te onderzoeken. Rendement is onzeker; geen kosten,
            inflatie of belasting verwerkt.
          </p>
        </>
      ) : stage === 1 ? (
        <>
          <span className="path-overline">DIT VRAAGT HET REKENVOORBEELD</span>
          <strong className="path-big-number">
            <AnimatedNumber value={monthly} format={eur} />
            <small>/mnd</small>
          </strong>
          <p className="path-display-heading">Van doel naar maandbedrag.</p>
          <Chart
            mini
            values={Array.from({ length: 21 }, (_, y) =>
              futureValue(10000, monthly, 6, y),
            )}
            second={Array.from(
              { length: 21 },
              (_, y) => 10000 + monthly * 12 * y,
            )}
            labels={Array.from({ length: 21 }, (_, y) => y + ' jaar')}
          />
          <p className="path-fine">
            € 10.000 start · 20 jaar · 6% rendement. Blauw: scenario, geel:
            inleg. Zonder kosten of belasting.
          </p>
        </>
      ) : (
        <>
          <span className="path-overline">OOK KOSTEN MAKEN VERSCHIL</span>
          <strong className="path-big-number">
            <AnimatedNumber value={a - b} format={eur} />
          </strong>
          <p className="path-display-heading">
            Minder eindvermogen bij hogere kosten.
          </p>
          <div className="cost-comparison">
            <span>
              <b>0,15% kosten</b>
              <i style={{ width: `${(a / 100000) * 100}%` }} />
              <strong>{eur(a)}</strong>
            </span>
            <span>
              <b>1% kosten</b>
              <i style={{ width: `${(b / 100000) * 100}%` }} />
              <strong>{eur(b)}</strong>
            </span>
          </div>
          <p className="path-fine">
            Hetzelfde startbedrag, maandbedrag en brutorendement. Verschillende
            jaarlijkse fondskosten. Dit is geen vergelijking van brokertarieven.
          </p>
        </>
      )}
    </div>
  );
});

export function WatchPath() {
  const [position, setPosition] = useState(0);
  const [ready, setReady] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const geometry = useRef({ unit: 400, top: 88, active: false });
  const reduced = useRef(false);
  const stage = Math.min(2, Math.round(position));

  const goTo = (index: number, smooth = true) => {
    const area = track.current;
    if (!area) return;
    if (!geometry.current.active) {
      document.getElementById('plan-stap-' + index)?.scrollIntoView({
        behavior: smooth && !reduced.current ? 'smooth' : 'instant',
        block: 'start',
      });
      return;
    }
    window.scrollTo({
      top:
        area.getBoundingClientRect().top +
        window.scrollY -
        geometry.current.top +
        geometry.current.unit * index,
      behavior: smooth && !reduced.current ? 'smooth' : 'instant',
    });
  };

  useEffect(() => {
    const area = track.current,
      panel = pin.current;
    if (!area || !panel) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    reduced.current = preference.matches;
    let frame = 0;
    const render = () => {
      frame = 0;
      const { unit, top, active } = geometry.current;
      if (!active) {
        panel.querySelectorAll<HTMLElement>('.story-panel').forEach((item) => {
          const enter = reduced.current
            ? 1
            : Math.max(
                0,
                Math.min(
                  1,
                  (window.innerHeight - item.getBoundingClientRect().top) /
                    (window.innerHeight * 0.45),
                ),
              );
          item.style.setProperty('--story-enter', String(enter));
        });
        return;
      }
      const raw = Math.max(
        0,
        Math.min(2, (top - area.getBoundingClientRect().top) / unit),
      );
      const step = Math.min(2, Math.floor(raw));
      const fraction = Math.max(0, Math.min(1, (raw - step - 0.06) / 0.88));
      const blend = fraction * fraction * (3 - 2 * fraction);
      setPosition(step + blend);
      area.style.setProperty('--story-progress', String(raw / 2));
    };
    const update = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const measure = () => {
      const header = document.querySelector('.site-header');
      const top = (header?.getBoundingClientRect().height || 76) + 12;
      const panels = panel.querySelector<HTMLElement>('.story-panels')!;
      const panelStyle = getComputedStyle(panels);
      const height =
        Math.max(
          ...Array.from(panels.children, (child) => {
            const item = child as HTMLElement;
            const style = getComputedStyle(item);
            let height =
              item.offsetHeight -
              parseFloat(style.paddingTop) -
              parseFloat(style.borderTopWidth);
            // The flowing fallback adds separators and a mobile step label.
            // Exclude those when deciding whether the pinned layout fits.
            if (window.innerWidth < 700) {
              const label = item.querySelector<HTMLElement>('.section-kicker')!;
              const labelStyle = getComputedStyle(label);
              if (labelStyle.display !== 'none')
                height -=
                  label.offsetHeight +
                  parseFloat(labelStyle.marginTop) +
                  parseFloat(labelStyle.marginBottom);
            }
            return height;
          }),
        ) +
        parseFloat(panelStyle.paddingTop) +
        parseFloat(panelStyle.paddingBottom) +
        panel.querySelector<HTMLElement>('.story-nav')!.offsetHeight +
        panel.querySelector<HTMLElement>('.story-bottom')!.offsetHeight +
        6;
      const available = window.innerHeight - top - 16;
      // Short screens and enlarged text stay in normal document flow. No content
      // is hidden below a sticky frame, and reduced motion shows every step.
      const active = !reduced.current && height <= available;
      const unit = Math.max(280, Math.min(520, available * 0.7));
      geometry.current = { unit, top, active };
      setReady(active);
      area.style.setProperty('--story-unit', `${unit}px`);
      area.style.setProperty('--story-top', `${top}px`);
      area.style.height = active ? `${height + unit * 2}px` : '';
      update();
    };
    const motionChanged = () => {
      reduced.current = preference.matches;
      measure();
    };
    const onHash = () => {
      const match = location.hash.match(/^#plan-stap-([0-2])$/);
      if (match) {
        measure();
        goTo(Number(match[1]), false);
      }
    };
    const resize = new ResizeObserver(measure);
    panel
      .querySelectorAll('.story-panel')
      .forEach((item) => resize.observe(item));
    const header = document.querySelector('.site-header');
    if (header) resize.observe(header);
    measure();
    const initial = requestAnimationFrame(onHash);
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', measure);
    addEventListener('hashchange', onHash);
    preference.addEventListener('change', motionChanged);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(initial);
      resize.disconnect();
      removeEventListener('scroll', update);
      removeEventListener('resize', measure);
      removeEventListener('hashchange', onHash);
      preference.removeEventListener('change', motionChanged);
    };
  }, []);

  return (
    <section
      className={'watch-path scroll-story' + (ready ? ' is-ready' : '')}
      id="startpunt"
    >
      <div className="path-heading">
        <span className="section-kicker">EEN BEREKENING IN DRIE STAPPEN</span>
        <h2>
          Een doel van € 100.000.
          <br />
          <span>Wat vraagt dat van je inleg?</span>
        </h2>
        <p>
          Bekijk hoe startkapitaal, maandelijkse inleg en fondskosten samen de
          uitkomst bepalen. Dit is een rekenvoorbeeld, geen voorspelling.
        </p>
      </div>
      <div className="story-track" ref={track}>
        {ready &&
          pathChapters.map((chapter, index) => (
            <span
              key={chapter.tag}
              id={'plan-stap-' + index}
              className="story-marker"
              style={{ top: `calc(var(--story-unit, 85svh) * ${index})` }}
              aria-hidden="true"
            />
          ))}
        <div className="story-pin" ref={pin}>
          <nav
            className="story-nav"
            aria-label="Rekenvoorbeeld: doel, inleg en kosten"
          >
            {pathChapters.map((chapter, index) => (
              <a
                key={chapter.tag}
                href={'#plan-stap-' + index}
                aria-current={ready && stage === index ? 'step' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  history.replaceState(null, '', '#plan-stap-' + index);
                  goTo(index);
                }}
              >
                <span>0{index + 1}</span>
                {['Je doel', 'Je inleg', 'De kosten'][index]}
              </a>
            ))}
          </nav>
          <div className="story-panels">
            {pathChapters.map((chapter, index) => {
              const distance = Math.abs(position - index);
              return (
                <article
                  className={'story-panel story-panel-' + index}
                  id={ready ? undefined : 'plan-stap-' + index}
                  key={chapter.tag}
                  aria-hidden={ready && stage !== index}
                  inert={ready && stage !== index}
                  style={
                    ready
                      ? {
                          // Panels travel side by side: copy never cross-fades
                          // over other copy, and movement follows the scroll.
                          transform: `translateX(${(index - position) * 105}%)`,
                          visibility: distance < 1 ? 'visible' : 'hidden',
                        }
                      : undefined
                  }
                >
                  <div className="story-copy">
                    <span className="section-kicker">{chapter.tag}</span>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.copy}</p>
                    <Link href={chapter.href} className="story-action">
                      {chapter.action}
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                  <div className={'story-visual path-stage-' + index}>
                    <PathDisplay stage={index} />
                  </div>
                </article>
              );
            })}
          </div>
          <div className="story-bottom">
            <span>
              <ArrowDown size={15} />
              Scroll door de berekening
            </span>
            <span>{ready ? `0${stage + 1} / 03` : '3 stappen'}</span>
          </div>
          <div className="story-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

const homeReading = [
  {
    category: 'BEGINNEN MET BELEGGEN',
    title: 'Beginnen met beleggen',
    text: 'Wat moet je weten over je buffer, spreiding en risico voordat je begint?',
    href: '/verdieping/beginnen',
    action: 'Lees de basis van beleggen',
  },
  {
    category: 'ETF’S & KOSTEN',
    title: 'Wat kosten ETF’s?',
    text: 'Lees welke kosten meetellen en wat het verschil tussen 0,15% en 1% kan betekenen.',
    href: '/uitleg/etf-kosten-lange-termijn',
    action: 'Lees de uitleg over ETF-kosten',
  },
  {
    category: 'PENSIOEN',
    title: 'Hoe werkt je pensioen?',
    text: 'AOW, pensioen via je werk en een eigen aanvulling. Wat is het verschil?',
    href: '/verdieping/pensioen',
    action: 'Lees de uitleg over pensioen',
  },
];

export function BrandHome() {
  return (
    <>
      <BrandHero />
      <div className="brand-track">
        <span>Beleggen uitgelegd</span>
        <i>✳</i>
        <span>Inleg berekenen</span>
        <i>✳</i>
        <span>Kosten vergelijken</span>
        <i>✳</i>
        <span>Pensioen begrijpen</span>
      </div>
      <section className="brand-insights home-reading" id="verhalen">
        <div className="brand-section-head">
          <div>
            <span className="section-kicker">ARTIKELEN & UITLEG</span>
            <h2>Waar wil je meer over weten?</h2>
          </div>
          <Link href="/artikelen" className="textlink">
            Alle onderwerpen en artikelen <ArrowRight size={19} />
          </Link>
        </div>
        <div className="home-topic-grid">
          {homeReading.map((item, index) => (
            <Link key={item.href} className="home-topic-card" href={item.href}>
              <span className="home-topic-number">
                0{index + 1} <ArrowUpRight size={19} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="home-topic-action">
                {item.action} <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="question-tools">
        <div className="brand-section-head">
          <div>
            <span className="section-kicker">GRATIS TOOLS</span>
            <h2>
              Bereken je inleg.
              <br />
              <span>Vergelijk de uitkomsten.</span>
            </h2>
          </div>
          <p>
            Pas bedragen, looptijd en rendement aan.
            <br />
            Altijd gratis en zonder account.
          </p>
        </div>
        <ToolShelf limit={3} />
        <Link className="all-tools-link" href="/tools">
          Ook rekenen aan inflatie, dividend of Box 3?{' '}
          <span>
            Bekijk alle 9 tools <ArrowRight size={19} />
          </span>
        </Link>
      </section>
      <WatchPath />
      <AboutBeurswatcher />
      <ReelRail />
      <MarketMiniHub />
      <Newsletter />
    </>
  );
}

'use client';
import { useState, useEffect, useRef, memo } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Camera as Instagram,
  Target,
  MoveUpRight,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from './site-link';
import { Chart, eur, Newsletter, ArticleCard } from './widgets';
import { futureValue, markets, articles } from './data';
import { requiredMonthly, netOfFees } from './calculations';
import { demoSeries } from './market-data';
import { BrandMark, instagramUrl, AboutBeurswatcher } from './brand';
import { AnimatedNumber } from './motion';
import { EventTeaser } from './brand-events';
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
          <span /> Voor de nieuwe generatie beleggers
        </span>
        <h1>
          Kijk verder.
          <br />
          <span>Kom verder.</span>
        </h1>
        <p>
          De beurs. Je geld. Jouw toekomst.
          <br />
          Ontdek wat ertoe doet en reken zelf door wat bij jouw plannen past.
        </p>
        <div className="hero-actions">
          <Link className="button yellow" href="#verhalen">
            Ontdek de verhalen <ArrowDown size={19} />
          </Link>
          <Link
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="hero-instagram"
          >
            <Instagram size={19} /> Dagelijks op Instagram{' '}
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="hero-signature">
          <BrandMark />
          <span>
            Van Daniel. Voor nieuwsgierige beleggers.
            <small>Korte inzichten op social. Meer diepgang hier.</small>
          </span>
        </div>
      </div>
      <div className="radar-stack">
        <div className="radar-back" aria-hidden="true" />
        <div className="radar-board">
          <div className="radar-top">
            <span>
              <i /> OP JOUW RADAR
            </span>
            <MoveUpRight size={25} />
          </div>
          <Tabs value={focus} onValueChange={(v) => setFocus(String(v))}>
            <TabsList>
              {['De beurs', 'Vermogen', 'Later'].map((v) => (
                <TabsTrigger key={v} value={v}>
                  {v}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="radar-content" key={focus}>
            {focus === 'Vermogen' ? (
              <>
                <span className="radar-label">JE EERSTE</span>
                <strong className="radar-number">
                  € 100.000<span>→</span>
                </strong>
                <h2>
                  Een groot doel.
                  <br />
                  Een concreet maandbedrag.
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
                  Wat vraagt jouw doel? <ArrowRight size={20} />
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
                  De beweging zien.
                  <br />
                  Het verhaal begrijpen.
                </h2>
                <div className="radar-growth">
                  <Chart mini values={demoSeries('AEX', '1D')} />
                </div>
                <p className="radar-note">
                  Illustratieve gegevens. Geen live koersen.
                </p>
                <Link className="radar-action" href="/markt">
                  Open je marktoverzicht <ArrowRight size={20} />
                </Link>
              </>
            ) : (
              <>
                <span className="radar-label">JOUW TOEKOMST</span>
                <strong className="radar-number">
                  Later
                  <span>
                    <Target size={40} />
                  </span>
                </strong>
                <h2>
                  Begint met een
                  <br />
                  goed beeld van nu.
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
                  Breng de onderdelen samen voordat je een bedrag of product
                  kiest.
                </p>
                <Link className="radar-action" href="/beleggen/pensioen">
                  Krijg zicht op later <ArrowRight size={20} />
                </Link>
              </>
            )}
          </div>
        </div>
        <span className="radar-sticker">
          ZELF ONDERZOEKEN
          <br />
          <b>begint hier ↗</b>
        </span>
      </div>
      <div className="hero-bottom">
        <span>BEURSBEWEGING → INZICHT → JOUW VOLGENDE STAP</span>
        <span>
          Scroll om verder te kijken <ArrowDown size={15} />
        </span>
      </div>
    </section>
  );
}

const pathChapters = [
  {
    tag: '01 / BEGRIJPEN',
    title: 'Je ziet een bedrag. Je krijgt een vraag.',
    copy: 'Je eerste € 100.000 klinkt concreet. Maar hoeveel moet je eigenlijk inleggen, en hoeveel tijd wil je jezelf geven?',
    action: 'Begin met een beleggingsplan',
    href: '/artikelen/een-plan-voor-onrust',
  },
  {
    tag: '02 / ZELF ONDERZOEKEN',
    title: 'Maak het jouw berekening.',
    copy: 'Een doel krijgt betekenis als je de aannames kent. Pas startkapitaal, tijd en rendement aan en ontdek wat er verandert.',
    action: 'Reken jouw doelvermogen door',
    href: '/tools/doelvermogen',
  },
  {
    tag: '03 / BEWUST KIEZEN',
    title: 'Dan pas: wat past bij je plan?',
    copy: 'Een broker of andere dienst komt na je afwegingen. Onderzoek kosten, mogelijkheden en voorwaarden vanuit jouw manier van beleggen.',
    action: 'Onderzoek wat kosten veranderen',
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
  const geometry = useRef({ unit: 600, top: 88 });
  const reduced = useRef(false);
  const stage = Math.min(2, Math.round(position));

  const goTo = (index: number, smooth = true) => {
    const area = track.current;
    if (!area) return;
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
    setReady(true);
    let frame = 0;
    const measure = () => {
      frame = 0;
      const header = document.querySelector('.site-header');
      const top = (header?.getBoundingClientRect().height || 76) + 12;
      const height = panel.getBoundingClientRect().height;
      const unit = Math.max(420, window.innerHeight * 0.85, height * 0.7);
      geometry.current = { unit, top };
      area.style.setProperty('--story-unit', `${unit}px`);
      area.style.height = `${height + unit * 2.6}px`;
      const raw = Math.max(
        0,
        Math.min(2.6, (top - area.getBoundingClientRect().top) / unit),
      );
      const step = Math.min(2, Math.floor(raw));
      const fraction =
        step < 2 ? Math.max(0, Math.min(1, (raw - step - 0.6) / 0.4)) : 0;
      const blend = fraction * fraction * (3 - 2 * fraction);
      // A short viewport or enlarged text gets reading space within every step.
      // The page still scrolls normally; there is no nested scroll area or touch lock.
      const overflow = Math.max(0, height + top + 12 - window.innerHeight);
      const readingOffset =
        overflow * Math.min(1, (raw - step) / 0.55) * (1 - blend);
      area.style.setProperty('--story-top', `${top - readingOffset}px`);
      setPosition(
        reduced.current ? Math.min(2, Math.round(raw)) : step + blend,
      );
      area.style.setProperty('--story-progress', String(Math.min(1, raw / 2)));
    };
    const update = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const motionChanged = () => {
      reduced.current = preference.matches;
      update();
    };
    const onHash = () => {
      const match = location.hash.match(/^#plan-stap-([0-2])$/);
      if (match) {
        measure();
        goTo(Number(match[1]), false);
      }
    };
    const resize = new ResizeObserver(update);
    resize.observe(panel);
    const header = document.querySelector('.site-header');
    if (header) resize.observe(header);
    update();
    const initial = requestAnimationFrame(onHash);
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    addEventListener('hashchange', onHash);
    preference.addEventListener('change', motionChanged);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(initial);
      resize.disconnect();
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
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
        <span className="section-kicker">
          VAN EEN INZICHT NAAR IETS VAN JOU
        </span>
        <h2>
          Niet alleen scrollen.
          <br />
          <span>Er iets mee doen.</span>
        </h2>
        <p>
          Zo brengt Beurswatcher je van een goede vraag naar een doordachte
          volgende stap.
        </p>
      </div>
      <div className="story-track" ref={track}>
        {pathChapters.map((chapter, index) => (
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
            aria-label="Van inzicht naar je eigen plan"
          >
            {pathChapters.map((chapter, index) => (
              <a
                key={chapter.tag}
                href={'#plan-stap-' + index}
                aria-current={stage === index ? 'step' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  history.replaceState(null, '', '#plan-stap-' + index);
                  goTo(index);
                }}
              >
                <span>0{index + 1}</span>
                {['Begrijpen', 'Berekenen', 'Afwegen'][index]}
              </a>
            ))}
          </nav>
          <div className="story-panels">
            {pathChapters.map((chapter, index) => {
              const distance = Math.abs(position - index);
              return (
                <article
                  className={'story-panel story-panel-' + index}
                  key={chapter.tag}
                  aria-hidden={ready && stage !== index}
                  inert={ready && stage !== index}
                  style={
                    ready
                      ? {
                          opacity: Math.max(0, 1 - distance),
                          transform: `translateY(${(index - position) * 36}px) scale(${1 - Math.min(1, distance) * 0.025})`,
                          visibility: distance >= 1 ? 'hidden' : 'visible',
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
              Scroll om verder te kijken
            </span>
            <span>0{stage + 1} / 03</span>
          </div>
          <div className="story-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

export function BrandHome() {
  return (
    <>
      <BrandHero />
      <div className="brand-track">
        <span>De beurs begrijpen</span>
        <i>✳</i>
        <span>Je vermogen opbouwen</span>
        <i>✳</i>
        <span>Je eigen plan maken</span>
        <i>✳</i>
        <span>Verder kijken</span>
      </div>
      <WatchPath />
      <AboutBeurswatcher />
      <section className="question-tools">
        <div className="brand-section-head">
          <div>
            <span className="section-kicker">
              GOEDE VRAGEN VERDIENEN EEN REKENTOOL
            </span>
            <h2>
              Wat als je het
              <br />
              <span>zelf doorrekent?</span>
            </h2>
          </div>
          <p>
            Verander een aanname. Zie wat het doet.
            <br />
            Altijd gratis en zonder account.
          </p>
        </div>
        <ToolShelf limit={3} />
        <Link className="all-tools-link" href="/tools">
          Ook aflossen, samengestelde rente of Box 3 onderzoeken?{' '}
          <span>
            Bekijk alle 9 tools <ArrowRight size={19} />
          </span>
        </Link>
      </section>
      <section className="brand-insights" id="verhalen">
        <div className="brand-section-head">
          <div>
            <span className="section-kicker">
              ACHTER HET CIJFER ZIT EEN VERHAAL
            </span>
            <h2>Even verder kijken.</h2>
          </div>
          <Link href="/artikelen" className="textlink">
            Alle inzichten <ArrowUpRight size={19} />
          </Link>
        </div>
        <div className="insight-mosaic">
          <div className="insight-feature">
            <ArticleCard article={articles[1]} />
          </div>
          <div className="insight-color">
            <span>HET ZIT IN DE DETAILS</span>
            <ArticleCard article={articles[2]} compact />
            <Link className="insight-tool-link" href="/tools/etf-kosten">
              En wat doen kosten over 20 jaar? <ArrowRight size={19} />
            </Link>
          </div>
          <div className="insight-short">
            <ArticleCard article={articles[6]} compact />
            <Link className="insight-tool-link" href="/tools/doelvermogen">
              Reken je eigen doel door <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>
      <ReelRail />
      <MarketMiniHub />
      <EventTeaser />
      <Newsletter />
    </>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Activity } from 'lucide-react';
import Link from './site-link';
import { MacroCalendar } from './macro-calendar';
import {
  loadTradingViewOverview,
  indexReferenceSymbols,
} from './tradingview-overview';

export function MarketWidget({
  kind = 'indices',
  compact = false,
}: {
  kind?: 'indices' | 'movers';
  compact?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'loading' | 'embedded' | 'error'>(
    'loading',
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let alive = true;
    let started = false;
    const widget = document.createElement('tv-market-overview');
    widget.setAttribute('theme', 'light');
    widget.setAttribute('transparent', '');
    widget.setAttribute('time-frame', '12M');
    widget.setAttribute('item-size', 'compact');
    widget.setAttribute('chart-size', 'compact');
    widget.setAttribute(
      'aria-label',
      kind === 'indices'
        ? 'Indicatieve indexprijzen en koersgrafiek van TradingView'
        : 'Amerikaanse stijgers, dalers en actieve aandelen van TradingView',
    );
    if (kind === 'indices') {
      widget.setAttribute('mode', 'custom');
      widget.setAttribute(
        'symbol-sectors',
        JSON.stringify([
          {
            sectionName: 'Indexreferenties (CFD)',
            symbols: indexReferenceSymbols,
          },
        ]),
      );
    } else {
      widget.setAttribute('mode', 'market-movers');
      widget.setAttribute('exchange', 'US');
      widget.setAttribute('assets-type', 'stocks');
    }

    const mount = async () => {
      if (started) return;
      started = true;
      try {
        await loadTradingViewOverview();
        if (!alive) return;
        element.appendChild(widget);
        // The provider now owns its loading/error UI. Script registration does
        // not prove that a symbol has data, and is never labelled as live/ready.
        setState('embedded');
      } catch {
        if (alive) setState('error');
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void mount();
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(element);
    return () => {
      alive = false;
      observer.disconnect();
      widget.remove();
    };
  }, [kind, attempt]);

  const source =
    kind === 'indices'
      ? 'https://www.tradingview.com/markets/indices/'
      : 'https://www.tradingview.com/markets/stocks-usa/market-movers-gainers/';

  return (
    <div
      className={'market-widget ' + (compact ? 'is-compact' : '')}
      data-feed-state={state}
    >
      <div className="market-widget-title">
        <span>
          {kind === 'indices'
            ? 'INDICES / INDICATIEVE PRIJZEN'
            : 'STIJGERS & DALERS / VS'}
        </span>
        {kind === 'indices' ? (
          <Activity size={18} />
        ) : (
          <ArrowUpRight size={18} />
        )}
      </div>
      <p className="widget-data-note">
        {kind === 'indices'
          ? 'S&P 500, Nasdaq 100 en Dow Jones volgen via CFD-referentieprijzen van FOREX.com. Deze kunnen afwijken van de officiële indexstand.'
          : 'Amerikaanse aandelen · vertraagde koersgegevens. Active = actief verhandeld, Gainers = stijgers, Losers = dalers.'}
      </p>
      <div
        ref={host}
        className="market-widget-embed"
        style={{
          height: kind === 'movers' ? (compact ? 380 : 420) : 360,
          width: '100%',
          minWidth: 0,
        }}
      />
      {state === 'loading' && (
        <output className="widget-status">Externe marktweergave laden…</output>
      )}
      {state === 'error' && (
        <div className="widget-status">
          <output>
            De marktweergave kon niet laden. Probeer opnieuw of bekijk de bron.
          </output>
          <button
            type="button"
            className="textlink"
            onClick={() => {
              setState('loading');
              setAttempt((value) => value + 1);
            }}
          >
            Opnieuw laden <ArrowRight size={16} />
          </button>
        </div>
      )}
      <noscript>
        <p className="widget-status">
          JavaScript is nodig voor de grafiek. Je kunt de marktgegevens ook bij
          de bron bekijken.
        </p>
      </noscript>
      <p className="widget-data-note">
        {kind === 'indices'
          ? 'SPX500 = S&P 500 · NAS100 = Nasdaq 100 · US30 = Dow Jones. Kies een regel en periode om de grafiek te bekijken.'
          : 'Kies een tab en aandeel. Scroll binnen de lijst voor alle vijf getoonde aandelen. Een D bij de koers betekent vertraagde data.'}{' '}
        De beschikbaarheid en actualiteit worden bepaald door de databron.
      </p>
      <a
        className="source-link"
        href={source}
        rel="noopener nofollow"
        target="_blank"
      >
        {kind === 'indices'
          ? 'Indexoverzicht op TradingView'
          : 'Alle Amerikaanse stijgers op TradingView'}{' '}
        <ArrowUpRight size={14} />
      </a>
    </div>
  );
}
export function UpcomingAgenda({ compact = false }: { compact?: boolean }) {
  return (
    <section className="hub-agenda" id={compact ? undefined : 'agenda'}>
      <MacroCalendar compact />
    </section>
  );
}
export function MarketMiniHub() {
  return (
    <section className="market-mini-hub" data-reveal>
      <div className="mini-hub-heading">
        <div>
          <span className="eyebrow">MARKTINFORMATIE</span>
          <h2>Indices, stijgers en dalers.</h2>
          <p>En de macro-agenda voor Nederland en de Verenigde Staten.</p>
        </div>
        <Link href="/markt" className="button">
          Bekijk alle marktinformatie <ArrowRight size={18} />
        </Link>
      </div>
      <div className="mini-hub-grid">
        <MarketWidget compact />
        <MarketWidget kind="movers" compact />
        <UpcomingAgenda compact />
      </div>
    </section>
  );
}
export function MarketHubOverview() {
  return (
    <>
      <nav className="market-hub-nav" aria-label="Onderdelen van de markthub">
        <a href="#indices">Indices</a>
        <a href="#bewegingen">Stijgers en dalers</a>
        <a href="#agenda">Macro-agenda</a>
        <a href="#valuta">Valuta</a>
      </nav>
      <div className="market-hub-grid">
        <section id="indices">
          <MarketWidget />
        </section>
        <section id="bewegingen">
          <MarketWidget kind="movers" />
        </section>
        <UpcomingAgenda />
      </div>
      <div className="market-context-strip">
        <span>WAT BETEKENEN DE CIJFERS?</span>
        <p>
          Een koersstijging zegt op zichzelf weinig over de oorzaak. Lees hoe
          rente, inflatie en economische groei de beurs kunnen beïnvloeden.
        </p>
        <Link href="/verdieping/markt-economie">
          Lees over markt en economie <ArrowRight size={17} />
        </Link>
      </div>
    </>
  );
}

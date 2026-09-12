'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, CalendarDays, Activity } from 'lucide-react';
import Link from './site-link';
import { policyDates, policySource } from './market-editorial';

export function MarketWidget({
  kind = 'indices',
  compact = false,
}: {
  kind?: 'indices' | 'movers';
  compact?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null),
    [state, setState] = useState('loading');
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let script: HTMLScriptElement | undefined,
      timer: ReturnType<typeof setTimeout> | undefined,
      alive = true,
      loaded = false;
    const watchedFrames = new Set<HTMLIFrameElement>();
    const frameLoaded = () => {
      if (alive) {
        loaded = true;
        setState('ready');
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        script = document.createElement('script');
        script.async = true;
        script.src =
          kind === 'indices'
            ? 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
            : 'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js';
        const common = {
          colorTheme: 'light',
          locale: 'nl',
          width: '100%',
          height: '100%',
          isTransparent: true,
        };
        script.textContent = JSON.stringify(
          kind === 'indices'
            ? {
                ...common,
                symbols: [
                  ['S&P 500 · dagslot', 'FRED:SP500|1D'],
                  ['Nasdaq 100 · dagslot', 'FRED:NDQ100|1D'],
                ],
                chartOnly: false,
                autosize: true,
                showVolume: false,
                hideDateRanges: false,
                hideMarketStatus: false,
                changeMode: 'price-and-percent',
                chartType: 'area',
                dateRanges: ['1m|1D', '12m|1D', '60m|1W'],
                lineWidth: 2,
              }
            : {
                ...common,
                exchange: 'US',
                showChart: false,
                dateRange: '12M',
                showSymbolLogo: true,
                showFloatingTooltip: false,
              },
        );
        script.onerror = () => {
          if (alive) setState('error');
        };
        element.appendChild(script);
        timer = setTimeout(() => {
          if (alive && !loaded) setState('error');
        }, 15000);
      },
      { rootMargin: '300px' },
    );
    const mutation = new MutationObserver(() => {
      element.querySelectorAll('iframe').forEach((frame) => {
        if (watchedFrames.has(frame)) return;
        watchedFrames.add(frame);
        frame.addEventListener('load', frameLoaded, { once: true });
      });
    });
    mutation.observe(element, { childList: true, subtree: true });
    observer.observe(element);
    return () => {
      alive = false;
      observer.disconnect();
      mutation.disconnect();
      clearTimeout(timer);
      script?.remove();
      watchedFrames.forEach((frame) =>
        frame.removeEventListener('load', frameLoaded),
      );
      element.querySelectorAll('iframe').forEach((frame) => frame.remove());
    };
  }, [kind]);
  return (
    <div className={'market-widget ' + (compact ? 'is-compact' : '')}>
      <div className="market-widget-title">
        <span>
          {kind === 'indices' ? 'INDICES / DAGGEGEVENS' : 'BEWEGINGEN / VS'}
        </span>
        {kind === 'indices' ? (
          <Activity size={18} />
        ) : (
          <ArrowUpRight size={18} />
        )}
      </div>
      <div
        ref={host}
        className="tradingview-widget-container"
        style={{ height: compact ? 300 : 360, width: '100%' }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: 'calc(100% - 28px)', width: '100%' }}
        />
        <div className="tradingview-widget-copyright">
          <a
            href={
              kind === 'indices'
                ? 'https://www.tradingview.com/markets/indices/'
                : 'https://www.tradingview.com/markets/stocks-usa/market-movers-gainers/'
            }
            rel="noopener nofollow"
            target="_blank"
          >
            <span className="blue-text">
              {kind === 'indices' ? 'Indices' : 'Market movers'}
            </span>
          </a>{' '}
          by TradingView
        </div>
      </div>
      {state === 'loading' && (
        <output className="widget-status">Marktgegevens laden…</output>
      )}
      {state === 'error' && (
        <output className="widget-status">
          De gegevens zijn hier niet bereikbaar. Open de bron via de link.
        </output>
      )}
      <p className="widget-data-note">
        {kind === 'indices'
          ? 'S&P 500 en Nasdaq 100: dagelijkse FRED-reeksen via TradingView. Kies 1 maand, 1 jaar of 5 jaar.'
          : 'Stijgers, dalers en actieve aandelen op de Amerikaanse markt. Vertraging en dekking verschillen per beurs.'}
      </p>
    </div>
  );
}
export function UpcomingAgenda({ compact = false }: { compact?: boolean }) {
  const [today, setToday] = useState('2026-09-12');
  useEffect(() => {
    const update = () => setToday(new Date().toISOString().slice(0, 10));
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);
  const future = policyDates.filter((item) => item.date >= today);
  return (
    <section className="hub-agenda" id={compact ? undefined : 'agenda'}>
      <div className="hub-block-heading">
        <CalendarDays size={19} />
        <span>OP DE AGENDA</span>
      </div>
      <h2>Wat komt eraan?</h2>
      {future.length ? (
        future.slice(0, compact ? 2 : 3).map((item) => (
          <a
            className="hub-agenda-item"
            href={policySource}
            key={item.date}
            target="_blank"
            rel="noreferrer"
          >
            <time dateTime={item.date}>
              <b>{item.date.slice(-2)}</b>
              {new Intl.DateTimeFormat('nl-NL', { month: 'short' }).format(
                new Date(item.date),
              )}
            </time>
            <div>
              <h3>Rentebesluit ECB</h3>
              <span>{item.place} · persconferentie</span>
            </div>
            <ArrowUpRight size={17} />
          </a>
        ))
      ) : (
        <p>Bekijk nieuwe vergaderdata bij de ECB.</p>
      )}
      <p className="hub-agenda-note">
        Beleidskalender · ECB. Afgelopen momenten verdwijnen uit dit overzicht.
      </p>
      <Link href="/markt#nieuws" className="textlink">
        Lees ook de marktcontext <ArrowRight size={17} />
      </Link>
    </section>
  );
}
export function MarketMiniHub() {
  return (
    <section className="market-mini-hub" data-reveal>
      <div className="mini-hub-heading">
        <div>
          <span className="eyebrow">EVEN UITZOOMEN / DE MARKT</span>
          <h2>
            De wereld achter
            <br />
            <em>je portefeuille.</em>
          </h2>
        </div>
        <Link href="/markt" className="button">
          Open de markthub <ArrowRight size={18} />
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
        <a href="#bewegingen">Bewegingen</a>
        <a href="#agenda">Agenda</a>
        <a href="#nieuws">Nieuws & context</a>
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
        <span>DAGELIJKS PERSPECTIEF</span>
        <p>
          Een beweging is een beginpunt. Kijk ook naar de periode, het bedrijf
          en je eigen horizon.
        </p>
        <Link href="/artikelen/verder-dan-de-koers">
          Begrijp wat een koers vertelt <ArrowRight size={17} />
        </Link>
      </div>
    </>
  );
}

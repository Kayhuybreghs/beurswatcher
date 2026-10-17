'use client';
import Link from './site-link';
import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { ChoiceGroup } from './choice-group';
import { Skeleton } from '@/components/ui/skeleton';
import { markets } from './data';
import { demoSeries, loadMarketFeed, demoFeed } from './market-data';
import { Chart } from './widget-chart';
import { Picker } from './widget-picker';
// The status region contains a retry button and needs an explicit live-region role.
/* oxlint-disable jsx-a11y/prefer-tag-over-role */

export function Market({ full = false }: { full?: boolean }) {
  const [chosen, setChosen] = useState('AEX'),
    [period, setPeriod] = useState('1D');
  const [feed, setFeed] = useState(demoFeed),
    [feedState, setFeedState] = useState('loading');
  useEffect(() => {
    let active = true;
    loadMarketFeed()
      .then((d) => {
        if (active) {
          setFeed(d);
          setFeedState('ready');
        }
      })
      .catch(() => {
        if (active) setFeedState('error');
      });
    return () => {
      active = false;
    };
  }, []);
  const m = feed.markets.find((m) => m.name === chosen) || feed.markets[0];
  const values = demoSeries(chosen, period);
  const times = Array.from({ length: 42 }, (_, i) =>
    period === '1D'
      ? `${9 + Math.floor((i * 510) / 41 / 60)}:${String(Math.round((i * 510) / 41) % 60).padStart(2, '0')}`
      : i === 0
        ? {
            '1W': '1 week geleden',
            '1M': '1 maand geleden',
            '1Y': '1 jaar geleden',
            '5Y': '5 jaar geleden',
          }[period] || 'Start'
        : i === 41
          ? 'Einde scenario'
          : 'Meetpunt ' + (i + 1),
  );
  return (
    <>
      <div className="market-grid">
        <div>
          <div className="chart-top">
            <Picker
              value={chosen}
              values={markets.map((m) => m.name)}
              onChange={setChosen}
              label="Kies een markt"
            />
            <ChoiceGroup
              label="Kies de periode van de voorbeeldgrafiek"
              value={period}
              onChange={setPeriod}
              variant="line"
              options={
                full ? ['1D', '1W', '1M', '1Y', '5Y'] : ['1D', '1W', '1M', '1Y']
              }
            />
          </div>
          <div className="quote">
            <strong>
              {m.value.toLocaleString('nl-NL', {
                minimumFractionDigits: 2,
                maximumFractionDigits: chosen === 'EUR/USD' ? 4 : 2,
              })}
            </strong>
            <em className={m.change < 0 ? 'down' : ''}>
              {m.change > 0 ? '+' : ''}
              {m.change.toFixed(2).replace('.', ',')}% vandaag
            </em>
          </div>
          <p className="subtle">
            Illustratieve koersreeks · Geen live marktgegevens
          </p>
          {feedState === 'loading' ? (
            <div className="chart-loading" aria-label="Marktoverzicht laden">
              <Skeleton className="chart-skeleton" />
            </div>
          ) : (
            <Chart values={values} labels={times} />
          )}
          {feedState === 'error' && (
            <div className="data-error" role="status">
              De gegevensbron is niet bereikbaar. Je ziet de voorbeeldset.
              <button
                onClick={() => {
                  setFeedState('loading');
                  loadMarketFeed(true)
                    .then((d) => {
                      setFeed(d);
                      setFeedState('ready');
                    })
                    .catch(() => setFeedState('error'));
                }}
              >
                Opnieuw proberen
              </button>
            </div>
          )}
        </div>
        <aside className="market-list">
          <div className="eyebrow">WERELDWIJD IN BEELD</div>
          {markets
            .filter((m) => m.name !== chosen)
            .slice(0, full ? 9 : 4)
            .map((m, i) => (
              <button key={m.name} onClick={() => setChosen(m.name)}>
                <span>
                  <b>{m.name}</b>
                  <small>
                    {
                      {
                        'S&P 500': 'Verenigde Staten',
                        NASDAQ: 'Technologie',
                        DAX: 'Duitsland',
                        Bitcoin: 'Digitale activa',
                        'EUR/USD': 'Valuta',
                        'Dow Jones': 'Verenigde Staten',
                        'Euro Stoxx': 'Europa',
                        Goud: 'Edelmetaal',
                        VIX: 'Volatiliteit',
                        AEX: 'Nederland',
                      }[m.name]
                    }
                  </small>
                </span>
                <span>
                  {m.value.toLocaleString('nl-NL')}
                  <em className={m.change < 0 ? 'down' : ''}>
                    {m.change > 0 ? '+' : ''}
                    {m.change}%
                  </em>
                </span>
                <svg viewBox="0 0 60 25" aria-hidden="true">
                  <path
                    d={`M0 20L8 15L14 ${i % 2 ? 20 : 10}L22 14L30 7L37 12L43 5L51 8L60 3`}
                    stroke={m.change < 0 ? '#b7494d' : '#278464'}
                    fill="none"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            ))}
          <Link className="textlink" href="/markt/indices">
            Alle indices <ArrowRight size={16} />
          </Link>
        </aside>
      </div>
      <div className="market-bottom">
        <span>
          <i className="green-dot" /> Marktbeeld <b>Voorbeeldscenario</b>
        </span>
        <span>
          Stijger <b>ASML</b> <em>+2,34%</em>
        </span>
        <span>
          Daler <b>Philips</b> <em className="down">−1,08%</em>
        </span>
        <Link href="/markt/macro">
          Deze week op de agenda <ArrowUpRight size={15} />
        </Link>
      </div>
    </>
  );
}

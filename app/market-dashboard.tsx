'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, RefreshCw, Globe } from 'lucide-react';
import Link from './site-link';
import { Newsletter, NumberField } from './widgets';
import { MarketHubOverview } from './market-hub';
import { newsItems, newsCheckedAt, uniqueNews } from './market-editorial';
import { fxSnapshot, fxCurrencies, type FxData } from './fx-data';
const date = (iso: string) =>
  new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Amsterdam',
  }).format(new Date(iso));
export function MarketDashboard() {
  const [fx, setFx] = useState<FxData>(fxSnapshot),
    [amount, setAmount] = useState(1000),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    fetch('/api/wisselkoersen')
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json() as Promise<FxData>;
      })
      .then((d: FxData) => {
        if (
          alive &&
          d.asOf &&
          fxCurrencies.every(
            (c) => Number.isFinite(d.rates?.[c]) && d.rates[c] > 0,
          )
        )
          setFx(d);
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);
  const stories = uniqueNews(newsItems);
  return (
    <>
      <header className="market-masthead market-hub-masthead">
        <div>
          <span className="eyebrow">BEURSWATCHER / MARKT</span>
          <h1>
            Jouw blik op de markt.
            <br />
            <em>Van beweging naar betekenis.</em>
          </h1>
        </div>
        <p>
          De verhalen, cijfers en momenten
          <br />
          die je helpen verder kijken.
        </p>
      </header>
      <MarketHubOverview />
      <section className="market-news-desk" id="nieuws">
        <div className="market-news-heading">
          <span className="eyebrow">DE REDACTIONELE SELECTIE</span>
          <span>{date(newsCheckedAt)} · geen live nieuwsfeed</span>
        </div>
        <div className="news-desk-grid">
          {stories.map((n, i) => (
            <article
              className={'news-desk-story news-story-' + i}
              key={n.eventId}
            >
              <div className="news-desk-category">
                <span>{n.category}</span>
                <span>0{i + 1}</span>
              </div>
              <h2>
                <Link href={n.url} target="_blank" rel="noreferrer">
                  {n.title}
                </Link>
              </h2>
              <p>{n.summary}</p>
              <div className="news-perspective">
                <span>OM BIJ STIL TE STAAN</span>
                <p>{n.context}</p>
              </div>
              <Link
                href={n.url}
                target="_blank"
                rel="noreferrer"
                className="news-source"
              >
                <span>
                  {n.source}
                  <time dateTime={n.publishedAt}>{date(n.publishedAt)}</time>
                </span>
                <ArrowUpRight size={20} />
              </Link>
            </article>
          ))}
        </div>
        <small className="news-curation-note">
          Eén verhaal per ontwikkeling. Eigen samenvattingen; lees het volledige
          bericht bij de bron. De duiding is algemene context van Beurswatcher.
        </small>
      </section>
      <section className="fx-section" id="valuta">
        <div className="fx-intro">
          <Globe size={23} />
          <span className="eyebrow">DE EURO BUITEN DE EUROZONE</span>
          <h2>Wat is je euro waard?</h2>
          <p>
            Reken een bedrag om met de dagelijkse referentiekoersen van de
            Europese Centrale Bank.
          </p>
          <NumberField
            label="Bedrag in euro’s"
            value={amount}
            set={setAmount}
          />
        </div>
        <div>
          <div className="fx-status">
            <span>
              <RefreshCw size={13} />
              {loading
                ? 'Koersen controleren…'
                : fx.mode === 'official'
                  ? 'Opgehaald bij de ECB'
                  : 'Laatst beschikbare ECB-snapshot'}
            </span>
            <time dateTime={fx.asOf}>Peildatum {date(fx.asOf)}</time>
          </div>
          <div className="fx-grid">
            {fxCurrencies.map((c) => (
              <div key={c}>
                <span>
                  {c}{' '}
                  <small>
                    {
                      {
                        USD: 'Amerikaanse dollar',
                        GBP: 'Britse pond',
                        CHF: 'Zwitserse frank',
                        JPY: 'Japanse yen',
                      }[c]
                    }
                  </small>
                </span>
                <strong>
                  {new Intl.NumberFormat('nl-NL', {
                    minimumFractionDigits: c === 'JPY' ? 0 : 2,
                    maximumFractionDigits: c === 'JPY' ? 0 : 2,
                  }).format(amount * fx.rates[c])}
                </strong>
                <small>
                  € 1 ={' '}
                  {new Intl.NumberFormat('nl-NL', {
                    maximumFractionDigits: 5,
                  }).format(fx.rates[c])}{' '}
                  {c}
                </small>
              </div>
            ))}
          </div>
          <p className="fx-source">
            Bron:{' '}
            <Link
              href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html"
              target="_blank"
              rel="noreferrer"
            >
              Europese Centrale Bank ↗
            </Link>
            . Referentiekoersen zijn geen transactiekoersen; kosten en spreads
            zijn niet meegerekend.
          </p>
        </div>
      </section>
      <section className="market-next">
        <div>
          <span className="eyebrow">MAAK HET PERSOONLIJK CONCREET</span>
          <h2>
            Wat verandert een ander
            <br />
            rendement aan jouw plan?
          </h2>
        </div>
        <Link className="button yellow" href="/tools/rendement">
          Onderzoek je scenario <ArrowRight size={18} />
        </Link>
      </section>
      <Newsletter context="market" variant="compact" />
    </>
  );
}

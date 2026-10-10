'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, RefreshCw, Globe } from 'lucide-react';
import Link from './site-link';
import { Newsletter, NumberField } from './widgets';
import { MarketHubOverview } from './market-hub';
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
  return (
    <>
      <header className="market-masthead market-hub-masthead">
        <div>
          <span className="eyebrow">BEURSWATCHER / MARKT</span>
          <h1>
            Wat gebeurt er op de beurs?
            <br />
            <em>Bekijk de cijfers.</em>
          </h1>
        </div>
        <p>
          Volg indices, bekijk Amerikaanse stijgers en dalers en controleer de
          macro-agenda voor Nederland en de Verenigde Staten. Bron en peildatum
          staan bij de gegevens.
        </p>
      </header>
      <MarketHubOverview />
      <section className="fx-section" id="valuta">
        <div className="fx-intro">
          <Globe size={23} />
          <span className="eyebrow">VALUTA OMREKENEN</span>
          <h2>Hoeveel krijg je voor je euro’s?</h2>
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
                  : 'Opgeslagen ECB-koersen'}
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
            . Dit zijn referentiekoersen. Je bank of wisselkantoor kan een
            andere koers gebruiken en kosten rekenen.
          </p>
        </div>
      </section>
      <section className="market-next">
        <div>
          <span className="eyebrow">ZELF EEN SCENARIO BEREKENEN</span>
          <h2>
            Wat kan je inleg
            <br />
            over tien of twintig jaar waard zijn?
          </h2>
        </div>
        <Link className="button yellow" href="/tools/rendement">
          Open de rendementcalculator <ArrowRight size={18} />
        </Link>
      </section>
      <Newsletter context="market" variant="compact" />
    </>
  );
}

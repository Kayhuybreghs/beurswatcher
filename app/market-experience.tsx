'use client';
import Link from './site-link';
import { MacroPage } from './macro-calendar';
import { MarketDashboard as MarketHub } from './market-dashboard';
import { InstagramCTA } from './brand';
import { articles } from './data';
import { ArticleCard, Market, Calendar } from './widgets';
import { NextSteps } from './journeys';
import { marketNotice } from './market-data';

export function MarketExperience({ sub }: { sub?: string }) {
  if (!sub) return <MarketHub />;
  if (sub === 'macro') return <MacroPage />;
  const agenda = sub === 'macro' || sub === 'earnings';
  return (
    <>
      <div className="market-heading">
        <div>
          <p className="eyebrow">BEURSWATCHER / MARKT</p>
          <h1>
            {sub === 'macro'
              ? 'Macro-agenda.'
              : sub === 'earnings'
                ? 'Bedrijfsresultaten: voorbeeldagenda.'
                : 'Beursindices.'}
          </h1>
        </div>
        <span className="data-status">{marketNotice}</span>
      </div>
      <div className="market-navigation">
        {[
          ['', 'Overzicht'],
          ['indices', 'Indices'],
          ['macro', 'Macro-agenda'],
          ['earnings', 'Bedrijfscijfers (voorbeeld)'],
        ].map(([s, n]) => (
          <Link
            key={s}
            href={
              s === 'indices' ? '/markt#indices' : '/markt' + (s ? '/' + s : '')
            }
            aria-current={(sub || '') === s ? 'page' : undefined}
          >
            {n}
          </Link>
        ))}
      </div>
      {agenda ? (
        <div className="agenda-surface">
          <div className="agenda-explainer">
            <span className="eyebrow">
              {sub === 'macro' ? 'ECONOMISCHE AGENDA' : 'BEDRIJFSRESULTATEN'}
            </span>
            <p>
              {sub === 'macro'
                ? 'Een cijfer komt nooit alleen. Bekijk de vorige waarde en de verwachting voordat je een koersreactie interpreteert.'
                : 'Deze agenda toont voorbeeldgegevens, geen actuele publicatiedata. Bij echte bedrijfsresultaten zijn naast winst ook omzet, marges, kasstroom en verwachtingen relevant.'}
            </p>
          </div>
          <Calendar kind={sub} full />
        </div>
      ) : sub === 'marktupdate' ? (
        <div className="editorial-feed">
          {articles.slice(0, 4).map((a) => (
            <ArticleCard article={a} key={a.slug} />
          ))}
        </div>
      ) : (
        <div className="market-surface">
          <Market full />
        </div>
      )}
      <NextSteps
        topic={sub === 'earnings' ? 'Aandelen' : 'Macro'}
        from="market"
      />
      <InstagramCTA context="market" />
    </>
  );
}

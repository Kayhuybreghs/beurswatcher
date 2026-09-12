/* Local editorial images use explicit layout dimensions; no image optimization service is configured. */
/* oxlint-disable next/no-img-element */
'use client';
import Link from './site-link';
import { ScenarioTool } from './scenario-tools';
import { ToolCatalog } from './tool-catalog';
import { PartnerPages } from './partner-pages';
import { MarketHub } from './platform-pages';
import { CompareResult } from './compare-result';
import { ToolVisual, useVisualDeck } from './tool-visual';
import { Slider } from '@/components/ui/slider';
import { InstagramCTA } from './brand';
import { useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Pause,
  Play,
  ArrowLeft,
} from 'lucide-react';
import { articles, markets, toolItems, futureValue } from './data';
import {
  Chart,
  eur,
  ArticleCard,
  Newsletter,
  Calculator,
  NumberField,
  Market,
  Calendar,
} from './widgets';
import { AnimatedNumber } from './motion';
import { NextSteps } from './journeys';
import { toolTopics } from './journey-data';
import { marketNotice } from './market-data';
import { requiredMonthly, netOfFees, downloadRows } from './calculations';
export function MarketTicker() {
  const [paused, setPaused] = useState(false);
  const group = (copy: boolean) => (
    <div className="ticker-track" aria-hidden={copy || undefined}>
      {markets.slice(0, 6).map((m) => (
        <span className="ticker-item" key={m.name}>
          <b>{m.name.toUpperCase()}</b>
          <span>
            {m.value.toLocaleString('nl-NL', {
              minimumFractionDigits: 2,
              maximumFractionDigits: m.name === 'EUR/USD' ? 4 : 2,
            })}
          </span>
          <em className={m.change < 0 ? 'down' : ''}>
            {m.change > 0 ? '+' : ''}
            {m.change.toFixed(2).replace('.', ',')}%
          </em>
        </span>
      ))}
    </div>
  );
  return (
    <div className={'ticker-v2 ' + (paused ? 'paused' : '')}>
      <span className="ticker-status">VOORBEELDKOERSEN</span>
      <div className="ticker-window">
        <div className="ticker-belt">
          {group(false)}
          {group(true)}
        </div>
      </div>
      <button
        aria-label={paused ? 'Koersenbalk afspelen' : 'Koersenbalk pauzeren'}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
      </button>
    </div>
  );
}
export function ToolShelf({ limit }: { limit?: number }) {
  const { root, active, events } = useVisualDeck();
  return (
    <div className="tool-shelf" ref={root}>
      {toolItems.slice(0, limit).map((t, i) => (
        <Link
          className="tool-card"
          href={'/tools/' + t.slug}
          key={t.slug}
          {...events(t.slug)}
        >
          <div className="shelf-top">
            <span>0{i + 1}</span>
            <span>GRATIS TOOL</span>
            <ArrowUpRight size={20} />
          </div>
          <h3>{t.title}</h3>
          <p>{t.text}</p>
          <ToolVisual slug={t.slug} active={active === t.slug} />
          <span className="shelf-action">
            Onderzoek jouw scenario <ArrowRight size={16} />
          </span>
        </Link>
      ))}
    </div>
  );
}
function ExtendedCalculator({ slug }: { slug: string }) {
  const costs = slug === 'etf-kosten';
  const [initial, setInitial] = useState(10000),
    [monthly, setMonthly] = useState(250),
    [years, setYears] = useState(20),
    [rate, setRate] = useState(6),
    [feeA, setFeeA] = useState(0.15),
    [feeB, setFeeB] = useState(1),
    [target, setTarget] = useState(100000);
  const contribution = requiredMonthly(target, initial, rate, years);
  const values = Array.from({ length: years + 1 }, (_, y) =>
    futureValue(
      initial,
      costs ? monthly : contribution,
      costs ? netOfFees(rate, feeA) : rate,
      y,
    ),
  );
  const second = Array.from({ length: years + 1 }, (_, y) =>
    costs
      ? futureValue(initial, monthly, netOfFees(rate, feeB), y)
      : initial + contribution * y * 12,
  );
  const result = costs ? values.at(-1)! - second.at(-1)! : contribution;
  return (
    <>
      <div className="calculator">
        <div className="calc-inputs" id="invoer">
          <h2>Jouw uitgangspunten</h2>
          <p className="input-guide">
            Pas een bedrag aan. Je uitkomst rekent direct mee.
          </p>
          <NumberField
            label="Startkapitaal (€)"
            value={initial}
            set={setInitial}
          />
          {costs ? (
            <NumberField
              label="Maandelijkse inleg (€)"
              value={monthly}
              set={setMonthly}
            />
          ) : (
            <NumberField
              label="Gewenst eindvermogen (€)"
              value={target}
              set={setTarget}
            />
          )}
          <NumberField
            label="Looptijd (jaren)"
            value={years}
            set={(v) => setYears(Math.round(v))}
            min={1}
            max={50}
            step={1}
          />
          <Slider
            min={1}
            max={50}
            step={1}
            value={[years]}
            onValueChange={(v) => setYears(Array.isArray(v) ? v[0] : v)}
            aria-label="Looptijd in jaren"
          />
          <div className="range-labels">
            <span>1 jaar</span>
            <span>50 jaar</span>
          </div>
          <NumberField
            label="Verondersteld jaarrendement (%)"
            value={rate}
            set={setRate}
            min={-30}
            max={30}
            step={0.1}
          />
          {costs && (
            <>
              <NumberField
                label="Jaarlijkse fondskosten A (%)"
                value={feeA}
                set={setFeeA}
                max={5}
                step={0.05}
              />
              <NumberField
                label="Jaarlijkse fondskosten B (%)"
                value={feeB}
                set={setFeeB}
                max={5}
                step={0.05}
              />
            </>
          )}
        </div>
        <div className="calc-result" id="uitkomst">
          <p className="eyebrow">
            {costs ? 'HET EFFECT VAN KOSTEN' : 'JOUW DOEL, TERUGGEREKEND'}
          </p>
          <strong className="result-number">
            <AnimatedNumber value={result} format={eur} />
          </strong>
          <p>
            {costs
              ? `Verschil in eindvermogen na ${years} jaar`
              : 'Benodigde inleg per maand, afgerond'}
          </p>
          <Chart
            values={values}
            second={second}
            labels={values.map((_, i) => `${i} jaar`)}
          />
          <div className="chart-legend">
            <span>
              <i /> {costs ? `Fonds A · ${feeA}% kosten` : 'Vermogensgroei'}
            </span>
            <span>
              <i /> {costs ? `Fonds B · ${feeB}% kosten` : 'Eigen inleg'}
            </span>
          </div>
          <div className="result-breakdown">
            <span>
              {costs ? 'Eindvermogen fonds A' : 'Berekend eindvermogen'}
              <b>{eur(values.at(-1)!)}</b>
            </span>
            <span>
              {costs ? 'Eindvermogen fonds B' : 'Totale eigen inleg'}
              <b>{eur(second.at(-1)!)}</b>
            </span>
          </div>
          <p className="subtle">
            {costs
              ? 'Twee identieke rendementsscenario’s met verschillende jaarlijkse kosten.'
              : 'Gelijkblijvende maandelijkse inleg aan het einde van de maand. Rendement is onzeker.'}
          </p>
          <CompareResult
            value={result}
            label={costs ? 'Verschil door kosten' : 'Benodigde maandinleg'}
            assumptions={`${eur(initial)} start · ${years} jaar · ${rate}% rendement · ${costs ? eur(monthly) + ' p/m · kosten ' + feeA + '% / ' + feeB + '%' : 'doel ' + eur(target)}`}
          />
          <button
            className="textlink"
            onClick={() =>
              downloadRows(slug, [
                ['Uitgangspunt', 'Waarde'],
                ['Startkapitaal', initial],
                ['Looptijd (jaren)', years],
                ['Jaarrendement (%)', rate],
                ...(costs
                  ? [
                      ['Maandelijkse inleg', monthly],
                      ['Fondskosten A (%)', feeA],
                      ['Fondskosten B (%)', feeB],
                    ]
                  : [
                      ['Gewenst eindvermogen', target],
                      ['Berekende maandinleg', contribution.toFixed(2)],
                    ]),
                [],
                [
                  'Jaar',
                  costs ? 'Fonds A' : 'Vermogen',
                  costs ? 'Fonds B' : 'Inleg',
                ],
                ...values.map((v, i) => [
                  i,
                  v.toFixed(2),
                  second[i].toFixed(2),
                ]),
              ])
            }
          >
            Download berekening <ArrowDown size={16} />
          </button>
        </div>
      </div>
      <div className="methodology reading">
        <h2>Zo lezen we dit scenario</h2>
        <p>
          {costs
            ? 'We houden het brutorendement gelijk. Jaarlijkse fondskosten worden multiplicatief van het vermogen afgetrokken; dat netto jaarrendement rekenen we om naar maandrente. Een klein kostenverschil telt elk jaar opnieuw mee. Transactiekosten, belastingen en andere productverschillen zijn niet verwerkt.'
            : 'We berekenen hoeveel inleg aan het einde van iedere maand nodig is om het gekozen eindbedrag te bereiken. Als het startkapitaal bij dit rendement al voldoende is, wordt de benodigde inleg nul. Het doel is een nominaal bedrag: toekomstige inflatie, belastingen en kosten zijn niet verwerkt.'}
        </p>
        <p>
          Een constant rendement maakt scenario’s vergelijkbaar. De
          werkelijkheid kent schommelingen en verliezen. Pas je aannames aan om
          meerdere uitkomsten te bekijken.
        </p>
      </div>
    </>
  );
}
export function ToolsExperience({ slug }: { slug?: string }) {
  const t = toolItems.find((t) => t.slug === slug);
  if (t)
    return (
      <div className="tool-workspace">
        <div className="workbench-heading">
          <Link className="textlink" href="/tools">
            <ArrowLeft size={16} /> Alle gratis tools
          </Link>
          <span className="free-label">GRATIS / GEEN ACCOUNT NODIG</span>
          <h1>
            {t.title}
            <span className="dot">.</span>
          </h1>
          <p>{t.text}</p>
          <div className="workbench-shortcuts">
            <a href="#invoer">01 Invoer aanpassen</a>
            <a href="#uitkomst">02 Naar je uitkomst ↓</a>
          </div>
        </div>
        {['inflatie', 'dividend', 'lump-sum-dca'].includes(slug!) ? (
          <ScenarioTool slug={slug!} />
        ) : ['etf-kosten', 'doelvermogen'].includes(slug!) ? (
          <ExtendedCalculator slug={slug!} />
        ) : (
          <Calculator slug={slug!} />
        )}
        <div className="tools-related">
          <p>Een andere kant van je scenario onderzoeken?</p>
          <Link
            href={
              '/tools/' +
              (slug === 'inflatie'
                ? 'rendement'
                : slug === 'etf-kosten'
                  ? 'lump-sum-dca'
                  : slug === 'doelvermogen'
                    ? 'inflatie'
                    : slug === 'dividend'
                      ? 'etf-kosten'
                      : 'doelvermogen')
            }
          >
            Open een aansluitende rekentool <ArrowRight size={16} />
          </Link>
        </div>
        <NextSteps topic={toolTopics[slug!]} />
        <Newsletter context="tools" variant="compact" />
      </div>
    );
  return (
    <>
      <ToolCatalog />
      <Newsletter context="tools" variant="compact" />
    </>
  );
}
export function PartnersExperience({ slug }: { slug?: string }) {
  return <PartnerPages slug={slug} />;
}
export function MarketExperience({ sub }: { sub?: string }) {
  if (!sub) return <MarketHub />;
  const agenda = sub === 'macro' || sub === 'earnings';
  return (
    <>
      <div className="market-heading">
        <div>
          <p className="eyebrow">BEURS WATCHER / MARKT</p>
          <h1>
            {sub === 'macro'
              ? 'De week vooruit.'
              : sub === 'earnings'
                ? 'Achter de resultaten.'
                : 'De beurs in perspectief.'}
          </h1>
        </div>
        <span className="data-status">{marketNotice}</span>
      </div>
      <div className="market-navigation">
        {[
          ['', 'Overzicht'],
          ['indices', 'Indices'],
          ['macro', 'Macro-agenda'],
          ['earnings', 'Earnings'],
          ['marktupdate', 'Marktupdate'],
        ].map(([s, n]) => (
          <Link
            key={s}
            href={'/markt' + (s ? '/' + s : '')}
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
                : 'Kijk naast de winst per aandeel ook naar de vooruitzichten, marges en kasstroom.'}
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

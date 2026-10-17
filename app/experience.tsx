'use client';
import Link from './site-link';
import { ToolReading } from './tool-reading';
import { ScenarioTool } from './scenario-tools';
import { ToolCatalog } from './tool-catalog';
import { CompareResult } from './compare-result';

import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { ArrowRight, ArrowDown, ArrowLeft } from 'lucide-react';
import { toolItems, futureValue } from './data';
import { Chart } from './widget-chart';
import { eur } from './money-format';
import { Newsletter } from './newsletter';
import { Calculator } from './widget-calculator';
import { NumberField } from './number-field';
import { AnimatedNumber } from './motion';
import { requiredMonthly, netOfFees, downloadRows } from './calculations';
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
          <h2>Vul je bedragen en aannames in</h2>
          <p className="input-guide">
            Na elke wijziging wordt de uitkomst opnieuw berekend.
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
            {costs ? 'VERSCHIL DOOR FONDSKOSTEN' : 'BENODIGDE MAANDINLEG'}
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
        <h2>Zo werkt deze berekening</h2>
        <p>
          {costs
            ? 'Beide scenario’s gebruiken hetzelfde rendement vóór kosten. Daarin verwerken we het gekozen jaarlijkse kostenpercentage. Het rendement na kosten rekenen we om naar een maandpercentage. Een kostenverschil werkt zo ieder jaar opnieuw door. Transactiekosten, belastingen en andere productverschillen zijn niet verwerkt.'
            : 'We berekenen hoeveel inleg aan het einde van iedere maand nodig is om het gekozen eindbedrag te bereiken. Als je startbedrag binnen deze aannames al tot je doelbedrag groeit, is de benodigde inleg nul. Het doel is een bedrag in toekomstige euro’s. Inflatie, belastingen en kosten zijn niet verwerkt.'}
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
  const relatedSlug =
    slug === 'inflatie'
      ? 'rendement'
      : slug === 'etf-kosten'
        ? 'lump-sum-dca'
        : slug === 'doelvermogen'
          ? 'inflatie'
          : slug === 'dividend'
            ? 'etf-kosten'
            : 'doelvermogen';
  const relatedTool = toolItems.find((item) => item.slug === relatedSlug)!;
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
            <a href="#uitleg">03 Uitleg & veelgestelde vragen</a>
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
          <p>{relatedTool.text}</p>
          <Link href={'/tools/' + relatedSlug}>
            Open {relatedTool.title.toLowerCase()} <ArrowRight size={16} />
          </Link>
        </div>
        <ToolReading tool={slug!} />
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

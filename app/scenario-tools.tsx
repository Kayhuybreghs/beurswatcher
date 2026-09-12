'use client';
import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  TrendingDown,
  Coins,
  GitCompareArrows,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Chart, NumberField, eur } from './widgets';
import { CompareResult } from './compare-result';
import { AnimatedNumber } from './motion';
import { downloadRows } from './calculations';
import {
  inflationScenario,
  dividendScenario,
  entryScenario,
  type MarketPath,
} from './scenario-math';
export function ScenarioTool({ slug }: { slug: string }) {
  const [amount, setAmount] = useState(10000),
    [years, setYears] = useState(20),
    [inflation, setInflation] = useState(2.5),
    [growth, setGrowth] = useState(4),
    [yieldRate, setYield] = useState(3),
    [months, setMonths] = useState(12),
    [cashRate, setCash] = useState(0),
    [path, setPath] = useState<MarketPath>('steady');
  const isInflation = slug === 'inflatie',
    isDividend = slug === 'dividend';
  function changeYears(value: number) {
    const year = Math.round(value);
    setYears(year);
    setMonths((current) => Math.min(current, year * 12));
  }
  const inf = inflationScenario(amount, inflation, years),
    div = dividendScenario(amount, growth, yieldRate, years),
    entry = entryScenario(amount, growth, years, months, cashRate, path);
  const values = isInflation
    ? inf.map((x) => x.nominal)
    : isDividend
      ? div.map((x) => x.reinvested)
      : entry.map((x) => x.lump);
  const second = isInflation
    ? inf.map((x) => x.real)
    : isDividend
      ? div.map((x) => x.capital + x.cash)
      : entry.map((x) => x.staged);
  const result = isInflation
    ? inf.at(-1)!.real
    : isDividend
      ? div.at(-1)!.reinvested
      : entry.at(-1)!.lump - entry.at(-1)!.staged;
  const labels = values.map((_, i) =>
    isInflation || isDividend ? `${i} jaar` : `${i} mnd`,
  );
  const explanation = isInflation
    ? 'We delen het nominale bedrag door de samengestelde inflatiefactor. De koopkracht wordt uitgedrukt in euro’s van nu. Het bedrag ontvangt in dit model geen rente of rendement.'
    : isDividend
      ? 'Dividend wordt jaarlijks berekend over het vermogen aan het begin van het jaar. Koersgroei is exclusief dividend. Bij herbeleggen wordt de uitkering aan het einde van het jaar opnieuw ingelegd; zonder herbeleggen blijft ontvangen dividend als renteloos geld meetellen. Beide scenario’s hebben hetzelfde startbedrag.'
      : 'Het volledige bedrag is op dag één beschikbaar. Bij gespreid instappen beleg je gelijke delen aan het begin van iedere maand. Nog niet belegd geld ontvangt de gekozen spaarrente. Ontvangen spaarrente blijft op de spaarrekening staan, ook na de instapperiode. Beide routes volgen dezelfde koersreeks. De drie koerspaden eindigen bij dezelfde marktwaarde; de timing van een daling verschilt. De daling is een illustratief scenario van 25%, geen voorspelling.';
  return (
    <>
      <div className={'calculator scenario-app scenario-' + slug}>
        <div className="calc-inputs" id="invoer">
          <h2>Maak het jouw scenario</h2>
          <NumberField
            label="Beschikbaar bedrag (€)"
            value={amount}
            set={setAmount}
          />
          <NumberField
            label="Looptijd (jaren)"
            value={years}
            set={changeYears}
            min={1}
            max={40}
            step={1}
          />
          <Slider
            aria-label="Looptijd in jaren"
            min={1}
            max={40}
            step={1}
            value={[years]}
            onValueChange={(v) => changeYears(Array.isArray(v) ? v[0] : v)}
          />
          <div className="range-labels">
            <span>1 jaar</span>
            <span>40 jaar</span>
          </div>
          {isInflation ? (
            <NumberField
              label="Jaarlijkse inflatie (%)"
              value={inflation}
              set={setInflation}
              min={-5}
              max={20}
              step={0.1}
            />
          ) : (
            <NumberField
              label={
                isDividend
                  ? 'Jaarlijkse koersgroei, exclusief dividend (%)'
                  : 'Gemiddeld jaarrendement markt (%)'
              }
              value={growth}
              set={setGrowth}
              min={-20}
              max={20}
              step={0.1}
            />
          )}
          {isDividend && (
            <NumberField
              label="Jaarlijks dividendrendement (%)"
              value={yieldRate}
              set={setYield}
              max={15}
              step={0.1}
            />
          )}
          {!isDividend && !isInflation && (
            <>
              <NumberField
                label="Inleggen verspreid over (maanden)"
                value={months}
                set={(v) => setMonths(Math.round(v))}
                min={1}
                max={Math.min(24, years * 12)}
                step={1}
              />
              <NumberField
                label="Spaarrente op wachtend geld (%)"
                value={cashRate}
                set={setCash}
                max={10}
                step={0.1}
              />
            </>
          )}
          <p className="input-note">
            Verander één aanname en kijk wat er verschuift.
          </p>
        </div>
        <div className="calc-result" id="uitkomst">
          <span className="scenario-icon">
            {isInflation ? (
              <TrendingDown />
            ) : isDividend ? (
              <Coins />
            ) : (
              <GitCompareArrows />
            )}
          </span>
          <p className="eyebrow">
            {isInflation
              ? 'DIT BLIJFT ER OVER AAN KOOPKRACHT'
              : isDividend
                ? 'EINDVERMOGEN MET HERBELEGGEN'
                : 'VERSCHIL: INEENS MIN GESPREID'}
          </p>
          <strong className="result-number">
            <AnimatedNumber value={result} format={eur} />
          </strong>
          <p>
            {isInflation
              ? `Van ${eur(amount)} na ${years} jaar`
              : isDividend
                ? `Na ${years} jaar, inclusief herbelegd dividend`
                : Math.abs(result) < 0.01
                  ? 'Beide routes eindigen gelijk in dit scenario.'
                  : result > 0
                    ? 'Ineens instappen eindigt hoger in dit scenario.'
                    : 'Gespreid instappen eindigt hoger in dit scenario.'}
          </p>
          {!isInflation && !isDividend && (
            <Tabs
              value={path}
              onValueChange={(v) => setPath(v as MarketPath)}
              className="scenario-tabs"
            >
              <TabsList aria-label="Kies een koerspad">
                <TabsTrigger value="steady">Gelijkmatig</TabsTrigger>
                <TabsTrigger value="early-drop">Vroege daling</TabsTrigger>
                <TabsTrigger value="late-drop">Late daling</TabsTrigger>
              </TabsList>
            </Tabs>
          )}
          <Chart values={values} second={second} labels={labels} />
          <div className="chart-legend">
            <span>
              <i />
              {isInflation
                ? 'Nominaal bedrag'
                : isDividend
                  ? 'Herbeleggen'
                  : 'Ineens beleggen'}
            </span>
            <span>
              <i />
              {isInflation
                ? 'Koopkracht'
                : isDividend
                  ? 'Dividend apart houden'
                  : 'Gespreid + resterend geld'}
            </span>
          </div>
          <div className="result-breakdown">
            <span>
              {isInflation
                ? 'Nodig voor dezelfde koopkracht'
                : isDividend
                  ? 'Zonder herbeleggen, inclusief dividend'
                  : 'Eindvermogen ineens'}
              <b>
                {eur(
                  isInflation
                    ? inf.at(-1)!.required
                    : isDividend
                      ? second.at(-1)!
                      : values.at(-1)!,
                )}
              </b>
            </span>
            <span>
              {isInflation
                ? 'Verandering in koopkracht'
                : isDividend
                  ? 'Effect van herbeleggen'
                  : 'Eindvermogen gespreid'}
              <b>
                {eur(
                  isInflation
                    ? result - amount
                    : isDividend
                      ? result - second.at(-1)!
                      : second.at(-1)!,
                )}
              </b>
            </span>
          </div>
          <CompareResult
            value={result}
            label={
              isInflation
                ? 'Koopkracht'
                : isDividend
                  ? 'Met herbeleggen'
                  : 'Verschil tussen instaproutes'
            }
            assumptions={`${eur(amount)} start · ${years} jaar · ${isInflation ? inflation + '% inflatie' : isDividend ? growth + '% groei + ' + yieldRate + '% dividend' : growth + '% markt · ' + months + ' mnd spreiden · ' + cashRate + '% spaarrente · ' + { steady: 'gelijkmatig', 'early-drop': 'vroege daling', 'late-drop': 'late daling' }[path]}`}
          />
          <button
            className="textlink"
            onClick={() =>
              downloadRows(slug, [
                ['Aanname', 'Waarde'],
                ['Startbedrag', amount],
                ['Jaren', years],
                ...(isInflation
                  ? [['Inflatie (%)', inflation]]
                  : isDividend
                    ? [
                        ['Koersgroei (%)', growth],
                        ['Dividend (%)', yieldRate],
                      ]
                    : [
                        ['Jaarrendement (%)', growth],
                        ['Spreiding (maanden)', Math.min(months, years * 12)],
                        ['Spaarrente (%)', cashRate],
                        ['Koerspad', path],
                      ]),
                [],
                ['Periode', 'Scenario A', 'Scenario B'],
                ...values.map((v, i) => [
                  labels[i],
                  v.toFixed(2),
                  second[i].toFixed(2),
                ]),
                [],
                ['Model', explanation],
              ])
            }
          >
            Download jouw scenario <ArrowDown size={17} />
          </button>
        </div>
      </div>
      <div className="scenario-reading">
        <div>
          <span className="eyebrow">WAT ZEGT DIT?</span>
          <h2>
            {isInflation
              ? 'Hetzelfde bedrag koopt niet altijd hetzelfde.'
              : isDividend
                ? 'Herbeleggen geeft uitkeringen meer tijd.'
                : 'Het pad telt, niet alleen het eindpunt.'}
          </h2>
        </div>
        <div>
          <p>{explanation}</p>
          <p>
            Kosten en belastingen zijn niet verwerkt. In de werkelijkheid
            veranderen rendementen, inflatie en uitkeringen. Vergelijk aannames;
            de uitkomst is geen persoonlijk advies.
          </p>
          <span className="textlink">
            Van uitkomst naar afweging <ArrowRight size={17} />
          </span>
        </div>
      </div>
    </>
  );
}

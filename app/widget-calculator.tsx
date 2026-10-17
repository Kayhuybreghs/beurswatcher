'use client';
import Link from './site-link';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Download } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { CompareResult } from './compare-result';
import { futureValue, boxTax, taxSource } from './data';
import { AnimatedNumber } from './motion';
import { purchasingPower, taxConfig, downloadRows } from './calculations';
import { Chart } from './widget-chart';
import { eur } from './money-format';
import { NumberField } from './number-field';

export function Calculator({ slug }: { slug: string }) {
  const [initial, setInitial] = useState(10000),
    [monthly, setMonthly] = useState(250),
    [rate, setRate] = useState(6),
    [years, setYears] = useState(20),
    [mortgage, setMortgage] = useState(3.5),
    [savings, setSavings] = useState(25000),
    [investments, setInvestments] = useState(100000),
    [debt, setDebt] = useState(0),
    [partner, setPartner] = useState(false),
    [inflation, setInflation] = useState(2),
    [taxDrag, setTaxDrag] = useState(0);
  const tax = boxTax(savings, investments, debt, partner),
    box = slug === 'box-3',
    compare = slug === 'aflossen-of-beleggen',
    compound = slug === 'compound-interest',
    contribution = compound ? 0 : monthly,
    values = Array.from({ length: years + 1 }, (_, y) =>
      futureValue(
        initial,
        compare ? 0 : contribution,
        rate - (compare ? taxDrag : 0),
        y,
      ),
    ),
    second = Array.from({ length: years + 1 }, (_, y) =>
      compare
        ? initial * Math.pow(1 + mortgage / 100, y)
        : initial + contribution * y * 12,
    ),
    total = values.at(-1)!,
    paid = compare || compound ? initial : initial + monthly * years * 12;
  function download() {
    downloadRows(
      slug + '-scenario',
      box
        ? [
            ['Uitgangspunt', 'Waarde'],
            ['Belastingjaar', taxConfig.year],
            ['Spaargeld', savings],
            ['Beleggingen', investments],
            ['Schulden', debt],
            ['Fiscale partner', partner ? 'Ja' : 'Nee'],
            ['Heffingsvrij vermogen', tax.exempt],
            ['Belastingtarief (%)', taxConfig.taxRate * 100],
            ['Indicatie belasting', tax.tax.toFixed(2)],
            ['Bron', taxSource],
            ['Status', taxConfig.status],
          ]
        : [
            ['Uitgangspunt', 'Waarde'],
            ['Startkapitaal', initial],
            ['Maandelijkse inleg', compare ? 0 : contribution],
            ['Jaarrendement (%)', rate],
            ['Looptijd (jaren)', years],
            ...(compare
              ? [
                  ['Veronderstelde belastingdruk (%)', taxDrag],
                  ['Netto hypotheekrente (%)', mortgage],
                ]
              : [['Inflatie (%)', inflation]]),
            [],
            [
              'Jaar',
              'Beleggingsscenario',
              compare ? 'Aflossingsscenario' : 'Eigen inleg',
              ...(compare ? [] : ['Koopkracht in euro’s van nu']),
            ],
            ...values.map((v, i) => [
              i,
              v.toFixed(2),
              second[i].toFixed(2),
              ...(compare ? [] : [purchasingPower(v, inflation, i).toFixed(2)]),
            ]),
            [],
            [
              'Toelichting',
              'Rekenvoorbeeld met constant rendement; geen voorspelling. Zie de uitleg op de website.',
            ],
          ],
    );
  }
  return (
    <>
      <div className="calculator">
        <div className="calc-inputs" id="invoer">
          <h2>Vul je bedragen en aannames in</h2>
          {box ? (
            <>
              <NumberField
                label="Bank- en spaartegoeden (€)"
                value={savings}
                set={setSavings}
              />
              <NumberField
                label="Beleggingen en overige bezittingen (€)"
                value={investments}
                set={setInvestments}
              />
              <NumberField
                label="Schulden in box 3 (€)"
                value={debt}
                set={setDebt}
              />
              <label className="consent" htmlFor="box-fiscale-partner">
                <Checkbox
                  id="box-fiscale-partner"
                  checked={partner}
                  onCheckedChange={(v) => setPartner(Boolean(v))}
                />
                Het vermogen is van mij en mijn fiscale partner samen
              </label>
              <p className="subtle">
                Waarden op 1 januari 2026. Heffingsvrij vermogen:{' '}
                {eur(tax.exempt)}.
              </p>
            </>
          ) : (
            <>
              <NumberField
                label={
                  compare
                    ? 'Eenmalig beschikbaar bedrag (€)'
                    : 'Startkapitaal (€)'
                }
                value={initial}
                set={setInitial}
              />
              {!compare && !compound && (
                <NumberField
                  label="Maandelijkse inleg (€)"
                  value={monthly}
                  set={setMonthly}
                />
              )}
              <NumberField
                label="Verondersteld jaarrendement (%)"
                value={rate}
                set={setRate}
                min={-30}
                max={30}
                step={0.1}
              />
              {compare && (
                <NumberField
                  label="Netto hypotheekrente (%)"
                  value={mortgage}
                  set={setMortgage}
                  max={20}
                  step={0.1}
                />
              )}
              {compare ? (
                <NumberField
                  label="Veronderstelde belastingdruk per jaar (%)"
                  value={taxDrag}
                  set={setTaxDrag}
                  max={5}
                  step={0.1}
                />
              ) : (
                <NumberField
                  label="Veronderstelde inflatie (%)"
                  value={inflation}
                  set={setInflation}
                  max={15}
                  step={0.1}
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
                value={[years]}
                onValueChange={(v) => setYears(Array.isArray(v) ? v[0] : v)}
                min={1}
                max={50}
                step={1}
                aria-label="Looptijd in jaren"
              />
              <div className="range-labels">
                <span>1 jaar</span>
                <span>50 jaar</span>
              </div>
            </>
          )}
        </div>
        <div className="calc-result" id="uitkomst" aria-live="polite">
          <p className="eyebrow">
            {box ? 'INDICATIE BOX 3 · 2026' : `JOUW SCENARIO NA ${years} JAAR`}
          </p>
          <strong className="result-number">
            <AnimatedNumber value={box ? tax.tax : total} format={eur} />
          </strong>
          <p>
            {box
              ? 'Geschatte jaarlijkse belasting'
              : compare
                ? 'Berekende waarde bij beleggen'
                : 'Berekend eindvermogen'}
          </p>
          {!box && (
            <Chart
              values={values}
              second={second}
              labels={values.map((_, i) => `Jaar ${i}`)}
            />
          )}
          {!box && !compare && (
            <div className="purchasing-power">
              <span>Koopkracht in euro’s van nu</span>
              <strong>
                <AnimatedNumber
                  value={purchasingPower(total, inflation, years)}
                  format={eur}
                />
              </strong>
              <small>Bij {inflation}% jaarlijkse inflatie</small>
            </div>
          )}
          {compare && (
            <div className="scenario-comparison">
              <span>
                Bij 2 procentpunt lager rendement{' '}
                <b>{eur(futureValue(initial, 0, rate - taxDrag - 2, years))}</b>
              </span>
              <span>
                Bij 2 procentpunt hoger rendement{' '}
                <b>{eur(futureValue(initial, 0, rate - taxDrag + 2, years))}</b>
              </span>
            </div>
          )}
          <div className="result-breakdown">
            {box ? (
              <>
                <span>
                  Belaste grondslag <b>{eur(tax.base)}</b>
                </span>
                <span>
                  Belastingtarief <b>{taxConfig.taxRate * 100}%</b>
                </span>
              </>
            ) : (
              <>
                <span>
                  {compare
                    ? 'Aflossen + besparing herinvesteren'
                    : 'Totale eigen inleg'}
                  <b>{eur(compare ? second.at(-1)! : paid)}</b>
                </span>
                <span>
                  {compare ? 'Verschil tussen scenario’s' : 'Berekende groei'}
                  <b>{eur(total - (compare ? second.at(-1)! : paid))}</b>
                </span>
              </>
            )}
          </div>
          <p className="subtle">
            {box
              ? 'Indicatie op basis van voorlopige forfaits. Geen berekening van werkelijk rendement of bijzondere vrijstellingen.'
              : 'Blauw: beleggingsscenario · Geel: ' +
                (compare ? 'aflossingsscenario' : 'eigen inleg') +
                '. Het resultaat is een rekenvoorbeeld, geen voorspelling.'}
          </p>
          <CompareResult
            value={box ? tax.tax : total}
            label={box ? 'Jaarbelasting' : 'Eindvermogen'}
            assumptions={
              box
                ? `${eur(savings)} sparen · ${eur(investments)} beleggen · ${eur(debt)} schuld · ${partner ? 'met' : 'zonder'} fiscale partner`
                : `${eur(initial)} start · ${years} jaar · ${rate}% rendement · ${compare ? 'besparing ' + mortgage + '% · belastingdruk ' + taxDrag + '%' : eur(contribution) + ' p/m'}`
            }
          />
          <button className="textlink" onClick={download}>
            <Download size={16} /> Download berekening
          </button>
        </div>
      </div>
      <div className="reading methodology">
        <h2>Zo werkt deze berekening</h2>
        {box ? (
          <>
            <p>
              We gebruiken 1,28% voor banktegoeden, 6,00% voor overige
              bezittingen en 2,70% voor aftrekbare schulden. De schuldendrempel
              is € 3.800 per persoon. Het heffingsvrije vermogen is € 59.357 per
              persoon en het belastingtarief is 36%.
            </p>
            <p>
              De spaar- en schuldpercentages zijn voorlopig. Bij een lager
              werkelijk rendement kan de uiteindelijke belasting anders
              uitvallen. Bijzondere vrijstellingen, buitenlandse belasting en
              partnerverdeling zijn niet uitgewerkt.
            </p>
            <Link
              className="textlink"
              href={taxSource}
              target="_blank"
              rel="noreferrer"
            >
              Bron: Belastingdienst, voorlopige aanslag 2026{' '}
              <ArrowUpRight size={16} />
            </Link>
          </>
        ) : (
          <>
            <p>
              De berekening gebruikt elk jaar hetzelfde rendementspercentage.
              Voor maandelijkse inleg rekenen we dit om naar een
              maandpercentage. Je inleg telt mee aan het einde van iedere maand.
              De hoofduitkomst is het berekende geldbedrag. De aparte
              koopkrachtuitkomst laat zien wat dat bedrag waard is na de gekozen
              inflatie. Kosten en belastingen zijn niet verwerkt, behalve de
              ingevulde belastingdruk in de vergelijking met aflossen.
            </p>
            {compare ? (
              <p>
                Voor aflossen veronderstellen we dat de netto rentebesparing
                steeds opnieuw tegen hetzelfde percentage wordt ingezet. Dit is
                een vereenvoudigd vermogensscenario, geen
                hypotheekaflossingsschema. Boeterente, renteaftrek, resterende
                schuld en beschikbaarheid van geld zijn niet meegenomen. De
                ingevulde belastingdruk wordt ieder jaar van het
                rendementspercentage afgetrokken. Dat is geen persoonlijke
                belastingberekening. De lagere en hogere scenario’s laten zien
                wat een ander rendement doet, niet hoe waarschijnlijk het is.
                Beleggen kent koersrisico; aflossen vermindert je schuld.
              </p>
            ) : (
              <p>
                Werkelijke rendementen wisselen per jaar en kunnen negatief
                zijn. Verander de uitgangspunten om ook een minder gunstig
                scenario te bekijken.
              </p>
            )}
          </>
        )}
        <p>
          <Link
            href={
              slug === 'box-3'
                ? '/verdieping/belasting'
                : '/verdieping/strategie'
            }
            className="textlink"
          >
            {slug === 'box-3'
              ? 'Lees hoe belasting over je vermogen werkt'
              : 'Lees over risico, spreiding en je portefeuille'}{' '}
            <ArrowRight size={16} />
          </Link>
        </p>
      </div>
    </>
  );
}

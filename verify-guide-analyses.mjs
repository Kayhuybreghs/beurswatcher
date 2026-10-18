import assert from 'node:assert/strict';
import { guideAnalyses, analysisMath } from './app/guide-analyses.ts';
import { guides } from './app/guide-data.ts';

const euro = (value) =>
  new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
const pct = (value) =>
  new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 2 }).format(value) +
  '%';
let assertions = 0;
const near = (actual, expected, label, tolerance = 1e-6) => {
  assert.ok(
    Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance,
    `${label}: ${actual} ≠ ${expected}`,
  );
  assertions++;
};
const same = (actual, expected, label) => {
  assert.deepEqual(actual, expected, label);
  assertions++;
};
const round = Math.round;
const a = (slug) => guideAnalyses[slug];
const copyHas = (slug, expected, label) => {
  const content = JSON.stringify(a(slug).findings);
  assert.ok(
    content.includes(expected),
    `${slug}: missing independently checked ${label}: ${expected}`,
  );
  assertions++;
};

same(
  Object.keys(guideAnalyses).length,
  9,
  'Exactly one analysis for each tool family',
);
same(
  new Set(
    Object.keys(guideAnalyses).map(
      (slug) => guides.find((g) => g.slug === slug)?.tool,
    ),
  ).size,
  9,
  'Nine distinct existing tools',
);
let tableRows = 0;
for (const [slug, analysis] of Object.entries(guideAnalyses)) {
  assert.ok(
    guides.some((g) => g.slug === slug),
    slug + ': existing guide',
  );
  assert.ok(
    analysis.rows.length >= 4 && analysis.rows.length <= 9,
    slug + ': useful bounded table',
  );
  for (const row of analysis.rows) {
    same(row.length, analysis.columns.length, slug + ': row width');
    assert.ok(
      row.every((value) => typeof value === 'string' || Number.isFinite(value)),
      slug + ': finite table data',
    );
    tableRows++;
  }
  for (const field of ['title', 'question', 'method', 'limitation', 'nextStep'])
    assert.ok(analysis[field]?.trim(), slug + ': ' + field);
  assert.ok(
    analysis.assumptions.length >= 3 && analysis.findings.length >= 2,
    slug + ': explicit assumptions and interpretation',
  );
}

// Independent monthly cash-flow ledger, rather than the production annuity formula.
function ledger(initial, monthly, annual, years) {
  let balance = initial;
  const factor = Math.exp(Math.log1p(annual / 100) / 12);
  for (let m = 0; m < years * 12; m++) balance = balance * factor + monthly;
  return balance;
}
for (const annual of [-50, -3, 0, 3, 6]) {
  near(
    analysisMath.monthlyValue(10000, 150, annual, 20),
    ledger(10000, 150, annual, 20),
    `monthly ledger ${annual}`,
  );
  near(
    analysisMath.monthlyValue(10000, 0, annual, 0),
    10000,
    'zero duration returns capital',
  );
}
const returnSlug = 'rendement-scenario-kiezen';
const returnExpectations = [-3, 0, 3, 6, 9].map((rate) => {
  const end = ledger(10000, 150, rate, 20);
  return [pct(rate), 46000, round(end), round(end - 46000)];
});
same(
  a(returnSlug).rows,
  returnExpectations,
  'All return sensitivity rows and signed gains',
);
copyHas(
  returnSlug,
  euro(46000 - ledger(10000, 150, -3, 20)),
  'loss relative to contributions',
);
copyHas(
  returnSlug,
  euro(ledger(10000, 150, 6, 20) - 46000),
  '6% versus zero result',
);

// Cost recurrence checked against a geometric series and future value of each payment.
function feeSeries(initial, annual, fee, years) {
  const gross = 1 + annual / 100,
    net = gross * (1 - fee / 100);
  const payments = Array.from(
    { length: years },
    (_, y) => (initial * net ** y * gross * fee) / 100,
  );
  const paid = payments.reduce((sum, value) => sum + value, 0);
  const lostGrowth = payments.reduce(
    (sum, value, y) => sum + value * (gross ** (years - y - 1) - 1),
    0,
  );
  return {
    end: initial * net ** years,
    paid,
    lostGrowth,
    difference: paid + lostGrowth,
  };
}
for (const annual of [-3, 0, 6])
  for (const fee of [0, 0.15, 1]) {
    const expected = feeSeries(10000, annual, fee, 20),
      actual = analysisMath.costs(10000, annual, fee, 20);
    for (const field of Object.keys(expected))
      near(actual[field], expected[field], `fees ${annual}/${fee} ${field}`);
  }
const costSlug = 'etf-kosten-lange-termijn';
same(
  a(costSlug).rows,
  [0, 0.15, 0.5, 1].map((fee) => {
    const f = feeSeries(10000, 6, fee, 20);
    return [
      pct(fee),
      round(f.end),
      round(f.paid),
      round(f.lostGrowth),
      round(f.difference),
    ];
  }),
  'Fee bill and lost growth are separate columns',
);
copyHas(costSlug, euro(feeSeries(10000, 6, 1, 20).paid), 'actual fee total');
copyHas(
  costSlug,
  euro(feeSeries(10000, 6, 1, 20).lostGrowth),
  'growth on removed fees',
);
copyHas(
  costSlug,
  euro(feeSeries(10000, 6, 0.15, 20).end - feeSeries(10000, 6, 1, 20).end),
  'cost variant difference',
);

// Goal contribution solved by bisection over the independent ledger, not by annuity inversion.
function solveMonthly(target, initial, annual, years) {
  if (ledger(initial, 0, annual, years) >= target) return 0;
  let lower = 0,
    upper = target;
  for (let i = 0; i < 70; i++) {
    const midpoint = (lower + upper) / 2;
    if (ledger(initial, midpoint, annual, years) < target) lower = midpoint;
    else upper = midpoint;
  }
  return (lower + upper) / 2;
}
for (const rate of [-3, 0, 6])
  for (const years of [10, 20, 30])
    near(
      analysisMath.requiredMonthly(100000, 10000, rate, years),
      solveMonthly(100000, 10000, rate, years),
      `goal ${rate}/${years}`,
    );
near(
  analysisMath.requiredMonthly(5000, 10000, 0, 10),
  0,
  'already funded goal has no negative contribution',
);
const goalSlug = 'honderdduizend-euro-opbouwen';
same(
  a(goalSlug).rows,
  [10, 20, 30].flatMap((years) =>
    [0, 3, 6].map((rate) => {
      const monthly = solveMonthly(100000, 10000, rate, years),
        own = 10000 + monthly * years * 12;
      return [
        years,
        pct(rate),
        round(monthly),
        round(own),
        round(100000 - own),
      ];
    }),
  ),
  'All nine goal scenarios reconstruct target with unrounded deposits',
);
copyHas(
  goalSlug,
  euro(solveMonthly(100000, 10000, 6, 20)),
  '20-year 6% monthly payment',
);

const geometrySlug = 'gemiddeld-en-samengesteld-rendement';
same(
  a(geometrySlug).rows,
  [
    [5, 5],
    [20, -10],
    [-10, 20],
    [30, -20],
    [50, -40],
    [-20, -20],
  ].map(([r1, r2]) => {
    const cagr =
      Math.expm1((Math.log1p(r1 / 100) + Math.log1p(r2 / 100)) / 2) * 100;
    const firstBalance = 10000 + (10000 * r1) / 100;
    const end = firstBalance + (firstBalance * r2) / 100;
    return [pct(r1), pct(r2), pct((r1 + r2) / 2), pct(cagr), round(end)];
  }),
  'Arithmetic average versus independently compounded growth',
);
near(analysisMath.twoYears(10000, 0, 0).end, 10000, 'zero pair');
near(
  analysisMath.twoYears(10000, -100, 5).end,
  0,
  'total loss cannot recover by multiplying zero',
);
near(
  analysisMath.twoYears(10000, -100, 5).geometric,
  -100,
  'total loss geometric rate',
);
copyHas(geometrySlug, euro(9000), 'positive average despite net loss');

const inflationSlug = 'nominaal-en-reeel-rendement';
function priceLedger(rate, inflation) {
  let balance = 10000,
    priceIndex = 1;
  for (let y = 0; y < 20; y++) {
    balance += (balance * rate) / 100;
    priceIndex += (priceIndex * inflation) / 100;
  }
  return {
    nominal: balance,
    real: balance / priceIndex,
    realAnnual:
      Math.expm1((Math.log(balance / 10000) - Math.log(priceIndex)) / 20) * 100,
  };
}
same(
  a(inflationSlug).rows,
  [
    [0, 2],
    [2, 2],
    [2, 4],
    [5, 2],
    [5, 4],
    [5, 6],
  ].map(([r, inflation]) => {
    const v = priceLedger(r, inflation);
    return [
      pct(r),
      pct(inflation),
      round(v.nominal),
      round(v.real),
      pct(Math.abs(v.realAnnual) < 1e-10 ? 0 : v.realAnnual),
    ];
  }),
  'Nominal and real balances with independent price index',
);
near(
  analysisMath.inflation(10000, 0, 0, 20).real,
  10000,
  'zero inflation and return',
);
near(
  analysisMath.inflation(10000, -3, -3, 20).real,
  10000,
  'matching negative return and deflation',
);
copyHas(
  inflationSlug,
  pct((1.05 / 1.02 - 1) * 100),
  'exact real rate instead of subtraction',
);

const payoffSlug = 'aflossen-of-beleggen-afwegen';
same(
  a(payoffSlug).rows,
  [-3, 0, 2, 4, 6].map((rate) => {
    let investment = 10000,
      cash = 0;
    for (let year = 0; year < 10; year++) {
      investment += (investment * rate) / 100;
      cash += 400;
    }
    const debtReductionPlusCash = 10000 + cash;
    return [
      pct(rate),
      round(investment),
      round(debtReductionPlusCash),
      round(investment - debtReductionPlusCash),
    ];
  }),
  'Payoff comparison keeps debt reduction separate from accumulated savings',
);
const payoffModel = analysisMath.payoff(10000, 4, 4, 10);
near(
  10000 * (1 + payoffModel.breakEven / 100) ** 10,
  14000,
  'break-even matches cash-not-reinvested route',
);
near(
  analysisMath.payoff(10000, 0, 0, 10).difference,
  0,
  'zero interest zero return tie',
);
copyHas(
  payoffSlug,
  euro(10000 * 1.04 ** 10),
  'reinvested savings counterfactual',
);
copyHas(
  payoffSlug,
  pct((1.4 ** 0.1 - 1) * 100),
  'cash-not-reinvested break-even',
);

// Fixed primary-source fixtures deliberately detect accidental year/rate drift.
const taxSlug = 'box-3-indicatie-2026';
same(
  a(taxSlug).rows,
  [0, 0.25, 0.5, 0.75, 1].map((share) => {
    const savings = 100000 * (1 - share),
      investments = 100000 * share;
    const weightedRate = (1 - share) * 0.0128 + share * 0.06;
    const tax = (100000 - 59357) * weightedRate * 0.36;
    return [
      savings,
      investments,
      round(100000 * weightedRate),
      round(tax),
      pct((tax / 100000) * 100),
    ];
  }),
  '2026 simplified tax matches official rates and one shared exemption',
);
for (const total of [0, 100, 59357])
  near(analysisMath.simpleBox3(total, 0.5).tax, 0, 'no tax below exemption');
near(
  analysisMath.simpleBox3(100000, 1, true).tax,
  0,
  'partner exemption exceeds combined 100000',
);
copyHas(
  taxSlug,
  euro((100000 - 59357) * (0.06 - 0.0128) * 0.36),
  'difference caused only by asset category',
);

// Independent DCA model buys units at explicit price levels; it does not update invested balances.
function unitPurchases(path, cashRate) {
  const endFactor = 1.06 ** 5,
    regular =
      path === 'steady'
        ? endFactor ** (1 / 60)
        : (endFactor / 0.75) ** (1 / 59);
  const prices = [100];
  for (let m = 0; m < 60; m++)
    prices.push(
      prices.at(-1) *
        (path !== 'steady' && m === (path === 'early-drop' ? 1 : 58)
          ? 0.75
          : regular),
    );
  const units = prices
    .slice(0, 12)
    .reduce((sum, price) => sum + 1000 / price, 0);
  const cashFactor = (1 + cashRate / 100) ** (1 / 12);
  const cash =
    12000 * cashFactor ** 60 -
    Array.from({ length: 12 }, (_, m) => 1000 * cashFactor ** (60 - m)).reduce(
      (sum, payment) => sum + payment,
      0,
    );
  return {
    lump: 120 * prices[60],
    staged: units * prices[60] + cash,
    endpoint: prices[60],
  };
}
const entrySlug = 'ineens-of-gespreid-beleggen';
same(
  a(entrySlug).rows,
  [
    ['steady', 'Gelijkmatige groei'],
    ['early-drop', 'Daling in maand 2'],
    ['late-drop', 'Daling in maand 59'],
  ].flatMap(([path, label]) =>
    [0, 2].map((cashRate) => {
      const v = unitPurchases(path, cashRate);
      near(v.endpoint, 100 * 1.06 ** 5, path + ': equal market endpoint');
      return [
        label,
        pct(cashRate),
        round(v.lump),
        round(v.staged),
        round(v.staged - v.lump),
      ];
    }),
  ),
  'DCA scenarios match independent unit purchase calculation including residual cash',
);
assert.ok(
  unitPurchases('early-drop', 0).staged > unitPurchases('early-drop', 0).lump,
  'early shock interpretation direction',
);
assert.ok(
  unitPurchases('late-drop', 0).staged < unitPurchases('late-drop', 0).lump,
  'late shock interpretation direction',
);
copyHas(
  entrySlug,
  euro(unitPurchases('steady', 2).staged - unitPurchases('steady', 0).staged),
  'cash interest contribution',
);

// Dividend model checked by closed forms: geometric cash sum plus separate ending capital.
const dividendSlug = 'dividend-herbeleggen-of-uitkeren';
same(
  a(dividendSlug).rows,
  [-6, -3, 0, 3, 6].map((growth) => {
    const factor = 1 + growth / 100;
    const reinvested = 10000 * (factor + 0.03) ** 10;
    const capital = 10000 * factor ** 10;
    const cash = 300 * (growth === 0 ? 10 : (factor ** 10 - 1) / (factor - 1));
    return [
      pct(growth),
      round(reinvested),
      round(capital),
      round(cash),
      round(capital + cash),
      round(reinvested - capital - cash),
    ];
  }),
  'Reinvested versus portfolio plus kept cash',
);
assert.ok(
  a(dividendSlug).rows[0].at(-1) < 0,
  'negative growth can make reinvestment worse',
);
assert.ok(
  a(dividendSlug).rows[2].at(-1) > 0,
  'flat price growth still compounds reinvested dividends',
);
copyHas(
  dividendSlug,
  euro(10000 * 1.03 ** 10 - 13000),
  'total wealth advantage excludes already-paid cash',
);

same(tableRows, 51, '51 reproducible scenario rows');
console.log(
  `Guide analyses passed: 9 tools, ${tableRows} scenario rows, ${assertions} independent assertions. Negative/zero corners, fee decomposition, cash-flow timing, 2026 tax fixtures and rounded findings verified.`,
);

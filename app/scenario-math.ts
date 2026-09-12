export function inflationScenario(
  amount: number,
  inflation: number,
  years: number,
) {
  return Array.from({ length: years + 1 }, (_, year) => ({
    year,
    nominal: amount,
    real: amount / (1 + inflation / 100) ** year,
    required: amount * (1 + inflation / 100) ** year,
  }));
}
export function dividendScenario(
  initial: number,
  priceGrowth: number,
  yieldRate: number,
  years: number,
) {
  let reinvested = initial,
    capital = initial,
    cash = 0,
    totalDividends = 0;
  const rows = [{ year: 0, reinvested, capital, cash, totalDividends }];
  for (let year = 1; year <= years; year++) {
    const payment = (reinvested * yieldRate) / 100;
    totalDividends += payment;
    cash += (capital * yieldRate) / 100;
    reinvested = reinvested * (1 + priceGrowth / 100) + payment;
    capital *= 1 + priceGrowth / 100;
    rows.push({ year, reinvested, capital, cash, totalDividends });
  }
  return rows;
}
export type MarketPath = 'steady' | 'early-drop' | 'late-drop';
export function entryScenario(
  amount: number,
  annual: number,
  years: number,
  spreadMonths: number,
  cashRate: number,
  path: MarketPath,
) {
  const months = Math.max(12, Math.round(years * 12)),
    n = Math.min(months, Math.max(1, Math.round(spreadMonths)));
  const totalFactor = (1 + annual / 100) ** years,
    shock = 0.75;
  const base =
    path === 'steady'
      ? totalFactor ** (1 / months)
      : (totalFactor / shock) ** (1 / (months - 1));
  const shockMonth = path === 'early-drop' ? 1 : months - 2;
  let lump = amount,
    equity = 0,
    cash = amount,
    price = 100;
  const rows = [{ month: 0, lump, staged: amount, equity, cash, price }];
  for (let month = 0; month < months; month++) {
    if (month < n) {
      const contribution = amount / n;
      cash -= contribution;
      equity += contribution;
    }
    const factor = path !== 'steady' && month === shockMonth ? shock : base;
    lump *= factor;
    equity *= factor;
    cash *= (1 + cashRate / 100) ** (1 / 12);
    price *= factor;
    rows.push({
      month: month + 1,
      lump,
      staged: equity + cash,
      equity,
      cash,
      price,
    });
  }
  return rows;
}

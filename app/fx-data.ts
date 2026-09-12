export const fxSource =
  'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
export const fxCurrencies = ['USD', 'GBP', 'CHF', 'JPY'] as const;
export type FxData = {
  asOf: string;
  rates: Record<string, number>;
  mode: 'official' | 'snapshot';
};
export const fxSnapshot: FxData = {
  asOf: '2026-09-09',
  rates: { USD: 1.1652, GBP: 0.85898, CHF: 0.9404, JPY: 178.59 },
  mode: 'snapshot',
};
export function parseFx(xml: string): FxData {
  const asOf = xml.match(/<Cube\b[^>]*\btime=['"](\d{4}-\d{2}-\d{2})['"]/)?.[1];
  if (!asOf || new Date(asOf).toISOString().slice(0, 10) !== asOf)
    throw Error('Invalid ECB reference date');
  const rates: Record<string, number> = {};
  for (const tag of xml.matchAll(
    /<Cube\b[^>]*\bcurrency=['"]([A-Z]{3})['"][^>]*\brate=['"]([\d.]+)['"][^>]*\/>/g,
  )) {
    const rate = Number(tag[2]);
    if (
      (fxCurrencies as readonly string[]).includes(tag[1]) &&
      Number.isFinite(rate) &&
      rate > 0
    )
      rates[tag[1]] = rate;
  }
  if (fxCurrencies.some((c) => !rates[c])) throw Error('Incomplete ECB rates');
  return { asOf, rates, mode: 'official' };
}

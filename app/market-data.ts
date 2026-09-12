import { markets } from './data';
export const marketNotice = 'Voorbeelddata · Geen live koersen';
export function demoSeries(name: string, period: string) {
  const market = markets.find((m) => m.name === name) || markets[0];
  const shape = [
    0, 0.06, 0.04, 0.11, 0.07, 0.15, 0.13, 0.08, 0.19, 0.26, 0.22, 0.32, 0.28,
    0.23, 0.36, 0.41, 0.38, 0.31, 0.43, 0.49, 0.44, 0.54, 0.58, 0.52, 0.49,
    0.63, 0.6, 0.68, 0.64, 0.73, 0.79, 0.72, 0.82, 0.87, 0.83, 0.78, 0.89, 0.85,
    0.91, 0.94, 0.9, 1,
  ];
  const extent =
    period === '1D'
      ? market.change / 100
      : { '1W': 0.014, '1M': 0.037, '1Y': 0.16, '5Y': 0.42 }[period] || 0.01;
  const start = market.value / (1 + extent);
  return shape.map((n, i) =>
    i === 41
      ? market.value
      : Math.round((start + (market.value - start) * n) * 10000) / 10000,
  );
}
export type MarketFeed = {
  mode: 'demo' | 'live';
  asOf: string | null;
  source: string;
  markets: typeof markets;
};
export const demoFeed: MarketFeed = {
  mode: 'demo',
  asOf: null,
  source: 'Beurs Watcher voorbeeldset',
  markets,
};
let cached: Promise<MarketFeed> | null = null;
export function loadMarketFeed(retry = false) {
  if (retry) cached = null;
  return (cached ??= fetch('/api/markt')
    .then(async (r) => {
      if (!r.ok) throw Error('Marktgegevens niet beschikbaar');
      const data = (await r.json()) as MarketFeed;
      if (
        !Array.isArray(data.markets) ||
        !data.markets.length ||
        (data.mode !== 'demo' && data.mode !== 'live')
      )
        throw Error('Ongeldige gegevens');
      return data;
    })
    .catch((e) => {
      cached = null;
      throw e;
    }));
}

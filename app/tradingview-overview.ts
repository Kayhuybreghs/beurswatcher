// Public TradingView web-component integration. No API key or scraped prices.
// Cash-index symbols SP:SPX, NASDAQ:NDX and TVC:SPX were embed-restricted
// during browser validation; these supported reference instruments are CFDs.
export const indexReferenceSymbols = [
  'FOREXCOM:SPXUSD',
  'FOREXCOM:NSXUSD',
  'FOREXCOM:DJI',
];

const widgetTag = 'tv-market-overview';
const widgetSource =
  'https://widgets.tradingview-widget.com/w/en/tv-market-overview.js';
let pending: Promise<void> | undefined;

export function loadTradingViewOverview(): Promise<void> {
  if (customElements.get(widgetTag)) return Promise.resolve();
  if (pending) return pending;
  pending = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    const timer = setTimeout(() => {
      script.remove();
      reject(new Error('TradingView widget timed out'));
    }, 20000);
    script.type = 'module';
    script.src = widgetSource;
    script.addEventListener(
      'load',
      () => {
        if (customElements.get(widgetTag)) {
          clearTimeout(timer);
          resolve();
        } else {
          clearTimeout(timer);
          script.remove();
          reject(new Error('TradingView widget was not registered'));
        }
      },
      { once: true },
    );
    script.addEventListener(
      'error',
      () => {
        clearTimeout(timer);
        script.remove();
        reject(new Error('TradingView widget unavailable'));
      },
      { once: true },
    );
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    pending = undefined;
    throw error;
  });
  return pending;
}

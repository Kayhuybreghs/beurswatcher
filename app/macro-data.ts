// Selected publication schedules, maintained by Kay. No forecasts or live results.
export const macroCheckedAt = '2026-09-26';
export type MacroEvent = {
  id: string;
  at: string;
  country: 'NL' | 'US';
  title: string;
  topic: string;
  source: string;
  url: string;
  explanation: string;
  period?: string;
  mode?: 'automatic' | 'manual' | 'snapshot';
};
const cbs = 'https://www.cbs.nl/nl-nl/publicatieplanning';
const bls = 'https://www.bls.gov/schedule/2026/10_sched.htm';
const fed = 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm';
export const macroExplanations: Record<string, string> = {
  Inflatie:
    'Prijsontwikkeling helpt je koopkracht en de economische context begrijpen. Een inflatiecijfer is geen voorspelling van het rendement van je beleggingen.',
  Arbeidsmarkt:
    'Banen, vacatures en werkloosheid geven verschillende signalen over de economie. Bekijk de trend en eventuele herzieningen samen.',
  Economie:
    'Dit publicatiemoment geeft meer zicht op productie, bestedingen of vertrouwen. Eén cijfer vertelt niet het volledige economische verhaal.',
  Rente:
    'De Fed bespreekt het Amerikaanse monetaire beleid. Let naast de beslissing ook op de toelichting en de verwachtingen; een koersreactie staat niet vast.',
};
const rows: [string, MacroEvent['country'], string, string][] = [
  [
    '2026-09-29T16:00:00+02:00',
    'US',
    'Vacatures & arbeidsmobiliteit (JOLTS)',
    'Arbeidsmarkt',
  ],
  ['2026-09-30T06:30:00+02:00', 'NL', 'Economisch maandbericht', 'Economie'],
  ['2026-09-30T06:30:00+02:00', 'NL', 'Producentenprijzen', 'Inflatie'],
  ['2026-10-02T06:30:00+02:00', 'NL', 'Snelle raming inflatie', 'Inflatie'],
  [
    '2026-10-02T14:30:00+02:00',
    'US',
    'Banenrapport (Employment Situation)',
    'Arbeidsmarkt',
  ],
  [
    '2026-10-08T06:30:00+02:00',
    'NL',
    'Consumptie door huishoudens',
    'Economie',
  ],
  [
    '2026-10-09T06:30:00+02:00',
    'NL',
    'Producentenvertrouwen & industrie',
    'Economie',
  ],
  ['2026-10-13T06:30:00+02:00', 'NL', 'Inflatie', 'Inflatie'],
  ['2026-10-14T14:30:00+02:00', 'US', 'Consumentenprijzen (CPI)', 'Inflatie'],
  [
    '2026-10-15T06:30:00+02:00',
    'NL',
    'Maandbericht werkloosheid',
    'Arbeidsmarkt',
  ],
  ['2026-10-15T14:30:00+02:00', 'US', 'Producentenprijzen (PPI)', 'Inflatie'],
  ['2026-10-22T06:30:00+02:00', 'NL', 'Consumentenvertrouwen', 'Economie'],
  ['2026-10-28', 'US', 'Laatste dag Fed-vergadering', 'Rente'],
  [
    '2026-10-30T13:30:00+01:00',
    'US',
    'Loonkosten (Employment Cost Index)',
    'Arbeidsmarkt',
  ],
  ['2026-12-09', 'US', 'Laatste dag Fed-vergadering', 'Rente'],
];
export const macroEvents: MacroEvent[] = rows.map(
  ([at, country, title, topic], i) => ({
    id: `macro-${i}`,
    at,
    country,
    title,
    topic,
    source:
      country === 'NL' ? 'CBS' : topic === 'Rente' ? 'Federal Reserve' : 'BLS',
    url: country === 'NL' ? cbs : topic === 'Rente' ? fed : bls,
    explanation: macroExplanations[topic],
  }),
);
export function selectMacroEvents(
  { country = 'all', topic = 'all', from = '', until = '' } = {},
  rows = macroEvents,
) {
  return rows
    .filter(
      (e) =>
        (country === 'all' || e.country === country) &&
        (topic === 'all' || e.topic === topic) &&
        (!from || macroDay(e.at) >= from) &&
        (!until || macroDay(e.at) <= until),
    )
    .sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
}

export function macroDay(at: string) {
  return at.includes('T')
    ? new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Amsterdam' }).format(
        new Date(at),
      )
    : at;
}

export type MacroSourceState = {
  name: string;
  country: 'NL' | 'US';
  mode: 'automatic' | 'snapshot' | 'unavailable' | 'manual';
  checkedAt: string | null;
  count: number;
};
export type MacroFeed = {
  events: MacroEvent[];
  sources: MacroSourceState[];
  coverage: { from: string; until: string };
};

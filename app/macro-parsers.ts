import { macroExplanations, macroDay, type MacroEvent } from './macro-data.ts';

export const cbsCalendarUrl = 'https://www.cbs.nl/odata/v1/Events';
export const beaCalendarUrl =
  'https://apps.bea.gov/API/signup/release_dates.json';
const validDate = (value: unknown): value is string =>
  typeof value === 'string' &&
  /^\d{4}-\d\d-\d\dT.*(?:Z|[+-]\d\d:\d\d)$/.test(value) &&
  Number.isFinite(Date.parse(value));
export function cbsRequest(from: string, until: string) {
  return (
    cbsCalendarUrl +
    '?' +
    new URLSearchParams({
      $filter: `Language eq 'nl-NL' and PlannedPublicationTime ge ${from}T00:00:00Z and PlannedPublicationTime le ${until}T23:59:59Z`,
      $orderby: 'PlannedPublicationTime',
      $top: '500',
      $select:
        'UniqueId,Title,Url,PlannedPublicationTime,ReportingPeriod,PublishTimeUnknown,Language',
    })
  );
}
function cbsTopic(title: string) {
  if (/caribisch|bonaire|saba|eustatius/i.test(title)) return null;
  if (/inflatie|consumentenprijzen|producentenprijzen/i.test(title))
    return 'Inflatie';
  if (/werkloosheid|arbeidsmarkt|cao.lon|vacatures|banen en lonen/i.test(title))
    return 'Arbeidsmarkt';
  if (
    /economisch|economische groei|bbp|consumptie door huishoudens|consumentenvertrouwen|producentenvertrouwen|industrie|detailhandel|internationale handel|uitvoer|faillissement|koopwoningen|huizenprijs|overheidsschuld/i.test(
      title,
    )
  )
    return 'Economie';
  return null;
}
export function parseCbsCalendar(input: unknown): MacroEvent[] {
  const data = input as {
    value?: Record<string, unknown>[];
    '@odata.nextLink'?: string;
  };
  if (
    !data ||
    !Array.isArray(data.value) ||
    data['@odata.nextLink'] ||
    data.value.length >= 500
  )
    throw new Error('CBS calendar incomplete or invalid');
  return data.value.flatMap((row) => {
    if (
      row.Language !== 'nl-NL' ||
      typeof row.Title !== 'string' ||
      !validDate(row.PlannedPublicationTime) ||
      typeof row.UniqueId !== 'string'
    )
      return [];
    const title = row.Title.trim();
    const topic = cbsTopic(title);
    if (!topic) return [];
    const at = row.PublishTimeUnknown
      ? macroDay(row.PlannedPublicationTime)
      : row.PlannedPublicationTime;
    const url =
      typeof row.Url === 'string' && row.Url.startsWith('https://www.cbs.nl/')
        ? row.Url
        : 'https://www.cbs.nl/nl-nl/publicatieplanning';
    return [
      {
        id: 'cbs-' + row.UniqueId,
        at,
        title,
        topic,
        country: 'NL' as const,
        source: 'CBS',
        url,
        explanation: macroExplanations[topic],
        period:
          typeof row.ReportingPeriod === 'string'
            ? row.ReportingPeriod
            : undefined,
        mode: 'automatic' as const,
      },
    ];
  });
}
const beaSeries: Record<string, [string, string, string]> = {
  'Gross Domestic Product': [
    'Economische groei (bbp)',
    'Economie',
    'Het BEA publiceert een raming van de Amerikaanse economische productie. Eerste ramingen worden later herzien; vergelijk dezelfde periode en berekeningswijze.',
  ],
  'Personal Income and Outlays': [
    'Inkomen, bestedingen & PCE-inflatie',
    'Inflatie',
    'Deze publicatie bevat inkomen, bestedingen en de PCE-prijsindex. PCE meet prijsveranderingen van consumptie en verschilt in samenstelling en berekening van de CPI.',
  ],
  'U.S. International Trade in Goods and Services': [
    'Internationale handel in goederen en diensten',
    'Economie',
    'De handelsbalans toont het verschil tussen uitvoer en invoer. Bekijk naast het saldo ook de afzonderlijke stromen en de ontwikkeling over meerdere maanden.',
  ],
};
export function parseBeaCalendar(input: unknown): MacroEvent[] {
  if (!input || typeof input !== 'object' || Array.isArray(input))
    throw new Error('BEA calendar invalid');
  const data = input as Record<string, { release_dates?: unknown[] }>;
  const events: MacroEvent[] = [];
  for (const [series, [title, topic, explanation]] of Object.entries(
    beaSeries,
  )) {
    const dates = data[series]?.release_dates;
    if (
      !Array.isArray(dates) ||
      !dates.length ||
      dates.some((at) => !validDate(at))
    )
      throw new Error('BEA series missing or invalid');
    for (const at of new Set(dates as string[]))
      events.push({
        id: `bea-${series}-${at}`,
        at,
        country: 'US',
        title,
        topic,
        source: 'BEA',
        url: 'https://www.bea.gov/news/schedule',
        explanation,
        mode: 'automatic',
      });
  }
  return events;
}

export function withinCoverage(
  events: MacroEvent[],
  from: string,
  until: string,
) {
  return [
    ...new Map(
      events
        .filter((e) => macroDay(e.at) >= from && macroDay(e.at) <= until)
        .map((e) => [e.id, e]),
    ).values(),
  ].sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
}

export function recoverMacroSource(
  previous: { checkedAt: string; events: MacroEvent[] },
  now: number,
  from: string,
  until: string,
) {
  const age = now - Date.parse(previous.checkedAt);
  const usable = age >= 0 && age < 7 * 86400000;
  return {
    events: usable
      ? withinCoverage(previous.events, from, until).map((e) => ({
          ...e,
          mode: 'snapshot' as const,
        }))
      : [],
    mode: usable ? ('snapshot' as const) : ('unavailable' as const),
    checkedAt: previous.checkedAt,
  };
}

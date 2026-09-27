import {
  macroCheckedAt,
  macroEvents,
  type MacroEvent,
  type MacroFeed,
  type MacroSourceState,
} from '../../macro-data';
import {
  cbsRequest,
  beaCalendarUrl,
  parseCbsCalendar,
  parseBeaCalendar,
  withinCoverage,
  recoverMacroSource,
} from '../../macro-parsers';
import snapshot from '../../macro-snapshot.json';

export const runtime = 'nodejs';
export const maxDuration = 30;
type CachedSource = { checkedAt: string; events: MacroEvent[] };
const latest = new Map<string, CachedSource>();
let cached: { until: number; data: MacroFeed } | undefined;
let pending: Promise<MacroFeed> | undefined;

async function loadFeed(): Promise<MacroFeed> {
  const now = Date.now();
  const from = new Date(now - 30 * 86400000).toISOString().slice(0, 10);
  const until = new Date(now + 180 * 86400000).toISOString().slice(0, 10);
  const definitions = [
    {
      name: 'CBS' as const,
      country: 'NL' as const,
      url: cbsRequest(from, until),
      parse: parseCbsCalendar,
    },
    {
      name: 'BEA' as const,
      country: 'US' as const,
      url: beaCalendarUrl,
      parse: parseBeaCalendar,
    },
  ];
  const results = await Promise.all(
    definitions.map(async (source) => {
      let state: MacroSourceState;
      let events: MacroEvent[] = [];
      try {
        const response = await fetch(source.url, {
          cache: 'no-store',
          signal: AbortSignal.timeout(10000),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        events = withinCoverage(
          source.parse(await response.json()),
          from,
          until,
        );
        const checkedAt = new Date().toISOString();
        latest.set(source.name, { checkedAt, events });
        state = {
          name: source.name,
          country: source.country,
          mode: 'automatic',
          checkedAt,
          count: events.length,
        };
      } catch {
        const previous =
          latest.get(source.name) || (snapshot[source.name] as CachedSource);
        const recovered = recoverMacroSource(previous, now, from, until);
        events = recovered.events;
        state = {
          name: source.name,
          country: source.country,
          mode: recovered.mode,
          checkedAt: previous.checkedAt,
          count: events.length,
        };
      }
      return { state, events };
    }),
  );
  // Keep the previously checked BLS/Fed selection visible with an explicit manual label.
  // It is never presented as part of the automatic BEA feed.
  const manual = withinCoverage(
    macroEvents
      .filter((e) => e.country === 'US')
      .map((e) => ({ ...e, mode: 'manual' as const })),
    from,
    until,
  );
  return {
    events: withinCoverage(
      [...results.flatMap((r) => r.events), ...manual],
      from,
      until,
    ),
    sources: [
      ...results.map((r) => r.state),
      {
        name: 'BLS / Federal Reserve',
        country: 'US',
        mode: 'manual',
        checkedAt: macroCheckedAt,
        count: manual.length,
      },
    ],
    coverage: { from, until },
  };
}

export async function GET() {
  if (!cached || cached.until < Date.now()) {
    pending ??= loadFeed();
    try {
      const data = await pending;
      const healthy = data.sources.every(
        (s) => s.mode === 'automatic' || s.mode === 'manual',
      );
      cached = { data, until: Date.now() + (healthy ? 3600000 : 60000) };
    } finally {
      pending = undefined;
    }
  }
  return Response.json(cached.data, {
    headers: {
      'Cache-Control': 'public, max-age=60, s-maxage=300',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

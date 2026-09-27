import assert from 'node:assert/strict';
import {
  parseCbsCalendar,
  parseBeaCalendar,
  withinCoverage,
  recoverMacroSource,
} from './app/macro-parsers.ts';
import { macroDay, selectMacroEvents } from './app/macro-data.ts';

const row = {
  UniqueId: 'one',
  Title: 'Snelle raming inflatie',
  Language: 'nl-NL',
  PlannedPublicationTime: '2026-10-02T06:30:00+02:00',
  Url: 'https://www.cbs.nl/nl-nl/publicatieplanning',
  ReportingPeriod: 'September 2026',
};
const cbs = parseCbsCalendar({
  value: [
    row,
    { ...row, UniqueId: 'unrelated', Title: 'Verjaardagen' },
    { ...row, UniqueId: 'regional', Title: 'Inflatie Caribisch Nederland' },
    { ...row, UniqueId: 'english', Language: 'en-GB' },
    { ...row, UniqueId: 'bad', PlannedPublicationTime: 'invalid' },
  ],
});
assert.equal(cbs.length, 1);
assert.equal(cbs[0].country, 'NL');
assert.equal(cbs[0].period, 'September 2026');
assert.equal(
  parseCbsCalendar({ value: [{ ...row, PublishTimeUnknown: true }] })[0].at,
  '2026-10-02',
);
assert.equal(
  parseCbsCalendar({ value: [{ ...row, Url: 'javascript:alert(1)' }] })[0].url,
  'https://www.cbs.nl/nl-nl/publicatieplanning',
);
assert.throws(() => parseCbsCalendar({ value: [], '@odata.nextLink': 'next' }));
assert.throws(() => parseCbsCalendar({ error: 'upstream problem' }));
const bea = parseBeaCalendar(
  Object.fromEntries(
    [
      'Gross Domestic Product',
      'Personal Income and Outlays',
      'U.S. International Trade in Goods and Services',
    ].map((s) => [
      s,
      {
        release_dates: [
          '2026-10-29T12:30:00+00:00',
          '2026-10-29T12:30:00+00:00',
          '2026-11-25T13:30:00+00:00',
        ],
      },
    ]),
  ),
);
assert.equal(bea.length, 6, 'duplicate dates removed within a series');
assert.equal(
  new Set(bea.map((e) => e.id)).size,
  6,
  'distinct publications at the same time retained',
);
assert.throws(() => parseBeaCalendar({}));
assert.equal(macroDay('2026-10-28T23:30:00Z'), '2026-10-29');
const midnight = { ...bea[0], at: '2026-10-28T23:30:00Z' };
assert.equal(
  selectMacroEvents(
    { country: 'US', from: '2026-10-29', until: '2026-10-29' },
    [midnight],
  ).length,
  1,
);
assert.equal(withinCoverage(bea, '2026-10-01', '2026-10-31').length, 3);
assert.equal(selectMacroEvents({ country: 'NL' }, [...cbs, ...bea]).length, 1);
assert.equal(
  selectMacroEvents({ country: 'US', topic: 'Inflatie' }, [...cbs, ...bea])
    .length,
  2,
);
const format = (at) =>
  new Intl.DateTimeFormat('nl-NL', {
    timeZone: 'Europe/Amsterdam',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(at));
assert.equal(
  format(bea[0].at),
  '13:30',
  'US/Europe DST change differs in late October',
);
assert.equal(format(bea[1].at), '14:30');
if (process.argv[2]) {
  const response = await fetch(process.argv[2] + '/api/macro');
  assert.equal(response.status, 200);
  const data = await response.json();
  for (const name of ['CBS', 'BEA']) {
    const source = data.sources.find((s) => s.name === name);
    assert.equal(source?.mode, 'automatic', name + ' connected');
    assert.ok(
      data.events.some((e) => e.source === name && e.mode === 'automatic'),
      name + ' actual events',
    );
  }
  assert.ok(
    data.events
      .filter((e) => e.source === 'BLS' || e.source === 'Federal Reserve')
      .every((e) => e.mode === 'manual'),
  );
  assert.equal(new Set(data.events.map((e) => e.id)).size, data.events.length);
  console.log(
    JSON.stringify({ sources: data.sources, events: data.events.length }),
  );
}
console.log(
  'Calendar parsing, selection, duplicate prevention, source validation and Amsterdam time zones passed.',
);

const backup = { checkedAt: '2026-10-01T12:00:00Z', events: cbs };
const recent = recoverMacroSource(
  backup,
  Date.parse('2026-10-02T12:00:00Z'),
  '2026-10-01',
  '2026-10-31',
);
assert.equal(recent.mode, 'snapshot');
assert.equal(recent.events[0].mode, 'snapshot');
assert.equal(
  recent.checkedAt,
  backup.checkedAt,
  'failure must not invent a newer sync time',
);
const expired = recoverMacroSource(
  backup,
  Date.parse('2026-10-09T12:00:00Z'),
  '2026-10-01',
  '2026-10-31',
);
assert.equal(expired.mode, 'unavailable');
assert.equal(expired.events.length, 0);
console.log(
  'Source failure retains dated snapshots and rejects expired backups.',
);

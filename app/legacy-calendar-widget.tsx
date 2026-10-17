'use client';
import { useState } from 'react';
import { ChoiceGroup } from './choice-group';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Picker } from './widget-picker';

const macro = [
  {
    day: 0,
    region: 'Europa',
    time: '10:00',
    country: 'EU',
    event: 'Consumentenvertrouwen',
    previous: '−14,0',
    forecast: '−13,5',
    actual: '—',
    high: false,
  },
  {
    day: 1,
    region: 'Verenigde Staten',
    time: '14:30',
    country: 'US',
    event: 'Inflatiecijfers (CPI)',
    previous: '2,8%',
    forecast: '2,7%',
    actual: '—',
    high: true,
  },
  {
    day: 2,
    region: 'Europa',
    time: '14:15',
    country: 'EU',
    event: 'Rentebesluit ECB',
    previous: '2,25%',
    forecast: '2,25%',
    actual: '—',
    high: true,
  },
  {
    day: 3,
    region: 'Verenigde Staten',
    time: '14:30',
    country: 'US',
    event: 'Wekelijkse werkloosheidsaanvragen',
    previous: '225K',
    forecast: '228K',
    actual: '—',
    high: false,
  },
  {
    day: 4,
    region: 'Azië',
    time: '03:30',
    country: 'CN',
    event: 'Industriële productie',
    previous: '5,6%',
    forecast: '5,4%',
    actual: '—',
    high: true,
  },
  {
    day: 8,
    region: 'Verenigde Staten',
    time: '20:00',
    country: 'US',
    event: 'Toelichting centrale bank',
    previous: '—',
    forecast: '—',
    actual: '—',
    high: true,
  },
];

const earnings = [
  { day: 0, name: 'Oracle', ticker: 'ORCL', time: 'Na beurs', eps: '$ 1,48' },
  { day: 1, name: 'Adobe', ticker: 'ADBE', time: 'Na beurs', eps: '$ 4,81' },
  { day: 2, name: 'Inditex', ticker: 'ITX', time: 'Voor beurs', eps: '€ 0,54' },
  { day: 3, name: 'Kroger', ticker: 'KR', time: 'Voor beurs', eps: '$ 1,02' },
  { day: 8, name: 'FedEx', ticker: 'FDX', time: 'Na beurs', eps: '$ 4,18' },
];

export function Calendar({
  kind = 'macro',
  full = false,
}: {
  kind?: string;
  full?: boolean;
}) {
  const [period, setPeriod] = useState('Deze week'),
    [filter, setFilter] = useState('Alle');
  const dayOk = (day: number) =>
    period === 'Vandaag'
      ? day === 0
      : period === 'Morgen'
        ? day === 1
        : period === 'Volgende week'
          ? day > 4
          : day <= 4;
  const rows = macro.filter(
    (r) =>
      dayOk(r.day) &&
      (filter === 'Alle' ||
        (filter === 'Hoge impact' && r.high) ||
        r.region === filter),
  );
  const erows = earnings.filter((r) => dayOk(r.day));
  return (
    <div className="calendar">
      <p className="subtle">
        Voorbeeldagenda · Datums, verwachtingen en bedrijven zijn illustratief.
      </p>
      {full && (
        <div className="filters">
          <ChoiceGroup
            label="Kies een periode voor de voorbeeldagenda"
            value={period}
            onChange={setPeriod}
            variant="line"
            options={['Vandaag', 'Morgen', 'Deze week', 'Volgende week']}
          />
          {kind === 'macro' && (
            <Picker
              label="Filter de agenda"
              value={filter}
              values={[
                'Alle',
                'Europa',
                'Verenigde Staten',
                'Azië',
                'Hoge impact',
              ]}
              onChange={setFilter}
            />
          )}
        </div>
      )}
      {full ? (
        <Table>
          <TableHeader>
            <TableRow>
              {(kind === 'macro'
                ? [
                    'Dag',
                    'Tijd',
                    'Regio / gebeurtenis',
                    'Vorige',
                    'Verwacht',
                    'Actueel',
                    'Impact',
                  ]
                : ['Dag', 'Bedrijf', 'Ticker', 'Publicatie', 'Verwachte EPS']
              ).map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {kind === 'macro'
              ? rows.map((r) => (
                  <TableRow key={r.event}>
                    <TableCell>
                      {['Ma', 'Di', 'Wo', 'Do', 'Vr'][r.day % 5]}
                    </TableCell>
                    <TableCell>{r.time}</TableCell>
                    <TableCell>
                      <b>{r.country}</b> {r.event}
                    </TableCell>
                    <TableCell>{r.previous}</TableCell>
                    <TableCell>{r.forecast}</TableCell>
                    <TableCell>{r.actual}</TableCell>
                    <TableCell>
                      <span className={r.high ? 'impact' : ''}>
                        {r.high ? 'Hoog' : 'Normaal'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              : erows.map((r) => (
                  <TableRow key={r.ticker}>
                    <TableCell>
                      {['Ma', 'Di', 'Wo', 'Do', 'Vr'][r.day % 5]}
                    </TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.ticker}</TableCell>
                    <TableCell>{r.time}</TableCell>
                    <TableCell>{r.eps}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      ) : (
        <>
          {(kind === 'macro'
            ? rows.slice(0, 3).map((r) => ({
                day: r.day,
                title: r.event,
                region: r.country,
                time: r.time,
                high: r.high,
                extra: 'Macro',
              }))
            : erows.slice(0, 3).map((r) => ({
                day: r.day,
                title: r.name,
                region: r.ticker,
                time: r.time,
                high: false,
                extra: r.eps,
              }))
          ).map((r) => (
            <div className="agenda-row" key={r.title}>
              <span className="day">
                {['MA', 'DI', 'WO', 'DO', 'VR'][r.day % 5]}
              </span>
              <div>
                <b>{r.title}</b>
                <small>
                  {r.region} · {r.time}
                </small>
              </div>
              <span className={r.high ? 'impact' : 'subtle'}>
                {r.high ? 'Hoge impact' : r.extra}
              </span>
            </div>
          ))}
        </>
      )}
      {full &&
        ((kind === 'macro' && !rows.length) ||
          (kind !== 'macro' && !erows.length)) && (
          <p className="empty">
            Geen gebeurtenissen voor deze selectie. Kies een andere periode of
            regio.
          </p>
        )}
    </div>
  );
}

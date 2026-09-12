/* Local editorial images use explicit layout dimensions; no image optimization service is configured. */
/* oxlint-disable next/no-img-element */
'use client';
import Link from './site-link';
import { CompareResult } from './compare-result';
// Inline SVG and a status region containing a retry button need explicit roles.
/* oxlint-disable jsx-a11y/prefer-tag-over-role */
import { useState, useId, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight, Download, Check } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { markets, articles, futureValue, boxTax, taxSource } from './data';
import { AnimatedNumber, useAnimatedSeries } from './motion';
import { purchasingPower, taxConfig, downloadRows } from './calculations';
import { demoSeries, loadMarketFeed, demoFeed } from './market-data';
import { Skeleton } from '@/components/ui/skeleton';
export const eur = (v: number) =>
  new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(v);
export function Picker({
  value,
  values,
  onChange,
  label,
}: {
  value: string;
  values: string[];
  onChange: (s: string) => void;
  label: string;
}) {
  return (
    <Select value={value} onValueChange={(v) => v && onChange(v)}>
      <SelectTrigger className="picker" aria-label={label}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="picker-content">
        {values.map((v) => (
          <SelectItem key={v} value={v}>
            {v}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
export function Chart({
  values,
  second,
  mini = false,
  labels,
}: {
  values: number[];
  second?: number[];
  mini?: boolean;
  labels?: string[];
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, ''),
    ref = useRef<HTMLDivElement>(null),
    [entered, setEntered] = useState(false),
    [plotWidth, setPlotWidth] = useState(760),
    [hover, setHover] = useState<number | null>(null),
    smooth = useAnimatedSeries(values),
    smoothSecond = useAnimatedSeries(second || values);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setPlotWidth(Math.max(220, Math.round(entry.contentRect.width))),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const plotEnd = plotWidth - (mini ? 16 : 48),
    plotSpan = plotEnd - 16;
  const all = [...smooth, ...(second ? smoothSecond : [])],
    rawMin = Math.min(...all),
    rawMax = Math.max(...all),
    padding = (rawMax - rawMin) * 0.12 || 1,
    min = rawMin >= 0 ? Math.max(0, rawMin - padding) : rawMin - padding,
    max = rawMax + padding,
    range = max - min;
  const x = (i: number, n = values.length) =>
      16 + (i / (n - 1 || 1)) * plotSpan,
    y = (v: number) => 218 - ((v - min) / range) * 200;
  const points = (a: number[]) =>
    a
      .map(
        (v, i) =>
          `${i ? 'L' : 'M'}${x(i, a.length).toFixed(2)},${y(v).toFixed(2)}`,
      )
      .join(' ');
  const at = hover === null ? null : Math.min(hover, values.length - 1);
  return (
    <div
      ref={ref}
      className={
        'chart ' + (mini ? 'mini ' : '') + (entered ? 'chart-entered' : '')
      }
    >
      {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- Inline SVG needs an accessible image role. */}
      <svg
        viewBox={`0 0 ${plotWidth} 265`}
        preserveAspectRatio={mini ? 'none' : 'xMidYMid meet'}
        role="img"
        aria-label={
          second
            ? 'Vergelijking van twee berekende scenario’s'
            : 'Koers- of vermogensontwikkeling'
        }
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#093060" stopOpacity=".13" />
            <stop offset="100%" stopColor="#093060" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <line
              x1="16"
              x2={plotEnd}
              y1={18 + i * 66.667}
              y2={18 + i * 66.667}
              stroke="currentColor"
              opacity=".12"
              strokeDasharray="2 5"
            />
            {!mini && (
              <text
                x={plotEnd + 8}
                y={22 + i * 66.667}
                fontSize="12"
                fill="currentColor"
                opacity=".6"
              >
                {Math.abs(max - (i * range) / 3) >= 10000
                  ? Math.round((max - (i * range) / 3) / 1000) + 'k'
                  : Math.round(max - (i * range) / 3)}
              </text>
            )}
          </g>
        ))}
        <path
          d={`${points(smooth)}L${plotEnd},230L16,230Z`}
          fill={`url(#${id})`}
        />
        {second && (
          <path
            d={points(smoothSecond)}
            fill="none"
            stroke="#b89a23"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
        )}
        <path
          className="chart-line"
          pathLength="1"
          d={points(smooth)}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx={plotEnd} cy={y(smooth.at(-1)!)} r="4" fill="#e2b808" />
        {!mini &&
          values.map((v, i) => (
            <rect
              key={i}
              x={x(i) - plotSpan / 2 / values.length}
              y="0"
              width={plotSpan / values.length + 3}
              height="230"
              fill="transparent"
              onPointerEnter={() => setHover(i)}
              onPointerDown={() => setHover(i)}
            />
          ))}
        {at !== null && (
          <g pointerEvents="none">
            <line x1={x(at)} x2={x(at)} y1="10" y2="230" stroke="#9aabba" />
            <circle cx={x(at)} cy={y(values[at])} r="4" fill="#e2b808" />
            <rect
              x={Math.min(plotEnd - 110, Math.max(16, x(at) - 55))}
              y="3"
              width="110"
              height="27"
              rx="2"
              fill="#093060"
            />
            <text
              x={Math.min(plotEnd - 110, Math.max(16, x(at) - 55)) + 55}
              y="21"
              textAnchor="middle"
              fontSize="13"
              fill="white"
            >
              {values[at].toLocaleString('nl-NL', { maximumFractionDigits: 2 })}
            </text>
          </g>
        )}
        {!mini &&
          [0, Math.floor((values.length - 1) / 2), values.length - 1].map(
            (i) => (
              <text
                key={i}
                x={x(i)}
                y="257"
                textAnchor={
                  i === 0 ? 'start' : i === values.length - 1 ? 'end' : 'middle'
                }
                fontSize="12"
                fill="currentColor"
                opacity=".65"
              >
                {labels?.[i] || String(i)}
              </text>
            ),
          )}
      </svg>
      {!mini && (
        <div className="chart-access">
          <label>
            Meetpunt{' '}
            <input
              aria-label="Meetpunt in de grafiek"
              type="number"
              min={1}
              max={values.length}
              value={at === null ? values.length : at + 1}
              onChange={(e) =>
                setHover(
                  Math.max(
                    0,
                    Math.min(
                      values.length - 1,
                      (Number(e.target.value) || 1) - 1,
                    ),
                  ),
                )
              }
            />
          </label>
          <output>
            {labels?.[at ?? values.length - 1]} ·{' '}
            {values[at ?? values.length - 1].toLocaleString('nl-NL', {
              maximumFractionDigits: 2,
            })}
            {second
              ? ' / ' +
                second[at ?? values.length - 1].toLocaleString('nl-NL', {
                  maximumFractionDigits: 2,
                })
              : ''}
          </output>
        </div>
      )}
    </div>
  );
}
export function Market({ full = false }: { full?: boolean }) {
  const [chosen, setChosen] = useState('AEX'),
    [period, setPeriod] = useState('1D');
  const [feed, setFeed] = useState(demoFeed),
    [feedState, setFeedState] = useState('loading');
  useEffect(() => {
    let active = true;
    loadMarketFeed()
      .then((d) => {
        if (active) {
          setFeed(d);
          setFeedState('ready');
        }
      })
      .catch(() => {
        if (active) setFeedState('error');
      });
    return () => {
      active = false;
    };
  }, []);
  const m = feed.markets.find((m) => m.name === chosen) || feed.markets[0];
  const values = demoSeries(chosen, period);
  const times = Array.from({ length: 42 }, (_, i) =>
    period === '1D'
      ? `${9 + Math.floor((i * 510) / 41 / 60)}:${String(Math.round((i * 510) / 41) % 60).padStart(2, '0')}`
      : i === 0
        ? {
            '1W': '1 week geleden',
            '1M': '1 maand geleden',
            '1Y': '1 jaar geleden',
            '5Y': '5 jaar geleden',
          }[period] || 'Start'
        : i === 41
          ? 'Einde scenario'
          : 'Meetpunt ' + (i + 1),
  );
  return (
    <>
      <div className="market-grid">
        <div>
          <div className="chart-top">
            <Picker
              value={chosen}
              values={markets.map((m) => m.name)}
              onChange={setChosen}
              label="Kies een markt"
            />
            <Tabs value={period} onValueChange={(v) => setPeriod(String(v))}>
              <TabsList variant="line">
                {(full
                  ? ['1D', '1W', '1M', '1Y', '5Y']
                  : ['1D', '1W', '1M', '1Y']
                ).map((p) => (
                  <TabsTrigger key={p} value={p}>
                    {p}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="quote">
            <strong>
              {m.value.toLocaleString('nl-NL', {
                minimumFractionDigits: 2,
                maximumFractionDigits: chosen === 'EUR/USD' ? 4 : 2,
              })}
            </strong>
            <em className={m.change < 0 ? 'down' : ''}>
              {m.change > 0 ? '+' : ''}
              {m.change.toFixed(2).replace('.', ',')}% vandaag
            </em>
          </div>
          <p className="subtle">
            Illustratieve koersreeks · Geen live marktgegevens
          </p>
          {feedState === 'loading' ? (
            <div className="chart-loading" aria-label="Marktoverzicht laden">
              <Skeleton className="chart-skeleton" />
            </div>
          ) : (
            <Chart values={values} labels={times} />
          )}
          {feedState === 'error' && (
            <div className="data-error" role="status">
              De gegevensbron is niet bereikbaar. Je ziet de voorbeeldset.
              <button
                onClick={() => {
                  setFeedState('loading');
                  loadMarketFeed(true)
                    .then((d) => {
                      setFeed(d);
                      setFeedState('ready');
                    })
                    .catch(() => setFeedState('error'));
                }}
              >
                Opnieuw proberen
              </button>
            </div>
          )}
        </div>
        <aside className="market-list">
          <div className="eyebrow">WERELDWIJD IN BEELD</div>
          {markets
            .filter((m) => m.name !== chosen)
            .slice(0, full ? 9 : 4)
            .map((m, i) => (
              <button key={m.name} onClick={() => setChosen(m.name)}>
                <span>
                  <b>{m.name}</b>
                  <small>
                    {
                      {
                        'S&P 500': 'Verenigde Staten',
                        NASDAQ: 'Technologie',
                        DAX: 'Duitsland',
                        Bitcoin: 'Digitale activa',
                        'EUR/USD': 'Valuta',
                        'Dow Jones': 'Verenigde Staten',
                        'Euro Stoxx': 'Europa',
                        Goud: 'Edelmetaal',
                        VIX: 'Volatiliteit',
                        AEX: 'Nederland',
                      }[m.name]
                    }
                  </small>
                </span>
                <span>
                  {m.value.toLocaleString('nl-NL')}
                  <em className={m.change < 0 ? 'down' : ''}>
                    {m.change > 0 ? '+' : ''}
                    {m.change}%
                  </em>
                </span>
                <svg viewBox="0 0 60 25" aria-hidden="true">
                  <path
                    d={`M0 20L8 15L14 ${i % 2 ? 20 : 10}L22 14L30 7L37 12L43 5L51 8L60 3`}
                    stroke={m.change < 0 ? '#b7494d' : '#278464'}
                    fill="none"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            ))}
          <Link className="textlink" href="/markt/indices">
            Alle indices <ArrowRight size={16} />
          </Link>
        </aside>
      </div>
      <div className="market-bottom">
        <span>
          <i className="green-dot" /> Marktbeeld <b>Voorbeeldscenario</b>
        </span>
        <span>
          Stijger <b>ASML</b> <em>+2,34%</em>
        </span>
        <span>
          Daler <b>Philips</b> <em className="down">−1,08%</em>
        </span>
        <Link href="/markt/macro">
          Deze week op de agenda <ArrowUpRight size={15} />
        </Link>
      </div>
    </>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  link,
  href,
}: {
  eyebrow: string;
  title: string;
  link?: string;
  href?: string;
}) {
  return (
    <div className="section-title">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>
          {title}
          <span className="dot">.</span>
        </h2>
      </div>
      {link && href && (
        <Link className="textlink" href={href}>
          {link}
          <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}
export function ArticleCard({
  article,
  compact = false,
}: {
  article: (typeof articles)[number];
  compact?: boolean;
}) {
  return (
    <Link
      className={'article-card ' + (compact ? 'compact' : '')}
      href={'/artikelen/' + article.slug}
    >
      {!compact && article.image && (
        <img
          src={article.image}
          alt={
            article.slug.includes('halfgeleiders')
              ? 'Detail van een echte siliciumwafer'
              : 'Grachtenpanden in Amsterdam'
          }
          loading="lazy"
        />
      )}
      <p className="eyebrow">{article.category}</p>
      <h3>{article.title}</h3>
      {!compact && <p>{article.intro}</p>}
      <div className="article-meta">
        {article.read} min lezen <ArrowUpRight size={19} />
      </div>
    </Link>
  );
}
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
          <Tabs value={period} onValueChange={(v) => setPeriod(String(v))}>
            <TabsList variant="line">
              {['Vandaag', 'Morgen', 'Deze week', 'Volgende week'].map((p) => (
                <TabsTrigger key={p} value={p}>
                  {p}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
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
export function Newsletter({
  context = 'general',
  variant = 'feature',
}: {
  context?: string;
  variant?: 'feature' | 'compact';
}) {
  const content: Record<string, [string, string, string]> = {
    general: [
      'DE WEEK ZONDER RUIS',
      'Een beter perspectief. Elke week.',
      'Marktcontext, nieuwe analyses en handige tools voor jouw volgende stap.',
    ],
    market: [
      'DE BEURSWEEK VOOR JE UIT',
      'Weet wat er aankomt.',
      'Macrodata, opvallende earnings en de ontwikkelingen die de komende beursweek kunnen bepalen.',
    ],
    tools: [
      'BLIJF JE KEUZES ONDERZOEKEN',
      'Meer grip op je aannames.',
      'Nieuwe rekentools en verdiepende uitleg om je beleggingsplan aan te scherpen.',
    ],
    education: [
      'BLIJF JE VERDIEPEN',
      'Een inzicht verder.',
      'Artikelen die verder gaan dan de koers. Van spreiding en kosten tot je lange termijn.',
    ],
    events: [
      'ALS EERSTE OP DE HOOGTE',
      'Blijf ook buiten je feed betrokken.',
      'Ontvang nieuwe inzichten en hoor over toekomstige bijeenkomsten van Beurswatcher.',
    ],
  };
  const copy = content[context] || content.general;
  const [email, setEmail] = useState(''),
    [consent, setConsent] = useState(false),
    [state, setState] = useState('idle'),
    [message, setMessage] = useState(''),
    [unsubscribe, setUnsubscribe] = useState('');
  const uid = useId();
  async function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      setMessage(
        'Geef toestemming om je e-mailadres voor de nieuwsbrief te bewaren.',
      );
      return;
    }
    setState('loading');
    try {
      const r = await fetch('/api/nieuwsbrief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent }),
      });
      if (!r.ok) throw Error();
      const result = (await r.json()) as { unsubscribeToken?: string | null };
      if (result.unsubscribeToken)
        setUnsubscribe(
          '/afmelden?token=' + encodeURIComponent(result.unsubscribeToken),
        );
      setState('success');
      setMessage(
        'Je aanmelding is opgeslagen. Je ontvangt nog geen e-mail: de nieuwsbrief start zodra de verzending is ingericht.',
      );
    } catch {
      setState('error');
      setMessage('Opslaan is nu niet gelukt. Probeer het later opnieuw.');
    }
  }
  return (
    <section className={'newsletter newsletter-' + variant} data-reveal="clip">
      <div>
        <p className="eyebrow">{copy[0]}</p>
        <h2>{copy[1]}</h2>
        <p>{copy[2]}</p>
      </div>
      <form onSubmit={submit}>
        <label htmlFor={uid}>Jouw e-mailadres</label>
        <div className="email-row">
          <input
            id={uid}
            type="email"
            required
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jij@voorbeeld.nl"
            disabled={state === 'success'}
          />
          <button
            className="button yellow"
            disabled={state === 'loading' || state === 'success'}
          >
            {state === 'loading'
              ? 'Opslaan…'
              : state === 'success'
                ? 'Aangemeld'
                : 'Aanmelden'}
            {state === 'success' ? (
              <Check size={18} />
            ) : (
              <ArrowUpRight size={18} />
            )}
          </button>
        </div>
        <label className="consent" htmlFor={uid + '-consent'}>
          <Checkbox
            id={uid + '-consent'}
            aria-label="Toestemming voor de nieuwsbrief"
            checked={consent}
            onCheckedChange={(v) => setConsent(Boolean(v))}
            disabled={state === 'success'}
          />
          Ik geef toestemming om mijn e-mailadres voor de nieuwsbrief te
          bewaren.
        </label>
        <p className="subtle">
          Gratis. Je kunt je gegevens later laten verwijderen via de
          afmeldpagina. <Link href="/privacy">Privacy</Link>
        </p>
        <output className="form-status">{message}</output>
        {unsubscribe && (
          <p className="subtle">
            <Link href={unsubscribe}>Bewaar je persoonlijke afmeldlink</Link>
          </p>
        )}
      </form>
    </section>
  );
}
export function NumberField({
  label,
  value,
  set,
  min = 0,
  max = 10000000,
  step = 100,
}: {
  label: string;
  value: number;
  set: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  const [draft, setDraft] = useState(String(value)),
    [focused, setFocused] = useState(false);
  return (
    <label className="number-field">
      <span>{label}</span>
      <input
        type="number"
        inputMode="decimal"
        value={focused ? draft : value}
        min={min}
        max={max}
        step={step}
        onFocus={() => {
          setDraft(String(value));
          setFocused(true);
        }}
        onChange={(e) => {
          const raw = e.target.value;
          setDraft(raw);
          const parsed = Number(raw);
          if (
            raw !== '' &&
            Number.isFinite(parsed) &&
            parsed >= min &&
            parsed <= max
          )
            set(parsed);
        }}
        onBlur={() => {
          const parsed = Number(draft);
          const next =
            draft !== '' && Number.isFinite(parsed)
              ? Math.min(max, Math.max(min, parsed))
              : value;
          set(next);
          setDraft(String(next));
          setFocused(false);
        }}
      />
    </label>
  );
}
export function Calculator({ slug }: { slug: string }) {
  const [initial, setInitial] = useState(10000),
    [monthly, setMonthly] = useState(250),
    [rate, setRate] = useState(6),
    [years, setYears] = useState(20),
    [mortgage, setMortgage] = useState(3.5),
    [savings, setSavings] = useState(25000),
    [investments, setInvestments] = useState(100000),
    [debt, setDebt] = useState(0),
    [partner, setPartner] = useState(false),
    [inflation, setInflation] = useState(2),
    [taxDrag, setTaxDrag] = useState(0);
  const tax = boxTax(savings, investments, debt, partner),
    box = slug === 'box-3',
    compare = slug === 'aflossen-of-beleggen',
    compound = slug === 'compound-interest',
    contribution = compound ? 0 : monthly,
    values = Array.from({ length: years + 1 }, (_, y) =>
      futureValue(
        initial,
        compare ? 0 : contribution,
        rate - (compare ? taxDrag : 0),
        y,
      ),
    ),
    second = Array.from({ length: years + 1 }, (_, y) =>
      compare
        ? initial * Math.pow(1 + mortgage / 100, y)
        : initial + contribution * y * 12,
    ),
    total = values.at(-1)!,
    paid = compare || compound ? initial : initial + monthly * years * 12;
  function download() {
    downloadRows(
      slug + '-scenario',
      box
        ? [
            ['Uitgangspunt', 'Waarde'],
            ['Belastingjaar', taxConfig.year],
            ['Spaargeld', savings],
            ['Beleggingen', investments],
            ['Schulden', debt],
            ['Fiscale partner', partner ? 'Ja' : 'Nee'],
            ['Heffingsvrij vermogen', tax.exempt],
            ['Belastingtarief (%)', taxConfig.taxRate * 100],
            ['Indicatie belasting', tax.tax.toFixed(2)],
            ['Bron', taxSource],
            ['Status', taxConfig.status],
          ]
        : [
            ['Uitgangspunt', 'Waarde'],
            ['Startkapitaal', initial],
            ['Maandelijkse inleg', compare ? 0 : contribution],
            ['Jaarrendement (%)', rate],
            ['Looptijd (jaren)', years],
            ...(compare
              ? [
                  ['Veronderstelde belastingdruk (%)', taxDrag],
                  ['Netto hypotheekrente (%)', mortgage],
                ]
              : [['Inflatie (%)', inflation]]),
            [],
            [
              'Jaar',
              'Beleggingsscenario',
              compare ? 'Aflossingsscenario' : 'Eigen inleg',
              ...(compare ? [] : ['Koopkracht in euro’s van nu']),
            ],
            ...values.map((v, i) => [
              i,
              v.toFixed(2),
              second[i].toFixed(2),
              ...(compare ? [] : [purchasingPower(v, inflation, i).toFixed(2)]),
            ]),
            [],
            [
              'Toelichting',
              'Rekenvoorbeeld met constant rendement; geen voorspelling. Zie de uitleg op de website.',
            ],
          ],
    );
  }
  return (
    <>
      <div className="calculator">
        <div className="calc-inputs" id="invoer">
          <h2>Jouw uitgangspunten</h2>
          {box ? (
            <>
              <NumberField
                label="Bank- en spaartegoeden (€)"
                value={savings}
                set={setSavings}
              />
              <NumberField
                label="Beleggingen en overige bezittingen (€)"
                value={investments}
                set={setInvestments}
              />
              <NumberField
                label="Schulden in box 3 (€)"
                value={debt}
                set={setDebt}
              />
              <label className="consent" htmlFor="box-fiscale-partner">
                <Checkbox
                  id="box-fiscale-partner"
                  checked={partner}
                  onCheckedChange={(v) => setPartner(Boolean(v))}
                />
                Het vermogen is van mij en mijn fiscale partner samen
              </label>
              <p className="subtle">
                Waarden op 1 januari 2026. Heffingsvrij vermogen:{' '}
                {eur(tax.exempt)}.
              </p>
            </>
          ) : (
            <>
              <NumberField
                label={
                  compare
                    ? 'Eenmalig beschikbaar bedrag (€)'
                    : 'Startkapitaal (€)'
                }
                value={initial}
                set={setInitial}
              />
              {!compare && !compound && (
                <NumberField
                  label="Maandelijkse inleg (€)"
                  value={monthly}
                  set={setMonthly}
                />
              )}
              <NumberField
                label="Verondersteld jaarrendement (%)"
                value={rate}
                set={setRate}
                min={-30}
                max={30}
                step={0.1}
              />
              {compare && (
                <NumberField
                  label="Netto hypotheekrente (%)"
                  value={mortgage}
                  set={setMortgage}
                  max={20}
                  step={0.1}
                />
              )}
              {compare ? (
                <NumberField
                  label="Veronderstelde belastingdruk per jaar (%)"
                  value={taxDrag}
                  set={setTaxDrag}
                  max={5}
                  step={0.1}
                />
              ) : (
                <NumberField
                  label="Veronderstelde inflatie (%)"
                  value={inflation}
                  set={setInflation}
                  max={15}
                  step={0.1}
                />
              )}
              <NumberField
                label="Looptijd (jaren)"
                value={years}
                set={(v) => setYears(Math.round(v))}
                min={1}
                max={50}
                step={1}
              />
              <Slider
                value={[years]}
                onValueChange={(v) => setYears(Array.isArray(v) ? v[0] : v)}
                min={1}
                max={50}
                step={1}
                aria-label="Looptijd in jaren"
              />
              <div className="range-labels">
                <span>1 jaar</span>
                <span>50 jaar</span>
              </div>
            </>
          )}
        </div>
        <div className="calc-result" id="uitkomst" aria-live="polite">
          <p className="eyebrow">
            {box ? 'INDICATIE BOX 3 · 2026' : `JOUW SCENARIO NA ${years} JAAR`}
          </p>
          <strong className="result-number">
            <AnimatedNumber value={box ? tax.tax : total} format={eur} />
          </strong>
          <p>
            {box
              ? 'Geschatte jaarlijkse belasting'
              : compare
                ? 'Berekende waarde bij beleggen'
                : 'Berekend eindvermogen'}
          </p>
          {!box && (
            <Chart
              values={values}
              second={second}
              labels={values.map((_, i) => `Jaar ${i}`)}
            />
          )}
          {!box && !compare && (
            <div className="purchasing-power">
              <span>Koopkracht in euro’s van nu</span>
              <strong>
                <AnimatedNumber
                  value={purchasingPower(total, inflation, years)}
                  format={eur}
                />
              </strong>
              <small>Bij {inflation}% jaarlijkse inflatie</small>
            </div>
          )}
          {compare && (
            <div className="scenario-comparison">
              <span>
                Bij 2 procentpunt lager rendement{' '}
                <b>{eur(futureValue(initial, 0, rate - taxDrag - 2, years))}</b>
              </span>
              <span>
                Bij 2 procentpunt hoger rendement{' '}
                <b>{eur(futureValue(initial, 0, rate - taxDrag + 2, years))}</b>
              </span>
            </div>
          )}
          <div className="result-breakdown">
            {box ? (
              <>
                <span>
                  Belaste grondslag <b>{eur(tax.base)}</b>
                </span>
                <span>
                  Belastingtarief <b>{taxConfig.taxRate * 100}%</b>
                </span>
              </>
            ) : (
              <>
                <span>
                  {compare
                    ? 'Aflossen + besparing herinvesteren'
                    : 'Totale eigen inleg'}
                  <b>{eur(compare ? second.at(-1)! : paid)}</b>
                </span>
                <span>
                  {compare ? 'Verschil tussen scenario’s' : 'Berekende groei'}
                  <b>{eur(total - (compare ? second.at(-1)! : paid))}</b>
                </span>
              </>
            )}
          </div>
          <p className="subtle">
            {box
              ? 'Indicatie op basis van voorlopige forfaits. Geen berekening van werkelijk rendement of bijzondere vrijstellingen.'
              : 'Blauw: beleggingsscenario · Geel: ' +
                (compare ? 'aflossingsscenario' : 'eigen inleg') +
                '. Het resultaat is een rekenvoorbeeld, geen voorspelling.'}
          </p>
          <CompareResult
            value={box ? tax.tax : total}
            label={box ? 'Jaarbelasting' : 'Eindvermogen'}
            assumptions={
              box
                ? `${eur(savings)} sparen · ${eur(investments)} beleggen · ${eur(debt)} schuld · ${partner ? 'met' : 'zonder'} fiscale partner`
                : `${eur(initial)} start · ${years} jaar · ${rate}% rendement · ${compare ? 'besparing ' + mortgage + '% · belastingdruk ' + taxDrag + '%' : eur(contribution) + ' p/m'}`
            }
          />
          <button className="textlink" onClick={download}>
            <Download size={16} /> Download berekening
          </button>
        </div>
      </div>
      <div className="reading methodology">
        <h2>Zo werkt deze berekening</h2>
        {box ? (
          <>
            <p>
              We gebruiken 1,28% voor banktegoeden, 6,00% voor overige
              bezittingen en 2,70% voor aftrekbare schulden. De schuldendrempel
              is € 3.800 per persoon. Het heffingsvrije vermogen is € 59.357 per
              persoon en het belastingtarief is 36%.
            </p>
            <p>
              De spaar- en schuldpercentages zijn voorlopig. Bij een lager
              werkelijk rendement kan de uiteindelijke belasting anders
              uitvallen. Bijzondere vrijstellingen, buitenlandse belasting en
              partnerverdeling zijn niet uitgewerkt.
            </p>
            <Link
              className="textlink"
              href={taxSource}
              target="_blank"
              rel="noreferrer"
            >
              Bron: Belastingdienst, voorlopige aanslag 2026{' '}
              <ArrowUpRight size={16} />
            </Link>
          </>
        ) : (
          <>
            <p>
              Het model rekent met een constant effectief jaarrendement. Voor
              maandelijkse inleg wordt dit omgerekend naar een maandrendement;
              de inleg vindt aan het einde van iedere maand plaats. De
              hoofduitkomst is nominaal. De aparte koopkrachtuitkomst corrigeert
              voor jouw gekozen inflatie. Kosten en belastingen zijn niet
              verwerkt, behalve de expliciet ingevulde belastingdruk in de
              vergelijking met aflossen.
            </p>
            {compare ? (
              <p>
                Voor aflossen veronderstellen we dat de netto rentebesparing
                steeds opnieuw tegen hetzelfde percentage wordt ingezet. Dit is
                een vereenvoudigd vermogensscenario, geen
                hypotheekaflossingsschema. Boeterente, renteaftrek, resterende
                schuld en beschikbaarheid van geld zijn niet meegenomen. De
                ingevulde belastingdruk is een eenvoudige jaarlijkse
                rendementsaftrek, geen fiscale berekening. De lagere en hogere
                scenario’s zijn gevoeligheidsanalyses, geen kansen of garanties.
                Beleggen kent koersrisico; aflossen vermindert je schuld.
              </p>
            ) : (
              <p>
                Werkelijke rendementen wisselen per jaar en kunnen negatief
                zijn. Verander de uitgangspunten om ook een minder gunstig
                scenario te bekijken.
              </p>
            )}
          </>
        )}
        <p>
          <Link href="/artikelen/een-plan-voor-onrust" className="textlink">
            Verder lezen: maak een plan voor onrust <ArrowRight size={16} />
          </Link>
        </p>
      </div>
    </>
  );
}

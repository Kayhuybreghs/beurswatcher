'use client';
import { useState, useId, useEffect, useRef } from 'react';
import { useAnimatedSeries } from './motion';
// Inline SVG needs an image role; replacing it with an img would remove the chart.
/* oxlint-disable jsx-a11y/prefer-tag-over-role */

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

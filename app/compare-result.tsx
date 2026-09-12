'use client';
import { useState } from 'react';
import { GitCompareArrows, X, RotateCcw } from 'lucide-react';
const euro = (n: number) =>
  new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
export function CompareResult({
  value,
  label,
  assumptions,
}: {
  value: number;
  label: string;
  assumptions: string;
}) {
  const [saved, setSaved] = useState<{
    value: number;
    assumptions: string;
  } | null>(null);
  return (
    <section className="saved-comparison" aria-label="Vergelijk je aannames">
      <div className="comparison-heading">
        <GitCompareArrows size={16} />
        <b>Wat als je één aanname verandert?</b>
        {saved && (
          <button
            aria-label="Vergelijking wissen"
            onClick={() => setSaved(null)}
          >
            <X size={16} />
          </button>
        )}
      </div>
      {saved ? (
        <>
          <div className="comparison-pair">
            <div>
              <span>BEWAARD SCENARIO</span>
              <strong>{euro(saved.value)}</strong>
              <small>{saved.assumptions}</small>
            </div>
            <div>
              <span>JOUW HUIDIGE SCENARIO</span>
              <strong>{euro(value)}</strong>
              <small>{assumptions}</small>
            </div>
          </div>
          <div className="comparison-delta" aria-live="polite">
            <span>{label}</span>
            <b>
              {value - saved.value > 0 ? '+' : ''}
              {euro(value - saved.value)} verschil
            </b>
          </div>
          <button
            className="textlink"
            onClick={() => setSaved({ value, assumptions })}
          >
            <RotateCcw size={13} /> Huidig scenario als basis nemen
          </button>
        </>
      ) : (
        <>
          <p>
            Bewaar deze uitkomst. Pas daarna bijvoorbeeld je looptijd of inleg
            aan en zie het verschil.
          </p>
          <button
            className="comparison-save"
            onClick={() => setSaved({ value, assumptions })}
          >
            Bewaar om te vergelijken <GitCompareArrows size={15} />
          </button>
        </>
      )}
    </section>
  );
}

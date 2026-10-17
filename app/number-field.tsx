'use client';
import { useState } from 'react';

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

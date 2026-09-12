'use client';
import { useEffect, useRef, useState } from 'react';
export function useEditorialMotion(path: string) {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.12 },
    );
    for (const el of elements) {
      if (el.getBoundingClientRect().top > innerHeight * 0.92)
        el.classList.add('motion-pending');
      else el.classList.add('is-revealed');
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, [path]);
}
export function AnimatedNumber({
  value,
  format = (n: number) => Math.round(n).toLocaleString('nl-NL'),
}: {
  value: number;
  format?: (n: number) => string;
}) {
  const [display, setDisplay] = useState(value),
    current = useRef(value);
  useEffect(() => {
    const duration = matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 0
      : 420;
    const from = current.current;
    if (from === value) return;
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, duration === 0 ? 1 : (now - start) / duration);
      const next = from + (value - from) * (1 - Math.pow(1 - t, 3));
      current.current = next;
      setDisplay(next);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <span aria-label={format(value)}>{format(display)}</span>;
}
export function useAnimatedSeries(values: number[]) {
  const key = values.join(','),
    [display, setDisplay] = useState(values),
    current = useRef(values);
  useEffect(() => {
    const target = key.split(',').map(Number);
    if (current.current.join(',') === key) return;
    const duration = matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 0
      : 380;
    const prev = current.current,
      from = target.map(
        (_, i) =>
          prev[
            Math.round((i / (target.length - 1 || 1)) * (prev.length - 1))
          ] ?? target[i],
      );
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, duration === 0 ? 1 : (now - start) / duration),
        e = 1 - Math.pow(1 - t, 3),
        next = target.map((v, i) => from[i] + (v - from[i]) * e);
      current.current = next;
      setDisplay(next);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [key]);
  return display;
}

'use client';
import Link from './site-link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { toolItems } from './data';
import { ToolVisual, useVisualDeck } from './tool-visual';
export function ToolShelf({ limit }: { limit?: number }) {
  const { root, active, events } = useVisualDeck();
  return (
    <div className="tool-shelf" ref={root}>
      {toolItems.slice(0, limit).map((t, i) => (
        <Link
          className="tool-card"
          href={'/tools/' + t.slug}
          key={t.slug}
          {...events(t.slug)}
        >
          <div className="shelf-top">
            <span>0{i + 1}</span>
            <span>GRATIS TOOL</span>
            <ArrowUpRight size={20} />
          </div>
          <h3>{t.title}</h3>
          <p>{t.text}</p>
          <ToolVisual slug={t.slug} active={active === t.slug} />
          <span className="shelf-action">
            Open de calculator <ArrowRight size={16} />
          </span>
        </Link>
      ))}
    </div>
  );
}

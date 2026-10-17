'use client';
import { useState } from 'react';
import { ArrowRight, Check, Share2 } from 'lucide-react';
import Link from './site-link';
import { articles } from './data';
import { KnowledgeFigure } from './editorial-pages';
import { SectionTitle, ArticleCard } from './editorial-cards';
import { Newsletter } from './newsletter';
import { NextSteps } from './journeys';
import { ArticleProgress } from './reading-paths';
export default function Article({ slug }: { slug: string }) {
  const a = articles.find((a) => a.slug === slug);
  const [copied, setCopied] = useState(false);
  if (!a) return null;
  return (
    <>
      <ArticleProgress />
      <div className="article-heading">
        <Link href="/artikelen" className="textlink">
          ← Alle artikelen
        </Link>
        <p className="eyebrow">{a.category} · REDACTIONEEL VOORBEELD</p>
        <h1>{a.title}</h1>
        <p className="dek">{a.intro}</p>
        <div className="article-meta">
          <span className="mini-logo">BW.</span>Beurswatcher{' '}
          <span>{a.read} min lezen</span>
          <button
            className="textlink"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}{' '}
            {copied ? 'Link gekopieerd' : 'Deel artikel'}
          </button>
        </div>
      </div>
      <div className="article-diagram">
        <KnowledgeFigure topic={a.category} />
        <div>
          <span className="eyebrow">JE LEEST OVER</span>
          {a.sections.map(([h], i) => (
            <a href={'#onderdeel-' + i} key={h}>
              <span>0{i + 1}</span>
              {h}
              <ArrowRight size={16} />
            </a>
          ))}
        </div>
      </div>
      <div className="article-layout">
        <aside>
          <p className="eyebrow">IN DIT ARTIKEL</p>
          {a.sections.map(([h], i) => (
            <Link href={'#onderdeel-' + i} key={h}>
              {h}
            </Link>
          ))}
        </aside>
        <article className="reading">
          <div className="takeaway">
            <p className="eyebrow">OM TE ONTHOUDEN</p>
            <p>
              {a.category === 'ETF'
                ? 'Bekijk de index, de spreiding en alle kosten samen. Een wereldwijde naam zegt nog niet hoe je geld verdeeld is.'
                : a.sections[0][1]}
            </p>
          </div>
          {a.sections.map(([h, p], i) => (
            <section id={'onderdeel-' + i} key={h}>
              <h2>{h}</h2>
              <p>{p}</p>
            </section>
          ))}
          <NextSteps topic={a.category} from="article" />
          <p className="subtle">
            Algemene educatieve voorbeeldinhoud. Geen persoonlijk
            beleggingsadvies. Rendement is onzeker en je kunt je inleg
            verliezen.
          </p>
        </article>
      </div>
      <section className="section">
        <SectionTitle eyebrow="ARTIKELEN" title="Lees ook deze uitleg" />
        <div className="three-grid">
          {articles
            .filter((b) => b.slug !== slug)
            .sort(
              (b, c) =>
                Number(c.category === a.category) -
                Number(b.category === a.category),
            )
            .slice(0, 3)
            .map((b) => (
              <ArticleCard key={b.slug} article={b} />
            ))}
        </div>
      </section>
      <Newsletter context="education" variant="compact" />
    </>
  );
}

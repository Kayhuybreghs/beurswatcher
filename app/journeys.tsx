'use client';
import Link from './site-link';
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Calculator as CalcIcon,
  Link2,
} from 'lucide-react';
import { articles, toolItems, partners } from './data';
import { journeys } from './journey-data';
export function NextSteps({
  topic = 'Strategie',
  from = 'tool',
}: {
  topic?: string;
  from?: 'tool' | 'article' | 'market' | 'hub' | 'partner';
}) {
  if (topic === 'Reizen')
    return (
      <section className="next-steps">
        <div className="next-heading">
          <span className="eyebrow">JOUW VOLGENDE STAP</span>
          <h2>Welke voordelen passen bij jouw reizen?</h2>
          <p>Begin bij de kaartkosten en wat je zelf gebruikt.</p>
        </div>
        <div className="next-options">
          <Link href="/partners/american-express">
            <span className="step-label">VERKEN DE VOORWAARDEN</span>
            <h3>American Express</h3>
            <p>Reisvoordelen, kosten en aandachtspunten op een rij.</p>
            <span className="textlink">
              Bekijk de afwegingen <ArrowUpRight size={17} />
            </span>
          </Link>
          <Link
            href={
              from === 'article'
                ? '/beleggen/reizen'
                : '/artikelen/reisvoordelen-afwegen'
            }
          >
            <span className="step-label">MEER CONTEXT</span>
            <h3>Van voordeel naar werkelijk gebruik.</h3>
            <span className="textlink">
              Verder in reizen <ArrowRight size={17} />
            </span>
          </Link>
        </div>
        <p className="disclosure">
          Commerciële samenwerking · Beurswatcher werkt samen met American
          Express.
        </p>
      </section>
    );
  const j = journeys[topic] || journeys.Strategie,
    a = articles.find((a) => a.slug === j.article)!,
    t = toolItems.find((t) => t.slug === j.tool)!,
    p = partners.find((p) => p.slug === j.partner)!;
  return (
    <section className="next-steps" data-reveal="line">
      <div className="next-heading">
        <span className="eyebrow">JOUW VOLGENDE STAP</span>
        <h2>{j.question}</h2>
        <p>Een cijfer krijgt waarde als je weet wat je ermee kunt.</p>
      </div>
      <div className="next-options">
        <Link
          href={
            from === 'article' ? '/tools/' + t.slug : '/artikelen/' + a.slug
          }
        >
          <span className="step-label">
            01 · {from === 'article' ? 'REKEN HET DOOR' : 'BEGRIJP DE CONTEXT'}
          </span>
          {from === 'article' ? <CalcIcon size={21} /> : <BookOpen size={21} />}
          <h3>{from === 'article' ? t.title : a.title}</h3>
          <span className="textlink">
            {from === 'article' ? 'Open gratis tool' : 'Lees de uitleg'}{' '}
            <ArrowRight size={17} />
          </span>
        </Link>
        {from === 'partner' ? (
          <Link href={'/tools/' + t.slug}>
            <span className="step-label">02 · REKEN HET DOOR</span>
            <CalcIcon size={21} />
            <h3>{t.title}</h3>
            <p>{t.text}</p>
            <span className="textlink">
              Open gratis tool <ArrowRight size={17} />
            </span>
          </Link>
        ) : (
          <Link href={'/partners/' + p.slug}>
            <span className="step-label">02 · VERKEN EEN DIENST</span>
            <Link2 size={21} />
            <h3>{p.name}</h3>
            <p>{j.reason}</p>
            <span className="textlink">
              Bekijk de afwegingen <ArrowUpRight size={17} />
            </span>
          </Link>
        )}
      </div>
      {from !== 'partner' && (
        <p className="disclosure">
          Commerciële samenwerking · Beurs Watcher werkt samen met {p.name}.
          Lees de toelichting voordat je een keuze maakt.
        </p>
      )}
    </section>
  );
}

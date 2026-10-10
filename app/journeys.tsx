'use client';
import Link from './site-link';
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Calculator as CalcIcon,
  Link2,
} from 'lucide-react';
import { toolItems, partners } from './data';
import { journeys } from './journey-data';
import { topicContent } from './topic-content';
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
          <span className="eyebrow">UITLEG EN VOORWAARDEN</span>
          <h2>Welke voordelen passen bij jouw reizen?</h2>
          <p>Begin bij de kaartkosten en wat je zelf gebruikt.</p>
        </div>
        <div className="next-options">
          <Link href="/partners/american-express">
            <span className="step-label">AANBIEDER BEKIJKEN</span>
            <h3>American Express</h3>
            <p>Reisvoordelen, kosten en aandachtspunten op een rij.</p>
            <span className="textlink">
              Bekijk kosten en voorwaarden <ArrowUpRight size={17} />
            </span>
          </Link>
          <Link href="/verdieping/reizen">
            <span className="step-label">UITLEG LEZEN</span>
            <h3>Wat zijn kaartvoordelen voor jou waard?</h3>
            <span className="textlink">
              Lees over reizen en kaartvoordelen <ArrowRight size={17} />
            </span>
          </Link>
        </div>
        <p className="disclosure">
          Deze informatie is geen persoonlijke aanbeveling. Controleer de
          actuele kosten en voorwaarden bij de aanbieder.
        </p>
      </section>
    );
  const j = journeys[topic] || journeys.Strategie,
    explanation = topicContent[j.topic],
    t = toolItems.find((t) => t.slug === j.tool)!,
    p = partners.find((p) => p.slug === j.partner)!;
  return (
    <section className="next-steps" data-reveal="line">
      <div className="next-heading">
        <span className="eyebrow">BIJ DIT ONDERWERP</span>
        <h2>{j.question}</h2>
        <p>
          {from === 'article'
            ? 'Gebruik de bijpassende tool om met je eigen bedragen te rekenen.'
            : 'Lees de uitleg over dit onderwerp en controleer de aannames bij je berekening.'}
        </p>
      </div>
      <div className="next-options">
        <Link
          href={
            from === 'article' ? '/tools/' + t.slug : '/verdieping/' + j.topic
          }
        >
          <span className="step-label">
            01 · {from === 'article' ? 'BEREKENEN' : 'UITLEG LEZEN'}
          </span>
          {from === 'article' ? <CalcIcon size={21} /> : <BookOpen size={21} />}
          <h3>{from === 'article' ? t.title : explanation.title}</h3>
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
            <span className="step-label">02 · AANBIEDER BEKIJKEN</span>
            <Link2 size={21} />
            <h3>{p.name}</h3>
            <p>{j.reason}</p>
            <span className="textlink">
              Bekijk mogelijkheden en voorwaarden <ArrowUpRight size={17} />
            </span>
          </Link>
        )}
      </div>
      {from !== 'partner' && (
        <p className="disclosure">
          De informatie over {p.name} beschrijft de dienst en aandachtspunten.
          Het is geen persoonlijke aanbeveling.
        </p>
      )}
    </section>
  );
}

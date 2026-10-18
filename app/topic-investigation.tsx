import { ArrowRight } from 'lucide-react';
import Link from './site-link';
import type { TopicInvestigation } from './topic-investigations';
import './content-analysis.css';

export function TopicInvestigationBlock({
  investigation,
}: {
  investigation: TopicInvestigation;
}) {
  return (
    <section
      className="topic-investigation"
      id="uitgewerkt"
      aria-labelledby="onderzoek-title"
    >
      <div className="investigation-intro">
        <span className="eyebrow">VAN UITLEG NAAR EEN CONCRETE VRAAG</span>
        <h2 id="onderzoek-title">{investigation.title}</h2>
        <p>{investigation.intro}</p>
        <small>{investigation.evidence}</small>
        <a className="investigation-source-link" href="#onderwerp-bronnen">
          Bronnen bij deze uitleg
        </a>
      </div>
      <div className="investigation-work">
        <ol>
          {investigation.steps.map(([title, explanation], i) => (
            <li key={title}>
              <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{title}</h3>
                <p>{explanation}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="investigation-conclusion">
          <h3>Wat volgt hieruit?</h3>
          <p>{investigation.conclusion}</p>
        </div>
        <div className="investigation-trap">
          <h3>Deze conclusie zou te snel zijn</h3>
          <p>{investigation.trap}</p>
        </div>
        {investigation.guide && (
          <Link
            className="textlink"
            href={'/uitleg/' + investigation.guide.slug}
          >
            {investigation.guide.label}{' '}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}

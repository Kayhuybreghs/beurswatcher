import { ArrowRight, ArrowUpRight, Calculator } from 'lucide-react';
import Link from './site-link';
import { guides, guideSources } from './guide-data';
import { toolItems, topics } from './data';
import { LearningBreadcrumbs } from './learning-breadcrumbs';
import { topicGroups } from './topic-groups';
import { guideAnalyses } from './guide-analyses';
import { GuideAnalysisBlock } from './guide-analysis';
import { guideSourceNotes } from './guide-source-notes';
import { educationRevision } from './education-revision';

export function GuidePage({ slug }: { slug: string }) {
  const g = guides.find((g) => g.slug === slug);
  if (!g) return null;
  const analysis = guideAnalyses[g.slug];
  const evidence = (
    <aside
      className="guide-evidence"
      id="bron"
      aria-label="Bron en eigen berekening"
    >
      <h3>Bron en eigen berekening</h3>
      <p>{guideSourceNotes[g.slug]}</p>
      <a href={guideSources[g.source][1]} target="_blank" rel="noreferrer">
        Lees de achtergrondbron: {guideSources[g.source][0]} ↗
      </a>
    </aside>
  );
  const tool = toolItems.find((t) => t.slug === g.tool)!;
  const related = guides.filter(
    (item) => item.tool === g.tool && item.slug !== g.slug,
  );
  return (
    <>
      <header className="guide-hero">
        <LearningBreadcrumbs current={g.title} />
        <span className="eyebrow">
          BEURSWATCHER / {g.category.toUpperCase()} / UITLEG
        </span>
        <h1>{g.title}</h1>
        <p>{g.problem}</p>
        <div className="guide-byline">
          {analysis
            ? 'Uitleg en rekenanalyse van Beurswatcher'
            : 'Uitleg van Beurswatcher'}{' '}
          <span>·</span> Algemene educatie
        </div>
        <p className="education-revision">
          Inhoud bijgewerkt en rekenvoorbeelden gecontroleerd op{' '}
          <time dateTime={educationRevision.iso}>
            {educationRevision.label}
          </time>
          .
        </p>
      </header>
      <section className="guide-answer" aria-label="Kort antwoord">
        <span className="eyebrow">HET KORTE ANTWOORD</span>
        <p>{g.summary}</p>
        <Link className="button yellow" href={'/tools/' + g.tool}>
          Open {tool.title.toLowerCase()} <ArrowRight size={18} />
        </Link>
      </section>
      <div className="guide-layout">
        <nav className="guide-toc" aria-label="Inhoud van deze uitleg">
          <span className="eyebrow">IN DEZE UITLEG</span>
          {analysis && (
            <a href="#rekenanalyse">Bekijk de scenario’s en berekening</a>
          )}
          {g.sections.map(([h], i) => (
            <a href={'#uitleg-' + i} key={h}>
              {String(i + 1).padStart(2, '0')} / {h}
            </a>
          ))}
          <a href="#voorbeeld">Rekenvoorbeeld</a>
          <a href="#bron">Bron en eigen berekening</a>
          <a href="#vragen">Veelgestelde vragen</a>
          <Link href={'/tools/' + g.tool}>
            <Calculator size={18} /> {tool.title}
          </Link>
        </nav>
        <article className="guide-reading">
          {analysis && <GuideAnalysisBlock analysis={analysis} slug={g.slug} />}
          {analysis && evidence}
          {g.sections.map(([h, p], i) => (
            <section id={'uitleg-' + i} key={h}>
              <span className="eyebrow">0{i + 1} / BEGRIJPEN</span>
              <h2>{h}</h2>
              <p>{p}</p>
            </section>
          ))}
          <section className="guide-example" id="voorbeeld">
            <span className="eyebrow">EEN CONCREET VOORBEELD</span>
            <h2>{g.example[0]}</h2>
            {g.example[1].split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <small>
              Illustratie van de berekening. Geen voorspelling of persoonlijk
              advies.
            </small>
          </section>
          {!analysis && evidence}
          <section className="guide-calculator">
            <Calculator size={24} />
            <h2>Bereken het met je eigen bedragen.</h2>
            <p>
              Gebruik de {tool.title.toLowerCase()} om je eigen aannames te
              vergelijken. Bij de tool lees je precies wat de berekening wel en
              niet meeneemt.
            </p>
            <Link className="button" href={'/tools/' + g.tool}>
              Open {tool.title.toLowerCase()} <ArrowRight size={18} />
            </Link>
          </section>
          <section className="guide-faq" id="vragen">
            <span className="eyebrow">VEELGESTELDE VRAGEN</span>
            <h2>Veelgestelde vragen.</h2>
            {g.faq.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </section>
          <div className="guide-source">
            <p>
              Deze uitleg beschrijft algemene begrippen en de werking van de
              Beurswatcher-tool. Het is geen persoonlijk financieel advies. Je
              persoonlijke situatie kan afwijken. Bij beleggen kun je je inleg
              verliezen.
            </p>
          </div>
        </article>
      </div>
      <section className="guide-related">
        <span className="eyebrow">GERELATEERDE UITLEG</span>
        <h2>Meer over deze berekening.</h2>
        <div className="guide-card-grid">
          {related.map((r) => (
            <Link
              className="guide-card"
              key={r.slug}
              href={'/uitleg/' + r.slug}
            >
              <span>{r.category}</span>
              <h3>{r.title}</h3>
              <p>{r.summary}</p>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
        <nav
          className="guide-topic-links"
          aria-label="Onderwerpen bij deze uitleg"
        >
          {g.topics.map((slug) => (
            <Link className="textlink" key={slug} href={'/verdieping/' + slug}>
              {topicGroups.find((group) => group.slug === slug)?.name ||
                topics.find(([topicSlug]) => topicSlug === slug)?.[1]}
              <ArrowRight size={17} />
            </Link>
          ))}
        </nav>
      </section>
    </>
  );
}

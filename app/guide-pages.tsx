import { ArrowRight, ArrowUpRight, BookOpen, Calculator } from 'lucide-react';
import Link from './site-link';
import { guides, guideSources } from './guide-data';
import { toolItems, topics } from './data';
import { LearningBreadcrumbs } from './learning-breadcrumbs';
import { topicGroups } from './topic-groups';

export function ToolReading({ tool }: { tool: string }) {
  const items = guides.filter((g) => g.tool === tool);
  return (
    <section className="tool-reading" id="uitleg">
      <span className="eyebrow">UITLEG BIJ DEZE TOOL</span>
      <h2>De uitleg achter de uitkomst.</h2>
      <p>
        Lees hoe deze berekening werkt, welke aannames meetellen en wat de
        uitkomst wel en niet zegt.
      </p>
      <div className="guide-card-grid">
        {items.map((g) => (
          <Link className="guide-card" key={g.slug} href={'/uitleg/' + g.slug}>
            <BookOpen size={20} />
            <h3>{g.title}</h3>
            <p>{g.summary}</p>
            <span>
              Lees de uitleg <ArrowUpRight size={18} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
export function GuidePage({ slug }: { slug: string }) {
  const g = guides.find((g) => g.slug === slug);
  if (!g) return null;
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
          Uitleg van Beurswatcher <span>·</span> Algemene educatie
        </div>
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
          {g.sections.map(([h], i) => (
            <a href={'#uitleg-' + i} key={h}>
              {String(i + 1).padStart(2, '0')} / {h}
            </a>
          ))}
          <a href="#voorbeeld">Rekenvoorbeeld</a>
          <a href="#vragen">Veelgestelde vragen</a>
          <Link href={'/tools/' + g.tool}>
            <Calculator size={18} /> {tool.title}
          </Link>
        </nav>
        <article className="guide-reading">
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
            <p>{g.example[1]}</p>
            <small>
              Illustratie van de berekening. Geen voorspelling of persoonlijk
              advies.
            </small>
          </section>
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
            <a
              href={guideSources[g.source][1]}
              target="_blank"
              rel="noreferrer"
            >
              Achtergrondbron: {guideSources[g.source][0]} ↗
            </a>
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

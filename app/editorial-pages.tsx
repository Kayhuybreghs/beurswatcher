'use client';
import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Layers,
  BookOpen,
} from 'lucide-react';
import Link from './site-link';
import { LearningBreadcrumbs } from './learning-breadcrumbs';
import { topics, toolItems } from './data';
import { learningLibrary } from './learning-library';
import { topicContent } from './topic-content';
import { linkedTopicText } from './topic-inline-links';
import { guideIndex as guides } from './guide-index';
import { Newsletter } from './newsletter';
import { TopicDirectory, TopicStories } from './topic-directory';
import { topicInvestigations } from './topic-investigations';
import { TopicInvestigationBlock } from './topic-investigation';
import { educationRevision } from './education-revision';

const relatedTopics: Record<string, string[]> = {
  'markt-economie': ['vermogen', 'aandelen'],
  belasting: ['vermogen', 'pensioen'],
  beginnen: ['etfs', 'strategie'],
  etfs: ['portfolio', 'dividend'],
  aandelen: ['dividend', 'portfolio'],
  dividend: ['aandelen', 'etfs'],
  strategie: ['portfolio', 'beginnen'],
  portfolio: ['strategie', 'etfs'],
  vermogen: ['belasting', 'pensioen'],
  pensioen: ['belasting', 'vermogen'],
  zakelijk: ['belasting', 'strategie'],
  reizen: ['vermogen', 'beginnen'],
};
export function KnowledgeFigure({ topic = 'ETF' }: { topic?: string }) {
  return (
    <div
      className="knowledge-figure"
      aria-label={
        topic === 'ETF'
          ? 'Schematische illustratie: één ETF kan verschillende bedrijven, sectoren en regio’s bevatten. De verdeling hangt af van de gekozen index.'
          : 'Vier uitgangspunten voor beleggen: je doel, looptijd, risico en afspraken.'
      }
    >
      <div className="knowledge-figure-top">
        <span>
          {topic === 'ETF'
            ? 'WAT ZIT ER IN EEN ETF?'
            : 'WAT LEG JE VAST VOORDAT JE BELEGT?'}
        </span>
        <Layers size={19} />
      </div>
      <div className="knowledge-tiles" aria-hidden="true">
        {(topic === 'ETF'
          ? ['Bedrijven', 'Sectoren', 'Regio’s', 'Jouw ETF']
          : ['Je doel', 'Je looptijd', 'Je risico', 'Je afspraken']
        ).map((x, i) => (
          <div key={x} className={'knowledge-tile tile-' + i}>
            <span>0{i + 1}</span>
            <b>{x}</b>
            {i === 3 ? <ArrowUpRight /> : <i />}
          </div>
        ))}
      </div>
      <p>
        {topic === 'ETF'
          ? 'De index bepaalt de inhoud. De naam vertelt niet alles.'
          : 'Leg vast waarvoor je belegt, hoelang en wat je doet bij een daling.'}
      </p>
    </div>
  );
}
export function ArticleArchive({
  topic,
  search = false,
}: {
  topic?: string;
  search?: boolean;
}) {
  const [category, setCategory] = useState(topic || 'Alles'),
    [query, setQuery] = useState('');
  const filtered = learningLibrary.filter(
    (a) =>
      (category === 'Alles' || a.category === category) &&
      `${a.title} ${a.intro} ${a.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <header className="journal-masthead">
        <div>
          <span className="eyebrow">BEURSWATCHER / VERDIEPING</span>
          <h1>
            {search ? (
              'Zoek financiële uitleg.'
            ) : (
              <>
                De verdieping<span>.</span>
              </>
            )}
          </h1>
        </div>
        <p>
          Lees hoe beleggen, vermogen en pensioen werken. Kies een onderwerp
          voor de basisuitleg of zoek hieronder een artikel.
        </p>
      </header>
      {!search && !topic && <TopicDirectory />}
      <section className="journal-library" id="blogs">
        <div className="journal-search">
          <h2>Alle artikelen.</h2>
          <label className="search-field">
            <Search size={19} />
            <input
              type="search"
              aria-label="Zoek artikelen"
              placeholder="Een onderwerp, een vraag…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <fieldset
          className="article-category-filters"
          aria-label="Filter artikelen op onderwerp"
        >
          {['Alles', ...new Set(learningLibrary.map((a) => a.category))].map(
            (c) => (
              <button
                type="button"
                key={c}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ),
          )}
        </fieldset>
        <div className="journal-count" aria-live="polite" aria-atomic="true">
          <span>
            {filtered.length} {filtered.length === 1 ? 'artikel' : 'artikelen'}
          </span>
          <span>Uitleg en rekenanalyses van Beurswatcher</span>
        </div>
        {filtered.length ? (
          <div className="journal-grid">
            {filtered.map((a, i) => (
              <Link className="journal-story" key={a.slug} href={a.href}>
                {'image' in a && a.image && (
                  <Image
                    className="journal-story-image"
                    src={a.image}
                    alt={
                      a.category === 'Aandelen'
                        ? 'Siliciumwafer van dichtbij'
                        : 'Grachtenpanden in Amsterdam'
                    }
                    width={640}
                    height={240}
                    sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 30vw"
                    loading="lazy"
                  />
                )}
                <div className="journal-story-meta">
                  <span>
                    {a.category} · {a.analysis ? 'Rekenanalyse' : 'Uitleg'}
                  </span>
                  <span>{a.read} MIN LEZEN</span>
                </div>
                <h2>{a.title}</h2>
                <p>{a.intro}</p>
                <div className="journal-story-end">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <ArrowUpRight size={23} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty">
            <BookOpen />
            <h2>Geen artikelen gevonden.</h2>
            <p>Probeer een ander zoekwoord of verwijder het onderwerpfilter.</p>
            <button
              className="button"
              onClick={() => {
                setQuery('');
                setCategory('Alles');
              }}
            >
              Bekijk alle artikelen
            </button>
          </div>
        )}
      </section>
      <Newsletter context="education" variant="compact" />
    </>
  );
}
export function InvestingHub({ sub }: { sub?: string }) {
  const topic = topics.find(([slug]) => slug === sub);
  const content = sub ? topicContent[sub] : undefined;
  const investigation = sub ? topicInvestigations[sub] : undefined;
  const tool = toolItems.find((item) => item.slug === content?.tool);
  if (topic && content)
    return (
      <>
        <header className="topic-masthead">
          <LearningBreadcrumbs current={content.title} />
          <span className="eyebrow">VERDIEPING / {topic[1].toUpperCase()}</span>
          <h1>
            {content.title}
            <span className="dot">.</span>
          </h1>
          <p>{content.summary}</p>
          <p className="education-revision">
            Uitleg van Beurswatcher · bijgewerkt op{' '}
            <time dateTime={educationRevision.iso}>
              {educationRevision.label}
            </time>
            . De rekenvoorbeelden zijn illustratief.
          </p>
          <div className="topic-chapters">
            <a href="#begrijpen">01 Het onderwerp begrijpen</a>
            {investigation && <a href="#uitgewerkt">Een vraag uitgewerkt</a>}
            {content.example && (
              <a href="#praktijkvoorbeeld">02 Praktijkvoorbeeld</a>
            )}
            {guides.some((guide) => guide.topics.includes(sub!)) && (
              <a href="#onderwerp-blogs">Artikelen bij dit onderwerp</a>
            )}
            <a href="#onderwerp-vragen">Veelgestelde vragen</a>
          </div>
        </header>
        <section className="topic-foundation" id="begrijpen">
          <div className="topic-foundation-intro">
            <span className="eyebrow">UITLEG PER ONDERDEEL</span>
            <h2>Wat moet je hierover weten?</h2>
            <p>Lees de uitleg van boven naar beneden of kies een onderdeel.</p>
            <nav
              className="topic-contents"
              aria-label="Inhoud van dit onderwerp"
            >
              {content.sections.map(([heading], i) => (
                <a key={heading} href={'#hoofdstuk-' + i}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {heading}
                </a>
              ))}
            </nav>
          </div>
          <div className="topic-foundation-chapters">
            {content.sections.map(([h, p], i) => (
              <section key={h} id={'hoofdstuk-' + i}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{h}</h3>
                  {p.split('\n\n').map((paragraph) => {
                    const parts = linkedTopicText(sub || '', i, paragraph);
                    return (
                      <p key={paragraph}>
                        {parts.before}
                        {parts.link && (
                          <Link
                            className="topic-inline-link"
                            href={parts.link.href}
                          >
                            {parts.link.text}
                          </Link>
                        )}
                        {parts.after}
                      </p>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>
        {investigation && (
          <TopicInvestigationBlock investigation={investigation} />
        )}
        {content.example && (
          <section className="topic-worked-example" id="praktijkvoorbeeld">
            <span className="eyebrow">PRAKTIJKVOORBEELD</span>
            <h2>{content.example.title}</h2>
            <p>{content.example.body}</p>
            <dl>
              {content.example.figures.map(([value, label]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <small>
              Vereenvoudigd rekenvoorbeeld, geen voorspelling of persoonlijk
              advies.
            </small>
          </section>
        )}
        {content.comparison && (
          <section className="topic-distinction">
            <span className="eyebrow">HET VERSCHIL BEGRIJPEN</span>
            <h2>{content.comparison.title}</h2>
            <dl>
              {content.comparison.rows.map(([term, explanation]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{explanation}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        <section className="topic-checklist">
          <span className="eyebrow">CONTROLEER JE AANNAMES</span>
          <h2>Vier vragen om jezelf te stellen.</h2>
          <ul>
            {content.checklist.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>
        <TopicStories slug={sub!} />
        {sub !== 'reizen' && (
          <section className="topic-next-action" id="startpunt">
            <span className="eyebrow">BIJPASSENDE REKENTOOL</span>
            <h2>{tool?.title}.</h2>
            <p>
              Vul je eigen bedragen in en vergelijk de uitkomsten. De uitleg bij
              de tool beschrijft de aannames en beperkingen.
            </p>
            <div>
              <Link className="button" href={'/tools/' + content.tool}>
                Open {tool?.title.toLowerCase()} <ArrowRight size={18} />
              </Link>
              <Link
                className="textlink"
                href={
                  '/uitleg/' + guides.find((g) => g.tool === content.tool)!.slug
                }
              >
                Lees de uitleg bij deze berekening <ArrowUpRight size={18} />
              </Link>
            </div>
          </section>
        )}
        <section className="guide-faq topic-faq" id="onderwerp-vragen">
          <span className="eyebrow">VEELGESTELDE VRAGEN</span>
          <h2>Vragen over {topic[1].toLowerCase()}.</h2>
          {content.faq.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
        {content.sources && (
          <aside
            className="topic-sources"
            id="onderwerp-bronnen"
            aria-label="Bronnen bij dit onderwerp"
          >
            <h2>Bronnen bij deze uitleg.</h2>
            <p>
              Algemene uitleg van Beurswatcher. Onderstaande primaire bronnen
              helpen je begrippen en voorwaarden te controleren. Regels en
              producten kunnen wijzigen; voorbeelden zijn geen persoonlijke
              aanbeveling.
            </p>
            <p>
              {sub === 'reizen'
                ? 'Kaartvoordelen en verzekeringen hebben eigen voorwaarden. Deze uitleg is geen persoonlijk financieel advies.'
                : sub === 'belasting'
                  ? 'Dit is algemene fiscale informatie, geen persoonlijk belastingadvies. De uitkomst hangt af van het belastingjaar en je persoonlijke situatie.'
                  : sub === 'pensioen'
                    ? 'Geen persoonlijk financieel advies. Pensioenvermogen is niet vrij opneembaar; fiscaal voordeel hangt af van je situatie. Bij beleggen kun je geld verliezen.'
                    : 'Geen persoonlijk beleggingsadvies. Rendement is onzeker en je kunt je inleg verliezen.'}
            </p>
            <ul>
              {content.sources.map(([label, url]) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
        <section className="topic-next-chapter" id="verder">
          <div>
            <span className="eyebrow">GERELATEERDE ONDERWERPEN</span>
            <h2>Lees ook deze uitleg.</h2>
          </div>
          <div>
            {topics
              .filter(([s]) => relatedTopics[sub!]?.includes(s))
              .slice(0, 2)
              .map(([s, name]) => (
                <Link href={'/verdieping/' + s} key={s}>
                  {name}
                  <ArrowUpRight size={20} />
                </Link>
              ))}
          </div>
        </section>
        <Newsletter context="education" variant="compact" />
      </>
    );
  return (
    <>
      <section className="learn-hero">
        <div>
          <span className="eyebrow">BEURSWATCHER / VERDIEPING</span>
          <h1>
            Leer hoe beleggen werkt.
            <br />
            <em>Begin bij de basis.</em>
          </h1>
          <p>
            Lees over beleggingsvormen, risico, kosten en pensioen. Kies het
            onderwerp dat aansluit bij je vraag.
          </p>
          <Link href="#kies-onderwerp" className="button yellow">
            Bekijk alle onderwerpen <ArrowRight size={18} />
          </Link>
        </div>
        <div className="learn-compass">
          <span>WAT WIL JIJ BEGRIJPEN?</span>
          {[
            ['01', 'Hoe begin ik met beleggen?', 'beginnen'],
            ['02', 'Wat koop ik eigenlijk?', 'etfs'],
            ['03', 'Hoe bouw ik aan later?', 'pensioen'],
          ].map(([n, h, s]) => (
            <Link href={'/verdieping/' + s} key={s}>
              <span>{n}</span>
              <h2>{h}</h2>
              <ArrowUpRight size={21} />
            </Link>
          ))}
          <small>
            Algemene uitleg, met voorbeelden en veelgestelde vragen.
          </small>
        </div>
      </section>
      <div id="kies-onderwerp">
        <TopicDirectory />
      </div>
      <section className="learn-spotlight">
        <KnowledgeFigure />
        <div>
          <span className="eyebrow">ÉÉN ONDERWERP UITGELICHT</span>
          <h2>
            Wat zit er
            <br />
            in een ETF?
          </h2>
          <p>
            De index bepaalt in welke bedrijven een ETF belegt. Lees hoe je
            spreiding, overlap en fondskosten kunt beoordelen.
          </p>
          <Link className="button" href="/verdieping/etfs">
            Lees de uitleg over ETF’s <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <Newsletter context="education" variant="compact" />
    </>
  );
}

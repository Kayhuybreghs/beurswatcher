'use client';
/* oxlint-disable next/no-img-element -- Existing licensed editorial photos. */
import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Layers,
  BookOpen,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from './site-link';
import { topics } from './data';
import { learningLibrary } from './learning-library';
import { topicContent } from './topic-content';
import { linkedTopicText } from './topic-inline-links';
import { guides } from './guide-data';
import { Newsletter } from './widgets';
import { TopicDirectory, TopicStories } from './topic-directory';
export function KnowledgeFigure({ topic = 'ETF' }: { topic?: string }) {
  return (
    <div
      className="knowledge-figure"
      aria-label={
        topic === 'ETF'
          ? 'Schematische illustratie: één ETF kan verschillende bedrijven, sectoren en regio’s bevatten. De verdeling hangt af van de gekozen index.'
          : 'Een beleggingsplan verbindt je doel, horizon, spreiding en kosten.'
      }
    >
      <div className="knowledge-figure-top">
        <span>
          {topic === 'ETF'
            ? 'WAT ZIT ER IN JE MANDJE?'
            : 'MAAK HET GROTERE PLAATJE ZICHTBAAR'}
        </span>
        <Layers size={19} />
      </div>
      <div className="knowledge-tiles" aria-hidden="true">
        {(topic === 'ETF'
          ? ['Bedrijven', 'Sectoren', 'Regio’s', 'Jouw ETF']
          : ['Je doel', 'Je horizon', 'Je risico', 'Je plan']
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
          : 'Eerst begrijpen. Dan een keuze maken.'}
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
              'Waar ben je nieuwsgierig naar?'
            ) : (
              <>
                De verdieping<span>.</span>
              </>
            )}
          </h1>
        </div>
        <p>
          Eigen verhalen. Meer achtergrond.
          <br />
          Betere vragen. Je eigen afweging.
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
        <Tabs
          className="category-tabs"
          value={category}
          onValueChange={(v) => setCategory(String(v))}
        >
          <TabsList variant="line" aria-label="Filter artikelen">
            {['Alles', ...new Set(learningLibrary.map((a) => a.category))].map(
              (c) => (
                <TabsTrigger key={c} value={c}>
                  {c}
                </TabsTrigger>
              ),
            )}
          </TabsList>
        </Tabs>
        <div className="journal-count">
          <span>
            {filtered.length} {filtered.length === 1 ? 'artikel' : 'artikelen'}
          </span>
          <span>Uitleg van Beurswatcher · voorbeeldblogs apart gemarkeerd</span>
        </div>
        {filtered.length ? (
          <div className="journal-grid">
            {filtered.map((a, i) => (
              <Link className="journal-story" key={a.slug} href={a.href}>
                {'image' in a && a.image && (
                  <img
                    className="journal-story-image"
                    src={a.image}
                    alt={
                      a.category === 'Aandelen'
                        ? 'Siliciumwafer van dichtbij'
                        : 'Grachtenpanden in Amsterdam'
                    }
                    width={640}
                    height={240}
                    loading="lazy"
                  />
                )}
                <div className="journal-story-meta">
                  <span>
                    {a.category} · {a.example ? 'Voorbeeldblog' : 'Uitleg'}
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
            <h2>Hier hebben we nog geen verhaal over.</h2>
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
  if (topic && content)
    return (
      <>
        <header className="topic-masthead">
          <Link className="textlink" href="/artikelen#onderwerpen">
            ← Alle onderwerpen
          </Link>
          <span className="eyebrow">VERDIEPING / {topic[1].toUpperCase()}</span>
          <h1>
            {content.title}
            <span className="dot">.</span>
          </h1>
          <p>{content.summary}</p>
          <div className="topic-chapters">
            <a href="#begrijpen">01 Het onderwerp begrijpen</a>
            {content.example && (
              <a href="#praktijkvoorbeeld">02 Praktijkvoorbeeld</a>
            )}
            <a href="#onderwerp-blogs">Verder lezen</a>
            <a href="#onderwerp-vragen">Veelgestelde vragen</a>
          </div>
        </header>
        <section className="topic-foundation" id="begrijpen">
          <div className="topic-foundation-intro">
            <span className="eyebrow">DE VERDIEPING IN</span>
            <h2>Van begrip naar afweging.</h2>
            <p>Lees het hele verhaal of begin bij jouw vraag.</p>
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
        {content.example && (
          <section className="topic-worked-example" id="praktijkvoorbeeld">
            <span className="eyebrow">ZO WORDT HET CONCREET</span>
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
          <span className="eyebrow">MAAK HET JOUW VRAAG</span>
          <h2>Vier dingen om bij stil te staan.</h2>
          <ul>
            {content.checklist.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>
        <TopicStories slug={sub!} />
        {sub !== 'reizen' && (
          <section className="topic-next-action" id="startpunt">
            <span className="eyebrow">VAN UITLEG NAAR INZICHT</span>
            <h2>Onderzoek je eigen scenario.</h2>
            <p>
              Begin met de uitleg en reken daarna met je eigen bedragen en
              aannames.
            </p>
            <div>
              <Link className="button" href={'/tools/' + content.tool}>
                Open de rekentool <ArrowRight size={18} />
              </Link>
              <Link
                className="textlink"
                href={
                  '/uitleg/' + guides.find((g) => g.tool === content.tool)!.slug
                }
              >
                Lees eerst hoe het werkt <ArrowUpRight size={18} />
              </Link>
            </div>
          </section>
        )}
        <section className="guide-faq topic-faq" id="onderwerp-vragen">
          <span className="eyebrow">VEELGESTELDE VRAGEN</span>
          <h2>Nog even dit.</h2>
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
            aria-label="Bronnen bij dit onderwerp"
          >
            <h2>Zelf verder controleren.</h2>
            <p>
              Algemene uitleg van Beurswatcher. Onderstaande primaire bronnen
              helpen je begrippen en voorwaarden te controleren. Regels en
              producten kunnen wijzigen; voorbeelden zijn geen persoonlijke
              aanbeveling.
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
            <span className="eyebrow">HET VOLGENDE HOOFDSTUK</span>
            <h2>Je plan hangt samen.</h2>
          </div>
          <div>
            {topics
              .filter(
                ([s]) =>
                  s !== sub &&
                  ['strategie', 'portfolio', 'pensioen'].includes(s),
              )
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
          <span className="eyebrow">BEURSWATCHER / BELEGGEN</span>
          <h1>
            Je hoeft niet
            <br />
            alles te weten.
            <br />
            <em>Begin bij één vraag.</em>
          </h1>
          <p>
            Een goed begin, een sterker plan of meer grip op je portefeuille.
            Kies waar jij verder wilt kijken.
          </p>
          <Link href="#kies-onderwerp" className="button yellow">
            Vind jouw startpunt <ArrowRight size={18} />
          </Link>
        </div>
        <div className="learn-compass">
          <span>WAT WIL JIJ BEGRIJPEN?</span>
          {[
            ['01', 'Hoe begin ik?', 'strategie'],
            ['02', 'Wat koop ik eigenlijk?', 'etfs'],
            ['03', 'Hoe bouw ik aan later?', 'pensioen'],
          ].map(([n, h, s]) => (
            <Link href={'/verdieping/' + s} key={s}>
              <span>{n}</span>
              <h2>{h}</h2>
              <ArrowUpRight size={21} />
            </Link>
          ))}
          <small>Van de eerste vraag naar een bewuste keuze.</small>
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
            Je ETF verdient
            <br />
            een tweede blik.
          </h2>
          <p>
            Wereldwijd klinkt breed. Maar waar beleg je eigenlijk in? Ontdek de
            vragen achter het fonds.
          </p>
          <Link className="button" href="/verdieping/etfs">
            Begin met ETF’s <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <Newsletter context="education" variant="compact" />
    </>
  );
}

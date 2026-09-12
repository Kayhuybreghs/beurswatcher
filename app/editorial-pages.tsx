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
import { articles, topics } from './data';
import { TopicBrief } from './reading-paths';
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
  const filtered = articles.filter(
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
          <span className="eyebrow">BEURSWATCHER / ARTIKELEN</span>
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
          Meer achtergrond.
          <br />
          Betere vragen. Je eigen afweging.
        </p>
      </header>
      {!search && !topic && <TopicDirectory />}
      <section className="journal-library">
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
            {['Alles', ...new Set(articles.map((a) => a.category))].map((c) => (
              <TabsTrigger key={c} value={c}>
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="journal-count">
          <span>
            {filtered.length} {filtered.length === 1 ? 'artikel' : 'artikelen'}
          </span>
          <span>Educatieve voorbeelden · vorm en inhoud in ontwikkeling</span>
        </div>
        {filtered.length ? (
          <div className="journal-grid">
            {filtered.map((a, i) => (
              <Link
                className="journal-story"
                key={a.slug}
                href={'/artikelen/' + a.slug}
              >
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
                  <span>{a.category}</span>
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
const topicCopy: Record<string, string> = {
  Beginnen: 'De eerste vragen, vóór je eerste belegging.',
  Vermogen: 'Van buffer tot doelbedrag. Geef je geld een bestemming.',
  Aandelen: 'Begrijp het bedrijf achter de koers.',
  ETF: 'Breed beleggen begint bij weten wat je koopt.',
  Strategie: 'Maak een plan dat bij jouw horizon past.',
  Dividend: 'Uitkeren of herbeleggen: onderzoek het verschil.',
  Pensioen: 'Van later een concreet plan maken.',
  Portfolio: 'Losse posities. Eén totaalbeeld.',
  Zakelijk: 'Geef vrij bedrijfsvermogen een eigen horizon.',
  Reizen: 'De waarde van voordelen begint bij jouw gebruik.',
};
export function InvestingHub({ sub }: { sub?: string }) {
  const topic = topics.find(([slug]) => slug === sub);
  if (topic)
    return (
      <>
        <header className="topic-masthead">
          <Link className="textlink" href="/beleggen">
            ← Alle onderwerpen
          </Link>
          <span className="eyebrow">BELEGGEN / {topic[1].toUpperCase()}</span>
          <h1>
            {topic[1]}
            <span className="dot">.</span>
          </h1>
          <p>
            {topicCopy[topic[1]] ||
              'Onderzoek de basis. Maak je eigen afweging.'}
          </p>
          <div className="topic-chapters">
            <a href="#begrijpen">01 Begrijpen</a>
            <a href="#startpunt">02 Zelf onderzoeken</a>
            <a href="#verder">03 Verder kijken</a>
          </div>
        </header>
        <section className="topic-lesson" id="begrijpen">
          <div>
            <span className="eyebrow">BEGIN HIER</span>
            <h2>
              {topic[1] === 'ETF'
                ? 'Eén fonds. Meerdere vragen.'
                : 'De basis van ' + topic[1].toLowerCase() + '.'}
            </h2>
            <p>
              {topic[1] === 'ETF'
                ? 'Een ETF volgt doorgaans een index. Dat maakt het mogelijk om via één fonds in meerdere bedrijven te beleggen. Hoe breed die spreiding echt is, zie je pas als je naar de inhoud kijkt.'
                : topicCopy[topic[1]]}
            </p>
            {topic[1] === 'ETF' && (
              <ul>
                <li>Welke landen en sectoren zitten erin?</li>
                <li>Hoeveel gewicht hebben de grootste bedrijven?</li>
                <li>Welke kosten betaal je in én buiten het fonds?</li>
              </ul>
            )}
            <span className="template-note">
              {topic[1] === 'ETF'
                ? 'Voorbeelduitwerking · ETF'
                : 'Deze themapagina krijgt nog een verdere redactionele uitwerking.'}
            </span>
          </div>
          <KnowledgeFigure topic={topic[1]} />
        </section>
        <TopicStories slug={sub!} />
        <div id="startpunt">
          <TopicBrief topic={topic[1]} />
        </div>
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
                <Link href={'/beleggen/' + s} key={s}>
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
            <Link href={'/beleggen/' + s} key={s}>
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
          <Link className="button" href="/beleggen/etfs">
            Begin met ETF’s <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <Newsletter context="education" variant="compact" />
    </>
  );
}

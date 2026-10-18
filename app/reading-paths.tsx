'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Search, BookOpen } from 'lucide-react';
import Link from './site-link';
import { toolItems, partners } from './data';
import { guideIndex as guides } from './guide-index';
import { journeys } from './journey-data';
import { topicContent } from './topic-content';
export function ArticleProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const article = document.querySelector('.reading'),
          box = article?.getBoundingClientRect();
        if (ref.current && box) {
          const max = Math.max(1, box.height - innerHeight * 0.6);
          ref.current.style.transform = `scaleX(${Math.min(1, Math.max(0, -box.top / max))})`;
        }
        frame = 0;
      });
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => {
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="article-progress"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden="true"
    />
  );
}
const topicQuestions: Record<string, [string, string]> = {
  ETF: [
    'Wat zit er in een ETF?',
    'Lees welke index een fonds volgt, hoe het is gespreid en welke kosten je betaalt.',
  ],
  Pensioen: [
    'Uit welke onderdelen bestaat je pensioen?',
    'Begin bij je bestaande pensioen en je gewenste toekomst. Reken daarna terug naar wat je zelf kunt opbouwen.',
  ],
  Strategie: [
    'Welke regels gebruik je bij beleggen?',
    'Je horizon, je inleg en je reactie op een daling: maak de uitgangspunten zichtbaar voordat je een product kiest.',
  ],
  Aandelen: [
    'Het bedrijf achter de koers.',
    'Onderzoek het verhaal, bekijk je aannames en houd oog voor de samenhang in je portefeuille.',
  ],
  Dividend: [
    'Wat gebeurt er met ontvangen dividend?',
    'Onderzoek koersgroei en dividend samen. Reken vervolgens het verschil tussen uitgeven en herbeleggen door.',
  ],
  Zakelijk: [
    'Welk bedrijfsvermogen is beschikbaar om te beleggen?',
    'Bedrijfsreserves en beleggingsvermogen hebben verschillende doelen. Maak dat onderscheid eerst.',
  ],
  Portfolio: [
    'Hoe is je portefeuille verdeeld?',
    'Bekijk waar je beleggingen staan, hoe ze verdeeld zijn en welke concentraties je niet direct ziet.',
  ],
  Reizen: [
    'Welke reisvoordelen gebruik je echt?',
    'Vergelijk kaartkosten met reisvoordelen die je werkelijk gebruikt. Lees de voorwaarden voordat je kiest.',
  ],
};
export function TopicBrief({ topic }: { topic: string }) {
  const j = journeys[topic] || journeys.Strategie,
    copy = topicQuestions[topic] || topicQuestions.Strategie;
  return (
    <section className="topic-brief">
      <div>
        <span className="eyebrow">UITLEG EN TOOLS BIJ DIT ONDERWERP</span>
        <h2>{copy[0]}</h2>
        <p>{copy[1]}</p>
      </div>
      <div>
        <Link href={'/verdieping/' + j.topic}>
          Lees de uitleg: {topicContent[j.topic].title} <ArrowRight size={16} />
        </Link>
        {topic !== 'Reizen' && (
          <Link href={'/tools/' + j.tool}>
            Reken zelf een scenario door <ArrowUpRight size={16} />
          </Link>
        )}
        <Link href={'/partners/' + j.partner}>
          Bekijk de aanbieder en voorwaarden <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
const searchItems = [
  ...Object.entries(topicContent).map(([slug, topic]) => ({
    title: topic.title,
    text: topic.summary,
    href: '/verdieping/' + slug,
    type: 'Onderwerpen',
  })),
  ...guides.map((g) => ({
    title: g.title,
    text: g.summary,
    href: '/uitleg/' + g.slug,
    type: 'Uitleg',
  })),
  ...toolItems.map((t) => ({
    title: t.title,
    text: t.text,
    href: '/tools/' + t.slug,
    type: 'Tools',
  })),
  ...partners.map((p) => ({
    title: p.name,
    text: p.text,
    href: '/partners/' + p.slug,
    type: 'Partners',
  })),
  {
    title: 'Events van Beurswatcher',
    text: 'Lees welke bijeenkomsten op de planning staan.',
    href: '/events',
    type: 'Platform',
  },
  {
    title: 'Over Daniel en Beurswatcher',
    text: 'Waarom Daniel Beurswatcher begon en wat je op de website kunt vinden.',
    href: '/over',
    type: 'Platform',
  },
  {
    title: 'Zakelijk samenwerken',
    text: 'Een voorstel voor een campagne, Reel, event of samenwerking.',
    href: '/zakelijk-samenwerken',
    type: 'Platform',
  },
  {
    title: 'Marktoverzicht',
    text: 'Indices, stijgers en dalers en de macro-agenda voor Nederland en de Verenigde Staten.',
    href: '/markt',
    type: 'Platform',
  },
];
export function SiteSearch() {
  const [query, setQuery] = useState(''),
    [kind, setKind] = useState('Alles');
  const results = searchItems.filter(
    (x) =>
      (kind === 'Alles' || kind === x.type) &&
      `${x.title} ${x.text}`
        .toLocaleLowerCase('nl-NL')
        .includes(query.trim().toLocaleLowerCase('nl-NL')),
  );
  return (
    <>
      <section className="search-intro">
        <span className="eyebrow">ZOEKEN OP BEURSWATCHER</span>
        <h1>Zoek uitleg, tools en onderwerpen.</h1>
        <div className="search-field">
          <Search />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek een onderwerp, tool of dienst…"
            aria-label="Zoek op Beurswatcher"
          />
        </div>
      </section>
      <fieldset
        className="catalog-filters search-filters"
        aria-label="Filter zoekresultaten"
      >
        <div className="filter-options">
          {[
            'Alles',
            'Onderwerpen',
            'Uitleg',
            'Tools',
            'Partners',
            'Platform',
          ].map((s) => (
            <button
              className="filter-option"
              type="button"
              key={s}
              aria-pressed={kind === s}
              onClick={() => setKind(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>
      <output className="search-count" aria-live="polite" aria-atomic="true">
        {results.length} {results.length === 1 ? 'resultaat' : 'resultaten'}
      </output>
      <div className="search-results">
        {results.map((x) => (
          <Link key={x.href} href={x.href}>
            <span>{x.type}</span>
            <div>
              <h2>{x.title}</h2>
              <p>{x.text}</p>
            </div>
            <ArrowUpRight size={23} />
          </Link>
        ))}
      </div>
      {!results.length && (
        <div className="empty">
          <BookOpen />
          <h2>Nog niets gevonden.</h2>
          <p>Probeer een breder onderwerp of bekijk alle onderdelen.</p>
          <button
            className="button"
            onClick={() => {
              setQuery('');
              setKind('Alles');
            }}
          >
            Toon alles
          </button>
        </div>
      )}
    </>
  );
}

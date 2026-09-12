'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Search, BookOpen } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from './site-link';
import { articles, toolItems, partners } from './data';
import { journeys } from './journey-data';
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
    'Breed beleggen. Bewust kiezen.',
    'Een fondsnaam vertelt niet alles. Onderzoek spreiding, kosten en hoe een ETF in jouw plan past.',
  ],
  Pensioen: [
    'Maak later een beetje concreter.',
    'Begin bij je bestaande pensioen en je gewenste toekomst. Reken daarna terug naar wat je zelf kunt opbouwen.',
  ],
  Strategie: [
    'Een plan voor alle beursdagen.',
    'Je horizon, je inleg en je reactie op een daling: maak de uitgangspunten zichtbaar voordat je een product kiest.',
  ],
  Aandelen: [
    'Het bedrijf achter de koers.',
    'Onderzoek het verhaal, bekijk je aannames en houd oog voor de samenhang in je portefeuille.',
  ],
  Dividend: [
    'Wat doet een uitkering voor jouw plan?',
    'Onderzoek koersgroei en dividend samen. Reken vervolgens het verschil tussen uitgeven en herbeleggen door.',
  ],
  Zakelijk: [
    'Geef vrij vermogen een eigen horizon.',
    'Bedrijfsreserves en beleggingsvermogen hebben verschillende doelen. Maak dat onderscheid eerst.',
  ],
  Portfolio: [
    'Van losse posities naar overzicht.',
    'Bekijk waar je beleggingen staan, hoe ze verdeeld zijn en welke concentraties je niet direct ziet.',
  ],
  Reizen: [
    'De waarde zit in jouw gebruik.',
    'Vergelijk kaartkosten met reisvoordelen die je werkelijk gebruikt. Lees de voorwaarden voordat je kiest.',
  ],
};
export function TopicBrief({ topic }: { topic: string }) {
  const j = journeys[topic] || journeys.Strategie,
    copy = topicQuestions[topic] || topicQuestions.Strategie;
  return (
    <section className="topic-brief">
      <div>
        <span className="eyebrow">JOUW STARTPUNT</span>
        <h2>{copy[0]}</h2>
        <p>{copy[1]}</p>
      </div>
      <div>
        <Link href={'/artikelen/' + j.article}>
          Begin met de uitleg <ArrowRight size={16} />
        </Link>
        {topic !== 'Reizen' && (
          <Link href={'/tools/' + j.tool}>
            Reken zelf een scenario door <ArrowUpRight size={16} />
          </Link>
        )}
        <Link href={'/partners/' + j.partner}>
          Ontdek een passende dienst <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
const searchItems = [
  ...articles.map((a) => ({
    title: a.title,
    text: a.intro,
    href: '/artikelen/' + a.slug,
    type: 'Artikelen',
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
    type: 'Samenwerkingen',
  })),
  {
    title: 'Beleggersborrel Utrecht',
    text: 'Een avond met andere beleggers op 14 oktober 2026.',
    href: '/events/beleggersborrel-utrecht-2026',
    type: 'Platform',
  },
  {
    title: 'Over Daniël en Beurswatcher',
    text: 'Van korte Instagram-inzichten naar je eigen plan.',
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
    text: 'Koersen, macro, earnings en context. Voorbeeldweergave.',
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
        <span className="eyebrow">EEN VRAAG IS EEN GOED BEGIN</span>
        <h1>
          Waar wil je
          <br />
          verder in kijken?
        </h1>
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
      <Tabs
        className="catalog-filters"
        value={kind}
        onValueChange={(v) => setKind(String(v))}
      >
        <TabsList aria-label="Filter zoekresultaten">
          {['Alles', 'Artikelen', 'Tools', 'Samenwerkingen', 'Platform'].map(
            (s) => (
              <TabsTrigger key={s} value={s}>
                {s}
              </TabsTrigger>
            ),
          )}
        </TabsList>
      </Tabs>
      <output className="search-count">
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

'use client';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Layers,
  ChartNoAxesCombined,
  Network,
  Wallet,
  Landmark,
  Building2,
  Plane,
  Globe,
  ReceiptText,
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Link from './site-link';
import { useState } from 'react';
import { learningLibrary } from './learning-library';
export const topicGroups = [
  {
    slug: 'markt-economie',
    name: 'Markt & economie',
    description:
      'Inflatie, rente en groei lezen — en begrijpen waarom de beurs reageert.',
    icon: Globe,
    categories: ['Markt', 'Macro'],
    links: [
      ['De economische basis', '/verdieping/markt-economie'],
      ['De macroagenda', '/markt/macro'],
      ['Koopkracht onderzoeken', '/tools/inflatie'],
    ],
  },
  {
    slug: 'belasting',
    name: 'Belasting & vermogen',
    description:
      'Box 3, werkelijk rendement en het verschil met toeslagen en pensioen.',
    icon: ReceiptText,
    categories: [],
    links: [
      ['Belasting & vermogen begrijpen', '/verdieping/belasting'],
      ['Box 3: wat berekent de tool?', '/uitleg/box-3-indicatie-2026'],
      ['Box 3 indicatie maken', '/tools/box-3'],
    ],
  },
  {
    slug: 'beginnen',
    name: 'Beginnen met beleggen',
    description:
      'Van buffer en beleggingsvormen naar spreiding, kosten en je eerste plan.',
    icon: Compass,
    categories: ['Strategie'],
    links: [
      ['Je eerste stappen', '/verdieping/beginnen'],
      ['Een plan voor onrust', '/artikelen/een-plan-voor-onrust'],
      ['Reken met jouw inleg', '/tools/rendement'],
    ],
  },
  {
    slug: 'etfs',
    name: 'ETF’s',
    description:
      'De index, overlap, uitkeringen, valuta en kosten van een fonds begrijpen.',
    icon: Layers,
    categories: ['ETF'],
    links: [
      ['Alles over ETF’s', '/verdieping/etfs'],
      ['Wereldwijde spreiding', '/artikelen/wereld-etf-basis'],
      ['ETF-kosten vergelijken', '/tools/etf-kosten'],
    ],
  },
  {
    slug: 'aandelen',
    name: 'Aandelen & dividend',
    description: 'Bedrijfsresultaten, waardering en dividend samen beoordelen.',
    icon: ChartNoAxesCombined,
    categories: ['Aandelen', 'Dividend'],
    links: [
      ['Aandelen begrijpen', '/verdieping/aandelen'],
      ['Dividend ontdekken', '/verdieping/dividend'],
      ['Dividend doorrekenen', '/tools/dividend'],
    ],
  },
  {
    slug: 'strategie',
    name: 'Strategie & portefeuille',
    description:
      'Je verdeling kiezen, instappen, herbalanceren en omgaan met tegenvallers.',
    icon: Network,
    categories: ['Strategie', 'Portfolio'],
    links: [
      ['Strategie & horizon', '/verdieping/strategie'],
      ['Je portefeuille overzien', '/verdieping/portfolio'],
      ['Ineens of gespreid beleggen', '/tools/lump-sum-dca'],
    ],
  },
  {
    slug: 'vermogen',
    name: 'Sparen & vermogen',
    description:
      'Buffers, spaardoelen, inflatie en bescherming van je banktegoed.',
    icon: Wallet,
    categories: ['Vermogen'],
    links: [
      ['Sparen & vermogen', '/verdieping/vermogen'],
      ['Inflatie & koopkracht', '/tools/inflatie'],
      ['Je doelvermogen', '/tools/doelvermogen'],
      ['Box 3 indicatie', '/tools/box-3'],
    ],
  },
  {
    slug: 'pensioen',
    name: 'Pensioen',
    description:
      'AOW, werkgeverspensioen, lijfrente en eerder stoppen met werken.',
    icon: Landmark,
    categories: ['Pensioen'],
    links: [
      ['De onderdelen van pensioen', '/verdieping/pensioen'],
      ['Pensioen buiten de koers', '/artikelen/pensioen-buiten-de-koers'],
      ['Reken terug vanuit je doel', '/tools/doelvermogen'],
    ],
  },
  {
    slug: 'zakelijk',
    name: 'Zakelijk vermogen',
    description:
      'Van rekeningstand naar vrije kasruimte, reserves en een langere bestemming.',
    icon: Building2,
    categories: ['Zakelijk'],
    links: [
      ['Zakelijk beleggen', '/verdieping/zakelijk'],
      ['Reken met je horizon', '/tools/rendement'],
    ],
  },
  {
    slug: 'reizen',
    name: 'Reizen & voordelen',
    description:
      'De echte waarde van punten, bonussen en kaartvoordelen berekenen.',
    icon: Plane,
    categories: ['Reizen'],
    links: [
      ['Reizen & rewards', '/verdieping/reizen'],
      ['Reisvoordelen afwegen', '/artikelen/reisvoordelen-afwegen'],
    ],
  },
];
export function TopicDirectory() {
  return (
    <section className="topic-directory" id="onderwerpen">
      <div className="directory-heading">
        <div>
          <span className="eyebrow">DE HOOFDONDERWERPEN</span>
          <h2>
            Waar wil je meer
            <br />
            <em>over weten?</em>
          </h2>
        </div>
        <p>
          Klap een onderwerp open. Alle uitleg, deelonderwerpen en rekentools
          bij elkaar.
        </p>
      </div>
      <Accordion className="topic-accordion" multiple>
        {topicGroups.map((group, i) => (
          <AccordionItem
            key={group.slug}
            value={group.slug}
            className="topic-directory-item"
          >
            <AccordionTrigger>
              <span className="topic-directory-icon">
                <group.icon size={23} />
              </span>
              <span className="topic-directory-copy">
                <b>{group.name}</b>
                <span>{group.description}</span>
              </span>
              <span className="topic-directory-number">
                {String(i + 1).padStart(2, '0')}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="topic-directory-expanded">
                <p>Jouw startpunten binnen {group.name.toLowerCase()}.</p>
                <div>
                  {group.links.map(([label, href]) => (
                    <Link key={href} href={href}>
                      {label}
                      <ArrowRight size={17} />
                    </Link>
                  ))}
                </div>
                <Link
                  className="directory-all"
                  href={'/verdieping/' + group.slug}
                >
                  Open het onderwerp <ArrowUpRight size={17} />
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
export function TopicStories({ slug }: { slug: string }) {
  const [query, setQuery] = useState('');
  const group = topicGroups.find(
    (g) =>
      g.slug === slug ||
      (slug === 'dividend' && g.slug === 'aandelen') ||
      (slug === 'portfolio' && g.slug === 'strategie'),
  );
  const matches = learningLibrary.filter(
    (a) =>
      (a.example
        ? group?.categories.includes(a.category)
        : a.topics.includes(slug)) &&
      `${a.title} ${a.intro}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );

  return (
    <section className="topic-story-collection" id="onderwerp-blogs">
      <span className="eyebrow">DIEPER IN DIT ONDERWERP</span>
      <h2>
        Uitleg & blogs over {group?.name.toLowerCase() || 'dit onderwerp'}.
      </h2>
      <label className="topic-blog-search">
        Zoek binnen dit onderwerp
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Een vraag of trefwoord…"
        />
      </label>
      <p aria-live="polite">
        {matches.length
          ? `${matches.length} ${matches.length === 1 ? 'artikel' : 'artikelen'}`
          : query
            ? 'Geen blogs gevonden. Probeer een ander trefwoord.'
            : 'De eerste blogs binnen dit onderwerp volgen nog.'}
      </p>
      <div>
        {matches.map((a) => (
          <Link key={a.slug} href={a.href}>
            <span>
              {a.example ? 'VOORBEELDBLOG' : 'UITLEG'} · {a.read} MIN LEZEN
            </span>
            <h3>{a.title}</h3>
            <p>{a.intro}</p>
            <ArrowUpRight size={20} />
          </Link>
        ))}
      </div>
    </section>
  );
}

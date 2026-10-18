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
import { topicGroups } from './topic-groups';
const topicIcons = {
  Globe,
  ReceiptText,
  Compass,
  Layers,
  ChartNoAxesCombined,
  Network,
  Wallet,
  Landmark,
  Building2,
  Plane,
};
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
      <Accordion className="topic-accordion" multiple hiddenUntilFound>
        {topicGroups.map((group, i) => {
          const Icon = topicIcons[group.icon];
          return (
            <AccordionItem
              key={group.slug}
              value={group.slug}
              className="topic-directory-item"
            >
              <AccordionTrigger>
                <span className="topic-directory-icon">
                  <Icon size={23} />
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
                  <p>Uitleg en hulpmiddelen over {group.name.toLowerCase()}.</p>
                  <div>
                    {group.links
                      .filter(
                        ([, href]) => href !== '/verdieping/' + group.slug,
                      )
                      .map(([label, href]) => (
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
                    Lees over {group.name.toLowerCase()}{' '}
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
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
  const name =
    slug === 'dividend'
      ? 'dividend'
      : slug === 'portfolio'
        ? 'portefeuilles'
        : group?.name.toLowerCase() || 'dit onderwerp';
  const matches = learningLibrary.filter(
    (a) =>
      a.topics.includes(slug) &&
      `${a.title} ${a.intro}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  if (!learningLibrary.some((article) => article.topics.includes(slug)))
    return null;

  return (
    <section className="topic-story-collection" id="onderwerp-blogs">
      <span className="eyebrow">DIEPER IN DIT ONDERWERP</span>
      <h2>Verder lezen over {name}.</h2>
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
            ? 'Geen artikelen gevonden. Probeer een ander trefwoord.'
            : 'De uitleg en het uitgewerkte voorbeeld staan hierboven. Er zijn nog geen aanvullende artikelen over dit onderwerp.'}
      </p>
      <div>
        {matches.map((a) => (
          <Link key={a.slug} href={a.href}>
            <span>
              {a.analysis ? 'REKENANALYSE' : 'UITLEG'} · {a.read} MIN LEZEN
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

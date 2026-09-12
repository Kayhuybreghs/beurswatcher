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
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Link from './site-link';
import { articles } from './data';
export const topicGroups = [
  {
    slug: 'beginnen',
    name: 'Beginnen met beleggen',
    description: 'Van je eerste vraag naar een eigen plan.',
    icon: Compass,
    categories: ['Strategie'],
    links: [
      ['Je eerste stappen', '/beleggen/beginnen'],
      ['Een plan voor onrust', '/artikelen/een-plan-voor-onrust'],
      ['Reken met jouw inleg', '/tools/rendement'],
    ],
  },
  {
    slug: 'etfs',
    name: 'ETF’s',
    description: 'Wat je koopt, hoe je spreidt en wat het kost.',
    icon: Layers,
    categories: ['ETF'],
    links: [
      ['Alles over ETF’s', '/beleggen/etfs'],
      ['Wereldwijde spreiding', '/artikelen/wereld-etf-basis'],
      ['ETF-kosten vergelijken', '/tools/etf-kosten'],
    ],
  },
  {
    slug: 'aandelen',
    name: 'Aandelen & dividend',
    description: 'Het bedrijf, de waardering en de uitkering.',
    icon: ChartNoAxesCombined,
    categories: ['Aandelen', 'Dividend'],
    links: [
      ['Aandelen begrijpen', '/beleggen/aandelen'],
      ['Dividend ontdekken', '/beleggen/dividend'],
      ['Dividend doorrekenen', '/tools/dividend'],
    ],
  },
  {
    slug: 'strategie',
    name: 'Strategie & portefeuille',
    description: 'Losse keuzes laten samenwerken in één plan.',
    icon: Network,
    categories: ['Strategie', 'Portfolio'],
    links: [
      ['Strategie & horizon', '/beleggen/strategie'],
      ['Je portefeuille overzien', '/beleggen/portfolio'],
      ['Ineens of gespreid beleggen', '/tools/lump-sum-dca'],
    ],
  },
  {
    slug: 'vermogen',
    name: 'Sparen & vermogen',
    description: 'Je buffer, koopkracht en doelen voor later.',
    icon: Wallet,
    categories: ['Vermogen'],
    links: [
      ['Sparen & vermogen', '/beleggen/vermogen'],
      ['Inflatie & koopkracht', '/tools/inflatie'],
      ['Je doelvermogen', '/tools/doelvermogen'],
      ['Box 3 indicatie', '/tools/box-3'],
    ],
  },
  {
    slug: 'pensioen',
    name: 'Pensioen',
    description: 'Breng je toekomst dichterbij, stap voor stap.',
    icon: Landmark,
    categories: ['Pensioen'],
    links: [
      ['De onderdelen van pensioen', '/beleggen/pensioen'],
      ['Pensioen buiten de koers', '/artikelen/pensioen-buiten-de-koers'],
      ['Reken terug vanuit je doel', '/tools/doelvermogen'],
    ],
  },
  {
    slug: 'zakelijk',
    name: 'Zakelijk vermogen',
    description: 'Vrij bedrijfsvermogen een eigen horizon geven.',
    icon: Building2,
    categories: ['Zakelijk'],
    links: [
      ['Zakelijk beleggen', '/beleggen/zakelijk'],
      ['Reken met je horizon', '/tools/rendement'],
    ],
  },
  {
    slug: 'reizen',
    name: 'Reizen & voordelen',
    description: 'Voordelen afwegen vanuit wat jij gebruikt.',
    icon: Plane,
    categories: ['Reizen'],
    links: [
      ['Reizen & rewards', '/beleggen/reizen'],
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
                  href={'/beleggen/' + group.slug}
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
  const group = topicGroups.find(
    (g) =>
      g.slug === slug ||
      (slug === 'dividend' && g.slug === 'aandelen') ||
      (slug === 'portfolio' && g.slug === 'strategie'),
  );
  const matches = articles.filter((a) =>
    group?.categories.includes(a.category),
  );
  if (!matches.length) return null;
  return (
    <section className="topic-story-collection">
      <span className="eyebrow">DIEPER IN DIT ONDERWERP</span>
      <h2>Verder lezen.</h2>
      <div>
        {matches.map((a) => (
          <Link key={a.slug} href={'/artikelen/' + a.slug}>
            <span>{a.read} MIN LEZEN</span>
            <h3>{a.title}</h3>
            <p>{a.intro}</p>
            <ArrowUpRight size={20} />
          </Link>
        ))}
      </div>
    </section>
  );
}

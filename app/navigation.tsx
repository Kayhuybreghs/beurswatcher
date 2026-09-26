'use client';
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions -- The group catches Escape from its links/buttons and hover from pointer users; all actions are also available on the labelled button. */
import { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import Link from './site-link';
import { toolItems, partners } from './data';
import { topicGroups } from './topic-directory';

const sections = [
  {
    title: 'Markt',
    href: '/markt',
    links: [
      ['Marktoverzicht', '/markt'],
      ['Macro-agenda · NL & VS', '/markt/macro'],
      ['Indices', '/markt#indices'],
      ['Koersbewegingen', '/markt#bewegingen'],
      ['Eigen verdieping', '/artikelen'],
    ],
  },
  {
    title: 'Tools',
    href: '/tools',
    links: [
      ['Alle rekentools', '/tools'],
      ...toolItems.map((t) => [t.title, '/tools/' + t.slug]),
    ],
  },
  {
    title: 'Verdieping',
    href: '/artikelen',
    links: [
      ['Alle blogs & onderwerpen', '/artikelen'],
      ...topicGroups.map((t) => [t.name, '/verdieping/' + t.slug]),
    ],
  },
  {
    title: 'Partners',
    href: '/partners',
    links: [
      ['Alle partners vergelijken', '/partners'],
      ...partners.map((p) => [p.name, '/partners/' + p.slug]),
    ],
  },
  {
    title: 'Events',
    href: '/events',
    links: [
      ['Aankomende events', '/events'],
      ['Beleggersborrel Utrecht', '/events/beleggersborrel-utrecht-2026'],
    ],
  },
  {
    title: 'Over mij',
    href: '/over',
    links: [
      ['Achter Beurswatcher', '/over'],
      ['Het verhaal van Daniel', '/over#verhaal'],
      ['Contact', '/contact'],
    ],
  },
];

export function Navigation({
  path,
  mobile = false,
  onNavigate,
}: {
  path: string;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className={'navigation-groups' + (mobile ? ' navigation-mobile' : '')}>
      {sections.map((section) => {
        const expanded = open === section.title;
        const id = `${mobile ? 'mobile' : 'desktop'}-${section.title.replaceAll(' ', '-')}`;
        const current =
          path.startsWith(section.href) ||
          (section.title === 'Verdieping' && path.startsWith('/verdieping'));
        return (
          <fieldset
            className="navigation-group"
            aria-label={section.title}
            key={section.title}
            onMouseEnter={(event) => {
              if (
                !mobile &&
                window.matchMedia('(hover: hover)').matches &&
                event.buttons === 0
              )
                setOpen(section.title);
            }}
            onMouseLeave={() => {
              if (!mobile) setOpen(null);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setOpen(null);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setOpen(null);
                event.currentTarget.querySelector('button')?.focus();
                event.stopPropagation();
              }
            }}
          >
            <div className="navigation-label">
              <Link
                href={section.href}
                aria-current={current ? 'page' : undefined}
                onClick={onNavigate}
              >
                {section.title}
              </Link>
              <button
                type="button"
                aria-label={`${section.title} submenu`}
                aria-expanded={expanded}
                aria-controls={id}
                onClick={() => setOpen(expanded ? null : section.title)}
              >
                <ChevronDown size={14} />
              </button>
            </div>
            {expanded && (
              <div className="navigation-dropdown" id={id}>
                <span className="eyebrow">
                  ONTDEK {section.title.toUpperCase()}
                </span>
                {section.links.map(([label, href]) => (
                  <Link
                    href={href}
                    key={href}
                    onClick={() => {
                      setOpen(null);
                      onNavigate?.();
                    }}
                  >
                    {label}
                    <ArrowUpRight size={15} />
                  </Link>
                ))}
              </div>
            )}
          </fieldset>
        );
      })}
    </div>
  );
}

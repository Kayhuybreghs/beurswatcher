'use client';
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions -- The group catches Escape from its links/buttons and hover from pointer users; all actions are also available on the labelled button. */
import { useEffect, useRef, useState } from 'react';
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
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelTimer = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  const close = () => {
    cancelTimer();
    setOpen(null);
  };
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !root.current?.contains(event.target)
      ) {
        if (timer.current) clearTimeout(timer.current);
        setOpen(null);
      }
    };
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('pointerdown', outside);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  const navigate = () => {
    close();
    onNavigate?.();
  };
  return (
    <div
      ref={root}
      className={'navigation-groups' + (mobile ? ' navigation-mobile' : '')}
    >
      {sections.map((section) => {
        const expanded = open === section.title;
        const id = `${mobile ? 'mobile' : 'desktop'}-${section.title.replaceAll(' ', '-')}`;
        const current =
          path.startsWith(section.href) ||
          (section.title === 'Verdieping' &&
            (path.startsWith('/verdieping') || path.startsWith('/uitleg/')));
        const [overview, ...links] = section.links;
        return (
          <fieldset
            className="navigation-group"
            aria-label={section.title}
            key={section.title}
            onPointerEnter={(event) => {
              if (
                !mobile &&
                event.pointerType === 'mouse' &&
                event.buttons === 0
              ) {
                cancelTimer();
                timer.current = setTimeout(() => setOpen(section.title), 130);
              }
            }}
            onPointerLeave={(event) => {
              if (!mobile && event.pointerType === 'mouse') {
                cancelTimer();
                timer.current = setTimeout(() => setOpen(null), 260);
              }
            }}
            onFocus={cancelTimer}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) close();
            }}
            onKeyDown={(event) => {
              const group = event.currentTarget;
              const trigger = group.querySelector('button');
              if (event.key === 'Escape') {
                close();
                trigger?.focus();
                event.stopPropagation();
                return;
              }
              if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
              event.preventDefault();
              cancelTimer();
              if (!expanded || event.target === trigger) {
                setOpen(section.title);
                requestAnimationFrame(() => {
                  const targets = group.querySelectorAll<HTMLAnchorElement>(
                    '.navigation-dropdown a',
                  );
                  (event.key === 'ArrowUp'
                    ? targets[targets.length - 1]
                    : targets[0]
                  )?.focus();
                });
              } else {
                const targets = Array.from(
                  group.querySelectorAll<HTMLAnchorElement>(
                    '.navigation-dropdown a',
                  ),
                );
                const index = targets.indexOf(
                  event.target as HTMLAnchorElement,
                );
                targets[
                  (index +
                    (event.key === 'ArrowDown' ? 1 : -1) +
                    targets.length) %
                    targets.length
                ]?.focus();
              }
            }}
          >
            <div className="navigation-label">
              <button
                type="button"
                className="navigation-trigger"
                data-current={current || undefined}
                aria-label={`${section.title} submenu`}
                aria-expanded={expanded}
                aria-controls={id}
                onClick={() => {
                  cancelTimer();
                  setOpen(expanded ? null : section.title);
                }}
              >
                <span>{section.title}</span>
                <ChevronDown size={15} />
              </button>
            </div>
            {expanded && (
              <div
                className={
                  'navigation-dropdown' +
                  (links.length > 5 ? ' navigation-wide' : '')
                }
                id={id}
              >
                <span className="eyebrow">
                  ONTDEK {section.title.toUpperCase()}
                </span>
                <Link
                  className="navigation-overview"
                  href={overview[1]}
                  onClick={navigate}
                >
                  <span>
                    {overview[0]}
                    <small>Bekijk het overzicht</small>
                  </span>
                  <ArrowUpRight size={19} />
                </Link>
                <div className="navigation-link-grid">
                  {links.map(([label, href]) => (
                    <Link
                      href={href}
                      key={href}
                      onClick={navigate}
                      aria-current={path === href ? 'page' : undefined}
                    >
                      <span>{label}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </fieldset>
        );
      })}
    </div>
  );
}

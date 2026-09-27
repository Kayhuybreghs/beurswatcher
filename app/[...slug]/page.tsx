import { guides } from '../guide-data';
import { GuideSchema } from '../guide-schema';
import { topicContent } from '../topic-content';
import Platform from '../platform';
import { articles, toolItems, partners, topics } from '../data';
import { notFound, redirect } from 'next/navigation';
const routes = [
  'samenwerkingen',
  'zakelijk-samenwerken',
  'events/beleggersborrel-utrecht-2026',
  'artikelen',
  'beleggen',
  'markt',
  'tools',
  'partners',
  'events',
  'over',
  'nieuwsbrief',
  'contact',
  'zoeken',
  'privacy',
  'colofon',
  'achter-de-website',
  'afmelden',
  '404',
  ...guides.map((g) => 'uitleg/' + g.slug),
  ...articles.map((a) => 'artikelen/' + a.slug),
  ...toolItems.map((a) => 'tools/' + a.slug),
  ...partners.map((a) => 'partners/' + a.slug),
  ...topics.map(([s]) => 'verdieping/' + s),
  ...['marktupdate', 'macro', 'earnings', 'indices'].map((s) => 'markt/' + s),
];
// Known editorial routes are built once and served directly by the CDN.
// Unknown paths return an HTTP 404 before a streamed loading shell is sent.
export const dynamicParams = false;
export function generateStaticParams() {
  return [...new Set(routes)].map((path) => ({ slug: path.split('/') }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (slug.join('/') === 'achter-de-website') {
    const title = 'Achter deze website — ontwerp en ontwikkeling door Sitesnit';
    const description =
      'Van eigen inzichten naar interactieve rekentools: ontdek hoe Sitesnit het Beurswatcher-platform ontwierp en bouwde. Bekijk de case en de mogelijkheden voor jouw website.';
    const url = 'https://beurswatcher.vercel.app/achter-de-website';
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        type: 'website',
        locale: 'nl_NL',
        siteName: 'Beurswatcher',
      },
    };
  }
  const p = slug.join('/'),
    a = articles.find((a) => p === 'artikelen/' + a.slug),
    t = toolItems.find((t) => p === 'tools/' + t.slug);
  const guide = guides.find((g) => p === 'uitleg/' + g.slug);
  const topic = slug[0] === 'verdieping' ? topicContent[slug[1]] : undefined;
  return {
    alternates: { canonical: 'https://beurswatcher.vercel.app/' + p },
    robots:
      a || ['zoeken', '404', 'afmelden'].includes(p)
        ? { index: false, follow: true }
        : undefined,
    openGraph: guide
      ? {
          title: guide.title,
          description: guide.summary,
          url: 'https://beurswatcher.vercel.app/' + p,
          type: 'article',
          locale: 'nl_NL',
          siteName: 'Beurswatcher',
        }
      : undefined,
    title:
      guide?.title ||
      topic?.title ||
      (p === 'events/beleggersborrel-utrecht-2026'
        ? 'Beleggersborrel Utrecht — 14 oktober 2026'
        : p === 'zakelijk-samenwerken'
          ? 'Samenwerken met Beurswatcher'
          : undefined) ||
      a?.title ||
      t?.title ||
      slug
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1).replaceAll('-', ' '))
        .join(' — '),
    description:
      guide?.summary ||
      topic?.summary ||
      a?.intro ||
      t?.text ||
      'Inzicht, verdieping en praktische tools van Beurs Watcher.',
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join('/');
  if (path === 'samenwerkingen') redirect('/partners');
  if (!routes.includes(path)) notFound();
  return (
    <>
      {slug[0] === 'uitleg' && <GuideSchema slug={slug[1]} />}
      <Platform path={'/' + path} />
    </>
  );
}

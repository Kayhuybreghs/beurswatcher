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
  'afmelden',
  '404',
  ...articles.map((a) => 'artikelen/' + a.slug),
  ...toolItems.map((a) => 'tools/' + a.slug),
  ...partners.map((a) => 'partners/' + a.slug),
  ...topics.map(([s]) => 'beleggen/' + s),
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
  const p = slug.join('/'),
    a = articles.find((a) => p === 'artikelen/' + a.slug),
    t = toolItems.find((t) => p === 'tools/' + t.slug);
  return {
    title:
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
  return <Platform path={'/' + path} />;
}

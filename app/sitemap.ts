import type { MetadataRoute } from 'next';
import { guides } from './guide-data';
import { toolItems, topics, partners } from './data';
export default function sitemap(): MetadataRoute.Sitemap {
  // Educational example articles await Daniel's own editorial content.
  const routes = [
    '',
    'artikelen',
    'tools',
    'markt',
    'markt/macro',
    'over',
    'partners',
    'events',
    'contact',
    ...guides.map((g) => 'uitleg/' + g.slug),
    ...toolItems.map((t) => 'tools/' + t.slug),
    ...topics.map(([s]) => 'verdieping/' + s),
    ...partners.map((p) => 'partners/' + p.slug),
  ];
  return routes.map((path) => ({
    url: 'https://beurswatcher.vercel.app/' + path,
  }));
}

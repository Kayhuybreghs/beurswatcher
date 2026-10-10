import type { MetadataRoute } from 'next';
import { guides } from './guide-data';
import { toolItems, topics, partners } from './data';
import { siteUrl } from './site-config';
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
    'achter-de-website',
    ...guides.map((g) => 'uitleg/' + g.slug),
    ...toolItems.map((t) => 'tools/' + t.slug),
    ...topics.map(([s]) => 'verdieping/' + s),
    ...partners.map((p) => 'partners/' + p.slug),
  ];
  // No invented modification dates: a deploy is not an editorial update.
  return [...new Set(routes)].map((path) => ({
    url: siteUrl + '/' + path,
  }));
}

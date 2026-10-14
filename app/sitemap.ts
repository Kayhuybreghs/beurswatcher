import type { MetadataRoute } from 'next';
import { contentRoutes, isIndexablePage } from './seo';
import { isPreviewDeployment, siteUrl } from './site-config';
export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreviewDeployment) return [];
  // One source for indexability prevents metadata and the sitemap drifting apart.
  const routes = [
    '',
    'achter-de-website',
    ...contentRoutes.filter(isIndexablePage),
  ];
  // No invented modification dates: a deploy is not an editorial update.
  return [...new Set(routes)].map((path) => ({
    url: siteUrl + '/' + path,
  }));
}

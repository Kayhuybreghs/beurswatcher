import type { MetadataRoute } from 'next';
import { isPreviewDeployment, siteUrl } from './site-config';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: isPreviewDeployment ? undefined : siteUrl + '/sitemap.xml',
  };
}

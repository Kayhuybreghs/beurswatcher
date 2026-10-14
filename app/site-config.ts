export const productionSiteUrl = 'https://www.beurswatcher.nl';
export const legacySiteUrl = 'https://beurswatcher.vercel.app';
export const isPreviewDeployment = process.env.VERCEL_ENV === 'preview';

// This is a build setting, never derived from a visitor's Host header.
// The www domain is live. A missing or legacy build setting must never restore
// vercel.app as the canonical origin. Local previews also describe the live URL.
export function resolveSiteUrl(value?: string) {
  if (!value?.trim()) return productionSiteUrl;
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    throw new Error('BEURSWATCHER_SITE_URL must be a valid HTTPS origin.');
  }
  if (
    ![productionSiteUrl, legacySiteUrl].includes(url.origin) ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error(
      `BEURSWATCHER_SITE_URL must be ${productionSiteUrl}, without a path, query or fragment.`,
    );
  }
  return productionSiteUrl;
}

export const siteUrl = resolveSiteUrl(process.env.BEURSWATCHER_SITE_URL);

export function canonicalDomainRedirects() {
  return [new URL(legacySiteUrl).hostname, 'beurswatcher.nl'].map((host) => ({
    source: '/:path*',
    has: [{ type: 'host' as const, value: host.replaceAll('.', '\\.') }],
    destination: productionSiteUrl + '/:path*',
    permanent: true,
  }));
}

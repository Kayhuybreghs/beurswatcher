export const currentSiteUrl = 'https://beurswatcher.vercel.app';
export const futureSiteUrl = 'https://www.beurswatcher.nl';

// This is a build setting, never derived from a visitor's Host header.
// Keep the current public URL until the new domain has working DNS and HTTPS.
export function resolveSiteUrl(value?: string) {
  if (!value?.trim()) return currentSiteUrl;
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    throw new Error('BEURSWATCHER_SITE_URL must be a valid HTTPS origin.');
  }
  if (
    ![currentSiteUrl, futureSiteUrl].includes(url.origin) ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error(
      `BEURSWATCHER_SITE_URL must be ${currentSiteUrl} or ${futureSiteUrl}, without a path, query or fragment.`,
    );
  }
  return url.origin;
}

export const siteUrl = resolveSiteUrl(process.env.BEURSWATCHER_SITE_URL);

export function canonicalDomainRedirects(origin = siteUrl) {
  if (origin !== futureSiteUrl) return [];
  return [new URL(currentSiteUrl).hostname, 'beurswatcher.nl'].map((host) => ({
    source: '/:path*',
    has: [{ type: 'host' as const, value: host.replaceAll('.', '\\.') }],
    destination: futureSiteUrl + '/:path*',
    permanent: true,
  }));
}

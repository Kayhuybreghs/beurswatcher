import type { NextConfig } from 'next';
import { canonicalDomainRedirects } from './app/site-config.ts';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/beheer/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          { key: 'Cache-Control', value: 'private, no-store' },
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
      {
        source: '/koppelen/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
      {
        source: '/api/instagram/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      ...canonicalDomainRedirects(),
      { source: '/beleggen', destination: '/artikelen', permanent: true },
      {
        source: '/beleggen/:slug',
        destination: '/verdieping/:slug',
        permanent: true,
      },
      { source: '/verdieping', destination: '/artikelen', permanent: true },
      {
        source: '/markt/marktupdate',
        destination: '/verdieping/markt-economie',
        permanent: true,
      },
      {
        source: '/markt/indices',
        destination: '/markt#indices',
        permanent: true,
      },
      { source: '/samenwerkingen', destination: '/partners', permanent: true },
      {
        source: '/events/beleggersborrel-utrecht-2026',
        destination: '/events',
        permanent: true,
      },
    ];
  },
  serverExternalPackages: ['@libsql/client'],
};

export default nextConfig;

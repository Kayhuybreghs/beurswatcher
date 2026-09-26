import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/beleggen', destination: '/artikelen', permanent: true },
      { source: '/beleggen/:slug', destination: '/verdieping/:slug', permanent: true },
      { source: '/verdieping', destination: '/artikelen', permanent: true },
      { source: '/markt/marktupdate', destination: '/artikelen', permanent: true },
    ];
  },
  serverExternalPackages: ['@libsql/client'],
};

export default nextConfig;

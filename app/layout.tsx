import type { Metadata } from 'next';
import { homeDescription, homeTitle, robotsForPage, siteUrl } from './seo';
import { SiteSchema } from './site-schema';
import './globals.css';
import './redesign.css';
import './brand.css';
import './platform.css';
import './refinement.css';
import './mobile-first.css';
import './scroll-story.css';
import './brand-direction.css';
import './learning.css';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: '%s | Beurswatcher',
  },
  description: homeDescription,
  publisher: 'Beurswatcher',
  robots: robotsForPage(),
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <head>
        <link
          rel="preload"
          href="/inter-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/inter-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SiteSchema />
        {children}
      </body>
    </html>
  );
}

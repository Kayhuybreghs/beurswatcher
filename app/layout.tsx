import type { Metadata } from 'next';
import { homeDescription, homeTitle, siteUrl } from './seo';
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
import './site-credits.css';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: '%s | Beurswatcher',
  },
  description: homeDescription,
  publisher: 'Beurswatcher',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body>
        <SiteSchema />
        {children}
      </body>
    </html>
  );
}

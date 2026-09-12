import type { Metadata } from 'next';
import './globals.css';
import './redesign.css';
import './brand.css';
import './platform.css';
import './refinement.css';
import './mobile-first.css';
import './scroll-story.css';
export const metadata: Metadata = {
  title: {
    default: 'Beurswatcher — Kijk verder. Kom verder.',
    template: '%s | Beurs Watcher',
  },
  description:
    'Het digitale thuis van Beurswatcher. Begrijp de beurs, onderzoek je geldvragen en reken aan je toekomst met gratis tools.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}

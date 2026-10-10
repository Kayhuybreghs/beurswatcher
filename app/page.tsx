import { Suspense } from 'react';
import type { Metadata } from 'next';
import Platform from './platform';
import Loading from './route-loading';
import { homeDescription, homeTitle, siteUrl } from './seo';

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: siteUrl + '/' },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: siteUrl + '/',
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Beurswatcher',
  },
};

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Platform path="/" />
    </Suspense>
  );
}

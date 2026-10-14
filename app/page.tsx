import { Suspense } from 'react';
import type { Metadata } from 'next';
import Platform from './platform';
import Loading from './route-loading';
import { homeDescription, homeTitle, sharingMetadata, siteUrl } from './seo';

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: siteUrl + '/' },
  ...sharingMetadata(homeTitle, homeDescription, ''),
};

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Platform path="/" />
    </Suspense>
  );
}

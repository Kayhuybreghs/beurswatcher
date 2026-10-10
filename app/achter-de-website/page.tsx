import type { Metadata } from 'next';
import Platform from '../platform';
import { siteUrl } from '../site-config';
import { MakerSchema } from '../site-schema';

const title = 'De maker van Beurswatcher: Sitesnit | Over deze website';
const description =
  'Sitesnit verzorgde het ontwerp en de ontwikkeling van Beurswatcher. Bekijk de keuzes achter de website, mobiele indeling en rendementcalculator.';
const url = siteUrl + '/achter-de-website';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Beurswatcher',
  },
};

export default function MakerPage() {
  return (
    <>
      <MakerSchema title={title} description={description} />
      <Platform path="/achter-de-website" />
    </>
  );
}

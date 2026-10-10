import { GuideSchema } from '../guide-schema';
import Platform from '../platform';
import { contentRoutes, metadataForPage } from '../seo';
import { notFound } from 'next/navigation';

// Known editorial routes are built once and served directly by the CDN.
// Unknown paths return an HTTP 404 before a streamed loading shell is sent.
// The maker page has its own static route and metadata.
export const dynamicParams = false;
export function generateStaticParams() {
  return [...new Set(contentRoutes)].map((path) => ({ slug: path.split('/') }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return metadataForPage(slug.join('/'));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join('/');
  if (!contentRoutes.includes(path)) notFound();
  return (
    <>
      {slug[0] === 'uitleg' && <GuideSchema slug={slug[1]} />}
      <Platform path={'/' + path} />
    </>
  );
}

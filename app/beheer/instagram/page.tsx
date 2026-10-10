import type { Metadata } from 'next';
import { getConnectionPageState } from '../../../lib/instagram-page-state';
import AdminPanel from './admin-panel';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Je Instagram op Beurswatcher',
  description: 'Privépagina voor de Instagram-koppeling van Beurswatcher.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

export default async function InstagramAdminPage() {
  const { result } = await getConnectionPageState();
  return <AdminPanel result={result} />;
}

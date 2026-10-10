import type { Metadata } from 'next';
import { getConnectionPageState } from '../../../lib/instagram-page-state';
import ConnectPanel from './connect-panel';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Instagram koppelen',
  description: 'Koppel het Instagram-account van Beurswatcher aan de website.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

export default async function InstagramConnectionPage() {
  const state = await getConnectionPageState();

  return <ConnectPanel {...state} />;
}

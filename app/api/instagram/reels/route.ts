export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import {
  reels,
  selectReels,
  reelSourceUpdatedAt,
  type Reel,
} from '../../../reel-data';
import { parseInstagramMedia } from '../../../instagram-media';

type Feed = {
  items: Reel[];
  status: 'connected' | 'waiting' | 'unavailable';
  checkedAt: string | null;
  selectionDate: string;
};
let cache: { data: Feed; until: number } | undefined;
let pending: Promise<Feed> | undefined;
let retryAfter = 0;
const fallback = (status: 'waiting' | 'unavailable'): Feed => ({
  items: selectReels(reels),
  status,
  checkedAt: null,
  selectionDate: reelSourceUpdatedAt,
});

export async function GET() {
  const config = process.env;
  if (
    !config.INSTAGRAM_ACCESS_TOKEN ||
    !/^\d+$/.test(config.INSTAGRAM_USER_ID || '')
  )
    return Response.json(fallback('waiting'), {
      headers: { 'Cache-Control': 'public, max-age=60' },
    });
  if (cache && cache.until > Date.now())
    return Response.json(cache.data, {
      headers: { 'Cache-Control': 'public, max-age=60' },
    });
  if (retryAfter > Date.now())
    return Response.json(fallback('unavailable'), {
      headers: { 'Cache-Control': 'public, max-age=60' },
    });
  pending ??= (async () => {
    try {
      // Fixed host/account: visitor input cannot alter the upstream request.
      const url = new URL(
        `https://graph.instagram.com/v26.0/${config.INSTAGRAM_USER_ID}/media`,
      );
      url.searchParams.set(
        'fields',
        'id,media_type,media_url,thumbnail_url,permalink,timestamp,username',
      );
      url.searchParams.set('limit', '24');
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${config.INSTAGRAM_ACCESS_TOKEN}` },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error('Feed unavailable');
      const items = parseInstagramMedia(await response.json());
      if (!items.length) throw new Error('No usable Reels');
      const data: Feed = {
        items,
        status: 'connected',
        checkedAt: new Date().toISOString(),
        selectionDate: reelSourceUpdatedAt,
      };
      cache = { data, until: Date.now() + 15 * 60 * 1000 };
      return data;
    } catch {
      // Don't keep expired video/CDN URLs or expose upstream errors or credentials.
      retryAfter = Date.now() + 60 * 1000;
      return fallback('unavailable');
    } finally {
      pending = undefined;
    }
  })();
  return Response.json(await pending, {
    headers: { 'Cache-Control': 'public, max-age=60' },
  });
}

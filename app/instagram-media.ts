import { reels, selectReels, type Reel } from './reel-data.ts';
const safeMediaUrl = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return;
  try {
    const url = new URL(value);
    if (
      url.protocol === 'https:' &&
      (url.hostname.endsWith('.cdninstagram.com') ||
        url.hostname.endsWith('.fbcdn.net'))
    )
      return url.href;
  } catch {
    /* Unusable provider field. */
  }
};
export function parseInstagramMedia(payload: unknown): Reel[] {
  if (
    !payload ||
    typeof payload !== 'object' ||
    !('data' in payload) ||
    !Array.isArray(payload.data)
  )
    return [];
  const items: Reel[] = payload.data.flatMap(
    (item: Record<string, unknown>) => {
      if (
        !item ||
        item.username !== 'beurswatcher' ||
        item.media_type !== 'VIDEO' ||
        typeof item.id !== 'string' ||
        typeof item.permalink !== 'string' ||
        typeof item.timestamp !== 'string'
      )
        return [];
      const known = reels.find(
        (r) =>
          r.url.split('/').filter(Boolean).at(-1) ===
          item.permalink?.toString().split('/').filter(Boolean).at(-1),
      );
      return [
        {
          id: item.id,
          url: item.permalink,
          thumbnail:
            safeMediaUrl(item.thumbnail_url) ||
            known?.thumbnail ||
            '/beurswatcher-logo.jpeg',
          title: known?.title || 'Een nieuw inzicht van Daniël',
          publishedAt: item.timestamp,
          tags: known?.tags || [],
          videoUrl: safeMediaUrl(item.media_url),
        },
      ];
    },
  );
  return selectReels(items);
}

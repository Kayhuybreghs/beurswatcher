import { reels, selectReels, type Reel } from './reel-data.ts';
// eslint-disable-next-line no-control-regex -- Strip hidden control characters from provider captions.
const unsafeCaptionCharacters = /[<>\u0000-\u001f\u007f]/g;
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
const captionTitle = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return;
  const line = value
    .split(/\r?\n/)
    .find((part) => part.trim() && !part.trim().startsWith('#'));
  const plain = line
    ?.replace(/<[^>]*>/g, '')
    .replace(unsafeCaptionCharacters, '')
    .replace(/\s+/g, ' ')
    .trim();
  return plain ? Array.from(plain).slice(0, 120).join('') : undefined;
};
export function parseInstagramMedia(
  payload: unknown,
  expectedUsername = 'beurswatcher',
  limit = 6,
): Reel[] {
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
        item.username !== expectedUsername ||
        item.media_type !== 'VIDEO' ||
        typeof item.id !== 'string' ||
        !/^[A-Za-z0-9_-]{1,64}$/.test(item.id) ||
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
          // Keep the curated site's existing IDs stable when the API finds the same Reel.
          id: known?.id || item.id,
          url: item.permalink,
          thumbnail:
            safeMediaUrl(item.thumbnail_url) ||
            known?.thumbnail ||
            '/beurswatcher-logo.jpeg',
          title:
            known?.title ||
            captionTitle(item.caption) ||
            'Video van Beurswatcher over beleggen en geldzaken',
          publishedAt: item.timestamp,
          tags: known?.tags || [],
          videoUrl: safeMediaUrl(item.media_url),
        },
      ];
    },
  );
  return selectReels(
    items,
    undefined,
    Math.max(0, Math.min(24, Math.floor(limit))),
  );
}

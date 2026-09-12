import source from '../content/reels.json' with { type: 'json' };
export type Reel = {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  publishedAt: string;
  tags: string[];
  videoUrl?: string;
};
export function selectReels(items: Reel[], topic?: string, limit = 6) {
  const tag = topic?.toLocaleLowerCase('nl-NL');
  const seen = new Set<string>();
  return items
    .filter((r) => {
      const valid =
        /^https:\/\/(www\.)?instagram\.com\/(?:beurswatcher\/)?reel\/[A-Za-z0-9_-]+\/?(?:\?.*)?$/.test(
          r.url,
        ) &&
        !!r.thumbnail &&
        !!r.title &&
        Number.isFinite(Date.parse(r.publishedAt)) &&
        !seen.has(r.id);
      if (valid) seen.add(r.id);
      return (
        valid &&
        (!tag || r.tags.some((t) => t.toLocaleLowerCase('nl-NL') === tag))
      );
    })
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, limit);
}
export const reels = source.items as Reel[];
export const reelSourceUpdatedAt = source.updatedAt;

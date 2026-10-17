import { articles } from './data';
import { guideIndex as guides } from './guide-index';
export const learningLibrary = [
  ...guides.map((g) => ({
    slug: g.slug,
    category: g.category,
    title: g.title,
    intro: g.summary,
    read: g.read,
    href: '/uitleg/' + g.slug,
    example: false,
    image: undefined as string | undefined,
    topics: g.topics,
  })),
  ...articles.map((a) => ({
    ...a,
    href: '/artikelen/' + a.slug,
    example: true,
    image: 'image' in a ? a.image : undefined,
    topics: [] as string[],
  })),
];

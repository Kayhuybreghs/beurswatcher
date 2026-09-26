import { articles } from './data';
import { guides } from './guide-data';
export const learningLibrary = [
  ...guides.map((g) => ({
    slug: g.slug,
    category: g.category,
    title: g.title,
    intro: g.summary,
    read: Math.max(
      2,
      Math.ceil(
        [
          g.problem,
          g.summary,
          ...g.sections.flat(),
          ...g.faq.flat(),
          ...g.example,
        ]
          .join(' ')
          .split(/\s+/).length / 200,
      ),
    ),
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

import { guideIndex as guides } from './guide-index';
export const learningLibrary = guides.map((g) => ({
  slug: g.slug,
  category: g.category,
  title: g.title,
  intro: g.summary,
  read: g.read,
  href: '/uitleg/' + g.slug,
  example: false,
  analysis: g.analysis,
  image: undefined as string | undefined,
  topics: g.topics,
}));

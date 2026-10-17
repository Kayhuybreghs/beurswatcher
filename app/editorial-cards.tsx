'use client';
import Image from 'next/image';
import Link from './site-link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import type { articles } from './data';

export function SectionTitle({
  eyebrow,
  title,
  link,
  href,
}: {
  eyebrow: string;
  title: string;
  link?: string;
  href?: string;
}) {
  return (
    <div className="section-title">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>
          {title}
          <span className="dot">.</span>
        </h2>
      </div>
      {link && href && (
        <Link className="textlink" href={href}>
          {link}
          <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}

export function ArticleCard({
  article,
  compact = false,
}: {
  article: (typeof articles)[number];
  compact?: boolean;
}) {
  return (
    <Link
      className={'article-card ' + (compact ? 'compact' : '')}
      href={'/artikelen/' + article.slug}
    >
      {!compact && article.image && (
        <Image
          src={article.image}
          alt={
            article.slug.includes('halfgeleiders')
              ? 'Detail van een echte siliciumwafer'
              : 'Grachtenpanden in Amsterdam'
          }
          loading="lazy"
          width={640}
          height={400}
          sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 30vw"
        />
      )}
      <p className="eyebrow">{article.category}</p>
      <h3>{article.title}</h3>
      {!compact && <p>{article.intro}</p>}
      <div className="article-meta">
        {article.read} min lezen <ArrowUpRight size={19} />
      </div>
    </Link>
  );
}

import { ArrowUpRight, BookOpen } from 'lucide-react';
import Link from './site-link';
import { guideIndex as guides } from './guide-index';

export function ToolReading({ tool }: { tool: string }) {
  const items = guides.filter((g) => g.tool === tool);
  return (
    <section className="tool-reading" id="uitleg">
      <span className="eyebrow">UITLEG BIJ DEZE TOOL</span>
      <h2>De uitleg achter de uitkomst.</h2>
      <p>
        Lees hoe deze berekening werkt, welke aannames meetellen en wat de
        uitkomst wel en niet zegt.
      </p>
      <div className="guide-card-grid">
        {items.map((g) => (
          <Link className="guide-card" key={g.slug} href={'/uitleg/' + g.slug}>
            <BookOpen size={20} />
            <h3>{g.title}</h3>
            <p>{g.summary}</p>
            <span>
              {g.analysis
                ? 'Bekijk de scenario’s en berekening'
                : 'Lees de uitleg'}{' '}
              <ArrowUpRight size={18} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

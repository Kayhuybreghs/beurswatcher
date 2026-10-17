import Link from './site-link';

export function LearningBreadcrumbs({ current }: { current: string }) {
  return (
    <nav className="learning-breadcrumbs" aria-label="Kruimelpad">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/artikelen">Verdieping</Link>
        </li>
        <li>
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
}

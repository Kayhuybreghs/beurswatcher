import { BrandMark } from './brand';
import { Skeleton } from '@/components/ui/skeleton';
export default function Loading() {
  return (
    <main className="route-loading" aria-label="Pagina wordt geladen">
      <div className="loading-brand">
        <BrandMark /> beurswatcher<span>.</span>
      </div>
      <Skeleton className="loading-heading" />
      <div className="loading-columns">
        <Skeleton />
        <Skeleton />
      </div>
    </main>
  );
}

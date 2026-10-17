import Platform from './platform';
import { notFoundMetadata } from './seo';

export const metadata = notFoundMetadata;

export default function NotFound() {
  return <Platform path="/404" />;
}

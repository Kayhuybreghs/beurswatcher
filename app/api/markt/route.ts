import { demoFeed } from '../../market-data';
// Replace this adapter with a licensed provider; preserve mode, source and asOf.
export function GET() {
  return Response.json(demoFeed, {
    headers: { 'Cache-Control': 'public, max-age=60' },
  });
}

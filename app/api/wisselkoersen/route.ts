import { fxSource, fxSnapshot, parseFx, type FxData } from '../../fx-data';
let cached: { data: FxData; expires: number } | undefined;
export async function GET() {
  if (cached && cached.expires > Date.now())
    return Response.json(cached.data, {
      headers: { 'Cache-Control': 'public, max-age=300' },
    });
  try {
    const response = await fetch(fxSource, {
      signal: AbortSignal.timeout(8000),
      headers: { Accept: 'application/xml' },
    });
    if (!response.ok) throw Error('ECB unavailable');
    const data = parseFx(await response.text());
    cached = { data, expires: Date.now() + 3600000 };
    return Response.json(data, {
      headers: { 'Cache-Control': 'public, max-age=300' },
    });
  } catch {
    return Response.json(
      { ...(cached?.data || fxSnapshot), mode: 'snapshot' },
      { headers: { 'Cache-Control': 'public, max-age=60' } },
    );
  }
}

import { instagramAdminData } from '../../../../lib/instagram-admin-data.ts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function GET() {
  try {
    return Response.json(await instagramAdminData().publicFeed(), {
      // Upstream media are cached durably; editorial choices are read on every request.
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    // Fail closed if editorial storage is unavailable: an intentionally hidden feed stays hidden.
    return Response.json(
      {
        items: [],
        status: 'unavailable',
        checkedAt: null,
        selectionDate: null,
      },
      {
        headers: { 'Cache-Control': 'no-store' },
      },
    );
  }
}

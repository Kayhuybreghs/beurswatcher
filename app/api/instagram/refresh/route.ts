import { timingSafeEqual } from 'node:crypto';
import { maintainInstagramConnection } from '../../../../lib/instagram-connection';
import {
  instagramAdminData,
  InstagramAdminDataError,
} from '../../../../lib/instagram-admin-data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const actual = Buffer.from(request.headers.get('authorization') || '');
  const expected = Buffer.from(`Bearer ${secret || ''}`);
  if (
    !secret ||
    secret.length < 32 ||
    actual.length !== expected.length ||
    !timingSafeEqual(actual, expected)
  )
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } },
    );
  if (!process.env.INSTAGRAM_APP_ID || !process.env.INSTAGRAM_APP_SECRET) {
    return Response.json(
      { status: 'waiting-for-setup' },
      {
        headers: { 'Cache-Control': 'no-store' },
      },
    );
  }
  try {
    const result = await maintainInstagramConnection();
    let checked;
    try {
      checked = await instagramAdminData().check();
    } catch (error) {
      // A visitor may just have checked; reuse the freshly stored result.
      if (!(error instanceof InstagramAdminDataError && error.status === 429))
        throw error;
      checked = await instagramAdminData().get();
    }
    return Response.json(
      {
        ...result,
        connection: checked.connection.status,
        checkedAt: checked.connection.checkedAt,
      },
      {
        status:
          ['retry-later', 'needs-reconnect'].includes(result.status) ||
          ['needs-reconnect', 'unavailable'].includes(checked.connection.status)
            ? 503
            : 200,
        headers: { 'Cache-Control': 'no-store' },
      },
    );
  } catch {
    return Response.json(
      { status: 'unavailable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

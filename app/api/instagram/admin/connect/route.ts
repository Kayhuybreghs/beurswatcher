import { randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import {
  getAdminConfig,
  readAdminSession,
} from '../../../../../lib/instagram-admin-auth';
import {
  instagramRuntimeConfig,
  INSTAGRAM_FLOW_COOKIE,
} from '../../../../../lib/instagram-connection';
import { createFlow } from '../../../../../lib/instagram-security';
import { instagramAuthorizeUrl } from '../../../../../lib/instagram-provider';
import {
  instagramConnectFailure,
  type InstagramConnectFailure,
} from '../../../../instagram-connect-errors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const json = (body: object, status = 200) =>
  NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' },
  });
const failure = (code: InstagramConnectFailure) => {
  const { body, status } = instagramConnectFailure(code);
  return json(body, status);
};

export async function POST(request: Request) {
  if (!readAdminSession(request)) return failure('session-expired');
  let config;
  try {
    const admin = getAdminConfig();
    if (request.headers.get('origin') !== admin.origin)
      return failure('wrong-origin');
    config = await instagramRuntimeConfig();
  } catch {
    return failure('setup-unavailable');
  }
  try {
    // An authenticated owner needs no invitation URL. The fresh nonce is still
    // consumed atomically by the shared callback to prevent replay.
    const flow = createFlow(
      config.connectSecret,
      randomBytes(32).toString('base64url'),
      Date.now(),
      config.setupRevision,
    );
    const response = json({ url: instagramAuthorizeUrl(config, flow.state) });
    response.cookies.set(INSTAGRAM_FLOW_COOKIE, flow.cookie, {
      httpOnly: true,
      secure: config.origin.startsWith('https:'),
      sameSite: 'lax',
      path: '/api/instagram',
      maxAge: 600,
    });
    return response;
  } catch {
    return failure('start-unavailable');
  }
}

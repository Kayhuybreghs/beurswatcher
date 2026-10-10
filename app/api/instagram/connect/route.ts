import { NextResponse } from 'next/server';
import {
  instagramRuntimeConfig,
  INSTAGRAM_FLOW_COOKIE,
} from '../../../../lib/instagram-connection';
import {
  verifyInvite,
  createFlow,
  hashSecret,
} from '../../../../lib/instagram-security';
import { instagramAuthorizeUrl } from '../../../../lib/instagram-provider';
import { getInstagramStore } from '../../../../lib/instagram-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const failure = (error: string, status: number) =>
  NextResponse.json(
    { error },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
        'Referrer-Policy': 'no-referrer',
      },
    },
  );

export async function POST(request: Request) {
  try {
    const config = instagramRuntimeConfig();
    if (
      request.headers.get('origin') !== config.origin ||
      !request.headers.get('content-type')?.startsWith('application/json')
    )
      return failure('invalid', 400);
    const text = await request.text();
    if (text.length > 4096) return failure('invalid', 400);
    let input;
    try {
      input = JSON.parse(text);
    } catch {
      return failure('invalid', 400);
    }
    const invite =
      typeof input?.invite === 'string'
        ? verifyInvite(input.invite, config.connectSecret)
        : null;
    if (!invite) return failure('expired', 403);
    if (await getInstagramStore().inviteUsed(hashSecret(invite.nonce)))
      return failure('expired', 403);
    const flow = createFlow(config.connectSecret, invite.nonce);
    const response = NextResponse.json(
      { url: instagramAuthorizeUrl(config, flow.state) },
      {
        headers: {
          'Cache-Control': 'no-store',
          'Referrer-Policy': 'no-referrer',
        },
      },
    );
    response.cookies.set(INSTAGRAM_FLOW_COOKIE, flow.cookie, {
      httpOnly: true,
      secure: config.origin.startsWith('https:'),
      sameSite: 'lax',
      path: '/api/instagram',
      maxAge: 600,
    });
    return response;
  } catch {
    return failure('unavailable', 503);
  }
}

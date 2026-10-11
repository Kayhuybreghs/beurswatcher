import { type NextRequest, NextResponse } from 'next/server';
import { siteUrl } from '../../../site-config';
import {
  instagramRuntimeConfig,
  INSTAGRAM_FLOW_COOKIE,
  INSTAGRAM_NOTICE_COOKIE,
} from '../../../../lib/instagram-connection';
import {
  createNotice,
  verifyFlow,
  hashSecret,
  sealToken,
  type InstagramNotice,
} from '../../../../lib/instagram-security';
import { exchangeInstagramCode } from '../../../../lib/instagram-provider';
import { getInstagramStore } from '../../../../lib/instagram-store';
import { readAdminSession } from '../../../../lib/instagram-admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const destination = readAdminSession(request)
    ? '/beheer/instagram'
    : '/koppelen/instagram';
  let config;
  try {
    config = await instagramRuntimeConfig();
  } catch {
    return NextResponse.redirect(new URL(destination, siteUrl));
  }
  const done = (result: InstagramNotice) => {
    // No OAuth code/state in the resulting address or referer.
    const response = NextResponse.redirect(
      new URL(destination, config.origin),
      303,
    );
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('Referrer-Policy', 'no-referrer');
    response.cookies.set(INSTAGRAM_FLOW_COOKIE, '', {
      path: '/api/instagram',
      maxAge: 0,
    });
    response.cookies.set(
      INSTAGRAM_NOTICE_COOKIE,
      createNotice(result, config.connectSecret),
      {
        httpOnly: true,
        secure: config.origin.startsWith('https:'),
        sameSite: 'lax',
        path: destination,
        maxAge: 300,
      },
    );
    return response;
  };
  const params = request.nextUrl.searchParams;
  const state = params.get('state') || '';
  const cookie = request.cookies.get(INSTAGRAM_FLOW_COOKIE)?.value || '';
  const flow =
    params.getAll('state').length === 1
      ? verifyFlow(state, cookie, config.connectSecret)
      : null;
  if (!flow || flow.setupRevision !== config.setupRevision)
    return done('expired');
  try {
    const store = getInstagramStore();
    if (
      !(await store.consumeFlow(hashSecret(flow.nonce))) ||
      (await store.inviteUsed(hashSecret(flow.inviteNonce)))
    )
      return done('expired');
    if (params.has('error')) return done('cancelled');
    const code = params.get('code');
    if (params.getAll('code').length !== 1 || !code || code.length > 4096)
      return done('error');
    const account = await exchangeInstagramCode(config, code);
    if (account.username !== config.username) return done('wrong-account');
    const now = Date.now();
    await store.save(
      {
        userId: account.userId,
        username: account.username,
        token: sealToken(account.accessToken, config.encryptionKey),
        expiresAt: now + account.expiresIn * 1000,
        refreshedAt: now,
      },
      hashSecret(flow.inviteNonce),
      now,
      config.setupRevision,
    );
    return done('connected');
  } catch {
    return done('error');
  }
}

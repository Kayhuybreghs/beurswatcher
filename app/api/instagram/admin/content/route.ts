import {
  readAdminSession,
  getAdminConfig,
} from '../../../../../lib/instagram-admin-auth.ts';
import {
  instagramAdminData,
  InstagramAdminDataError,
  unavailableInstagramAdminSnapshot,
} from '../../../../../lib/instagram-admin-data.ts';
import { instagramStorageIssue } from '../../../../../lib/instagram-store.ts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;
const headers = {
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'no-referrer',
};
const reply = (
  data: unknown,
  status = 200,
  extra: Record<string, string> = {},
) => Response.json(data, { status, headers: { ...headers, ...extra } });
const authenticated = (request: Request) => {
  try {
    return readAdminSession(request);
  } catch {
    return false;
  }
};
const failure = (error: unknown) =>
  error instanceof InstagramAdminDataError
    ? reply(
        {
          error: error.message,
          ...(error.retryAfter ? { retryAfter: error.retryAfter } : {}),
        },
        error.status,
        error.retryAfter ? { 'Retry-After': String(error.retryAfter) } : {},
      )
    : reply({ error: 'unavailable' }, 503);

export async function GET(request: Request) {
  if (!authenticated(request)) return reply({ error: 'unauthorized' }, 401);
  try {
    return reply(await instagramAdminData().get());
  } catch (error) {
    return reply(
      {
        ...unavailableInstagramAdminSnapshot(),
        storageIssue: instagramStorageIssue(error),
      },
      503,
    );
  }
}

async function input(request: Request) {
  const config = getAdminConfig();
  if (
    request.headers.get('origin') !== config.origin ||
    !request.headers.get('content-type')?.startsWith('application/json')
  )
    throw new InstagramAdminDataError('invalid', 400);
  const text = await request.text();
  if (text.length > 16000) throw new InstagramAdminDataError('invalid', 400);
  try {
    const value: unknown = JSON.parse(text);
    if (!value || typeof value !== 'object' || Array.isArray(value))
      throw new Error();
    return value as Record<string, unknown>;
  } catch {
    throw new InstagramAdminDataError('invalid', 400);
  }
}

export async function POST(request: Request) {
  if (!authenticated(request)) return reply({ error: 'unauthorized' }, 401);
  try {
    const value = await input(request);
    if (
      value.action !== 'check' ||
      Object.keys(value).some((key) => key !== 'action')
    )
      throw new InstagramAdminDataError('invalid', 400);
    return reply(await instagramAdminData().check());
  } catch (error) {
    return failure(error);
  }
}

export async function PUT(request: Request) {
  if (!authenticated(request)) return reply({ error: 'unauthorized' }, 401);
  try {
    const value = await input(request);
    if (
      Object.keys(value).some((key) => !['settings', 'revision'].includes(key))
    )
      throw new InstagramAdminDataError('invalid', 400);
    return reply(
      await instagramAdminData().save(value.settings, value.revision),
    );
  } catch (error) {
    return failure(error);
  }
}

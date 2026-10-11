import { openToken, sealToken } from './instagram-security.ts';
import {
  getInstagramStore,
  instagramDatabaseConfig,
} from './instagram-store.ts';
import {
  refreshInstagramToken,
  InstagramProviderError,
} from './instagram-provider.ts';
import { resolveInstagramConfig } from './instagram-setup.ts';

export const INSTAGRAM_FLOW_COOKIE = 'bw_instagram_flow';
export const INSTAGRAM_NOTICE_COOKIE = 'bw_instagram_notice';

export async function instagramRuntimeConfig() {
  instagramDatabaseConfig();
  return resolveInstagramConfig(process.env, getInstagramStore());
}

export async function resolveInstagramCredentials(
  env: NodeJS.ProcessEnv,
  store: Pick<ReturnType<typeof getInstagramStore>, 'get' | 'setup'>,
  now = Date.now(),
) {
  // Encrypted managed connections take priority; never silently reuse an old revoked token.
  const saved = await store.get();
  if (saved) {
    const config = await resolveInstagramConfig(env, store);
    if (
      saved.status !== 'connected' ||
      saved.expiresAt <= now ||
      saved.username !== config.username
    )
      throw new Error('Instagram reconnect required');
    return {
      userId: saved.userId,
      username: saved.username,
      accessToken: openToken(saved.token, config.encryptionKey),
    };
  }
  // Compatibility for the existing manual environment-variable connection.
  if (env.INSTAGRAM_ACCESS_TOKEN && /^\d+$/.test(env.INSTAGRAM_USER_ID || ''))
    return {
      userId: env.INSTAGRAM_USER_ID!,
      username: 'beurswatcher',
      accessToken: env.INSTAGRAM_ACCESS_TOKEN,
    };
  return null;
}

export async function instagramCredentials() {
  return resolveInstagramCredentials(process.env, getInstagramStore());
}

export async function maintainInstagramConnection() {
  const config = await instagramRuntimeConfig();
  const store = getInstagramStore();
  await store.cleanup();
  const saved = await store.claimRefresh();
  if (!saved) {
    const current = await store.get();
    return { status: current?.status || 'waiting' };
  }
  try {
    const renewed = await refreshInstagramToken(
      openToken(saved.token, config.encryptionKey),
    );
    const now = Date.now();
    await store.finishRefresh(
      saved,
      sealToken(renewed.accessToken, config.encryptionKey),
      now + renewed.expiresIn * 1000,
      now,
    );
    return { status: 'renewed' };
  } catch (error) {
    const reconnect =
      error instanceof InstagramProviderError && error.reconnect;
    await store.failRefresh(saved, reconnect);
    return { status: reconnect ? 'needs-reconnect' : 'retry-later' };
  }
}

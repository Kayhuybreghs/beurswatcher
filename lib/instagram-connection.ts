import {
  readInstagramConfig,
  openToken,
  sealToken,
} from './instagram-security.ts';
import {
  getInstagramStore,
  instagramDatabaseConfig,
} from './instagram-store.ts';
import {
  refreshInstagramToken,
  InstagramProviderError,
} from './instagram-provider.ts';

export const INSTAGRAM_FLOW_COOKIE = 'bw_instagram_flow';
export const INSTAGRAM_NOTICE_COOKIE = 'bw_instagram_notice';

export function instagramRuntimeConfig() {
  const config = readInstagramConfig();
  if (!process.env.CRON_SECRET || process.env.CRON_SECRET.length < 32)
    throw new Error('Instagram setup incomplete');
  instagramDatabaseConfig();
  return config;
}

export async function instagramCredentials() {
  // Encrypted managed connections take priority; never silently reuse an old revoked token.
  if (process.env.INSTAGRAM_TOKEN_ENCRYPTION_KEY) {
    const config = readInstagramConfig();
    const saved = await getInstagramStore().get();
    if (saved) {
      if (
        saved.status !== 'connected' ||
        saved.expiresAt <= Date.now() ||
        saved.username !== config.username
      )
        throw new Error('Instagram reconnect required');
      return {
        userId: saved.userId,
        username: saved.username,
        accessToken: openToken(saved.token, config.encryptionKey),
      };
    }
  }
  // Compatibility for the existing manual environment-variable connection.
  if (
    process.env.INSTAGRAM_ACCESS_TOKEN &&
    /^\d+$/.test(process.env.INSTAGRAM_USER_ID || '')
  )
    return {
      userId: process.env.INSTAGRAM_USER_ID!,
      username: 'beurswatcher',
      accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    };
  return null;
}

export async function maintainInstagramConnection() {
  const config = instagramRuntimeConfig();
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

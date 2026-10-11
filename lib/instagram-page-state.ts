import { cookies } from 'next/headers';
import {
  instagramRuntimeConfig,
  INSTAGRAM_NOTICE_COOKIE,
} from './instagram-connection';
import { verifyNotice } from './instagram-security';

export async function getConnectionPageState() {
  try {
    const config = await instagramRuntimeConfig();
    const notice = (await cookies()).get(INSTAGRAM_NOTICE_COOKIE)?.value;
    return {
      configured: true,
      username: config.username,
      result: notice
        ? verifyNotice(notice, config.connectSecret) || undefined
        : undefined,
    };
  } catch {
    return { configured: false, username: 'beurswatcher', result: undefined };
  }
}

import { Reflect } from '@rocicorp/reflect/client';
import { mutators } from './mutators';
import { decodeJWTPayload, sanitizeRoomID } from './lib/utils';

const server: string | undefined = import.meta.env.VITE_REFLECT_URL;
if (!server) {
  throw new Error('VITE_REFLECT_URL required');
}

const authCookie = document.cookie
  .split('; ')
  .map((entry) => entry.split('='))
  .find(([key]) => key === 'CF_Authorization')?.[1];
console.log(document.cookie);
if (import.meta.env.PROD && authCookie == null) {
  // We may be logged in, but the cookie may have been deleted while we're sitting on the page.
  // Refresh to re-authenticate.
  // window.location.assign('/cdn-cgi/access/logout');
}

const payload = import.meta.env.PROD
  ? decodeJWTPayload(authCookie ?? '')
  : { email: 'test@example.com' };
const userID = payload.email;
const roomID = sanitizeRoomID(userID);

export const r = new Reflect({
  server,
  userID,
  roomID,
  auth: userID,
  mutators,
  schemaVersion: '1',
  kvStore: 'idb',
});

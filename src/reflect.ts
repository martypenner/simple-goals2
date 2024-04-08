import { Reflect } from '@rocicorp/reflect/client';
import { mutators } from './mutators';

const server: string | undefined = import.meta.env.VITE_REFLECT_URL;
if (!server) {
  throw new Error('VITE_REFLECT_URL required');
}

const userID = 'my-user-id';
const roomID = 'my-room';

export const r = new Reflect({
  server,
  userID,
  roomID,
  auth: userID,
  mutators,
  schemaVersion: '1',
  kvStore: 'idb',
});

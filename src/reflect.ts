import { Reflect } from '@rocicorp/reflect/client';
import { nanoid } from 'nanoid';
import { mutators } from './mutators';

const server: string | undefined = import.meta.env.VITE_REFLECT_URL;
if (!server) {
  throw new Error('VITE_REFLECT_URL required');
}

const userID = nanoid();
const roomID = 'my-room';

export const r = new Reflect({
  server,
  userID,
  roomID,
  auth: userID,
  mutators,
});

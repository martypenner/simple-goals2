import { init, initGoal } from '@/client-state';
import { WriteTransaction } from '@rocicorp/reflect';
import type {
  AuthHandler,
  ReflectServerOptions,
} from '@rocicorp/reflect/server';
import { nanoid } from 'nanoid';
import { sanitizeRoomID } from '../src/lib/utils';
import { Mutators, mutators } from '../src/mutators';

const authHandler: AuthHandler = (auth: string, requestedRoomID: string) => {
  const givenRoomId = sanitizeRoomID(auth);
  if (auth && requestedRoomID === givenRoomId) {
    return {
      userID: auth,
    };
  }
  return null;
};

const roomStartHandler: ReflectServerOptions<Mutators>['roomStartHandler'] =
  async (tx: WriteTransaction) => {
    const isInitialized = !(await init(tx, { id: 'init' }));
    if (isInitialized) return;

    if (process.env.NODE_ENV === 'development') {
      const id = nanoid();
      await tx.set(`goal/${id}`, {
        id: id,
        progress: 90,
        desiredCount: 100,
        title: 'Write a poem',
        description: `I've always had a story to tell, and now I'm finally putting it on paper.`,
        createdAt: new Date('March 23, 2024').valueOf(),
        updatedAt: new Date('March 23, 2024').valueOf(),
        endDate: new Date('March 23, 2025').valueOf(),
      });
    }

    await initGoal(tx, {
      id: 'demo',
      progress: 40,
      desiredCount: 40,
      title: 'Be awesome',
      description: `Finishing goals rules!`,
      createdAt: new Date('March 23, 2024').valueOf(),
      updatedAt: new Date('March 23, 2024').valueOf(),
      completedAt: new Date('June 12, 2024').valueOf(),
      endDate: new Date('March 23, 2025').valueOf(),
    });
  };

function makeOptions(): ReflectServerOptions<Mutators> {
  return {
    mutators,
    authHandler,
    roomStartHandler,
  };
}

export { makeOptions as default };

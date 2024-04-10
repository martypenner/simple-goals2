import { WriteTransaction } from '@rocicorp/reflect';
import type {
  AuthHandler,
  ReflectServerOptions,
} from '@rocicorp/reflect/server';
import { nanoid } from 'nanoid';
import { Mutators, mutators } from '../src/mutators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authHandler: AuthHandler = (auth: string, _roomID: string) => {
  if (auth) {
    // A real implementation could:
    // 1. if using session auth make a fetch call to a service to
    //    look up the userID by `auth` in a session database.
    // 2. if using stateless JSON Web Token auth, decrypt and validate the token
    //    and return the sub field value for userID (i.e. subject field).
    // It should also check that the user with userID is authorized
    // to access the room with roomID.
    return {
      userID: auth,
    };
  }
  return null;
};

const roomStartHandler: ReflectServerOptions<Mutators>['roomStartHandler'] =
  async (tx: WriteTransaction) => {
    if (!(await tx.isEmpty())) return;

    if (process.env.NODE_ENV === 'development') {
      const id = nanoid();
      await tx.set(`goal/${id}`, {
        id: id,
        progress: 90,
        title: 'Write a poem',
        description: `I've always had a story to tell, and now I'm finally putting it on paper.`,
        createdAt: new Date('March 23, 2024').valueOf(),
        updatedAt: new Date('March 23, 2024').valueOf(),
        endDate: new Date('March 23, 2025').valueOf(),
      });
    }

    const id = nanoid();
    await tx.set(`goal/${id}`, {
      id: id,
      progress: 100,
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

// This file defines our "mutators".
//
// Mutators are how you change data in Reflect apps.
//
// They are registered with Reflect at construction-time and callable like:
// `myReflect.mutate.setCursor()`.
//
// Reflect runs each mutation immediately (optimistically) on the client,
// against the local cache, and then later (usually moments later) sends a
// description of the mutation (its name and arguments) to the server, so that
// the server can *re-run* the mutation there against the authoritative
// datastore.
//
// This re-running of mutations is how Reflect handles conflicts: the
// mutators defensively check the database when they run and do the appropriate
// thing. The Reflect sync protocol ensures that the server-side result takes
// precedence over the client-side optimistic result.

import type { MutatorDefs, WriteTransaction } from '@rocicorp/reflect';
import {
  Goal,
  addGoal,
  mustGetGoal,
  removeGoal,
  updateGoal,
} from './client-state';

export const mutators = {
  addGoal,
  removeGoal,
  updateGoalProgress,
} satisfies MutatorDefs;

export type Mutators = typeof mutators;

export async function updateGoalProgress(tx: WriteTransaction, id: Goal['id']) {
  const goal = await mustGetGoal(tx, id);
  const progress = Math.min(goal.progress + 1, goal.desiredCount ?? 100);
  return await updateGoal(tx, {
    id,
    progress,
    completedAt:
      progress === (goal.desiredCount ?? 100) ? Date.now() : undefined,
  });
}

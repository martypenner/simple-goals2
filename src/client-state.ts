import { Entity, generate } from '@rocicorp/rails';

export type Goal = Entity & {
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  completedAt?: number;
  endDate: number;
  /** Track the number of times this item / goal has been done. */
  progress: number;
  /**
   * Track the total number of times this item / goal wants to be done.
   * Dividing the progress by this number is what shows up in the progress bar.
   * This is optional because it wasn't there from the beginning.
   */
  desiredCount?: number;
};

export {
  init,
  get,
  initGoal,
  mustGetGoal,
  listGoals,
  removeGoal,
  addGoal,
  updateGoal,
};

const { init, get } = generate<Entity>('init');

const {
  init: initGoal,
  mustGet: mustGetGoal,
  list: listGoals,
  delete: removeGoal,
  set: addGoal,
  update: updateGoal,
} = generate<Goal>('goal');

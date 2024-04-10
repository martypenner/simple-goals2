import { Entity, generate } from '@rocicorp/rails';

export type Goal = Entity & {
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  completedAt?: number;
  endDate: number;
  progress: number;
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

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

export { mustGetGoal, listGoals, removeGoal, addGoal, updateGoal };

const {
  mustGet: mustGetGoal,
  list: listGoals,
  delete: removeGoal,
  set: addGoal,
  update: updateGoal,
} = generate<Goal>('goal');

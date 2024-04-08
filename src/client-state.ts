import { Entity, generate } from '@rocicorp/rails';

export type Goal = Entity & {
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  endDate: number;
  completed: boolean;
};

export { listGoals, removeGoal, addGoal };

const { list: listGoals, delete: removeGoal, set: addGoal } = generate('goal');

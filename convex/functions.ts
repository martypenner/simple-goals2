import { type WithoutSystemFields } from 'convex/server';
import { v } from 'convex/values';
import { Doc } from './_generated/dataModel';
import { mutation, query } from './_generated/server';

export const listUnfinishedGoals = query({
  args: {},
  handler: async (ctx) => {
    const goals = await ctx.db.query('goals').order('desc').collect();
    return goals
      .filter((goal) => goal.completedAt == null)
      .map((goal) => ({
        ...goal,
        progress: Number(goal.progress),
        updatedAt: Number(goal.updatedAt),
        endDate: Number(goal.endDate),
        completedAt: goal.completedAt ? Number(goal.completedAt) : undefined,
        desiredCount: Number(goal.desiredCount),
      }));
  },
});

export const listCompletedGoals = query({
  args: {},
  handler: async (ctx) => {
    const goals = await ctx.db.query('goals').collect();
    return goals
      .sort(
        (a, b) =>
          Number(b?.completedAt ?? Date.now()) -
          Number(a?.completedAt ?? Date.now()),
      )
      .filter((goal) => goal.completedAt != null)
      .map((goal) => ({
        ...goal,
        progress: Number(goal.progress),
        updatedAt: Number(goal.updatedAt),
        endDate: Number(goal.endDate),
        completedAt: goal.completedAt ? Number(goal.completedAt) : undefined,
        desiredCount: Number(goal.desiredCount),
      }));
  },
});

export const addGoal = mutation({
  handler: async (ctx, args: WithoutSystemFields<Doc<'goals'>>) => {
    await ctx.db.insert('goals', args);
  },
});

export const removeGoal = mutation({
  args: {
    id: v.id('goals'),
  },

  handler: async (ctx, { id }) => {
    return await ctx.db.delete(id);
  },
});

export const updateGoalProgress = mutation({
  args: {
    id: v.id('goals'),
  },

  handler: async (ctx, { id }) => {
    const goal = await ctx.db.get(id);
    if (!goal) return;

    const progress = Math.min(
      Number(goal.progress) + 1,
      Number(goal.desiredCount) ?? 100,
    );
    await ctx.db.patch(id, {
      progress: BigInt(progress),
      completedAt:
        progress === Number(goal.desiredCount ?? 100)
          ? BigInt(Date.now())
          : undefined,
    });
  },
});

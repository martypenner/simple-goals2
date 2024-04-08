// This file defines our "subscriptions". Subscriptions are how Reflect
// notifies you when data has changed. Subscriptions fire whenever the watched
// data changes, whether because the local client changed it, or because some
// other collaborating client changed it. The model is that you render your app
// reactively based on these subscriptions. This guarantees the UI always
// consistently shows the latest data.
//
// Subscriptions can be arbitrary computations of the data in Reflect. The
// subscription "query" is re-run whenever any of the data it depends on
// changes. The subscription "fires" when the result of the query changes.

import type { Reflect } from '@rocicorp/reflect/client';
import { useSubscribe } from '@rocicorp/reflect/react';
import { type Goal, listGoals } from './client-state';
import type { Mutators } from './mutators';

export function useUnfinishedGoals(r: Reflect<Mutators>): Goal[] {
  return useSubscribe(
    r,
    async (tx) => {
      const goals = await listGoals(tx);
      return goals.filter((goal) => goal.progress < 100);
    },
    [],
  );
}

export function useCompletedGoals(r: Reflect<Mutators>): Goal[] {
  return useSubscribe(
    r,
    async (tx) => {
      const goals = await listGoals(tx);
      return goals.filter((goal) => goal.progress === 100);
    },
    [],
  );
}

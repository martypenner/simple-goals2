import { Goal } from '@/client-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { r } from '@/reflect';
import { useCompletedGoals, useUnfinishedGoals } from '@/subscriptions';
import confetti from 'canvas-confetti';
import { Minus, Plus, Trash2 } from 'lucide-react';
import React, { SVGAttributes } from 'react';
import { SetGoal } from './set-goal';
import { Separator } from './ui/separator';

export function Goals() {
  const unfinishedGoals = useUnfinishedGoals(r);
  const completedGoals = useCompletedGoals(r);

  const [showCreate, setShowCreate] = React.useState(false);

  return (
    <div className="grid gap-4 w-full max-w-3xl p-4 rounded-lg border border-gray-200 shadow-lg md:gap-8 md:p-10">
      <h1 className="text-3xl font-bold flex flex-row items-center justify-between">
        My Goals
        <Button variant="outline" onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? (
            <>
              <span className="sr-only">Hide form</span>
              <Minus className="h-3 w-3" />
            </>
          ) : (
            <>
              <span className="sr-only">Show form</span>
              <Plus className="h-3 w-3" />
            </>
          )}
        </Button>
      </h1>

      {showCreate && <SetGoal onCreateGoal={() => setShowCreate(false)} />}

      <div className="grid gap-4">
        {unfinishedGoals.length === 0 ? (
          <h4 className="text-md">You haven't created any goals yet!</h4>
        ) : (
          unfinishedGoals.map((goal) => (
            <Card key={goal.id}>
              <CardContent className="flex flex-col gap-2">
                <div className="flex flex-row items-end justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      {goal.title}
                    </CardTitle>
                    {goal.progress === 0 ? (
                      <Badge className="text-sm" variant="secondary">
                        Not started
                      </Badge>
                    ) : (
                      <Badge className="text-sm" variant="outline">
                        In progress
                      </Badge>
                    )}
                  </div>

                  <DeleteButton goal={goal} />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {goal.description}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <CalendarCheckIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Started on {new Date(goal.createdAt).toDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Deadline: {new Date(goal.endDate).toDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center"
                    onClick={() => {
                      r.mutate.updateGoalProgress(goal.id);
                      // Next tick will be 100
                      if (goal.progress === 99) {
                        showConfetti();
                      }
                    }}
                  >
                    <Plus className="h-3 w-3 mr-2" />
                    Mark progress
                  </Button>
                  {/* <Button variant="outline"> */}
                  {/*   <ChevronDownIcon className="h-3 w-3 mr-2" /> */}
                  {/*   Decrease */}
                  {/* </Button> */}
                </div>
                <div className="w-full mt-2">
                  <Progress value={goal.progress} />
                </div>
              </CardContent>
            </Card>
          ))
        )}

        <Separator className="mt-6 mb-2" />

        <h2 className="text-xl font-bold text-primary">Completed Goals</h2>

        {completedGoals.length === 0 ? (
          <h4 className="text-md">You haven't completed any goals yet!</h4>
        ) : (
          completedGoals.map((goal) => (
            <Card key={goal.id}>
              <CardContent className="flex flex-col gap-2">
                <div className="flex flex-row items-end justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      {goal.title}
                    </CardTitle>
                    {goal.completedAt && (
                      <Badge className="text-sm" variant="default">
                        Completed on {new Date(goal.completedAt).toDateString()}
                      </Badge>
                    )}
                  </div>

                  <DeleteButton goal={goal} />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {goal.description}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <CalendarCheckIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Started on {new Date(goal.createdAt).toDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Deadline: {new Date(goal.endDate).toDateString()}
                    </span>
                  </div>
                </div>
                <div className="w-full mt-2">
                  <Progress value={100} />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function CalendarCheckIcon(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

function CalendarIcon(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function showConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 240,
    zIndex: 0,
  };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: {
        x: randomInRange(0.1, 0.3),
        y: Math.random() - 0.2,
      },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: {
        x: randomInRange(0.7, 0.9),
        y: Math.random() - 0.2,
      },
    });
  }, 250);
}

function DeleteButton({ goal }: { goal: Goal }) {
  return (
    <Button
      variant="outline"
      onClick={() => {
        if (
          window.confirm(
            'Are you sure you want to remove this goal? This action cannot be undone.',
          )
        ) {
          r.mutate.removeGoal(goal.id);
        }
      }}
    >
      <span className="sr-only">Show form</span>
      <Trash2 className="h-3 w-3" />
    </Button>
  );
}

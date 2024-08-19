import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import confetti from 'canvas-confetti';
import { Doc } from 'convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import React, { SVGAttributes } from 'react';
import { api } from '../../convex/_generated/api';
import { SetGoal } from './set-goal';
import { Separator } from './ui/separator';

export function Goals() {
  const unfinishedGoals = useQuery(api.functions.listUnfinishedGoals);
  const completedGoals = useQuery(api.functions.listCompletedGoals);

  const updateGoalProgress = useMutation(api.functions.updateGoalProgress);

  const [showCreate, setShowCreate] = React.useState(false);

  return (
    <div className="mx-auto mt-4 grid gap-4 w-full max-w-3xl p-4 rounded-lg border border-gray-200 shadow-lg md:gap-8 md:p-10">
      <h1 className="text-3xl font-bold flex flex-row items-center justify-between">
        My goals
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
        {unfinishedGoals?.length === 0 ? (
          <h4 className="text-md">You haven't created any goals yet!</h4>
        ) : (
          unfinishedGoals?.map((goal) => {
            const paddedGoal =
              `${goal.progress} / ${goal.desiredCount ?? 100}`.padStart(
                '1000'.length * 2 + ' / '.length,
                ' ',
              );
            return (
              <motion.div layoutId={goal._id} key={goal._id}>
                <Card>
                  <CardContent className="flex flex-col gap-2">
                    <div className="flex flex-row items-end justify-between gap-4">
                      <div className="flex flex-row items-end justify-between gap-4">
                        <CardTitle className="text-xl font-bold">
                          {goal.title}
                        </CardTitle>
                        {goal.progress === 0 ? (
                          <Badge
                            className="text-sm text-nowrap"
                            variant="secondary"
                          >
                            Not started
                          </Badge>
                        ) : (
                          <Badge
                            className="text-sm text-nowrap"
                            variant="outline"
                          >
                            In progress
                          </Badge>
                        )}
                      </div>

                      <DeleteButton id={goal._id} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {goal.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <CalendarCheckIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Started on{' '}
                          {new Date(goal._creationTime).toDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Deadline: {new Date(goal.endDate).toDateString()}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="flex items-center justify-center"
                      onClick={() => {
                        updateGoalProgress({ id: goal._id })
                          .then(() => {
                            // Next tick will be completed
                            if (
                              goal.progress ===
                              (goal.desiredCount ?? 100) - 1
                            ) {
                              showConfetti();
                            }
                          })
                          .then(() => {})
                          .catch(() => {});
                      }}
                    >
                      <Plus className="h-3 w-3 mr-2" />
                      Mark progress
                    </Button>
                    {/* <Button variant="outline"> */}
                    {/*   <ChevronDownIcon className="h-3 w-3 mr-2" /> */}
                    {/*   Decrease */}
                    {/* </Button> */}

                    <div className="flex flex-row justify-between gap-4 mt-2">
                      <Progress
                        value={
                          (goal.progress / (goal.desiredCount ?? 100)) * 100
                        }
                      />

                      <span className="text-gray-500 text-xs text-nowrap">
                        {paddedGoal.replaceAll(/ /g, '\u00a0')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        )}

        <Separator className="mt-6 mb-2" />

        <h2 className="text-xl font-bold text-primary">Completed goals</h2>

        {completedGoals?.length === 0 ? (
          <h4 className="text-md">You haven't completed any goals yet!</h4>
        ) : (
          completedGoals?.map((goal) => {
            const paddedGoal =
              `${goal.progress} / ${goal.desiredCount ?? 100}`.padStart(
                '1000'.length * 2 + ' / '.length,
                ' ',
              );
            return (
              <motion.div layoutId={goal._id} key={goal._id}>
                <Card>
                  <CardContent className="flex flex-col gap-2">
                    <div className="flex flex-row items-end justify-between gap-4">
                      <div className="flex flex-row items-end justify-between gap-4">
                        <CardTitle className="text-xl font-bold">
                          {goal.title}
                        </CardTitle>
                        {goal.completedAt != null && (
                          <Badge
                            className="text-sm text-nowrap"
                            variant="default"
                          >
                            Completed on{' '}
                            {new Date(goal.completedAt).toDateString()}
                          </Badge>
                        )}
                      </div>

                      <DeleteButton id={goal._id} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {goal.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <CalendarCheckIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Started on{' '}
                          {new Date(goal._creationTime).toDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Deadline: {new Date(goal.endDate).toDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between gap-4 mt-2">
                      <Progress value={100} />

                      <span className="text-gray-500 text-xs text-nowrap">
                        {paddedGoal.replaceAll(/ /g, '\u00a0')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
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
    // eslint-disable-next-line
    confetti({
      ...defaults,
      particleCount,
      origin: {
        x: randomInRange(0.1, 0.3),
        y: Math.random() - 0.2,
      },
    });
    // eslint-disable-next-line
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

function DeleteButton({ id }: { id: Doc<'goals'>['_id'] }) {
  const removeGoal = useMutation(api.functions.removeGoal);

  return (
    <Button
      variant="outline"
      onClick={() => {
        if (
          window.confirm(
            'Are you sure you want to remove this goal? This action cannot be undone.',
          )
        ) {
          removeGoal({ id })
            .then(() => {})
            .catch(() => {});
        }
      }}
    >
      <span className="sr-only">Show form</span>
      <Trash2 className="h-3 w-3" />
    </Button>
  );
}

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { r } from '@/reflect';
import { useCompletedGoals, useUnfinishedGoals } from '@/subscriptions';
import { Plus } from 'lucide-react';
import { SVGAttributes } from 'react';
import { Separator } from './ui/separator';

export function Goals() {
  const unfinishedGoals = useUnfinishedGoals(r);
  const completedGoals = useCompletedGoals(r);

  return (
    <div className="grid gap-4 w-full max-w-3xl p-4 rounded-lg border border-gray-200 shadow-lg md:gap-8 md:p-10">
      <h1 className="text-3xl font-bold">My Goals</h1>
      <div className="grid gap-4">
        {unfinishedGoals.map((goal) => (
          <Card key={goal.id}>
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-row items-end gap-2">
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
                  onClick={() => r.mutate.updateGoalProgress(goal.id)}
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
        ))}

        <Separator className="mt-6 mb-2" />

        <h2 className="text-xl font-bold text-primary">Completed Goals</h2>

        {completedGoals.map((goal) => (
          <Card key={goal.id}>
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-row items-end gap-2">
                <CardTitle className="text-xl font-bold">
                  {goal.title}
                </CardTitle>
                {goal.completedAt && (
                  <Badge className="text-sm" variant="default">
                    Completed on {new Date(goal.completedAt).toDateString()}
                  </Badge>
                )}
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
        ))}
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

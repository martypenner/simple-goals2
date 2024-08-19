import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DatePicker } from '@/components/ui/datepicker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { api } from 'convex/_generated/api';
import { useMutation } from 'convex/react';
import React from 'react';

export function SetGoal({ onCreateGoal }: { onCreateGoal: () => void }) {
  const addGoal = useMutation(api.functions.addGoal);

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const title = data.get('title')?.toString() ?? '';
      const description = data.get('description')?.toString() ?? '';
      const deadline = BigInt(
        data.get('deadline')?.toString() ?? `${Date.now()}`,
      );
      const desiredCount = BigInt(
        Math.max(
          Number(data.get('desiredCount')?.toString() ?? `${Date.now()}`),
          1,
        ),
      );
      addGoal({
        title,
        description,
        endDate: deadline,
        updatedAt: BigInt(Date.now()),
        progress: BigInt(0),
        desiredCount,
      })
        .then(() => {})
        .catch(() => {});
      onCreateGoal();
    },
    [onCreateGoal, addGoal],
  );

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Set a goal</CardTitle>
          <CardDescription>What's your next awesome thing?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Your goal" name="title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              className="min-h-[100px]"
              id="description"
              name="description"
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <Label>Deadline</Label>
            <DatePicker />
          </div>
          <div className="space-y-2 flex flex-col">
            <Label>How many times do you want to do this thing?</Label>
            <Input id="desiredCount" name="desiredCount" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm" type="submit">
            Add goal
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

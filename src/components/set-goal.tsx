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
import { r } from '@/reflect';
import { nanoid } from 'nanoid';
import React from 'react';

export function SetGoal({ onCreateGoal }: { onCreateGoal: () => void }) {
  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const title = data.get('title')?.toString() ?? '';
      const description = data.get('description')?.toString() ?? '';
      const deadline = Number(
        data.get('deadline')?.toString() ?? `${Date.now()}`,
      );
      r.mutate.addGoal({
        id: nanoid(),
        title,
        description,
        endDate: deadline,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        progress: 0,
      });
      onCreateGoal();
    },
    [onCreateGoal],
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

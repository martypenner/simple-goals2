import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const plusOneYear = new Date();
plusOneYear.setFullYear(plusOneYear.getFullYear() + 1);

export function DatePicker(props: {
  onValueChange?: (value?: number) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(plusOneYear);

  return (
    <Popover>
      <input type="hidden" name="deadline" value={date?.getTime()} />

      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          defaultValue="365"
          onValueChange={(value) => {
            const date = addDays(new Date(), parseInt(value, 10));
            setDate(date);
            props.onValueChange?.(date?.getTime());
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="7">In a week</SelectItem>
            <SelectItem value="30">In a month</SelectItem>
            <SelectItem value="120">In 3 months</SelectItem>
            <SelectItem value="180">In 6 months</SelectItem>
            <SelectItem value="365">In a year</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              props.onValueChange?.(date?.getTime());
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

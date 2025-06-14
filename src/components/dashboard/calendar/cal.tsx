'use client';

import { Button } from '@/components/ui/button';
import { Calendar, CalendarDayButton } from '@/components/ui/calendar';
import type { Analytic } from '@/types/analytic.type';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const CalTest = ({ data }: { data: Analytic[] }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    console.log('analytics', data);
  }, [data]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-4">
      <Calendar
        mode="single"
        className="rounded-lg border"
        selected={date}
        onSelect={setDate}
        components={{
          DayButton: ({ children, modifiers, day, ...props }) => {
            return (
              <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                {children}
                <ul className="absolute right-0 bottom-0 left-0 flex scale-80 justify-center gap-1 px-2 py-1">
                  {data
                    .filter((item) => day.dateLib.isSameDay(new Date(item.createdAt), day.date))
                    .map((item) => {
                      const bg = modifiers.selected ? 'bg-background' : 'bg-foreground';

                      return (
                        <li
                          className={`h-1 w-1 rounded-full transition-colors ${bg}`}
                          key={item.UUID}
                        ></li>
                      );
                    })}
                </ul>
              </CalendarDayButton>
            );
          },
        }}
      />
      <div className="flex flex-col items-start gap-3 border-t px-4 !pt-4">
        <div className="flex w-full items-center justify-between px-1">
          <div className="text-sm font-medium">
            {date?.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
          <Button variant="ghost" size="icon" className="size-6" title="Add Event">
            <PlusIcon />
            <span className="sr-only">Add Event</span>
          </Button>
        </div>
        <div className="flex w-full flex-col gap-2">
          {data.map((event) => (
            <div
              key={event.UUID}
              className="bg-muted after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
            >
              <div className="font-medium">title</div>
              <div className="text-muted-foreground text-xs">
                {/* {formatDateRange(new Date(event.from), new Date(event.to))} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalTest;

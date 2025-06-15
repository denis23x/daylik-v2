'use client';

import { Calendar, CalendarDayButton } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { PopoverContent, PopoverTrigger } from '../ui/popover';
import { Popover } from '@radix-ui/react-popover';
import { Separator } from '../ui/separator';
import dayjs from 'dayjs';
import { useTeamsFromAnalytic } from '@/hooks/useAnalyticsTeams';
import type { AnalyticTeam } from '@/types/analyticTeam.type';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavbarCalendar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticTeam[]>([]);
  const { data } = useTeamsFromAnalytic({
    query: `*, teams (UUID, name)`,
  });

  // Close sheet when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (data) {
      const analytics = data
        .filter((analytic) => dayjs(analytic.createdAt).isSame(date, 'day'))
        .map((analytic) => {
          const createdAt = dayjs(analytic.createdAt).format('MMM D');
          const startedAt = dayjs(analytic.startedAt).format('HH:mm');
          const finishedAt = dayjs(analytic.finishedAt).format('HH:mm');

          return {
            ...analytic,
            createdAt: `${createdAt}, ${startedAt} - ${finishedAt}`,
          };
        });

      setAnalytics(analytics);
    }
  }, [date, data, setAnalytics]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()} className="w-auto p-0">
        <div className="flex flex-col">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            components={{
              DayButton: ({ children, modifiers, day, ...props }) => {
                return (
                  <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                    {children}
                    {data && (
                      <ul className="absolute right-0 bottom-0 left-0 flex scale-80 justify-center gap-1 px-2 py-1">
                        {data
                          .filter((item) =>
                            day.dateLib.isSameDay(new Date(item.createdAt), day.date)
                          )
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
                    )}
                  </CalendarDayButton>
                );
              },
            }}
          />
          {analytics.length > 0 && (
            <>
              <Separator />
              <ul className="flex w-full flex-col gap-2 p-3">
                {analytics.map((analytic) => (
                  <li key={analytic.UUID}>
                    <Link
                      href={`/analytics/${analytic.UUID}`}
                      className="bg-muted after:bg-primary/70 relative flex flex-col rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
                    >
                      <div className="font-medium">{analytic.team.name}</div>
                      <div className="text-muted-foreground text-xs">{analytic.createdAt}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarCalendar;

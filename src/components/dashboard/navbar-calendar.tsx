'use client';

import { Calendar, CalendarDayButton } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { PopoverContent, PopoverTrigger } from '../ui/popover';
import { Popover } from '@radix-ui/react-popover';
import { Separator } from '../ui/separator';
import { isSameDay, format } from 'date-fns';
import { useTeamsFromAnalytic } from '@/hooks/useAnalyticsTeams';
import { Link, usePathname } from '@/i18n/navigation';
import type { Analytics } from '@/types/analytics.type';
import { ArrowRight } from 'lucide-react';

const NavbarCalendar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [analyticsByDate, setAnalyticsByDate] = useState<Analytics[]>([]);
  const { data: analytics } = useTeamsFromAnalytic({
    query: `*, teams (UUID, name)`,
  });

  // Close sheet when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (date && analytics) {
      setAnalyticsByDate(analytics.filter((analytic) => isSameDay(analytic.createdAt, date)));
    }
  }, [date, analytics, setAnalyticsByDate]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-auto p-0"
        sideOffset={16}
        collisionPadding={16}
      >
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
                    {analytics && (
                      <ul className="absolute right-0 bottom-0 left-0 flex justify-center gap-1 px-2 py-1">
                        {analytics
                          .filter((a) => isSameDay(new Date(a.createdAt), day.date))
                          .slice(0, 3)
                          .map((item) => {
                            return (
                              <li
                                className={`aspect-square size-0.75 rounded-full transition-colors ${modifiers.selected ? 'bg-background' : 'bg-foreground'}`}
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
          {analyticsByDate.length > 0 && (
            <div className="flex flex-col">
              <Separator />
              <ul className="flex w-full flex-col gap-2 p-3">
                {analyticsByDate.map((analytic) => (
                  <li key={analytic.UUID}>
                    <Link
                      href={`/analytics/${analytic.UUID}`}
                      className="group bg-muted after:bg-primary/70 relative flex items-center justify-between gap-4 rounded-md py-2 pr-4 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{analytic.team?.name}</span>
                        <div className="text-muted-foreground text-xs">
                          {format(analytic.startedAt, 'HH:mm')} -{' '}
                          {format(analytic.finishedAt, 'HH:mm')}
                        </div>
                      </div>
                      <ArrowRight
                        className="transition-transform group-hover:translate-x-1"
                        size={16}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarCalendar;

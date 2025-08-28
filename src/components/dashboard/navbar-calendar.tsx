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
import { Armchair, ArrowRight, RefreshCw, Spade } from 'lucide-react';
import { useDayPickerLocale } from '@/hooks/ui/useDayPickerLocale';
import { getCurrentMonthRange } from '@/utils/getCurrentMonthRange';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { useRetros } from '@/hooks/useRetros';
import type { Retro } from '@/types/retro.type';
import { usePoker } from '@/hooks/usePoker';
import { Poker } from '@/types/poker.type';

type ItemByDate =
  | (Analytics & { type: 'analytics' })
  | (Retro & { type: 'retros' })
  | (Poker & { type: 'poker' });

const NavbarCalendar = ({ children }: { children: React.ReactNode }) => {
  const locale = useDayPickerLocale();
  const pathname = usePathname();
  const [day, setDay] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date | undefined>(new Date());
  const { from, to } = getCurrentMonthRange(month);
  const [open, setOpen] = useState(false);
  const [analyticsByDate, setAnalyticsByDate] = useState<Analytics[]>([]);
  const [retrosByDate, setRetrosByDate] = useState<Retro[]>([]);
  const [pokerByDate, setPokerByDate] = useState<Poker[]>([]);
  const [itemsByDate, setItemsByDate] = useState<ItemByDate[]>([]);
  const { data: analytics } = useTeamsFromAnalytic({
    query: 'UUID, startedAt, createdAt, teams (name)',
    gte: from,
    lte: to,
  });
  const { data: retros } = useRetros({
    query: 'UUID, name, createdAt',
    gte: from,
    lte: to,
  });
  const { data: poker } = usePoker({
    query: 'UUID, name, createdAt',
    gte: from,
    lte: to,
  });

  // Close sheet when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (day && analytics) {
      setAnalyticsByDate(analytics.filter((analytic) => isSameDay(analytic.createdAt, day)));
    }
  }, [day, analytics, setAnalyticsByDate]);

  useEffect(() => {
    if (day && retros) {
      setRetrosByDate(retros.filter((retro) => isSameDay(retro.createdAt, day)));
    }
  }, [day, retros, setRetrosByDate]);

  useEffect(() => {
    if (day && poker) {
      setPokerByDate(poker.filter((p) => isSameDay(p.createdAt, day)));
    }
  }, [day, poker, setPokerByDate]);

  useEffect(() => {
    const analyticsByDateWithType = analyticsByDate.map((analytic) => ({
      ...analytic,
      type: 'analytics',
    }));

    const retrosByDateWithType = retrosByDate.map((retro) => ({
      ...retro,
      type: 'retros',
    }));

    const pokerByDateWithType = pokerByDate.map((poker) => ({
      ...poker,
      type: 'poker',
    }));

    const itemsByDate = [
      ...analyticsByDateWithType,
      ...retrosByDateWithType,
      ...pokerByDateWithType,
    ].sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    setItemsByDate(itemsByDate as ItemByDate[]);
  }, [analyticsByDate, retrosByDate, pokerByDate, setItemsByDate]);

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
            selected={day}
            onSelect={setDay}
            onMonthChange={setMonth}
            locale={locale}
            components={{
              DayButton: ({ children, modifiers, day, ...props }) => {
                return (
                  <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                    {children}
                    {analytics && retros && poker && (
                      <ul className="absolute right-0 bottom-0 left-0 flex justify-center gap-1 px-2 py-1">
                        {[...analytics, ...retros, ...poker]
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
          {itemsByDate.length > 0 && (
            <div className="flex flex-col">
              <Separator />
              <ul className="flex w-full flex-col gap-2 p-3">
                {itemsByDate.map((item) =>
                  item.type === 'analytics' ? (
                    <li className="flex items-center justify-between gap-2" key={item.UUID}>
                      <Link
                        href={{
                          pathname: '/analytics/[UUID]',
                          params: { UUID: item.UUID },
                        }}
                        className={cn(
                          buttonVariants({ variant: 'secondary', size: 'sm' }),
                          'flex-1 gap-2'
                        )}
                      >
                        <RefreshCw />
                        <p className="flex flex-1 items-center gap-2">
                          <span className="font-medium">{item.team?.name} </span>
                          <span className="text-muted-foreground text-xs">
                            {format(item.startedAt, 'HH:mm')}
                          </span>
                        </p>
                        <ArrowRight />
                      </Link>
                    </li>
                  ) : item.type === 'retros' ? (
                    <li className="flex items-center justify-between gap-2" key={item.UUID}>
                      <Link
                        href={{
                          pathname: '/retros/[UUID]',
                          params: { UUID: item.UUID },
                        }}
                        className={cn(
                          buttonVariants({ variant: 'secondary', size: 'sm' }),
                          'flex-1 gap-2'
                        )}
                      >
                        <Armchair />
                        <p className="flex flex-1 items-center gap-2">
                          <span className="font-medium">{item.name} </span>
                          <span className="text-muted-foreground text-xs">
                            {format(item.createdAt, 'HH:mm')}
                          </span>
                        </p>
                        <ArrowRight />
                      </Link>
                    </li>
                  ) : item.type === 'poker' ? (
                    <li className="flex items-center justify-between gap-2" key={item.UUID}>
                      <Link
                        href={{
                          pathname: '/poker/[UUID]',
                          params: { UUID: item.UUID },
                        }}
                        className={cn(
                          buttonVariants({ variant: 'secondary', size: 'sm' }),
                          'flex-1 gap-2'
                        )}
                      >
                        <Spade />
                        <p className="flex flex-1 items-center gap-2">
                          <span className="font-medium">{item.name} </span>
                          <span className="text-muted-foreground text-xs">
                            {format(item.createdAt, 'HH:mm')}
                          </span>
                        </p>
                        <ArrowRight />
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarCalendar;

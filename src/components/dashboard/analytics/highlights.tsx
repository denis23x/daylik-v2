'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CircleCheckBig, Crown, Ghost, RadioTower, Snowflake } from 'lucide-react';
import HoverEffectHighlights from '@/components/hover-effect-highlights';
import { useEffect, useState } from 'react';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';
import AvatarInitials from '@/components/avatar-initials';
import type { AnalyticsTeammate } from '@/types/analyticsTeammate.type';
import { formatDuration } from '@/utils/formatDuration';

type Highlight = AnalyticsTeammate & {
  icon: React.ReactNode;
  label: string;
  key: string;
};

const AnalyticsHighlights = () => {
  const { analytics, analyticsTeammates } = useAnalyticsStore();
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    if (analytics && analyticsTeammates) {
      const clone = [...analyticsTeammates];

      const highlightUsed = new Set<string>();

      const highlightRules = [
        {
          key: 'limit-master',
          label: 'Limit Master',
          icon: <Crown className="fill-current text-amber-400" />,
          predicate: (t: AnalyticsTeammate) => t.paused === 0,
          sort: (a: AnalyticsTeammate, b: AnalyticsTeammate) => {
            return Math.abs(a.total - analytics.timer) - Math.abs(b.total - analytics.timer);
          },
        },
        {
          key: 'edgerunner',
          label: 'Edgerunner',
          icon: <CircleCheckBig className="text-emerald-400" />,
          predicate: (t: AnalyticsTeammate) => t.overtime !== 0,
          sort: (a: AnalyticsTeammate, b: AnalyticsTeammate) => {
            return Math.abs(a.overtime - 1.0) - Math.abs(b.overtime - 1.0);
          },
        },
        {
          key: 'radio-tower',
          label: 'Radio Tower',
          icon: <RadioTower className="text-red-400" />,
          predicate: () => true,
          sort: (a: AnalyticsTeammate, b: AnalyticsTeammate) => {
            return b.total - a.total;
          },
        },
        {
          key: 'frozen-hero',
          label: 'Frozen Hero',
          icon: <Snowflake className="text-blue-400" />,
          predicate: (t: AnalyticsTeammate) => t.paused !== 0,
          sort: (a: AnalyticsTeammate, b: AnalyticsTeammate) => {
            return b.paused - a.paused;
          },
        },
        {
          key: 'mystery-ghost',
          label: 'Mystery Ghost',
          icon: <Ghost className="text-foreground" />,
          predicate: () => true,
          sort: (a: AnalyticsTeammate, b: AnalyticsTeammate) => {
            return a.total - b.total;
          },
        },
      ];

      const highlights = highlightRules
        .map((rule) => {
          const { predicate, sort, ...highlight } = rule;
          const candidate = clone
            .filter(predicate)
            .filter((t) => !highlightUsed.has(t.UUID))
            .sort(sort)
            .at(0);

          if (candidate) {
            highlightUsed.add(candidate.UUID);

            return {
              ...highlight,
              ...candidate,
            };
          }

          return null;
        })
        .filter(Boolean);

      const highlightOrder = [
        'edgerunner',
        'mystery-ghost',
        'limit-master',
        'radio-tower',
        'frozen-hero',
      ];

      const highlightsSorted = (highlights as Highlight[]).sort((a, b) => {
        return highlightOrder.indexOf(a.key) - highlightOrder.indexOf(b.key);
      });

      setHighlights(highlightsSorted);
    }
  }, [analytics, analyticsTeammates]);

  return (
    <HoverEffectHighlights>
      {highlights
        .filter((highlight) => highlight.teammate)
        .map((highlight) => (
          <div key={highlight.key} className="flex flex-col gap-2">
            <Card className="relative size-full gap-0 p-2">
              <CardHeader className="relative gap-0">
                <div className="absolute top-0 right-0 z-10 rounded-full">
                  <span className="flex size-4.5 items-center justify-center md:size-6 lg:size-7 xl:size-8">
                    {highlight.icon}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-2 sm:p-2.5 md:p-3">
                <Avatar className="animate-shine aspect-square size-full translate-y-0.5 border">
                  <AvatarImage
                    className="bg-secondary object-cover"
                    src={highlight.teammate?.avatar || undefined}
                  />
                  <AvatarFallback style={{ backgroundColor: highlight.teammate?.color }}>
                    <AvatarInitials className="text-2xl" teammate={highlight.teammate!} />
                  </AvatarFallback>
                </Avatar>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch p-0 text-center">
                <span className="truncate text-sm font-semibold sm:text-lg md:text-2xl">
                  {highlight.teammate?.name}
                </span>
                <p className="text-muted-foreground truncate text-xs sm:text-sm">
                  {highlight.teammate?.role}
                </p>
              </CardFooter>
            </Card>
            <div className="bg-card flex flex-col items-center gap-2 rounded-lg border p-2 lg:flex-row">
              <div className="flex flex-1 flex-col overflow-hidden text-center">
                <span className="truncate text-sm font-semibold md:text-base">
                  {highlight.label}
                </span>
                <span className="text-muted-foreground scale-90 truncate text-xs sm:scale-100">
                  {highlight.key === 'edgerunner' && `Overtime x${highlight.overtime}`}
                  {highlight.key === 'radio-tower' && `On Air ${formatDuration(highlight.total)}`}
                  {highlight.key === 'frozen-hero' &&
                    `Paused time ${formatDuration(highlight.paused)}`}
                  {highlight.key === 'mystery-ghost' &&
                    `Gone in ${formatDuration(highlight.total)}`}
                  {highlight.key === 'limit-master' &&
                    `Wrapped in ${formatDuration(highlight.total)}`}
                </span>
              </div>
            </div>
          </div>
        ))}
    </HoverEffectHighlights>
  );
};

export default AnalyticsHighlights;

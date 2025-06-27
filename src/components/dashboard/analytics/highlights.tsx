'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CircleCheckBig, Crown, Ghost, RadioTower, Snowflake } from 'lucide-react';
import HoverEffect from '@/components/hover-effect';
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

      const mvp = clone
        .filter((t) => t.paused === 0)
        .sort((a, b) => Math.abs(a.total - analytics?.timer) - Math.abs(b.total - analytics?.timer))
        .at(0);

      const frozen = clone.sort((a, b) => b.paused - a.paused).at(0);
      const talker = clone.sort((a, b) => b.total - a.total).at(0);
      const ghost = clone.sort((a, b) => a.total - b.total).at(0);

      const lord = clone
        .filter((t) => t.overtime !== 0)
        .sort((a, b) => Math.abs(a.overtime - 1.0) - Math.abs(b.overtime - 1.0))
        .at(0);

      const formatted = [
        {
          icon: <Crown className="fill-current text-amber-400" />,
          label: 'Limit Master',
          key: 'limit-master',
          ...mvp,
        },
        {
          icon: <Snowflake className="text-blue-400" />,
          label: 'Frozen Hero',
          key: 'frozen-hero',
          ...frozen,
        },
        {
          icon: <RadioTower className="text-red-400" />,
          label: 'Radio Tower',
          key: 'radio-tower',
          ...talker,
        },
        {
          icon: <Ghost className="text-foreground" />,
          label: 'Mystery Ghost',
          key: 'mystery-ghost',
          ...ghost,
        },
        {
          icon: <CircleCheckBig className="text-emerald-400" />,
          label: 'Edgerunner',
          key: 'edgerunner',
          ...lord,
        },
      ];

      setHighlights(formatted as Highlight[]);
    }
  }, [analytics, analyticsTeammates]);

  return (
    <HoverEffect>
      {highlights
        .filter((highlight) => highlight.teammate)
        .map((highlight) => (
          <Card key={highlight.label} className="group relative size-full gap-0 p-2">
            <CardHeader className="relative gap-0 p-0 transition-all">
              <div className="flex items-center gap-2 overflow-hidden rounded-lg border p-2">
                <span className="flex aspect-square size-8 items-center justify-center">
                  {highlight.icon}
                </span>
                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className="truncate text-base font-semibold">{highlight.label}</span>
                  <span className="text-muted-foreground truncate text-xs">
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
            </CardHeader>
            <CardContent className="p-4 sm:p-3">
              <Avatar className="animate-shine aspect-square size-full translate-y-1 border">
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
              <span className="truncate text-lg font-semibold sm:text-2xl">
                {highlight.teammate?.name}
              </span>
            </CardFooter>
          </Card>
        ))}
    </HoverEffect>
  );
};

export default AnalyticsHighlights;

'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Ghost, Infinity, RadioTower, Snowflake } from 'lucide-react';
import { BorderBeam } from '@/components/magicui/border-beam';
import HoverEffect from '@/components/hover-effect';
import { useEffect, useState } from 'react';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';
import AvatarInitials from '@/components/avatar-initials';
import type { Teammate } from '@/types/teammate.type';

type Highlight = {
  icon: React.ReactNode;
  label: string;
  teammate?: Teammate;
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
      const lord = clone.sort((a, b) => b.overtime - a.overtime).at(0);

      const formatted = [
        {
          icon: <Crown size={32} />,
          label: 'MVP',
          teammate: mvp?.teammate,
        },
        {
          icon: <Snowflake size={32} />,
          label: 'Frozen Hero',
          teammate: frozen?.teammate,
        },
        {
          icon: <RadioTower size={32} />,
          label: 'Radio Tower',
          teammate: talker?.teammate,
        },
        {
          icon: <Ghost size={32} />,
          label: 'Ghost Teammate',
          teammate: ghost?.teammate,
        },
        {
          icon: <Infinity size={32} />,
          label: 'Overtime Lord',
          teammate: lord?.teammate,
        },
      ];

      setHighlights(formatted);
    }
  }, [analytics, analyticsTeammates]);

  return (
    <HoverEffect>
      {highlights
        .filter((highlight) => highlight.teammate)
        .map((highlight) => (
          <Card key={highlight.label} className="relative size-full gap-0 p-2">
            <CardHeader className="relative gap-0 p-0">
              <div className="flex flex-col items-center">
                {highlight.icon}
                <span className="truncate text-lg font-semibold">{highlight.label}</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-3">
              <Avatar className="aspect-square size-full border">
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
              <p className="text-muted-foreground truncate text-xs sm:text-sm">
                {highlight.teammate?.role}
              </p>
            </CardFooter>
            <BorderBeam duration={8} size={100} />
          </Card>
        ))}
    </HoverEffect>
  );
};

export default AnalyticsHighlights;

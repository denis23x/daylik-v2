'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CircleCheckBig, Crown, Ghost, RadioTower, Snowflake } from 'lucide-react';
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

      const lord = clone
        .filter((t) => t.overtime !== 0)
        .sort((a, b) => Math.abs(a.overtime - 1.0) - Math.abs(b.overtime - 1.0))
        .at(0);

      const formatted = [
        {
          icon: <Crown />,
          label: 'MVP',
          teammate: mvp?.teammate,
        },
        {
          icon: <Snowflake />,
          label: 'Frozen Hero',
          teammate: frozen?.teammate,
        },
        {
          icon: <RadioTower />,
          label: 'Radio Tower',
          teammate: talker?.teammate,
        },
        {
          icon: <Ghost />,
          label: 'Mystery Ghost',
          teammate: ghost?.teammate,
        },
        // {
        //   icon: <Infinity />,
        //   label: 'Overtime Lord',
        //   teammate: lord?.teammate,
        // },
        {
          icon: <CircleCheckBig />,
          label: 'Edge Runner',
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
            <CardHeader className="bg-muted relative gap-0 rounded-lg border p-2">
              <div className="flex flex-col items-center">
                {highlight.icon}
                <span className="truncate text-base font-semibold">{highlight.label}</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-3">
              <Avatar className="aspect-square size-full translate-y-1 border">
                <AvatarImage
                  className="bg-secondary object-cover"
                  src={highlight.teammate?.avatar || undefined}
                />
                <AvatarFallback style={{ backgroundColor: highlight.teammate?.color }}>
                  <AvatarInitials className="text-2xl" teammate={highlight.teammate!} />
                </AvatarFallback>
              </Avatar>
            </CardContent>
            <BorderBeam duration={8} size={100} />
          </Card>
        ))}
    </HoverEffect>
  );
};

export default AnalyticsHighlights;

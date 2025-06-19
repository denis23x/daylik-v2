'use client';

import { useEffect, useState } from 'react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getContrastingColor } from '@/utils/getContrastingColor';
import { BorderBeam } from '@/components/magicui/border-beam';
import type { Teammate } from '@/types/teammate.type';
import { Zap } from 'lucide-react';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';

const Fastest = () => {
  const { analyticsTeammates } = useAnalyticsStore();
  const [teammate, setTeammate] = useState<Teammate>();

  useEffect(() => {
    const analytics = analyticsTeammates.reduce((a, b) => (b.total < a.total ? b : a));

    // Set teammate from analytics
    setTeammate(analytics.teammate as Teammate);
  }, [analyticsTeammates]);

  return teammate ? (
    <CardContainer>
      <CardBody className="group/card bg-card relative flex size-full flex-col items-center justify-between rounded-xl border p-2">
        <CardItem
          translateZ="20"
          className="flex w-full items-center justify-center gap-2 text-sm font-semibold italic"
        >
          <Zap className="size-4" />
          Fastest Speaker
        </CardItem>
        <CardItem as="div" translateZ="40" className="w-full p-4 sm:p-3">
          <Avatar className="aspect-square size-full border">
            <AvatarImage className="bg-secondary object-cover" src={teammate.avatar || undefined} />
            <AvatarFallback style={{ backgroundColor: teammate.color }}>
              <span className="text-lg" style={{ color: getContrastingColor(teammate.color) }}>
                {teammate.name.slice(0, 2).toUpperCase()}
              </span>
            </AvatarFallback>
          </Avatar>
        </CardItem>
        <CardItem translateZ="20" as="div" className="max-w-full overflow-hidden px-4 text-center">
          <span className="block truncate text-lg font-semibold sm:text-2xl">{teammate.name}</span>
          <p className="text-muted-foreground block truncate text-xs sm:text-sm">{teammate.role}</p>
        </CardItem>
        <BorderBeam duration={8} size={100} />
      </CardBody>
    </CardContainer>
  ) : null;
};

export default Fastest;

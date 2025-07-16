'use client';

import { CircleCheckBig, Crown, Ghost, RadioTower, Snowflake } from 'lucide-react';
import HoverEffectHighlights from '@/components/dx/hover-effect/hover-effect-highlights';
import { useEffect, useState } from 'react';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';
import type { AnalyticsTeammate } from '@/types/analyticsTeammate.type';
import HighlightsCard from './highlights-card';

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
          <HighlightsCard key={highlight.key} highlight={highlight} />
        ))}
    </HoverEffectHighlights>
  );
};

export default AnalyticsHighlights;

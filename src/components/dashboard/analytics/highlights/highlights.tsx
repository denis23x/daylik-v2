'use client';

import { CircleCheckBig, Crown, Ghost, RadioTower, Snowflake } from 'lucide-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';
import type { AnalyticsTeammate } from '@/types/analyticsTeammate.type';
import { useMediaQuery } from '@/hooks/ui/useMediaQuery';
import HighlightsSkeletons from './highlights-skeletons';
import { getHighlightsSizes } from '@/utils/getHighlightsSizes';

type Highlight = AnalyticsTeammate & {
  icon: React.ReactNode;
  label: string;
  key: string;
};

// prettier-ignore
const HoverEffectHighlights = lazy(() => import('@/components/dx/hover-effect/hover-effect-highlights'));
const HighlightsCard = lazy(() => import('./highlights-card'));

const AnalyticsHighlights = () => {
  const sm = useMediaQuery('(min-width: 640px)');
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

  const DesktopHighlights = (
    <HoverEffectHighlights>
      {highlights.map((highlight) => (
        <HighlightsCard key={highlight.key} highlight={highlight} />
      ))}
    </HoverEffectHighlights>
  );

  const MobileHighlights = (
    <ul className="hover-effect-grid-highlights">
      {highlights.map((highlight, i, arr) => {
        const { scale80, scale90, right, left } = getHighlightsSizes(arr.length, i);

        return (
          <li
            className={`relative w-1/3 sm:w-1/5 ${scale80} ${scale90} ${right} ${left}`}
            key={highlight.key}
          >
            <HighlightsCard highlight={highlight} />
          </li>
        );
      })}
    </ul>
  );

  return (
    <Suspense fallback={<HighlightsSkeletons columns={5} className="aspect-[5/8] min-h-[224px]" />}>
      {sm ? DesktopHighlights : MobileHighlights}
    </Suspense>
  );
};

export default AnalyticsHighlights;

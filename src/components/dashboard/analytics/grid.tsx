'use client';

import { ChartLine } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTeammatesFromAnalytic } from '@/hooks/useAnalyticsTeammates';
import AnalyticsDataHighlights from './data-highlights';
import AnalyticsDataTable from './data-table';
import AnalyticsDataChartLinear from './data-chart-linear';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorOccurred from '@/components/error-occurred';
import NotFound from '@/components/not-found';

const AnalyticsGrid = () => {
  const params = useParams();
  const { data: team } = useAnalytics({ query: '*', UUID: params.UUID as string });
  const {
    data: teammates,
    error,
    isLoading,
  } = useTeammatesFromAnalytic({
    query: '*, teammates (UUID, name, role, color, avatar)',
    UUID: params.UUID as string,
  });

  useEffect(() => {
    console.log('team', team);
    console.log('analytics teammates', teammates);
  }, [team, teammates]);

  return (
    <div className="min-h-screen-grid container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <ChartLine />
          <span className="text-xl font-bold">Analytics</span>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          {isLoading && (
            <ul className="relative grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {[1, 2, 3, 4].map((_, index) => (
                <li key={index}>
                  <Skeleton className="aspect-[2/2.75] min-h-[224px] max-w-full rounded-xl" />
                </li>
              ))}
            </ul>
          )}
          {error && <ErrorOccurred className="min-h-[224px]" />}
          {!isLoading && !error && team && teammates && teammates?.length === 0 && (
            <NotFound className="min-h-[224px]" />
          )}
          {!isLoading && !error && team && teammates && teammates?.length !== 0 && (
            <div className="flex w-full flex-col gap-4">
              <AnalyticsDataHighlights team={team} teammates={teammates}></AnalyticsDataHighlights>
              <AnalyticsDataChartLinear teammates={teammates}></AnalyticsDataChartLinear>
              <AnalyticsDataTable teammates={teammates}></AnalyticsDataTable>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsGrid;

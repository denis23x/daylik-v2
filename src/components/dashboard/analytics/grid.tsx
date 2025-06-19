'use client';

import { ChartLine } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTeammatesFromAnalytic } from '@/hooks/useAnalyticsTeammates';
import AnalyticsHighlights from './highlights';
import AnalyticsTable from './table';
import AnalyticsChartLinear from './chart-linear';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorOccurred from '@/components/error-occurred';
import NotFound from '@/components/not-found';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';

const AnalyticsGrid = () => {
  const params = useParams();
  const { analytics, analyticsTeammates, setAnalytics, setAnalyticsTeammates } =
    useAnalyticsStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<Error | null>(null);
  const {
    data: analyticsData,
    isLoading: analyticsIsLoading,
    error: analyticsError,
  } = useAnalytics({ query: '*', UUID: params.UUID as string });
  const {
    data: analyticsTeammatesData,
    error: analyticsTeammatesError,
    isLoading: analyticsTeammatesIsLoading,
  } = useTeammatesFromAnalytic({
    query: '*, teammates (UUID, name, role, color, avatar)',
    UUID: params.UUID as string,
  });

  useEffect(() => {
    setIsLoading(analyticsIsLoading || analyticsTeammatesIsLoading);
  }, [analyticsIsLoading, analyticsTeammatesIsLoading, setIsLoading]);

  useEffect(() => {
    setIsError(analyticsError || analyticsTeammatesError);
  }, [analyticsError, analyticsTeammatesError, setIsError]);

  useEffect(() => {
    if (analyticsData && analyticsTeammatesData) {
      setAnalytics(analyticsData);
      setAnalyticsTeammates(analyticsTeammatesData);
    }
  }, [analyticsData, analyticsTeammatesData, setAnalytics, setAnalyticsTeammates]);

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
          {isError && <ErrorOccurred className="min-h-[224px]" />}
          {!isLoading && !isError && analytics && analyticsTeammates?.length === 0 && (
            <NotFound className="min-h-[224px]" />
          )}
          {!isLoading && !isError && analytics && analyticsTeammates?.length !== 0 && (
            <div className="flex w-full flex-col gap-4">
              <AnalyticsHighlights></AnalyticsHighlights>
              <AnalyticsChartLinear></AnalyticsChartLinear>
              <AnalyticsTable></AnalyticsTable>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsGrid;

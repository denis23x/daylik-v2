'use client';

import { ArrowRight, Bug, ChartLine, CircleOff } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTeammatesFromAnalytic } from '@/hooks/useAnalyticsTeammates';
import AnalyticsHighlights from './highlights';
import AnalyticsTable from './table';
import AnalyticsChartLinear from './chart-linear';
import { Skeleton } from '@/components/ui/skeleton';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useFeedbackStore } from '@/store/useFeedbackStore';

const AnalyticsGrid = () => {
  const params = useParams();
  const { analytics, analyticsTeammates, setAnalytics, setAnalyticsTeammates } =
    useAnalyticsStore();
  const { openModal: openFeedbackModal } = useFeedbackStore();
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
                  <Skeleton className="aspect-[3/3.75] min-h-[224px] max-w-full rounded-xl" />
                </li>
              ))}
            </ul>
          )}
          {isError && (
            <div className="flex min-h-[75dvh] max-w-md flex-col items-center justify-center gap-4">
              <Bug />
              <div className="text-center text-xl font-semibold">An error occurred</div>
              <Button variant="destructive" onClick={openFeedbackModal}>
                Report
              </Button>
            </div>
          )}
          {!isLoading && !isError && analytics && analyticsTeammates?.length === 0 && (
            <div className="flex min-h-[75dvh] max-w-md flex-col items-center justify-center gap-4">
              <CircleOff />
              <div className="text-center text-xl font-semibold">No teammates found</div>
              <Button className="group" variant="secondary" asChild>
                <Link href="/teams">
                  Teams
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
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

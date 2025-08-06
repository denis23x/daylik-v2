'use client';

import { ArrowRight, Bug, ChartLine, CircleOff } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTeammatesFromAnalytic } from '@/hooks/useAnalyticsTeammates';
import AnalyticsTimeline from './timeline/timeline';
import AnalyticsHighlights from './highlights/highlights';
import AnalyticsChartLinear from './chart-linear/chart-linear';
import AnalyticsTable from './table/table';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';
import { Button, buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useFeedbackStore } from '@/store/useFeedbackStore';
import { useMediaQuery } from '@/hooks/ui/useMediaQuery';
import HighlightsSkeletons from './highlights/highlights-skeletons';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useDateFnsLocale } from '@/hooks/ui/useDateFnsLocale';
import { cn } from '@/lib/utils';

const AnalyticsGrid = () => {
  const t = useTranslations('components.dashboard.analytics.grid');
  const sm = useMediaQuery('(min-width: 640px)');
  const locale = useDateFnsLocale();
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
  } = useAnalytics({ query: '*, teams (name)', UUID: params.UUID as string });
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
          {isLoading && <Skeleton className="h-7 w-24" />}
          {isError && <span className="text-xl font-bold">{t('sync')}</span>}
          {!isLoading && !isError && (
            <p className="flex items-center gap-2">
              <span className="text-xl font-bold">{analyticsData?.team?.name}</span>
              <span className="text-muted-foreground mt-1 text-sm first-letter:capitalize">
                {format(new Date(analyticsData?.createdAt as string), 'EEEE, do MMMM', {
                  locale,
                })}
              </span>
            </p>
          )}
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          {isLoading && <HighlightsSkeletons columns={5} className="aspect-[5/8] min-h-[224px]" />}
          {isError && (
            <div className="flex min-h-[75lvh] max-w-md flex-col items-center justify-center gap-4">
              <Bug />
              <div className="text-center text-xl font-semibold">{t('error')}</div>
              <Button variant="destructive" onClick={openFeedbackModal}>
                {t('report')}
              </Button>
            </div>
          )}
          {!isLoading && !isError && analytics && analyticsTeammates?.length === 0 && (
            <div className="flex min-h-[75lvh] max-w-md flex-col items-center justify-center gap-4">
              <CircleOff />
              <div className="text-center text-xl font-semibold">{t('noTeammates')}</div>
              <Link className={cn(buttonVariants({ variant: 'secondary' }))} href="/teams">
                {t('teams')}
                <ArrowRight />
              </Link>
            </div>
          )}
          {!isLoading && !isError && analytics && analyticsTeammates?.length !== 0 && (
            <div className="flex w-full flex-col gap-4">
              <AnalyticsHighlights></AnalyticsHighlights>
              <AnalyticsTimeline></AnalyticsTimeline>
              <AnalyticsTable></AnalyticsTable>
              {sm && <AnalyticsChartLinear></AnalyticsChartLinear>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsGrid;

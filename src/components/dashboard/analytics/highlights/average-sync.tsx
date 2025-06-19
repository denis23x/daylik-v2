'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { formatDuration } from '@/utils/formatDuration';
import { useEstimatedSyncTime } from '@/hooks/ui/useEstimatedSyncTime';
import { getMiliseconds } from '@/utils/getMiliseconds';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';

const AverageSync = () => {
  const { analytics, analyticsTeammates } = useAnalyticsStore();
  const { getEstimatedSyncTime } = useEstimatedSyncTime();
  const [syncTime, setSyncTime] = useState(0);
  const [estimatedSyncTime, setEstimatedSyncTime] = useState(0);

  useEffect(() => {
    if (analytics) {
      const finishedAt = new Date(analytics.finishedAt).getTime();
      const startedAt = new Date(analytics.startedAt).getTime();
      const syncTime = finishedAt - startedAt;
      const estimatedSyncTime = getEstimatedSyncTime(analyticsTeammates.length, analytics.timer);
      const estimatedSyncTimeMS = getMiliseconds(estimatedSyncTime);

      setSyncTime(syncTime);
      setEstimatedSyncTime(estimatedSyncTimeMS);
    }
  }, [analytics, analyticsTeammates, getEstimatedSyncTime]);

  return (
    <Card className="size-full gap-4 p-4">
      <CardContent className="flex flex-col gap-2 p-0">
        <p className="text-sm">
          Estimated Sync time was expected to last about{' '}
          <strong>{formatDuration(estimatedSyncTime)}</strong>
        </p>
        <span className="text-sm">
          Actual duration:{' '}
          <strong className={syncTime > estimatedSyncTime ? 'text-red-500' : 'text-emerald-500'}>
            {formatDuration(syncTime)}
          </strong>
        </span>
      </CardContent>
    </Card>
  );
};

export default AverageSync;

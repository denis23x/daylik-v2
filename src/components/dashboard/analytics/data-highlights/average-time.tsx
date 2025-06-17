'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { formatDuration } from '@/utils/formatDuration';
import type { AnalyticsTeammate } from '@/types/analyticsTeammate.type';
import type { Analytics } from '@/types/analytics.type';
import { useEstimatedSyncTime } from '@/hooks/ui/useEstimatedSyncTime';
import { getMiliseconds } from '@/utils/getMiliseconds';

const AverageTime = ({ team, teammates }: { team: Analytics; teammates: AnalyticsTeammate[] }) => {
  const [averageTimer, setAverageTimer] = useState(0);
  const [syncTime, setSyncTime] = useState(0);
  const [estimatedSyncTime, setEstimatedSyncTime] = useState(0);
  const { getEstimatedSyncTime } = useEstimatedSyncTime();

  useEffect(() => {
    const finishedAt = new Date(team.finishedAt).getTime();
    const startedAt = new Date(team.startedAt).getTime();
    const syncTime = finishedAt - startedAt;
    const averageTimer = syncTime / teammates.length;
    const estimatedSyncTime = getMiliseconds(getEstimatedSyncTime(teammates.length, team.timer));

    setSyncTime(syncTime);
    setAverageTimer(averageTimer);
    setEstimatedSyncTime(estimatedSyncTime);
  }, [team, teammates, getEstimatedSyncTime]);

  return (
    <Card className="gap-4 p-4">
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
        <span className="text-sm">
          Average Sync time for teammate:{' '}
          <strong className={averageTimer > team.timer ? 'text-red-500' : 'text-emerald-500'}>
            {formatDuration(averageTimer)}
          </strong>
        </span>
      </CardContent>
    </Card>
  );
};

export default AverageTime;

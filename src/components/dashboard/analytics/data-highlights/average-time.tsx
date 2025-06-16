'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { formatDuration } from '@/utils/formatDuration';
import type { AnalyticsTeammate } from '@/types/analyticsTeammate.type';
import type { Analytics } from '@/types/analytics.type';

const AverageTime = ({ team, teammates }: { team: Analytics; teammates: AnalyticsTeammate[] }) => {
  const [finishedAt, setFinishedAt] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const finishedAt = new Date(team.finishedAt).getTime();
    const startedAt = new Date(team.startedAt).getTime();
    const totalMs = finishedAt - startedAt - team.timer;
    const avgMs = totalMs / teammates.length;

    setFinishedAt(finishedAt);
    setStartedAt(startedAt);
    setAverage(avgMs);
  }, [team, teammates]);

  return (
    <Card className="gap-4 p-4">
      <CardContent className="flex flex-col gap-2 p-0">
        <p className="text-sm">
          Sync for “team name” (<strong>{teammates.length}</strong> members,{' '}
          <strong>{formatDuration(team.timer)}</strong> timer) was expected to last about{' '}
          <strong>{formatDuration(team.timer * teammates.length + team.timer)}</strong>, actual
          duration:{' '}
          <strong className="text-emerald-500">{formatDuration(startedAt, finishedAt)}</strong>
        </p>
        <span className="text-sm">
          Average sync time for teammate: <strong>{formatDuration(average)}</strong>
        </span>
      </CardContent>
    </Card>
  );
};

export default AverageTime;

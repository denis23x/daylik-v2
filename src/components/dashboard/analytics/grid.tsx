'use client';

import { useSyncLiveStore } from '@/store/useSyncLiveStore';

const AnalyticsGrid = () => {
  const { team, teammates, startedAt, finishedAt } = useSyncLiveStore();

  return (
    <div className="min-h-screen-daylik container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div>startedAt - {startedAt}</div>
        <div>finishedAt - {finishedAt}</div>
        <pre>{JSON.stringify(team, null, 2)}</pre>
        <pre>{JSON.stringify(teammates, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AnalyticsGrid;

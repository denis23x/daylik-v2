'use client';

import { useSyncStore } from '@/store/useSyncStore';
import { useEffect } from 'react';

export const SyncAnalytics = () => {
  const { teammates, finishSync, startSync } = useSyncStore();
  const { startedAt, finishedAt } = useSyncStore();

  useEffect(() => {
    if (teammates.length) {
      if (!finishedAt && teammates.every((teammate) => teammate.state.status === 'done')) {
        finishSync();
      }
      if (!startedAt && teammates.some((teammate) => teammate.state.status !== 'idle')) {
        startSync();
      }
    }
  }, [teammates]);

  return (
    <div className="mt-20 p-4">
      <div className="mt-4 flex flex-col">
        <p>Started at: {startedAt}</p>
        <p>Finished at: {finishedAt}</p>
        <div className="overflow-x-auto">
          <pre>{JSON.stringify(teammates, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

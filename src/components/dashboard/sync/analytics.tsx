'use client';

import { useSyncStore } from '@/store/useSyncStore';

export const SyncAnalytics = () => {
  const { teammates, startedAt, finishedAt } = useSyncStore();

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

'use client';

import { SyncCard } from '@/components/dashboard/sync/card';
import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { motion, spring } from 'motion/react';

const SyncGridLive = () => {
  const { team, teammates, finishSync, startSync, resetStore, startedAt, finishedAt } =
    useSyncLiveStore();

  useEffect(() => {
    resetStore();
  }, [resetStore]);

  useEffect(() => {
    if (teammates.length) {
      if (!finishedAt && teammates.every((teammate) => teammate.state.status === 'done')) {
        finishSync();
      }
      if (!startedAt && teammates.some((teammate) => teammate.state.status !== 'idle')) {
        startSync();
      }
    }
  }, [teammates, startedAt, finishedAt, startSync, finishSync]);

  return (
    <div className="min-h-screen-daylik container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <Calendar />
          <span className="text-xl font-bold">{team?.name}</span>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {teammates?.map((teammate) => (
              <motion.li key={teammate.UUID} layout transition={spring}>
                <SyncCard teammate={teammate} />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SyncGridLive;

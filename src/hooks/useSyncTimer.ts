import { useEffect, useRef, useState } from 'react';
import type { SyncTeammate } from '@/types/syncTeammate.type';
import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { useTimer } from './useTimer';
import { useStopwatch } from './useStopwatch';

export const useSyncTimer = (syncTeammate: SyncTeammate) => {
  const { team } = useSyncLiveStore();
  const teamSyncTimerRef = useRef<number>((team?.sync.timer ?? 0) * 1000);
  const [progress, setProgress] = useState(100);
  const [overtime, setOvertime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timer = useTimer({ duration: teamSyncTimerRef.current });
  const stopwatch = useStopwatch();

  useEffect(() => {
    if (syncTeammate.sync.status === 'active') {
      timer.start();
    }
    if (syncTeammate.sync.status === 'done') {
      timer.stop();
    }
  }, [syncTeammate.sync.status, timer]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const remainingTime = timer.getRemainingMS();

      if (remainingTime) {
        setProgress((remainingTime / teamSyncTimerRef.current) * 100);
      } else {
        setProgress(0);

        // Start stopwatch to calculate overtime
        stopwatch.start();
      }

      // Calculate overtime
      setOvertime(stopwatch.getElapsedMS() / teamSyncTimerRef.current);
    }, 50);

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, [timer, stopwatch]);

  return {
    timer,
    progress,
    overtime,
  };
};

'use client';

import SyncGridSettings from '@/components/dashboard/sync/grid-settings';
import SyncGridLive from '@/components/dashboard/sync/grid-live';
import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { useSyncSettingsStore } from '@/store/useSyncSettingsStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SyncGrid = () => {
  const router = useRouter();
  const { startedAt, finishedAt, reset: resetLive } = useSyncLiveStore();
  const { reset: resetSettings } = useSyncSettingsStore();
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    resetLive();
    resetSettings();
  }, [resetLive, resetSettings]);

  useEffect(() => {
    setIsStarted(!!startedAt);
  }, [startedAt]);

  useEffect(() => {
    if (finishedAt) {
      router.push('/analytics/123');
    }
  }, [finishedAt, router]);

  return <>{isStarted ? <SyncGridLive /> : <SyncGridSettings />}</>;
};

export default SyncGrid;

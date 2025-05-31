'use client';

import SyncGridSettings from '@/components/dashboard/sync/grid-settings';
import SyncGridLive from '@/components/dashboard/sync/grid-live';
import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { useSyncSettingsStore } from '@/store/useSyncSettingsStore';
import { useEffect, useState } from 'react';

const SyncGrid = () => {
  const { startedAt, reset: resetLive } = useSyncLiveStore();
  const { reset: resetSettings } = useSyncSettingsStore();
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    resetLive();
    resetSettings();
  }, []);

  useEffect(() => {
    setIsStarted(!!startedAt);
  }, [startedAt]);

  return <>{isStarted ? <SyncGridLive /> : <SyncGridSettings />}</>;
};

export default SyncGrid;

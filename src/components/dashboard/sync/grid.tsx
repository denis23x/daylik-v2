'use client';

import SyncGridSettings from '@/components/dashboard/sync/grid-settings';
import SyncGridLive from '@/components/dashboard/sync/grid-live';
import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { useSyncSettingsStore } from '@/store/useSyncSettingsStore';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateAnalytics } from '@/hooks/useAnalytics';
import { toast } from 'sonner';
import { useAddTeammatesToAnalytic } from '@/hooks/useAnalyticsTeammates';

const SyncGrid = () => {
  const router = useRouter();
  const { team, teammates, timer, startedAt, finishedAt, reset: resetLive } = useSyncLiveStore();
  const { mutateAsync: createAnalytics } = useCreateAnalytics();
  const { mutateAsync: addTeammatesToAnalytic } = useAddTeammatesToAnalytic();
  const { reset: resetSettings } = useSyncSettingsStore();
  const [isStarted, setIsStarted] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      const analytics = await createAnalytics({
        teamUUID: team?.UUID as string,
        timer: timer,
        startedAt: startedAt as string,
        finishedAt: finishedAt as string,
      });

      await addTeammatesToAnalytic({
        analyticUUID: analytics.UUID,
        teammates: teammates,
      });

      // Redirect
      router.push(`/analytics/${analytics.UUID}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  }, [
    createAnalytics,
    addTeammatesToAnalytic,
    team,
    teammates,
    timer,
    startedAt,
    finishedAt,
    router,
  ]);

  useEffect(() => {
    resetLive();
    resetSettings();
  }, [resetLive, resetSettings]);

  useEffect(() => {
    setIsStarted(!!startedAt);
  }, [startedAt]);

  useEffect(() => {
    if (finishedAt) {
      handleSubmit();
    }
  }, [finishedAt, handleSubmit]);

  return <>{isStarted ? <SyncGridLive /> : <SyncGridSettings />}</>;
};

export default SyncGrid;

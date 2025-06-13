'use client';

import { SyncLiveCard } from '@/components/dashboard/sync/live/card';
import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { ClockFading, Dices, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState, useCallback } from 'react';
import type { SyncTeammate } from '@/types/syncTeammate.type';
import HoverEffect from '@/components/hover-effect';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import { useSync } from '@/hooks/useSync';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import NotFound from '@/components/not-found';
import ErrorOccurred from '@/components/error-occurred';
import { getIsLastActive } from '@/utils/getIsLastActive';
import { createAnalytics } from '@/lib/api/analytics';
import { addTeammatesToAnalytic } from '@/lib/api/analyticsTeammates';
import { toast } from 'sonner';

const SyncLiveGrid = () => {
  const params = useParams();
  const router = useRouter();
  const { team, teammates, setTeam, setTeammates, shuffle, setRandom } = useSyncLiveStore();
  const [showRoles, setShowRoles] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isPristine, setIsPristine] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { isLoading, error, refetch } = useSync({
    query: `*, teams_teammates (teammates (UUID, name, role, color, avatar))`,
    UUID: params.UUID as string,
    enabled: false,
  });

  useEffect(() => {
    if (isInitialized) return;
    const initializeSync = async () => {
      if (!team || !teammates.length) {
        const { data } = await refetch();
        const { teammates, ...team } = data as Team;

        setTeam(team as Team);
        setTeammates(teammates as Teammate[]);
      }

      // Sync is ready to go
      setIsInitialized(true);
    };

    initializeSync();
  }, [team, teammates, setTeam, setTeammates, refetch, isInitialized]);

  useEffect(() => {
    if (teammates.length) {
      const isDone = teammates.every((teammate) => teammate.sync.status === 'done');
      const isPristine = teammates.every((teammate) => teammate.sync.status === 'idle');

      setIsDone(isDone);
      setIsPristine(isPristine);
    }
  }, [teammates, setIsDone, setIsPristine]);

  // useEffect(() => {
  //   if (isInitialized) {
  //     console.log('isInitialized', isInitialized);
  //   }
  // }, [isInitialized]);

  const handleSubmit = useCallback(async () => {
    try {
      const analytics = await createAnalytics({
        teamUUID: team?.UUID as string,
        timer: team?.timer as number,
        // TODO: add startedAt and finishedAt
        startedAt: new Date().toISOString(),
        finishedAt: new Date().toISOString(),
      });

      console.log('analytics', teammates);

      await addTeammatesToAnalytic({
        analyticUUID: analytics.UUID,
        teammates: teammates,
      });

      // Redirect
      router.push(`/analytics/${analytics.UUID}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  }, [team, teammates, router]);

  useEffect(() => {
    if (isDone) {
      console.log('isDone', isDone);
      handleSubmit();
    }
  }, [isDone, handleSubmit]);

  // const handleStart = () => {
  //   toast.success('Sync is live — let the updates begin');
  // };

  return (
    <div className="min-h-screen-daylik container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <ClockFading />
          {(isLoading || !isInitialized) && <Skeleton className="h-7 w-24" />}
          {error && <span className="text-xl font-bold">Error</span>}
          {!isLoading && isInitialized && !error && (
            <span className="text-xl font-bold">{team?.name}</span>
          )}
        </div>
        {!isLoading && isInitialized && !error && teammates?.length !== 0 && (
          <div className="flex w-full items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={shuffle}
              disabled={isDone || !isPristine || teammates.length <= 1}
            >
              <Shuffle />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={setRandom}
              disabled={isDone || getIsLastActive(teammates) || teammates.length <= 1}
            >
              <Dices />
            </Button>
            <div className="flex items-center space-x-2">
              <Switch
                id="show-roles"
                disabled={isDone || getIsLastActive(teammates)}
                checked={showRoles}
                onCheckedChange={(value) => setShowRoles(value)}
              />
              <Label htmlFor="show-roles">Show roles</Label>
            </div>
          </div>
        )}
        <div className="flex w-full flex-col items-center gap-4">
          {(isLoading || !isInitialized) && (
            <ul className="relative grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {[1, 2, 3, 4].map((_, index) => (
                <li key={index}>
                  <Skeleton className="aspect-[3/3.75] min-h-[224px] max-w-full rounded-xl" />
                </li>
              ))}
            </ul>
          )}
          {error && <ErrorOccurred className="min-h-[224px]" />}
          {!isLoading && isInitialized && !error && teammates?.length === 0 && (
            <NotFound className="min-h-[224px]" />
          )}
          {!isLoading && isInitialized && !error && teammates?.length !== 0 && (
            <HoverEffect>
              {team &&
                teammates?.map((teammate: SyncTeammate) => (
                  <SyncLiveCard
                    team={team}
                    teammate={teammate}
                    showRoles={showRoles}
                    key={teammate.UUID}
                  />
                ))}
            </HoverEffect>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncLiveGrid;

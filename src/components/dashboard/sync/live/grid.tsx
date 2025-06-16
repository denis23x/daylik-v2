'use client';

import { SyncLiveCard } from '@/components/dashboard/sync/live/card';
import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { ClockFading, Dices, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';
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
import { toast } from 'sonner';
import { useCreateAnalytics } from '@/hooks/useAnalytics';
import { useAddTeammatesToAnalytic } from '@/hooks/useAnalyticsTeammates';

const SyncLiveGrid = () => {
  const params = useParams();
  const router = useRouter();
  const [showRoles, setShowRoles] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isPristine, setIsPristine] = useState(false);
  const [isStarted, setIsStarted] = useState<string | null>(null);
  const { mutateAsync: createAnalytics } = useCreateAnalytics();
  const { mutateAsync: addTeammatesToAnalytic } = useAddTeammatesToAnalytic();
  const { team, teammates, setTeam, setTeammates, setActive, shuffle } = useSyncLiveStore();
  const { isLoading, error, refetch } = useSync({
    query: `*, teams_teammates (teammates (UUID, name, role, color, avatar))`,
    UUID: params.UUID as string,
    enabled: false,
  });

  useEffect(() => {
    if (isStarted) return;
    const handleStart = async () => {
      if (!team || !teammates.length) {
        const { data } = await refetch();
        const { teammates, ...team } = data as Team;

        setTeam(team as Team);
        setTeammates(teammates as Teammate[]);
      }

      // Set the startedAt time
      setIsStarted(new Date().toISOString());
    };

    handleStart();
  }, [team, teammates, setTeam, setTeammates, refetch, isStarted]);

  useEffect(() => {
    if (!isDone) return;
    const handleFinish = async () => {
      try {
        toast.success('Saving your data — analytics coming right up');

        // Create analytics
        const analytics = await createAnalytics({
          teamUUID: team?.UUID as string,
          timer: team?.timer as number,
          startedAt: isStarted as string,
          finishedAt: new Date().toISOString(),
        });

        await addTeammatesToAnalytic({
          analyticUUID: analytics.UUID,
          teammates,
        });

        router.replace(`/analytics/${analytics.UUID}`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'An error occurred');
      }
    };

    handleFinish();
  }, [isDone, isStarted, team, teammates, router, createAnalytics, addTeammatesToAnalytic]);

  useEffect(() => {
    if (teammates.length) {
      const isDone = teammates.every((teammate) => teammate.sync.status === 'done');
      const isPristine = teammates.every((teammate) => teammate.sync.status === 'idle');

      setIsDone(isDone);
      setIsPristine(isPristine);
    }
  }, [teammates, setIsDone, setIsPristine]);

  const handleRandom = () => {
    const idle = teammates
      .filter((teammate) => teammate.sync.status === 'idle')
      .map((teammate) => teammate.UUID);

    if (idle.length) {
      setActive(idle[Math.floor(Math.random() * idle.length)]);
    }
  };

  return (
    <div className="min-h-screen-grid container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <ClockFading />
          {(isLoading || !isStarted) && <Skeleton className="h-7 w-24" />}
          {error && <span className="text-xl font-bold">Error</span>}
          {!isLoading && isStarted && !error && (
            <span className="text-xl font-bold">{team?.name}</span>
          )}
        </div>
        {!isLoading && isStarted && !error && teammates?.length !== 0 && (
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
              onClick={handleRandom}
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
          {(isLoading || !isStarted) && (
            <ul className="relative grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {[1, 2, 3, 4].map((_, index) => (
                <li key={index}>
                  <Skeleton className="aspect-[3/3.75] min-h-[224px] max-w-full rounded-xl" />
                </li>
              ))}
            </ul>
          )}
          {error && <ErrorOccurred className="min-h-[224px]" />}
          {!isLoading && isStarted && !error && teammates?.length === 0 && (
            <NotFound className="min-h-[224px]" />
          )}
          {!isLoading && isStarted && !error && teammates?.length !== 0 && (
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

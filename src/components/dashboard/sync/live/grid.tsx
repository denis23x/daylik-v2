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
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import NotFound from '@/components/not-found';
import ErrorOccurred from '@/components/error-occurred';
import { toast } from 'sonner';
import { getIsLastActive } from '@/utils/getIsLastActive';

const SyncLiveGrid = () => {
  const params = useParams();
  const { team, teammates, showRoles, setTeam, setTeammates, setShowRoles, shuffle, setRandom } =
    useSyncLiveStore();
  const [shuffleIsDisabled, setShuffleIsDisabled] = useState(false);
  const [randomIsDisabled, setRandomIsDisabled] = useState(false);
  const [positionsIsDisabled, setPositionsIsDisabled] = useState(false);
  const { isLoading, error, refetch } = useSync({
    query: `*, teams_teammates (teammates (UUID, name, role, color, avatar))`,
    UUID: params.UUID as string,
    enabled: false,
  });

  useEffect(() => {
    const initializeSync = async () => {
      if (!team || !teammates.length) {
        const { data } = await refetch();
        const { teammates, ...team } = data as Team;

        setTeam(team as Team);
        setTeammates(teammates as Teammate[]);

        toast.success('Sync started — jumping straight in with the full team');
      } else {
        toast.success('Sync started — running with your updated settings');
      }
    };

    initializeSync();
  }, [team, teammates, refetch, setTeam, setTeammates]);

  useEffect(() => {
    if (teammates.length) {
      const isPristine = teammates.every((teammate) => teammate.sync.status === 'idle');
      const isDone = teammates.every((teammate) => teammate.sync.status === 'done');

      setShuffleIsDisabled(isDone || !isPristine || teammates.length <= 1);
      setRandomIsDisabled(isDone || getIsLastActive(teammates) || teammates.length <= 1);
      setPositionsIsDisabled(isDone || getIsLastActive(teammates));
    }
  }, [teammates]);

  return (
    <div className="min-h-screen-daylik container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <ClockFading />
          {isLoading && <Skeleton className="h-7 w-24" />}
          {error && <span className="text-xl font-bold">Error</span>}
          {!isLoading && !error && <span className="text-xl font-bold">{team?.name}</span>}
        </div>
        {!isLoading && !error && teammates?.length !== 0 && (
          <div className="flex w-full items-center gap-4">
            <Button variant="outline" size="icon" onClick={shuffle} disabled={shuffleIsDisabled}>
              <Shuffle />
            </Button>
            <Button variant="outline" size="icon" onClick={setRandom} disabled={randomIsDisabled}>
              <Dices />
            </Button>
            <div className="flex items-center space-x-2">
              <Switch
                id="show-roles"
                disabled={positionsIsDisabled}
                checked={showRoles}
                onCheckedChange={(value) => setShowRoles(value)}
              />
              <Label htmlFor="show-roles">Show roles</Label>
            </div>
          </div>
        )}
        <div className="flex w-full flex-col items-center gap-4">
          {isLoading && (
            <ul className="relative grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {[1, 2, 3, 4].map((_, index) => (
                <li key={index}>
                  <Skeleton className="aspect-[3/3.75] min-h-[224px] max-w-full rounded-xl" />
                </li>
              ))}
            </ul>
          )}
          {error && <ErrorOccurred className="min-h-[224px]" />}
          {!isLoading && !error && teammates?.length === 0 && (
            <NotFound className="min-h-[224px]" />
          )}
          {!isLoading && !error && teammates?.length !== 0 && (
            <HoverEffect>
              {team &&
                teammates?.map((teammate: SyncTeammate) => (
                  <SyncLiveCard team={team} teammate={teammate} key={teammate.UUID} />
                ))}
            </HoverEffect>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncLiveGrid;

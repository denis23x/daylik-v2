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

// TODO: move to utils
function isAllDoneExceptOneActive(syncTeammates: SyncTeammate[]): boolean {
  let activeCount = 0;

  for (const syncTeammate of syncTeammates) {
    if (syncTeammate.sync.status === 'active') {
      activeCount++;
    } else if (syncTeammate.sync.status !== 'done') {
      return false;
    }
  }

  return activeCount === 1;
}

const SyncLiveGrid = () => {
  const { team, teammates, showRoles, shuffle, setRandom, setShowRoles, setSyncFinish } =
    useSyncLiveStore();
  const [shuffleIsDisabled, setShuffleIsDisabled] = useState(false);
  const [randomIsDisabled, setRandomIsDisabled] = useState(false);
  const [positionsIsDisabled, setPositionsIsDisabled] = useState(false);

  useEffect(() => {
    if (teammates.length) {
      const isPristine = teammates.every((teammate) => teammate.sync.status === 'idle');
      const isDone = teammates.every((teammate) => teammate.sync.status === 'done');

      setShuffleIsDisabled(isDone || !isPristine || teammates.length <= 1);
      setRandomIsDisabled(isDone || isAllDoneExceptOneActive(teammates) || teammates.length <= 1);
      setPositionsIsDisabled(isDone || isAllDoneExceptOneActive(teammates));

      if (isDone) {
        setSyncFinish();
      }
    }
  }, [teammates, setSyncFinish]);

  return (
    <div className="min-h-screen-daylik container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <ClockFading />
          <span className="text-xl font-bold">{team?.name}</span>
        </div>
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
        <HoverEffect>
          {team &&
            teammates?.map((teammate: SyncTeammate) => (
              <SyncLiveCard team={team} teammate={teammate} key={teammate.UUID} />
            ))}
        </HoverEffect>
      </div>
    </div>
  );
};

export default SyncLiveGrid;

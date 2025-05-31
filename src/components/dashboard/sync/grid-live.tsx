'use client';

import { SyncCard } from '@/components/dashboard/sync/card';
import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { Dices, Mic, Shuffle } from 'lucide-react';
import { motion, spring } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';
import type { TeammateWithState } from '@/types/teammateWithState.type';

// TODO: move to utils
function isAllDoneExceptOneActive(teammates: TeammateWithState[]): boolean {
  let activeCount = 0;

  for (const teammate of teammates) {
    if (teammate.state.status === 'active') {
      activeCount++;
    } else if (teammate.state.status !== 'done') {
      return false;
    }
  }

  return activeCount === 1;
}

const SyncGridLive = () => {
  const { team, teammates, showPositions, shuffle, setActiveRandom, setShowPositions } =
    useSyncLiveStore();
  const [shuffleIsDisabled, setShuffleIsDisabled] = useState(false);
  const [randomIsDisabled, setRandomIsDisabled] = useState(false);
  const [positionsIsDisabled, setPositionsIsDisabled] = useState(false);

  useEffect(() => {
    if (teammates.length) {
      const isPristine = teammates.every((teammate) => teammate.state.status === 'idle');
      const isDone = teammates.every((teammate) => teammate.state.status === 'done');

      setShuffleIsDisabled(isDone || !isPristine);
      setRandomIsDisabled(isDone || isAllDoneExceptOneActive(teammates));
      setPositionsIsDisabled(isDone || isAllDoneExceptOneActive(teammates));

      if (isDone) {
        alert('Done!');
      }
    }
  }, [teammates]);

  return (
    <div className="min-h-screen-daylik container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <Mic />
          <span className="text-xl font-bold">{team?.name}</span>
        </div>
        <div className="flex w-full items-center gap-4">
          <Button variant="outline" size="icon" onClick={shuffle} disabled={shuffleIsDisabled}>
            <Shuffle />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={setActiveRandom}
            disabled={randomIsDisabled}
          >
            <Dices />
          </Button>
          <div className="flex items-center space-x-2">
            <Switch
              id="show-positions"
              disabled={positionsIsDisabled}
              checked={showPositions}
              onCheckedChange={(value) => setShowPositions(value)}
            />
            <Label htmlFor="show-positions">Show positions</Label>
          </div>
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

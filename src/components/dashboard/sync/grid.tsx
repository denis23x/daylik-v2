'use client';

import { Button } from '@/components/ui/button';
import { SyncCard } from '@/components/dashboard/sync/card';
import { useSyncStore } from '@/store/useSyncStore';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import { Calendar, Dices, Shuffle } from 'lucide-react';
import { motion, spring } from 'motion/react';
import { useSync } from '@/hooks/useSync';
import ErrorOccurred from '@/components/error-occurred';
import NotFound from '@/components/not-found';
import { Skeleton } from '@/components/ui/skeleton';
import {
  NumberInputDecrement,
  NumberInputField,
  NumberInputGroup,
  NumberInputIncrement,
} from '@/components/ui/number-input';
import { NumberInput } from '@/components/ui/number-input';

const SyncGrid = () => {
  const params = useParams();
  const { team, teammates, setTeam, setTeammates, finishSync, startSync, resetStore } =
    useSyncStore();
  const { startedAt, finishedAt } = useSyncStore();
  const { data, isLoading, error } = useSync({
    query: `*, teams_teammates (teammates (UUID, name, position, color, avatar))`,
    UUID: params.UUID as string,
  });

  useEffect(() => {
    resetStore();
  }, [resetStore]);

  useEffect(() => {
    if (data) {
      const team = data as Team;

      // Pass to render
      setTeam(team);
      setTeammates(team.teammates as Teammate[]);
    }
  }, [data, setTeam, setTeammates]);

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

  // const handleSettings = () => {
  //   openModal();
  // };

  const handleStartSync = () => {
    console.log('startSync');
  };

  return (
    <div className="min-h-screen-daylik container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <Calendar />
          <span className="text-xl font-bold">{team?.name}</span>
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          {/* <div className="flex items-center gap-4 overflow-hidden">
            <Grid2x2 />
            <span className="flex-1 truncate text-xl font-bold">{team?.name}</span>
          </div> */}
          <div className="flex gap-4">
            <NumberInput defaultValue={0} className="max-w-3xs">
              <NumberInputGroup>
                <NumberInputDecrement />
                <NumberInputField />
                <NumberInputIncrement />
              </NumberInputGroup>
            </NumberInput>
            <Button variant="outline" size="icon">
              <Shuffle />
            </Button>
            <Button variant="outline" size="icon">
              <Dices />
            </Button>
            {/* <Button variant="outline" size="icon" onClick={handleSettings}>
              <CalendarCog />
            </Button> */}
            <Button onClick={handleStartSync}>Start Sync</Button>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          {isLoading && (
            <ul className="relative grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {[1, 2, 3, 4].map((_, index) => (
                <li key={index}>
                  <Skeleton className="aspect-square max-w-full rounded-xl" />
                </li>
              ))}
            </ul>
          )}
          {error && <ErrorOccurred className="min-h-[224px]" />}
          {!isLoading && !error && teammates?.length === 0 && (
            <NotFound className="min-h-[224px]" />
          )}
          {!isLoading && !error && teammates?.length !== 0 && (
            <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {teammates?.map((teammate) => (
                <motion.li key={teammate.UUID} layout transition={spring}>
                  <SyncCard teammate={teammate} />
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncGrid;

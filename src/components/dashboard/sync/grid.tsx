'use client';

import { Button } from '@/components/ui/button';
import { SyncCard } from '@/components/dashboard/sync/card';
import { useSyncStore } from '@/store/useSyncStore';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import { Dices, Shuffle } from 'lucide-react';
import { motion, spring } from 'motion/react';
import { useSync } from '@/hooks/useSync';
import ErrorOccurred from '@/components/error-occurred';
import Loading from '@/components/loading';
import NotFound from '@/components/not-found';

const SyncGrid = () => {
  const params = useParams();
  const {
    team,
    teammates,
    setTeam,
    setTeammates,
    shuffle,
    setActiveRandom,
    finishSync,
    startSync,
    resetStore,
  } = useSyncStore();
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
      const { teams_teammates, ...team } = data as {
        teams_teammates?: { teammates: Teammate }[];
      } & Team;

      const teammates = teams_teammates?.map((relation) => relation.teammates).flat();

      setTeam(team);
      setTeammates(teammates || []);
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

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      {isLoading && <Loading />}
      {error && <ErrorOccurred />}
      {!isLoading && !error && teammates.length === 0 && <NotFound />}
      {!isLoading && !error && teammates.length !== 0 && (
        <>
          <div className="flex w-full items-center justify-between">
            <span className="text-2xl font-bold">{team?.name}</span>
            <div className="flex gap-4">
              <Button variant="outline" onClick={shuffle} size="icon">
                <Shuffle />
              </Button>
              <Button variant="outline" onClick={setActiveRandom} size="icon">
                <Dices />
              </Button>
            </div>
          </div>
          <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {teammates.map((teammate) => (
              <motion.li key={teammate.UUID} layout transition={spring}>
                <SyncCard teammate={teammate} />
              </motion.li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SyncGrid;

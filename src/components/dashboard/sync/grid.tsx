'use client';

import { Button } from '@/components/ui/button';
import { SyncCard } from '@/components/dashboard/sync/card';
import { useSyncStore } from '@/store/useSyncStore';
import { useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import { getSession } from '@/lib/session';
import { useParams } from 'next/navigation';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import { toast } from 'sonner';
import { Dices, Shuffle } from 'lucide-react';

export const SyncGrid = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession();
        const { data, error } = await supabase
          .from('teams')
          .select(`*, teams_teammates (teammates (UUID, name, position, color, avatar))`)
          .eq('UUID', params.UUID)
          .eq('userUUID', session?.user.id)
          .order('createdAt', { ascending: false })
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          const { teams_teammates, ...team } = data as {
            teams_teammates?: { teammates: Teammate }[];
          } & Team;

          const teammates = teams_teammates?.map((relation) => relation.teammates).flat();

          setTeam(team);
          setTeammates(teammates || []);
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'An error occurred');
      }
    };

    // Reset the store before using it
    resetStore();

    // Fill the store with the data from the database
    fetchData();
  }, []);

  useEffect(() => {
    if (teammates.length) {
      if (!finishedAt && teammates.every((teammate) => teammate.state.status === 'done')) {
        finishSync();
      }
      if (!startedAt && teammates.some((teammate) => teammate.state.status !== 'idle')) {
        startSync();
      }
    }
  }, [teammates]);

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">{team?.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={shuffle} size="icon">
            <Shuffle />
          </Button>
          <Button variant="outline" onClick={setActiveRandom} size="icon">
            <Dices />
          </Button>
        </div>
      </div>
      <ul
        className="mx-auto grid w-full max-w-7xl gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))' }}
      >
        {teammates.map((teammate) => (
          <li className="" key={teammate.UUID}>
            <SyncCard teammate={teammate} />
          </li>
        ))}
      </ul>
    </div>
  );
};

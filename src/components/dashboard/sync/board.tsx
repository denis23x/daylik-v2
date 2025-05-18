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

export const SyncBoard = () => {
  const params = useParams();
  const { team, teammates, setTeam, setTeammates, shuffleTeammates, setActiveRandom } =
    useSyncStore();

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

    fetchData();
  }, []);

  return (
    <div className="mt-20 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{team?.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={shuffleTeammates} size="icon">
            <Shuffle />
          </Button>
          <Button variant="outline" onClick={setActiveRandom} size="icon">
            <Dices />
          </Button>
        </div>
      </div>
      <div
        className="grid grid-cols-[minmax(256px,_1fr)] gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))' }}
      >
        {teammates.map((teammate) => (
          <SyncCard key={teammate.UUID} teammate={teammate} />
        ))}
      </div>
    </div>
  );
};

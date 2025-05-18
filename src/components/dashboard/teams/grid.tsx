'use client';

import ErrorOccurred from '@/components/error-occurred';
import Loading from '@/components/loading';
import NotFound from '@/components/not-found';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTeams } from '@/hooks/useTeams';
import { useTeamsUpsertStore } from '@/store/useTeamsUpsertStore';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const TeamsGrid = () => {
  const { data, error, isLoading } = useTeams(
    `*, teams_teammates (teammates (UUID, name, position, color, avatar))`
  );
  const { openModal } = useTeamsUpsertStore();
  const [teams, setTeams] = useState<Team[]>();

  useEffect(() => {
    if (data) {
      const teamsWithTeammates: Team[] = data.map((team: Team) => {
        const { teams_teammates, ...rest } = team as {
          teams_teammates?: { teammates: Teammate }[];
        } & Team;

        return {
          ...rest,
          teammates: teams_teammates?.map((relation) => relation.teammates).flat() || [],
        };
      });

      setTeams(teamsWithTeammates);
    }
  }, [data]);

  function generateMockTeammates(count: number): Teammate[] {
    const UUID = () => Math.random().toString(36).substring(2, 10) + '-' + Date.now();

    return Array.from({ length: count }, () => {
      return {
        UUID: UUID(),
        name: 'TM',
        position: 'Dummy',
        color: 'var(--background)',
        avatar: null,
        userUUID: UUID(),
        createdAt: new Date().toISOString(),
      };
    });
  }

  const getDisplayTeammates = (team: Team, count = 4) => {
    return [...(team.teammates || []), ...generateMockTeammates(count)].slice(0, count);
  };

  const handleEdit = async (team: Team) => {
    const { data, error } = await supabase
      .from('teams_teammates')
      .select('teammateUUID')
      .eq('teamUUID', team.UUID);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      openModal('update', {
        ...team,
        teammates: data.map(({ teammateUUID }) => teammateUUID),
      });
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      {isLoading && <Loading />}
      {error && <ErrorOccurred />}
      {!isLoading && !error && teams?.length === 0 && <NotFound />}
      {!isLoading && !error && teams?.length !== 0 && (
        <ul
          className="mx-auto grid w-full max-w-7xl gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))' }}
        >
          {teams?.map((team: Team) => (
            <li className="flex flex-col items-center border" key={team.UUID}>
              <button className="text-center" onClick={() => handleEdit(team)}>
                <div className="mx-auto grid aspect-square h-30 w-30 grid-cols-2 grid-rows-2 gap-2">
                  {(getDisplayTeammates(team) as Teammate[]).map((teammate: Teammate) => (
                    <Avatar
                      className="col-span-1 row-span-1 flex h-14 w-14 items-center justify-center"
                      key={teammate.UUID}
                    >
                      <AvatarImage
                        className="bg-secondary object-cover"
                        src={teammate.avatar || undefined}
                      />
                      <AvatarFallback
                        style={{ backgroundColor: teammate.color }}
                        className={
                          teammate.position === 'Dummy' ? 'border-primary border border-dashed' : ''
                        }
                      >
                        {teammate.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{team.name}</h3>
              </button>
              <Link href={`/sync/${team.UUID}`}>
                <Button>Sync</Button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamsGrid;

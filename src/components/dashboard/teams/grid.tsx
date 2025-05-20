'use client';

import ErrorOccurred from '@/components/error-occurred';
import Loading from '@/components/loading';
import NotFound from '@/components/not-found';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTeams } from '@/hooks/useTeams';
import { useTeamsStore } from '@/store/useTeamsStore';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import { supabase } from '@/utils/supabase/client';
import { Pencil, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const TeamsGrid = () => {
  const { data, error, isLoading } = useTeams(
    `*, teams_teammates (teammates (UUID, name, position, color, avatar))`
  );
  const { openModal } = useTeamsStore();
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

  const getDisplayTeammates = (team: Team, count = 4) => {
    if (team.teammates && team.teammates.length < count) {
      const UUID = () => Math.random().toString(36).substring(2, 10) + '-' + Date.now();
      const mockTeammates = Array.from({ length: count }, () => ({
        UUID: UUID(),
      }));

      return [...(team.teammates || []), ...mockTeammates].slice(0, count);
    }

    return team.teammates || [];
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
        <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {teams?.map((team: Team) => (
            <li className="relative flex flex-col rounded-xl border p-2" key={team.UUID}>
              <div className="mb-auto flex items-center justify-between gap-1">
                <span className="overflow-hidden text-base font-semibold text-ellipsis">
                  {team.name}
                </span>
                <Button
                  className="rounded-full"
                  variant="secondary"
                  size="icon"
                  onClick={() => handleEdit(team)}
                >
                  <Pencil />
                </Button>
              </div>
              {team.teammates?.length ? (
                <div className="my-2 grid aspect-square grid-cols-2 grid-rows-2 gap-2">
                  {(getDisplayTeammates(team) as Teammate[]).map(
                    (teammate: Teammate, index, array) =>
                      index < 4 && (
                        <Avatar className="aspect-square size-full border" key={teammate.UUID}>
                          {index < 3 && (
                            <AvatarImage
                              className="bg-secondary object-cover"
                              src={teammate.avatar || undefined}
                            />
                          )}
                          {index !== 3 && teammate.color && teammate.name ? (
                            <AvatarFallback style={{ backgroundColor: teammate.color }}>
                              {teammate.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          ) : teammate.color && teammate.name ? (
                            <AvatarFallback>
                              <span className="text-lg font-semibold">+{array.length - 3}</span>
                            </AvatarFallback>
                          ) : (
                            <AvatarFallback asChild>
                              <Button
                                variant="secondary"
                                size="icon"
                                onClick={() => handleEdit(team)}
                              >
                                <UserRoundPlus />
                              </Button>
                            </AvatarFallback>
                          )}
                        </Avatar>
                      )
                  )}
                </div>
              ) : (
                <div className="my-2 p-4 sm:p-3">
                  <Avatar className="aspect-square size-full border">
                    <AvatarFallback asChild>
                      <Button variant="secondary" onClick={() => handleEdit(team)}>
                        <UserRoundPlus />
                      </Button>
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
              {team.teammates?.length ? (
                <Button asChild>
                  <Link href={`/sync/${team.UUID}`}>Sync</Link>
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => handleEdit(team)}>
                  No teammates
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamsGrid;

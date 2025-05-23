'use client';

import ErrorOccurred from '@/components/error-occurred';
import NotFound from '@/components/not-found';
import GridWithHoverEffect from '@/components/grid-with-hover-effect';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTeams } from '@/hooks/useTeams';
import { useTeamsStore } from '@/store/useTeamsStore';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import { supabase } from '@/utils/supabase/client';
import { Grid2x2, Grid2x2Plus, Pencil, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { getContrastingColor } from '@/utils/getContrastingColor';

const TeamsGrid = () => {
  const { data, error, isLoading } = useTeams({
    query: `*, teams_teammates (teammates (UUID, name, position, color, avatar))`,
  });
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

  const handleInsert = () => {
    openModal('insert');
  };

  const handleUpdate = async (team: Team) => {
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
    <div className="container mx-auto min-h-[calc(100dvh-var(--navbar-height))] p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <Grid2x2 />
          <span className="text-xl font-bold">Teams</span>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          {isLoading && (
            <ul className="relative grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {[1, 2, 3, 4].map((_, index) => (
                <li key={index}>
                  <Skeleton className="aspect-[2/2.75] min-h-[224px] max-w-full rounded-xl" />
                </li>
              ))}
            </ul>
          )}
          {error && <ErrorOccurred className="min-h-[224px]" />}
          {!isLoading && !error && teams?.length === 0 && <NotFound className="min-h-[224px]" />}
          {!isLoading && !error && teams?.length !== 0 && (
            <GridWithHoverEffect>
              <Card className="bg-background size-full gap-0 p-2">
                <CardHeader className="relative mb-auto flex min-h-9 items-start justify-between gap-x-1.5 gap-y-0 p-0">
                  <span className="overflow-hidden text-base font-semibold text-ellipsis">New</span>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="my-2 p-4 sm:p-3">
                    <Avatar className="aspect-square size-full border border-dashed">
                      <AvatarFallback asChild>
                        <Button variant="secondary" onClick={handleInsert}>
                          <Grid2x2Plus />
                        </Button>
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-stretch p-0 text-center">
                  <Button variant="secondary" onClick={handleInsert}>
                    Create team
                  </Button>
                </CardFooter>
              </Card>
              {teams?.map((team: Team) => (
                <Card className="bg-background size-full gap-0 p-2" key={team.UUID}>
                  <CardHeader className="relative mb-auto flex min-h-9 items-center justify-between gap-x-1.5 gap-y-0 p-0">
                    <span className="overflow-hidden text-base font-semibold text-ellipsis">
                      {team.name}
                    </span>
                    <Button
                      className="self-start rounded-full"
                      variant="secondary"
                      size="icon"
                      onClick={() => handleUpdate(team)}
                    >
                      <Pencil />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    {team.teammates?.length ? (
                      <div className="my-2 grid aspect-square grid-cols-2 grid-rows-2 gap-2">
                        {(getDisplayTeammates(team) as Teammate[]).map(
                          (teammate: Teammate, index, array) =>
                            index < 4 && (
                              <Avatar
                                className="aspect-square size-full border"
                                key={teammate.UUID}
                              >
                                {index < 3 && (
                                  <AvatarImage
                                    className="bg-secondary object-cover"
                                    src={teammate.avatar || undefined}
                                  />
                                )}
                                {index !== 3 && teammate.color && teammate.name ? (
                                  <AvatarFallback style={{ backgroundColor: teammate.color }}>
                                    <span style={{ color: getContrastingColor(teammate.color) }}>
                                      {teammate.name.slice(0, 2).toUpperCase()}
                                    </span>
                                  </AvatarFallback>
                                ) : teammate.color && teammate.name ? (
                                  <AvatarFallback>
                                    <span className="text-lg font-semibold">
                                      +{array.length - 3}
                                    </span>
                                  </AvatarFallback>
                                ) : (
                                  <AvatarFallback asChild>
                                    <Button
                                      variant="secondary"
                                      size="icon"
                                      onClick={() => handleUpdate(team)}
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
                        <Avatar className="aspect-square size-full border border-dashed">
                          <AvatarFallback asChild>
                            <Button variant="secondary" onClick={() => handleUpdate(team)}>
                              <UserRoundPlus />
                            </Button>
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col items-stretch p-0 text-center">
                    {team.teammates?.length ? (
                      <Button asChild>
                        <Link href={`/sync/${team.UUID}`}>Sync</Link>
                      </Button>
                    ) : (
                      <Button variant="ghost" onClick={() => handleUpdate(team)}>
                        No teammates
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </GridWithHoverEffect>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamsGrid;

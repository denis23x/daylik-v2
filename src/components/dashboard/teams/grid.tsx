'use client';

import HoverEffect from '@/components/hover-effect';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTeams } from '@/hooks/useTeams';
import { useTeamsStore } from '@/store/useTeamsStore';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import { Bug, CircleOff, Grid2x2, Grid2x2Plus, Pencil, Plus, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { BorderBeam } from '@/components/magicui/border-beam';
import AvatarInitials from '@/components/avatar-initials';
import Image from 'next/image';
import { useTeammatesFromTeam } from '@/hooks/useTeamsTeammates';
import { useQueryClient } from '@tanstack/react-query';
import { getDisplayTeammates } from '@/utils/getDisplayTeammates';
import type { TeamTeammate } from '@/types/teamTeammate.type';
import { useFeedbackStore } from '@/store/useFeedbackStore';

const TeamsGrid = () => {
  const queryClient = useQueryClient();
  const { openModal: openFeedbackModal } = useFeedbackStore();
  const [team, setTeam] = useState<Team>();
  const {
    data: teams,
    error,
    isLoading,
  } = useTeams({
    query: `*, teams_teammates (teammates (UUID, name, color, avatar))`,
  });
  const { refetch } = useTeammatesFromTeam({
    query: 'teammateUUID',
    UUID: team?.UUID || '',
  });
  const { openModal } = useTeamsStore();

  useEffect(() => {
    if (team) {
      const fetchData = async () => {
        try {
          const cache = queryClient.getQueryData(['teams_teammates', team.UUID]);
          let teammates: Pick<TeamTeammate, 'teammateUUID'>[] = (cache as TeamTeammate[]) || [];

          if (!cache) {
            const { data } = await refetch();

            // Update teammates if cache is not available
            teammates = data || [];
          }

          // Open modal with teammates
          openModal('update', {
            ...team,
            teammates: teammates.map(({ teammateUUID }) => teammateUUID),
          });
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'An error occurred');
        } finally {
          setTeam(undefined);
        }
      };

      fetchData();
    }
  }, [team, refetch, openModal, queryClient]);

  const handleInsert = () => {
    openModal('insert');
  };

  const handleUpdate = async (team: Team) => {
    setTeam(team);
  };

  return (
    <div className="min-h-screen-grid container mx-auto p-4">
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
          {error && (
            <div className="flex min-h-[75dvh] max-w-md flex-col items-center justify-center gap-4">
              <Bug />
              <div className="text-center text-xl font-semibold">An error occurred</div>
              <Button variant="destructive" onClick={openFeedbackModal}>
                Report
              </Button>
            </div>
          )}
          {!isLoading && !error && teams?.length === 0 && (
            <div className="flex min-h-[75dvh] max-w-md flex-col items-center justify-center gap-4">
              <CircleOff />
              <div className="text-center text-xl font-semibold">No teams found</div>
              <Button variant="secondary" onClick={handleInsert}>
                <Plus /> Create Team
              </Button>
            </div>
          )}
          {!isLoading && !error && teams?.length !== 0 && (
            <HoverEffect>
              <Card className="relative size-full gap-0 p-2">
                <CardHeader className="relative mb-auto flex min-h-9 items-center justify-between gap-x-1.5 gap-y-0 p-0">
                  <span className="truncate text-base font-semibold">New</span>
                </CardHeader>
                <CardContent className="my-2 p-4 sm:p-3">
                  <Avatar className="aspect-square size-full border border-dashed p-1">
                    <AvatarFallback asChild>
                      <Button
                        className="shadow-none"
                        variant="secondary"
                        size="icon"
                        onClick={handleInsert}
                      >
                        <Grid2x2Plus />
                      </Button>
                    </AvatarFallback>
                  </Avatar>
                </CardContent>
                <CardFooter className="flex flex-col items-stretch p-0 text-center">
                  <Button variant="secondary" onClick={handleInsert}>
                    Create Team
                  </Button>
                </CardFooter>
                <BorderBeam duration={8} size={100} />
              </Card>
              {teams?.map((team: Team) => (
                <Card className="size-full gap-0 p-2" id={team.UUID} key={team.UUID}>
                  <CardHeader className="relative mb-auto flex min-h-9 items-center justify-between gap-x-1.5 gap-y-0 p-0">
                    <span className="truncate text-base font-semibold">{team.name}</span>
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
                    {team.image ? (
                      <div className="my-2">
                        <Image
                          className="aspect-square size-full rounded-lg border object-cover"
                          src={team.image}
                          alt={team.name}
                          width={256}
                          height={256}
                        />
                      </div>
                    ) : team.teammates?.length ? (
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
                                    <AvatarInitials className="lg:text-lg" teammate={teammate} />
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
                        <Link href={`/sync/${team.UUID}/settings`}>Sync Team</Link>
                      </Button>
                    ) : (
                      <Button variant="ghost" onClick={() => handleUpdate(team)}>
                        No Teammates
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </HoverEffect>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamsGrid;

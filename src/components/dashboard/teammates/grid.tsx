'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Teammate } from '@/types/teammate.type';
import { useTeammates } from '@/hooks/useTeammates';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Bug, CircleOff, Pencil, Plus, UserRoundPlus, UsersRound } from 'lucide-react';
import HoverEffect from '@/components/hover-effect';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { BorderBeam } from '@/components/magicui/border-beam';
import AvatarInitials from '@/components/avatar-initials';
import { useState, useEffect } from 'react';
import { useTeamsToTeammate } from '@/hooks/useTeamsTeammates';
import { useFeedbackStore } from '@/store/useFeedbackStore';
import { getCookie, setCookie } from '@/hooks/useCookie';
import { COOKIE_CONSENT, COOKIE_ROLES } from '@/lib/constants';

const TeammatesGrid = () => {
  const { openModal } = useTeammatesStore();
  const { openModal: openFeedbackModal } = useFeedbackStore();
  const [teammate, setTeammate] = useState<Teammate>();
  const { data: teammates, error, isLoading } = useTeammates({ query: '*' });
  const { refetch } = useTeamsToTeammate({
    query: 'teamUUID',
    UUID: teammate?.UUID || '',
  });

  useEffect(() => {
    if (teammates) {
      const roles = Array.from(new Set(teammates?.map((teammate) => teammate.role)));

      // Save roles to cookie for autocomplete
      if (Number(getCookie(COOKIE_CONSENT))) {
        setCookie(COOKIE_ROLES, JSON.stringify(roles));
      }
    }
  }, [teammates]);

  useEffect(() => {
    if (teammate) {
      const fetchData = async () => {
        try {
          const teamsFromTeammate = await refetch();
          const teams = teamsFromTeammate.data || [];

          // Open modal with teams
          openModal('update', {
            ...teammate,
            teams: teams.map(({ teamUUID }) => teamUUID),
          });
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'An error occurred');
        } finally {
          setTeammate(undefined);
        }
      };

      fetchData();
    }
  }, [teammate, refetch, openModal]);

  const handleInsert = () => {
    openModal('insert');
  };

  const handleUpdate = async (teammate: Teammate) => {
    setTeammate(teammate);
  };

  return (
    <div className="min-h-screen-grid container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <UsersRound />
          <span className="text-xl font-bold">Teammates</span>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          {isLoading && (
            <ul className="relative grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {[1, 2, 3, 4].map((_, index) => (
                <li key={index}>
                  <Skeleton className="aspect-[3/3.75] min-h-[224px] max-w-full rounded-xl" />
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
          {!isLoading && !error && teammates?.length === 0 && (
            <div className="flex min-h-[75dvh] max-w-md flex-col items-center justify-center gap-4">
              <CircleOff />
              <div className="text-center text-xl font-semibold">No teammates found</div>
              <Button variant="secondary" onClick={handleInsert}>
                <Plus /> Add Teammate
              </Button>
            </div>
          )}
          {!isLoading && !error && teammates?.length !== 0 && (
            <HoverEffect>
              <Card className="relative size-full gap-0 p-2">
                <CardContent className="translate-y-2 p-4 sm:p-3">
                  <Avatar className="aspect-square size-full border border-dashed p-1">
                    <AvatarFallback asChild>
                      <Button
                        className="shadow-none"
                        variant="secondary"
                        size="icon"
                        onClick={handleInsert}
                      >
                        <UserRoundPlus className="size-5" />
                      </Button>
                    </AvatarFallback>
                  </Avatar>
                </CardContent>
                <CardFooter className="flex flex-col items-stretch p-0 text-center">
                  <span className="truncate text-lg font-semibold sm:text-2xl">New</span>
                  <p className="text-muted-foreground truncate text-xs sm:text-sm">
                    Add a teammate
                  </p>
                </CardFooter>
                <BorderBeam duration={8} size={100} />
              </Card>
              {teammates?.map((teammate: Teammate) => (
                <Card className="size-full gap-0 p-2" id={teammate.UUID} key={teammate.UUID}>
                  <CardHeader className="relative gap-0">
                    <Button
                      className="absolute top-0 right-0 z-10 rounded-full"
                      variant="secondary"
                      size="icon"
                      onClick={() => handleUpdate(teammate)}
                    >
                      <Pencil />
                    </Button>
                  </CardHeader>
                  <CardContent className="translate-y-2 p-4 sm:p-3">
                    <Avatar
                      className="aspect-square size-full border"
                      onClick={() => handleUpdate(teammate)}
                    >
                      <AvatarImage
                        className="bg-secondary object-cover"
                        src={teammate.avatar || undefined}
                      />
                      <AvatarFallback style={{ backgroundColor: teammate.color }}>
                        <AvatarInitials className="text-2xl" teammate={teammate} />
                      </AvatarFallback>
                    </Avatar>
                  </CardContent>
                  <CardFooter className="flex flex-col items-stretch p-0 text-center">
                    <span className="truncate text-lg font-semibold sm:text-2xl">
                      {teammate.name}
                    </span>
                    <p className="text-muted-foreground truncate text-xs sm:text-sm">
                      {teammate.role}
                    </p>
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

export default TeammatesGrid;

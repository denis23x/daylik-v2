'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Teammate } from '@/types/teammate.type';
import { useTeammates } from '@/hooks/useTeammates';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import { Button } from '@/components/ui/button';
import { Bug, CircleOff, Plus, UserRoundPlus, UsersRound } from 'lucide-react';
import HoverEffect from '@/components/hover-effect';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { BorderBeam } from '@/components/magicui/border-beam';
import { useEffect } from 'react';
import { useFeedbackStore } from '@/store/useFeedbackStore';
import { getCookie, setCookie } from '@/hooks/useCookie';
import { COOKIE_CONSENT, COOKIE_ROLES } from '@/lib/constants';
import TeammatesCard from './card';

const TeammatesGrid = () => {
  const { openModal } = useTeammatesStore();
  const { openModal: openFeedbackModal } = useFeedbackStore();
  const { data: teammates, error, isLoading } = useTeammates({ query: '*' });

  useEffect(() => {
    if (teammates) {
      const roles = Array.from(new Set(teammates?.map((teammate) => teammate.role)));

      // Save roles to cookie for autocomplete
      if (Number(getCookie(COOKIE_CONSENT))) {
        setCookie(COOKIE_ROLES, JSON.stringify(roles));
      }
    }
  }, [teammates]);

  const handleInsert = () => {
    openModal('insert');
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
                <TeammatesCard key={teammate.UUID} teammate={teammate} />
              ))}
            </HoverEffect>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeammatesGrid;

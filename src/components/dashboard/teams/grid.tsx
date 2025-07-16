'use client';

import HoverEffect from '@/components/hover-effect';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTeams } from '@/hooks/useTeams';
import { useTeamsStore } from '@/store/useTeamsStore';
import type { Team } from '@/types/team.type';
import { Bug, CircleOff, Grid2x2, Grid2x2Plus, Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { BorderBeam } from '@/components/magicui/border-beam';
import { useFeedbackStore } from '@/store/useFeedbackStore';
import TeamsCard from './card';

const TeamsGrid = () => {
  const { openModal } = useTeamsStore();
  const { openModal: openFeedbackModal } = useFeedbackStore();
  const {
    data: teams,
    error,
    isLoading,
  } = useTeams({
    query: `*, teams_teammates (order, teammates (UUID, name, color, avatar))`,
  });

  const handleInsert = () => {
    openModal('insert');
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
                        <Grid2x2Plus className="size-5" />
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
              {teams?.map((team: Team) => <TeamsCard key={team.UUID} team={team} />)}
            </HoverEffect>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamsGrid;

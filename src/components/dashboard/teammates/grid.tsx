'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Teammate } from '@/types/teammate.type';
import { useTeammates } from '@/hooks/useTeammates';
import NotFound from '@/components/not-found';
import ErrorOccurred from '@/components/error-occurred';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Pencil, UserRoundPlus, UsersRound } from 'lucide-react';
import GridWithHoverEffect from '@/components/grid-with-hover-effect';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { getContrastingColor } from '@/utils/getContrastingColor';

const TeammatesGrid = () => {
  const { data: teammates, error, isLoading } = useTeammates({ query: '*' });
  const { openModal } = useTeammatesStore();

  const handleCreate = () => {
    openModal('insert');
  };

  const handleUpdate = async (teammate: Teammate) => {
    const { data, error } = await supabase
      .from('teams_teammates')
      .select('teamUUID')
      .eq('teammateUUID', teammate.UUID);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      openModal('update', {
        ...teammate,
        teams: data.map(({ teamUUID }) => teamUUID),
      });
    }
  };

  return (
    <div className="container mx-auto min-h-[calc(100dvh-var(--navbar-height))] p-4">
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
                  <Skeleton className="aspect-[4/4.6] min-h-[224px] max-w-full" />
                </li>
              ))}
            </ul>
          )}
          {error && <ErrorOccurred className="min-h-[224px]" />}
          {!isLoading && !error && teammates?.length === 0 && (
            <NotFound className="min-h-[224px]" />
          )}
          {!isLoading && !error && teammates?.length !== 0 && (
            <GridWithHoverEffect>
              <Card className="bg-background aspect-[4/4.6] gap-0 p-2">
                <CardContent className="translate-y-1 p-4 sm:p-3">
                  <Avatar
                    className="aspect-square size-full border border-dashed"
                    onClick={handleCreate}
                  >
                    <AvatarFallback>
                      <UserRoundPlus />
                    </AvatarFallback>
                  </Avatar>
                </CardContent>
                <CardFooter className="flex flex-col items-stretch p-0 text-center">
                  <span className="overflow-hidden text-lg font-semibold text-ellipsis sm:text-2xl">
                    New
                  </span>
                  <p className="text-muted-foreground overflow-hidden text-xs text-ellipsis sm:text-sm">
                    Create teammate
                  </p>
                </CardFooter>
              </Card>
              {teammates?.map((teammate: Teammate) => (
                <Card className="bg-background aspect-[4/4.6] gap-0 p-2" key={teammate.UUID}>
                  <CardHeader className="relative gap-0">
                    <Button
                      className="absolute top-0 right-0 z-10 rounded-full 2xl:top-1 2xl:right-1"
                      variant="secondary"
                      size="syncIcon"
                      onClick={() => handleUpdate(teammate)}
                    >
                      <Pencil />
                    </Button>
                  </CardHeader>
                  <CardContent className="translate-y-1 p-4 sm:p-3">
                    <Avatar
                      className="aspect-square size-full border"
                      onClick={() => handleUpdate(teammate)}
                    >
                      <AvatarImage
                        className="bg-secondary object-cover"
                        src={teammate.avatar || undefined}
                      />
                      <AvatarFallback style={{ backgroundColor: teammate.color }}>
                        <span
                          className="text-xl"
                          style={{ color: getContrastingColor(teammate.color) }}
                        >
                          {teammate.name.slice(0, 2).toUpperCase()}
                        </span>
                      </AvatarFallback>
                    </Avatar>
                  </CardContent>
                  <CardFooter className="flex flex-col items-stretch p-0 text-center">
                    <span className="overflow-hidden text-lg font-semibold text-ellipsis sm:text-2xl">
                      {teammate.name}
                    </span>
                    <p className="text-muted-foreground overflow-hidden text-xs text-ellipsis sm:text-sm">
                      {teammate.position}
                    </p>
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

export default TeammatesGrid;

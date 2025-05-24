'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Teammate } from '@/types/teammate.type';
import { useTeammates } from '@/hooks/useTeammates';
import NotFound from '@/components/not-found';
import ErrorOccurred from '@/components/error-occurred';
import Loading from '@/components/loading';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import GridWithHoverEffect from '@/components/grid-with-hover-effect';

const TeammatesGrid = () => {
  const { data: teammates, error, isLoading } = useTeammates({ query: '*' });
  const { openModal } = useTeammatesStore();

  const handleEdit = async (teammate: Teammate) => {
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
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      {isLoading && <Loading />}
      {error && <ErrorOccurred />}
      {!isLoading && !error && teammates?.length === 0 && <NotFound />}
      {!isLoading && !error && teammates?.length !== 0 && (
        <GridWithHoverEffect>
          {teammates?.map((teammate: Teammate) => (
            <>
              <Button
                className="absolute top-2 right-2 rounded-full 2xl:top-3 2xl:right-3"
                variant="secondary"
                size="syncIcon"
                onClick={() => handleEdit(teammate)}
              >
                <Pencil />
              </Button>
              <div className="pointer-events-none translate-y-1 p-4 sm:p-3">
                <Avatar className="aspect-square size-full border">
                  <AvatarImage
                    className="bg-secondary object-cover"
                    src={teammate.avatar || undefined}
                  />
                  <AvatarFallback style={{ backgroundColor: teammate.color }}>
                    {teammate.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col text-center">
                <span className="overflow-hidden text-lg font-semibold text-ellipsis sm:text-2xl">
                  {teammate.name}
                </span>
                <p className="text-muted-foreground overflow-hidden text-xs text-ellipsis sm:text-sm">
                  {teammate.position}
                </p>
              </div>
            </>
          ))}
        </GridWithHoverEffect>
      )}
    </div>
  );
};

export default TeammatesGrid;

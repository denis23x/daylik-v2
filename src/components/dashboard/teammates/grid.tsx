'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Teammate } from '@/types/teammate.type';
import { useTeammates } from '@/hooks/useTeammates';
import NotFound from '@/components/not-found';
import ErrorOccurred from '@/components/error-occurred';
import Loading from '@/components/loading';
import { useTeammatesUpsertStore } from '@/store/useTeammatesUpsertStore';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

const TeammatesGrid = () => {
  const { data: teammates, error, isLoading } = useTeammates();
  const { openModal } = useTeammatesUpsertStore();

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
        <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {teammates?.map((teammate: Teammate) => (
            <li
              className="relative flex aspect-square flex-col rounded-xl border p-2"
              key={teammate.UUID}
            >
              <div className="absolute top-0 left-0 flex w-full items-start justify-end p-2 2xl:p-3">
                <Button
                  className="rounded-full"
                  variant="outline"
                  size="syncIcon"
                  onClick={() => handleEdit(teammate)}
                >
                  <Pencil />
                </Button>
              </div>
              <div className="p-4 sm:p-3">
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
              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold sm:text-2xl">{teammate.name}</span>
                <p className="text-muted-foreground text-xs sm:text-sm">{teammate.position}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeammatesGrid;

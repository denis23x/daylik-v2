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
            <li className="flex flex-col items-center border" key={teammate.UUID}>
              <button className="text-center" onClick={() => handleEdit(teammate)}>
                <Avatar className="mx-auto h-30 w-30">
                  <AvatarImage
                    className="bg-secondary object-cover"
                    src={teammate.avatar || undefined}
                  />
                  <AvatarFallback style={{ backgroundColor: teammate.color }}>
                    {teammate.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-4 text-lg font-semibold">{teammate.name}</h3>
                <p className="text-muted-foreground">{teammate.position}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeammatesGrid;

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Teammate } from '@/types/teammate.type';
import { useTeammates } from '@/hooks/useTeammates';
import { useAuth } from '@/context/AuthProvider';
import NotFound from '@/components/not-found';
import ErrorOccurred from '@/components/error-occurred';
import Loading from '@/components/loading';
import { useTeammateUpsertStore } from '@/store/useTeammateUpsertStore';

const TeammatesList = () => {
  const { user } = useAuth();
  const { data: teammates, error, isLoading } = useTeammates(user);
  const { openModal } = useTeammateUpsertStore();

  const handleEdit = (teammate: Teammate) => {
    openModal('update', teammate);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      {isLoading && <Loading />}
      {error && <ErrorOccurred />}
      {!isLoading && !error && teammates?.length === 0 && <NotFound />}
      {!isLoading && !error && teammates?.length !== 0 && (
        <div className="mx-auto mt-20 grid w-full max-w-screen-lg grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4">
          {teammates?.map((teammate: Teammate) => (
            <button
              className="text-center"
              key={teammate.UUID}
              onClick={() => handleEdit(teammate)}
            >
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
          ))}
        </div>
      )}
    </div>
  );
};

export default TeammatesList;

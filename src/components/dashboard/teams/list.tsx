'use client';

import ErrorOccurred from '@/components/error-occurred';
import Loading from '@/components/loading';
import NotFound from '@/components/not-found';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthProvider';
import { useTeams } from '@/hooks/useTeams';
import { useTeamsUpsertStore } from '@/store/useTeamsUpsertStore';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import { supabase } from '@/utils/supabase/client';
import { useState } from 'react';
import { toast } from 'sonner';

const TeamsList = () => {
  const { user } = useAuth();
  const { data: teams, error, isLoading } = useTeams(user);
  const { openModal } = useTeamsUpsertStore();

  const [mockTeammates] = useState<Teammate[]>([
    {
      UUID: '3a7f1e9b-8c5d-4f3a-b8e2-6c9d4a7b1c3e',
      name: 'TM 1',
      position: 'Dummy',
      color: 'var(--background)',
      avatar: null,
      userUUID: '6d8479a5-4d38-46c3-b3a0-5b905aa3c92a',
      createdAt: new Date().toISOString(),
    },
    {
      UUID: 'f8e7d6c5-b4a3-2f1e-9d8c-7b6a5f4e3d2c',
      name: 'TM 2',
      position: 'Dummy',
      color: 'var(--background)',
      avatar: null,
      userUUID: '7b5878a0-3b78-4583-a14a-edb60232ba5e',
      createdAt: new Date().toISOString(),
    },
    {
      UUID: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
      name: 'TM 3',
      position: 'Dummy',
      color: 'var(--background)',
      avatar: null,
      userUUID: '0c7a87e0-0402-4e6b-9772-1ab49b2307f4',
      createdAt: new Date().toISOString(),
    },
    {
      UUID: 'a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6',
      name: 'TM 4',
      position: 'Dummy',
      color: 'var(--background)',
      avatar: null,
      userUUID: 'f51d3b27-36a2-46c6-8f6e-32d2a3e08636',
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleEdit = async (team: Team) => {
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
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      {isLoading && <Loading />}
      {error && <ErrorOccurred />}
      {!isLoading && !error && teams?.length === 0 && <NotFound />}
      {!isLoading && !error && teams?.length !== 0 && (
        <div className="mx-auto mt-20 grid w-full max-w-screen-lg grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4">
          {teams?.map((team: Team) => (
            <button className="text-center" key={team.UUID} onClick={() => handleEdit(team)}>
              <div className="mx-auto grid aspect-square h-30 w-30 grid-cols-2 grid-rows-2 gap-2">
                {mockTeammates.slice(0, 4).map((teammate: Teammate) => (
                  <Avatar
                    className="col-span-1 row-span-1 flex h-14 w-14 items-center justify-center"
                    key={teammate.UUID}
                  >
                    <AvatarImage
                      className="bg-secondary object-cover"
                      src={teammate.avatar || undefined}
                    />
                    <AvatarFallback
                      style={{ backgroundColor: teammate.color }}
                      className={
                        teammate.position === 'Dummy' ? 'border-primary border border-dashed' : ''
                      }
                    >
                      {teammate.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {/* {(team.teammates && team.teammates?.length >= 4
                  ? team.teammates
                  : [...(team.teammates || []), ...mockTeammates]
                )
                  .slice(0, 4)
                  .map((teammate: Teammate) => (
                    <Avatar
                      className="col-span-1 row-span-1 flex h-14 w-14 items-center justify-center"
                      key={teammate.UUID}
                    >
                      <AvatarImage
                        className="bg-secondary object-cover"
                        src={teammate.avatar || undefined}
                      />
                      <AvatarFallback
                        style={{ backgroundColor: teammate.color }}
                        className={
                          teammate.position === 'Dummy' ? 'border-primary border border-dashed' : ''
                        }
                      >
                        {teammate.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ))} */}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{team.name}</h3>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamsList;

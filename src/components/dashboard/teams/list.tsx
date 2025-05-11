'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Team } from '@/types/team';
import type { Teammate } from '@/types/teammate';
import { useState } from 'react';

const TeamsList = ({ teams }: { teams: Team[] }) => {
  const [mockTeammates] = useState<Teammate[]>([
    {
      id: 1,
      name: 'TM 1',
      role: 'Dummy',
      color: 'var(--background)',
      avatar: null,
      teamId: 1,
      userId: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'TM 2',
      role: 'Dummy',
      color: 'var(--background)',
      avatar: null,
      teamId: 1,
      userId: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'TM 3',
      role: 'Dummy',
      color: 'var(--background)',
      avatar: null,
      teamId: 1,
      userId: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      name: 'TM 4',
      role: 'Dummy',
      color: 'var(--background)',
      avatar: null,
      teamId: 1,
      userId: 1,
      createdAt: new Date().toISOString(),
    },
  ]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto mt-20 grid w-full max-w-screen-lg grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4">
        {teams.map((team: Team) => (
          <div key={team.id} className="text-center">
            <div className="mx-auto grid aspect-square h-30 w-30 grid-cols-2 grid-rows-2 gap-2">
              {(team.teammate.length >= 4 ? team.teammate : [...team.teammate, ...mockTeammates])
                .slice(0, 4)
                .map((teammate: Teammate) => (
                  <Avatar
                    className="col-span-1 row-span-1 flex h-14 w-14 items-center justify-center"
                    key={teammate.id}
                  >
                    <AvatarImage
                      className="bg-secondary object-cover"
                      src={teammate.avatar || undefined}
                    />
                    <AvatarFallback
                      style={{ backgroundColor: teammate.color }}
                      className={teammate.role === 'Dummy' ? 'border border-dashed' : ''}
                    >
                      {teammate.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
            </div>
            <h3 className="mt-4 text-lg font-semibold">{team.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsList;

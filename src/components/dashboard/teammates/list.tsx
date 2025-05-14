'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Teammate } from '@/types/teammate';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useTeammates } from '@/hooks/useTeammates';
import { useAuth } from '@/context/AuthContextProvider';

const TeammatesList = () => {
  const { user } = useAuth();
  const { data, error } = useTeammates(user);

  const [teammates, setTeammates] = useState<Teammate[]>([]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      const teammatesWithTeams: Teammate[] = data.map((teammate: Teammate) => {
        const { teams_teammates, ...rest } = teammate;

        return {
          ...rest,
          teams: teams_teammates?.map((link) => link.teams).flat() || [],
        };
      });

      setTeammates(teammatesWithTeams);
      return;
    }
  }, [data, error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto mt-20 grid w-full max-w-screen-lg grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4">
        {teammates.map((teammate: Teammate) => (
          <div key={teammate.UUID} className="text-center">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeammatesList;

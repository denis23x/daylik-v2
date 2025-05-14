'use client';

import TeamsHero from '@/components/dashboard/teams/hero';
import TeamsList from '@/components/dashboard/teams/list';
import { useAuth } from '@/context/AuthProvider';
import type { Team } from '@/types/team.type';
import { supabase } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function Teams() {
  const { user } = useAuth();

  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const { data, error } = await supabase
        .from('teams')
        .select(
          `
          *,
          teams_teammates (
            teammates (
              UUID,
              name,
              position,
              color,
              avatar
            )
          )
        `
        )
        .eq('userUUID', user?.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        const teamsWithTeammates: Team[] = data.map((team: Team) => {
          const { teams_teammates, ...rest } = team;

          return {
            ...rest,
            teammates: teams_teammates?.map((link) => link.teammates).flat() || [],
          };
        });

        setTeams(teamsWithTeammates);
        return;
      }
    };

    fetchTeams();
  }, [user]);

  return (
    <>
      <TeamsHero />
      {teams && teams.length > 0 ? <TeamsList teams={teams} /> : null}
    </>
  );
}

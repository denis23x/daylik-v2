'use client';

import TeamsHero from '@/components/dashboard/teams/hero';
import TeamsList from '@/components/dashboard/teams/list';
import type { Team } from '@/types/team';
import { supabase } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      // TODO: Change to session?.user.id
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('userUUID', '6d8479a5-4d38-46c3-b3a0-5b905aa3c92a');

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        setTeams(data);
        return;
      }
    };

    fetchTeams();
  }, []);

  return (
    <>
      <TeamsHero />
      {teams && teams.length > 0 ? <TeamsList teams={teams} /> : null}
    </>
  );
}

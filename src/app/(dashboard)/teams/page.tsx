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
      const { data, error } = await supabase.from('team').select('*, teammate(*)');

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

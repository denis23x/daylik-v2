'use client';

import TeammatesHero from '@/components/dashboard/teammates/hero';
import TeammatesList from '@/components/dashboard/teammates/list';
import type { Teammate } from '@/types/teammate';
import { supabase } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function Teammates() {
  const [teammates, setTeammates] = useState<Teammate[]>([]);

  useEffect(() => {
    const fetchTeammates = async () => {
      // TODO: Change to session?.user.id
      const { data, error } = await supabase
        .from('teammates')
        .select(
          `
          *,
          teams_teammates (
            teams (
              UUID,
              name
            )
          )
        `
        )
        .eq('userUUID', '6d8479a5-4d38-46c3-b3a0-5b905aa3c92a');

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
    };

    fetchTeammates();
  }, []);

  return (
    <>
      <TeammatesHero />
      {teammates && teammates.length > 0 ? <TeammatesList teammates={teammates} /> : null}
    </>
  );
}

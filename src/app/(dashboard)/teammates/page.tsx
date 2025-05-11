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
        .select('*')
        .eq('userUUID', '6d8479a5-4d38-46c3-b3a0-5b905aa3c92a');

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        setTeammates(data);
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

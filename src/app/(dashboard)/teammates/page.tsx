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
      const { data, error } = await supabase.from('teammate').select('*');

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

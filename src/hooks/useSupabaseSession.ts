import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { SupabaseSession } from '@/types/supabaseSession';

export const useSupabaseSession = () => {
  const [session, setSession] = useState<SupabaseSession | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        toast.error(error.message);
        return;
      }

      setSession(data.session as SupabaseSession);
    };

    fetchSession();
  }, []);

  return session;
};

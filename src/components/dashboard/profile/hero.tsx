'use client';

import { Badge } from '@/components/ui/badge';
import { supabase } from '@/utils/supabase/client';
import { useEffect } from 'react';

const ProfileHero = () => {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log('Session:', data.session);
    });
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <Badge className="bg-primary rounded-full border-none py-1">Just released v1.0.0</Badge>
        <h1 className="mt-6 text-4xl font-bold sm:text-5xl md:text-6xl md:leading-[1.2]">
          Organize Your Projects with Teams
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Create teams to better organize your projects and resources. Group related work together
          and maintain a structured environment for your various initiatives.
        </p>
      </div>
    </div>
  );
};

export default ProfileHero;

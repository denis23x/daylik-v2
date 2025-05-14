'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { AuthType } from '@/types/auth.type';

const Auth = createContext<AuthType | undefined>(undefined);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(!initialUser);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    if (!initialUser) {
      supabase.auth.getUser().then(({ data, error }) => {
        if (error) {
          console.error('Error getting user:', error.message);
        }
        setUser(data?.user ?? null);
        setLoading(false);
      });
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [initialUser]);

  return <Auth.Provider value={{ user, loading }}>{children}</Auth.Provider>;
}

export function useAuth() {
  const context = useContext(Auth);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { Auth };

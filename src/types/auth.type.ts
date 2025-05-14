import type { User } from '@supabase/supabase-js';

export type AuthType = {
  user: User | null;
  loading: boolean;
};

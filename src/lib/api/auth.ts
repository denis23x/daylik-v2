import { supabase } from '@/utils/supabase/client';

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  email: string;
  password: string;
};

type ResetPasswordParams = {
  email: string;
};

type UpdatePasswordParams = {
  password: string;
};

export async function signIn({ email, password }: SignInParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUp({ email, password }: SignUpParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/teams?welcomeUser=1`,
    },
  });
  if (error) throw error;
  return data;
}

export async function resetPassword({ email }: ResetPasswordParams) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/update-password`,
  });
  if (error) throw error;
  return data;
}

export async function updatePassword({ password }: UpdatePasswordParams) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });
  if (error) throw error;
  return data;
}

import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';

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

type UpdateEmailParams = {
  email: string;
};

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data;
}

export async function signIn({ email, password }: SignInParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
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
    redirectTo: `${process.env.NEXT_PUBLIC_URL}/settings?tabs=password`,
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

export async function updateEmail({ email }: UpdateEmailParams) {
  const { data, error } = await supabase.auth.updateUser(
    {
      email,
    },
    {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/settings?tabs=email`,
    }
  );
  if (error) throw error;
  return data;
}

export async function deleteUser() {
  const session = await getSession();
  const { data, error } = await supabase.functions.invoke('delete-user-account', {
    method: 'DELETE',
    body: {
      UUID: session?.user.id,
    },
  });
  if (error) throw error;
  return data;
}

import { signIn, signUp } from '@/lib/api/auth';
import { useMutation } from '@tanstack/react-query';

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
  });
}

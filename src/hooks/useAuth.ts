import { signIn, signUp, resetPassword, updatePassword } from '@/lib/api/auth';
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

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: updatePassword,
  });
}

import {
  signIn,
  signUp,
  resetPassword,
  updatePassword,
  getUser,
  updateEmail,
} from '@/lib/api/auth';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    staleTime: 1000 * 60 * 5,
  });
}

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

export function useUpdateEmail() {
  return useMutation({
    mutationFn: updateEmail,
  });
}

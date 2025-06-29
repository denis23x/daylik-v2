import {
  signIn,
  signUp,
  resetPassword,
  updatePassword,
  getUser,
  updateEmail,
  signOut,
  deleteUser,
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

export function useSignOut() {
  return useMutation({
    mutationFn: signOut,
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

export function useDeleteUser() {
  return useMutation({
    mutationFn: deleteUser,
  });
}

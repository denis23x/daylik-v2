'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, ShieldCheck } from 'lucide-react';
import { useUpdatePassword } from '@/hooks/useAuth';
import { StrongPasswordInput } from '../strong-password';

const formSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const AuthUpdatePassword = () => {
  const { mutateAsync: updatePassword } = useUpdatePassword();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      await updatePassword({ password: formData.password });

      // Show message
      toast.success('Password updated');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-xs flex-col items-center gap-4">
        <ShieldCheck />
        <p className="text-xl font-bold tracking-tight">Update your password</p>
        <Form {...form}>
          <form
            className="w-full space-y-4 rounded-xl border p-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <StrongPasswordInput name="password" placeholder="New password" label="New Password" />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
              {form.formState.isSubmitting ? 'Please wait' : 'Update Password'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthUpdatePassword;

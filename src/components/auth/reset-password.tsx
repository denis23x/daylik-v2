'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, KeySquare } from 'lucide-react';
import { useResetPassword } from '@/hooks/useAuth';

const formSchema = z.object({
  email: z.string().email(),
});

const AuthResetPassword = () => {
  const router = useRouter();
  const { mutateAsync: resetPassword } = useResetPassword();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      await resetPassword({ ...formData });

      // Redirect
      router.push('/auth/verify-email?updatePassword=1');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-xs flex-col items-center gap-4">
        <KeySquare />
        <p className="text-xl font-bold tracking-tight">Reset your password</p>
        <Form {...form}>
          <form
            className="w-full space-y-4 rounded-xl border p-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="w-full"
                      disabled={formState.isSubmitting}
                      autoComplete="email"
                      inputMode="email"
                      spellCheck="false"
                      autoCapitalize="none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
              {form.formState.isSubmitting ? 'Please wait' : 'Send reset link'}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm">
          Remember your password?{' '}
          <Link href="/auth/login" className="text-muted-foreground underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthResetPassword;

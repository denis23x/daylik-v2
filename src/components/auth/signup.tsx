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
import { HeartPlus, Loader2 } from 'lucide-react';
import { useSignUp } from '@/hooks/useAuth';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const AuthSignUp = () => {
  const router = useRouter();
  const { mutateAsync: signUp } = useSignUp();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      await signUp({ ...formData });

      // Redirect
      router.push('/verify-email');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-xs flex-col items-center gap-4">
        <HeartPlus />
        <p className="text-xl font-bold tracking-tight">Sign up for Daylik</p>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="w-full"
                      disabled={formState.isSubmitting}
                      autoComplete="new-password"
                      inputMode="text"
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
              {form.formState.isSubmitting ? 'Please wait' : 'Continue with Email'}
            </Button>
            <Button type="button" className="w-full" variant="secondary">
              Continue with Google
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-muted-foreground underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthSignUp;

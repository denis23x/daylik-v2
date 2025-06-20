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
import { Loader2, LogIn } from 'lucide-react';
import { useSignIn } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { MagicCard } from '../magicui/magic-card';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const AuthLogin = () => {
  const router = useRouter();
  const { mutateAsync: signIn } = useSignIn();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      await signIn({ ...formData });

      // Redirect
      router.push('/teams');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4">
      <LogIn />
      <p className="text-xl font-bold tracking-tight">Log in to Daylik</p>
      <Card className="w-full max-w-xs border-none p-0 shadow-none">
        <MagicCard className="p-4">
          <CardContent className="p-0">
            <Form {...form}>
              <form className="w-full space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, formState }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="What's your email?"
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
                          placeholder="Shhh... it's a secret"
                          className="w-full"
                          disabled={formState.isSubmitting}
                          autoComplete="current-password"
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
          </CardContent>
        </MagicCard>
      </Card>
      <Link
        href="/auth/reset-password"
        className="text-muted-foreground block text-center text-sm underline"
      >
        Forgot your password?
      </Link>
      <p className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="text-muted-foreground inline underline">
          Create account
        </Link>
      </p>
    </div>
  );
};

export default AuthLogin;

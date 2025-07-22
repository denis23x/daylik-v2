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
import { Card, CardContent } from '../ui/card';
import { MagicCard } from '../magicui/magic-card';

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
    <div className="flex min-h-lvh flex-col items-center justify-center gap-4 px-4">
      <HeartPlus />
      <p className="text-xl font-bold tracking-tight">Sign up for Daylik</p>
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
                          placeholder="Make it strong (min. 8 characters)"
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
                <Button type="button" className="w-full" variant="secondary" disabled={true}>
                  Continue with Google
                </Button>
              </form>
            </Form>
          </CardContent>
        </MagicCard>
      </Card>
      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-muted-foreground underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default AuthSignUp;

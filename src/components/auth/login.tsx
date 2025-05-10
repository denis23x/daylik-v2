'use client';

import { Logo } from '@/components/logo';
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
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const AuthLogin = () => {
  const supabase = createClient();

  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      const verifyCode = async () => {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: 'hash',
          type: 'email',
        });

        if (error) {
          redirect('/error');
        }

        redirect('/');
      };

      verifyCode();
    }
  }, [searchParams, supabase]);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: 'damage.23x@gmail.com',
      password: 'damage.23x@gmail.com',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      redirect('/error');
    }

    redirect('/teams');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-xs flex-col items-center">
        <Logo />
        <p className="mt-4 text-xl font-bold tracking-tight">Log in to Daylik</p>
        <Button className="mt-8 w-full gap-3">Continue with Google</Button>
        <div className="my-7 flex w-full items-center justify-center overflow-hidden">
          <Separator />
          <span className="px-2 text-sm">OR</span>
          <Separator />
        </div>
        <Form {...form}>
          <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4 w-full">
              Continue with Email
            </Button>
          </form>
        </Form>
        <div className="mt-5 space-y-5">
          {/* <Link href="#" className="text-muted-foreground block text-center text-sm underline">
            Forgot your password?
          </Link> */}
          <p className="text-center text-sm">
            Don&apos;t have an account?
            <Link href="/signup" className="text-muted-foreground ml-1 underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;

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
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const AuthSignUp = () => {
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast.error(error.message);
    }

    redirect('/auth/confirm');
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-xs flex-col items-center">
        <p className="mt-4 text-xl font-bold tracking-tight">Sign up for Daylik</p>
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
        <p className="mt-5 text-center text-sm">
          Already have an account?
          <Link href="/login" className="text-muted-foreground ml-1 underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthSignUp;

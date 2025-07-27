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
import { Link, useRouter } from '@/i18n/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, LogIn } from 'lucide-react';
import { useSignIn, useSignInWithGoogle } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { MagicCard } from '../magicui/magic-card';
import { useTranslations } from 'next-intl';

const AuthLogin = () => {
  const t = useTranslations('components.auth.login');
  const router = useRouter();
  const { mutateAsync: signIn } = useSignIn();
  const { mutateAsync: signInWithGoogle } = useSignInWithGoogle();

  const formSchema = z.object({
    email: z.string().min(1, t('form.email.required')).email(t('form.email.invalid')),
    password: z.string().min(8, t('form.password.minLength')),
  });

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

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="flex min-h-lvh flex-col items-center justify-center gap-4 px-4">
      <LogIn />
      <p className="text-xl font-bold tracking-tight">{t('title')}</p>
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
                      <FormLabel>{t('form.email.label')}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('form.email.placeholder')}
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
                      <FormLabel>{t('form.password.label')}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t('form.password.placeholder')}
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
                  {form.formState.isSubmitting ? t('buttons.loading') : t('buttons.submit')}
                </Button>
                <Button
                  type="button"
                  className="w-full"
                  variant="secondary"
                  onClick={handleGoogleSignIn}
                >
                  {t('buttons.google')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </MagicCard>
      </Card>
      <Link
        href="/reset-password"
        className="text-muted-foreground block text-center text-sm underline"
      >
        {t('links.forgotPassword')}
      </Link>
      <p className="text-center text-sm">
        {t('links.noAccount')}{' '}
        <Link href="/signup" className="text-muted-foreground inline underline">
          {t('links.createAccount')}
        </Link>
      </p>
    </div>
  );
};

export default AuthLogin;

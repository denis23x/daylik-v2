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
import { Loader2, Lock } from 'lucide-react';
import { useResetPassword } from '@/hooks/useAuth';
import { Card } from '../ui/card';
import { CardContent } from '../ui/card';
import { MagicCard } from '../magicui/magic-card';
import { useTranslations } from 'next-intl';

const AuthResetPassword = () => {
  const t = useTranslations('components.auth.resetPassword');
  const router = useRouter();
  const { mutateAsync: resetPassword } = useResetPassword();

  const formSchema = z.object({
    email: z.string().min(1, t('form.email.required')).email(t('form.email.invalid')),
  });

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
      router.push({
        pathname: '/verify-email',
        query: { updatePassword: '1' },
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="flex min-h-lvh flex-col items-center justify-center gap-4 px-4">
      <Lock />
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
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
                  {form.formState.isSubmitting ? t('buttons.loading') : t('buttons.submit')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </MagicCard>
      </Card>
      <p className="text-center text-sm">
        {t('links.rememberPassword')}{' '}
        <Link href="/login" className="text-muted-foreground underline">
          {t('links.login')}
        </Link>
      </p>
    </div>
  );
};

export default AuthResetPassword;

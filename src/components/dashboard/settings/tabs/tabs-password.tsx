'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useUpdatePassword } from '@/hooks/useAuth';
import { TabsPasswordInput } from './tabs-password-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

const TabsPassword = () => {
  const t = useTranslations('components.dashboard.settings.password');
  const { mutateAsync: updatePassword } = useUpdatePassword();

  const formSchema = z.object({
    password: z.string().min(8, t('form.validation')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      await updatePassword({ ...formData });

      // Reset form
      form.reset();

      // Show message
      toast.success(t('messages.updated'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('messages.error'));
    }
  };

  return (
    <Card className="p-4">
      <CardHeader className="p-0">
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription className="border-b pb-6">{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <TabsPasswordInput name="password" />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
              {form.formState.isSubmitting ? t('buttons.loading') : t('buttons.update')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TabsPassword;

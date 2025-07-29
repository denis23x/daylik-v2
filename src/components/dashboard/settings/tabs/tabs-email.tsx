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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Trash2 } from 'lucide-react';
import { useDeleteUser, useGetUser, useUpdateEmail } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect, useState } from 'react';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { deleteAllCookies } from '@/hooks/useCookie';
import { useTranslations } from 'next-intl';

const TabsEmail = () => {
  const t = useTranslations('components.dashboard.settings.email');
  const { data } = useGetUser();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: updateEmail } = useUpdateEmail();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const formSchema = z.object({
    newEmail: z.string().email(t('form.new.invalid')),
    oldEmail: z.string().email(t('form.current.invalid')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      newEmail: '',
      oldEmail: '',
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setValue('oldEmail', data?.user?.email || '');
  }, [form, data]);

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      await updateEmail({ email: formData.newEmail });

      // Reset form
      form.reset({
        newEmail: '',
        oldEmail: data?.user?.email || '',
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('messages.error'));
    }
  };

  const handleDeleteUser = async () => {
    const p = async (): Promise<void> => {
      await deleteUser();

      // Clear all cookies
      deleteAllCookies();

      // Redirect to home page with reload
      window.location.href = '/';
    };

    toast.promise(p(), {
      loading: t('messages.deleting'),
      error: (e: unknown) => (e instanceof Error ? e.message : t('messages.error')),
    });
  };

  return (
    <Card className="p-4">
      <CardHeader className="p-0">
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription className="border-b pb-6">{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {form.formState.isSubmitSuccessful && (
          <Alert className="mb-6" variant="destructive">
            <AlertDescription className="inline">{t('messages.confirmationSent')}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="newEmail"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{t('form.new.label')}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t('form.new.placeholder')}
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
              name="oldEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.current.label')}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="w-full"
                      disabled={true}
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
              {form.formState.isSubmitting ? t('buttons.loading') : t('buttons.sendLink')}
            </Button>
            <Button
              type="button"
              onClick={() => setIsConfirmOpen(true)}
              className="w-full"
              disabled={form.formState.isSubmitting}
              variant="destructive"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash2 className="hidden sm:block" />
              )}
              {form.formState.isSubmitting ? t('buttons.loading') : t('buttons.deleteAccount')}
            </Button>
          </form>
        </Form>
        <ConfirmDialog
          title={t('deleteConfirm.title')}
          description={t('deleteConfirm.description')}
          open={isConfirmOpen}
          onOpenChange={setIsConfirmOpen}
          onConfirmAction={handleDeleteUser}
        />
      </CardContent>
    </Card>
  );
};

export default TabsEmail;

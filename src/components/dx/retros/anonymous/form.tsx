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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Drama } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { MagicCard } from '../../../magicui/magic-card';
import { useTranslations } from 'next-intl';
import { Textarea } from '@/components/ui/textarea';
import { useCreateRetroMessage } from '@/hooks/useRetrosMessages';
import { getQueryParams } from '@/utils/getQueryParams';
import { useEffect, useState } from 'react';

const AnonymousForm = () => {
  const t = useTranslations('components.dx.retros.anonymous');
  const { mutateAsync } = useCreateRetroMessage();
  const [retroUUID, setRetroUUID] = useState('');

  const formSchema = z.object({
    name: z.string().nullable(),
    description: z.string().min(2, t('form.description.minLength')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setRetroUUID(getQueryParams('retroUUID') || '');
  }, []);

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (retroUUID) {
      try {
        await mutateAsync({
          retroUUID,
          ...formData,
        });

        // Reset form
        form.reset();

        // Success message
        toast.success(t('messages.success'));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t('messages.error'));
      }
    }
  };

  return (
    <div className="flex min-h-lvh flex-col items-center justify-center gap-4 px-4">
      <Drama />
      <p className="text-xl font-bold tracking-tight">{t('title')}</p>
      <Card className="w-full max-w-xs border-none p-0 shadow-none">
        <MagicCard className="p-4">
          <CardContent className="p-0">
            <Form {...form}>
              <form className="w-full space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, formState }) => (
                    <FormItem>
                      <FormLabel>{t('form.name.label')}</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={t('form.name.placeholder')}
                          className="w-full"
                          disabled={formState.isSubmitting}
                          inputMode="text"
                          spellCheck="false"
                          autoCapitalize="none"
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field, formState }) => (
                    <FormItem>
                      <FormLabel>
                        {t('form.description.label')}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={formState.isSubmitting}
                          placeholder={t('form.description.placeholder')}
                          className="min-h-28"
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
    </div>
  );
};

export default AnonymousForm;

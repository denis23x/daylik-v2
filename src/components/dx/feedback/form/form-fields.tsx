'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { createFeedbackSchema } from './form-schema';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Angry, Annoyed, Laugh } from 'lucide-react';
import { useTranslations } from 'next-intl';

const FeedbackFormFields = () => {
  const t = useTranslations('components.dashboard.modals.feedback.form');
  const form = useFormContext<z.infer<ReturnType<typeof createFeedbackSchema>>>();

  return (
    <>
      <FormField
        control={form.control}
        name="priority"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>{t('priority.label')}</FormLabel>
            <FormControl>
              <ToggleGroup
                variant="outline"
                type="single"
                value={field.value}
                onValueChange={field.onChange}
                disabled={formState.isSubmitting}
                className="w-full"
              >
                <ToggleGroupItem className="cursor-pointer" value="low">
                  <Laugh />
                  {t('priority.options.low')}
                </ToggleGroupItem>
                <ToggleGroupItem className="cursor-pointer" value="medium">
                  <Annoyed />
                  {t('priority.options.medium')}
                </ToggleGroupItem>
                <ToggleGroupItem className="cursor-pointer" value="high">
                  <Angry />
                  {t('priority.options.high')}
                </ToggleGroupItem>
              </ToggleGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="message"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>
              {t('message.label')}
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                disabled={formState.isSubmitting}
                placeholder={t('message.placeholder')}
                className="min-h-28"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export { FeedbackFormFields };

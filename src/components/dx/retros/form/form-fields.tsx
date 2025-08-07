'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { createRetroSchema } from './form-schema';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';

const RetroFormFields = () => {
  const form = useFormContext<z.infer<ReturnType<typeof createRetroSchema>>>();
  const t = useTranslations('components.dx.retros.form');

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>
              {t('name.label')}
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t('name.placeholder')}
                {...field}
                disabled={formState.isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export { RetroFormFields };

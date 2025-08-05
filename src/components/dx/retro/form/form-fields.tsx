'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { createRetroSchema } from './form-schema';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import FormSingleSelect from '../../form/form-single-select';
import { Separator } from '@/components/ui/separator';
import { ArrowDownUp } from 'lucide-react';

const previousRetros = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const;

const RetroFormFields = () => {
  const form = useFormContext<z.infer<ReturnType<typeof createRetroSchema>>>();
  const t = useTranslations('components.dx.retro.form');

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
      <div className="grid grid-cols-[1fr_16px_1fr] items-center gap-4">
        <Separator />
        <ArrowDownUp className="size-4" />
        <Separator />
      </div>
      <FormSingleSelect
        required={true}
        name="namePrevious"
        label={t('namePrevious.label')}
        placeholder={t('namePrevious.placeholder')}
        searchPlaceholder={t('namePrevious.searchPlaceholder')}
        emptyMessage={t('namePrevious.emptyMessage')}
        items={previousRetros.map((previousRetro) => ({
          key: previousRetro.value,
          value: previousRetro.value,
          label: previousRetro.label,
        }))}
      />
    </>
  );
};

export { RetroFormFields };

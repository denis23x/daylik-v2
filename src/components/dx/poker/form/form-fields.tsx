'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { createPokerSchema } from './form-schema';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import FormSingleSelect from '../../form/form-single-select';
import { v4 as uuidv4 } from 'uuid';

const PokerFormFields = () => {
  const form = useFormContext<z.infer<ReturnType<typeof createPokerSchema>>>();
  const t = useTranslations('components.dx.poker.modal.form');
  const cards = [
    {
      UUID: uuidv4(),
      name: t('cards.types.fibonacci'),
      value: [1, 2, 3, 5, 8, 13],
    },
    {
      UUID: uuidv4(),
      name: t('cards.types.fixed'),
      value: [1, 2, 4, 8, 16, 32],
    },
    {
      UUID: uuidv4(),
      name: t('cards.types.tshirts'),
      value: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
  ];

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
      <FormSingleSelect
        name="cards"
        label={t('cards.label')}
        placeholder={t('cards.placeholder')}
        required={true}
        search={false}
        items={cards.map((card) => ({
          key: card.UUID,
          value: card.value.toString(),
          label: card.name,
          description: card.value.join(', '),
        }))}
      />
    </>
  );
};

export { PokerFormFields };

import { useTranslations } from 'next-intl';
import { z } from 'zod';

const createRetroSchema = (t: ReturnType<typeof useTranslations>) => {
  return z.object({
    name: z.string().min(2, t('form.name.required')),
    namePrevious: z.string().min(2, t('form.namePrevious.required')),
  });
};

export { createRetroSchema };

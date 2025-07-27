import { useTranslations } from 'next-intl';
import { z } from 'zod';

const createTeamsFormSchema = (t: ReturnType<typeof useTranslations>) => {
  return z.object({
    name: z.string().min(2, t('form.name.validation')),
    teammates: z.array(z.string()),
    image: z.string().nullable(),
  });
};

export { createTeamsFormSchema };

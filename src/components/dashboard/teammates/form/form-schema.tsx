import { useTranslations } from 'next-intl';
import { z } from 'zod';

const createTeammatesFormSchema = (t: ReturnType<typeof useTranslations>) => {
  return z.object({
    name: z.string().min(2, t('form.name.validation')),
    role: z.string().min(2, t('form.role.validation')),
    teams: z.array(z.string()),
    avatar: z.string().nullable(),
    color: z.string().min(4, t('form.color.validation')),
  });
};

export { createTeammatesFormSchema };

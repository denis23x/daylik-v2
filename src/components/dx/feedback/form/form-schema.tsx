import { useTranslations } from 'next-intl';
import { z } from 'zod';

const createFeedbackSchema = (t: ReturnType<typeof useTranslations>) => {
  return z.object({
    message: z.string().min(2, t('form.message.required')),
    priority: z.enum(['low', 'medium', 'high']),
  });
};

export { createFeedbackSchema };

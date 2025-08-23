import { useTranslations } from 'next-intl';
import { z } from 'zod';

const createPokerSchema = (t: ReturnType<typeof useTranslations>) => {
  return z.object({
    name: z.string().min(2, t('form.name.required')),
    cards: z.string().min(1, t('form.cards.required')),
  });
};

export { createPokerSchema };

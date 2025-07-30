'use client';

import { Mail } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { CardContent } from '../ui/card';
import { Card } from '../ui/card';
import { MagicCard } from '../magicui/magic-card';
import { useTranslations } from 'next-intl';
import { useFeedbackStore } from '@/store/useFeedbackStore';

const AuthVerifyEmail = () => {
  const t = useTranslations('components.auth.verifyEmail');
  const searchParams = useSearchParams();
  const updatePassword = searchParams.get('updatePassword');
  const { openModal } = useFeedbackStore();

  return (
    <div className="flex min-h-lvh flex-col items-center justify-center gap-4 px-4">
      <Mail />
      <p className="text-xl font-bold tracking-tight">{t('title')}</p>
      <Card className="w-full max-w-xs border-none p-0 shadow-none">
        <MagicCard className="p-4">
          <CardContent className="w-full p-0">
            <p className="text-center text-base">
              {updatePassword ? t('messages.passwordReset') : t('messages.confirmation')}
            </p>
          </CardContent>
        </MagicCard>
      </Card>
      <p className="text-center text-sm">
        {t('links.noEmail')}{' '}
        <span
          className="text-muted-foreground cursor-pointer text-sm underline"
          onClick={openModal}
        >
          {t('links.contactUs')}
        </span>
      </p>
    </div>
  );
};

export default AuthVerifyEmail;

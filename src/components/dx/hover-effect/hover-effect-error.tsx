import { Bug } from 'lucide-react';
import { Button } from '../../ui/button';
import { useFeedbackStore } from '@/store/useFeedbackStore';
import { useTranslations } from 'next-intl';

const HoverEffectError = () => {
  const { openModal } = useFeedbackStore();
  const t = useTranslations('components.dx.hoverEffect.error');

  return (
    <div className="flex min-h-[75lvh] max-w-md flex-col items-center justify-center gap-4">
      <Bug />
      <div className="text-center text-xl font-semibold">{t('title')}</div>
      <Button variant="destructive" onClick={openModal}>
        {t('report')}
      </Button>
    </div>
  );
};

export default HoverEffectError;

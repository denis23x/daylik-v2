'use client';

import { Plus, UserRoundCheck } from 'lucide-react';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import DashboardHero from '../hero';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { useTranslations } from 'next-intl';

const TeammatesHero = () => {
  const t = useTranslations('components.dashboard.teammates.hero');
  const { openModal } = useTeammatesStore();

  const handleInsert = () => {
    openModal('insert');
  };

  return (
    <DashboardHero title={t('title')} description={t('description')} icon={<UserRoundCheck />}>
      <RainbowButton onClick={handleInsert}>
        <Plus /> {t('addButton')}
      </RainbowButton>
    </DashboardHero>
  );
};

export default TeammatesHero;

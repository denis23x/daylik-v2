'use client';

import { Grid2x2Check, Plus } from 'lucide-react';
import { useTeamsStore } from '@/store/useTeamsStore';
import DashboardHero from '../hero';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { useTranslations } from 'next-intl';

const TeamsHero = () => {
  const t = useTranslations('components.dashboard.teams.hero');
  const { openModal } = useTeamsStore();

  const handleInsert = () => {
    openModal('insert');
  };

  return (
    <DashboardHero title={t('title')} description={t('description')} icon={<Grid2x2Check />}>
      <RainbowButton onClick={handleInsert}>
        <Plus /> {t('createButton')}
      </RainbowButton>
    </DashboardHero>
  );
};

export default TeamsHero;

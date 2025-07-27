'use client';

import { Clock } from 'lucide-react';
import DashboardHero from '../../hero';
import { useTranslations } from 'next-intl';

const SyncLiveHero = () => {
  const t = useTranslations('components.dashboard.sync.live.hero');

  return (
    <DashboardHero
      title={t('title')}
      description={t('description')}
      icon={<Clock />}
    ></DashboardHero>
  );
};

export default SyncLiveHero;

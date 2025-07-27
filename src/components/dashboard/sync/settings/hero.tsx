'use client';

import { CalendarCheck2 } from 'lucide-react';
import DashboardHero from '../../hero';
import { useTranslations } from 'next-intl';

const SyncSettingsHero = () => {
  const t = useTranslations('components.dashboard.sync.settings.hero');

  return (
    <DashboardHero
      title={t('title')}
      description={t('description')}
      icon={<CalendarCheck2 />}
    ></DashboardHero>
  );
};

export default SyncSettingsHero;

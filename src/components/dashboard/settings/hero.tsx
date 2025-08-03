'use client';

import { Settings } from 'lucide-react';
import DashboardHero from '../hero';
import { useTranslations } from 'next-intl';

const SettingsHero = () => {
  const t = useTranslations('components.dashboard.settings.hero');

  return (
    <DashboardHero
      title={t('title')}
      description={t('description')}
      icon={<Settings />}
    ></DashboardHero>
  );
};

export default SettingsHero;

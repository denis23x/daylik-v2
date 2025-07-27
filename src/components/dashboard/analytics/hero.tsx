'use client';

import { ChartLine } from 'lucide-react';
import DashboardHero from '../hero';
import { useTranslations } from 'next-intl';

const AnalyticsHero = () => {
  const t = useTranslations('components.dashboard.analytics.hero');

  return (
    <DashboardHero
      title={t('title')}
      description={t('description')}
      icon={<ChartLine />}
    ></DashboardHero>
  );
};

export default AnalyticsHero;

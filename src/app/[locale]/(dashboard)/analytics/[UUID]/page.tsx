import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageProps } from '@/types/utils/pageProps.type';
import AnalyticsHero from '@/components/dashboard/analytics/hero';
import AnalyticsGrid from '@/components/dashboard/analytics/grid-suspense';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'app.dashboard.analytics' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AnalyticsPage() {
  return (
    <>
      <AnalyticsHero />
      <AnalyticsGrid />
    </>
  );
}

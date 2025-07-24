import { Metadata } from 'next';
import AnalyticsHero from '@/components/dashboard/analytics/hero';
import AnalyticsGrid from '@/components/dashboard/analytics/grid-suspense';

const pagedata = {
  title: 'Analytics',
  description:
    'View detailed team performance analytics. Analyze metrics, reports and statistics to make informed decisions.',
  keywords: 'analytics, statistics, reports, performance, metrics',
};

export const metadata: Metadata = {
  title: pagedata.title,
  description: pagedata.description,
  keywords: pagedata.keywords,
  openGraph: {
    title: pagedata.title,
    description: pagedata.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: pagedata.title,
    description: pagedata.description,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function AnalyticsPage() {
  return (
    <>
      <AnalyticsHero />
      <AnalyticsGrid />
    </>
  );
}

import AnalyticsHero from '@/components/dashboard/analytics/hero';
import AnalyticsGrid from '@/components/dashboard/analytics/grid-suspense';

export default async function AnalyticsPage() {
  return (
    <>
      <AnalyticsHero />
      <AnalyticsGrid />
    </>
  );
}

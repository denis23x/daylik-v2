import AnalyticsGrid from '@/components/dashboard/analytics/grid';
import AnalyticsHero from '@/components/dashboard/analytics/hero';

export default async function AnalyticsPage() {
  return (
    <>
      <AnalyticsHero />
      <AnalyticsGrid />
    </>
  );
}

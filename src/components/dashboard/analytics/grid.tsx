'use client';

import { ChartLine } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTeammatesFromAnalytic } from '@/hooks/useAnalyticsTeammates';
import AnalyticsDataTable from './data-table';

const AnalyticsGrid = () => {
  const params = useParams();
  const { data: team } = useAnalytics({ query: '*', UUID: params.UUID as string });
  const { data: teammates } = useTeammatesFromAnalytic({
    query: '*, teammates (UUID, name, role, color, avatar)',
    UUID: params.UUID as string,
  });

  useEffect(() => {
    console.log('team', team);
    console.log('analytics teammates', teammates);
  }, [team, teammates]);

  return (
    <div className="min-h-screen-daylik container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <ChartLine />
          <span className="text-xl font-bold">Analytics</span>
        </div>
        {team && teammates && <AnalyticsDataTable teammates={teammates}></AnalyticsDataTable>}
      </div>
    </div>
  );
};

export default AnalyticsGrid;

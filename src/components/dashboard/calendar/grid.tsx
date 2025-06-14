'use client';

import { ChartLine } from 'lucide-react';
import { useAnalytics2 } from '@/hooks/useAnalytics';
import CalTest from './cal';

const CalendarGrid = () => {
  const { data } = useAnalytics2({ query: '*' });

  return (
    <div className="min-h-screen-grid container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <ChartLine />
          <span className="text-xl font-bold">Analytics</span>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <CalTest data={data || []} />
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;

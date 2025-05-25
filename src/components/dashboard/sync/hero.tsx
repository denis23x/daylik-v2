'use client';

import { CalendarCheck2 } from 'lucide-react';
import DashboardHero from '../hero';

const SyncHero = () => {
  return (
    <DashboardHero
      title="Sync"
      description="Run your daily stand-ups here to keep your team in sync. Use this space to share updates, discuss blockers, and align on priorities. Maintain momentum and ensure everyone stays on the same page."
      icon={<CalendarCheck2 />}
    ></DashboardHero>
  );
};

export default SyncHero;

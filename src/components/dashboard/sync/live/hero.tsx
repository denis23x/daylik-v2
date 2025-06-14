'use client';

import { Clock } from 'lucide-react';
import DashboardHero from '../../hero';

const SyncLiveHero = () => {
  return (
    <DashboardHero
      title="Sync"
      description="Run your daily sync in real time. Choose who speaks next, manage the timing and flow, pause when needed, and guide your team through a focused, engaging stand-up from start to finish."
      icon={<Clock />}
    ></DashboardHero>
  );
};

export default SyncLiveHero;

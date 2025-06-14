'use client';

import { CalendarCheck2 } from 'lucide-react';
import DashboardHero from '../../hero';

const SyncSettingsHero = () => {
  return (
    <DashboardHero
      title="Setup"
      description="Configure your sync before it starts. Select who’s in, set the timer, remove unavailable teammates, and fine-tune the flow to make sure your sync runs smoothly from the very first second."
      icon={<CalendarCheck2 />}
    ></DashboardHero>
  );
};

export default SyncSettingsHero;

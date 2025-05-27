'use client';

import { CalendarCheck2, CalendarCog } from 'lucide-react';
import DashboardHero from '../hero';
import { Button } from '@/components/ui/button';
import { useSyncStore } from '@/store/useSyncStore';

const SyncHero = () => {
  const { openModal } = useSyncStore();

  const handleSettings = () => {
    openModal();
  };

  return (
    <DashboardHero
      title="Sync"
      description="Run your daily stand-ups here to keep your team in sync. Use this space to share updates, discuss blockers, and align on priorities. Maintain momentum and ensure everyone stays on the same page."
      icon={<CalendarCheck2 />}
    >
      <Button onClick={handleSettings}>
        <CalendarCog /> Sync Settings
      </Button>
    </DashboardHero>
  );
};

export default SyncHero;

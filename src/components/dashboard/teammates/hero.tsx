'use client';

import { Button } from '@/components/ui/button';
import { Plus, UserRoundCheck } from 'lucide-react';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import DashboardHero from '../hero';

const TeammatesHero = () => {
  const { openModal } = useTeammatesStore();

  const handleInsert = () => {
    openModal('insert');
  };

  return (
    <DashboardHero
      title="Teammates"
      description="Add, update, or remove teammates and assign them to the right teams. Strengthen collaboration by keeping your workspace organized and your people connected to what matters."
      icon={<UserRoundCheck />}
    >
      <Button onClick={handleInsert}>
        <Plus /> Add Teammate
      </Button>
    </DashboardHero>
  );
};

export default TeammatesHero;

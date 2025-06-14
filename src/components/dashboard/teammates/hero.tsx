'use client';

import { Plus, UserRoundCheck } from 'lucide-react';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import DashboardHero from '../hero';
import { RainbowButton } from '@/components/magicui/rainbow-button';

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
      <RainbowButton onClick={handleInsert}>
        <Plus /> Add Teammate
      </RainbowButton>
    </DashboardHero>
  );
};

export default TeammatesHero;

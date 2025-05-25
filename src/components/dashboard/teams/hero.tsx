'use client';

import { Button } from '@/components/ui/button';
import { Grid2x2Check, Plus } from 'lucide-react';
import { useTeamsStore } from '@/store/useTeamsStore';
import DashboardHero from '../hero';

const TeamsHero = () => {
  const { openModal } = useTeamsStore();

  const handleInsert = () => {
    openModal('insert');
  };

  return (
    <DashboardHero
      title="Teams"
      description="Create, edit, and manage teams to align your projects with strategic goals. Assign teammates, clarify roles, and maintain a structured workspace that improves focus and coordination."
      icon={<Grid2x2Check />}
    >
      <Button onClick={handleInsert}>
        <Plus /> Create Team
      </Button>
    </DashboardHero>
  );
};

export default TeamsHero;

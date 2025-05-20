'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, UsersRound } from 'lucide-react';
import { useTeamsStore } from '@/store/useTeamsStore';

const TeamsHero = () => {
  const { openModal } = useTeamsStore();

  const handleCreate = () => {
    openModal('insert');
  };

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <div className="max-w-2xl p-4 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl md:leading-[1.2]">Teams</h1>
        <p className="mt-6 text-base md:text-lg">
          Create, edit, or remove teams to organize your projects around specific goals or
          departments. Assign teammates to relevant teams, manage responsibilities, and maintain a
          structured workspace to improve coordination across your organization.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button className="cursor-pointer" onClick={handleCreate}>
            <Plus /> Create Team
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="/teammates">
              <UsersRound />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamsHero;

'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LayoutGrid, Plus } from 'lucide-react';
import { useTeammatesStore } from '@/store/useTeammatesStore';

const TeammatesHero = () => {
  const { openModal } = useTeammatesStore();

  const handleCreate = () => {
    openModal('insert');
  };

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <div className="max-w-2xl p-4 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl md:leading-[1.2]">Teammates</h1>
        <p className="mt-6 text-base md:text-lg">
          Add, update, or remove teammates and assign them to teams to streamline collaboration.
          Keep your projects and resources organized by grouping related work together and
          maintaining a structured, efficient environment for your entire team.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button className="cursor-pointer" onClick={handleCreate}>
            <Plus /> Create Teammate
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="/teams">
              <LayoutGrid />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeammatesHero;

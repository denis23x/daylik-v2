'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, Grid2x2Check, Info, Plus, X } from 'lucide-react';
import { useTeamsStore } from '@/store/useTeamsStore';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState } from 'react';

const TeamsHero = () => {
  const { openModal } = useTeamsStore();
  const [isOpen, setIsOpen] = useState('');

  const handleCreate = () => {
    openModal('insert');
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="relative container mx-auto"
      onValueChange={setIsOpen}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger asChild>
          <Button className="absolute top-4 right-4 z-10" variant="ghost" size="icon">
            {isOpen ? <X /> : <Info />}
          </Button>
        </AccordionTrigger>
        <AccordionContent className="mx-auto flex min-h-[calc(100dvh-var(--navbar-height))] max-w-2xl flex-col items-center justify-center gap-6 p-4 text-center">
          <Grid2x2Check />
          <span className="text-2xl font-bold sm:text-3xl md:text-4xl">Teams</span>
          <p className="text-base md:text-lg">
            Create, edit, or remove teams to organize your projects around specific goals or
            departments. Assign teammates to relevant teams, manage responsibilities, and maintain a
            structured workspace to improve coordination across your organization.
          </p>
          <Button onClick={handleCreate}>
            <Plus /> Create Team
          </Button>
          <ArrowDown className="mt-4 animate-bounce" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TeamsHero;

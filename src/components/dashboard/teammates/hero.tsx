'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, Info, Plus, UsersRound, X } from 'lucide-react';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { useState } from 'react';

const TeammatesHero = () => {
  const { openModal } = useTeammatesStore();
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
          <Button className="absolute top-4 right-4 z-10" variant="secondary" size="icon">
            {isOpen ? <X /> : <Info />}
          </Button>
        </AccordionTrigger>
        <AccordionContent className="mx-auto flex min-h-[calc(100dvh-var(--navbar-height))] max-w-2xl flex-col items-center justify-center gap-6 p-4 text-center">
          <UsersRound />
          <span className="text-2xl font-bold sm:text-3xl md:text-4xl">Teammates</span>
          <p className="text-base md:text-lg">
            Add, update, or remove teammates and assign them to teams to streamline collaboration.
            Keep your projects and resources organized by grouping related work together and
            maintaining a structured, efficient environment for your entire team.
          </p>
          <Button onClick={handleCreate}>
            <Plus /> Create Teammate
          </Button>
          <ArrowDown className="mt-4 animate-bounce" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TeammatesHero;

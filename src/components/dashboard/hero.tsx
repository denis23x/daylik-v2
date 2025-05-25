'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, Info, X } from 'lucide-react';
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { useState } from 'react';

const DashboardHero = ({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState('');

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
        <AccordionContent className="min-h-screen-daylik mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 p-4 text-center">
          {icon}
          <span className="text-2xl font-bold sm:text-3xl md:text-4xl">{title}</span>
          <p className="text-base md:text-lg">{description}</p>
          {children}
          <ArrowDown className="mt-4 animate-bounce" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DashboardHero;

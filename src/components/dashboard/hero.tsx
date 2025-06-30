'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, Text, X } from 'lucide-react';
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { useEffect, useState } from 'react';
import { getCookie, setCookie } from '@/hooks/useCookie';

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
  const [name] = useState('hero');
  const [value, setValue] = useState('');

  useEffect(() => {
    const cookie = getCookie(`hero-${window.location.pathname}`);

    if (cookie === undefined || Number(cookie)) {
      setValue(name);
    }
  }, []);

  const handleScroll = () => {
    const element = document.querySelector('.min-h-screen-grid');

    if (element) {
      const computedStyle = getComputedStyle(document.documentElement);
      const offset = parseInt(computedStyle.getPropertyValue('--navbar-height'));
      const elementPosition = element.getBoundingClientRect().top;
      const offsetTarget = elementPosition + window.scrollY - offset;

      const start = window.scrollY;
      const distance = offsetTarget - start;
      const duration = 400;

      let startTime: number | null = null;

      // Fast and smooth scroll
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const timeElapsed = timestamp - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

        window.scrollTo(0, start + distance * easeInOutQuad(progress));

        if (timeElapsed < duration) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }
  };

  const handleValueChange = (value: string) => {
    setValue(value);

    // Save the value to cookie
    setCookie(`hero-${window.location.pathname}`, String(value ? 1 : 0));
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="relative container mx-auto"
      value={value}
      onValueChange={handleValueChange}
    >
      <AccordionItem value={name}>
        <AccordionTrigger asChild>
          <Button className="absolute top-4 right-4 z-10" variant="ghost" size="icon">
            {value ? <X /> : <Text />}
          </Button>
        </AccordionTrigger>
        <AccordionContent className="min-h-screen-hero mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 p-4 text-center">
          {icon}
          <span className="text-2xl font-bold sm:text-3xl md:text-4xl">{title}</span>
          <p className="text-base md:text-lg">{description}</p>
          {children}
          <ArrowDown className="mt-4 animate-bounce cursor-pointer" onClick={handleScroll} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DashboardHero;

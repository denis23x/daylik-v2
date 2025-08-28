'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CarouselApi } from '@/components/ui/carousel';
import { useCreatePokerIssue } from '@/hooks/usePokerIssues';
import { usePokerStore } from '@/store/usePokerStore';
import { toast } from 'sonner';

const PokerCarouselPagination = ({ api }: { api: CarouselApi }) => {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { mutateAsync } = useCreatePokerIssue();
  const { poker } = usePokerStore();

  useEffect(() => {
    if (!api) return;

    // Recreate the carousel after changes
    api.reInit();

    const update = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    // Update the count and current index
    update();

    api.on('select', update);

    return () => {
      api.off('select', update);
    };
  }, [api]);

  const handleAddIssue = async () => {
    if (poker) {
      try {
        await mutateAsync({ pokerUUID: poker.UUID, text: '', status: 'idle' });

        // Success message
        toast.success('Issue created');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Error creating issue');
      }
    }
  };

  return (
    api && (
      <div className="flex items-center justify-center gap-2 px-1">
        {Array.from({ length: count }).map((_, i) => {
          const page = i + 1;
          const isFirst = page === 1;
          const isLast = page === count;
          const isNear = Math.abs(page - current) <= 1;

          if (isFirst || isLast || isNear) {
            return (
              <Button
                key={page}
                variant={current === page ? 'default' : 'secondary'}
                size="icon"
                className="rounded-full transition-none"
                onClick={() => api.scrollTo(i)}
              >
                {page}
              </Button>
            );
          }

          const isBreak =
            (page === current - 2 && current > 3) || (page === current + 2 && current < count - 2);

          if (isBreak) {
            return (
              <span key={page} className="text-muted-foreground px-2 text-sm">
                ...
              </span>
            );
          }

          return null;
        })}
        <Button
          className="rounded-full transition-none"
          variant="outline"
          size="icon"
          onClick={handleAddIssue}
        >
          <Plus />
        </Button>
      </div>
    )
  );
};

export default PokerCarouselPagination;

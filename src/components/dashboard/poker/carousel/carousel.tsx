'use client';

import { useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../../../ui/carousel';
import { BrushCleaning, Play, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePokerStore } from '@/store/usePokerStore';
import { ConfirmDialog } from '@/components/confirm-dialog';
import PokerCarouselTextarea from './carousel-textarea';
import PokerCarouselPagination from './carousel-pagination';
import { useDeletePokerIssue } from '@/hooks/usePokerIssues';
import { toast } from 'sonner';

const PokerCarousel = () => {
  const { issues } = usePokerStore();
  const { mutateAsync: deleteIssue } = useDeletePokerIssue();
  const [api, setApi] = useState<CarouselApi>();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleStartVoting = () => {
    alert('handleStartVoting');
  };

  const handleReset = () => {
    alert('handleReset');
  };

  const handleClearVotes = () => {
    alert('handleClearVotes');
  };

  const handleDeleteIssue = async () => {
    try {
      const issue = issues[(api?.selectedScrollSnap() ?? 0) + 1];
      await deleteIssue(issue.UUID);

      // Success message
      toast.success('Issue deleted');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error deleting issue');
    }
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <div className="flex items-center justify-center gap-2 px-1">
        <Button variant="default" onClick={handleStartVoting}>
          <Play />
          Start Voting
        </Button>
        <Button variant="outline" size="icon" onClick={handleReset}>
          <RefreshCw />
        </Button>
        <Button variant="outline" size="icon" onClick={handleClearVotes}>
          <BrushCleaning />
        </Button>
      </div>
      {issues && (
        <Carousel setApi={setApi}>
          <CarouselContent>
            {issues.map((issue) => (
              <CarouselItem key={issue.UUID}>
                <div className="relative p-1">
                  <Button
                    className="absolute top-4 right-4 z-10 rounded-full"
                    variant="destructive"
                    size="icon"
                    onClick={() => setIsConfirmOpen(true)}
                    hidden={issues.length === 1}
                  >
                    <X />
                  </Button>
                  <PokerCarouselTextarea text={issue.text} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
      <PokerCarouselPagination api={api} />
      <ConfirmDialog
        title="Delete Issue"
        description="Are you sure you want to delete this issue?"
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirmAction={handleDeleteIssue}
      />
    </div>
  );
};

export default PokerCarousel;

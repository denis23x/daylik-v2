'use client';

import { useEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../../ui/carousel';
import { textareaVariants } from '@/components/ui/textarea';
import { Play, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePokerIssues } from '@/hooks/usePokerIssues';
import { usePokerStore } from '@/store/usePokerStore';

const PokerCarousel = () => {
  const { poker } = usePokerStore();
  const { data: issues } = usePokerIssues({ query: '*', pokerUUID: poker?.UUID || '' });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
  }, [api, issues]);

  const handleAddIssue = () => {
    // setQuestions((p) => [...p, { UUID: crypto.randomUUID(), question: 'x' }]);
  };

  // const handleDeleteQuestion = (UUID: string) => {
  //   // setQuestions((p) => p.filter((question) => question.UUID !== UUID));
  // };

  const handleContentPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    const newContent = e.target.innerHTML;
    console.log(newContent);
  };

  return (
    <div className="flex w-full max-w-screen flex-col gap-4">
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2 sm:w-1/3">
          {/* <Button
            variant="destructive"
            size="icon"
            onClick={() => handleDeleteQuestion(questions[current - 1].UUID)}
            disabled={issues.length === 1}
          >
            <Trash2 />
          </Button> */}
          <Button variant="outline" size="icon" onClick={handleAddIssue}>
            <Plus />
          </Button>
        </div>
        <div className="text-muted-foreground hidden w-1/3 text-center text-sm sm:block">
          {current} / {count}
        </div>
        <div className="flex items-center gap-2 sm:w-1/3">
          <Button variant="default">
            <RefreshCw />
            Flip Cards
          </Button>
          <Button variant="outline">
            <Play />
            Start Voting
          </Button>
          <Button variant="outline">Clear Votes</Button>
        </div>
      </div>
      {issues && issues.length > 0 ? (
        <Carousel setApi={setApi}>
          <CarouselContent>
            {issues &&
              issues.map((issue) => (
                <CarouselItem key={issue.UUID}>
                  <div className="p-1">
                    <div
                      contentEditable
                      className={cn(
                        textareaVariants({ variant: 'default' }),
                        'flex min-h-48 flex-col items-center justify-center text-center !text-3xl'
                      )}
                      dangerouslySetInnerHTML={{ __html: issue.text }}
                      onInput={handleContentChange}
                      onPaste={handleContentPaste}
                    ></div>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className="flex items-center justify-center">
          <div
            contentEditable
            className={cn(
              textareaVariants({ variant: 'default' }),
              'flex min-h-48 flex-col items-center justify-center text-center !text-3xl'
            )}
            dangerouslySetInnerHTML={{ __html: 'Add an issue' }}
            onInput={handleContentChange}
            onPaste={handleContentPaste}
          ></div>
        </div>
      )}
      {api && (
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
              (page === current - 2 && current > 3) ||
              (page === current + 2 && current < count - 2);

            if (isBreak) {
              return (
                <span key={page} className="text-muted-foreground px-2 text-sm">
                  ...
                </span>
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default PokerCarousel;

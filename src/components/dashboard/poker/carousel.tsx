'use client';

import { useEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../../ui/carousel';
import { textareaVariants } from '@/components/ui/textarea';
import { Play, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PokerCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [questions, setQuestions] = useState([
    {
      UUID: '1',
      question: 'Question 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      UUID: '2',
      question: 'Question 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      UUID: '3',
      question: 'Question 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ]);

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
  }, [api, questions]);

  const handleAddQuestion = () => {
    setQuestions((p) => [...p, { UUID: crypto.randomUUID(), question: 'x' }]);
  };

  const handleDeleteQuestion = (UUID: string) => {
    setQuestions((p) => p.filter((question) => question.UUID !== UUID));
  };

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
          <Button
            variant="destructive"
            size="icon"
            onClick={() => handleDeleteQuestion(questions[current - 1].UUID)}
            disabled={questions.length === 1}
          >
            <Trash2 />
          </Button>
          <Button variant="outline" size="icon" onClick={handleAddQuestion}>
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
      <Carousel setApi={setApi}>
        <CarouselContent>
          {questions.map((question) => (
            <CarouselItem key={question.UUID}>
              <div className="p-1">
                <div
                  contentEditable
                  className={cn(
                    textareaVariants({ variant: 'default' }),
                    'flex min-h-48 flex-col items-center justify-center text-center !text-3xl'
                  )}
                  dangerouslySetInnerHTML={{ __html: question.question }}
                  onInput={handleContentChange}
                  onPaste={handleContentPaste}
                ></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
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

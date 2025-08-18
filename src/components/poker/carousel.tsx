'use client';

import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const PokerCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    return () => {
      api.destroy();
    };
  }, [api]);

  return (
    <div className="flex flex-col gap-4">
      <Carousel setApi={setApi}>
        <CarouselContent>
          <CarouselItem>
            <div className="rounded-lg border p-4">Question 1</div>
          </CarouselItem>
          <CarouselItem>
            <div className="rounded-lg border p-4">Question 2</div>
          </CarouselItem>
          <CarouselItem>
            <div className="rounded-lg border p-4">Question 3</div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm">
        Slide {current} of {count}
      </div>
    </div>
  );
};

export default PokerCarousel;

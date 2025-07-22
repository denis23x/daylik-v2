import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CirclePlay, Sparkles } from 'lucide-react';
import Link from 'next/link';
import HeroVideoDialog from '../magicui/hero-video-dialog';
import { Badge } from '../ui/badge';

const HomeHero = () => {
  return (
    <div
      id="home"
      className="min-h-screen-hero relative container mx-auto flex items-center justify-center px-4"
    >
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
          'inset-x-0 h-full skew-y-12'
        )}
      />
      <div className="relative z-10 max-w-2xl text-center">
        <Badge variant="destructive" className="ml-auto">
          Open Beta
        </Badge>
        <h1 className="mt-6 text-3xl !leading-[1.2] font-bold tracking-tight sm:text-4xl md:text-5xl">
          Daily Check-ins, Zero Hassle
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Daylik helps teams run structured daily standups, stay aligned, and gain instant insights
          — all in one place.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button className="rounded-full" asChild>
            <Link href="/signup">
              Get Started <Sparkles />
            </Link>
          </Button>
          <HeroVideoDialog
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ?si=H7TCoQe5aNcuOh2Y"
          >
            <Button variant="outline" className="rounded-full shadow-none">
              <CirclePlay /> Watch Demo
            </Button>
          </HeroVideoDialog>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;

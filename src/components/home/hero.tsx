import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { Button } from '@/components/ui/button';
import { CirclePlay, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import HeroVideoDialog from '../magicui/hero-video-dialog';
import { Badge } from '../ui/badge';
import { useTranslations } from 'next-intl';

const HomeHero = () => {
  const t = useTranslations('components.home.hero');

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
        className="inset-x-0 h-full skew-y-12 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />
      <div className="relative z-10 max-w-2xl text-center">
        <Badge className="dark:opacity-100" variant="destructive">
          {t('badge')}
        </Badge>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl md:text-5xl">{t('title')}</h1>
        <p className="mt-6 text-[17px] md:text-lg">{t('description')}</p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button className="rounded-full px-3" as="span">
            <Link
              className="flex items-center gap-1.5"
              href="/signup"
              aria-label={t('getStartedAriaLabel')}
            >
              {t('getStarted')} <Sparkles />
            </Link>
          </Button>
          <HeroVideoDialog
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ?si=H7TCoQe5aNcuOh2Y"
          >
            <Button
              variant="outline"
              className="rounded-full shadow-none"
              aria-label={t('watchDemoAriaLabel')}
            >
              <CirclePlay /> {t('watchDemo')}
            </Button>
          </HeroVideoDialog>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;

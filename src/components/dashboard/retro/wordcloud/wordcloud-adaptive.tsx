'use client';

import { lazy, Suspense, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useDateFnsLocale } from '@/hooks/ui/useDateFnsLocale';
import { useMediaQuery } from '@/hooks/ui/useMediaQuery';

// Mobile optimization
const Wordcloud = lazy(() => import('@/components/dashboard/retro/wordcloud/wordcloud'));

const RetroWordcloud = () => {
  const sm = useMediaQuery('(min-width: 640px)');
  const [now, setNow] = useState(new Date());
  const locale = useDateFnsLocale();

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const MobileWords = (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 text-center">
      <span className="font-mono text-4xl font-semibold">{format(now, 'HH:mm:ss')}</span>
      <span className="text-muted-foreground text-sm first-letter:capitalize">
        {format(now, 'EEEE, do MMMM', { locale })}
      </span>
    </div>
  );

  const DesktopWords = <Wordcloud />;

  return <Suspense>{sm ? DesktopWords : MobileWords}</Suspense>;
};

export default RetroWordcloud;

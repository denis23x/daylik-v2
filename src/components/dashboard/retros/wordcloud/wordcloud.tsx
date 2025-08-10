'use client';

import { lazy, Suspense } from 'react';
import { useMediaQuery } from '@/hooks/ui/useMediaQuery';

// Mobile optimization
const WordcloudDesktop = lazy(
  () => import('@/components/dashboard/retros/wordcloud/wordcloud-desktop')
);
const WordcloudMobile = lazy(
  () => import('@/components/dashboard/retros/wordcloud/wordcloud-mobile')
);

const RetrosWordcloud = () => {
  const sm = useMediaQuery('(min-width: 640px)');

  const MobileWords = <WordcloudMobile />;
  const DesktopWords = <WordcloudDesktop />;

  return <Suspense>{sm ? DesktopWords : MobileWords}</Suspense>;
};

export default RetrosWordcloud;

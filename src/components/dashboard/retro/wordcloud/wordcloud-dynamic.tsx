'use client';

import dynamic from 'next/dynamic';

const Wordcloud = dynamic(() => import('./wordcloud-adaptive').then((mod) => mod.default), {
  ssr: false,
});

export default Wordcloud;

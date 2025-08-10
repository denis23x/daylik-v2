'use client';

import { ScratchToRevealBackground } from '@/components/magicui/scratch-to-reveal-background';
import { useWindowSize } from 'usehooks-ts';

const RetrosWordcloudMobile = () => {
  const { width = 0, height = 0 } = useWindowSize();

  return <ScratchToRevealBackground width={width} height={height} className="overflow-hidden" />;
};

export default RetrosWordcloudMobile;

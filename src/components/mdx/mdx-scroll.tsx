'use client';

import { useState } from 'react';
import { useMotionValueEvent, useScroll, useTransform } from 'motion/react';

export default function MdxScroll() {
  const { scrollYProgress } = useScroll();
  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [percentage, setPercentage] = useState(0);

  useMotionValueEvent(scrollPercentage, 'change', (latest: number) => {
    setPercentage(latest);
  });

  return (
    <div className="pointer-events-none fixed start-0 end-0 top-0 z-30 h-1">
      <span
        className="bg-foreground block h-full w-full"
        style={{
          width: `${percentage}%`,
        }}
      ></span>
    </div>
  );
}

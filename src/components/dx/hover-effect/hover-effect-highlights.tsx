'use client';

import React, { useState, useRef } from 'react';
import { motion, spring } from 'motion/react';
import { cn } from '@/lib/utils';

const HoverEffectHighlights = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const [highlightStyle, setHighlightStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const [hasInitialized, setHasInitialized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLUListElement>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    const container = containerRef.current;
    if (!container) return;

    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const newStyle = {
      top: targetRect.top - containerRect.top - 8,
      left: targetRect.left - containerRect.left - 8,
      width: targetRect.width + 16,
      height: targetRect.height + 16,
    };

    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }

    setHighlightStyle(newStyle);
    setIsVisible(true);
    setHasInitialized(true);
  };

  const handleMouseLeaveItem = () => {
    setIsVisible(false);
  };

  const handleMouseLeaveGrid = () => {
    setIsVisible(false);

    hideTimeout.current = setTimeout(() => {
      setHasInitialized(false);
    }, 300); // same as transition.opacity.duration
  };

  return (
    <ul
      ref={containerRef}
      onMouseLeave={handleMouseLeaveGrid}
      className={cn('hover-effect-grid-highlights', className)}
    >
      {hasInitialized && (
        <motion.div
          className="bg-muted absolute z-0 rounded-2xl"
          initial={{
            top: highlightStyle.top,
            left: highlightStyle.left,
            width: highlightStyle.width,
            height: highlightStyle.height,
            opacity: 0,
          }}
          animate={{
            top: highlightStyle.top,
            left: highlightStyle.left,
            width: highlightStyle.width,
            height: highlightStyle.height,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            opacity: { duration: 0.3 }, // <= эта длительность должна совпадать с таймером
          }}
        />
      )}

      {React.Children.map(children, (child, i) => {
        if (!child || typeof child !== 'object' || !('type' in child)) return null;

        const count = React.Children.count(children);
        const first = i === 0;
        const last = i === count - 1;

        const scale80 = first || last ? 'scale-80 hidden sm:block' : '';
        const scale90 = i === 1 || i === count - 2 ? 'scale-90 origin-bottom' : '';
        const right = first ? 'origin-bottom-right' : '';
        const left = last ? 'origin-bottom-left' : '';

        return (
          <motion.li
            layout
            transition={spring}
            className={`relative w-1/3 sm:w-1/5 ${scale80} ${scale90} ${right} ${left}`}
            key={child.key}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeaveItem}
          >
            {child}
          </motion.li>
        );
      })}
    </ul>
  );
};

export default HoverEffectHighlights;

'use client';

import React, { useState, useRef } from 'react';
import { motion, spring } from 'motion/react';

const GridWithHoverEffect = ({ children }: { children: React.ReactNode }) => {
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
    }, 300); // Эта длительность должна совпадать с transition.opacity.duration
  };

  return (
    <ul
      ref={containerRef}
      onMouseLeave={handleMouseLeaveGrid}
      className="relative grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
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

      {React.Children.map(children, (child) => {
        if (!child || typeof child !== 'object' || !('type' in child)) return null;

        return (
          <motion.li
            layout
            transition={spring}
            className="relative"
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

export default GridWithHoverEffect;

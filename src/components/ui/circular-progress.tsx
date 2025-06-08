'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  renderLabel?: (progress: number) => number | string;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;
  shape?: 'square' | 'round';
  className?: string;
  progressClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
}

export const CircularProgress = ({
  value,
  renderLabel,
  className,
  progressClassName,
  labelClassName,
  showLabel,
  shape = 'round',
  strokeWidth,
  circleStrokeWidth = 10,
  progressStrokeWidth = 10,
}: CircularProgressProps) => {
  const size = 100;
  const radius = size / 2 - (strokeWidth ?? circleStrokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * ((100 - value) / 100);

  const viewBox = `0 0 ${size} ${size}`;

  return (
    <div className={cn('relative', className)} style={{ width: '100%', height: '100%' }}>
      <svg
        width="100%"
        height="100%"
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'rotate(-90deg)', display: 'block' }}
        className="relative"
      >
        {/* Base Circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth ?? circleStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={0}
          className="stroke-primary/25"
        />
        {/* Progress */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeLinecap={shape}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          fill="transparent"
          className={cn(
            'stroke-primary transition-[stroke-dashoffset] duration-75',
            progressClassName
          )}
        />
      </svg>
      {showLabel && (
        <div
          className={cn(
            'text-md absolute inset-0 flex items-center justify-center',
            labelClassName
          )}
          style={{ userSelect: 'none' }}
        >
          {renderLabel ? renderLabel(value) : value}
        </div>
      )}
    </div>
  );
};

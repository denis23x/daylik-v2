'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion, useAnimation } from 'motion/react';
import { cn } from '@/lib/utils';
import { useDateFnsLocale } from '@/hooks/ui/useDateFnsLocale';
import { format } from 'date-fns';

interface ScratchToRevealBackgroundProps {
  width: number;
  height: number;
  gradientColors?: [string, string, string];
  className?: string;
}

export const ScratchToRevealBackground: React.FC<ScratchToRevealBackgroundProps> = ({
  width,
  height,
  gradientColors = ['#A97CF8', '#F38CB8', '#FDCC92'],
  className,
}) => {
  const controls = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const locale = useDateFnsLocale();

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, gradientColors[0]);
    gradient.addColorStop(0.5, gradientColors[1]);
    gradient.addColorStop(1, gradientColors[2]);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    let animationFrameId: number;
    let start = performance.now();

    const animate = (time: number) => {
      const t = (time - start) / 3000;
      const base = resolvedTheme === 'dark' ? 20 : 230;
      const amplitude = resolvedTheme === 'dark' ? 30 : 50;

      const r1 = Math.floor(base + amplitude * Math.sin(t));
      const g1 = Math.floor(base + amplitude * Math.sin(t + 2));
      const b1 = Math.floor(base + amplitude * Math.sin(t + 4));

      const r2 = Math.floor(base + amplitude * Math.sin(t + Math.PI / 3));
      const g2 = Math.floor(base + amplitude * Math.sin(t + 2 + Math.PI / 3));
      const b2 = Math.floor(base + amplitude * Math.sin(t + 4 + Math.PI / 3));

      const gradientShift = (Math.sin(t) + 1) / 2;

      const gradient = ctx.createLinearGradient(
        width * gradientShift,
        0,
        width * (1 - gradientShift),
        height
      );

      gradient.addColorStop(0, `rgb(${r1},${g1},${b1})`);
      gradient.addColorStop(0.5, `rgb(${r2},${g2},${b2})`);
      gradient.addColorStop(1, `rgb(${r1},${b1},${g1})`);

      // ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const foreground = rootStyles.getPropertyValue('--foreground');
      const now = new Date();
      const nowTime = format(now, 'HH:mm:ss');
      const nowDate = format(now, 'EEEE, do MMMM', { locale });

      ctx.globalAlpha = 1;
      ctx.font = '600 36px "Geist Mono", "Geist Mono Fallback"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = foreground;
      ctx.fillText(nowTime, width / 2, height / 2 - 16);
      ctx.font = '12px sans-serif';
      ctx.fillText(nowDate.charAt(0).toUpperCase() + nowDate.slice(1), width / 2, height / 2 + 16);
      ctx.globalAlpha = 0.5;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [width, height, resolvedTheme, gradientColors]);

  return (
    <motion.div
      className={cn('relative select-none', className)}
      style={{
        width,
        height,
      }}
      animate={controls}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0"
        style={{ width, height }}
      />
    </motion.div>
  );
};

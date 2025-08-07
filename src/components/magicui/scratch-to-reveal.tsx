'use client';

import { cn } from '@/lib/utils';
import { motion, useAnimation } from 'motion/react';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

interface ScratchToRevealProps {
  children: React.ReactNode;
  width: number;
  height: number;
  className?: string;
  gradientColors?: [string, string, string];
}

export const ScratchToReveal: React.FC<ScratchToRevealProps> = ({
  width,
  height,
  children,
  className,
  gradientColors = ['#A97CF8', '#F38CB8', '#FDCC92'],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const controls = useAnimation();
  const t = useTranslations('components.dashboard.retros.wordcloud');
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const title = t('title');
    const description = t('description');
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
    // ctx.globalAlpha = 0.5;

    let animationFrameId: number;
    let start = performance.now();

    const animate = (time: number) => {
      const t = (time - start) / 3000;
      const color = rootStyles.getPropertyValue('--foreground');
      const base = resolvedTheme === 'dark' ? 20 : 230;
      const amplitude = 5;

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

      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color;
      ctx.fillText(title, width / 2, height / 2 - 16);
      ctx.font = '16px sans-serif';
      ctx.fillText(description, width / 2, height / 2 + 16);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [width, height, resolvedTheme, t]);

  useEffect(() => {
    const handleDocumentMouseMove = (event: MouseEvent) => {
      if (!isScratching) return;
      scratch(event.clientX, event.clientY);
    };

    const handleDocumentTouchMove = (event: TouchEvent) => {
      if (!isScratching) return;
      const touch = event.touches[0];
      scratch(touch.clientX, touch.clientY);
    };

    const handleDocumentMouseUp = () => {
      setIsScratching(false);
    };

    const handleDocumentTouchEnd = () => {
      setIsScratching(false);
    };

    document.addEventListener('mousedown', handleDocumentMouseMove);
    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('touchstart', handleDocumentTouchMove);
    document.addEventListener('touchmove', handleDocumentTouchMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);
    document.addEventListener('touchend', handleDocumentTouchEnd);
    document.addEventListener('touchcancel', handleDocumentTouchEnd);

    return () => {
      document.removeEventListener('mousedown', handleDocumentMouseMove);
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('touchstart', handleDocumentTouchMove);
      document.removeEventListener('touchmove', handleDocumentTouchMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      document.removeEventListener('touchend', handleDocumentTouchEnd);
      document.removeEventListener('touchcancel', handleDocumentTouchEnd);
    };
  }, [isScratching]);

  const handleMouseDown = () => setIsScratching(true);

  const handleTouchStart = () => setIsScratching(true);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left + 16;
      const y = clientY - rect.top + 16;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x - 16, y - 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
  };

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
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      ></canvas>
      {children}
    </motion.div>
  );
};

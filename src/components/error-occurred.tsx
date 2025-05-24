'use client';

import { cn } from '@/lib/utils';
import { Bug } from 'lucide-react';

const ErrorOccurred = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex max-w-md flex-col items-center justify-center gap-4', className)}>
      <Bug />
      <div className="text-center text-base">An error occurred</div>
    </div>
  );
};

export default ErrorOccurred;

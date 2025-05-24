'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex max-w-md flex-col items-center justify-center gap-4', className)}>
      <Loader2 className="animate-spin" />
      <div className="text-center text-base">Loading, please wait</div>
    </div>
  );
};

export default Loading;

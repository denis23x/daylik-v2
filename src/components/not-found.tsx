'use client';

import { cn } from '@/lib/utils';
import { SearchX } from 'lucide-react';

const NotFound = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex max-w-md flex-col items-center justify-center gap-4', className)}>
      <SearchX />
      <div className="text-center text-base">Not found</div>
    </div>
  );
};

export default NotFound;

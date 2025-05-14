'use client';

import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex max-w-md flex-col items-center gap-4">
      <Loader2 className="animate-spin" size={48} />
      <div className="text-center text-base">Loading, please wait</div>
    </div>
  );
};

export default Loading;

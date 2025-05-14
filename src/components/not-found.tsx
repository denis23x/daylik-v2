'use client';

import { Frown } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex max-w-md flex-col items-center gap-4">
      <Frown size={48} />
      <div className="text-center text-base">Not found</div>
    </div>
  );
};

export default NotFound;

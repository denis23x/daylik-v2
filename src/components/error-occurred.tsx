'use client';

import { Bug } from 'lucide-react';

const ErrorOccurred = () => {
  return (
    <div className="flex max-w-md flex-col items-center gap-4">
      <Bug size={48} />
      <div className="text-center text-base">An error occurred</div>
    </div>
  );
};

export default ErrorOccurred;

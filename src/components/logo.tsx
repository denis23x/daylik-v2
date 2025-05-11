import { CalendarHeart } from 'lucide-react';

export const Logo = ({ className }: { className?: string }) => (
  <div className="flex items-center gap-4">
    <CalendarHeart className={className} />
    <p className="text-xl font-bold">Daylik</p>
  </div>
);

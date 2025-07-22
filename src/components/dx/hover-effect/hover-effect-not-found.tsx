import { CircleOff } from 'lucide-react';

const HoverEffectNotFound = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="flex min-h-[75lvh] max-w-md flex-col items-center justify-center gap-4">
      <CircleOff />
      <div className="text-center text-xl font-semibold">{title}</div>
      {children}
    </div>
  );
};

export default HoverEffectNotFound;

import { CircleOff, Plus } from 'lucide-react';
import { Button } from '../../ui/button';

const HoverEffectNotFound = ({
  title,
  buttonText,
  handleClick,
}: {
  title: string;
  buttonText: string;
  handleClick: () => void;
}) => {
  return (
    <div className="flex min-h-[75dvh] max-w-md flex-col items-center justify-center gap-4">
      <CircleOff />
      <div className="text-center text-xl font-semibold">{title}</div>
      <Button variant="secondary" onClick={handleClick}>
        <Plus /> {buttonText}
      </Button>
    </div>
  );
};

export default HoverEffectNotFound;

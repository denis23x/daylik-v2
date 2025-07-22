import { Bug } from 'lucide-react';
import { Button } from '../../ui/button';
import { useFeedbackStore } from '@/store/useFeedbackStore';

const HoverEffectError = () => {
  const { openModal } = useFeedbackStore();

  return (
    <div className="flex min-h-[75lvh] max-w-md flex-col items-center justify-center gap-4">
      <Bug />
      <div className="text-center text-xl font-semibold">An error occurred</div>
      <Button variant="destructive" onClick={openModal}>
        Report
      </Button>
    </div>
  );
};

export default HoverEffectError;

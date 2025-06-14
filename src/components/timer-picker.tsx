'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  NumberInput,
  NumberInputDecrement,
  NumberInputField,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputScrubArea,
} from './ui/number-input';
import { Label } from './ui/label';
import { useSyncSettingsStore } from '@/store/useSyncSettingsStore';
import { Slider } from './ui/slider';
import { getMiliseconds } from '@/utils/getMiliseconds';
import { getSeconds } from '@/utils/getSeconds';

// TODO: env
const MIN_TIMER = 30;
const MAX_TIMER = 180;

const TimerPicker = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { timer: syncTimer, setTimer: setSyncTimer } = useSyncSettingsStore();
  const [timer, setTimer] = useState(getSeconds(syncTimer));

  useEffect(() => {
    setSyncTimer(getMiliseconds(timer));
  }, [timer, setSyncTimer]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">{children}</div>
      </PopoverTrigger>
      <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()} className="w-80">
        <div className="space-y-4">
          <NumberInput
            min={MIN_TIMER}
            max={MAX_TIMER}
            onValueChange={(value) => setTimer(value as number)}
            value={timer}
          >
            <NumberInputScrubArea>
              <Label className="mb-2 cursor-ew-resize">Timer in seconds</Label>
            </NumberInputScrubArea>
            <NumberInputGroup>
              <NumberInputDecrement />
              <NumberInputField />
              <NumberInputIncrement />
            </NumberInputGroup>
          </NumberInput>
          <Slider
            min={MIN_TIMER}
            max={MAX_TIMER}
            step={10}
            value={[timer]}
            onValueChange={([value]) => setTimer(value)}
          />
          <Button className="w-full" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimerPicker;

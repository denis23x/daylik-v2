'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useFormContext } from 'react-hook-form';
import { Pipette } from 'lucide-react';

const ColorPicker = ({ name, children }: { name: string; children: React.ReactNode }) => {
  const form = useFormContext();

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          {children}
          <span
            className="border-input absolute -top-2.5 -right-2.5 h-5 w-5 rounded-full border shadow-xs"
            style={{ backgroundColor: form.watch(name) }}
          ></span>
        </div>
      </PopoverTrigger>
      <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()} className="w-80">
        <div className="space-y-4">
          <span className="font-medium">Choose a color</span>
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <div className="relative flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Pipette />
                  </Button>
                  <FormControl>
                    <Input type="color" {...field} className="absolute h-9 w-9 opacity-0" />
                  </FormControl>
                  <FormControl>
                    <Input type="text" {...field} placeholder="#000000" className="flex-1" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;

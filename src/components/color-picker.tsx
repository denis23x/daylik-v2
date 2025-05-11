'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useFormContext } from 'react-hook-form';

const ColorPicker = ({ children }: { children: React.ReactNode }) => {
  const form = useFormContext();

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Choose a color</h4>
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input type="color" {...field} className="w-12 cursor-pointer" />
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

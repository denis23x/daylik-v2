'use client';

import { cloneElement, ReactNode, ReactElement, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Pipette } from 'lucide-react';
import type { Attributes } from 'react';
import { useTranslations } from 'next-intl';

const FormColorPicker = ({
  name,
  disabled = false,
  children,
}: {
  name: string;
  disabled?: boolean;
  children: ReactNode;
}) => {
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  const t = useTranslations('components.dx.form.colorPicker');

  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <div className="relative">
          {cloneElement(children as ReactElement, { disabled } as Attributes)}
          <span
            className="border-input absolute -top-2.5 -right-2.5 h-5 w-5 rounded-full border shadow-xs"
            style={{ backgroundColor: form.watch(name) }}
          ></span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-64"
        sideOffset={16}
        collisionPadding={16}
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('chooseColor')}</FormLabel>
                <div className="relative flex items-center gap-4">
                  <Button variant="outline" size="icon" aria-label={t('chooseColor')}>
                    <Pipette />
                  </Button>
                  <FormControl>
                    <Input type="color" {...field} className="absolute h-9 w-9 opacity-0" />
                  </FormControl>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder={t('placeholder')}
                      className="flex-1"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" onClick={() => setOpen(false)}>
            {t('close')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FormColorPicker;

'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export type SingleSelectItem = {
  key: string;
  value: string;
  label: string;
  description?: string;
};

const FormSingleSelect = ({
  required = false,
  name,
  label,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  items = [],
}: {
  required?: boolean;
  name: string;
  label: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  items: SingleSelectItem[];
}) => {
  const form = useFormContext();
  const t = useTranslations('components.dx.form.singleSelect');
  const [isOpen, setIsOpen] = useState(false);

  // Use translations as defaults when props are not provided
  const defaultPlaceholder = placeholder || t('defaultPlaceholder');
  const defaultSearchPlaceholder = searchPlaceholder || t('defaultSearchPlaceholder');
  const defaultEmptyMessage = emptyMessage || t('defaultEmptyMessage');

  const handleSelect = (item: SingleSelectItem) => {
    form.setValue(name, item.value);

    // Close the popover
    setIsOpen(false);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, formState }) => (
        <FormItem className="flex flex-col">
          <FormLabel htmlFor={name}>
            {label}
            {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
            <PopoverTrigger asChild>
              <div className="relative">
                <FormControl>
                  <Input
                    id={name}
                    className="w-full pr-6 text-left"
                    role="combobox"
                    placeholder={defaultPlaceholder}
                    disabled={formState.isSubmitting}
                    value={items.find((item) => item.value === field.value)?.label || ''}
                    readOnly
                  />
                </FormControl>
                <ChevronsUpDown className="absolute top-2.5 right-2 h-4 w-4 opacity-50" />
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0"
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Command className="w-full">
                <CommandInput
                  placeholder={defaultSearchPlaceholder}
                  className="h-9 text-base md:text-sm"
                />
                <CommandList>
                  <CommandEmpty>{defaultEmptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {items.map((item: SingleSelectItem) => (
                      <CommandItem
                        key={item.key}
                        value={item.label}
                        onSelect={() => handleSelect(item)}
                      >
                        {item.label}
                        {item.description && (
                          <small className="text-muted-foreground text-xs">
                            {item.description}
                          </small>
                        )}
                        <Check
                          className={cn(
                            'ml-auto',
                            field.value === item.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSingleSelect;

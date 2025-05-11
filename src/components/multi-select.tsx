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

export function MultiSelect({
  name,
  label,
  placeholder = 'Select items',
  searchPlaceholder = 'Search items...',
  emptyMessage = 'No item found.',
  items,
}: {
  name: string;
  label: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  items: { id: string | number; value: string }[];
}) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, formState }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    className={cn(
                      'w-full text-left',
                      field.value.length === 0 && 'text-muted-foreground'
                    )}
                    role="combobox"
                    placeholder={placeholder}
                    disabled={formState.isSubmitting}
                    value={
                      field.value.length > 0
                        ? `${field.value.length} item${field.value.length > 1 ? 's' : ''} selected`
                        : placeholder
                    }
                    readOnly
                  />
                  <ChevronsUpDown className="absolute top-2.5 right-2 h-4 w-4 opacity-50" />
                </div>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
              <Command className="w-full">
                <CommandInput placeholder={searchPlaceholder} className="h-9" />
                <CommandList>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {items.map((item) => (
                      <CommandItem
                        value={item.value}
                        key={item.id}
                        onSelect={() => {
                          const selectedIds = Array.from(
                            new Set([...field.value, item.id.toString()])
                          );
                          form.setValue(name, selectedIds);
                        }}
                      >
                        {item.value}
                        <Check
                          className={cn(
                            'ml-auto',
                            field.value.includes(item.id.toString()) ? 'opacity-100' : 'opacity-0'
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
}

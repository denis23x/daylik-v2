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
import { ControllerRenderProps, useFormContext } from 'react-hook-form';

export type MultiSelectItem = {
  key: string;
  value: string;
  label: string;
};

export function MultiSelect({
  name,
  label,
  placeholder = 'Select items',
  searchPlaceholder = 'Search',
  emptyMessage = 'No item found',
  items = [],
}: {
  name: string;
  label: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  items: MultiSelectItem[];
}) {
  const form = useFormContext();

  const handleSelect = (field: ControllerRenderProps, item: MultiSelectItem) => {
    const id = item.value.toString();
    const selectedIds = [...field.value];

    if (selectedIds.includes(id)) {
      const index = selectedIds.indexOf(id);

      selectedIds.splice(index, 1);
    } else {
      selectedIds.push(id);
    }

    form.setValue(name, selectedIds);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, formState }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            {label}{' '}
            {field.value.length !== 0 && (
              <span className="text-muted-foreground">({field.value.length})</span>
            )}
          </FormLabel>
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    className={cn(
                      'w-full pr-6 text-left',
                      field.value.length === 0 && 'text-muted-foreground'
                    )}
                    role="combobox"
                    placeholder={placeholder}
                    disabled={formState.isSubmitting}
                    value={
                      field.value.length > 0
                        ? field.value
                            .map((value: string) => {
                              const item = items.find((item: MultiSelectItem) => {
                                return item.value === value;
                              });
                              return item ? item.label : '';
                            })
                            .filter(Boolean)
                            .join(', ')
                        : placeholder
                    }
                    readOnly
                  />
                  <ChevronsUpDown className="absolute top-2.5 right-2 h-4 w-4 opacity-50" />
                </div>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0"
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Command className="w-full">
                <CommandInput placeholder={searchPlaceholder} className="h-9" />
                <CommandList>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {items.map((item: MultiSelectItem) => (
                      <CommandItem
                        key={item.key}
                        value={item.label}
                        onSelect={() => handleSelect(field, item)}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            field.value.includes(item.value) ? 'opacity-100' : 'opacity-0'
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

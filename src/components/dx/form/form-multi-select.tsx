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
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export type MultiSelectItem = {
  key: string;
  value: string;
  label: string;
  description?: string;
};

const FormMultiSelect = ({
  required = false,
  name,
  label,
  placeholder,
  search = true,
  searchPlaceholder,
  emptyMessage,
  items = [],
}: {
  required?: boolean;
  name: string;
  label: string;
  placeholder?: string;
  search?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  items: MultiSelectItem[];
}) => {
  const form = useFormContext();
  const t = useTranslations('components.dx.form.multiSelect');
  const [isOpen, setIsOpen] = useState(false);

  // Use translations as defaults when props are not provided
  const defaultPlaceholder = placeholder || t('defaultPlaceholder');
  const defaultSearchPlaceholder = searchPlaceholder || t('defaultSearchPlaceholder');
  const defaultEmptyMessage = emptyMessage || t('defaultEmptyMessage');

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

  const handleSelectAll = () => {
    const selectedAll = form.getValues(name).length === items.length;
    const selectedIds = items.map((item) => item.value);

    // Select all items
    form.setValue(name, selectedAll ? [] : selectedIds);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, formState }) => (
        <FormItem className="flex flex-col">
          <div className="flex items-center justify-between">
            <FormLabel htmlFor={name}>
              {label}{' '}
              {field.value.length !== 0 && (
                <span className="text-muted-foreground">({field.value.length})</span>
              )}
              {required && <span className="text-destructive">*</span>}
            </FormLabel>
            <span
              className="text-muted-foreground cursor-pointer text-xs"
              onClick={() => handleSelectAll()}
            >
              {field.value.length === items.length ? t('deselectAll') : t('selectAll')}
            </span>
          </div>
          <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
            <PopoverTrigger asChild>
              <div className="relative">
                <FormControl>
                  <Input
                    id={name}
                    className={cn(
                      'w-full pr-6 text-left',
                      field.value.length === 0 && 'text-muted-foreground'
                    )}
                    role="combobox"
                    placeholder={defaultPlaceholder}
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
                        : defaultPlaceholder
                    }
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
                {search && (
                  <CommandInput
                    placeholder={defaultSearchPlaceholder}
                    className="h-9 text-base md:text-sm"
                  />
                )}
                <CommandList>
                  <CommandEmpty>{defaultEmptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {items.map((item: MultiSelectItem) => (
                      <CommandItem
                        key={item.key}
                        value={item.label}
                        onSelect={() => handleSelect(field, item)}
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
};

export default FormMultiSelect;

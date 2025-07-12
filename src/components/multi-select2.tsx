'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxTag,
  ComboboxTagsInput,
} from '@/components/ui/combobox';
import { MultiSelectItem } from './multi-select';

export function ComboboxForm({
  name,
  label,
  placeholder = 'Select items',
  emptyMessage = 'No item found',
  items = [],
}: {
  name: string;
  label: string;
  placeholder?: string;
  emptyMessage?: string;
  items: MultiSelectItem[];
}) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}{' '}
            {field.value.length !== 0 && (
              <span className="text-muted-foreground">({field.value.length})</span>
            )}
          </FormLabel>
          <Combobox type="multiple" value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <ComboboxTagsInput placeholder={placeholder}>
                {field.value.map((value: string) => (
                  <ComboboxTag key={value} value={value}>
                    {items.find((fruit) => fruit.value === value)?.label}
                  </ComboboxTag>
                ))}
              </ComboboxTagsInput>
            </FormControl>
            <ComboboxContent>
              <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
              <ComboboxGroup>
                {items.map((fruit) => (
                  <ComboboxItem key={fruit.value} value={fruit.value}>
                    {fruit.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxContent>
          </Combobox>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

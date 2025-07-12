import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
} from '@/components/ui/combobox';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const FormAutocomplete = ({
  name,
  label,
  placeholder,
  emptyMessage,
}: {
  name: string;
  label: string;
  placeholder: string;
  emptyMessage: string;
}) => {
  const form = useFormContext();
  const [roles] = useState(['asd', 'asd2', 'asd3']);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Combobox type="single" inputValue={field.value} onInputValueChange={field.onChange}>
              <ComboboxInput placeholder={placeholder} />
              {roles.length > 0 && (
                <ComboboxContent>
                  <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
                  <ComboboxGroup>
                    {roles.map((role) => (
                      <ComboboxItem key={role} value={role}>
                        {role}
                      </ComboboxItem>
                    ))}
                  </ComboboxGroup>
                </ComboboxContent>
              )}
            </Combobox>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormAutocomplete;

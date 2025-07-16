import {
  Combobox,
  ComboboxContent,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
} from '@/components/ui/combobox';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  useFormField,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

export type AutocompleteItem = {
  key: string;
  value: string;
};

const FormAutocomplete = ({
  name,
  label,
  placeholder,
  items,
}: {
  name: string;
  label: string;
  placeholder: string;
  items: AutocompleteItem[];
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { error } = useFormField();

        return (
          <FormItem>
            <FormLabel>
              {label} <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Combobox
                type="single"
                value={field.value}
                onValueChange={field.onChange}
                inputValue={field.value}
                onInputValueChange={field.onChange}
              >
                <ComboboxInput placeholder={placeholder} error={!!error} />
                {items.find((item) => {
                  return item.value.toLowerCase().includes(field.value.toLowerCase());
                }) && (
                  <ComboboxContent>
                    <ComboboxGroup>
                      {items.map((item) => (
                        <ComboboxItem key={item.key} value={item.value}>
                          {item.value}
                        </ComboboxItem>
                      ))}
                    </ComboboxGroup>
                  </ComboboxContent>
                )}
              </Combobox>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormAutocomplete;

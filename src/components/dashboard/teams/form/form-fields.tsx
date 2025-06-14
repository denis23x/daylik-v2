'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { TeamsFormSchema } from './form-schema';
import { z } from 'zod';
import { MultiSelect } from '@/components/multi-select';
import { useTeammates } from '@/hooks/useTeammates';
import type { Teammate } from '@/types/teammate.type';

const TeamsFormFields = () => {
  const form = useFormContext<z.infer<typeof TeamsFormSchema>>();
  const { data: teammates } = useTeammates({ query: '*' });

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>
              Name
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="What's your team called?"
                disabled={formState.isSubmitting}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <MultiSelect
        name="teammates"
        label="Teammates"
        placeholder="Select teammates (optional)"
        searchPlaceholder="Search"
        emptyMessage="No teammates found"
        items={(teammates as Teammate[])?.map((teammate) => ({
          key: teammate.UUID,
          value: teammate.UUID,
          label: teammate.name,
          description: teammate.role,
        }))}
      />
    </>
  );
};

export { TeamsFormFields };

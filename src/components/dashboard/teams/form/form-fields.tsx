'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { TeamsFormSchema } from './form-schema';
import { z } from 'zod';
import { useTeammates } from '@/hooks/useTeammates';
import type { Teammate } from '@/types/teammate.type';
import { Button } from '@/components/ui/button';
import { FolderOpenIcon, X } from 'lucide-react';
import FileUploader from '@/components/file-uploader';
import { cn } from '@/lib/utils';
import { ComboboxForm } from '@/components/multi-select2';

const TeamsFormFields = () => {
  const form = useFormContext<z.infer<typeof TeamsFormSchema>>();
  const { data: teammates } = useTeammates({ query: 'UUID, name, role' });

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
      {/* <MultiSelect
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
      /> */}
      <ComboboxForm
        name="teammates"
        label="Teammates"
        placeholder="Select teammates (optional)"
        emptyMessage="No teammates found"
        items={(teammates as Teammate[])?.map((teammate) => ({
          key: teammate.UUID,
          value: teammate.UUID,
          label: teammate.name,
          description: teammate.role,
        }))}
      />
      <div className="flex items-end justify-end gap-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className={cn(field.value && 'pr-8')}
                    placeholder="Got a cool picture? Paste the link"
                    {...field}
                    value={field.value || ''}
                    disabled={form.formState.isSubmitting}
                  />
                  {field.value && (
                    <X
                      className="absolute top-1/2 right-2 size-5 -translate-y-1/2 cursor-pointer"
                      onClick={() => field.onChange('')}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FileUploader name="image" path="teams" disabled={form.formState.isSubmitting}>
          <Button variant="outline" size="icon" type="button">
            <FolderOpenIcon className="h-5 w-5" />
          </Button>
        </FileUploader>
      </div>
    </>
  );
};

export { TeamsFormFields };

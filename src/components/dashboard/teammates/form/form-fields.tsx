'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FolderOpenIcon, Palette } from 'lucide-react';
import { MultiSelect } from '@/components/multi-select';
import FileUploader from '@/components/file-uploader';
import ColorPicker from '@/components/color-picker';
import { useFormContext } from 'react-hook-form';
import { TeammatesFormSchema } from './form-schema';
import { z } from 'zod';
import { useTeams } from '@/hooks/useTeams';

const TeammatesFormFields = () => {
  const form = useFormContext<z.infer<typeof TeammatesFormSchema>>();
  const { data: teams } = useTeams();

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Teammate name"
                {...field}
                disabled={form.formState.isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="position"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Position <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Position" {...field} disabled={form.formState.isSubmitting} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <MultiSelect
        name="teams"
        label="Teams"
        placeholder="Select teams (optional)"
        searchPlaceholder="Search"
        emptyMessage="No teams found"
        items={(teams || []).map((team) => ({
          key: team.UUID,
          value: team.UUID,
          label: team.name,
        }))}
      />
      <div className="flex items-end justify-end gap-4">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input
                  placeholder="Avatar URL"
                  {...field}
                  value={field.value || ''}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FileUploader name="avatar">
          <Button variant="outline" size="icon" type="button">
            <FolderOpenIcon className="h-5 w-5" />
          </Button>
        </FileUploader>
        <ColorPicker name="color">
          <Button variant="outline" size="icon" type="button">
            <Palette className="h-5 w-5" />
          </Button>
        </ColorPicker>
      </div>
    </>
  );
};

export { TeammatesFormFields };

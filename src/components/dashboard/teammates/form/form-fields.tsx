'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FolderOpenIcon, Palette, X } from 'lucide-react';
import { MultiSelect } from '@/components/multi-select';
import FileUploader from '@/components/file-uploader';
import ColorPicker from '@/components/color-picker';
import { useFormContext } from 'react-hook-form';
import { TeammatesFormSchema } from './form-schema';
import { z } from 'zod';
import { useTeams } from '@/hooks/useTeams';
import type { Team } from '@/types/team.type';
import { cn } from '@/lib/utils';

const TeammatesFormFields = () => {
  const form = useFormContext<z.infer<typeof TeammatesFormSchema>>();
  const { data: teams } = useTeams({ query: 'UUID, name' });

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
                placeholder="What's their name?"
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
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Role <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="What's their role in the team?"
                {...field}
                disabled={form.formState.isSubmitting}
              />
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
        items={(teams as Team[])?.map((team) => ({
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
        <FileUploader name="avatar" path="avatars" disabled={form.formState.isSubmitting}>
          <Button variant="outline" size="icon" type="button">
            <FolderOpenIcon />
          </Button>
        </FileUploader>
        <ColorPicker name="color" disabled={form.formState.isSubmitting}>
          <Button variant="outline" size="icon" type="button">
            <Palette />
          </Button>
        </ColorPicker>
      </div>
    </>
  );
};

export { TeammatesFormFields };

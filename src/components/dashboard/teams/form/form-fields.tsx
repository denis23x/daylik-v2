'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { createTeamsFormSchema } from './form-schema';
import { z } from 'zod';
import FormMultiSelect from '@/components/dx/form/form-multi-select';
import { useTeammates } from '@/hooks/useTeammates';
import type { Teammate } from '@/types/teammate.type';
import { Button } from '@/components/ui/button';
import { FolderOpenIcon, X } from 'lucide-react';
import FormFileUploader from '@/components/dx/form/form-file-uploader';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const TeamsFormFields = () => {
  const t = useTranslations('components.dashboard.teams.form');
  const form = useFormContext<z.infer<ReturnType<typeof createTeamsFormSchema>>>();
  const { data: teammates } = useTeammates({ query: 'UUID, name, role' });

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>
              {t('name.label')}
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t('name.placeholder')}
                disabled={formState.isSubmitting}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormMultiSelect
        name="teammates"
        label={t('teammates.label')}
        placeholder={t('teammates.placeholder')}
        searchPlaceholder={t('teammates.searchPlaceholder')}
        emptyMessage={t('teammates.emptyMessage')}
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
              <FormLabel>{t('image.label')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className={cn(field.value && 'pr-8')}
                    placeholder={t('image.placeholder')}
                    {...field}
                    value={field.value || ''}
                    inputMode="url"
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
        <FormFileUploader name="image" path="teams" disabled={form.formState.isSubmitting}>
          <Button variant="outline" size="icon" type="button">
            <FolderOpenIcon className="h-5 w-5" />
          </Button>
        </FormFileUploader>
      </div>
    </>
  );
};

export { TeamsFormFields };

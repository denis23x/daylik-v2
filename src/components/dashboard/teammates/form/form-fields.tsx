'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FolderOpenIcon, Palette, X } from 'lucide-react';
import FormMultiSelect from '@/components/dx/form/form-multi-select';
import FormFileUploader from '@/components/dx/form/form-file-uploader';
import FormColorPicker from '@/components/dx/form/form-color-picker';
import FormAutocomplete from '@/components/dx/form/form-autocomplete';
import { useFormContext } from 'react-hook-form';
import { createTeammatesFormSchema } from './form-schema';
import { z } from 'zod';
import { useTeams } from '@/hooks/useTeams';
import type { Team } from '@/types/team.type';
import { cn } from '@/lib/utils';
import { getCookie } from '@/hooks/useCookie';
import { COOKIE_ROLES } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const TeammatesFormFields = () => {
  const t = useTranslations('components.dashboard.teammates.form');
  const form = useFormContext<z.infer<ReturnType<typeof createTeammatesFormSchema>>>();
  const { data: teams } = useTeams({ query: 'UUID, name' });
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const roles = JSON.parse(getCookie(COOKIE_ROLES) || '[]');

    // Set roles to autocomplete
    setRoles(roles || []);
  }, []);

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t('name.label')} <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t('name.placeholder')}
                {...field}
                disabled={form.formState.isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormAutocomplete
        name="role"
        label={t('role.label')}
        placeholder={t('role.placeholder')}
        items={(roles as string[])?.map((role, index) => ({
          key: String(index),
          value: role,
        }))}
      />
      <FormMultiSelect
        name="teams"
        label={t('teams.label')}
        placeholder={t('teams.placeholder')}
        searchPlaceholder={t('teams.searchPlaceholder')}
        emptyMessage={t('teams.emptyMessage')}
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
              <FormLabel>{t('avatar.label')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className={cn(field.value && 'pr-8')}
                    placeholder={t('avatar.placeholder')}
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
        <FormFileUploader name="avatar" path="teammates" disabled={form.formState.isSubmitting}>
          <Button variant="outline" size="icon" type="button">
            <FolderOpenIcon />
          </Button>
        </FormFileUploader>
        <FormColorPicker name="color" disabled={form.formState.isSubmitting}>
          <Button variant="outline" size="icon" type="button">
            <Palette />
          </Button>
        </FormColorPicker>
      </div>
    </>
  );
};

export { TeammatesFormFields };

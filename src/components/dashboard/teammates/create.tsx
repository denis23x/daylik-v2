'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { supabase } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowUpRight, FolderOpenIcon, Loader2, Palette } from 'lucide-react';
import ResponsiveDialog from '@/components/responsive-dialog';
import type { Team } from '@/types/team';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useRandomHexColor } from '@/hooks/useRandomHexColor';
import FileUploader from '@/components/file-uploader';
import ColorPicker from '@/components/color-picker';
import { useSupabaseSession } from '@/hooks/useSupabaseSession';

const formSchema = z.object({
  name: z.string().min(2, 'Teammate name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  teamId: z.string().min(1, 'Team is required'),
  avatar: z.string().optional(),
  color: z.string().min(4, 'Color must be a valid hex code'),
});

const TeammatesCreateForm = () => {
  const form = useFormContext<z.infer<typeof formSchema>>();

  const session = useSupabaseSession();

  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const getTeams = async () => {
      const { data, error } = await supabase.from('team').select('*');

      if (error) {
        toast.error(error.message);
      }

      if (data) {
        setTeams(data as Team[]);
      }
    };

    getTeams();
  }, []);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const { data, error } = await supabase
      .from('teammate')
      .insert([
        {
          name: formData.name,
          role: formData.role,
          teamId: formData.teamId,
          userId: session?.user.id,
          avatar: formData.avatar || null,
          color: formData.color,
        },
      ])
      .select('*');

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      toast.success('Teammate created successfully');
    }
  };

  return (
    <Form {...form}>
      <form id="teammates-create-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter teammate name"
                  disabled={formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter teammate role"
                  disabled={formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teamId"
          render={({ field, fieldState, formState }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={formState.isSubmitting}
                >
                  <SelectTrigger
                    className={cn(
                      'w-full',
                      fieldState.invalid &&
                        '!border-destructive !ring-destructive/20 dark:!ring-destructive/40'
                    )}
                  >
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id.toString()}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-end justify-end gap-4">
          <FormField
            control={form.control}
            name="avatar"
            render={({ field, formState }) => (
              <FormItem className="flex-1">
                <FormLabel>Avatar URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter avatar URL (optional)"
                    disabled={formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FileUploader>
            <Button variant="outline" size="icon">
              <FolderOpenIcon className="h-5 w-5" />
            </Button>
          </FileUploader>
          <ColorPicker>
            <Button variant="outline" size="icon">
              <Palette className="h-5 w-5" />
            </Button>
          </ColorPicker>
        </div>
      </form>
    </Form>
  );
};

const TeammatesCreateFormSubmit = () => {
  const form = useFormContext<z.infer<typeof formSchema>>();

  return (
    <Button type="submit" form="teammates-create-form" disabled={form.formState.isSubmitting}>
      {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
      {form.formState.isSubmitting ? 'Please wait' : 'Create'}
    </Button>
  );
};

const TeammatesCreate = () => {
  const { color } = useRandomHexColor();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      role: '',
      teamId: '',
      avatar: '',
      color: color,
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <FormProvider {...form}>
      <ResponsiveDialog
        title="Create Teammate"
        description="Create a new teammate to start collaborating with your team."
        trigger={
          <Button size="lg" className="rounded-full text-base">
            Create Teammate <ArrowUpRight className="!h-5 !w-5" />
          </Button>
        }
        content={<TeammatesCreateForm />}
        footer={<TeammatesCreateFormSubmit />}
      />
    </FormProvider>
  );
};

export default TeammatesCreate;

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
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { FolderOpenIcon, Loader2, Palette, Plus } from 'lucide-react';
import ResponsiveDialog from '@/components/responsive-dialog';
import type { Team } from '@/types/team';
import { useRandomHexColor } from '@/hooks/useRandomHexColor';
import FileUploader from '@/components/file-uploader';
import ColorPicker from '@/components/color-picker';
import { MultiSelect } from '@/components/multi-select';
import { useAuth } from '@/context/AuthContextProvider';

const formSchema = z.object({
  name: z.string().min(2, 'Teammate name must be at least 2 characters'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  teams: z.array(z.string()),
  avatar: z.string().optional(),
  color: z.string().min(4, 'Color must be a valid hex code'),
});

const TeammatesCreate = () => {
  const { user } = useAuth();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { color } = useRandomHexColor();

  const [teams, setTeams] = useState<Team[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      position: '',
      teams: [],
      avatar: '',
      color: color,
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const getTeams = async () => {
      try {
        const { data, error } = await supabase.from('teams').select('*').eq('userUUID', user?.id);

        if (error) {
          toast.error(error.message);
          return;
        }

        if (data) {
          setTeams(data as Team[]);
          return;
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'An error occurred');
      }
    };

    getTeams();
  }, [user]);

  const handleOpenChange = (open: boolean) => {
    if (!form.formState.isSubmitting) {
      form.reset();
    }

    setIsDialogOpen(open);
  };

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      const { data, error } = await supabase
        .from('teammates')
        .insert([
          {
            name: formData.name,
            position: formData.position,
            userUUID: user?.id,
            avatar: formData.avatar || null,
            color: formData.color,
          },
        ])
        .select('UUID')
        .single();

      if (error) {
        toast.error(error.message);
        return;
      }

      // Create team links Many to Many
      const teamLinks = formData.teams.map((teamUUID: string) => ({
        teamUUID: teamUUID,
        teammateUUID: data.UUID,
      }));

      const { error: errorLink } = await supabase.from('teams_teammates').insert(teamLinks);

      if (errorLink) {
        toast.error(errorLink.message);
        return;
      }

      if (data) {
        toast.success('Teammate created successfully');
        return;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      // Close the dialog after the form is submitted
      setIsDialogOpen(false);
    }
  };

  return (
    <FormProvider {...form}>
      <ResponsiveDialog
        title="Create Teammate"
        description="Create a new teammate to start collaborating with your team."
        trigger={
          <Button className="cursor-pointer">
            <Plus /> Create Teammate
          </Button>
        }
        content={
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-destructive">*</span>
                    </FormLabel>
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
                name="position"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>
                      Position <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter teammate position"
                        disabled={formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {teams && teams.length > 0 ? (
                <MultiSelect
                  name="teams"
                  label="Teams"
                  placeholder="Select teams (optional)"
                  searchPlaceholder="Search"
                  emptyMessage="No team found"
                  items={teams.map((team: Team) => ({
                    key: team.UUID,
                    value: team.UUID,
                    label: team.name,
                  }))}
                />
              ) : null}
              <div className="flex items-end justify-end gap-4">
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field, formState }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Avatar</FormLabel>
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
                <FileUploader name="avatar">
                  <Button variant="outline" size="icon">
                    <FolderOpenIcon className="h-5 w-5" />
                  </Button>
                </FileUploader>
                <ColorPicker name="color">
                  <Button variant="outline" size="icon">
                    <Palette className="h-5 w-5" />
                  </Button>
                </ColorPicker>
              </div>
            </form>
          </Form>
        }
        footer={
          <Button
            type="button"
            onClick={form.handleSubmit(handleSubmit)}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
            {form.formState.isSubmitting ? 'Please wait' : 'Create'}
          </Button>
        }
        open={isDialogOpen}
        onOpenChange={handleOpenChange}
      />
    </FormProvider>
  );
};

export default TeammatesCreate;

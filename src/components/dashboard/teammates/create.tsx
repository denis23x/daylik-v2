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
import { useSupabaseSession } from '@/hooks/useSupabaseSession';
import { MultiSelect } from '@/components/multi-select';

const formSchema = z.object({
  name: z.string().min(2, 'Teammate name must be at least 2 characters'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  teams: z.array(z.string()),
  avatar: z.string().optional(),
  color: z.string().min(4, 'Color must be a valid hex code'),
});

const TeammatesCreate = () => {
  const session = useSupabaseSession();

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
        // TODO: Change to session?.user.id
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .eq('userUUID', '6d8479a5-4d38-46c3-b3a0-5b905aa3c92a');

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
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!form.formState.isSubmitting) {
      form.reset();
    }

    setIsDialogOpen(open);
  };

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      // teamId: formData.teamId.length > 0 ? formData.teamId : null,

      // TODO: Change to session?.user.id
      const { data, error } = await supabase
        .from('teammate')
        .insert([
          {
            name: formData.name,
            position: formData.position,
            userId: session?.user.id,
            avatar: formData.avatar || null,
            color: formData.color,
          },
        ])
        .select('*');

      if (error) {
        toast.error(error.message);
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
            <form className="space-y-4">
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
                name="position"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
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
                  placeholder="Select teams"
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
        }
        footer={
          <Button onClick={form.handleSubmit(handleSubmit)} disabled={form.formState.isSubmitting}>
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

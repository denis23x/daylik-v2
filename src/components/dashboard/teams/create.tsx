'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import ResponsiveDialog from '@/components/responsive-dialog';
import { useSupabaseSession } from '@/hooks/useSupabaseSession';

const formSchema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters'),
});

const TeamsCreateForm = () => {
  const form = useFormContext<z.infer<typeof formSchema>>();

  const session = useSupabaseSession();

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const { data, error } = await supabase
      .from('team')
      .insert([
        {
          name: formData.name,
          userId: session?.user.id,
        },
      ])
      .select('*');

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      toast.success('Team created successfully');
    }
  };

  return (
    <Form {...form}>
      <form id="teams-create-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter team name" disabled={formState.isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const TeamsCreateFormSubmit = () => {
  const form = useFormContext<z.infer<typeof formSchema>>();

  return (
    <Button type="submit" form="teams-create-form" disabled={form.formState.isSubmitting}>
      {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
      {form.formState.isSubmitting ? 'Please wait' : 'Create'}
    </Button>
  );
};

const TeamsCreate = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  return (
    <FormProvider {...form}>
      <ResponsiveDialog
        title="Create Team"
        description="Create a new team to start collaborating with your teammates."
        trigger={
          <Button size="lg" className="rounded-full text-base">
            Create Team <ArrowUpRight className="!h-5 !w-5" />
          </Button>
        }
        content={<TeamsCreateForm />}
        footer={<TeamsCreateFormSubmit />}
      />
    </FormProvider>
  );
};

export default TeamsCreate;

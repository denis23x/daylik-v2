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
import { Loader2, Plus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import ResponsiveDialog from '@/components/responsive-dialog';
import { useState } from 'react';
import { useAuth } from '@/context/AuthProvider';

const formSchema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters'),
});

const TeamsCreate = () => {
  const { user } = useAuth();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(formSchema),
  });

  const handleOpenChange = (open: boolean) => {
    if (!form.formState.isSubmitting) {
      form.reset();
    }

    setIsDialogOpen(open);
  };

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .insert([
          {
            name: formData.name,
            userUUID: user?.id,
          },
        ])
        .select('UUID')
        .single();

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        toast.success('Team created successfully');
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
        title="Create Team"
        description="Create a new team to start collaborating with your teammates."
        trigger={
          <Button className="cursor-pointer">
            <Plus /> Create Team
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
                      Name
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter team name"
                        disabled={formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

export default TeamsCreate;

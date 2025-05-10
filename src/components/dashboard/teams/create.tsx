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
import { ArrowUpRight } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { supabase } from '@/utils/supabase/client';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { SupabaseSession } from '@/types/supabaseSession';
import ResponsiveDialog from '@/components/responsive-dialog';

const formSchema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters'),
});

const TeamsCreateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const session = useRef<SupabaseSession | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        toast.error(error.message);
      }

      if (data) {
        session.current = data.session as SupabaseSession;
      }
    };

    getSession();
  }, []);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const { data, error } = await supabase
      .from('team')
      .insert([
        {
          name: formData.name,
          userId: session.current?.user.id,
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter team name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const TeamsCreate = () => {
  return (
    <ResponsiveDialog
      title="Create Team"
      description="Create a new team to start collaborating with your teammates."
      trigger={
        <Button size="lg" className="rounded-full text-base">
          Create Team <ArrowUpRight className="!h-5 !w-5" />
        </Button>
      }
      content={<TeamsCreateForm />}
      footer={
        <Button type="submit" form="teams-create-form">
          Create
        </Button>
      }
    />
  );
};

export default TeamsCreate;

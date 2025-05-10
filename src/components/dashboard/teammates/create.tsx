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
import type { SupabaseSession } from '@/types/supabaseSession';
import { supabase } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowUpRight } from 'lucide-react';
import ResponsiveDialog from '@/components/responsive-dialog';
import type { Team } from '@/types/team';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, 'Teammate name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  teamId: z.string().min(1, 'Team is required'),
});

const TeammatesCreateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      role: '',
      teamId: '',
    },
  });

  const session = useRef<SupabaseSession | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);

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
          userId: session.current?.user.id,
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter teammate name" {...field} />
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
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="Enter teammate role" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
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
      </form>
    </Form>
  );
};

const TeammatesCreate = () => {
  return (
    <ResponsiveDialog
      title="Create Teammate"
      description="Create a new teammate to start collaborating with your team."
      trigger={
        <Button size="lg" className="rounded-full text-base">
          Create Teammate <ArrowUpRight className="!h-5 !w-5" />
        </Button>
      }
      content={<TeammatesCreateForm />}
      footer={
        <Button type="submit" form="teammates-create-form">
          Create
        </Button>
      }
    />
  );
};

export default TeammatesCreate;

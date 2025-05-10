'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Teammate name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
});

const TeammatesCreate = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      role: '',
    },
  });

  // Create a Supabase client
  const createTeammate = async (teammateData: z.infer<typeof formSchema>) => {
    const { error } = await supabase
      .from('teammate')
      .insert([
        {
          name: teammateData.name,
          role: teammateData.role,
        },
      ])
      .select();

    if (error) {
      console.error('Error creating teammate:', error);
      return false;
    }

    return true;
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Call the function with form data
    createTeammate(data).then((success) => {
      if (success) {
        form.reset();
        // Optionally refresh the page or update the UI
        window.location.reload();
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Teammate</DialogTitle>
          <DialogDescription>Add a new teammate to collaborate with your team.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <DialogFooter>
              <Button type="submit">Add Teammate</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TeammatesCreate;

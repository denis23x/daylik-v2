'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useUpdatePassword } from '@/hooks/useAuth';
import { TabsPasswordInput } from './tabs-password-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const TabsPassword = () => {
  const { mutateAsync: updatePassword } = useUpdatePassword();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      await updatePassword({ ...formData });

      // Reset form
      form.reset();

      // Show message
      toast.success('Password updated');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <Card className="p-4">
      <CardHeader className="p-0">
        <CardTitle>Update Password</CardTitle>
        <CardDescription className="border-b pb-6">
          Set a new password to keep your account secure. Choose something strong and unique — your
          changes will take effect immediately after saving.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <TabsPasswordInput name="password" />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
              {form.formState.isSubmitting ? 'Please wait' : 'Update'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TabsPassword;

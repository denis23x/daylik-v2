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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Trash2 } from 'lucide-react';
import { useDeleteUser, useGetUser, useUpdateEmail } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect, useState } from 'react';
import { ConfirmDialog } from '@/components/confirm-dialog';

const formSchema = z.object({
  newEmail: z.string().email(),
  oldEmail: z.string().email(),
});

const TabsEmail = () => {
  const { data } = useGetUser();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: updateEmail } = useUpdateEmail();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      newEmail: '',
      oldEmail: '',
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setValue('oldEmail', data?.user?.email || '');
  }, [form, data]);

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      await updateEmail({ email: formData.newEmail });

      // Reset form
      form.reset({
        newEmail: '',
        oldEmail: data?.user?.email || '',
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleDeleteUser = async () => {
    const p = async (): Promise<void> => {
      await deleteUser();

      // Redirect to home page with reload
      window.location.href = '/';
    };

    toast.promise(p(), {
      loading: 'Deleting..',
      error: (e: unknown) => (e instanceof Error ? e.message : 'An error occurred'),
    });
  };

  return (
    <>
      <Card className="p-4">
        <CardHeader className="p-0">
          <CardTitle>Update Email Address</CardTitle>
          <CardDescription className="border-b pb-6">
            Change the email address linked to your account. A confirmation link will be sent to
            verify the new address before the update is applied.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {form.formState.isSubmitSuccessful && (
            <Alert className="mb-6" variant="destructive">
              <AlertDescription className="inline">
                We&apos;ve sent confirmation emails to both your <strong>current</strong> and{' '}
                <strong>new</strong> email addresses. Please check both inboxes and click the links
                to complete the process.
              </AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="newEmail"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>New</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="What's your new email?"
                        className="w-full"
                        disabled={formState.isSubmitting}
                        autoComplete="email"
                        inputMode="email"
                        spellCheck="false"
                        autoCapitalize="none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="oldEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="w-full"
                        disabled={true}
                        autoComplete="email"
                        inputMode="email"
                        spellCheck="false"
                        autoCapitalize="none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
                {form.formState.isSubmitting ? 'Please wait' : 'Send link'}
              </Button>
              <Button
                type="button"
                onClick={() => setIsConfirmOpen(true)}
                className="w-full"
                disabled={form.formState.isSubmitting}
                variant="destructive"
              >
                {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : <Trash2 />}
                {form.formState.isSubmitting ? 'Please wait' : 'Delete My Account'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <ConfirmDialog
        title="Are you absolutely sure?"
        description="This action will permanently delete your account and all associated data. This cannot be undone."
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirmAction={handleDeleteUser}
      />
    </>
  );
};

export default TabsEmail;

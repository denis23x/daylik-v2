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
import { Loader2 } from 'lucide-react';
import { useUpdateEmail } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  email: z.string().email(),
});

const TabsEmail = () => {
  const { mutateAsync: updateEmail } = useUpdateEmail();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      await updateEmail({ ...formData });

      // Reset form
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <Card>
      <CardContent>
        {form.formState.isSubmitted && (
          <Alert className="mb-4" variant="destructive">
            <AlertTitle>Check your email</AlertTitle>
            <AlertDescription className="inline">
              We&apos;ve sent confirmation emails to both your <strong>old</strong> and{' '}
              <strong>new</strong> email addresses. Please check both inboxes and click the links to
              complete the process.
            </AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
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
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
              {form.formState.isSubmitting ? 'Please wait' : 'Update Email'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TabsEmail;

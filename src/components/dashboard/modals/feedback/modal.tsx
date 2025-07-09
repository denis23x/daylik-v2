'use client';

import ResponsiveDialog from '@/components/responsive-dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { Form as FormProvider } from '@/components/ui/form';
import { FeedbackSchema } from './form/form-schema';
import { FeedbackFormFields } from './form/form-fields';
import { useFeedbackStore } from '@/store/useFeedbackStore';

export default function FeedbackModal() {
  const { isOpen, closeModal } = useFeedbackStore();

  const form = useForm<z.infer<typeof FeedbackSchema>>({
    defaultValues: {
      message: '',
      priority: 'medium',
    },
    resolver: zodResolver(FeedbackSchema),
  });

  useEffect(() => {
    if (isOpen) {
      // Unused
    } else {
      // Reset form when modal is closed
      form.reset();
    }
  }, [form, isOpen]);

  const handleSubmit = async (formData: z.infer<typeof FeedbackSchema>) => {
    console.log(formData);

    // Mock async request with 5 second timeout
    await new Promise((resolve) => setTimeout(resolve, 5000));
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => !form.formState.isSubmitting && !open && closeModal()}
      disabled={form.formState.isSubmitting}
      title="Feedback"
      description="Your feedback helps us improve the service for everyone."
      content={
        <FormProvider {...form}>
          <form id="feedback-form" className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <FeedbackFormFields />
          </form>
        </FormProvider>
      }
      trigger={undefined}
      left={undefined}
      right={
        <Button type="submit" form="feedback-form" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
          {form.formState.isSubmitting ? 'Please wait' : 'Send'}
        </Button>
      }
    />
  );
}

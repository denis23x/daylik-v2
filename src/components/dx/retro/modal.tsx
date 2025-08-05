'use client';

import ResponsiveDialog from '@/components/responsive-dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Form as FormProvider } from '@/components/ui/form';
import { createRetroSchema } from './form/form-schema';
import { RetroFormFields } from './form/form-fields';
import { useTranslations } from 'next-intl';

export default function RetroModal({ children }: { children: React.ReactNode }) {
  const t = useTranslations('components.dx.retro');
  const [isOpen, setIsOpen] = useState(false);
  // const { mutateAsync: sendFeedback } = useSendFeedback();
  const RetroSchema = createRetroSchema(t);

  const form = useForm<z.infer<typeof RetroSchema>>({
    defaultValues: {
      name: '',
      namePrevious: '',
    },
    resolver: zodResolver(RetroSchema),
  });

  useEffect(() => {
    if (isOpen) {
      // Unused
    } else {
      // Reset form when modal is closed
      form.reset();
    }
  }, [form, isOpen]);

  const handleSubmit = async (formData: z.infer<typeof RetroSchema>) => {
    console.log(formData);
    // try {
    //   await sendFeedback({ ...formData });
    //   // Close modal
    //   closeModal();
    //   // Show message
    //   toast.success(t('messages.success'));
    // } catch (error) {
    //   toast.error(error instanceof Error ? error.message : t('messages.error'));
    // }
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <ResponsiveDialog
        open={isOpen}
        onOpenChange={(open) => !form.formState.isSubmitting && !open && setIsOpen(false)}
        disabled={form.formState.isSubmitting}
        title={t('title')}
        description={t('description')}
        content={
          <FormProvider {...form}>
            <form id="retro-form" className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
              <RetroFormFields />
            </form>
          </FormProvider>
        }
        trigger={undefined}
        left={undefined}
        right={
          <Button type="submit" form="retro-form" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
            {form.formState.isSubmitting ? t('buttons.loading') : t('buttons.continue')}
          </Button>
        }
      />
    </>
  );
}

'use client';

import ResponsiveDialog from '@/components/responsive-dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Form as FormProvider } from '@/components/ui/form';
import { createPokerSchema } from './form/form-schema';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useRouter } from '@/i18n/navigation';
import { PokerFormFields } from './form/form-fields';
import { useCreatePoker } from '@/hooks/usePoker';

export default function PokerModal({ children }: { children: React.ReactNode }) {
  const t = useTranslations('components.dx.poker.modal');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: createPoker } = useCreatePoker();
  const PokerSchema = createPokerSchema(t);

  const form = useForm<z.infer<typeof PokerSchema>>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(PokerSchema),
  });

  useEffect(() => {
    if (isOpen) {
      // Unused
    } else {
      // Reset form when modal is closed
      form.reset();
    }
  }, [form, isOpen]);

  const handleSubmit = async (formData: z.infer<typeof PokerSchema>) => {
    try {
      const poker = await createPoker(formData);

      // Close modal
      setIsOpen(false);

      // Redirect
      router.push({
        pathname: '/poker/[UUID]',
        params: { UUID: poker.UUID },
      });

      // Show message
      toast.success(t('messages.success'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('messages.error'));
    }
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
            <form id="poker-form" className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
              <PokerFormFields />
            </form>
          </FormProvider>
        }
        trigger={undefined}
        left={undefined}
        right={
          <Button type="submit" form="poker-form" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
            {form.formState.isSubmitting ? t('buttons.loading') : t('buttons.continue')}
          </Button>
        }
      />
    </>
  );
}

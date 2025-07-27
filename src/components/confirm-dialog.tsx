'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ConfirmDialogProps {
  title: string;
  description: string;
  trigger?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirmAction: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ConfirmDialog = ({
  title,
  description,
  trigger,
  confirmText,
  cancelText,
  onConfirmAction,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: ConfirmDialogProps) => {
  const t = useTranslations('components.confirmDialog');
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  // Use translations as defaults when props are not provided
  const defaultConfirmText = confirmText || t('defaultConfirmText');
  const defaultCancelText = cancelText || t('defaultCancelText');

  const isControlled = controlledOpen !== undefined && controlledOnOpenChange !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const onOpenChange = isControlled ? controlledOnOpenChange : setUncontrolledOpen;

  const handleConfirm = () => {
    onConfirmAction();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{defaultCancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>{defaultConfirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

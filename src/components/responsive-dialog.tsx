'use client';

import { useMediaQuery } from '@/hooks/ui/useMediaQuery';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useState } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useTranslations } from 'next-intl';

interface ResponsiveDialogProps {
  title: string;
  description: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showClose?: boolean;
}

const ResponsiveDialog = ({
  title,
  description,
  trigger,
  content,
  left,
  right,
  disabled = false,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  showClose = true,
}: ResponsiveDialogProps) => {
  const t = useTranslations('components.responsiveDialog');
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const sm = useMediaQuery('(min-width: 640px)');

  // Use controlled props if provided, otherwise use internal state
  const isControlled = controlledOpen !== undefined && controlledOnOpenChange !== undefined;

  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const onOpenChange = isControlled ? controlledOnOpenChange : setUncontrolledOpen;

  if (sm) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger suppressHydrationWarning asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <Separator />
          {content}
          {(left || showClose || right) && (
            <DialogFooter className={left ? 'gap-4 sm:justify-between' : 'gap-4'}>
              {left}
              <div className="flex gap-4">
                {showClose && (
                  <DialogClose asChild>
                    <Button variant="outline" disabled={disabled}>
                      {t('buttons.close')}
                    </Button>
                  </DialogClose>
                )}
                {right}
              </div>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer repositionInputs={false} open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger suppressHydrationWarning asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <Separator className="mb-4" />
        <div className="px-4">{content}</div>
        {(right || showClose || left) && (
          <DrawerFooter className="gap-4">
            {right}
            {showClose && (
              <DrawerClose asChild>
                <Button variant="outline" disabled={disabled}>
                  {t('buttons.close')}
                </Button>
              </DrawerClose>
            )}
            {left}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDialog;

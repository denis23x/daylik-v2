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
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface ResponsiveDialogProps {
  title: string;
  description: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  extraActions: React.ReactNode;
  actions: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ResponsiveDialog = ({
  title,
  description,
  trigger,
  content,
  extraActions,
  actions,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: ResponsiveDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 640px)');

  // Use controlled props if provided, otherwise use internal state
  const isControlled = controlledOpen !== undefined && controlledOnOpenChange !== undefined;

  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const onOpenChange = isControlled ? controlledOnOpenChange : setUncontrolledOpen;

  useEffect(() => {
    const element = document.querySelector('[data-vaul-drawer-wrapper]') as HTMLElement;

    if (element) {
      if (isDesktop) {
        element.removeAttribute('style');
      } else {
        if (open) {
          element.style.borderRadius = '8px';
          element.style.overflow = 'hidden';
          element.style.transform = 'scale(0.95) translate3d(0, -28px, 0)';
          element.style.transformOrigin = 'center';
        } else {
          element.removeAttribute('style');
        }
      }
    }
  }, [open, isDesktop]);

  if (isDesktop) {
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
          <DialogFooter className={extraActions ? 'gap-4 sm:justify-between' : 'gap-4'}>
            {extraActions}
            <div className="flex gap-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              {actions}
            </div>
          </DialogFooter>
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
        <DrawerFooter className="gap-4">
          {actions}
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
          {extraActions}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDialog;

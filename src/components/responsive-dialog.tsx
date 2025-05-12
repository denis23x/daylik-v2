'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
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

interface ResponsiveDialogProps {
  title: string;
  description: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ResponsiveDialog = ({
  title,
  description,
  trigger,
  content,
  footer,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: ResponsiveDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Use controlled props if provided, otherwise use internal state
  const isControlled = controlledOpen !== undefined && controlledOnOpenChange !== undefined;

  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const onOpenChange = isControlled ? controlledOnOpenChange : setUncontrolledOpen;

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
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            {footer}
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
          {footer}
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDialog;

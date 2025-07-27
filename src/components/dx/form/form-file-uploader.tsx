'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Button } from '../../ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useUploadFile } from '@/hooks/useFiles';
import { getPublicUrl } from '@/lib/api/files';
import { v4 as uuidv4 } from 'uuid';
import { BUCKET_MAX_FILE_SIZE, BUCKET_IMAGES } from '@/lib/constants';
import { useTranslations } from 'next-intl';

const FormFileUploader = ({
  name,
  path,
  disabled = false,
  children,
}: {
  name: string;
  path: string;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  const { mutateAsync: uploadFile, isPending: isLoading } = useUploadFile();
  const t = useTranslations('components.dx.form.fileUploader');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Early validation checks
    if (!file) {
      toast.error(t('messages.noFileSelected'));
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error(t('messages.onlyImagesAllowed'));
      return;
    }

    if (file.size > BUCKET_MAX_FILE_SIZE) {
      const maxSize = (BUCKET_MAX_FILE_SIZE / 1024 / 1024).toFixed();
      toast.error(t('messages.fileTooLarge', { maxSize }));
      return;
    }

    if (isLoading) {
      toast.error(t('messages.uploadInProgress'));
      return;
    }

    try {
      // Upload file to storage
      const fileName = `${path}/${uuidv4()}`;
      const fileUpload = await uploadFile({ bucket: BUCKET_IMAGES, fileName, file });
      const fileUrl = getPublicUrl({ bucket: BUCKET_IMAGES, path: fileUpload.path });

      // Update form with the file URL
      form.setValue(name, fileUrl.publicUrl, { shouldDirty: true });

      // Close the popover
      setOpen(false);
    } catch (error) {
      // Display error to user
      toast.error(error instanceof Error ? error.message : t('messages.uploadFailed'));
    }
  };

  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        {children}
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-64"
        sideOffset={16}
        collisionPadding={16}
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name={name}
            render={() => (
              <FormItem>
                <FormLabel>{t('uploadFile')}</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" onClick={() => setOpen(false)} disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? t('uploading') : t('close')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FormFileUploader;

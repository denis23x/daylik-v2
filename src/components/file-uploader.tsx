'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useUploadFile } from '@/hooks/useFiles';
import { getPublicUrl } from '@/lib/api/files';
import { v4 as uuidv4 } from 'uuid';

// TODO: env
const BUCKET = 'avatars';
const MAX_FILE_SIZE = 1 * 1024 * 1024;

const FileUploader = ({ name, children }: { name: string; children: React.ReactNode }) => {
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  const { mutateAsync: uploadFile, isPending: isLoading } = useUploadFile();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Early validation checks
    if (!file) {
      toast.warning('No file selected');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File is too large (max 1MB)');
      return;
    }

    if (isLoading) {
      toast.error('Upload already in progress');
      return;
    }

    try {
      // Upload file to storage
      const fileName = uuidv4();
      const fileUpload = await uploadFile({ bucket: BUCKET, fileName, file });
      const fileUrl = getPublicUrl({ bucket: BUCKET, path: fileUpload.path });

      // Update form with the file URL
      form.setValue(name, fileUrl.publicUrl, { shouldDirty: true });

      // Close the popover
      setOpen(false);
    } catch (error) {
      // Display error to user
      toast.error(error instanceof Error ? error.message : 'Failed to upload file');
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
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
                <FormLabel>Upload file</FormLabel>
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
            {isLoading ? 'Uploading' : 'Close'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FileUploader;

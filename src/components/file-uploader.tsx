'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { supabase } from '@/utils/supabase/client';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Max file size 1MB
const MAX_FILE_SIZE = 1 * 1024 * 1024;

const FileUploader = ({ name, children }: { name: string; children: React.ReactNode }) => {
  const form = useFormContext();

  const [open, setOpen] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

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

    if (isUploading) {
      toast.error('Upload already in progress');
      return;
    }

    // Start uploading
    setIsUploading(true);

    try {
      // Upload file to Supabase storage
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from('avatars').upload(fileName, file);

      if (error) {
        toast.error(error.message);
        return;
      }

      // Get public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);

      // Update form with the file URL
      form.setValue(name, data.publicUrl, { shouldDirty: true });

      // Close the popover
      setOpen(false);
    } catch (error) {
      // Display error to user
      toast.error(error instanceof Error ? error.message : 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()} className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Upload file</h4>
          <FormField
            control={form.control}
            name={name}
            render={() => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" onClick={() => setOpen(false)} disabled={isUploading}>
            {isUploading && <Loader2 className="animate-spin" />}
            {isUploading ? 'Uploading' : 'Close'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FileUploader;

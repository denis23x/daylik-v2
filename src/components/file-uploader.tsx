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

const FileUploader = ({ children }: { children: React.ReactNode }) => {
  const form = useFormContext();

  const [open, setOpen] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      setIsUploading(true);

      // Upload file to Supabase storage
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from('avatars').upload(fileName, file);

      if (error) {
        toast.error(error.message);
      }

      // Get public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);

      // Update form with the file URL
      form.setValue('avatar', data.publicUrl);
      setOpen(false);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Upload file</h4>
          <FormField
            control={form.control}
            name="avatar"
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

'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { FeedbackSchema } from './form-schema';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Angry, Annoyed, Laugh } from 'lucide-react';

const FeedbackFormFields = () => {
  const form = useFormContext<z.infer<typeof FeedbackSchema>>();

  return (
    <>
      <FormField
        control={form.control}
        name="priority"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>Priority</FormLabel>
            <FormControl>
              <ToggleGroup
                variant="outline"
                type="single"
                value={field.value}
                onValueChange={field.onChange}
                disabled={formState.isSubmitting}
                className="w-full"
              >
                <ToggleGroupItem className="cursor-pointer" value="low">
                  <Laugh />
                  Low
                </ToggleGroupItem>
                <ToggleGroupItem className="cursor-pointer" value="medium">
                  <Annoyed />
                  Medium
                </ToggleGroupItem>
                <ToggleGroupItem className="cursor-pointer" value="high">
                  <Angry />
                  High
                </ToggleGroupItem>
              </ToggleGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="message"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>
              Message
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                disabled={formState.isSubmitting}
                placeholder="Details, suggestions, or issues.."
                className="min-h-28"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export { FeedbackFormFields };

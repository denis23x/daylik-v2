import { supabase } from '@/utils/supabase/client';

export function getFilenameFromUrl(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

export async function deleteFile(bucket: string, url: string): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([getFilenameFromUrl(url)]);
  if (error) throw error;
}

export async function uploadFile(bucket: string, fileName: string, file: File): Promise<void> {
  const { error } = await supabase.storage.from(bucket).upload(fileName, file);
  if (error) throw error;
}

export function getPublicUrl(bucket: string, fileName: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return data.publicUrl;
}

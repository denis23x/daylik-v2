import { supabase } from '@/utils/supabase/client';
import { BUCKET_IMAGES } from '../constants';

type UploadFileParams = {
  bucket: string;
  fileName: string;
  file: File;
};

type DeleteFileParams = {
  bucket: string;
  paths: string[];
};

type GetPublicUrlParams = {
  bucket: string;
  path: string;
};

export function getFilePath(url: string): string {
  const parts = url.split(`/${BUCKET_IMAGES}/`);
  return parts[parts.length - 1];
}

export async function deleteFiles({ bucket, paths }: DeleteFileParams) {
  const { data, error } = await supabase.storage.from(bucket).remove(paths);
  if (error) throw error;
  return data;
}

export async function uploadFile({ bucket, fileName, file }: UploadFileParams) {
  const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
  if (error) throw error;
  return data;
}

export function getPublicUrl({ bucket, path }: GetPublicUrlParams) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data;
}

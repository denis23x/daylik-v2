import { supabase } from '@/utils/supabase/client';

type UploadFileParams = {
  bucket: string;
  fileName: string;
  file: File;
};

type UploadFileResponse = {
  id: string;
  path: string;
  fullPath: string;
};

type DeleteFileParams = {
  bucket: string;
  paths: string[];
};

type DeleteFileResponse = {
  name: string;
  bucket_id: string;
  owner: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: Record<string, any>;
};

type GetPublicUrlParams = {
  bucket: string;
  path: string;
};

type GetPublicUrlResponse = {
  publicUrl: string;
};

export function getFilePath(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

export async function deleteFiles({
  bucket,
  paths,
}: DeleteFileParams): Promise<DeleteFileResponse[] | null> {
  const { data, error } = await supabase.storage.from(bucket).remove(paths);
  if (error) throw error;
  return data;
}

export async function uploadFile({
  bucket,
  fileName,
  file,
}: UploadFileParams): Promise<UploadFileResponse> {
  const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
  if (error) throw error;
  return data;
}

export function getPublicUrl({ bucket, path }: GetPublicUrlParams): GetPublicUrlResponse {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data;
}

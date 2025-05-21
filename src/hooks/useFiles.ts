import { useMutation } from '@tanstack/react-query';
import { deleteFile, uploadFile, getPublicUrl } from '@/lib/api/files';

export function useUploadFile(bucket: string) {
  return useMutation({
    mutationFn: async ({ fileName, file }: { fileName: string; file: File }) => {
      return uploadFile(bucket, fileName, file).then(() => getPublicUrl(bucket, fileName));
    },
  });
}

export function useDeleteFile(bucket: string) {
  return useMutation({
    mutationFn: async (url: string) => deleteFile(bucket, url),
  });
}

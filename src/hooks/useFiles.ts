import { useMutation } from '@tanstack/react-query';
import { deleteFiles, uploadFile } from '@/lib/api/files';

export function useUploadFile() {
  return useMutation({
    mutationFn: uploadFile,
  });
}

export function useDeleteFiles() {
  return useMutation({
    mutationFn: deleteFiles,
  });
}

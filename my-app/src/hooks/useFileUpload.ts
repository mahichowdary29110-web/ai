import { useState, useCallback } from 'react';
import { apiService } from '@/services/api';
import { FileUpload } from '@/types';
import { generateId, formatFileSize } from '@/utils/helpers';
import toast from 'react-hot-toast';

export function useFileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = useCallback(async (file: File) => {
    setIsUploading(true);

    try {
      const result = await apiService.uploadFile(file);

      if (!result.success) {
        toast.error(result.error || 'Upload failed');
        return null;
      }

      const fileUpload: FileUpload = {
        id: generateId(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: result.data!.url,
        preview: result.data!.preview,
      };

      setUploadedFiles((prev) => [...prev, fileUpload]);
      toast.success(`${file.name} uploaded successfully`);
      
      return fileUpload;
    } catch (error) {
      toast.error('Upload failed. Please try again.');
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  }, []);

  const clearFiles = useCallback(() => {
    setUploadedFiles([]);
  }, []);

  return {
    uploadedFiles,
    isUploading,
    uploadFile,
    removeFile,
    clearFiles,
  };
}

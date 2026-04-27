import { useState, KeyboardEvent, useRef } from 'react';
import { Send, Paperclip, X, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useFileUpload } from '@/hooks/useFileUpload';
import { cn } from '@/utils/helpers';
import { formatFileSize } from '@/utils/helpers';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder = 'Type your message...' }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadedFiles, isUploading, uploadFile, removeFile } = useFileUpload();

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    onSend(message.trim());
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      await uploadFile(files[i]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
      {uploadedFiles.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              {file.type.startsWith('image/') ? (
                <ImageIcon className="w-4 h-4 text-gray-500" />
              ) : (
                <FileText className="w-4 h-4 text-gray-500" />
              )}
              <span className="text-sm text-gray-900 dark:text-gray-100">
                {file.name}
              </span>
              <span className="text-xs text-gray-500">
                {formatFileSize(file.size)}
              </span>
              <button
                onClick={() => removeFile(file.id)}
                className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        <Button
          variant="ghost"
          size="md"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading}
          className="flex-shrink-0"
        >
          <Paperclip className="w-5 h-5" />
        </Button>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={cn(
            'flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg resize-none',
            'text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'max-h-[200px] overflow-y-auto'
          )}
        />

        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          size="md"
          className="flex-shrink-0"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>

      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Press Enter to send, Shift + Enter for new line
      </div>
    </div>
  );
}

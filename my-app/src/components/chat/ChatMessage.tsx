import { memo } from 'react';
import { User, Bot, AlertCircle } from 'lucide-react';
import { Message } from '@/types';
import { cn } from '@/utils/helpers';
import { MessageSkeleton } from '@/components/ui/Skeleton';

interface ChatMessageProps {
  message: Message;
  onRetry?: () => void;
}

export const ChatMessage = memo(({ message, onRetry }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-4 p-6',
        isUser ? 'bg-transparent' : 'bg-gray-50 dark:bg-gray-800/50'
      )}
    >
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-green-600 text-white'
        )}
      >
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      <div className="flex-1 space-y-2 min-w-0">
        <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">
          {isUser ? 'You' : 'AI Assistant'}
        </div>

        {message.isStreaming ? (
          <MessageSkeleton />
        ) : message.error ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Failed to generate response</span>
            </div>
            {onRetry && (
              <button
                onClick={onRetry}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Retry
              </button>
            )}
          </div>
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400">
          {message.timestamp.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

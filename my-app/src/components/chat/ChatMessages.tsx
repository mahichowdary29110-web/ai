import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '@/types';
import { MessageSquare } from 'lucide-react';

interface ChatMessagesProps {
  messages: Message[];
  onRetry?: (content: string) => void;
}

export function ChatMessages({ messages, onRetry }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Start a conversation
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Send a message to begin chatting with AI
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          onRetry={message.error && onRetry ? () => onRetry(message.content) : undefined}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

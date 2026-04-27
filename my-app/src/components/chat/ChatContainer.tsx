import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useChat } from '@/hooks/useChat';

export function ChatContainer() {
  const { sendMessage, retryMessage, isLoading, activeConversation } = useChat();

  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatHeader />
      <ChatMessages
        messages={activeConversation?.messages || []}
        onRetry={retryMessage}
      />
      <ChatInput
        onSend={sendMessage}
        disabled={isLoading}
        placeholder="Type your message..."
      />
    </div>
  );
}

'use client';

import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useChat } from '@/hooks/useChat';

export function ChatContainer() {
  const { sendMessage, retryMessage, isLoading, activeConversation } = useChat();

  return (
    <div style={{ marginLeft: '260px', display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#ffffff' }}>
      <ChatHeader />
      <ChatMessages
        messages={activeConversation?.messages || []}
        onRetry={retryMessage}
      />
      <ChatInput
        onSend={sendMessage}
        disabled={isLoading}
        placeholder="Ask anything"
      />
    </div>
  );
}

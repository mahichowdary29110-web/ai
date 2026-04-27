import { useState, useCallback } from 'react';
import { useChatStore } from '@/store/chatStore';
import { apiService } from '@/services/api';
import { generateId } from '@/utils/helpers';
import { Message } from '@/types';
import toast from 'react-hot-toast';

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  
  const {
    activeConversationId,
    selectedChatType,
    selectedModel,
    addMessage,
    updateMessage,
    createConversation,
    getActiveConversation,
  } = useChatStore();

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    let conversationId = activeConversationId;
    
    if (!conversationId) {
      createConversation();
      conversationId = useChatStore.getState().activeConversationId;
    }

    if (!conversationId) return;

    setIsLoading(true);

    try {
      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };

      addMessage(conversationId, userMessage);

      const assistantMessageId = generateId();
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };

      addMessage(conversationId, assistantMessage);
      setIsStreaming(true);

      const stream = apiService.streamResponse(content, selectedChatType, selectedModel);

      for await (const chunk of stream) {
        updateMessage(conversationId, assistantMessageId, chunk.content);
      }

      setIsStreaming(false);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Send message error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [activeConversationId, selectedChatType, selectedModel, isLoading, addMessage, updateMessage, createConversation]);

  const retryMessage = useCallback(async (messageContent: string) => {
    await sendMessage(messageContent);
  }, [sendMessage]);

  return {
    sendMessage,
    retryMessage,
    isLoading,
    isStreaming,
    activeConversation: getActiveConversation(),
  };
}

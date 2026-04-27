import { create } from 'zustand';
import { Conversation, Message, ChatType, ModelType, User } from '@/types';
import { generateId, truncateText } from '@/utils/helpers';
import { mockConversations } from '@/lib/mockData';

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  selectedChatType: ChatType;
  selectedModel: ModelType;
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  setActiveConversation: (id: string) => void;
  createConversation: () => void;
  addMessage: (conversationId: string, message: Message) => void;
  updateMessage: (conversationId: string, messageId: string, content: string) => void;
  deleteConversation: (id: string) => void;
  setChatType: (type: ChatType) => void;
  setModel: (model: ModelType) => void;
  login: (user: User) => void;
  logout: () => void;
  getActiveConversation: () => Conversation | null;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: mockConversations,
  activeConversationId: mockConversations[0]?.id || null,
  selectedChatType: 'qa',
  selectedModel: 'gpt-4',
  user: null,
  isAuthenticated: false,

  setActiveConversation: (id) => set({ activeConversationId: id }),

  createConversation: () => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      chatType: get().selectedChatType,
      model: get().selectedModel,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      conversations: [newConversation, ...state.conversations],
      activeConversationId: newConversation.id,
    }));
  },

  addMessage: (conversationId, message) => {
    set((state) => ({
      conversations: state.conversations.map((conv) => {
        if (conv.id === conversationId) {
          const updatedMessages = [...conv.messages, message];
          const title = conv.messages.length === 0 && message.role === 'user'
            ? truncateText(message.content, 50)
            : conv.title;

          return {
            ...conv,
            messages: updatedMessages,
            title,
            updatedAt: new Date(),
          };
        }
        return conv;
      }),
    }));
  },

  updateMessage: (conversationId, messageId, content) => {
    set((state) => ({
      conversations: state.conversations.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: conv.messages.map((msg) =>
              msg.id === messageId ? { ...msg, content, isStreaming: false } : msg
            ),
            updatedAt: new Date(),
          };
        }
        return conv;
      }),
    }));
  },

  deleteConversation: (id) => {
    set((state) => {
      const filtered = state.conversations.filter((conv) => conv.id !== id);
      const newActiveId = state.activeConversationId === id
        ? filtered[0]?.id || null
        : state.activeConversationId;

      return {
        conversations: filtered,
        activeConversationId: newActiveId,
      };
    });
  },

  setChatType: (type) => set({ selectedChatType: type }),

  setModel: (model) => set({ selectedModel: model }),

  login: (user) => set({ user, isAuthenticated: true }),

  logout: () => set({ user: null, isAuthenticated: false }),

  getActiveConversation: () => {
    const state = get();
    return state.conversations.find((conv) => conv.id === state.activeConversationId) || null;
  },
}));

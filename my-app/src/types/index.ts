export type MessageRole = 'user' | 'assistant' | 'system';

export type ChatType = 'qa' | 'summary' | 'image-analysis';

export type ModelType = 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3' | 'claude-2' | 'gemini-pro';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  error?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  chatType: ChatType;
  model: ModelType;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface FileUpload {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  preview?: string;
}

export interface ChatConfig {
  chatTypes: Array<{
    value: ChatType;
    label: string;
    description: string;
  }>;
  models: Array<{
    value: ModelType;
    label: string;
    description: string;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface StreamResponse {
  content: string;
  done: boolean;
}

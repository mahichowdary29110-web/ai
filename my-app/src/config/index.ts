import { ChatConfig } from '@/types';

export const chatConfig: ChatConfig = {
  chatTypes: [
    {
      value: 'qa',
      label: 'Q&A',
      description: 'Ask questions and get answers',
    },
    {
      value: 'summary',
      label: 'Summary',
      description: 'Summarize text or documents',
    },
    {
      value: 'image-analysis',
      label: 'Image Analysis',
      description: 'Analyze and describe images',
    },
  ],
  models: [
    {
      value: 'gpt-4',
      label: 'GPT-4',
      description: 'Most capable model',
    },
    {
      value: 'gpt-3.5-turbo',
      label: 'GPT-3.5 Turbo',
      description: 'Fast and efficient',
    },
    {
      value: 'claude-3',
      label: 'Claude 3',
      description: 'Anthropic\'s latest model',
    },
    {
      value: 'claude-2',
      label: 'Claude 2',
      description: 'Previous generation',
    },
    {
      value: 'gemini-pro',
      label: 'Gemini Pro',
      description: 'Google\'s advanced model',
    },
  ],
};

export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'AI Chat',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  enableAuth: process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  streamDelay: 30,
  maxRetries: 3,
};

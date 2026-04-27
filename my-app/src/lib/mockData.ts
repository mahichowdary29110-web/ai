import { Conversation, Message } from '@/types';

export const mockMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'What is artificial intelligence?',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. It encompasses various technologies including machine learning, natural language processing, computer vision, and robotics. AI systems can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation.',
    timestamp: new Date(Date.now() - 3500000),
  },
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    title: 'What is artificial intelligence?',
    messages: mockMessages,
    chatType: 'qa',
    model: 'gpt-4',
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3500000),
  },
  {
    id: 'conv-2',
    title: 'Summarize machine learning concepts',
    messages: [
      {
        id: '3',
        role: 'user',
        content: 'Can you summarize the key concepts of machine learning?',
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: '4',
        role: 'assistant',
        content: 'Machine learning is a subset of AI focused on algorithms that improve through experience. Key concepts include: supervised learning (learning from labeled data), unsupervised learning (finding patterns in unlabeled data), reinforcement learning (learning through trial and error), neural networks (inspired by biological neurons), and deep learning (multi-layered neural networks).',
        timestamp: new Date(Date.now() - 86300000),
      },
    ],
    chatType: 'summary',
    model: 'claude-3',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86300000),
  },
  {
    id: 'conv-3',
    title: 'Python best practices',
    messages: [
      {
        id: '5',
        role: 'user',
        content: 'What are some Python best practices?',
        timestamp: new Date(Date.now() - 172800000),
      },
    ],
    chatType: 'qa',
    model: 'gpt-3.5-turbo',
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000),
  },
];

export const mockAIResponses = [
  "That's a great question! Let me help you with that.",
  "Based on my understanding, here's what I can tell you:",
  "I'd be happy to explain this concept to you.",
  "Let me break this down for you in a clear way.",
  "Here's a comprehensive answer to your question:",
];

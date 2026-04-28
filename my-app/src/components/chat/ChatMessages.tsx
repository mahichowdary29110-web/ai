'use client';

import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '@/types';

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
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        maxWidth: '768px',
        margin: '0 auto',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '400',
          color: '#111827',
          marginBottom: '0',
          textAlign: 'center'
        }}>Where should we begin?</h1>
      </div>
    );
  }

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        maxWidth: '768px',
        width: '100%',
        margin: '0 auto',
        padding: '24px'
      }}>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onRetry={message.error && onRetry ? () => onRetry(message.content) : undefined}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

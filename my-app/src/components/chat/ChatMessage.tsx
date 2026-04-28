'use client';

import { memo } from 'react';
import { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
  onRetry?: () => void;
}

export const ChatMessage = memo(({ message, onRetry }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '24px 0',
      borderBottom: '1px solid #f3f4f6'
    }}>
      {/* Avatar */}
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isUser ? '#10a37f' : '#ab68ff',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '600'
      }}>
        {isUser ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 8L12 14L9 8L12 2Z"/>
            <circle cx="12" cy="18" r="3"/>
          </svg>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '8px'
        }}>
          {isUser ? 'You' : 'ChatGPT'}
        </div>

        {message.error ? (
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#ef4444',
              fontSize: '14px',
              marginBottom: '8px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Failed to generate response
            </div>
            {onRetry && (
              <button
                onClick={onRetry}
                style={{
                  fontSize: '14px',
                  color: '#2563eb',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0
                }}
              >
                Retry
              </button>
            )}
          </div>
        ) : (
          <div style={{
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#374151',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            {message.content}
          </div>
        )}

        <div style={{
          fontSize: '12px',
          color: '#9ca3af',
          marginTop: '8px'
        }}>
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

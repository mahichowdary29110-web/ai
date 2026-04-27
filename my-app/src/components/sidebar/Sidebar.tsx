'use client';

import { useChatStore } from '@/store/chatStore';
import { formatDate } from '@/utils/helpers';

export function Sidebar() {
  const { conversations, activeConversationId, setActiveConversation, createConversation, deleteConversation } = useChatStore();

  const groupedConversations = conversations.reduce((acc, conv) => {
    const dateKey = formatDate(conv.updatedAt);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(conv);
    return acc;
  }, {} as Record<string, typeof conversations>);

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      backgroundColor: '#171717',
      borderRight: '1px solid #2d2d2d',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100
    }}>
      {/* Logo */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #2d2d2d',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 2L15 8L12 14L9 8L12 2Z"/>
            <circle cx="12" cy="18" r="3"/>
          </svg>
        </div>
        <span style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff'
        }}>AI Chat Pro</span>
      </div>

      {/* New Chat Button */}
      <div style={{ padding: '12px' }}>
        <button
          onClick={createConversation}
          style={{
            width: '100%',
            padding: '10px 14px',
            backgroundColor: 'transparent',
            border: '1px solid #3d3d3d',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2d2d2d';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          New chat
        </button>
      </div>

      {/* Navigation Items */}
      <div style={{ padding: '0 12px', marginBottom: '12px' }}>
        <button style={{
          width: '100%',
          padding: '10px 14px',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '8px',
          color: '#b4b4b4',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textAlign: 'left',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#2d2d2d';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#b4b4b4';
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          Search chats
        </button>
      </div>

      {/* Chat History */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0 12px'
      }}>
        {Object.entries(groupedConversations).map(([date, convs]) => (
          <div key={date} style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '600',
              color: '#6b6b6b',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '8px',
              padding: '0 8px'
            }}>
              {date}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {convs.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversation(conv.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: activeConversationId === conv.id ? '#2d2d2d' : 'transparent',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    position: 'relative',
                    group: 'true'
                  }}
                  onMouseEnter={(e) => {
                    if (activeConversationId !== conv.id) {
                      e.currentTarget.style.backgroundColor = '#232323';
                    }
                    const deleteBtn = e.currentTarget.querySelector('.delete-btn') as HTMLElement;
                    if (deleteBtn) deleteBtn.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    if (activeConversationId !== conv.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                    const deleteBtn = e.currentTarget.querySelector('.delete-btn') as HTMLElement;
                    if (deleteBtn) deleteBtn.style.opacity = '0';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    flex: 1,
                    minWidth: 0
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b4b4b4" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span style={{
                      fontSize: '14px',
                      color: '#e5e5e5',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {conv.title}
                    </span>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv.id);
                    }}
                    style={{
                      opacity: 0,
                      padding: '4px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#3d3d3d';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b4b4b4" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div style={{
        padding: '12px',
        borderTop: '1px solid #2d2d2d'
      }}>
        <button style={{
          width: '100%',
          padding: '10px 12px',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#2d2d2d';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '600',
            color: '#ffffff'
          }}>
            U
          </div>
          <span style={{
            fontSize: '14px',
            color: '#e5e5e5',
            fontWeight: '500'
          }}>User</span>
        </button>
      </div>
    </aside>
  );
}

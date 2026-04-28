'use client';

import { useChatStore } from '@/store/chatStore';
import { Login } from '@/components/auth/Login';
import { appConfig } from '@/config';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { ChatContainer } from '@/components/chat/ChatContainer';

export function App() {
  const isAuthenticated = useChatStore((state) => state.isAuthenticated);

  if (appConfig.enableAuth && !isAuthenticated) {
    return <Login />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#ffffff', overflow: 'hidden' }}>
      <Sidebar />
      <ChatContainer />
    </div>
  );
}

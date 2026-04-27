'use client';

import { Sidebar } from '@/components/sidebar/Sidebar';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { Login } from '@/components/auth/Login';
import { useChatStore } from '@/store/chatStore';
import { appConfig } from '@/config';

export function App() {
  const isAuthenticated = useChatStore((state) => state.isAuthenticated);

  if (appConfig.enableAuth && !isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar />
      <ChatContainer />
    </div>
  );
}

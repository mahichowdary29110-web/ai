import { Moon, Sun, LogOut, Settings } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { useChatStore } from '@/store/chatStore';
import { Dropdown } from '@/components/ui/Dropdown';
import { Button } from '@/components/ui/Button';
import { chatConfig } from '@/config';
import { ChatType, ModelType } from '@/types';

export function ChatHeader() {
  const { theme, toggleTheme } = useThemeStore();
  const { selectedChatType, selectedModel, setChatType, setModel, user, logout } = useChatStore();

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            AI Chat
          </h1>

          <div className="hidden md:flex items-center gap-3">
            <Dropdown
              options={chatConfig.chatTypes}
              value={selectedChatType}
              onChange={(value) => setChatType(value as ChatType)}
              className="w-48"
            />

            <Dropdown
              options={chatConfig.models}
              value={selectedModel}
              onChange={(value) => setModel(value as ModelType)}
              className="w-48"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <div className="hidden sm:flex items-center gap-3 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {user.name}
              </span>
            </div>
          )}

          <Button variant="ghost" size="md" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {user && (
            <Button variant="ghost" size="md" onClick={logout}>
              <LogOut className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile dropdowns */}
      <div className="md:hidden flex items-center gap-3 mt-4">
        <Dropdown
          options={chatConfig.chatTypes}
          value={selectedChatType}
          onChange={(value) => setChatType(value as ChatType)}
          className="flex-1"
        />

        <Dropdown
          options={chatConfig.models}
          value={selectedModel}
          onChange={(value) => setModel(value as ModelType)}
          className="flex-1"
        />
      </div>
    </header>
  );
}

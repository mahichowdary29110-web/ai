# AI Chat Application

A production-ready AI chat application built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Zustand.

## Features

### Core Features
- ✅ ChatGPT-like UI with sidebar and chat area
- ✅ Real-time message streaming simulation
- ✅ Multiple chat types (Q&A, Summary, Image Analysis)
- ✅ Model selection (GPT-4, GPT-3.5, Claude, Gemini)
- ✅ File upload with preview (images, PDFs)
- ✅ Dark/Light mode with persistent theme
- ✅ Responsive design (desktop + tablet)
- ✅ Chat history management
- ✅ Mock authentication system
- ✅ Error handling with retry mechanism
- ✅ Toast notifications
- ✅ Loading states and skeletons

### Technical Features
- ✅ Clean architecture with separation of concerns
- ✅ TypeScript for type safety
- ✅ Zustand for state management
- ✅ Custom hooks for reusable logic
- ✅ Mock API service layer
- ✅ Config-driven UI
- ✅ Optimized rendering with React.memo
- ✅ Smooth animations and transitions

## Project Structure

```
my-app/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── Login.tsx   # Authentication component
│   │   ├── chat/
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   └── ChatMessages.tsx
│   │   ├── sidebar/
│   │   │   └── Sidebar.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Skeleton.tsx
│   │   ├── App.tsx
│   │   └── ThemeProvider.tsx
│   ├── config/
│   │   └── index.ts        # App configuration
│   ├── hooks/
│   │   ├── useChat.ts      # Chat logic hook
│   │   └── useFileUpload.ts
│   ├── lib/
│   │   └── mockData.ts     # Mock data
│   ├── services/
│   │   └── api.ts          # API service layer
│   ├── store/
│   │   ├── chatStore.ts    # Chat state management
│   │   └── themeStore.ts   # Theme state management
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   └── utils/
│       └── helpers.ts      # Utility functions
├── .env.local              # Environment variables
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Authentication
- The app includes a mock authentication system
- Enter any name and email to sign in
- Toggle authentication in `.env.local` with `NEXT_PUBLIC_ENABLE_AUTH`

### Chat Features
1. **Create New Chat**: Click "New Chat" button in sidebar
2. **Select Chat Type**: Choose from Q&A, Summary, or Image Analysis
3. **Select Model**: Choose from GPT-4, Claude, Gemini, etc.
4. **Send Messages**: Type and press Enter (Shift+Enter for new line)
5. **Upload Files**: Click paperclip icon to attach images or PDFs
6. **Switch Chats**: Click on any conversation in the sidebar
7. **Delete Chats**: Hover over a chat and click the trash icon
8. **Toggle Theme**: Click sun/moon icon in header

### Keyboard Shortcuts
- `Enter`: Send message
- `Shift + Enter`: New line in message

## Configuration

### Environment Variables (.env.local)
```env
NEXT_PUBLIC_APP_NAME=AI Chat
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_ENABLE_AUTH=true
```

### Chat Configuration (src/config/index.ts)
- Add/remove chat types
- Add/remove AI models
- Configure file upload limits
- Adjust streaming speed
- Set retry attempts

## Mock API Service

The app includes a complete mock API service that simulates:
- Message sending with delays
- Streaming responses (word-by-word)
- File uploads with validation
- Random failures for testing error handling
- Retry mechanism

### Simulating Failures
```typescript
import { apiService } from '@/services/api';

// Set failure rate (0-1)
apiService.setFailureRate(0.2); // 20% failure rate
```

## State Management

### Chat Store (Zustand)
- Manages conversations and messages
- Handles active conversation
- Controls chat type and model selection
- User authentication state

### Theme Store (Zustand)
- Manages dark/light mode
- Persists theme preference to localStorage

## Backend Integration

To integrate with a real backend:

1. **Update API Service** (`src/services/api.ts`):
   - Replace mock delays with actual HTTP calls
   - Use fetch/axios for API requests
   - Update endpoints in `.env.local`

2. **Add Authentication**:
   - Implement JWT token management
   - Add protected routes
   - Update login/logout logic

3. **WebSocket for Streaming**:
   - Replace mock streaming with WebSocket
   - Handle real-time message updates

Example:
```typescript
// src/services/api.ts
async sendMessage(content: string) {
  const response = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  return response.json();
}
```

## Customization

### Adding New Chat Types
1. Update `ChatType` in `src/types/index.ts`
2. Add configuration in `src/config/index.ts`
3. Update mock response logic in `src/services/api.ts`

### Adding New Models
1. Update `ModelType` in `src/types/index.ts`
2. Add to models array in `src/config/index.ts`

### Styling
- All styles use Tailwind CSS
- Theme colors defined in `globals.css`
- Component-specific styles in respective files

## Performance Optimizations

- React.memo for message components
- Lazy loading for heavy components
- Optimized re-renders with Zustand selectors
- Smooth scrolling with refs
- Debounced file uploads

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Type Errors
```bash
# Regenerate types
npm run build
```

## Future Enhancements

- [ ] Voice input/output
- [ ] Code syntax highlighting
- [ ] Export conversations
- [ ] Search in chat history
- [ ] Multi-language support
- [ ] Conversation sharing
- [ ] Custom system prompts
- [ ] Token usage tracking

## License

MIT

## Author

Built with ❤️ using Next.js and React

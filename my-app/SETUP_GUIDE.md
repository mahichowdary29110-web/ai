# AI Chat Application - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd my-app
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## First Time Usage

### Login
1. You'll see a login screen (if authentication is enabled)
2. Enter any name and email (e.g., "John Doe", "john@example.com")
3. Click "Sign In"

### Start Chatting
1. Click "New Chat" to create a conversation
2. Select chat type (Q&A, Summary, Image Analysis)
3. Select AI model (GPT-4, Claude, etc.)
4. Type a message and press Enter
5. Watch the AI response stream in real-time

## Features Demo

### Chat Types
- **Q&A**: General questions and answers
- **Summary**: Text summarization
- **Image Analysis**: Image description and analysis

### File Upload
1. Click the paperclip icon in the input area
2. Select an image or PDF file
3. Preview appears above the input
4. Remove files by clicking the X icon

### Theme Toggle
- Click the sun/moon icon in the header
- Theme preference is saved automatically

### Chat Management
- **New Chat**: Click "New Chat" button
- **Switch Chat**: Click any conversation in sidebar
- **Delete Chat**: Hover over chat and click trash icon

## Configuration

### Disable Authentication
Edit `.env.local`:
```env
NEXT_PUBLIC_ENABLE_AUTH=false
```

### Adjust Streaming Speed
Edit `src/config/index.ts`:
```typescript
streamDelay: 30, // milliseconds between words (lower = faster)
```

### Simulate API Failures
In your code:
```typescript
import { apiService } from '@/services/api';
apiService.setFailureRate(0.2); // 20% failure rate
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

## Folder Structure Overview

```
src/
├── components/      # React components
│   ├── auth/       # Authentication components
│   ├── chat/       # Chat-related components
│   ├── sidebar/    # Sidebar components
│   └── ui/         # Reusable UI components
├── config/         # App configuration
├── hooks/          # Custom React hooks
├── lib/            # Utilities and mock data
├── services/       # API service layer
├── store/          # Zustand state management
├── types/          # TypeScript type definitions
└── utils/          # Helper functions
```

## Key Files

- `src/store/chatStore.ts` - Chat state management
- `src/services/api.ts` - Mock API service
- `src/config/index.ts` - App configuration
- `src/types/index.ts` - TypeScript types
- `.env.local` - Environment variables

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Clear Cache
```bash
rm -rf .next
npm run dev
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

### Backend Integration
1. Replace mock API in `src/services/api.ts`
2. Add real authentication
3. Implement WebSocket for streaming
4. Connect to your AI backend

### Customization
1. Add new chat types in `src/config/index.ts`
2. Add new models in `src/config/index.ts`
3. Customize theme colors in `app/globals.css`
4. Add new features in respective component folders

## Production Deployment

### Build
```bash
npm run build
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Other Platforms
The app is a standard Next.js application and can be deployed to:
- Vercel
- Netlify
- AWS Amplify
- Docker
- Any Node.js hosting

## Support

For issues or questions:
1. Check the main README.md
2. Review the code comments
3. Check Next.js documentation
4. Review Zustand documentation

## License

MIT

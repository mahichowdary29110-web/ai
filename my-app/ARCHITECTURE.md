# Architecture Documentation

## Overview

This AI Chat application follows clean architecture principles with clear separation of concerns, making it maintainable, testable, and scalable.

## Architecture Layers

### 1. Presentation Layer (Components)
**Location**: `src/components/`

Responsible for UI rendering and user interactions.

#### Component Structure:
- **auth/**: Authentication components (Login)
- **chat/**: Chat-related components (ChatContainer, ChatHeader, ChatInput, ChatMessage, ChatMessages)
- **sidebar/**: Sidebar navigation (Sidebar)
- **ui/**: Reusable UI components (Button, Input, Dropdown, Modal, Skeleton)

#### Design Patterns:
- **Container/Presenter Pattern**: ChatContainer manages logic, child components handle presentation
- **Composition**: Small, focused components composed together
- **Memoization**: React.memo for performance optimization

### 2. State Management Layer
**Location**: `src/store/`

Manages application state using Zustand.

#### Stores:
- **chatStore.ts**: Conversations, messages, active chat, user authentication
- **themeStore.ts**: Theme preference (dark/light mode)

#### Benefits:
- Centralized state management
- No prop drilling
- Persistent storage (theme)
- Easy to test and debug

### 3. Business Logic Layer (Hooks)
**Location**: `src/hooks/`

Custom hooks encapsulate reusable business logic.

#### Hooks:
- **useChat.ts**: Chat operations (send message, retry, streaming)
- **useFileUpload.ts**: File upload logic and validation

#### Benefits:
- Reusable across components
- Testable in isolation
- Separates logic from UI

### 4. Service Layer
**Location**: `src/services/`

Handles external communication (API calls).

#### Services:
- **api.ts**: Mock API service with streaming, file upload, retry logic

#### Features:
- Simulates real API behavior
- Error handling and retry mechanism
- Easy to replace with real backend

### 5. Configuration Layer
**Location**: `src/config/`

Centralized configuration for the application.

#### Config Files:
- **index.ts**: Chat types, models, app settings

#### Benefits:
- Single source of truth
- Easy to modify without touching components
- Environment-based configuration

### 6. Type Layer
**Location**: `src/types/`

TypeScript type definitions for type safety.

#### Types:
- Message, Conversation, User, FileUpload
- ChatType, ModelType, MessageRole
- API response types

### 7. Utility Layer
**Location**: `src/utils/`

Helper functions and utilities.

#### Utilities:
- **helpers.ts**: Date formatting, ID generation, file size formatting, etc.

## Data Flow

```
User Action
    ↓
Component (Presentation)
    ↓
Custom Hook (Business Logic)
    ↓
Store (State Management)
    ↓
Service (API Layer)
    ↓
Mock Backend
    ↓
Service Response
    ↓
Store Update
    ↓
Component Re-render
```

## State Management Flow

### Chat Flow:
1. User types message in ChatInput
2. ChatInput calls `sendMessage` from useChat hook
3. useChat hook:
   - Creates user message
   - Adds to store via `addMessage`
   - Calls API service
   - Streams response
   - Updates message in store via `updateMessage`
4. ChatMessages component re-renders with new messages

### File Upload Flow:
1. User selects file in ChatInput
2. ChatInput calls `uploadFile` from useFileUpload hook
3. useFileUpload hook:
   - Validates file
   - Calls API service
   - Returns file metadata
   - Shows toast notification
4. File preview appears in ChatInput

## Component Communication

### Props Down, Events Up:
- Parent components pass data via props
- Child components emit events via callbacks
- No direct component-to-component communication

### Global State:
- Zustand stores for shared state
- Components subscribe to specific state slices
- Automatic re-renders on state changes

## Performance Optimizations

### 1. Memoization
```typescript
export const ChatMessage = memo(({ message }) => {
  // Component only re-renders if message changes
});
```

### 2. Selective Store Subscriptions
```typescript
const isAuthenticated = useChatStore((state) => state.isAuthenticated);
// Only re-renders when isAuthenticated changes
```

### 3. Lazy Loading
- Components loaded on demand
- File uploads processed asynchronously

### 4. Optimized Scrolling
- useRef for scroll management
- Smooth scroll behavior
- No layout thrashing

## Error Handling

### Levels:
1. **Component Level**: Try-catch in event handlers
2. **Hook Level**: Error states and error callbacks
3. **Service Level**: API error responses
4. **Global Level**: Toast notifications

### Retry Mechanism:
```typescript
await apiService.retryRequest(
  () => apiService.sendMessage(content),
  maxRetries: 3
);
```

## Testing Strategy

### Unit Tests:
- Utility functions
- Custom hooks (with React Testing Library)
- Store actions

### Integration Tests:
- Component interactions
- API service with mock data
- State management flow

### E2E Tests:
- Complete user flows
- Authentication
- Chat creation and messaging

## Scalability Considerations

### Adding New Features:
1. Define types in `src/types/`
2. Add configuration in `src/config/`
3. Create service methods in `src/services/`
4. Add store actions in `src/store/`
5. Create custom hook if needed
6. Build UI components

### Backend Integration:
1. Replace mock API in `src/services/api.ts`
2. Add authentication tokens
3. Implement WebSocket for streaming
4. Update environment variables
5. No component changes needed

### Adding New Chat Types:
1. Add type to `ChatType` in types
2. Add config in `src/config/index.ts`
3. Update mock response logic in service
4. UI automatically updates via config

## Security Considerations

### Current (Mock):
- No real authentication
- Client-side only
- No sensitive data storage

### Production Recommendations:
- Implement JWT authentication
- HTTPS only
- Secure WebSocket (WSS)
- Input sanitization
- XSS protection
- CSRF tokens
- Rate limiting
- Content Security Policy

## Deployment Architecture

### Development:
```
Next.js Dev Server (Port 3000)
├── Hot Module Replacement
├── Fast Refresh
└── Source Maps
```

### Production:
```
Next.js Production Build
├── Static Generation (where possible)
├── Server-Side Rendering
├── API Routes (future)
└── Optimized Assets
```

## Future Enhancements

### Phase 1: Backend Integration
- Real API endpoints
- WebSocket streaming
- Database persistence
- User authentication

### Phase 2: Advanced Features
- Voice input/output
- Code syntax highlighting
- Conversation export
- Search functionality

### Phase 3: Enterprise Features
- Multi-user support
- Role-based access
- Analytics dashboard
- Admin panel

## Best Practices Implemented

1. **TypeScript**: Full type safety
2. **Clean Code**: Single responsibility principle
3. **DRY**: Reusable components and hooks
4. **Separation of Concerns**: Clear layer boundaries
5. **Config-Driven**: Easy to modify without code changes
6. **Error Handling**: Comprehensive error management
7. **Performance**: Optimized rendering
8. **Accessibility**: Semantic HTML and ARIA labels
9. **Responsive Design**: Mobile-first approach
10. **Dark Mode**: Theme support

## Maintenance Guidelines

### Code Style:
- Use TypeScript for all new files
- Follow existing naming conventions
- Add comments for complex logic
- Keep components small and focused

### State Management:
- Add new state to appropriate store
- Use selectors for performance
- Keep actions pure and simple

### Testing:
- Write tests for new features
- Maintain test coverage
- Test edge cases

### Documentation:
- Update README for new features
- Document complex algorithms
- Keep architecture docs current

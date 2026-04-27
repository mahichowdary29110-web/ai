# Backend Integration Guide

## Overview

This guide helps backend developers integrate the AI Chat frontend with their backend services.

## Current Mock Implementation

The app currently uses a mock API service (`src/services/api.ts`) that simulates:
- Message sending with delays
- Streaming responses
- File uploads
- Error scenarios

## Integration Steps

### 1. Update Environment Variables

Create or update `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_WS_URL=wss://your-api.com/ws
NEXT_PUBLIC_API_KEY=your-api-key
```

### 2. Replace Mock API Service

Update `src/services/api.ts`:

```typescript
import { ApiResponse, Message, ChatType, ModelType } from '@/types';

class ApiService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;
  private apiKey = process.env.NEXT_PUBLIC_API_KEY;

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
  }

  async sendMessage(
    content: string,
    conversationId: string,
    chatType: ChatType,
    model: ModelType
  ): Promise<ApiResponse<Message>> {
    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          content,
          conversationId,
          chatType,
          model,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async *streamResponse(
    userMessage: string,
    chatType: ChatType,
    model: ModelType
  ): AsyncGenerator<StreamResponse> {
    const response = await fetch(`${this.baseUrl}/stream`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ message: userMessage, chatType, model }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) throw new Error('No reader available');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6));
          yield {
            content: data.content,
            done: data.done,
          };
        }
      }
    }
  }

  async uploadFile(file: File): Promise<ApiResponse<{ url: string; preview?: string }>> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }
}

export const apiService = new ApiService();
```

### 3. WebSocket Integration (Alternative to Streaming)

For real-time streaming with WebSocket:

```typescript
class WebSocketService {
  private ws: WebSocket | null = null;
  private wsUrl = process.env.NEXT_PUBLIC_WS_URL;

  connect() {
    this.ws = new WebSocket(this.wsUrl!);
    
    this.ws.onopen = () => {
      console.log('WebSocket connected');
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message: string, onChunk: (chunk: string) => void) {
    if (!this.ws) this.connect();

    this.ws!.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onChunk(data.content);
    };

    this.ws!.send(JSON.stringify({ message }));
  }

  disconnect() {
    this.ws?.close();
  }
}

export const wsService = new WebSocketService();
```

### 4. Authentication Integration

Update `src/components/auth/Login.tsx`:

```typescript
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      login(data.user);
      toast.success('Login successful!');
    }
  } catch (error) {
    toast.error('Login failed');
  } finally {
    setIsLoading(false);
  }
};
```

## API Endpoints Required

### 1. Authentication

#### POST /auth/login
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

#### POST /auth/logout
```json
Request:
{
  "token": "jwt-token"
}

Response:
{
  "success": true
}
```

### 2. Messages

#### POST /messages
```json
Request:
{
  "content": "What is AI?",
  "conversationId": "conv-123",
  "chatType": "qa",
  "model": "gpt-4"
}

Response:
{
  "id": "msg-456",
  "role": "user",
  "content": "What is AI?",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### POST /stream (Server-Sent Events)
```json
Request:
{
  "message": "What is AI?",
  "chatType": "qa",
  "model": "gpt-4"
}

Response (SSE):
data: {"content": "AI", "done": false}
data: {"content": "AI is", "done": false}
data: {"content": "AI is artificial intelligence", "done": true}
```

### 3. Conversations

#### GET /conversations
```json
Response:
{
  "conversations": [
    {
      "id": "conv-123",
      "title": "What is AI?",
      "messages": [...],
      "chatType": "qa",
      "model": "gpt-4",
      "createdAt": "2024-01-01T12:00:00Z",
      "updatedAt": "2024-01-01T12:05:00Z"
    }
  ]
}
```

#### POST /conversations
```json
Request:
{
  "chatType": "qa",
  "model": "gpt-4"
}

Response:
{
  "id": "conv-123",
  "title": "New Chat",
  "messages": [],
  "chatType": "qa",
  "model": "gpt-4",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

#### DELETE /conversations/:id
```json
Response:
{
  "success": true
}
```

### 4. File Upload

#### POST /upload
```
Request: multipart/form-data
- file: File

Response:
{
  "url": "https://cdn.example.com/file.jpg",
  "preview": "https://cdn.example.com/thumb.jpg"
}
```

## Error Handling

All endpoints should return errors in this format:

```json
{
  "success": false,
  "error": "Error message here",
  "code": "ERROR_CODE"
}
```

## Rate Limiting

Implement rate limiting on backend:
- 100 requests per minute per user
- 10 file uploads per hour per user

## CORS Configuration

Allow frontend origin:

```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## Security Headers

```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "wss://your-api.com"],
    },
  },
}));
```

## Testing Backend Integration

### 1. Test Authentication
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### 2. Test Message Sending
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"content":"Hello","conversationId":"conv-1","chatType":"qa","model":"gpt-4"}'
```

### 3. Test File Upload
```bash
curl -X POST http://localhost:3000/api/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/file.jpg"
```

## Monitoring & Logging

### Frontend Logging
Add to `src/services/api.ts`:

```typescript
private log(action: string, data: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API] ${action}:`, data);
  }
  
  // Send to analytics service
  analytics.track(action, data);
}
```

### Error Tracking
Integrate Sentry or similar:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});
```

## Performance Optimization

### 1. Request Caching
```typescript
const cache = new Map();

async getData(key: string) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const data = await fetch(...);
  cache.set(key, data);
  return data;
}
```

### 2. Request Debouncing
```typescript
import { debounce } from 'lodash';

const debouncedSearch = debounce(async (query) => {
  await apiService.search(query);
}, 300);
```

## Deployment Checklist

- [ ] Update all environment variables
- [ ] Replace mock API with real endpoints
- [ ] Test authentication flow
- [ ] Test message sending and streaming
- [ ] Test file uploads
- [ ] Configure CORS
- [ ] Set up error tracking
- [ ] Enable HTTPS
- [ ] Test rate limiting
- [ ] Monitor API performance
- [ ] Set up logging

## Support

For integration issues:
1. Check browser console for errors
2. Verify API endpoints are accessible
3. Check CORS configuration
4. Verify authentication tokens
5. Test with Postman/curl first

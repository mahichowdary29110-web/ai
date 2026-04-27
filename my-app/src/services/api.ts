import { ApiResponse, Message, StreamResponse, ChatType, ModelType } from '@/types';
import { delay, generateId } from '@/utils/helpers';
import { appConfig } from '@/config';
import { mockAIResponses } from '@/lib/mockData';

class ApiService {
  private shouldFail = false;
  private failureRate = 0.1;

  async sendMessage(
    content: string,
    conversationId: string,
    chatType: ChatType,
    model: ModelType
  ): Promise<ApiResponse<Message>> {
    await delay(500);

    if (this.shouldSimulateFailure()) {
      return {
        success: false,
        error: 'Failed to send message. Please try again.',
      };
    }

    const message: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    return {
      success: true,
      data: message,
    };
  }

  async *streamResponse(
    userMessage: string,
    chatType: ChatType,
    model: ModelType
  ): AsyncGenerator<StreamResponse> {
    await delay(300);

    if (this.shouldSimulateFailure()) {
      throw new Error('Stream failed. Please retry.');
    }

    const response = this.generateMockResponse(userMessage, chatType);
    const words = response.split(' ');

    for (let i = 0; i < words.length; i++) {
      await delay(appConfig.streamDelay);
      
      yield {
        content: words.slice(0, i + 1).join(' '),
        done: i === words.length - 1,
      };
    }
  }

  async uploadFile(file: File): Promise<ApiResponse<{ url: string; preview?: string }>> {
    await delay(1000);

    if (file.size > appConfig.maxFileSize) {
      return {
        success: false,
        error: 'File size exceeds maximum limit',
      };
    }

    if (!appConfig.allowedFileTypes.includes(file.type)) {
      return {
        success: false,
        error: 'File type not supported',
      };
    }

    const url = URL.createObjectURL(file);
    const preview = file.type.startsWith('image/') ? url : undefined;

    return {
      success: true,
      data: { url, preview },
    };
  }

  async retryRequest<T>(
    requestFn: () => Promise<ApiResponse<T>>,
    maxRetries: number = appConfig.maxRetries
  ): Promise<ApiResponse<T>> {
    let lastError: string = '';

    for (let i = 0; i < maxRetries; i++) {
      const result = await requestFn();
      if (result.success) return result;
      
      lastError = result.error || 'Unknown error';
      await delay(1000 * (i + 1));
    }

    return {
      success: false,
      error: `Failed after ${maxRetries} attempts: ${lastError}`,
    };
  }

  private generateMockResponse(userMessage: string, chatType: ChatType): string {
    const intro = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
    
    const responses: Record<ChatType, string> = {
      'qa': `${intro} ${userMessage.toLowerCase().includes('what') ? 'This is a concept that' : 'To answer your question,'} involves understanding several key aspects. First, it's important to consider the context and background. Second, we need to examine the core principles involved. Finally, practical applications demonstrate how this works in real-world scenarios. Would you like me to elaborate on any specific aspect?`,
      'summary': `${intro} Here's a concise summary: The main points include several critical elements that work together to form a comprehensive understanding. Key takeaways are: 1) The fundamental concept, 2) Practical implications, 3) Future considerations. This provides a solid foundation for further exploration.`,
      'image-analysis': `${intro} Based on the image analysis, I can identify several key elements: The composition shows clear structure and organization. The visual elements suggest specific themes and patterns. Color usage and spatial arrangement contribute to the overall meaning. Would you like me to focus on any particular aspect of the image?`,
    };

    return responses[chatType] || responses['qa'];
  }

  private shouldSimulateFailure(): boolean {
    return Math.random() < this.failureRate;
  }

  setFailureRate(rate: number): void {
    this.failureRate = Math.max(0, Math.min(1, rate));
  }
}

export const apiService = new ApiService();

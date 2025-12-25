/// <reference types="vite/client" />

interface PostMessageData {
  type: string;
  data?: Record<string, unknown>;
}

declare global {
  interface Window {
    postMessage(data: PostMessageData, origin?: string): void;
  }
}

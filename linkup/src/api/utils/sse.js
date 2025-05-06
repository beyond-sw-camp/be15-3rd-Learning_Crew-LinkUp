// src/utils/sse.js
import { useAuthStore } from '@/stores/auth.js';
import { TinyEmitter } from 'tiny-emitter';

export const emitter = new TinyEmitter();
let eventSource = null;

export function connectSse(userId) {
  const authStore = useAuthStore();
  const token = authStore.accessToken;

  if (eventSource) eventSource.close();

  eventSource = new EventSource(url);

  eventSource.addEventListener('connect', () => {
    console.log('✅ SSE 연결 완료');
  });

  eventSource.addEventListener('notification', (event) => {
    const data = JSON.parse(event.data);
    console.log('📥 [notification] 이벤트 수신:', data);
    emitter.emit('new-notification', data); // 이게 핵심
  });

  eventSource.onerror = (err) => {
    console.error('❌ SSE 오류 발생', err);
    eventSource.close();
    eventSource = null;
  };
}

export function disconnectSse() {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
    console.log('🔌 SSE 연결 종료됨');
  }
}

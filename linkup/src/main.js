import './assets/css/index.css';
import 'pretendard/dist/web/static/pretendard.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // 스타일도 꼭 가져와야 합니다



import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { useAuthStore } from '@/stores/auth.js';
import { refreshUserToken } from '@/api/user.js';

async function bootstrap() {
  const app = createApp(App);
  app.use(createPinia());

  /* 새로고침시 accessToken 재할당 */
  const authStore = useAuthStore();
  try {
    const resp = await refreshUserToken();
    const { accessToken, userName, profileImageUrl } = resp.data.data;
    authStore.setAuth(accessToken, userName, profileImageUrl);
  } catch (e) {}
  app.use(router);
  app.use(Toast, {
    position: 'top-left',
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
  });

  app.mount('#app');
}

bootstrap();

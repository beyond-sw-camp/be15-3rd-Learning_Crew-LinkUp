import './assets/css/index.css';
import 'pretendard/dist/web/static/pretendard.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'


import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, {
  // 글로벌 옵션 예시
  position: 'top-right', // 더 일반적인 위치
  timeout: 5000,         // 최소 3~5초 권장
  closeOnClick: true,
  pauseOnHover: true,
});

app.mount('#app');

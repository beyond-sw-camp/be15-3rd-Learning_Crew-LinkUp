import './assets/css/index.css'
import 'pretendard/dist/web/static/pretendard.css'
import Toast from 'vue-toastification'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useAuthStore } from '@/stores/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
  position: 'top-left',
  timeout: 1000,
})

// 앱 마운트 후 인증 토큰 강제 삽입 (개발용)
app.mount('#app')

// 개발용 토큰 자동 삽입 (추후 삭제 필요)
if (import.meta.env.MODE === 'development') {
  const authStore = useAuthStore()
  const devToken = import.meta.env.VITE_DEV_ACCESS_TOKEN
  if (devToken) {
    authStore.setAuth(devToken)
    console.info('[dev] accessToken injected')
  }
}

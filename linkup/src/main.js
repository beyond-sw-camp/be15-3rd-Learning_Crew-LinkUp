import './assets/css/index.css'
import 'pretendard/dist/web/static/pretendard.css'
import Toast from 'vue-toastification'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useAuthStore } from '@/stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Toast, {
  position: 'top-left',
  timeout: 1000,
})

// 인증 토큰 강제 삽입 (마운트 전에 실행)
if (import.meta.env.MODE === 'development') {
  const authStore = useAuthStore(pinia) // pinia 인스턴스 명시
  const devToken = import.meta.env.VITE_DEV_ACCESS_TOKEN
  if (devToken) {
    authStore.setAuth(devToken)
    console.info('[dev] accessToken injected')
  }
}

app.mount('#app')

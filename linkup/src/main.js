import './assets/css/index.css'
import 'pretendard/dist/web/static/pretendard.css'
import Toast from 'vue-toastification'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Toast, {
  position: 'top-left',
  timeout: 1000,
})


app.mount('#app')

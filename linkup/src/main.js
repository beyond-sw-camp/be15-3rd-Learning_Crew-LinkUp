<<<<<<< HEAD
import './assets/css/index.css'
import 'pretendard/dist/web/static/pretendard.css'
import Toast from 'vue-toastification'
=======
import './assets/css/index.css';
import 'pretendard/dist/web/static/pretendard.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // 스타일도 꼭 가져와야 합니다
>>>>>>> 7aa1c8eca7d89582a42424ed0c5b26eefb5c83d1

import { createApp } from 'vue'
import { createPinia } from 'pinia'

<<<<<<< HEAD
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

import { createRouter, createWebHistory } from 'vue-router'
// import { mainRoutes } from '@/features/main/router.js'
import { adminRoutes } from '@/features/admin/router.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ...mainRoutes,
    ...adminRoutes
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router';
import { mainRoutes } from '@/features/main/router.js';
import { adminRoutes } from '@/features/admin/router.js';
import { meetingRoutes } from '@/features/meeting/router.js';

import { authRoutes } from '@/features/auth/router.js';
import { userRoutes } from '@/features/user/router.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [...mainRoutes, ...adminRoutes, ...authRoutes, ...userRoutes, ...meetingRoutes],
});

export default router;

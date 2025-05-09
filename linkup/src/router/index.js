import { createRouter, createWebHistory } from 'vue-router';
import { mainRoutes } from '@/features/main/router.js';
import { adminRoutes } from '@/features/admin/router.js';
import { meetingRoutes } from '@/features/meeting/router.js';
import { placeRoutes } from '@/features/place/router.js';
import { communityRoute } from '@/features/community/router.js';
import { authRoutes } from '@/features/auth/router.js';
import { userRoutes } from '@/features/user/router.js';
import { useAuthStore } from '@/stores/auth.js';
import {tossRoutes} from "@/features/point/router.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...mainRoutes,
    ...adminRoutes,
    ...authRoutes,
    ...userRoutes,
    ...meetingRoutes,
    ...placeRoutes,
    ...communityRoute,
    ...tossRoutes
  ],
});

// 전역 가드 (라우팅 전 확인하여 라우팅 여부 결정 가능)
router.beforeEach((to) => {
  console.log(to);
  const authStore = useAuthStore();
  // 인증이 되어야만 하는 페이지인데 인증이 되어 있지 않다면 로그인 페이지로 이동
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    };
  }

  if ((to.name === 'login' || to.name === 'signup') && authStore.isAuthenticated) {
    return { name: 'main' };
  }
  // 그 외에는 그대로 라우팅 처리함
});

export default router;

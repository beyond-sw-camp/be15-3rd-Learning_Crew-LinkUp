import { createRouter, createWebHistory } from 'vue-router';
import { mainRoutes } from '@/features/main/router.js';
import { adminRoutes } from '@/features/admin/router.js';
import { meetingRoutes } from '@/features/meeting/router.js';
import { placeRoutes } from '@/features/place/router.js';
import { communityRoute} from "@/features/community/router.js";

import { authRoutes } from '@/features/auth/router.js';
import { userRoutes } from '@/features/user/router.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [...mainRoutes, ...adminRoutes, ...authRoutes, ...userRoutes, ...meetingRoutes, ...placeRoutes, ...communityRoute],
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import { mainRoutes } from '@/features/main/router.js';
import { adminRoutes } from '@/features/admin/router.js';
import { meetingRoutes } from '@/features/meeting/router.js';
import { communityRoute} from "@/features/community/router.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [...mainRoutes, ...adminRoutes, ...meetingRoutes, ...communityRoute]
});

export default router;

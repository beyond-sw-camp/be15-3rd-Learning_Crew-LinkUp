// userRoutes.js
export const userRoutes = [
  {
    path: '/mypage',
    component: () => import('@/features/user/views/MypageView.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/mypage/profile' }, // 기본 리다이렉트
      {
        path: 'profile',
        name: 'mypage-profile',
        component: () => import('@/features/user/views/ProfileView.vue'),
      },
      {
        path: 'joined-meetings',
        name: 'mypage-joined-meetings',
        component: () => import('@/features/user/views/JoinedMeetingsView.vue'),
      },
      {
        path: 'created-meetings',
        name: 'mypage-created-meetings',
        component: () => import('@/features/user/views/CreatedMeetingsView.vue'),
      },
      {
        path: 'points',
        name: 'mypage-points',
        component: () => import('@/features/user/views/PointsView.vue'),
      },
      {
        path: 'posts',
        name: 'mypage-posts',
        component: () => import('@/features/user/views/PostsView.vue'),
      },
      {
        path: 'comments',
        name: 'mypage-comments',
        component: () => import('@/features/user/views/CommentsView.vue'),
      },
      {
        path: 'friends',
        name: 'mypage-friends',
        component: () => import('@/features/user/views/FriendsView.vue'),
      },
      {
        path: 'friend-meetings',
        name: 'mypage-friend-meetings',
        component: () => import('@/features/user/views/FriendMeetingsView.vue'),
      },
      {
        path: 'password',
        name: 'mypage-password',
        component: () => import('@/features/user/views/PasswordView.vue'),
      },
    ],
  },
  {
    path: '/mypage/business',
    component: () => import('@/features/user/views/MyPageBusinessView.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/mypage/business/settlement-by-month' }, // 기본 리다이렉트
      {
        path: 'settlement-by-month',
        name: 'business-settlement-by-month',
        component: () => import('@/features/user/views/SettlementByMonthView.vue'),
      },
      {
        path: 'settlement-history',
        name: 'business-settlement-history',
        component: () => import('@/features/user/views/SettlementHistoryView.vue'),
      },
      {
        path: 'places',
        name: 'business-places',
        component: () => import('@/features/user/views/PlacesView.vue'),
      },
      {
        path: 'password',
        name: 'business-password',
        component: () => import('@/features/user/views/PasswordView.vue'),
      },
      {
        path: 'profile',
        name: 'business-profile',
        component: () => import('@/features/user/views/ProfileView.vue'),
      },
    ],
  },
];

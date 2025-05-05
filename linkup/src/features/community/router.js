export const communityRoute= [
    {
        path: '/community',
        name: 'CommunityList',
        component: () => import('@/features/community/views/CommunityList.vue')
    },
    {
        path: '/community/:id',
        name: 'CommunityDetail',
        component: () => import('@/features/community/views/CommunityDetail.vue')
    },
]
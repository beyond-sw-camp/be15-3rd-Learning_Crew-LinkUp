export const adminRoutes = [
    {
        path: '/admin',
        component: () => import('@/components/layout/AdminLayout.vue'),
        children: [
            {
                path: 'users/members',
                name: 'UserMemberList',
                component: () => import('@/features/admin/views/UserMemberListView.vue')
            },
            {
                path: 'users/authorities',
                name: 'UserAuthorityList',
                component: () => import('@/features/admin/views/UserAuthorityListView.vue')
            },
            /*{
                path: 'users/posts',
                name: 'UserPostList',
                component: () => import('@/features/admin/views/UserPostList.vue')
            },
            {
                path: 'users/comments',
                name: 'UserCommentList',
                component: () => import('@/features/admin/views/UserCommentList.vue')
            },
            {
                path: 'point/points',
                name: 'PointHistoryList',
                component: () => import('@/features/admin/views/PointHistoryList.vue')
            },
            {
                path: 'point/accounts',
                name: 'PointAccountList',
                component: () => import('@/features/admin/views/PointAccountList.vue')
            },
            {
                path: 'place/list',
                name: 'PlaceList',
                component: () => import('@/features/admin/views/PlaceList.vue')
            },
            {
                path: 'place/reviews',
                name: 'PlaceReviewList',
                component: () => import('@/features/admin/views/PlaceReviewList.vue')
            },
            {
                path: 'meeting/list',
                name: 'MeetingList',
                component: () => import('@/features/admin/views/MeetingList.vue')
            },
            {
                path: 'meeting/reviews',
                name: 'MeetingReviewList',
                component: () => import('@/features/admin/views/MeetingReviewList.vue')
            },
            {
                path: 'report/list',
                name: 'ReportList',
                component: () => import('@/features/admin/views/ReportList.vue')
            },
            {
                path: 'report/reporters',
                name: 'ReportReporterList',
                component: () => import('@/features/admin/views/ReportReporterList.vue')
            },
            {
                path: 'report/targets',
                name: 'ReportTargetList',
                component: () => import('@/features/admin/views/ReportTargetList.vue')
            },
            {
                path: 'report/target-contents',
                name: 'ReportTargetContentList',
                component: () => import('@/features/admin/views/ReportTargetContentList.vue')
            },
            {
                path: 'penalty/list',
                name: 'PenaltyList',
                component: () => import('@/features/admin/views/PenaltyList.vue')
            },
            {
                path: 'penalty/objections',
                name: 'ObjectionList',
                component: () => import('@/features/admin/views/ObjectionList.vue')
            },
            {
                path: 'penalty/blacklist',
                name: 'BlacklistList',
                component: () => import('@/features/admin/views/BlacklistList.vue')
            }*/
        ]
    }
]

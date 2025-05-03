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
            {
                path: 'users/posts',
                name: 'UserPostList',
                component: () => import('@/features/admin/views/UserPostListView.vue')
            }
            /*,
            {
                path: 'users/comments',
                name: 'UserCommentList',
                component: () => import('@/features/admin/views/UserCommentListView.vue')
            },
            {
                path: 'point/points',
                name: 'PointHistoryList',
                component: () => import('@/features/admin/views/PointHistoryListView.vue')
            },
            {
                path: 'point/accounts',
                name: 'PointAccountList',
                component: () => import('@/features/admin/views/PointAccountListView.vue')
            },
            {
                path: 'place/list',
                name: 'PlaceList',
                component: () => import('@/features/admin/views/PlaceListView.vue')
            },
            {
                path: 'place/reviews',
                name: 'PlaceReviewList',
                component: () => import('@/features/admin/views/PlaceReviewListView.vue')
            },
            {
                path: 'meeting/list',
                name: 'MeetingList',
                component: () => import('@/features/admin/views/MeetingListView.vue')
            },
            {
                path: 'meeting/reviews',
                name: 'MeetingReviewList',
                component: () => import('@/features/admin/views/MeetingReviewListView.vue')
            },
            {
                path: 'report/list',
                name: 'ReportList',
                component: () => import('@/features/admin/views/ReportListView.vue')
            },
            {
                path: 'report/reporters',
                name: 'ReportReporterList',
                component: () => import('@/features/admin/views/ReportReporterListView.vue')
            },
            {
                path: 'report/targets',
                name: 'ReportTargetList',
                component: () => import('@/features/admin/views/ReportTargetListView.vue')
            },
            {
                path: 'report/target-contents',
                name: 'ReportTargetContentList',
                component: () => import('@/features/admin/views/ReportTargetContentListView.vue')
            },
            {
                path: 'penalty/list',
                name: 'PenaltyList',
                component: () => import('@/features/admin/views/PenaltyListView.vue')
            },
            {
                path: 'penalty/objections',
                name: 'ObjectionList',
                component: () => import('@/features/admin/views/ObjectionListView.vue')
            },
            {
                path: 'penalty/blacklist',
                name: 'BlacklistList',
                component: () => import('@/features/admin/views/BlacklistListView.vue')
            }*/
        ]
    }
]

export const adminRoutes = [
    {
        path: '/admin',
        component: () => import('@/components/layout/AdminLayout.vue'),
        children: [
            // 회원 관리
            {
                path: '/admin/users',
                redirect: '/admin/users/members'
            },
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
            },
            {
                path: 'users/comments',
                name: 'UserCommentList',
                component: () => import('@/features/admin/views/UserCommentListView.vue')
            },

            // 포인트 관리
            {
                path: '/admin/points',
                redirect: '/admin/points/points'
            },
            {
                path: 'points/points',
                name: 'PointHistoryList',
                component: () => import('@/features/admin/views/PointHistoryListView.vue')
            },
            {
                path: 'points/accounts',
                name: 'PointAccountList',
                component: () => import('@/features/admin/views/PointAccountListView.vue')
            },

            // 장소 관리
            /*{
                path: '/admin/places',
                redirect: '/admin/places/list'
            },
            {
                path: 'places/list',
                name: 'PlaceList',
                component: () => import('@/features/admin/views/PlaceListView.vue')
            },
            {
                path: 'places/reviews',
                name: 'PlaceReviewList',
                component: () => import('@/features/admin/views/PlaceReviewListView.vue')
            },

            // 모임 관리
            {
                path: '/admin/meetings',
                redirect: '/admin/meetings/list'
            },
            {
                path: 'meetings/list',
                name: 'MeetingList',
                component: () => import('@/features/admin/views/MeetingListView.vue')
            },
            {
                path: 'meetings/reviews',
                name: 'MeetingReviewList',
                component: () => import('@/features/admin/views/MeetingReviewListView.vue')
            },

            // 신고 관리
            {
                path: '/admin/reports',
                redirect: '/admin/reports/list'
            },
            {
                path: 'reports/list',
                name: 'ReportList',
                component: () => import('@/features/admin/views/ReportListView.vue')
            },
            {
                path: 'reports/reporters',
                name: 'ReportReporterList',
                component: () => import('@/features/admin/views/ReportReporterListView.vue')
            },
            {
                path: 'reports/targets',
                name: 'ReportTargetList',
                component: () => import('@/features/admin/views/ReportTargetListView.vue')
            },
            {
                path: 'reports/target-contents',
                name: 'ReportTargetContentList',
                component: () => import('@/features/admin/views/ReportTargetContentListView.vue')
            },

            // 제재 관리
            {
                path: '/admin/penalties',
                redirect: '/admin/penalties/list'
            },
            {
                path: 'penalties/list',
                name: 'PenaltyList',
                component: () => import('@/features/admin/views/PenaltyListView.vue')
            },
            {
                path: 'penalties/objections',
                name: 'ObjectionList',
                component: () => import('@/features/admin/views/ObjectionListView.vue')
            },
            {
                path: 'penalties/blacklist',
                name: 'BlacklistList',
                component: () => import('@/features/admin/views/BlacklistListView.vue')
            }*/
        ]
    }
]

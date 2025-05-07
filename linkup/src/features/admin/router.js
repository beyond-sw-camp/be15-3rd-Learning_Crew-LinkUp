export const adminRoutes = [
    {
        path: '/admin',
        component: () => import('@/components/layout/AdminLayout.vue'),
        children: [
              // 회원 관리
              {
                path: 'service',
                redirect: '/admin/users/members',
              },
              {
                path: 'users',
                redirect: '/admin/users/members',
              },
              {
                path: 'users/members',
                name: 'UserMemberList',
                component: () => import('@/features/admin/views/UserMemberListView.vue'),
              },
              {
                path: 'users/authorities',
                name: 'UserAuthorityList',
                component: () => import('@/features/admin/views/UserAuthorityListView.vue'),
              },
              {
                path: 'users/posts',
                name: 'UserPostList',
                component: () => import('@/features/admin/views/UserPostListView.vue'),
              },
              {
                path: 'users/comments',
                name: 'UserCommentList',
                component: () => import('@/features/admin/views/UserCommentListView.vue'),
              },

              // 포인트 관리
              {
                path: 'points',
                redirect: '/admin/points/points',
              },
              {
                path: 'points/points',
                name: 'PointHistoryList',
                component: () => import('@/features/admin/views/PointHistoryListView.vue'),
              },
              {
                path: 'points/settlement',
                name: 'PointSettlementList',
                component: () => import('@/features/admin/views/PointSettlementListView.vue'),
              },
              {
                path: 'points/accounts',
                name: 'PointAccountList',
                component: () => import('@/features/admin/views/PointAccountListView.vue'),
              },

              // 모임 관리
              {
                path: 'meetings',
                redirect: '/admin/meetings/list',
              },
              {
                path: 'meetings/list',
                name: 'MeetingList',
                component: () => import('@/features/admin/views/MeetingListView.vue'),
              },
            {
              path: 'meetings/reviews',
              name: 'MeetingReviewList',
              component: () => import('@/features/admin/views/MeetingParticipantReviewListView.vue'),
            },

            // 장소 관리
            {
                  path: 'places',
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


            // 신고 관리
            {
                path: 'reports',
                redirect: '/admin/reports/list'
            },
            {
                path: 'reports/list',
                name: 'ReportList',
                component: () => import('@/features/admin/views/ReportListView.vue')
            },
          {
              path: 'reports/targets',
              name: 'ReportTargetList',
              component: () => import('@/features/admin/views/ReportTargetListView.vue')
          },
          {
              path: 'reports/reporters',
              name: 'ReportReporterList',
              component: () => import('@/features/admin/views/ReportReporterListView.vue')
          },
          {
              path: 'reports/reportees',
              name: 'ReportReporteeList',
              component: () => import('@/features/admin/views/ReportReporteeListView.vue')
          },

          // 제재 관리
          {
              path: 'penalties',
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
          },
          {
              path: 'report/types',
              name: 'reportTypes',
              component: () => import('@/features/admin/views/ReportTriggerView.vue')
          },
          {
              path: 'objections/types',
              name: 'objections',
              component: () => import('@/features/admin/views/ObjectionView.vue')
          }
    ],
  },
];

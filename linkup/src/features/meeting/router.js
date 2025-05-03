export const meetingRoutes = [
  {
    path: '/meetings',
    // component: () => import('@/components/layout/AdminLayout.vue'),
    children: [{
      path: '',
      name: 'Meetings',
      component: () => import('@/features/meeting/views/Meetings.vue')
    },
      {
        path: ':id',
        name: 'MeetingDetails',
        component: () => import('@/features/meeting/views/MeetingDetails.vue')
      },
      {
        path: ':meetingId/review',
        name: 'CreateParticipantReviews',
        component: () => import('@/features/meeting/views/CreateParticipantReviews.vue')
      },
      {
        path: ':meetingId/review/place',
        name: 'CreatePlaceReview',
        component: () => import('@/features/meeting/views/CreatePlaceReview.vue')
      }

    ]
  }
]
export const meetingRoutes = [
  {
    path: '/meetings',
    // component: () => import('@/components/layout/AdminLayout.vue'),
    children: [
    //   {
    //   path: '',
    //   name: 'Meetings',
    //   component: () => import('@/features/meeting/views/Meetings.vue')
    // },
      {
        path: ':meetingId',
        name: 'MeetingDetails',
        component: () => import('@/features/meeting/views/MeetingDetails.vue')
      },
      {
        path: ':meetingId/participation',
        name: 'CreateParticipation',
        component: () => import('@/features/meeting/views/CreateParticipation.vue')
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
      },

    ],
  {
    path: '/meetings',
    name: 'MeetingSearch',
    component: () => import('@/features/meeting/views/MeetingSearchView.vue')
  }

]
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
      {
        path: 'create/reserved/step1',
        name: 'CreateMeetingStep1Reserved',
        component: () => import('@/features/meeting/views/CreateMeetingStep1.vue')
      },
      {
        path: 'create/reserved/step2',
        name: 'CreateMeetingStep2Reserved',
        component: () => import('@/features/meeting/views/CreateMeetingStep2.vue')
      },
      {
        path: 'create/reserved/step3',
        name: 'CreateMeetingStep3Reserved',
        component: () => import('@/features/meeting/views/CreateMeetingStep3.vue')
      },
      {
        path: 'create/custom/step1',
        name: 'CreateMeetingStep1Custom',
        component: () => import('@/features/meeting/views/CreateCustomMeetingStep1.vue')
      },
      {
        path: 'create/custom/step2',
        name: 'CreateMeetingStep2Custom',
        component: () => import('@/features/meeting/views/CreateCustomMeetingStep2.vue')
      },
      {
        path: 'create/custom/step3',
        name: 'CreateMeetingStep3Custom',
        component: () => import('@/features/meeting/views/CreateCustomMeetingStep3.vue')
      }
    ]
  },
  {
    path: '/meetings',
    name: 'MeetingSearch',
    component: () => import('@/features/meeting/views/MeetingSearchView.vue')
  }

]
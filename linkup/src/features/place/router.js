export const placeRoutes = [
  {
    path: '/places',
    name: 'PlaceListView',
    component: () => import('@/features/place/views/PlaceListView.vue'),
  },
  {
    path: '/my/places',
    name: 'MyPlaceListView',
    component: () => import('@/features/place/views/MyPlaceListView.vue'),
  },
  {
    path: '/place/register/step1',
    name: 'PlaceRegisterStep1',
    component: () => import('@/features/place/views/PlaceRegisterStep1.vue'),
  },
  {
    path: '/place/register/step2',
    name: 'PlaceRegisterStep2',
    component: () => import('@/features/place/views/PlaceRegisterStep2.vue'),
  },
  {
    path: '/place/register/complete',
    name: 'PlaceRegisterComplete',
    component: () => import('@/features/place/views/PlaceRegisterComplete.vue'),
  }
];

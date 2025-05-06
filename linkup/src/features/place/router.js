// src/features/place/router.js
export const placeRoutes = [
  {
    path: '/places',
    name: 'PlaceListView',
    component: () => import('@/features/place/views/PlaceListView.vue'),
  },
];

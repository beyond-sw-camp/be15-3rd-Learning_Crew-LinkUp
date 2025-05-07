export const tossRoutes = [
    {
        path: '/payments/success',
        name: 'Payment',
        component: () => import('@/features/point/views/PaymentSuccess.vue')
    },
];

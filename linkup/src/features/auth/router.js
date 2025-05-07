import SignupView from '@/features/auth/views/SignupView.vue';

export const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/features/auth/views/LoginView.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/features/auth/views/SignupView.vue'),
    children: [
      {
        path: 'agree',
        name: 'signup-agree',
        component: () => import('@/features/auth/views/SignupAgreeView.vue'),
      },
      {
        path: 'personal',
        name: 'signup-personal',
        component: () => import('@/features/auth/views/SignupPersonalView.vue'),
      },
      {
        path: 'account/user',
        name: 'signup-user-account',
        component: () => import('@/features/auth/views/SignupUserAccountView.vue'),
      },
      {
        path: 'account/business',
        name: 'signup-business-account',
        component: () => import('@/features/auth/views/SignupBusinessAccountView.vue'),
      },
      {
        path: 'account/success',
        name: 'signup-success',
        component: () => import('@/features/auth/views/SignupSuccessView.vue'),
      },
      {
        path: 'account/fail',
        name: 'signup-fail',
        component: () => import('@/features/auth/views/SignupFailView.vue'),
      },
    ],
  },
  {
    path: '/password/reset',
    name: 'reset-password',
    component: () => import('@/features/auth/views/ResetPasswordView.vue'),
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/features/auth/views/ResetPasswordFormView.vue'),
  },
  {
    path: '/recover',
    name: 'recover-account',
    component: () => import('@/features/auth/views/RecoverAccountView.vue'),
  },
];

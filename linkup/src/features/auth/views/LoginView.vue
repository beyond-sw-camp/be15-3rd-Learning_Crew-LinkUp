<script setup>
import FullVertialCenterLayout from '@/components/layout/FullVertialCenterLayout.vue';
import LoginForm from '@/features/auth/components/LoginForm.vue';
import { loginUser } from '@/api/user.js';
import { useAuthStore } from '@/stores/auth.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async (formData) => {
  try {
    await authStore.login(formData); // login API 호출 + 상태 저장 모두 스토어에서 처리

    // 로그인 직전에 가려던 경로가 있다면 그쪽으로 이동
    const redirectPath = router.currentRoute.value.query.redirect;
    if (redirectPath) {
      await router.replace(redirectPath);
    } else {
      await router.replace('/');
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <div class="relative">
    <FullVertialCenterLayout>
      <LoginForm @submit="handleLogin" />
    </FullVertialCenterLayout>
  </div>
</template>

<style scoped></style>

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
    const resp = await loginUser(formData);
    console.log(resp);
    const { accessToken, userName, profileImageUrl } = resp.data.data;
    authStore.setAuth(accessToken, userName, profileImageUrl);
    await router.push('/');
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

<!-- src/pages/auth/ResetPasswordPage.vue -->
<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { postResetPasswordConfirm } from '@/api/user';
import FullVertialCenterLayout from '@/components/layout/FullVertialCenterLayout.vue';
import { useAuthStore } from '@/stores/auth.js';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

// 쿼리스트링으로 전달받은 값
const email = ref(route.query.email || '');
const token = ref(route.query.token || '');

const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);

// 비밀번호 유효성
const isValid = computed(() => {
  return (
    password.value.length >= 8 &&
    confirmPassword.value.length >= 8 &&
    password.value === confirmPassword.value
  );
});

// 폼 제출
const handleSubmit = async () => {
  if (!isValid.value) return;
  try {
    isLoading.value = true;
    await postResetPasswordConfirm({
      email: email.value,
      token: token.value,
      newPassword: password.value,
    });
    authStore.clearAuth();
    await router.push('/login');
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <FullVertialCenterLayout>
    <section class="reset-password-container">
      <h1 class="title">비밀번호 재설정</h1>
      <p class="subtitle">새 비밀번호를 입력해주세요.</p>

      <form @submit.prevent="handleSubmit" class="reset-password-form">
        <div class="form-group">
          <label for="email">이메일</label>
          <input id="email" type="email" :value="email" readonly class="input-disabled" />
        </div>

        <div class="form-group">
          <label for="password">새 비밀번호</label>
          <input v-model="password" id="password" type="password" required minlength="8" />
        </div>

        <div class="form-group">
          <label for="confirmPassword">비밀번호 확인</label>
          <input
            v-model="confirmPassword"
            id="confirmPassword"
            type="password"
            required
            minlength="8"
          />
        </div>

        <button type="submit" class="submit-btn" :disabled="!isValid || isLoading">
          {{ isLoading ? '처리 중...' : '비밀번호 재설정' }}
        </button>
      </form>
    </section>
  </FullVertialCenterLayout>
</template>

<style scoped>
.reset-password-container {
  @apply flex min-w-[400px] flex-col items-center justify-center w-full max-w-md mx-auto bg-white;
}

.title {
  @apply text-2xl font-bold text-center mb-4;
}

.subtitle {
  @apply text-center text-gray-600 mb-6;
}

.reset-password-form {
  @apply w-full flex flex-col gap-5;
}

.form-group {
  @apply flex flex-col gap-2;
}

input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-lg text-base;
}

.input-disabled {
  @apply bg-gray-100 cursor-not-allowed;
}

.submit-btn {
  @apply w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors;
}

.submit-btn:disabled {
  @apply bg-gray-300 text-gray-500 cursor-not-allowed;
}
</style>

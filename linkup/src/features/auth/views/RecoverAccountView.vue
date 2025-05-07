<script setup>
import FullVertialCenterLayout from '@/components/layout/FullVertialCenterLayout.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';
import { computed, ref } from 'vue';
import { postRecoverAccount } from '@/api/user.js';
import { startLoading } from '@/composables/useLoadingBar.js';

const router = useRouter();

const email = ref('');
const password = ref('');

const authStore = useAuthStore();

// 비밀번호 유효성
const isValid = computed(() => {
  console.log();
  return email.value.trim() !== '' && password.value.trim() !== '';
});

// 폼 제출
const handleSubmit = async () => {
  if (!isValid.value) return;
  startLoading;
  try {
    await postRecoverAccount({
      email: email.value,
      password: password.value,
    });
    await authStore.clearAuth();
    await router.push('/login');
  } catch (e) {
    console.error(e);
  } finally {
  }
};
</script>

<template>
  <FullVertialCenterLayout>
    <section class="recovery-container" aria-label="계정 복구 섹션">
      <header class="recovery-header">
        <h1 class="recovery-title">계정 복구 신청</h1>
        <p class="recovery-description">
          계정을 복구하시려면<br />
          이메일과 비밀번호를 입력해주세요.
        </p>
      </header>

      <form class="recovery-form" aria-label="계정 복구 폼" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email" class="form-label">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            class="form-input"
            aria-required="true"
            v-model.trim="email"
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            class="form-input"
            aria-required="true"
            v-model.trim="password"
          />
        </div>

        <button
          type="submit"
          class="submit-button"
          aria-label="계정 복구하기 버튼"
          :disabled="!isValid"
        >
          계정 복구하기
        </button>
      </form>

      <nav class="back-navigation" aria-label="로그인 페이지 이동 링크">
        <RouterLink to="/login" class="back-link"> ← 로그인 페이지로 돌아가기 </RouterLink>
      </nav>
    </section>
  </FullVertialCenterLayout>
</template>

<style scoped>
.recovery-container {
  @apply bg-white w-96;
}

.recovery-header {
  @apply text-center mb-6;
}

.recovery-title {
  @apply text-2xl font-bold mb-2;
}

.recovery-description {
  @apply text-sm text-gray-600;
}

.recovery-form {
  @apply w-full;
}

.form-group {
  @apply mb-5;
}

.form-label {
  @apply block mb-2 font-medium text-gray-700;
}

.form-input {
  @apply w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-active;
}

.submit-button {
  @apply w-full py-3 mt-4 bg-primary-default text-white font-bold rounded-lg hover:bg-primary-hover;
}

.submit-button:disabled {
  @apply bg-gray-300 text-gray-500 cursor-not-allowed;
}

.back-navigation {
  @apply mt-5 text-center;
}

.back-link {
  @apply text-primary-active text-sm hover:underline;
}
</style>

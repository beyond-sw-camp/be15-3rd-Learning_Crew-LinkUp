<script setup>
import { reactive, computed } from 'vue';

const emit = defineEmits(['submit']);
const form = reactive({ email: '', password: '' });

const isValid = computed(() => {
  return form.email.trim() !== '' && form.password !== '';
});

function onSubmit() {
  emit('submit', { ...form });
}
</script>

<template>
  <section class="login-container" aria-labelledby="login-title">
    <h1 id="login-title" class="login-title">로그인</h1>

    <form class="login-form" aria-describedby="login-description" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email" class="form-label">이메일</label>
        <input
          v-model.trim="form.email"
          type="email"
          id="email"
          name="email"
          required
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="password" class="form-label">비밀번호</label>
        <input
          type="password"
          v-model.trim="form.password"
          id="password"
          name="password"
          required
          class="form-input"
        />
      </div>

      <button type="submit" class="login-button" :disabled="!isValid">로그인</button>
    </form>

    <nav class="login-links" aria-label="로그인 관련 링크">
      <div class="login-link-group">
        <a href="#" class="login-link">비밀번호 찾기</a>
        <a href="#" class="login-link recovery-link">계정 복구 신청</a>
      </div>
      <a href="#" class="login-link">회원가입</a>
    </nav>
  </section>
</template>

<style scoped>
.login-container {
  @apply w-[400px] p-[20px] bg-white flex flex-col items-center;
}

.login-title {
  @apply text-2xl font-bold mb-6 text-center;
}

.login-form {
  @apply w-full;
}

.form-group {
  @apply mb-5;
}

.form-label {
  @apply block mb-2 font-medium text-gray-700;
}

.form-input {
  @apply w-full p-3 border border-gray-300 rounded-sm text-base;
}

.login-button {
  @apply w-full p-3 bg-blue-500 text-white font-bold rounded-sm mt-3 text-base hover:bg-blue-700 transition-colors;
}

.login-button:disabled {
  @apply bg-gray-300 text-gray-500 cursor-not-allowed;
}

.login-links {
  @apply w-full flex justify-between items-center mt-6 text-sm;
}

.login-link-group {
  @apply flex space-x-3;
}

.login-link {
  @apply text-blue-500 hover:underline;
}

.recovery-link {
  @apply text-gray-400 hover:text-gray-500;
}
</style>

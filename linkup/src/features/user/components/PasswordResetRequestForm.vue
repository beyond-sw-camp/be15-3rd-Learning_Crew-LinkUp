<script setup>
import { computed, ref } from 'vue';
import { postResetPassword } from '@/api/user.js';
import { startLoading } from '@/composables/useLoadingBar.js';
import { useRouter } from 'vue-router';

const email = ref('');
const router = useRouter();

const handleSubmit = async () => {
  try {
    startLoading();
    await postResetPassword({ email: email['value'] });
    await router.push('/login');
  } catch (e) {
    console.log(e);
  }
};

const isValid = computed(() => {
  return email.value.trim() !== '';
});
</script>

<template>
  <section class="reset-form-container" aria-label="비밀번호 재설정 요청">
    <h1 class="reset-title">
      비밀번호 재설정을 위해<br />
      이메일 인증이 필요합니다
    </h1>
    <p class="reset-subtitle">
      가입하신 이메일을 입력해주세요.<br />
      해당 이메일로 인증 링크를 보내드립니다.
    </p>

    <form @submit.prevent="handleSubmit" class="reset-form">
      <div class="form-group">
        <label for="email">이메일 주소</label>
        <input v-model="email" type="email" id="email" name="email" required />
      </div>

      <button type="submit" class="submit-btn" :disabled="!isValid">이메일 전송</button>
    </form>
  </section>
</template>

<style scoped>
.reset-form-container {
  @apply bg-white w-[400px];
}

.reset-title {
  @apply text-2xl font-bold text-center mb-6;
}

.reset-subtitle {
  @apply text-center text-gray-600 mb-6 leading-relaxed;
}

.reset-form {
  @apply flex flex-col gap-5;
}

.form-group {
  @apply flex flex-col gap-2;
}

.form-group input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-lg text-base;
}

.submit-btn {
  @apply w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors;
}

.submit-btn:disabled {
  @apply bg-gray-300 text-gray-500 cursor-not-allowed;
}
</style>

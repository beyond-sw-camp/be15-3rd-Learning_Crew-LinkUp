<template>
  <section class="signup-container" aria-labelledby="signup-title">
    <div class="signup-step-indicator">
      <span class="step active">1</span>
      <span class="step-line"></span>
      <span class="step">2</span>
    </div>

    <h1 id="signup-title" class="signup-title">개인 정보를 입력해주세요</h1>

    <form class="signup-form">
      <div class="form-group">
        <label for="email" class="form-label"> 이메일 <span class="required">*</span> </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@email.com"
          required
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="password" class="form-label"> 비밀번호 <span class="required">*</span> </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="영문, 숫자, 특수문자 포함 8~20자"
          required
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="password-confirm" class="form-label">
          비밀번호 확인란 <span class="required">*</span>
        </label>
        <input
          type="password"
          id="password-confirm"
          name="passwordConfirm"
          placeholder="영문, 숫자, 특수문자 포함 8~20자"
          required
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="contact" class="form-label"> 전화번호 </label>
        <input
          type="tel"
          id="contact"
          name="contact"
          placeholder="010-0000-0000"
          class="form-input"
        />
      </div>

      <div class="button-group">
        <button type="submit" class="signup-button bg-background-lightDark hover:bg-text-default">
          사업자 계정 생성
        </button>
        <button type="submit" class="signup-button bg-primary-default hover:bg-primary-active">
          회원 계정 생성
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.signup-container {
  @apply w-full min-w-[400px] max-w-lg mx-auto bg-white  flex flex-col;
}

.signup-step-indicator {
  @apply flex items-center justify-center mb-8;
}

.step {
  @apply w-9 h-9 rounded-full bg-gray-200 text-gray-500 font-bold flex items-center justify-center text-sm;
}

.step.active {
  @apply bg-blue-500 text-white;
}

.step-line {
  @apply w-10 h-0.5 bg-gray-200 mx-2;
}

.signup-title {
  @apply text-xl font-bold text-center mb-6;
}

.signup-form {
  @apply flex flex-col gap-4;
}

.form-group {
  @apply flex flex-col;
}

.form-label {
  @apply mb-2 font-medium text-gray-700 text-sm;
}

.required {
  @apply text-red-500 text-xs ml-1;
}

.form-input {
  @apply p-3 text-base border border-gray-300 rounded-md;
}

.button-group {
  @apply flex gap-2 mt-6;
}

.signup-button {
  @apply w-full py-3  text-white font-bold rounded-md text-base  transition-colors;
}
</style>

<template>
  <section class="agreement-container" aria-labelledby="agreement-title">
    <h1 id="agreement-title" class="agreement-title">회원가입을 위해 약관에 동의해주세요</h1>

    <form class="agreement-form">
      <div class="agreement-all">
        <label class="agreement-label">
          <input id="agree-all" type="checkbox" class="agreement-checkbox" />
          <strong>전체 약관에 동의합니다</strong>
        </label>
      </div>

      <hr class="agreement-divider" />

      <div class="agreement-item">
        <label class="agreement-label">
          <input type="checkbox" name="terms" required class="agreement-checkbox" />
          <span>[필수] 이용약관 동의</span>
          <a href="#" class="agreement-link">보기</a>
        </label>
      </div>

      <div class="agreement-item">
        <label class="agreement-label">
          <input type="checkbox" name="privacy" required class="agreement-checkbox" />
          <span>[필수] 개인정보 수집 및 이용 동의</span>
          <a href="#" class="agreement-link">보기</a>
        </label>
      </div>

      <div class="agreement-item">
        <label class="agreement-label">
          <input type="checkbox" name="marketing" class="agreement-checkbox" />
          <span>[선택] 마케팅 정보 수신 동의</span>
          <a href="#" class="agreement-link">보기</a>
        </label>
      </div>

      <button type="submit" class="agreement-button">다음으로</button>
    </form>
  </section>
</template>

<style scoped>
.agreement-container {
  @apply w-full max-w-md mx-auto bg-white flex-1 flex flex-col;
}

.agreement-title {
  @apply text-2xl font-bold text-center mb-[32px];
}

.agreement-form {
  @apply flex flex-col gap-6 flex-1;
}

.agreement-all {
  @apply flex items-center;
}

.agreement-item {
  @apply flex items-center;
}

.agreement-label {
  @apply flex items-center gap-3 text-gray-700;
}

.agreement-checkbox {
  @apply w-5 h-5;
}

.agreement-divider {
  @apply my-6 border-t border-gray-200;
}

.agreement-link {
  @apply ml-2 text-sm text-blue-500 hover:underline;
}

.agreement-button {
  @apply w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors mt-auto;
}
</style>

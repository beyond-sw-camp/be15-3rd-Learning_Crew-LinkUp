<template>
  <main class="create-meeting-page">
    <div class="step-indicator">
      <div
        class="step"
        :class="{ active: step === 1 }"
      >1. 장소 및 인원 선택</div>
      <div class="line"></div>
      <div
        class="step"
        :class="{ active: step === 2 }"
      >2. 모임 정보 작성</div>
      <div class="line"></div>
      <div
        class="step"
        :class="{ active: step === 3 }"
      >3. 상세 조건 설정</div>
    </div>

    <section class="form-section">
      <h1 class="form-title">{{ title }}</h1>
      <slot />
    </section>
  </main>
</template>

<script setup>
defineProps({
  step: Number,
  title: String
});
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

body {
  margin: 0;
  font-family: 'Pretendard', sans-serif;
  background-color: #f1f3fc;
  color: #1a1a1a;
}

.create-meeting-page {
  max-width: 640px;
  margin: 0 auto;
  padding: 40px 24px;
}

.step-indicator {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.step {
  font-size: 0.95rem;
  font-weight: 600;
  color: #6b7280;
}

.step.active {
  color: #5790ff;
}

.line {
  flex-grow: 1;
  height: 2px;
  background-color: #e6e6e6;
  margin: 0 8px;
}

.form-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 32px;
}

.form-section {
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
</style>

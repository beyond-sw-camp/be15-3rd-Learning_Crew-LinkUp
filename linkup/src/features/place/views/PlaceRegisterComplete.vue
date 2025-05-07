<template>
  <div class="complete-container">
    <div class="checkmark">✅</div>
    <div class="title">장소 등록 완료</div>
    <div class="description">
      장소가 성공적으로 등록되었습니다.<br />
      이제 운영을 시작할 수 있어요!
    </div>

    <div class="action-buttons">
      <RouterLink to="/places" class="btn btn-primary">운영 장소 목록으로 이동</RouterLink>
      <RouterLink to="/" class="btn btn-secondary">메인 페이지로 돌아가기</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

body {
  margin: 0;
  font-family: 'Pretendard', sans-serif;
  background-color: #f1f3fc;
  color: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

.complete-container {
  background: #ffffff;
  padding: 48px 32px;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.checkmark {
  font-size: 4rem;
  color: #5790ff;
  margin-bottom: 24px;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.description {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 32px;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
}

.btn {
  padding: 14px;
  font-size: 1.05rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  text-align: center;
}

.btn-primary {
  background-color: #5790ff;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #365ec9;
}

.btn-secondary {
  background-color: #f3f3f3;
  color: #1a1a1a;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}
</style>
<script setup>
// 스크립트 로직 없음 (Pure Content)
</script>

<template>
  <section class="profile-container" aria-label="프로필 조회 섹션">
    <div class="profile-card">
      <header class="profile-header">
        <img
          src="https://cdn.pixabay.com/photo/2014/08/29/03/02/horses-430441_1280.jpg"
          alt="프로필 이미지"
          class="profile-image"
        />
        <div class="profile-basic">
          <div class="nickname-line">
            <h2 class="nickname">길동이</h2>
            <span class="manner-temp">93.5° 매너온도</span>
          </div>
          <p class="name-email">홍길동 / hong@test.com</p>
        </div>
      </header>

      <div class="profile-info">
        <div class="info-item">
          <label class="info-label">연락처</label>
          <div class="info-value">010-1234-5678</div>
        </div>
        <div class="info-item">
          <label class="info-label">성별</label>
          <div class="info-value">남성</div>
        </div>
        <div class="info-item">
          <label class="info-label">생년월일</label>
          <div class="info-value">1993-08-15</div>
        </div>
        <div class="info-item">
          <label class="info-label">포인트 잔액</label>
          <div class="info-value">12,500P</div>
        </div>
      </div>

      <section class="introduction-box" aria-label="자기소개 섹션">
        <h3 class="introduction-title">자기소개</h3>
        <p class="introduction-content">
          안녕하세요! 풋살과 러닝을 좋아하는 홍길동입니다. 주말마다 모임 참여 중이고, 새로운
          사람들과 함께 뛰는 걸 즐깁니다!
        </p>
      </section>
    </div>
  </section>
</template>

<style scoped>
.profile-card {
  @apply w-full max-w-2xl bg-white;
}

.profile-header {
  @apply flex items-center gap-6 mb-8;
}

.profile-image {
  @apply w-28 h-28 rounded-full object-cover border-4 border-blue-100;
}

.profile-basic {
  @apply flex flex-col gap-2 flex-1;
}

.nickname-line {
  @apply flex items-center gap-4;
}

.nickname {
  @apply text-2xl font-bold text-gray-900;
}

.manner-temp {
  @apply text-yellow-400 bg-yellow-100 text-base font-semibold px-3 py-1 rounded-full;
}

.name-email {
  @apply text-sm text-gray-500;
}

.profile-info {
  @apply grid gap-6 mt-8;
}

.info-item {
  @apply flex flex-col;
}

.info-label {
  @apply text-sm text-gray-500 mb-1;
}

.info-value {
  @apply text-base font-medium text-gray-900;
}

.introduction-box {
  @apply mt-8;
}

.introduction-title {
  @apply text-lg font-semibold text-gray-900 mb-2;
}

.introduction-content {
  @apply bg-gray-100 p-4 rounded-md text-sm leading-relaxed text-gray-700;
}
</style>

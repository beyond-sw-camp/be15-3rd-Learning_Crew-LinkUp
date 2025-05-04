<script setup>
// 별도 상태 없음 — 오직 이벤트 전달만 수행
defineEmits(['navigate'])
</script>


<template>
  <div class="floating-nav-place">
    <div class="nav-btn" @click="$emit('navigate', 'registerPlace')" title="장소 등록">
      <img src="@/assets/icons/meeting_and_place/sidebar-creat_meeting.svg" alt="장소 등록" width="24" height="24" />
    </div>
  </div>
</template>


<style scoped>
.floating-nav-place {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #f3f6ff;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
  transition: background-color 0.2s ease;
}

.floating-nav-place:hover {
  background: #5790ff;
}

.nav-btn {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-btn span {
  font-size: 28px;
  color: #5790ff;
  transition: color 0.2s ease;
}

.floating-nav-place:hover .nav-btn span {
  color: white;
}
</style>

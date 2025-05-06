<script setup>
/**
 * 이 컴포넌트는 상위에서:
 * - 'close' 이벤트 → 모달 닫기
 * - 'select' 이벤트 → reserved/map 중 선택 반환
 */
</script>


<template>
  <div class="create-modal">
    <div class="modal-box">
      <!-- 모달 헤더 -->
      <div class="modal-header">
        <h2>모임 개설 유형을 선택해주세요</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>

      <!-- 직접 지정 개설 -->
      <div class="option-card" @click="$emit('select', 'reserved')">
        <div class="option-icon">
          <img src="@/assets/icons/meeting_and_place/place.svg" alt="장소 예약" class="icon-img"/>
        </div>
        <div class="option-text">
          <div class="option-title">장소 예약 모임 개설</div>
          <div class="option-sub">예약할 장소를 먼저 선택한 후 모임을 개설합니다.</div>
        </div>
      </div>

      <!-- 지도 선택 개설 -->
      <div class="option-card" @click="$emit('select', 'map')">
        <div class="option-icon">
          <img src="../../../assets/icons/meeting_and_place/sidebar-create_meeting.svg" alt="지정 주소" class="icon-img"/>
        </div>
        <div class="option-text">
          <div class="option-title">지정 주소 모임 개설</div>
          <div class="option-sub">지도를 통해 장소를 선택한 후 모임을 개설합니다.</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.option-icon .icon-img {
  width: 28px;
  height: 28px;
  margin-top: 2px;
}
</style>


<script setup>
/**
 * 이 컴포넌트는 상위에서:
 * - 'close' 이벤트 → 모달 닫기
 * - 'select' 이벤트 → custom/map 중 선택 반환
 */
</script>


<template>
  <div class="create-modal">
    <div class="modal-box">
      <!-- 모달 헤더 -->
      <div class="modal-header">
        <h2>모임 개설 방식 선택</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>

      <!-- 직접 지정 개설 -->
      <div class="option-card" @click="$emit('select', 'custom')">
        <div class="option-icon">
          <span class="material-symbols-outlined">add_circle</span>
        </div>
        <div class="option-text">
          <div class="option-title">직접 지정하여 개설</div>
          <div class="option-sub">주소와 정보를 직접 입력해 모임을 개설합니다.</div>
        </div>
      </div>

      <!-- 지도 선택 개설 -->
      <div class="option-card" @click="$emit('select', 'map')">
        <div class="option-icon">
          <span class="material-symbols-outlined">map</span>
        </div>
        <div class="option-text">
          <div class="option-title">지도에서 선택하여 개설</div>
          <div class="option-sub">지도를 통해 장소를 선택하고 바로 개설할 수 있습니다.</div>
        </div>
      </div>
    </div>
  </div>
</template>


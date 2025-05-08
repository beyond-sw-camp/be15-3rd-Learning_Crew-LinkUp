<script setup>
const props = defineProps({
  meetings: Array,
  activeMeetingId: String
})

const emit = defineEmits(['select'])

const defaultImg = 'https://via.placeholder.com/40?text=모임'

/**
 * 마커 위치 계산 (임시 랜덤 위치 예시)
 */
function getMarkerStyle(meeting) {
  const top = 100 + Math.random() * 300
  const left = 100 + Math.random() * 600
  return {
    top: `${top}px`,
    left: `${left}px`,
    position: 'absolute',
    cursor: 'pointer'
  }
}
</script>


<template>
  <div class="map-section">
    <img
      src="@/assets/images/Map.png"
      alt="지도"
      class="map-image"
    />
    <!-- 마커 표시 -->
    <div
      v-for="meeting in meetings"
      :key="meeting.id"
      class="map-marker"
      :class="{ active: meeting.id === activeMeetingId }"
      :style="getMarkerStyle(meeting)"
      @click="$emit('select', meeting.id)"
    >
      <img :src="meeting.thumbnail || defaultImg" class="marker-thumb" />
    </div>
  </div>
</template>

<style scoped>
.map-section {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 비율 유지를 하면서 꽉 차게 */
  display: block;
}

.map-marker {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.marker-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-marker.active {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.7);
}
</style>
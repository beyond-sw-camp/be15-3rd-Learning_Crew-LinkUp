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
      src="https://cdn.pixabay.com/photo/2016/04/14/18/08/map-1326271_1280.png"
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


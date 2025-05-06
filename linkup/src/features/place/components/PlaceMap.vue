<template>
  <div ref="mapContainer" class="map-container" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  places: { type: Array, required: true },
});
const emit = defineEmits(['select']);

const mapContainer = ref(null);
let map = null;
let overlays = [];

onMounted(() => {
  const script = document.createElement('script');
  script.src =
    'https://dapi.kakao.com/v2/maps/sdk.js?appkey=12dbd011a1ea44fdcaf77a5d5bdb81bc&libraries=services&autoload=false';
  document.head.appendChild(script);

  script.onload = () => {
    kakao.maps.load(() => {
      map = new kakao.maps.Map(mapContainer.value, {
        center: new kakao.maps.LatLng(37.5665, 126.978),
        level: 4,
      });
      drawOverlays();
      kakao.maps.event.addListener(map, 'zoom_changed', adjustOverlayScale);
    });
  };
});

watch(
  () => props.places,
  () => {
    if (map) {
      clearOverlays();
      drawOverlays();
    }
  },
  { deep: true }
);

function clearOverlays() {
  overlays.forEach(({ overlay }) => overlay.setMap(null));
  overlays = [];
}

function drawOverlays() {
  const geocoder = new kakao.maps.services.Geocoder();
  console.log('[마커 생성 시작]', props.places);

  props.places.forEach((place) => {
    geocoder.addressSearch(place.address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        console.log('[마커 대상]', place.name, result[0].y, result[0].x);

        const overlayContent = document.createElement('div');
        overlayContent.textContent = place.name;
        overlayContent.style.cssText = `
          padding: 8px 16px;
          background: white;
          border: 2px solid #5C7AEA;
          border-radius: 20px;
          font-size: 16px;
          font-weight: bold;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          transform-origin: bottom center;
          cursor: pointer;
        `;

        overlayContent.addEventListener('click', () => {
          emit('select', place);
        });

        const overlay = new kakao.maps.CustomOverlay({
          position: coords,
          yAnchor: 1.6,
          content: overlayContent,
        });

        overlay.setMap(map);
        overlays.push({ overlay, content: overlayContent });
      }
    });
  });
}

function adjustOverlayScale() {
  const zoom = map.getLevel();
  const scale = 1 + (4 - zoom) * 0.2;
  overlays.forEach(({ content }) => {
    content.style.transform = `scale(${scale})`;
  });
}
</script>

<style scoped>
.map-container {
  @apply w-full h-full;
}
</style>

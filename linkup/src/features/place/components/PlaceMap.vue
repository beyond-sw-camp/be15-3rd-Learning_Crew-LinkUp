<template>
  <div ref="mapContainer" class="map-container" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  places: { type: Array, required: true }
});
const emit = defineEmits(['select']);

const mapContainer = ref(null);
let map = null;
let overlays = [];
let userMarker = null; // 클릭으로 표시할 사용자 위치 마커

onMounted(() => {
  const script = document.createElement('script');
  script.src =
    'https://dapi.kakao.com/v2/maps/sdk.js?appkey=12dbd011a1ea44fdcaf77a5d5bdb81bc&libraries=services&autoload=false';
  document.head.appendChild(script);

  script.onload = () => {
    kakao.maps.load(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = parseFloat(position.coords.latitude.toFixed(10));
          const lng = parseFloat(position.coords.longitude.toFixed(10));
          const userLocation = new kakao.maps.LatLng(lat, lng);

          map = new kakao.maps.Map(mapContainer.value, {
            center: userLocation,
            level: 4,
          });

          userMarker = new kakao.maps.Marker({
            map: map,
            position: userLocation,
          });

          drawOverlays();
          kakao.maps.event.addListener(map, 'zoom_changed', adjustOverlayScale);
          kakao.maps.event.addListener(map, 'click', onMapClick);
        },
        (error) => {
          console.error('[MAP] 위치 정보를 가져올 수 없습니다.', error);

          const fallback = new kakao.maps.LatLng(37.5665, 126.978);
          map = new kakao.maps.Map(mapContainer.value, {
            center: fallback,
            level: 4,
          });

          drawOverlays();
          kakao.maps.event.addListener(map, 'zoom_changed', adjustOverlayScale);
          kakao.maps.event.addListener(map, 'click', onMapClick);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };
});

function onMapClick(mouseEvent) {
  const latlng = mouseEvent.latLng;
  map.setCenter(latlng);

  if (userMarker) {
    userMarker.setMap(null);
  }

  userMarker = new kakao.maps.Marker({
    map: map,
    position: latlng,
  });

  console.log('[MAP] 사용자가 선택한 위치:', latlng.getLat(), latlng.getLng());
  // emit('select', { lat: latlng.getLat(), lng: latlng.getLng() }); // 부모에게 전달하고 싶을 경우 사용
}

watch(() => props.places, drawOverlays, { deep: true });

async function drawOverlays() {
  if (!map) return;

  overlays.forEach(({ overlay }) => overlay.setMap(null));
  overlays = [];

  const geocoder = new kakao.maps.services.Geocoder();

  for (const place of props.places) {
    await new Promise((resolve) => {
      geocoder.addressSearch(place.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

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
            emit('select', { ...place });
          });

          const overlay = new kakao.maps.CustomOverlay({
            position: coords,
            yAnchor: 1.6,
            content: overlayContent,
          });

          overlay.setMap(map);
          overlays.push({ overlay, content: overlayContent });
        } else {
          console.warn(`[MAP] 주소 변환 실패: ${place.address}, 상태: ${status}`);
        }
        setTimeout(resolve, 150);
      });
    });
  }
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

<template>
  <div ref="mapContainer" class="map-container" />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  places: { type: Array, required: true },
})
const emit = defineEmits(['select'])

const mapContainer = ref(null)
let map = null
let overlays = []

onMounted(() => {
  const script = document.createElement('script')
  script.src =
    'https://dapi.kakao.com/v2/maps/sdk.js?appkey=12dbd011a1ea44fdcaf77a5d5bdb81bc&libraries=services&autoload=false'
  document.head.appendChild(script)

  script.onload = () => {
    kakao.maps.load(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          const accuracy = position.coords.accuracy

          console.log('📍 위도:', lat)
          console.log('📍 경도:', lng)
          console.log('🎯 위치 정확도(m):', accuracy)

          const userLocation = new kakao.maps.LatLng(lat, lng)

          map = new kakao.maps.Map(mapContainer.value, {
            center: userLocation,
            level: 4,
          })

          new kakao.maps.Marker({
            map: map,
            position: userLocation,
          })

          drawOverlays()
          kakao.maps.event.addListener(map, 'zoom_changed', adjustOverlayScale)
        },
        (error) => {
          console.error('[MAP] 위치 정보를 가져올 수 없습니다.', error)

          const fallback = new kakao.maps.LatLng(37.5665, 126.978)
          map = new kakao.maps.Map(mapContainer.value, {
            center: fallback,
            level: 4,
          })

          drawOverlays()
          kakao.maps.event.addListener(map, 'zoom_changed', adjustOverlayScale)
        },
        {
          enableHighAccuracy: true, // 이 옵션을 켜야 GPS 기반 위치 사용됨
          timeout: 10000,
          maximumAge: 0,
        }
      )
    })
  }
})

function drawOverlays() {
  const geocoder = new kakao.maps.services.Geocoder()

  props.places.forEach((place) => {
    geocoder.addressSearch(place.address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x)

        const overlayContent = document.createElement('div')
        overlayContent.textContent = place.name
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
        `

        overlayContent.addEventListener('click', () => {
          console.log('[MAP] Overlay clicked:', place.name)
          emit('select', place)
        })

        const overlay = new kakao.maps.CustomOverlay({
          position: coords,
          yAnchor: 1.6,
          content: overlayContent,
        })

        overlay.setMap(map)
        overlays.push({ overlay, content: overlayContent })
      }
    })
  })
}

function adjustOverlayScale() {
  const zoom = map.getLevel()
  const scale = 1 + (4 - zoom) * 0.2
  overlays.forEach(({ content }) => {
    content.style.transform = `scale(${scale})`
  })
}
</script>

<style scoped>
.map-container {
  @apply w-full h-full;
}
</style>
z
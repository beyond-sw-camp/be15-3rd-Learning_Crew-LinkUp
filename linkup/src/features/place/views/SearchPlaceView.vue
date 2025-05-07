<script setup>
import { ref, reactive, onMounted } from 'vue'
import FilterSportSelector from '@/features/place/components/FilterSportSelector.vue'
import PlaceCard from '@/features/place/components/PlaceCard.vue'
import FloatingNavPlace from '@/features/place/components/FloatingNavPlace.vue'
import MapDisplay from '@/components/common/MapDisplay.vue'
import FilterRegionSelector from '@/features/place/components/FilterRegionSelector.vue'
import '@/assets/css/search-common.css'

// 필터 조건
const filters = reactive({
  regionCode: '',
  sportType: ''
})

// 더미 장소 데이터
const dummyPlaces = [
  {
    placeId: 1,
    name: '신촌 풋살 센터',
    address: '서울 서대문구 연세로 12',
    price: '40,000원/시간',
    rating: 4.5,
    imageUrl: '/img/place_img1.png'
  },
  {
    placeId: 2,
    name: '서울 탁구장',
    address: '서울 마포구 합정동',
    price: '15,000원/시간',
    rating: 4.8,
    imageUrl: ''
  }
]

const places = ref([])

function loadPlaces() {
  // 실제 API 연동 시 filters.regionCode / sportType 반영 예정
  places.value = dummyPlaces
}

function handleFloatingNav(action) {
  if (action === 'registerPlace') {
    console.log('장소 등록으로 이동') // 예: router.push('/place-register')
  }
}

onMounted(() => {
  loadPlaces()
})
</script>


<template>
  <div class="container">
    <!-- 사이드바 -->
    <aside class="sidebar">
      <!-- 운동 필터 + 지역 필터 -->
      <div class="filter-box">
        <div class="filter-row">
          <FilterRegionSelector v-model="filters.regionCode" />
          <FilterSportSelector v-model="filters.sportType" />
          <button class="search-btn" @click="loadPlaces">검색</button>
        </div>
      </div>

      <!-- 장소 카드 리스트 -->
      <div class="place-list">
        <PlaceCard
          v-for="place in places"
          :key="place.placeId"
          :place="place"
        />
      </div>
    </aside>

    <!-- 지도 영역 -->
    <main class="map-section">
      <MapDisplay :items="places" mapType="place" />
    </main>

    <!-- 장소 등록 버튼 -->
    <FloatingNavPlace @navigate="handleFloatingNav" />
  </div>
</template>


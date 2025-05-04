<template>
  <SidebarMainLayout width="400px" sidebarClass="h-[calc(100vh-80px)]">
    <template #sidebar>
      <section class="sidebar-content" aria-label="장소 리스트 영역">
        <PlaceFilter :modelValue="filter" @filter-change="updateFilter" />
        <PlaceList :places="filteredPlaces" @select="openModal" />
      </section>
    </template>

    <template #main>
      <main class="map-area" aria-label="지도 영역">
        <!-- ✅ 마커 클릭 시 모달 열리도록 이벤트 연결 -->
        <PlaceMap :places="filteredPlaces" @select="openModal" />
      </main>
    </template>

    <button class="floating-add-btn">장소 등록</button>

    <PlaceDetailMember
      v-if="selectedPlace"
      :place="selectedPlace"
      @close="closeModal"
    />
  </SidebarMainLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import SidebarMainLayout from '@/components/layout/SidebarMainLayout.vue';
import PlaceFilter from '../components/PlaceFilter.vue';
import PlaceList from '../components/PlaceList.vue';
import PlaceMap from '../components/PlaceMap.vue';
import PlaceDetailMember from '../components/PlaceDetailMember.vue';

const filter = ref({
  region: '전체',
  subRegion: '전체',
  category: '전체',
});

const selectedPlace = ref(null);
function openModal(place) {
  console.log('[openModal]', place.name); // 디버깅용
  selectedPlace.value = place;
}
function closeModal() {
  selectedPlace.value = null;
}

function updateFilter(newFilter) {
  filter.value = newFilter;
}

const allPlaces = ref([
  {
    name: '신촌 풋살 센터',
    address: '서울 서대문구 연세로 12',
    region: '서울',
    subRegion: '서대문',
    category: '풋살',
    price: '40,000',
    image: 'https://images.unsplash.com/photo-1590595905382-cd3f6e5adf5d',
    description: '깔끔한 인조잔디가 깔려 있는 신촌 풋살 센터입니다. 샤워실과 탈의실이 완비되어 있으며, 팀 단위 모임에 적합합니다.',
    equipment: '풋살공, 조끼, 골대',
    operationTime: [
      '월요일 ~ 금요일: 09:00 - 22:00',
      '토요일: 10:00 - 20:00',
      '일요일: 휴무'
    ],
    reviews: [
      {
        nickname: '운동매니아',
        score: 3,
        date: '2025.04.18',
        text: '시설도 깨끗하고, 주차도 쉬워서 아주 만족스러웠어요. 다음에 또 이용할 예정입니다!',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
      },
      {
        nickname: '풋살러버',
        score: 4,
        date: '2025.04.15',
        text: '조명도 밝고 인조잔디 상태도 좋았어요! 샤워실이 넓어서 팀 전원 만족!',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
      }
    ]
  },
  {
    name: '강남 실내 농구장',
    address: '서울 강남구 테헤란로 100',
    region: '서울',
    subRegion: '강남',
    category: '농구',
    price: '30,000',
    image: '',
    description: '강남 한복판에 위치한 쾌적한 실내 농구장입니다.',
    equipment: '농구공, 골대, 전광판',
    operationTime: [
      '매일: 08:00 - 23:00'
    ],
    reviews: []
  }
]);

const filteredPlaces = computed(() =>
  allPlaces.value.filter((place) => {
    const matchRegion = filter.value.region === '전체' || place.region === filter.value.region;
    const matchSubRegion = filter.value.subRegion === '전체' || place.subRegion === filter.value.subRegion;
    const matchCategory = filter.value.category === '전체' || place.category === filter.value.category;
    return matchRegion && matchSubRegion && matchCategory;
  })
);
</script>

<style scoped>
.sidebar-content {
  @apply relative flex flex-col gap-4 h-full pt-[20px];
}
.map-area {
  @apply flex-1 h-full;
}
.floating-add-btn {
  @apply fixed bottom-6 right-6 bg-blue-500 text-white px-5 py-3 rounded-full cursor-pointer;
}
</style>

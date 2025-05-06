
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
import { ref, computed, onMounted } from 'vue';
import { getPlaceList } from '@/api/place';

import SidebarMainLayout from '@/components/layout/SidebarMainLayout.vue';
import PlaceFilter from '../components/PlaceFilter.vue';
import PlaceList from '../components/PlaceList.vue';
import PlaceMap from '../components/PlaceMap.vue';
import PlaceDetailMember from '../components/PlaceDetailMember.vue';

const allPlaces = ref([]);
const filter = ref({ region: '전체', subRegion: '전체', category: '전체' });

onMounted(async () => {
  const { data } = await getPlaceList();
  console.log('[Place API]', data);
  allPlaces.value = data.data.place.map((p) => ({
    placeId: p.placeId,
    name: p.placeName,
    address: p.address,
    price: `${p.rentalCost.toLocaleString()}`,
    image: '', // 이미지 미포함 시 기본 처리
    reviewRating: p.reviewRating,
    latitude: p.latitude,
    longitude: p.longitude
  }));
});

const filteredPlaces = computed(() =>
  allPlaces.value.filter((place) => {
    const { region, subRegion, category } = filter.value;
    return (
      (region === '전체' || place.region === region) &&
      (subRegion === '전체' || place.subRegion === subRegion) &&
      (category === '전체' || place.category === category)
    );
  })
);

const selectedPlace = ref(null);
function openModal(place) {
  selectedPlace.value = place;
}
function closeModal() {
  selectedPlace.value = null;
}

function updateFilter(newFilter) {
  filter.value = newFilter;
}
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

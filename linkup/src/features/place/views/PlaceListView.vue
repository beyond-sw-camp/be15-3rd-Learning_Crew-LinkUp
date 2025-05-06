<template>
  <SidebarMainLayout width="400px" sidebarClass="h-[calc(100vh-80px)]">
    <template #sidebar>
      <section class="sidebar-content" aria-label="장소 리스트 영역">
        <PlaceFilter :modelValue="filter" @update:modelValue="updateFilter" />
        <PlaceList :places="places" @select="openModal" />
      </section>
    </template>
    <template #main>
      <main class="map-area" aria-label="지도 영역">
        <PlaceMap :places="places" @select="openModal" />
      </main>
    </template>
    <PlaceDetailMember
      v-if="selectedPlace"
      :place="selectedPlace"
      @close="closeModal"
    />
  </SidebarMainLayout>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { getPlaceList } from '@/api/place';
import SidebarMainLayout from '@/components/layout/SidebarMainLayout.vue';
import PlaceFilter from '../components/PlaceFilter.vue';
import PlaceList from '../components/PlaceList.vue';
import PlaceMap from '../components/PlaceMap.vue';
import PlaceDetailMember from '../components/PlaceDetailMember.vue';

const filter = ref({
  region: '',
  subRegion: '',
  category: '',
  sportId: ''
});

const places = ref([]);
const selectedPlace = ref(null);

async function fetchPlaceList() {
  const params = {};
  if (filter.value.subRegion) params.address = filter.value.subRegion;
  if (filter.value.sportId) params.sportId = filter.value.sportId;

  const { data } = await getPlaceList(params);
  places.value = data.data.place.map((p) => ({
    placeId: p.placeId,
    name: p.placeName,
    address: p.address,
    price: `${p.rentalCost.toLocaleString()}`,
    image: p.imageUrl || '',
    reviewRating: p.reviewRating,
    sportName: p.sportName || '', // 백엔드에서 함께 내려줘야 함
    latitude: p.latitude,
    longitude: p.longitude,
  }));
}

function updateFilter(newFilter) {
  filter.value = newFilter;
}

function openModal(place) {
  selectedPlace.value = place;
}
function closeModal() {
  selectedPlace.value = null;
}

watchEffect(fetchPlaceList);
</script>

<style scoped>
.sidebar-content {
  @apply relative flex flex-col gap-4 h-full pt-[20px];
}
.map-area {
  @apply flex-1 h-full;
}
</style>

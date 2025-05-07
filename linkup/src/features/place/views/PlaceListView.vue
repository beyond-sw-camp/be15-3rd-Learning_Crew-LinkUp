<template>
  <SidebarMainLayout width="400px" sidebarClass="h-[calc(100vh-80px)]">
    <template #sidebar>
      <section class="sidebar-content" aria-label="장소 리스트 영역">
        <PlaceFilter :modelValue="filter" @update:modelValue="updateFilter" />
        <PlaceList
          :places="places"
          @select="openModal"
          @toggle-favorite="toggleFavorite"
        />
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
import { useAuthStore } from '@/stores/auth.js';
import { getPlaceList } from '@/api/place';
import { createFavorite, deleteFavorite, getFavoritePlaceIds } from '@/api/favorite';

import SidebarMainLayout from '@/components/layout/SidebarMainLayout.vue';
import PlaceFilter from '../components/PlaceFilter.vue';
import PlaceList from '../components/PlaceList.vue';
import PlaceMap from '../components/PlaceMap.vue';
import PlaceDetailMember from '../components/PlaceDetailMember.vue';

const authStore = useAuthStore();
const filter = ref({
  region: '',
  subRegion: '',
  category: '',
  sportId: ''
});
const places = ref([]);
const selectedPlace = ref(null);

async function fetchPlaceList() {
  const memberId = authStore.userId;
  const params = {};
  if (filter.value.subRegion) params.address = filter.value.subRegion;
  if (filter.value.sportId) params.sportId = filter.value.sportId;

  const [placeRes, favoriteRes] = await Promise.all([
    getPlaceList(params),
    memberId
      ? getFavoritePlaceIds(memberId)
      : Promise.resolve({ data: { data: { favorites: [] } } })
  ]);

  const favoriteIdSet = new Set(
    favoriteRes.data.data.favorites.map(f => f.placeId)
  );

  const merged = placeRes.data.data.place.map((p) => ({
    placeId: p.placeId,
    name: p.placeName,
    address: p.address,
    price: `${p.rentalCost.toLocaleString()}`,
    image: p.imageUrl || '',
    reviewRating: p.reviewRating,
    sportName: p.sportName || '',
    latitude: p.latitude,
    longitude: p.longitude,
    isFavorite: favoriteIdSet.has(p.placeId)
  }));

  // 즐겨찾기 우선 정렬
  merged.sort((a, b) => (b.isFavorite === true) - (a.isFavorite === true));
  places.value = merged;
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

async function toggleFavorite(place) {
  const memberId = authStore.userId;
  if (!memberId) {
    console.error('❌ memberId가 없습니다. 로그인 필요');
    return;
  }

  try {
    if (place.isFavorite) {
      await deleteFavorite(place.placeId, memberId);
    } else {
      await createFavorite(place.placeId, { memberId });
    }

    // 갱신된 상태를 반영해 fetch
    await fetchPlaceList();
  } catch (err) {
    console.error('즐겨찾기 실패:', err);
  }
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

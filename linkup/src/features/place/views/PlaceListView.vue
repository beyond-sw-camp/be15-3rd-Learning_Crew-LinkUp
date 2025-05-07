<template>
  <div>
    <SidebarMainLayout width="400px" sidebarClass="h-[calc(100vh-80px)]">
      <template #sidebar>
        <section class="sidebar-content">
          <PlaceFilter :modelValue="filter" @update:modelValue="updateFilter" />
          <PlaceList
            :places="places"
            :showFavorite="authStore.userRole !== 'BUSINESS'"
            @select="openModal"
            @toggle-favorite="toggleFavorite"
          />
        </section>
      </template>

      <template #main>
        <main class="map-area">
          <PlaceMap :places="places" @select="openModal" />
        </main>
      </template>
    </SidebarMainLayout>

    <!-- ✅ 모달은 무조건 body 아래로 이동 -->
    <Teleport to="body">
      <PlaceDetailMember
        v-if="selectedPlace && selectedPlace.placeId"
        :place="{ ...selectedPlace }"
        @close="closeModal"
      />
    </Teleport>

    <!-- ✅ 사업자용 플로팅 등록 버튼 -->
    <RouterLink
      v-if="authStore.userRole === 'BUSINESS'"
      to="/place/register/step1"
      class="fixed bottom-6 right-6 z-50"
    >
      <button
        class="bg-blue-500 text-white rounded-full shadow-lg w-14 h-14 text-2xl
               hover:bg-blue-600 transition flex items-center justify-center"
      >
        +
      </button>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { getPlaceList } from '@/api/place';
import { createFavorite, deleteFavorite, getFavoritePlaceIds } from '@/api/favorite';
import { useAuthStore } from '@/stores/auth.js';

import SidebarMainLayout from '@/components/layout/SidebarMainLayout.vue';
import PlaceFilter from '../components/PlaceFilter.vue';
import PlaceList from '../components/PlaceList.vue';
import PlaceMap from '../components/PlaceMap.vue';
import PlaceDetailMember from '../components/PlaceDetailMember.vue';

const authStore = useAuthStore();
const filter = ref({ region: '', subRegion: '', category: '', sportId: '' });
const places = ref([]);
const selectedPlace = ref(null);

async function fetchPlaceList() {
  const memberId = authStore.userId;
  const isBusiness = authStore.userRole === 'BUSINESS';
  const params = {};
  if (filter.value.subRegion) params.address = filter.value.subRegion;
  if (filter.value.sportId) params.sportId = filter.value.sportId;

  try {
    const placeRes = await getPlaceList(params);
    let favorites = [];

    if (!isBusiness && memberId) {
      try {
        favorites = await getFavoritePlaceIds(memberId);
      } catch (e) {}
    }

    const favoriteSet = new Set(favorites.map(f => f.placeId));
    places.value = placeRes.data.data.place.map(p => ({
      placeId: p.placeId,
      name: p.placeName,
      address: p.address,
      price: `${p.rentalCost.toLocaleString()}`,
      image: p.imageUrl || '',
      reviewRating: p.reviewRating,
      sportName: p.sportName || '',
      latitude: p.latitude,
      longitude: p.longitude,
      isFavorite: favoriteSet.has(p.placeId)
    }));

    if (!isBusiness) {
      places.value.sort((a, b) => (b.isFavorite === true) - (a.isFavorite === true));
    }
  } catch (err) {
    console.error('❌ 장소 목록 조회 실패:', err);
  }
}

function updateFilter(newFilter) {
  filter.value = newFilter;
}

function openModal(place) {
  console.log('[🧪 모달 열기 시도]', place);
  selectedPlace.value = place;
}

function closeModal() {
  selectedPlace.value = null;
}

async function toggleFavorite(place) {
  const memberId = authStore.userId;
  if (!memberId || authStore.userRole === 'BUSINESS') return;

  const wasFavorite = place.isFavorite;
  place.isFavorite = !wasFavorite;

  try {
    if (wasFavorite) {
      await deleteFavorite(place.placeId, memberId);
    } else {
      await createFavorite(place.placeId, memberId);
    }

    places.value.sort((a, b) => (b.isFavorite === true) - (a.isFavorite === true));
  } catch (err) {
    console.error('❌ 즐겨찾기 토글 실패:', err);
    place.isFavorite = wasFavorite;
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

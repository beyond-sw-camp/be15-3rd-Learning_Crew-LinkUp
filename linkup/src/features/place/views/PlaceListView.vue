<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
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
const page = ref(1);
const size = 4;
const isLoading = ref(false);
const hasMore = ref(true);

onMounted(() => {
  const script = document.createElement('script');
  script.src =
    'https://dapi.kakao.com/v2/maps/sdk.js?appkey=12dbd011a1ea44fdcaf77a5d5bdb81bc&libraries=services&autoload=false';
  document.head.appendChild(script);

  script.onload = () => {
    kakao.maps.load(() => {
      fetchPlaceList();
    });
  };

  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function calculateDistance(lat1, lng1, lat2, lng2) {
  if (
    !lat1 || !lng1 || !lat2 || !lng2 ||
    isNaN(lat1) || isNaN(lng1) || isNaN(lat2) || isNaN(lng2)
  ) return Infinity;

  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getLatLngFromAddress(address) {
  return new Promise((resolve) => {
    if (typeof kakao === 'undefined' || !kakao.maps || !kakao.maps.services) {
      console.warn('[❌ Kakao 지도 SDK 미로딩 상태]');
      resolve({ lat: null, lng: null });
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const lat = parseFloat(result[0].y);
        const lng = parseFloat(result[0].x);
        resolve({ lat, lng });
      } else {
        console.warn('[❌ 주소 변환 실패]', address, status);
        resolve({ lat: null, lng: null });
      }
    });
  });
}

function handleScroll() {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  if (scrollY + viewportHeight >= fullHeight - 100) {
    fetchPlaceList();
  }
}

async function fetchPlaceList() {
  if (isLoading.value || !hasMore.value) return;
  isLoading.value = true;
  const memberId = authStore.userId;
  const isBusiness = authStore.userRole === 'BUSINESS';
  const params = { page: page.value, size };
  if (filter.value.subRegion) params.address = filter.value.subRegion;
  if (filter.value.sportId) params.sportId = filter.value.sportId;

  try {
    const placeRes = await getPlaceList(params);
    let favorites = [];
    if (!isBusiness && memberId) {
      try {
        favorites = await getFavoritePlaceIds(memberId);
      } catch (e) {
        console.warn('[⚠️ 즐겨찾기 조회 실패]', e);
      }
    }

    const favoriteSet = new Set(favorites.map(f => f.placeId));

    const rawPlaces = await Promise.all(
      placeRes.data.data.place.map(async (p) => {
        let lat = parseFloat(p.latitude);
        let lng = parseFloat(p.longitude);

        if (isNaN(lat) || isNaN(lng)) {
          const coords = await getLatLngFromAddress(p.address);
          lat = coords.lat;
          lng = coords.lng;
        }

        return {
          placeId: p.placeId,
          name: p.placeName,
          address: p.address,
          price: `${p.rentalCost.toLocaleString()}`,
          image: p.imageUrl || '',
          reviewRating: p.reviewRating,
          sportName: p.sportName || '',
          latitude: lat,
          longitude: lng,
          isFavorite: favoriteSet.has(p.placeId)
        };
      })
    );

    const totalPage = placeRes.data.data.pagination.totalPage;
    page.value++;
    hasMore.value = page.value < totalPage;

    if (!isBusiness) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = parseFloat(pos.coords.latitude.toFixed(10));
          const lng = parseFloat(pos.coords.longitude.toFixed(10));

          const withDistance = rawPlaces.map(p => {
            const distance = calculateDistance(lat, lng, p.latitude, p.longitude);
            return { ...p, distance };
          });

          withDistance.sort((a, b) => {
            if (a.isFavorite !== b.isFavorite) return b.isFavorite - a.isFavorite;

            const aInvalid = !a.distance || isNaN(a.distance) || !isFinite(a.distance);
            const bInvalid = !b.distance || isNaN(b.distance) || !isFinite(b.distance);

            if (aInvalid && bInvalid) return 0;
            if (aInvalid) return 1;
            if (bInvalid) return -1;

            return a.distance - b.distance;
          });

          places.value.push(...withDistance);
          isLoading.value = false;
        },
        (err) => {
          console.warn('📍 위치 가져오기 실패:', err);
          rawPlaces.sort((a, b) => b.isFavorite - a.isFavorite);
          places.value.push(...rawPlaces);
          isLoading.value = false;
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      places.value.push(...rawPlaces);
      isLoading.value = false;
    }
  } catch (err) {
    console.error('❌ 장소 목록 조회 실패:', err);
    isLoading.value = false;
  }
}

function updateFilter(newFilter) {
  filter.value = newFilter;
  page.value = 0;
  hasMore.value = true;
  places.value = [];
  fetchPlaceList();
}

function openModal(place) {
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

    places.value.sort((a, b) => {
      if (a.isFavorite !== b.isFavorite) return b.isFavorite - a.isFavorite;

      const aInvalid = !a.distance || isNaN(a.distance) || !isFinite(a.distance);
      const bInvalid = !b.distance || isNaN(b.distance) || !isFinite(b.distance);

      if (aInvalid && bInvalid) return 0;
      if (aInvalid) return 1;
      if (bInvalid) return -1;

      return a.distance - b.distance;
    });
  } catch (err) {
    console.error('❌ 즐겨찾기 토글 실패:', err);
    place.isFavorite = wasFavorite;
  }
}
</script>

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

    <Teleport to="body">
      <PlaceDetailMember
        v-if="selectedPlace && selectedPlace.placeId"
        :place="{ ...selectedPlace }"
        @close="closeModal"
      />
    </Teleport>

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

<style scoped>
.sidebar-content {
  @apply relative flex flex-col gap-4 h-full pt-[20px];
}
.map-area {
  @apply flex-1 h-full;
}
</style>
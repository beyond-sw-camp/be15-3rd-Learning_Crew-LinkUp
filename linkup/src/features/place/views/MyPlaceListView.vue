<template>
  <div class="flex h-[calc(100vh-100px)]">
    <PlaceList :places="places" @select="handleSelect" class="w-1/2 border-r" />

    <PlaceMap :places="places" @select="handleSelect" class="w-1/2" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPlacesByOwner } from '@/api/place';
import { useAuthStore } from '@/stores/auth';

import PlaceList from '@/features/place/components/PlaceList.vue';
import PlaceMap from '@/features/place/components/PlaceMap.vue';

const places = ref([]);
const authStore = useAuthStore();

function getUserIdFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return parseInt(payload.sub);
  } catch {
    return null;
  }
}

function handleSelect(place) {
  alert(`선택한 장소: ${place.name}`);
}

onMounted(async () => {
  const token = authStore.accessToken;
  const ownerId = getUserIdFromToken(token);

  if (!ownerId) {
    console.warn('유효한 사용자 ID 없음');
    return;
  }

  try {
    const { data } = await getPlacesByOwner(ownerId);
    places.value = data.data.place.map((p) => ({
      ...p,
      name: p.placeName, // 지도 컴포넌트가 name을 쓰므로 맞춰줌
      image: p.imageUrl?.[0] || '', // PlaceCard.vue에서 image prop 사용 시 대비
      price: p.rentalCost,
    }));
  } catch (err) {
    console.error('[사업자 장소 목록 조회 실패]', err);
  }
});
</script>

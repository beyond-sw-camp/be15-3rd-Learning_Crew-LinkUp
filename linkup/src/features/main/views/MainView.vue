<script setup>
import { ref, computed } from 'vue';
import SidebarMainLayout from '@/components/layout/SidebarMainLayout.vue';
import SearchBar from '@/features/main/components/SearchBar.vue';
import CardList from '@/components/common/CardList.vue';

const searchText = ref('');
const cards = ref([
  {
    imageUrl: 'https://cdn.pixabay.com/photo/2023/06/08/13/31/balls-8049598_1280.jpg',
    date: '2025.04.23 (화)',
    title:
      '요즘같은 선선한 날에 축구 한판 어때요! 요즘같은 선선한 날에 축구 한판 어때요! 요즘같은 선선한 날에 축구 한판 어때요! 요즘같은 선선한 날에 축구 한판 어때요!',
    location: '서울 도봉구 방학로 223',
    likeCount: 32,
    price: '20,000원',
  },
  {
    imageUrl: 'https://media.istockphoto.com/id/2002620668/ko/사진.jpg',
    date: '📅 2025.04.23 (화)',
    title: '러닝한번 하시죠~~!!',
    location: '📍여의도 이랜드 크루즈 근처',
    likeCount: 82,
    price: '5,000원',
  },
  {
    imageUrl: 'https://media.istockphoto.com/id/2002620668/ko/사진.jpg',
    date: '📅 2025.04.23 (화)',
    title: '러닝한번 하시죠~~!!',
    location: '📍여의도 이랜드 크루즈 근처',
    likeCount: 82,
    price: '5,000원',
  },
  {
    imageUrl: 'https://media.istockphoto.com/id/2002620668/ko/사진.jpg',
    date: '📅 2025.04.23 (화)',
    title: '러닝한번 하시죠~~!!',
    location: '📍여의도 이랜드 크루즈 근처',
    likeCount: 82,
    price: '5,000원',
  },
]);

const filteredCards = computed(() => {
  if (!searchText.value) return cards.value;
  return cards.value.filter(
    (card) => card.title.includes(searchText.value) || card.location.includes(searchText.value),
  );
});

const searchItems = [
  { icon: '👾', label: '이상천외한 숙소' },
  { icon: '⭐', label: '컬쳐 아이콘' },
  { icon: '🌲', label: '국립공원' },
  { icon: '🏰', label: '캐슬' },
  { icon: '🏌️‍♂️', label: '골프장' },
  { icon: '🏛️', label: '유르트' },
  { icon: '🏡', label: '한적한 시골' },
  { icon: '🖼️', label: '최고의 전망' },
];
</script>

<template>
  <SidebarMainLayout width="500px" sidebarClass="h-[calc(100vh-100px)]">
    <SearchBar :items="searchItems" />

    <template #sidebar>
      <section class="sidebar-content" aria-label="모임 리스트 영역">
        <CardList :items="filteredCards" />
      </section>
    </template>

    <template #main>
      <main class="map-area" aria-label="지도 영역">
        <div class="map-placeholder">지도 영역입니다.</div>
      </main>
    </template>
  </SidebarMainLayout>
</template>

<style scoped>
.sidebar-content {
  @apply relative flex flex-col gap-4 h-full pt-[80px]; /* SearchBar 높이만큼 패딩 */
}

.map-area {
  @apply flex-1 h-full flex items-center justify-center;
}

.map-placeholder {
  @apply w-full h-full bg-gray-200 flex items-center justify-center;
}
</style>

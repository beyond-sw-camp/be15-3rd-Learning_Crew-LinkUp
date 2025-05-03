<script setup>
import { ref, computed } from 'vue';
import SidebarMainLayout from '@/components/layout/SidebarMainLayout.vue';
import SearchBar from '@/features/main/components/SearchBar.vue';
import CardList from '@/components/common/CardList.vue';
const sportsIcons = import.meta.glob('@/assets/icons/sports/*.svg', {
  eager: true,
  import: 'default',
});

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
]);

const filteredCards = computed(() => {
  if (!searchText.value) return cards.value;
  return cards.value.filter(
    (card) => card.title.includes(searchText.value) || card.location.includes(searchText.value),
  );
});

const searchItems = [
  { icon: sportsIcons['/src/assets/icons/sports/whole.svg'], label: '전체' },
  { icon: sportsIcons['/src/assets/icons/sports/football.svg'], label: '축구' },
  { icon: sportsIcons['/src/assets/icons/sports/basketball.svg'], label: '농구' },
  { icon: sportsIcons['/src/assets/icons/sports/badminton.svg'], label: '배드민턴' },
  { icon: sportsIcons['/src/assets/icons/sports/golf.svg'], label: '골프' },
  { icon: sportsIcons['/src/assets/icons/sports/bowling.svg'], label: '볼링' },
  { icon: sportsIcons['/src/assets/icons/sports/tableTennis.svg'], label: '탁구' },
  { icon: sportsIcons['/src/assets/icons/sports/tennis.svg'], label: '테니스' },
  { icon: sportsIcons['/src/assets/icons/sports/etc.svg'], label: '기타' },
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

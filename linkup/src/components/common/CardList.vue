<script setup>
import CardItem from './CardItem.vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
    // 기본 구조 [{ imageUrl, date, title, location, likeCount, price }]
  },
});
</script>

<template>
  <section class="card-list" aria-label="모임 카드 리스트">
    <ul class="card-list-inner">
      <template v-if="items.length > 0">
        <li v-for="(item, index) in items" :key="index">
          <CardItem v-bind="item" />
        </li>
      </template>
      <template v-else>
        <li class="empty-message">
          <p>등록된 카드가 없습니다.</p>
        </li>
      </template>
    </ul>
  </section>
</template>

<style scoped>
.card-list {
  @apply overflow-y-auto bg-white p-12;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.card-list::-webkit-scrollbar {
  display: none; /* Webkit에서 스크롤 숨기기 */
}

.card-list-inner {
  @apply flex flex-col gap-3 list-none p-0 m-0;
}

.empty-message {
  @apply flex justify-center items-center h-full text-gray-400 text-sm;
}
</style>

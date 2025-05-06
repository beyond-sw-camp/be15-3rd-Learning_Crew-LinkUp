<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <nav class="search-bar-wrapper" aria-label="카테고리 검색">
    <div class="search-bar-content">
      <ul class="search-items">
        <li v-for="(item, index) in items" :key="index">
          <button class="search-item" type="button">
            <img :src="item.icon" alt="카테고리 아이콘" class="icon shrink-0" aria-hidden="true" />
            <span class="label">{{ item.label }}</span>
          </button>
        </li>
      </ul>
      <button type="button" class="filter-button">⚙️ 필터</button>
    </div>
  </nav>
</template>

<style scoped>
.search-bar-wrapper {
  @apply absolute top-0 left-0 w-full z-20 bg-background-surface shadow-md px-6 py-2;
}

.search-bar-content {
  @apply flex items-center bg-background-surface px-4 py-2;
}

.search-items {
  @apply flex gap-6 overflow-x-auto flex-1;
  @apply list-none p-0 m-0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.search-items::-webkit-scrollbar {
  display: none;
}

.search-item {
  @apply shrink-0 flex flex-col items-center text-center text-text-subtle text-sm whitespace-nowrap cursor-pointer;
  @apply hover:text-primary-default  transition-colors ease-in-out;
}

.icon {
  @apply mb-3 w-[32px] h-[32px] shrink-0;
  max-width: none; /* 추가!! */
}

.label {
  @apply text-xs;
}

.filter-button {
  @apply flex-shrink-0 ml-4 px-6 py-3 border border-border-subtle rounded-md text-sm text-text-default;
}
</style>

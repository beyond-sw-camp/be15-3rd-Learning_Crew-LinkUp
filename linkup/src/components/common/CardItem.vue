<script setup>
import { defineProps } from 'vue';
// import { BanknotesIcon } from '@heroicons/vue/16/solid/index.js';

const props = defineProps({
  imageUrl: { type: String, default: '' },
  date: { type: String, default: '' },
  title: { type: String, default: '' },
  location: { type: String, default: '' },
  likeCount: { type: Number, default: 0 },
  price: { type: String, default: '' },
});
</script>

<template>
  <article class="card" aria-label="모임 카드">
    <figure v-if="imageUrl" class="card-image">
      <img :src="imageUrl" alt="모임 이미지" />
    </figure>
    <div class="card-content">
      <time v-if="date" class="card-date">
        <img src="@/assets/icons/meeting_and_place/date.svg" alt="날짜 아이콘" />
        {{ date }}
      </time>
      <h3 v-if="title" class="card-title">{{ title }}</h3>
      <p v-else class="card-title sr-only">제목 없음</p>

      <p v-if="location" class="card-location">
        <img src="@/assets/icons/meeting_and_place/place.svg" alt="위치 아이콘" />
        {{ location }}
      </p>
      <p v-else class="card-location sr-only">장소 없음</p>

      <p v-if="likeCount" class="card-like">
        <img src="@/assets/icons/meeting_and_place/heart.svg" alt="좋아요 아이콘" />
        {{ likeCount }}명 찜
      </p>
      <p v-else class="card-like sr-only">찜 수 없음</p>

      <p v-if="price" class="card-price">
        <BanknotesIcon class="size-6 text-blue-500" />
        {{ price }}
      </p>
      <p v-else class="card-price sr-only">가격 정보 없음</p>
    </div>
  </article>
</template>

<style scoped>
.card {
  @apply flex flex-col gap-8 bg-white rounded-lg shadow-md transition-transform hover:-translate-y-1 overflow-hidden cursor-pointer;
}

.card-image img {
  @apply w-full h-[180px] object-cover;
}

.card-content {
  @apply flex flex-col gap-2 p-[10px];
}

.card-date {
  @apply text-sm text-gray-500 flex items-center gap-1;
}

.card-title {
  @apply text-lg font-bold text-text-default leading-tight line-clamp-2;
}

.card-location {
  @apply text-sm text-gray-600 flex items-center gap-1;
}

.card-like {
  @apply text-sm text-primary-default items-center flex gap-1;
}

.card-price {
  @apply text-base font-semibold text-primary-default mt-2 items-center flex gap-1;
}

/* 시각적으로 숨기지만 구조 유지 */
.sr-only {
  @apply absolute w-1 h-1 p-0 -m-1 overflow-hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

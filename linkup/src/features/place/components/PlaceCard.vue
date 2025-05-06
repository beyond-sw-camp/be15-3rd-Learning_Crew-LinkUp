<template>
  <div class="place-card" @click="$emit('click')">
    <!-- 오른쪽 상단 하트 아이콘 -->
    <div class="absolute top-3 right-3 z-10">
      <IconHeart
        class="w-6 h-6 text-gray-400 hover:text-red-500 transition"
        :class="{ 'text-red-500': isFavorite }"
        @click.stop="toggleFavorite"
      />
    </div>

    <!-- 이미지 -->
    <div class="image bg-gray-200 w-full h-32 rounded-lg mb-2"></div>

    <!-- 텍스트 정보 -->
    <div class="text">
      <!-- 제목 + 아이콘 -->
      <div class="flex items-center gap-1 mb-1 text-gray-800">
        <IconPlace class="w-4 h-4 text-blue-500" />
        <h3 class="font-bold text-lg">{{ title }}</h3>
      </div>

      <!-- 주소 -->
      <p class="text-sm text-gray-600">{{ address }}</p>

      <!-- 가격 + 아이콘 -->
      <div class="flex items-center gap-1 text-sm text-gray-600 mt-1">
        <IconDollar class="w-4 h-4 text-green-500" />
        <span>{{ price }}원/시간</span>
      </div>

      <!-- 평점 -->
      <div class="flex items-center gap-1 mt-1 text-sm text-yellow-500">
        <span class="text-base">⭐</span>
        <span class="text-gray-800">{{ reviewRating?.toFixed(1) || '0.0' }} / 5</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import IconPlace from '@/assets/icons/meeting_and_place/place.svg?component';
import IconDollar from '@/assets/icons/meeting_and_place/dollar.svg?component';
import IconHeart from '@/assets/icons/meeting_and_place/heart.svg?component';

defineProps({
  image: String,
  title: String,
  address: String,
  price: String,
  reviewRating: Number,
});

defineEmits(['click']);

const isFavorite = ref(false);
function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
  console.log('[하트 클릭] 즐겨찾기 상태:', isFavorite.value);
}
</script>

<style scoped>
.place-card {
  @apply relative bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer;
}
.image {
  @apply w-full h-[130px] bg-gray-100 rounded-md;
}
</style>

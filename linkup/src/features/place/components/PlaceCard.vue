<template>
  <div class="place-card" @click="$emit('click')">
    <div class="image-wrapper">
      <img :src="resolvedImage" :alt="title" class="place-image" />
      <img
        :src="favoriteIcon"
        alt="즐겨찾기"
        class="heart-icon"
        @click.stop="$emit('toggle-favorite')"
      />
    </div>
    <div class="place-info">
      <h3 class="place-title">{{ title }}</h3>
      <p class="place-address">{{ address }}</p>
      <div class="info-bottom">
        <p class="place-price">{{ price }}원/시간</p>
        <p class="place-rating">
          <img src="@/assets/icons/meeting_and_place/empty-star.svg" class="star-icon" />
          {{ formattedRating }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import defaultImage from '@/assets/images/linkup_bg.jpg';
import fullHeart from '@/assets/icons/meeting_and_place/full_heart.svg';
import emptyHeart from '@/assets/icons/meeting_and_place/heart.svg';

const props = defineProps({
  image: String,
  title: String,
  address: String,
  price: String,
  rating: [String, Number],
  isFavorite: Boolean
});

function isValidImage(img) {
  return typeof img === 'string' && img.trim() !== '' && img !== 'null' && img !== 'undefined';
}

const resolvedImage = computed(() => {
  return isValidImage(props.image) ? props.image : defaultImage;
});

const formattedRating = computed(() => {
  const r = parseFloat(props.rating);
  return !isNaN(r) ? r.toFixed(1) : '0.0';
});

const favoriteIcon = computed(() =>
  props.isFavorite ? fullHeart : emptyHeart
);
</script>

<style scoped>
.place-card {
  @apply flex flex-col bg-white rounded-xl shadow p-2 transition hover:-translate-y-1 cursor-pointer;
  min-height: 240px;
  position: relative;
}
.image-wrapper {
  position: relative;
}
.place-image {
  @apply w-full h-[160px] object-cover rounded-md;
}
.heart-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  z-index: 2;
}
.place-info {
  @apply mt-2;
  padding: 12px 16px;
  background: white;
  position: relative;
  z-index: 1;
}
.place-title {
  @apply text-base font-semibold text-black mb-1;
}
.place-address {
  @apply text-sm text-gray-600 mb-1;
}
.info-bottom {
  @apply flex justify-between items-center;
}
.place-price {
  @apply text-sm text-gray-600;
}
.place-rating {
  @apply text-sm font-semibold text-yellow-500 flex items-center gap-1;
}
.star-icon {
  width: 16px;
  height: 16px;
  filter: brightness(0.6) saturate(2);
}
</style>

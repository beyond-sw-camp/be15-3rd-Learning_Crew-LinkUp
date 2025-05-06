<template>
  <div class="modal">
    <div class="modal-content" v-if="detail">
      <img :src="detail.imageUrl?.[0]" alt="장소 이미지" class="main-image" />
      <h1>{{ detail.placeName }}</h1>
      <p class="address">{{ detail.address }}</p>
      <p class="description">{{ detail.description }}</p>
      <p class="equipment">비치 장비: {{ detail.equipment }}</p>

      <section class="operation">
        <h2>운영 시간</h2>
        <ul>
          <li v-for="(ot, index) in detail.operationTimes" :key="index">
            {{ ot.dayOfWeek }}: {{ ot.startTime }} ~ {{ ot.endTime }}
          </li>
        </ul>
      </section>

      <section class="reviews">
        <h2>장소 후기</h2>
        <div
          class="review"
          v-for="(review, index) in detail.placeReviews"
          :key="index"
        >
          <p class="nickname">{{ review.nickname }}</p>
          <p class="score">⭐ {{ review.reviewScore }}</p>
          <p class="date">{{ review.reviewDate }}</p>
          <p class="text">{{ review.reviewContent }}</p>
          <img v-if="review.reviewImageUrl" :src="review.reviewImageUrl" class="review-img" />
        </div>
      </section>

      <button class="close-btn" @click="$emit('close')">닫기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getPlaceDetail } from '@/api/place';

const props = defineProps({ place: Object });
const detail = ref(null);

watch(
  () => props.place?.placeId,
  async (id) => {
    if (!id) return;
    const { data } = await getPlaceDetail(id);
    detail.value = data.data;
  },
  { immediate: true }
);
</script>

<style scoped>
.modal {
  @apply fixed inset-0 bg-black/50 flex items-center justify-center z-50;
}
.modal-content {
  @apply bg-white p-6 rounded-lg w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto;
}
.main-image {
  @apply w-full h-60 object-cover rounded-md mb-4;
}
.address, .description, .equipment {
  @apply mb-2 text-gray-700;
}
.operation, .reviews {
  @apply mt-6;
}
.review {
  @apply bg-blue-50 p-3 rounded mb-4;
}
.review-img {
  @apply w-full h-32 object-cover mt-2 rounded;
}
.close-btn {
  @apply mt-6 px-4 py-2 bg-blue-500 text-white rounded;
}
</style>

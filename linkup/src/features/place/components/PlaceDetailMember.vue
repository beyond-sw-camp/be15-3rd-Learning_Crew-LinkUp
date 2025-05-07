<!-- src/features/place/components/PlaceDetailMember.vue -->
<template>
  <div class="modal-overlay" @click.self="close">
    <div class="container">
      <img :src="place.image" alt="장소 이미지" class="image" />
      <div class="content">
        <h1>{{ place.name }}</h1>
        <div class="subinfo">{{ place.address }} | 대여비: {{ place.price }}원</div>

        <div class="desc">
          {{ place.description }}<br />
          <strong>비치 장비:</strong> {{ place.equipment }}
        </div>

        <hr />

        <div class="section">
          <h2>운영 시간</h2>
          <ul>
            <li v-for="(time, index) in place.operationTime" :key="index">
              {{ time }}
            </li>
          </ul>
        </div>

        <hr />

        <div class="section">
          <h2>장소 후기</h2>

          <div v-for="(review, index) in place.reviews" :key="index" class="review-card">
            <div class="review-left">
              <div class="nickname-line">
                <span class="nickname">{{ review.nickname }}</span>
                <div class="review-stars">
                  <img
                    v-for="i in 5"
                    :key="i"
                    class="star"
                    :src="i <= review.score
                      ? 'https://upload.wikimedia.org/wikipedia/commons/1/18/Five-pointed_star.svg'
                      : 'https://upload.wikimedia.org/wikipedia/commons/4/49/Star_empty.svg'"
                  />
                </div>
              </div>
              <div class="review-date">{{ review.date }}</div>
              <div class="review-text">{{ review.text }}</div>
            </div>
            <div class="review-right">
              <img class="review-img" :src="review.image" alt="후기 이미지" />
            </div>
          </div>
        </div>

        <button class="button" @click="goToReservation(place)">예약하러 가기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  place: Object,
});
const emit = defineEmits(['close']);
const router = useRouter();

function close() {
  emit('close');
}

function goToReservation(place) {
  alert('예약 페이지로 이동 (연결 예정)');
  router.push({
    path: '/meetings/create/reserved/step1',
    query: {
      placeId: place.placeId
    }
  });
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  padding: 30px;
}

.container {
  max-width: 900px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.content {
  padding: 24px;
}
h1 {
  margin: 0;
  font-size: 26px;
}
.subinfo {
  margin: 10px 0;
  font-size: 14px;
  color: #888;
}
.desc {
  margin: 20px 0;
  font-size: 16px;
  color: #333;
}
.section {
  margin-top: 30px;
}
.section h2 {
  font-size: 18px;
  margin-bottom: 10px;
}
.review-card {
  display: flex;
  justify-content: space-between;
  background: #e9f0ff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
}
.review-left {
  width: 65%;
  display: flex;
  flex-direction: column;
}
.nickname-line {
  display: flex;
  align-items: center;
  gap: 6px;
}
.nickname {
  font-weight: bold;
  font-size: 15px;
  color: #333;
}
.review-stars {
  display: flex;
}
.star {
  width: 18px;
  height: 18px;
}
.review-date {
  font-size: 13px;
  color: #999;
  margin-top: 4px;
}
.review-text {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}
.review-right {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.review-img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}
.button {
  width: 100%;
  margin-top: 30px;
  padding: 15px;
  background: #007bff;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
}
</style>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  participants: Array, // [{ revieweeId, revieweeNickname, image, score }]
  reviewerId: Number,
});

const emit = defineEmits(['rate', 'submit']);

const handleClick = (revieweeId, value) => {
  emit('rate', { revieweeId, value });
};

const handleSubmit = () => {
  emit('submit');
};

const filteredParticipants = computed(() =>
  props.participants.filter((p) => p.revieweeId !== props.reviewerId),
);
</script>

<template>
  <div class="container">
    <div class="participant-rating-container">
      <h2>참가자 평가</h2>
      <div class="participant-list">
        <template v-for="participant in filteredParticipants" :key="participant.revieweeId">
          <div class="applicant">
            <div class="applicant-left">
              <div class="applicant-photo">
                <img :src="participant.image" alt="프로필 사진" />
              </div>
              <p class="nickname">{{ participant.revieweeNickname }}</p>
            </div>
            <div class="star-rating">
              <span
                v-for="star in 5"
                :key="star"
                class="star"
                :class="{ selected: star <= participant.score }"
                @click="handleClick(participant.revieweeId, star)"
              ></span>
            </div>
          </div>
        </template>
      </div>
      <button class="submit-button" @click="handleSubmit">참가자 평가 등록</button>
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  display: flex;
  justify-content: center;
}

.container {
  max-width: 900px;
  margin: 30px auto;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  width: 100%;
  display: flex;
  justify-content: center;
}

.participant-rating-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.participant-list {
  border-top: 1px solid #eee;
  padding-top: 20px;
  width: 100%;
}

.applicant {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.applicant-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.applicant-photo img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.nickname {
  font-weight: 600;
  white-space: normal;
  word-break: break-word;
  max-width: 200px;
}

.star-rating {
  display: flex;
  flex-direction: row;
  padding: 4px;
  border-radius: 4px;
  align-items: center;
}

.star {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 4px;
  cursor: pointer;
  background-image: url('../../../../src/assets/icons/meeting_and_place/empty-star.svg');
  background-size: cover;
  background-repeat: no-repeat;
  transition: transform 0.2s;
}

.star.selected {
  background-image: url('../../../../src/assets/icons/meeting_and_place/star.svg');
}

.submit-button {
  width: 100%;
  padding: 15px;
  background: #007bff;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>

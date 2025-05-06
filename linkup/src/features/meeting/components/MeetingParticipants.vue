<!-- src/features/meeting/components/MeetingParticipants.vue -->
<template>
  <slot name="organizer-section">
    <section class="organizer-section">
    <h2>개설자 정보</h2>
    <div class="organizer-card">
      <img :src="leader.image" alt="개설자 이미지" class="leader-img" />
      <div>
        <p class="nickname">{{ leader.nickname }}</p>
        <p class="meta">
          {{ formatGender(leader.gender) }} | {{ leader.age }}세 | {{ leader.mannerTemperature }}℃
        </p>
        <p class="intro">{{ leader.introduction }}</p>
      </div>
    </div>
  </section>
  </slot>
</template>

<script setup>
defineProps({
  leader: Object
});

function formatGender(gender) {
  return gender === 'M' ? '남자' : gender === 'F' ? '여자' : '기타';
}
</script>

<style scoped>
.organizer-section {
  margin-top: 30px;
}

.organizer-section h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.organizer-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #e9f0ff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.leader-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.nickname {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.meta {
  font-size: 14px;
  color: #666;
  margin: 6px 0;
}

.intro {
  font-size: 14px;
  color: #444;
}

</style>
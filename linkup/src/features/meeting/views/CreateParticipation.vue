<script setup>
import PointCheckLayout from '@/features/meeting/components/PointCheckLayout.vue';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const meetingId = route.params.meetingId;

const currentPoints = ref(5000);  // 예시로 5000 포인트
const participationFee = ref(2000); // 예시로 2000 포인트
const balance = computed(() => currentPoints.value - participationFee.value);

const handleCreateParticipation = async () => {
  try {
    const response = await fetch(`/meetings/${meetingId}/participation`, {
      method: 'POST',
      body: JSON.stringify({ memberId: 54 }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('참가 신청 성공');
    } else {
      console.log('참가 신청 실패');
    }
  } catch (error) {
    console.error('모임 신청 중 오류 발생:', error);
  }
};
</script>

<template>
<PointCheckLayout>
  <template #participant-points>
    <div class="form-title">참가 신청</div>
    <div class="participant-points">
      <div class="form-group">
        <label class="group-label">보유 포인트</label>
        <div class="point">₩{{ currentPoints.toLocaleString() }}</div>
      </div>

      <div class="form-group">
        <label class="group-label">참가비</label>
        <div class="point">₩{{ participationFee.toLocaleString() }}</div>
      </div>

      <div class="form-group">
        <label class="group-label">예상 잔액</label>
        <div class="point">₩{{ balance.toLocaleString() }}</div>
      </div>
    </div>
  </template>
  <template #next-btn>
    <button class="next-btn" @click="handleCreateParticipation">참가 신청하기</button>
  </template>
</PointCheckLayout>
</template>

<style scoped>
h1 {
  margin: 0;
  font-size: 26px;
}

.form-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 32px;
}

.point {
  margin-top: 4px;
  font-size: 0.9rem;
  color: #5790ff;
  font-weight: 500;
}

.participant-points .form-group {
  margin-bottom: 24px;
}

.group-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #6b7280;
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

.next-btn {
  margin-top: 12px;
  width: 100%;
  background-color: #5790ff;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.next-btn:hover {
  background-color: #365ec9;
}
</style>
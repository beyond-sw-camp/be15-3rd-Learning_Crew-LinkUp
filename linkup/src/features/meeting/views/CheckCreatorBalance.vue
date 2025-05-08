<template>
  <PointCheckLayout>
    <div class="section-title">포인트 확인</div>

    <div class="form-group">
      <span class="group-label">보유 포인트</span>
      <div :class="['selected-place', { 'insufficient': isInsufficient }]">
        ₩{{ currentPoints.toLocaleString() }}
      </div>
    </div>

    <div class="form-group">
      <span class="group-label">참가비</span>
      <div class="place-price">₩{{ participationFee.toLocaleString() }}</div>
    </div>

    <div class="form-group">
      <span class="group-label">예상 잔액</span>
      <div v-if="!isInsufficient" class="selected-place">
        ₩{{ balance.toLocaleString() }}
      </div>
      <div v-else class="insufficient-msg">
        ❗ 포인트가 부족합니다. 충전 후 다시 시도해주세요.
      </div>
    </div>

    <button class="next-btn" :disabled="isInsufficient" :class="{ disabled: isInsufficient }" @click="goToNextStep">
      다음 단계로
    </button>

    <button v-if="isInsufficient" class="charge-btn" @click="goToCharge">
      충전하러 가기
    </button>
  </PointCheckLayout>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api/axios';
import { useAuthStore } from '@/stores/auth.js';
import PointCheckLayout from '@/features/meeting/components/PointCheckLayout.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const currentPoints = ref(0);
const participationFee = ref(0);
const balance = computed(() => currentPoints.value - participationFee.value);
const isInsufficient = computed(() => balance.value < 0);

const {
  placeId, date, startTime, endTime, minUser, maxUser, sportId, rentalCost
} = route.query;

onMounted(async () => {
  try {
    const pointRes = await api.get('/user-service/users/me/point');
    currentPoints.value = pointRes.data?.data?.totalPoints || 0;
    console.log('✅ 현재 보유 포인트:', currentPoints.value);

    const rental = parseInt(rentalCost);
    const min = parseInt(minUser);
    if (rental && min > 0) {
      participationFee.value = Math.floor(rental / min);
      console.log('✅ 참가비 계산됨:', participationFee.value);
    } else {
      console.warn('❗ rentalCost 또는 minUser가 잘못됨');
    }
  } catch (err) {
    console.error('🛑 포인트 정보 불러오기 실패:', err);
    alert('포인트 정보를 불러오는 데 실패했습니다.');
  }
});

const goToNextStep = () => {
  if (isInsufficient.value) return;
  router.push({
    name: 'CreateMeetingStep2Reserved',
    query: {
      placeId,
      placeName: route.query.placeName,
      rentalCost,
      date,
      startTime,
      endTime,
      minUser,
      maxUser,
      sportId
    },
  });
};

const goToCharge = () => {
  router.push({ name: 'ChargePoint' }); // 실제 충전 페이지 경로/이름으로 수정
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

body {
  font-family: 'Pretendard', sans-serif;
  background-color: #f1f3fc;
  color: #1a1a1a;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 24px;
}

.group-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #6b7280;
}

.selected-place {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.selected-place.insufficient {
  color: #e63946;
}

.insufficient-msg {
  font-size: 1.05rem;
  color: #e63946;
  font-weight: 600;
}

.place-price {
  font-size: 1.1rem;
  color: #5790ff;
  font-weight: 700;
}

.next-btn {
  margin-top: 24px;
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

.next-btn.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.charge-btn {
  margin-top: 12px;
  width: 100%;
  background-color: #ff595e;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.charge-btn:hover {
  background-color: #d4373f;
}
</style>

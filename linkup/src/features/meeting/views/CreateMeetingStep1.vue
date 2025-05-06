<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import CreateMeetingLayout from '@/features/meeting/components/CreateMeetingLayout.vue';

const MIN_USER = 2;
const MAX_USER = 30;

const router = useRouter();

const placeName = '신촌 풋살 센터';
const sportId = 1;
const rentalCost = 130000;

const selectedDate = ref('');
const selectedTimeSlot = ref({startTime: null, endTime: null});
const minUser = ref(0);
const maxUser = ref(0);

const timeSlots = [
  { startTime: '11:00', endTime: '13:00'},
  { startTime: '13:00', endTime: '15:00'},
  { startTime: '15:00', endTime: '17:00'},
  { startTime: '17:00', endTime: '19:00'},
  { startTime: '19:00', endTime: '21:00'},
  { startTime: '21:00', endTime: '23:00'},
];

const selectTimeSlot = (slot) => {
  if (selectedTimeSlot.value.startTime !== slot.startTime) {
    selectedTimeSlot.value = slot;
  }
};

const goToNextStep = () => {
  // 유효성 검증
  if (!selectedDate.value || !selectedTimeSlot) {
    alert('날짜와 시간을 선택해주세요.');
    return;
  }

  if (minUser.value < MIN_USER) {
    alert(`최소 인원은 ${MIN_USER}명 이상이어야 합니다.`);
    return;
  }

  if (maxUser.value > MAX_USER) {
    alert(`최대 인원은 ${MAX_USER}명 이하여야 합니다.`);
    return;
  }

  if (maxUser.value < minUser.value) {
    alert(`최대 인원은 최소 인원보다 적을 수 없습니다.`);
    return;
  }

  router.push({
    name: 'CheckCreatorBalance',
    query: {
      date: selectedDate.value,
      startTime: selectedTimeSlot.value.startTime,
      endTime: selectedTimeSlot.value.endTime,
      minUser: minUser.value,
      maxUser: maxUser.value,
      sportId: sportId
    },
  });
};

const participationFee = computed(() => {
  if (minUser.value === 0) {
    return '모집 인원을 입력해주세요.';
  }
  return (rentalCost / minUser.value).toLocaleString();
});
</script>

<template>
  <CreateMeetingLayout :step="1" title="장소 및 인원 선택">
    <div class="form-group">
      <label class="group-label">선택된 장소</label>
      <div class="selected-place">[{{ placeName }}]</div>
      <div class="place-price">예약 가격: ₩{{ rentalCost.toLocaleString() }}</div>
    </div>

    <div class="form-group">
      <label class="group-label">날짜 선택</label>
      <input type="date" class="calendar-input" v-model="selectedDate"/>
    </div>

    <!-- 시간 선택 -->
    <section class="time-select-section">
      <h2 class="section-title">예약 시간 선택</h2>
      <div class="time-selection">
        <button
          v-for="slot in timeSlots"
          :key="slot.startTime"
          :class="['time-slot', { active: selectedTimeSlot?.startTime === slot.startTime }]"
          @click="selectTimeSlot(slot)"
        >
          {{ slot.startTime }} ~ {{ slot.endTime }}
        </button>
      </div>
    </section>

    <div class="form-group-inline">
      <div>
        <label class="group-label">최소 인원</label>
        <input type="number" class="input-box" v-model="minUser" />
      </div>
      <div>
        <label class="group-label">최대 인원</label>
        <input type="number" class="input-box" v-model="maxUser" />
      </div>
    </div>

    <div class="price-per-person">{{ participationFee }}<span class="per-person">/인당</span></div>

    <button class="next-btn" @click="goToNextStep">다음 단계로</button>
  </CreateMeetingLayout>
</template>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

body {
  margin: 0;
  font-family: 'Pretendard', sans-serif;
  background-color: #f1f3fc;
  color: #1a1a1a;
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
}

.place-price {
  margin-top: 4px;
  font-size: 0.9rem;
  color: #5790ff;
  font-weight: 500;
}

.calendar-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  font-size: 1rem;
}

.time-select-section {
  margin-top: 40px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  font-family: 'Pretendard', sans-serif;
}

/* 여기부터 수정된 예약 시간 스타일 */
.time-selection {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.time-slot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ebf6ff;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: bold;
  color: #252525;
  cursor: pointer;
}

.time-slot.active {
  background-color: #5790ff;
  color: #ffffff;
}

.time-slot.active .price {
  color: #ffffff;
}

/* 여기까지 수정 */

.form-group-inline {
  display: flex;
  gap: 36px;
  margin-top: 24px;
}

.input-box {
  width: 100%;
  padding: 12px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  font-size: 1rem;
}

.price-per-person {
  margin-top: 48px;
  font-size: 1.7rem;
  font-weight: 700;
  text-align: right;
  color: #365ec9;
}

.price-per-person .per-person {
  font-size: 0.85rem;
  font-weight: 500;
  margin-left: 4px;
  color: #6b7280;
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
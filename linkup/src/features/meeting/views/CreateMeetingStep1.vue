<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/api/axios';
import { useAuthStore } from '@/stores/auth.js';
import CreateMeetingLayout from '@/features/meeting/components/CreateMeetingLayout.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const placeId = Number(route.query.placeId);
const placeName = ref('');
const rentalCost = ref(0);
const sportId = ref(0);
const operationTimes = ref([]);
const placeMinUser = ref(0);
const placeMaxUser = ref(0);
const minUser = ref(0);
const maxUser = ref(0);

const selectedDate = ref('');
const selectedTimeSlot = ref({ startTime: null, endTime: null });
const reservedSlots = ref([]);

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    alert('로그인이 필요합니다.');
    router.push('/login');
    return;
  }

  if (!placeId || isNaN(placeId)) {
    alert('잘못된 장소 ID입니다.');
    return;
  }

  try {
    const res = await api.get(`/common-service/place/${placeId}`);
    const place = res.data?.data;
    if (!place) throw new Error('장소 데이터를 찾을 수 없습니다.');

    placeName.value = place.placeName || '이름 없음';
    rentalCost.value = place.rentalCost || 0;
    sportId.value = place.sportId || 0;
    operationTimes.value = Array.isArray(place.operationTimes) ? place.operationTimes : [];
    placeMinUser.value = Number(place.minUser) || 2;
    placeMaxUser.value = Number(place.maxUser) || 30;
    minUser.value = placeMinUser.value;
    maxUser.value = placeMaxUser.value;
  } catch (error) {
    console.error('🛑 장소 정보 로딩 실패:', error);
    alert(`장소 정보를 불러오는 데 실패했습니다. (${error.response?.status || '서버 오류'})`);
  }
});

watch(selectedDate, async (newDate) => {
  if (!newDate || !placeId || isNaN(placeId)) return;
  try {
    const res = await api.get(`/common-service/reserved-times`, {
      params: { placeId, date: newDate },
    });
    reservedSlots.value = res.data?.data || [];
  } catch (e) {
    console.error('❌ 예약된 시간 조회 실패', e);
    reservedSlots.value = [];
  }
});

const selectedTimeSlots = computed(() => {
  if (!selectedDate.value) return [];
  const dayMap = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const selectedDay = dayMap[new Date(selectedDate.value).getDay()];
  const dayOp = operationTimes.value.find(op => op.dayOfWeek === selectedDay);
  if (!dayOp) return [];

  const slots = [];
  let start = parseTime(dayOp.startTime);
  const end = parseTime(dayOp.endTime);
  const unit = 120;
  while (start + unit <= end) {
    slots.push({ startTime: formatTime(start), endTime: formatTime(start + unit) });
    start += unit;
  }
  return slots;
});
const isSlotReserved = (slot) => {
  return reservedSlots.value.some(res => res.startTime.slice(0, 5) === slot.startTime);
};


function parseTime(str) {
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
}

function formatTime(minutes) {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0');
  const m = String(minutes % 60).padStart(2, '0');
  return `${h}:${m}`;
}

const selectTimeSlot = (slot) => {
  if (isSlotReserved(slot)) return;
  if (selectedTimeSlot.value.startTime !== slot.startTime) {
    selectedTimeSlot.value = slot;
  }
};

const selectDateContainer = () => {
  const input = document.querySelector('#date-picker');
  input?.showPicker?.();
};

const goToNextStep = () => {
  const dayMap = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const selectedDay = dayMap[new Date(selectedDate.value).getDay()];
  const availableDays = operationTimes.value.map(op => op.dayOfWeek);
  if (!availableDays.includes(selectedDay)) {
    alert('선택한 날짜는 장소의 운영일이 아닙니다.');
    return;
  }

  if (!selectedDate.value || !selectedTimeSlot.value.startTime) {
    alert('날짜와 시간을 선택해주세요.');
    return;
  }

  if (!sportId.value || sportId.value < 1) {
    alert('운동 종목 정보가 유효하지 않습니다.');
    return;
  }

  if (minUser.value < placeMinUser.value) {
    alert(`최소 인원은 ${placeMinUser.value}명 이상이어야 합니다.`);
    return;
  }

  if (maxUser.value > placeMaxUser.value) {
    alert(`최대 인원은 ${placeMaxUser.value}명 이하여야 합니다.`);
    return;
  }

  if (maxUser.value < minUser.value) {
    alert(`최대 인원은 최소 인원보다 적을 수 없습니다.`);
    return;
  }

  router.push({
    name: 'CheckCreatorBalance',
    query: {
      placeId,
      placeName: placeName.value,
      rentalCost: rentalCost.value,
      sportId: sportId.value,
      date: selectedDate.value,
      startTime: selectedTimeSlot.value.startTime,
      endTime: selectedTimeSlot.value.endTime,
      minUser: minUser.value,
      maxUser: maxUser.value
    },
  });
};

const participationFee = computed(() => {
  if (minUser.value === 0) return '모집 인원을 입력해주세요.';
  return Math.floor(rentalCost.value / minUser.value).toLocaleString();
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
      <div class="calendar-click-area" @click="selectDateContainer">
        <input id="date-picker" type="date" class="calendar-input" v-model="selectedDate" :min="new Date().toISOString().split('T')[0]" />
      </div>
    </div>

    <section class="time-select-section">
      <h2 class="section-title">예약 시간 선택</h2>
      <div v-if="selectedDate" class="time-selection">
        <button
          v-for="slot in selectedTimeSlots"
          :key="slot.startTime"
          :class="['time-slot', { active: selectedTimeSlot?.startTime === slot.startTime, disabled: isSlotReserved(slot) }]"
          :disabled="isSlotReserved(slot)"
          @click="selectTimeSlot(slot)"
        >
          {{ slot.startTime }} ~ {{ slot.endTime }}
        </button>
      </div>
      <div v-else class="text-gray-500">먼저 날짜를 선택해주세요.</div>
    </section>

    <div class="form-group-inline">
      <div>
        <label class="group-label">최소 인원</label>
        <input type="number" class="input-box" v-model="minUser" :min="placeMinUser" :max="placeMaxUser" />
      </div>
      <div>
        <label class="group-label">최대 인원</label>
        <input type="number" class="input-box" v-model="maxUser" :min="placeMinUser" :max="placeMaxUser" />
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

.calendar-click-area {
  cursor: pointer;
}

.time-select-section {
  margin-top: 40px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
}

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

.time-slot.disabled {
  background-color: #f0f0f0;
  color: #aaa;
  text-decoration: line-through;
  cursor: not-allowed;
  opacity: 0.6;
}

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

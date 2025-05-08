<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CreateCustomMeetingLayout from '@/features/meeting/components/CreateCustomMeetingLayout.vue';
import MeetingCalendar from '@/features/meeting/components/MeetingCalendar.vue';
import TimeSelectionForm from '@/features/meeting/components/TimeSelectionForm.vue';

import sport1 from "@/assets/icons/sports/etc.svg";
import sport2 from "@/assets/icons/sports/football.svg";
import sport3 from "@/assets/icons/sports/tennis.svg";
import sport4 from "@/assets/icons/sports/bowling.svg";
import sport5 from "@/assets/icons/sports/tableTennis.svg";
import sport6 from "@/assets/icons/sports/basketball.svg";
import sport7 from "@/assets/icons/sports/golf.svg";
import sport8 from "@/assets/icons/sports/badminton.svg";

const MIN_USER = 2;
const MAX_USER = 30;

const route = useRoute();
const router = useRouter();

const latitude = route.query.latitude || 120.000000;
const longitude = route.query.longitude || 37.000000;
const rentalCost = 0;

const selectedDate = ref(null);
const selectedTimeSlot = ref({startTime: null, endTime: null});
const minUser = ref(0);
const maxUser = ref(0);
const selectedSportId = ref(null);

const sports = ref([]);
const isLoading = ref(true);

const fetchSports = async () => {
  try {
    sports.value = [
      { sportId: 2, sportName: '풋살' , img: sport2},
      { sportId: 3, sportName: '테니스', img: sport3},
      { sportId: 4, sportName: '볼링', img: sport4 },
      { sportId: 5, sportName: '탁구', img: sport5 },
      { sportId: 6, sportName: '농구', img: sport6 },
      { sportId: 7, sportName: '골프', img: sport7 },
      { sportId: 8, sportName: '배드민턴', img: sport8 },
      { sportId: 1, sportName: '기타 운동', img: sport1}
    ];

    //   const response = await axios.get();
    //   sports.value = response.data.map(sport => ({
    //     id: sport.sportId,
    //     name: sport.sportName
    // }));
  } catch (e) {
    console.error('운동 종목 로드 실패', e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchSports();
});

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
    name: 'CreateMeetingStep2Custom',
    query: {
      date: selectedDate.value,
      startTime: selectedTimeSlot.value.startTime,
      endTime: selectedTimeSlot.value.endTime,
      minUser: minUser.value,
      maxUser: maxUser.value,
      sportId: selectedSportId.value
    },
  });
};

function getIcon(sport) {
  return sport.img;
}
</script>

<template>
  <CreateCustomMeetingLayout :step="1" title="장소, 종목, 인원 선택">
    <div class="form-group">
      <label class="group-label">선택된 장소</label>
      <div class="selected-place">위도: {{latitude}}, 경도: {{longitude}}</div>
    </div>

    <MeetingCalendar v-model="selectedDate"/>
    <TimeSelectionForm v-model="selectedTimeSlot"/>

    <div class="form-group">
      <label class="group-label">운동 종류</label>
      <div class="options-grid">
        <button
          v-for="sport in sports"
          :key="sport.sportId"
          type="button"
          class="option-btn"
          :class="{active: selectedSportId === sport.sportId}"
          @click="selectedSportId = sport.sportId"
        >
          <img :src="getIcon(sport)" alt="sport.sportName"/>
          {{ sport.sportName }}
        </button>
      </div>
    </div>

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

    <button class="next-btn" @click="goToNextStep">다음 단계로</button>
  </CreateCustomMeetingLayout>
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

.options-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.option-btn {
  flex: 1 1 calc(33.333% - 8px);
  padding: 12px 8px;
  background-color: #f3f3f3;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.option-btn:hover,
.option-btn.active {
  background-color: #e8ecff;
  border-color: #5790ff;
  color: #365ec9;
}

.option-btn img {
  width: 28px;
  height: 28px;
}
</style>
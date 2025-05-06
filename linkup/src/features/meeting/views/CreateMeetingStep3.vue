<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import CreateMeetingLayout from '@/features/meeting/components/CreateMeetingLayout.vue';
import lv1Icon from '@/assets/icons/meeting_and_place/lv1.svg';
import lv2Icon from '@/assets/icons/meeting_and_place/lv2.svg';
import lv3Icon from '@/assets/icons/meeting_and_place/lv3.svg';
import api from '@/api/axios.js';

const route = useRoute();
const router = useRouter();

const selectedSport = ref('');
const selectedGender = ref('BOTH');
const selectedAgeGroups = reactive([]);
const selectedLevels = reactive([]);

const toggleSetItem = (setRef, value) => {
  const index = setRef.indexOf(value);
  if (index === -1) {
    setRef.push(value);
  } else {
    setRef.splice(index, 1);
  }
};

const createMeeting = async () => {
  const payload = {
    meetingTitle: route.query.meetingTitle,
    meetingContent: route.query.meetingContent,
    meetingDate: route.query.meetingDate,
    meetingTime: route.query.meetingTime,
    placeId: route.query.placeId,
    sportType: selectedSport.value,
    gender: selectedGender.value,
    ageGroup: selectedAgeGroups.join(','),
    level: selectedLevels.join(','),
  };

  if (!selectedGender.value)  {
    alert('모집 성별을 선택하세요.');
    return;
  }

  if (!selectedAgeGroups.length === 0)  {
    alert('모집 나이대를 선택하세요.');
    return;
  }

  if (!selectedLevels.length === 0)  {
    alert('모집할 실력 레벨을 선택하세요.');
    return;
  }

  try {
    api.post('/meetings/create', payload);
    alert('모임 개설이 완료되었습니다.');
    router.push('/meetings');
  } catch (e) {
    alert('모임 개설에 실패했습니다.');
    console.error(e);
  }
};

function getLevelIcon(level) {
  switch(level) {
    case "LV1":
      return lv1Icon;
    case "LV2":
      return lv2Icon;
    case "LV3":
      return lv3Icon;
  }
}
</script>

<template>
  <template v-if="isLoading">
    <p>로딩 중...</p>
  </template>
  <template v-else>
  <CreateMeetingLayout :step="3" title="상세 조건 설정">
    <!-- 모집 성별 -->
    <div class="form-group">
      <label class="group-label">모집 성별</label>
      <div class="options-grid">
        <button
          v-for="(label, key) in { M: '남성', F: '여성', BOTH: '무관' }"
          :key="key"
          type="button"
          class="option-btn"
          :class="{ active: selectedGender === key }"
          @click="selectedGender = key"
        >
          {{ label }}
        </button>
      </div>
    </div>

    <!-- 모집 나이대 -->
    <div class="form-group">
      <label class="group-label">모집 나이대</label>
      <div class="options-grid">
        <button
          v-for="(label, key) in {
            '10': '10대',
            '20': '20대',
            '30': '30대',
            '40': '40대',
            '50': '50대',
            '60': '60대',
            '70+': '70대 이상',
          }"
          type="button"
          class="option-btn"
          :class="{ active: selectedAgeGroups.includes(key) }"
          @click="toggleSetItem(selectedAgeGroups, key)"
        >
          {{ label }}
        </button>
      </div>
    </div>

    <!-- 실력 레벨 -->
    <div class="form-group">
      <label class="group-label">실력 레벨</label>
      <div class="options-grid">
        <button
          v-for="key in ['LV1', 'LV2', 'LV3']"
          type="button"
          class="option-btn"
          :class="{ active: selectedLevels.includes(key) }"
          @click="toggleSetItem(selectedLevels, key)"
        >
          <img :src="getLevelIcon(key)" alt="key" />
          {{ key }}
        </button>
      </div>
    </div>

    <button class="submit-btn" @click="createMeeting">모임 개설 완료</button>
  </CreateMeetingLayout>
  </template>
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
  margin-bottom: 32px;
}

.group-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #6b7280;
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

.option-btn img {
  width: 28px;
  height: 28px;
}

.option-btn:hover,
.option-btn.active {
  background-color: #e8ecff;
  border-color: #5790ff;
  color: #365ec9;
}

.submit-btn {
  margin-top: 32px;
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

.submit-btn:hover {
  background-color: #365ec9;
}
</style>
<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import CreateMeetingLayout from '@/features/meeting/components/CreateMeetingLayout.vue';

const route = useRoute();
const router = useRouter();

const meetingTitle = ref('');
const meetingContent = ref('');

const {
  date, startTime, endTime, minUser, maxUser, sportId
} = route.query;

const goToNextStep = () => {
  if (!meetingTitle.value.trim()) {
    alert('모임 제목을 입력하세요.');
    return;
  }

  if (!meetingContent.value.trim()) {
    alert('모임 설명을 입력하세요.');
    return;
  }

  router.push({
    name: 'CreateMeetingStep3Reserved',
    query: {
      ...route.query,
      meetingTitle: meetingTitle.value.trim(),
      meetingContent: meetingContent.value.trim()
    }
  });
};
</script>

<template>
  <CreateMeetingLayout :step="2" title="모임 정보 작성">
        <div class="form-group">
          <label class="group-label">모임 제목</label>
          <input type="text" class="input-box" v-model="meetingTitle" placeholder="모임 제목을 입력하세요" />
        </div>

        <div class="form-group">
          <label class="group-label">모임 설명</label>
          <textarea v-model="meetingContent" placeholder="모임에 대한 간단한 소개나 안내를 작성해주세요."></textarea>
        </div>

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

.input-box,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #ffffff;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.next-btn {
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

.next-btn:hover {
  background-color: #365ec9;
}
</style>
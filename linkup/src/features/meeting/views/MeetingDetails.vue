<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

import router from '@/router/index.js';
import axios from 'axios';

import MeetingDetailLayout from '@/features/meeting/components/MeetingDetailLayout.vue';
import MeetingParticipants from '@/features/meeting/components/MeetingParticipants.vue';

const route = useRoute();

const meeting = ref(null);
const isLoading = ref(true); // 로딩 중 상태

// onMounted(async () => {
//   try {
//     const { meetingId } = useRoute().params;
//     const response = await axios.get(`/meetings/${meetingId}`, {
//       headers: {
//         'Accept': 'application/json'
//       }
//     });
//     meeting.value = response.data.data.meeting;
//   } catch (err) {
//     console.error('모임 정보를 불러오는 중 오류 발생:', err);
//   } finally {
//     isLoading.value = false;
//   }
// });

onMounted(() => {
  meeting.value = {
    meetingTitle: '요즘 같은 선선한 날에 축구 한 판 어때요!',
    placeAddress: '서울 동작구 장승배기 223',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    meetingContent:
      '평일 저녁 스트레스를 축구로 풀어보아요! 초보자도 환영이며, 경기 후 근처에서 가볍게 뒤풀이도 가능합니다. 운동화만 챙겨오시면 됩니다!',
    date: '2025-04-23',
    startTime: '19:00',
    endTime: '21:00',
    sportName: '축구',
    minUser: 10,
    maxUser: 20,
    gender: 'BOTH',
    ageGroup: '20,30',
    level: 'LV1,LV2,LV3',
    fee: 5000,
    leader: [
      {
        nickname: '메시',
        gender: 'M',
        age: 29,
        introduction: '지금이 메시고',
        mannerTemperature: 92,
        profileImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      },
    ],
  };
  isLoading.value = false;
});

const goToParticipation = () => {
  router.push({ name: 'CreateParticipation', params: { meetingId: route.params.meetingId } });
};

// 성별 표시
const displayGender = computed(() => {
  return meeting.value?.gender === 'M' ? '남자' : meeting.value.gender === 'F' ? '여자' : '무관';
});

// 날짜로부터 요일 계산
const dayName = computed(() => {
  return meeting.value ? '일월화수목금토'[new Date(meeting.value.date).getDay()] : '';
});

// 실력 변환
const formattedLevel = computed(() => meeting.value?.level?.replaceAll(',', ', ') || '');

// 나이대 변환
const formattedAge = computed(() => {
  return (
    meeting.value?.ageGroup
      ?.replace('70+', '70')
      .split(',')
      .map((age) => (age === '70' ? '70대 이상' : `${age}대`))
      .join(', ') || ''
  );
});
</script>

<template>
  <div v-if="isLoading">
    <p>모임 정보를 불러오는 중입니다...</p>
  </div>

  <div v-else>
    <MeetingDetailLayout :title="meeting.meetingTitle" :address="meeting.placeAddress" :image="meeting.image">
      <template #description>
        <section class="desc">{{ meeting.meetingContent }}</section>
      </template>

      <template #details>
        <section class="section">
          <h2>모임 일정</h2>
          {{ meeting.date }} ({{dayName}}) {{ meeting.startTime }} - {{ meeting.endTime }}
        </section>
        <section class="section">
          <h2>종목</h2>
          {{ meeting.sportName }}
        </section>
        <section class="section">
          <h2>모집 인원</h2>
          명/{{ meeting.maxUser }}명 (최소 인원: {{ meeting.minUser }}명)
        </section>
        <section class="section">
          <h2>참가비</h2>
<!--          {{ meeting.fee }}원-->
        </section>
        <table class="meeting-details-table">
          <tr>
            <td><section class="section"><h2>성별</h2>{{ displayGender }}</section></td>
            <td><section class="section"><h2>실력</h2>{{ formattedLevel }}</section></td>
            <td><section class="section"><h2>나이대</h2>{{ formattedAge }}</section></td>
          </tr>
        </table>
      </template>

      <template #extra>
        <MeetingParticipants :leader="meeting.leader" />
      </template>

      <template #footer>
        <button class="button" @click="goToParticipation">참가 신청하기</button>
      </template>
    </MeetingDetailLayout>
  </div>
</template>

<style scoped>
.section {
  margin-top: 30px;
}

.section h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.meeting-details-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.meeting-details-table h2 {
  font-size: 18px;
  margin-bottom: 10px;
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

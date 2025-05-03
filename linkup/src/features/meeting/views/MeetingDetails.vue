<script setup>
import MeetingDetailLayout from '@/features/meeting/components/MeetingDetailLayout.vue';
import MeetingParticipants from '@/features/meeting/components/MeetingParticipants.vue';

const meeting = { // 변수 받아오는 걸로 수정
  name: '요즘 같은 선선한 날에 축구 한 판 어때요!',
  address: '서울 동작구 장승배기 223',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  description: '평일 저녁 스트레스를 축구로 풀어보아요! 초보자도 환영이며, 경기 후 근처에서 가볍게 뒤풀이도 가능합니다. 운동화만 챙겨오시면 됩니다!',
  date: '2025-04-23 (화)',
  start_time: '19:00',
  end_time: '21:00',
  sport_name: '축구',
  min_user: 10,
  max_user: 20,
  gender: 'both',
  age: '20, 30',
  level: 'LV1, LV2, LV3',
  fee: 5000,
  leader: [
    {
      nickname: '메시',
      gender: 'M',
      age: 29,
      introduction: '지금이 메시고',
      mannerTemperature: 92,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    }
  ]
};
</script>

<template>
  <MeetingDetailLayout
    :title="meeting.name"
    :address="meeting.address"
    :image="meeting.image"
  >
    <template #description>
      <section class="desc">{{ meeting.description }}</section>
    </template>

    <template #details>
      <section class="section"><h2>모임 일정</h2>{{ meeting.date }} {{ meeting.start_time }} - {{ meeting.end_time }}</section>
      <section class="section"><h2>종목</h2>{{ meeting.sport_name }}</section>
      <section class="section"><h2>모집 인원</h2>명/{{ meeting.max_user }}명 (최소 인원: {{ meeting.min_user }}명)</section>
      <section class="section"><h2>참가비</h2>{{ meeting.fee }}원</section>
      <section class="section"><h2>성별</h2>{{ meeting.gender }}</section>
      <section class="section"><h2>실력</h2>{{ meeting.level }}</section>
      <section class="section"><h2>나이대</h2>{{ meeting.age }}</section>
    </template>

    <template #extra>
      <MeetingParticipants :leader="meeting.leader[0]" />
    </template>
  </MeetingDetailLayout>
</template>

<style scoped>
.section {
  margin-top: 30px;
}

.section h2 {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>

<script setup>

import { onMounted, ref } from 'vue';

const meetings = ref([]);

meetings.value = [{
  meetingTitle: "제목",
  placeName: "종합운동장",
  statusId: 1
}
];

// onMounted(async() => {
//   try {
//     const response = await axios.get(`/meetings/user/{userId}/created`)
//     meetings.value = response.data
//   } catch (e) {
//     console.error('개설 모임 조회 실패', e);
//   }
// })

const statusName = (id) => {
  switch(id) {
    case 1:
      return '모집중';
    case 2:
      return '최소 인원 모집 완료';
    case 3:
      return '모집 완료';
    case 4:
      return '모집 취소';
    case 5:
      return '모임 진행 완료';
  }
}
</script>

<template>
  <div class="assignment-modal">
    <div class="modal-box">
      <!-- 모달 헤더 -->
      <div class="modal-header">
        <img src="@/assets/icons/meeting_and_place/sidebar-pending_meetings.svg" alt="개설 모임 목록" class="icon-img"/>
        <h2>참가 신청 모임 목록</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>

      <div class="assignment-list">
        <!-- 예시 카드 -->
        <div class="assignment-card"
             v-for="meeting in meetings"
             :key="meeting.meetingId"
             onclick="$emit('select', meeting)"
        >
          <img src="../img/place_img1.png" alt="썸네일" class="assignment-thumb" />
          <div class="assignment-content">
            <div class="assignment-title"> {{meeting.meetingTitle}} </div>
            <div class="assignment-address"> {{ meeting.placeName || meeting.customPlaceAddress }} </div>
          </div>
          <div class="assignment-status"> {{ statusName(meeting.statusId) }} </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.modal-header {
  display: flex;
  justify-content: space-between;
}

.modal-header .icon-img {
  width: 28px;
  height: 28px;
  margin-top: 2px;
}

.assignment-modal {
  top: 260px;
  display: block;
}

.assignment-modal .close-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: #94a3b8;
}
</style>
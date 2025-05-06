<template>
    <!-- 참가자 관리 모달 -->
    <div v-if="visible" class="participant-modal">
      <div class="modal-header">
        <img src="@/assets/icons/meeting_and_place/sidebar-participated_meetings.svg" alt="참가자 목록" class="icon-img"/>
        <h2>참가자 목록</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      <hr class="divider" />

      <div class="participant-modal-content">
        <h2>참가자 목록</h2>
        <div
          v-for="(participant, index) in participants"
          :key="'participant-' + index"
          class="participant-card"
        >
          <img :src="participant.profileImageUrl" alt="프로필" class="participant-thumb" />
          <div class="participant-content">
            <div class="participant-nickname">{{ participant.nickname }}</div>
            <div class="participant-subinfo">매너온도: {{ participant.mannerTemperature }}°C</div>
          </div>
          <div class="participant-actions">
            <template v-if="participant.nickname === leaderNickname">
              <button class="participant-btn disabled" disabled>
                <img src="@/assets/icons/meeting_and_place/crown.svg" alt="개설자" class="leader"/>
              </button>
            </template>
          </div>
        </div>
      </div>

      <div class="participant-modal-button">
        <button class="btn accept">모임 바로가기</button>
        <button class="btn cancel">모임 참가 취소</button>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api/axios.js';

const leaderNickname = '방구석메시';
// 참가자 목록 조회 api.get(`common-service/my/meetings/${meetingId}/participation`);

const participants = ref([
  {
    nickname: '방구석메시',
    mannerTemperature: 38,
    profileImageUrl: 'https://api.dicebear.com/7.x/thumbs/svg?seed=linkup',
  },
  {
    nickname: '운동광인생',
    mannerTemperature: 40,
    profileImageUrl: 'https://api.dicebear.com/7.x/thumbs/svg?seed=linkup2',
  },
])

defineProps({
  visible: Boolean,
  meeting: Object
});
const emit = defineEmits(['close']);
function closeModal() {
  emit('close');
}
</script>

<style scoped>
/* ---------------- 참가자 조회 모달 ---------------- */
.participant-modal {
  position: fixed;
  top: 200px; /* assignment-modal과 같은 높이 */
  right: calc(84px + 480px + 35px); /* assignment-modal 오른쪽 끝 + 여유 24px */
  width: 32%;
  min-width: 400px;
  max-width: 500px;
  background-color: #ffffff;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  z-index: 1100;
  display: flex;
  flex-direction: column;
}

.participant-modal h2 {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.participant-modal .close-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: #94a3b8;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.participant-modal-content {
  margin-top: 20px;
  margin-bottom: 10px;
}

.participant-modal-button {
  padding: 6px 12px;
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.modal-header .icon-img {
  width: 28px;
  height: 28px;
  margin-top: 2px;
}

.participant-btn.disabled {
  cursor: default;
}

.btn {
  flex: 1;
}

.leader {
  width: 28px;
  height: 28px;
}

.hidden-text {
  visibility: hidden;
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>

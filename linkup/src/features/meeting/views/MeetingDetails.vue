<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import MeetingDetailLayout from '@/features/meeting/components/MeetingDetailLayout.vue';
import MeetingParticipants from '@/features/meeting/components/MeetingParticipants.vue';
import api from '@/api/axios.js';
import { useAuthStore } from '@/stores/auth.js';
import DefaultMainLayout from '@/components/layout/DefaultMainLayout.vue';

const route = useRoute();
const meeting = ref(null);
const isLoading = ref(true);
const count = ref(0);
const userStore = useAuthStore();
const showModal = ref(false);

onMounted(async () => {
  try {
    const meetingId = route.params.meetingId;

    const response = await api.get(`/common-service/meetings/${meetingId}`);
    meeting.value = response.data.data.meeting;

    // ✅ 내가 참가자일 경우에만 참가자 목록 조회
    const isParticipating = meeting.value.participants?.some(
        (p) => p.memberId === userStore.userId
    );

    if (isParticipating) {
      const participationResponse = await api.get(
          `/common-service/my/meetings/${meetingId}/participation`,
          {
            params: {
              requesterId: userStore.userId,
            },
          }
      );
      count.value = participationResponse.data.data.participants.length;
    } else {
      count.value = 0;
    }
  } catch (err) {
    console.error('모임 정보를 불러오는 중 오류 발생:', err);
    meeting.value = null;
    count.value = 0;
  } finally {
    isLoading.value = false;
  }
});

const showCreateModal = () => {
  showModal.value = true;
}

const closeModal = () => {
  showModal.value = false;
}

const handleCreateParticipation = async () => {
  const meetingId = route.params.meetingId;
  try {
    const response = await api.post(`/common-service/meetings/${meetingId}/participation`,
      { memberId: userStore.userId }
    );
    if (response.data.success) {
      alert('참가 신청에 성공하였습니다.');
    } else {
      console.log('참가 신청 실패');
    }
  } catch (error) {
    console.error('모임 신청 중 오류 발생:', error);
  } finally {
    showModal.value = false;
  }
};

const displayGender = computed(() => {
  return meeting.value?.gender === 'M' ? '남자' : meeting.value?.gender === 'F' ? '여자' : '무관';
});

const dayName = computed(() => {
  return meeting.value ? '일월화수목금토'[new Date(meeting.value.date).getDay()] : '';
});

const formattedLevel = computed(() => meeting.value?.level?.replaceAll(',', ', ') || '');

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
  <div class="layout-wrapper">
  <div v-if="isLoading">
    <p>모임 정보를 불러오는 중입니다...</p>
  </div>

  <div v-else-if="!meeting">
    <p>모임 정보를 불러올 수 없습니다.</p>
  </div>

  <div v-else>
    <MeetingDetailLayout
        :title="meeting.meetingTitle"
        :address="meeting.place.address"
        :image="meeting.image"
    >
      <template #description>
        <section class="desc">{{ meeting.meetingContent }}</section>
      </template>

      <template #details>
        <section class="section">
          <h2>모임 일정</h2>
          {{ meeting.date }} ({{ dayName }}) {{ meeting.startTime }} - {{ meeting.endTime }}
        </section>
        <section class="section">
          <h2>종목</h2>
          {{ meeting.sportName }}
        </section>
        <section class="section">
          <h2>모집 인원</h2>
          {{ count }}명/{{ meeting.maxUser }}명 (최소 인원: {{ meeting.minUser }}명)
        </section>
        <section class="section">
          <h2>참가비</h2>
          {{ meeting.participationFee.toLocaleString() }}원
        </section>
        <table class="meeting-details-table">
          <tr>
            <td>
              <section class="section">
                <h2>성별</h2>
                {{ displayGender }}
              </section>
            </td>
            <td>
              <section class="section">
                <h2>실력</h2>
                {{ formattedLevel }}
              </section>
            </td>
            <td>
              <section class="section">
                <h2>나이대</h2>
                {{ formattedAge }}
              </section>
            </td>
          </tr>
        </table>
      </template>

      <template #extra>
        <MeetingParticipants :leader="meeting.leader" />
      </template>

      <template #footer>
        <button class="button" @click="showCreateModal">참가 신청하기</button>
      </template>
    </MeetingDetailLayout>

      <div v-if="showModal === true" class="modal">
        <div class="modal-content">
          모임 참가를 신청하시겠습니까?
          <div class="modal-buttons">
          <button class="accept" @click="handleCreateParticipation">예</button>
          <button class="reject" @click="closeModal">아니오</button>
          </div>
        </div>
      </div>
  </div>
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

.layout-wrapper {
  width: 100%;
  min-height: 100vh; /* 화면보다 내용이 적을 땐 전체 화면 보장 */
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding-bottom: 100px; /* footer 또는 버튼 영역 고려해서 여백 확보 */
  box-sizing: border-box;
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 40px; /* 버튼 사이에 40px 여백 추가 */
}

.modal-content {
  background-color: white;
  padding: 40px;  /* 내부 여백 */
  border-radius: 8px;
  width: 100%;   /* 가로폭을 화면 전체로 확장 */
  max-width: 500px; /* 최대 폭을 설정하여 너무 넓어지지 않도록 */
  box-sizing: border-box;
  text-align: center;
}

.modal-buttons .accept,
.modal-buttons .reject {
  width: 48%; /* 버튼의 가로폭을 설정 */
  padding: 15px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
}

.modal-buttons .accept {
  background-color: #5790FF;
  color: #fff;
}

.modal-buttons .accept:hover {
  background-color: #3a6edc;
}

.modal-buttons .reject {
  background-color: #E64980;
  color: #fff;
}

.modal-buttons .reject:hover {
  background-color: #cc3a6a;
}
</style>

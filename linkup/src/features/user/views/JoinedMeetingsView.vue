<script setup>
import { ref, onMounted } from 'vue';
import { getUserMeetingHistory } from '@/api/user.js';
import { usePagination } from '@/composables/usePagination.js';

const activeTab = ref('전체');

// 탭 이름 -> 서버 요청 status 변환
const tabStatusMap = {
  전체: null,
  참가: 'COMPLETED',
  취소됨: 'CANCELLED',
  '예정된 모임': 'UPCOMING',
};

// API 요청 함수
const fetchMeetingHistory = async (page, size) => {
  const status = tabStatusMap[activeTab.value];
  return await getUserMeetingHistory({ status, page, size });
};

// 페이지네이션 훅 사용
const { items: meetings, loadMore, reset, hasNext, isLoading } = usePagination(fetchMeetingHistory);

// 탭 변경
const changeTab = (tabName) => {
  if (activeTab.value !== tabName) {
    activeTab.value = tabName;
    reset();
    loadMore();
  }
};

// 초기 데이터 로드
onMounted(() => {
  loadMore();
});
</script>

<template>
  <section class="history-container" aria-label="모임 이력 조회 섹션">
    <!-- 헤더 -->
    <header class="history-header">
      <h2 class="history-title">모임 이력</h2>

      <!-- 탭 메뉴 -->
      <nav class="history-tabs" aria-label="모임 상태 필터">
        <button
          v-for="tab in Object.keys(tabStatusMap)"
          :key="tab"
          :class="['tab-button', { active: activeTab === tab }]"
          type="button"
          @click="changeTab(tab)"
        >
          {{ tab }}
        </button>
      </nav>
    </header>

    <!-- 모임 리스트 -->
    <div class="history-list">
      <article
        v-for="meeting in meetings"
        :key="meeting.meetingId"
        class="history-card"
        aria-label="모임 카드"
      >
        <h3 class="meeting-title">{{ meeting.title }}</h3>
        <div class="meeting-info">
          <span>일시: {{ meeting.date }}</span>
          <span>장소: {{ meeting.location }}</span>
        </div>
        <div :class="['meeting-status', meetingStatusClass(meeting.status)]">
          {{ statusLabel(meeting.status) }}
        </div>
      </article>

      <!-- 더보기 버튼 -->
      <div v-if="hasNext" class="load-more-wrapper">
        <button class="load-more-button" @click="loadMore" :disabled="isLoading">더보기</button>
      </div>
    </div>
  </section>
</template>

<script>
// 모임 상태에 따른 클래스
function meetingStatusClass(status) {
  switch (status) {
    case 'COMPLETED':
      return 'completed';
    case 'CANCELLED':
      return 'cancelled';
    case 'UPCOMING':
      return 'upcoming';
    default:
      return '';
  }
}

// 모임 상태에 따른 라벨
function statusLabel(status) {
  switch (status) {
    case 'COMPLETED':
      return '참가 완료';
    case 'CANCELLED':
      return '취소됨';
    case 'UPCOMING':
      return '예정';
    default:
      return '';
  }
}
</script>

<style scoped>
.history-container {
  @apply w-full flex flex-col gap-8;
}

.history-header {
  @apply flex flex-col gap-4;
}

.history-title {
  @apply text-2xl font-bold text-gray-900;
}

.history-tabs {
  @apply flex gap-2;
}

.tab-button {
  @apply px-4 py-2 rounded-sm bg-gray-200 text-gray-700 font-medium text-sm transition hover:bg-primary-default hover:text-white;
}

.tab-button.active {
  @apply bg-primary-default text-white;
}

.history-list {
  @apply flex flex-col gap-6;
}

.history-card {
  @apply bg-white rounded-xl p-6 shadow-md flex flex-col gap-2 cursor-pointer;
}

.meeting-title {
  @apply text-lg font-bold text-gray-900;
}

.meeting-info {
  @apply flex flex-col text-sm text-gray-600 gap-1;
}

.meeting-status {
  @apply mt-2 text-xs font-bold rounded-full px-3 py-1 w-fit;
}

.meeting-status.completed {
  @apply bg-green-100 text-green-700;
}

.meeting-status.cancelled {
  @apply bg-red-100 text-red-700;
}

.meeting-status.upcoming {
  @apply bg-yellow-100 text-yellow-700;
}

.load-more-wrapper {
  @apply flex justify-center;
}

.load-more-button {
  @apply px-6 py-2 mt-4 bg-primary-default text-white font-semibold rounded-lg hover:bg-primary-hover disabled:bg-gray-300;
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue';
import PointFilter from '@/features/user/components/PointFilter.vue';
import { getUserPointTransactions } from '@/api/user';
import { usePagination } from '@/composables/usePagination';
import { useAuthStore } from '@/stores/auth.js';
import dayjs from 'dayjs';

const authStore = useAuthStore();

const pointBalance = computed(() => authStore.pointBalance ?? 0);

const selectedYearMonth = ref('');
const selectedTransactionType = ref('');

const fetchPoints = (page, size) => {
  return getUserPointTransactions({
    yearMonth: selectedYearMonth.value || undefined,
    transactionType: selectedTransactionType.value || undefined,
    page,
    size,
  });
};

const {
  items: pointTransactions,
  loadMore,
  reset,
  hasNext,
  isLoading,
} = usePagination(fetchPoints);

const handleFilterChange = ({ yearMonth, transactionType }) => {
  console.log(yearMonth, transactionType);
  selectedYearMonth.value = yearMonth;
  selectedTransactionType.value = transactionType;
  reset(); // 기존 데이터 초기화
  loadMore(); // 새로 불러오기
};

const handleScroll = (e) => {
  const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  if (bottom && hasNext.value) {
    loadMore();
  }
};

function getTransactionLabel(type) {
  switch (type) {
    case 'CHARGE':
      return '포인트 충전';
    case 'PAYMENT':
      return '모임 참가';
    case 'REFUND':
      return '환불';
    case 'WITHDRAW':
      return '출금';
    default:
      return '기타';
  }
}

const formatAmount = (amount) => {
  const sign = amount > 0 ? '+' : '';
  return `${sign}${amount.toLocaleString()}P`;
};

onMounted(() => {
  loadMore();
});
</script>

<template>
  <section class="point-history-page" @scroll.passive="handleScroll">
    <h2 class="section-title">포인트 내역</h2>

    <div class="balance-card">
      <p class="balance-label">나의 포인트</p>
      <p class="balance-amount">{{ pointBalance?.toLocaleString() }}P</p>
      <button class="charge-button">포인트 환불하기</button>
    </div>

    <PointFilter @filter-change="handleFilterChange" />

    <ul class="history-list">
      <li
        v-for="tx in pointTransactions || []"
        :key="tx.pointTransactionId"
        :class="['history-item', tx.transactionType.toLowerCase()]"
      >
        <div class="info">
          <p class="label">{{ getTransactionLabel(tx.transactionType) }}</p>
          <p class="date">{{ dayjs(tx.createdAt).format('YYYY.MM.DD') }}</p>
        </div>
        <div class="amount">
          {{ formatAmount(tx.amount) }}
        </div>
      </li>
    </ul>

    <!-- 로딩 인디케이터 -->
    <div v-if="isLoading" class="loading-indicator">로딩 중...</div>

    <!-- 데이터가 없는 경우 -->
    <div v-else-if="pointTransactions.length === 0 && !isLoading" class="empty-indicator">
      포인트 내역이 없습니다.
    </div>
  </section>
</template>

<style scoped>
/* 전체 영역 */
.point-history-page {
  @apply flex flex-col gap-8 w-full max-w-2xl mx-auto px-6 py-8;
}

/* 섹션 제목 */
.section-title {
  @apply text-2xl font-bold text-text-default;
}

/* 포인트 잔액 카드 */
.balance-card {
  @apply flex flex-col items-center gap-4 bg-background-surface shadow-sm rounded-lg py-6 px-8;
}
.balance-label {
  @apply text-base text-text-subtle;
}
.balance-amount {
  @apply text-3xl font-bold text-primary-active;
}
.charge-button {
  @apply mt-2 px-6 py-2 bg-warning-default text-white font-bold rounded-md hover:bg-rose-300 transition;
}

/* 포인트 내역 리스트 */
.history-list {
  @apply flex flex-col gap-4 w-full h-[500px] overflow-y-auto;
}

/* 개별 포인트 아이템 */
.history-item {
  @apply flex justify-between items-center bg-background-surface shadow-sm rounded-lg p-4;
}

/* 타입별 스타일 */
.history-item.charge .amount {
  @apply text-primary-default font-bold text-lg;
}
.history-item.payment .amount {
  @apply text-warning-text font-bold text-lg;
}
.history-item.refund .amount {
  @apply text-primary-active font-bold text-lg;
}

/* 히스토리 정보 */
.info {
  @apply flex flex-col;
}
.label {
  @apply font-semibold text-text-default;
}
.date {
  @apply text-sm text-text-subtle mt-1;
}

/* 환불 버튼 */
.amount-wrapper {
  @apply flex flex-col items-end gap-2;
}
.refund-button {
  @apply text-primary-default text-sm underline hover:text-primary-active transition;
}
</style>

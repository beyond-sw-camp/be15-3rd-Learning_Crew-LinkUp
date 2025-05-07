<script setup>
import { ref } from 'vue';

const emits = defineEmits(['filter-change']);

const selectedYearMonth = ref('');
const selectedTransactionType = ref('');

// 월 변경
const onYearMonthChange = (e) => {
  selectedYearMonth.value = e.target.value;
  emits('filter-change', {
    yearMonth: selectedYearMonth.value,
    transactionType: selectedTransactionType.value,
  });
};

// 거래유형 변경
const onTransactionTypeChange = (e) => {
  selectedTransactionType.value = e.target.value;
  emits('filter-change', {
    yearMonth: selectedYearMonth.value,
    transactionType: selectedTransactionType.value,
  });
};
</script>

<template>
  <div class="filter-container">
    <select class="filter-select" @change="onYearMonthChange">
      <option value="">전체 월</option>
      <option value="2025-01">2025년 1월</option>
      <option value="2025-02">2025년 2월</option>
      <option value="2025-03">2025년 3월</option>
      <option value="2025-04">2025년 4월</option>
    </select>

    <select class="filter-select" @change="onTransactionTypeChange">
      <option value="">전체 유형</option>
      <option value="CHARGE">충전</option>
      <option value="PAYMENT">결제</option>
      <option value="REFUND">환불</option>
      <option value="WITHDRAW">출금</option>
    </select>
  </div>
</template>

<style scoped>
.filter-container {
  @apply flex gap-4 mt-6;
}

.filter-select {
  @apply px-4 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800;
}
</style>

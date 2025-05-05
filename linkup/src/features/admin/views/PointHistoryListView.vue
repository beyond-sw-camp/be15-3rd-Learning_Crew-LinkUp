<!-- src/features/admin/views/PointHistoryListView.vue -->
<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'

const props = defineProps({ pageTitle: String })

// 실제 API 연결 (주석 처리)
/*
import { fetchPointHistoryList } from '@/api/admin.js'

function fetchPointHistoryList(params) {
  return api.get('/api/v1/common-service/points/history', { params })
}
*/

// 더미 데이터 대체
function fetchPointHistoryList({ userId = '', authority = '', transactionType = '', startDate = '', endDate = '', page = 1 }) {
  const dummy = Array.from({ length: 10 }, (_, i) => ({
    pointTransactionId: i + 1,
    userId: `user${i + 1}`,
    userName: `사용자${i + 1}`,
    authority: i % 2 === 0 ? 'MEMBER' : 'OWNER',
    amount: (i % 2 === 0 ? 1000 : -500) * (i + 1),
    transactionType: ['CHARGE', 'PAYMENT', 'REFUND', 'WITHDRAW'][i % 4],
    createdAt: '2024-05-01 10:00'
  }))

  const filtered = dummy.filter(item => {
    const matchUser = !userId || item.userId.includes(userId)
    const matchAuthority = !authority || item.authority === authority
    const matchType = !transactionType || item.transactionType === transactionType
    return matchUser && matchAuthority && matchType
  })

  return Promise.resolve({
    data: filtered,
    totalPages: 1
  })
}

// 컬럼 정의
const columns = [
  { key: 'pointTransactionId', label: 'ID' },
  { key: 'userId', label: '사용자 ID' },
  { key: 'userName', label: '사용자 이름' },
  { key: 'authority', label: '권한' },
  { key: 'amount', label: '금액', format: v => `${v > 0 ? '+' : ''}${v.toLocaleString()}` },
  { key: 'transactionType', label: '유형' },
  { key: 'createdAt', label: '일시' }
]

// 초기 필터
const initFilters = {
  userId: '',
  authority: '',
  transactionType: '',
  startDate: '',
  endDate: ''
}
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchPointHistoryList"
    :columns="columns"
    :initFilters="initFilters"
    :pageTitle="props.pageTitle"
    :enableModal="false"
  >
    <template #filters>
      <label class="filter-label">
        사용자 ID:
        <input v-model="initFilters.userId" class="select-box id-input" placeholder="ID" />
      </label>

      <label class="filter-label">
        권한:
        <select v-model="initFilters.authority" class="select-box">
          <option value="">전체</option>
          <option value="MEMBER">회원</option>
          <option value="OWNER">사업자</option>
        </select>
      </label>

      <label class="filter-label">
        트랜잭션 유형:
        <select v-model="initFilters.transactionType" class="select-box">
          <option value="">전체</option>
          <option value="CHARGE">충전</option>
          <option value="PAYMENT">지불</option>
          <option value="REFUND">반환</option>
          <option value="WITHDRAW">환불</option>
        </select>
      </label>

      <label class="filter-label">
        조회 기간:
        <input type="date" v-model="initFilters.startDate" class="select-box date-input" />
        ~
        <input type="date" v-model="initFilters.endDate" class="select-box date-input" />
      </label>
    </template>
  </AdminListTemplate>
</template>

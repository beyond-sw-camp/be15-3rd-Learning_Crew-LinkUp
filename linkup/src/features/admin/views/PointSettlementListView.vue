<!-- src/features/admin/views/PointSettlementListView.vue -->
<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'

// props
const props = defineProps({ pageTitle: String })

// 더미 데이터용 fetch 함수 (API 연결 시 교체 가능)
/*
import { fetchPointSettlementList } from '@/api/admin.js'
*/

function fetchPointSettlementList({ ownerId = '', startDate = '', endDate = '', page = 1 }) {
  const dummy = Array.from({ length: 10 }, (_, i) => ({
    settlementId: i + 1001,
    ownerId: `owner${i + 1}`,
    ownerName: `사업자${i + 1}`,
    amount: 100000 + i * 5000,
    settledAt: `2025-04-${String(i + 1).padStart(2, '0')} 14:00`
  }))

  const filtered = dummy.filter(item => {
    const matchId = !ownerId || item.ownerId.includes(ownerId)
    return matchId
  })

  return Promise.resolve({
    data: filtered,
    totalPages: 1
  })
}

// 컬럼 정의
const columns = [
  { key: 'settlementId', label: '정산 ID' },
  { key: 'ownerId', label: '사업자 ID' },
  { key: 'ownerName', label: '사업자 이름' },
  { key: 'amount', label: '정산 금액', format: v => `${v.toLocaleString()}원` },
  { key: 'settledAt', label: '정산 일시' }
]

// 초기 필터
const initFilters = {
  ownerId: '',
  startDate: '',
  endDate: ''
}
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchPointSettlementList"
    :columns="columns"
    :initFilters="initFilters"
    :pageTitle="props.pageTitle"
    :enableModal="false"
  >
    <template #filters>
      <label class="filter-label">
        사업자 ID:
        <input v-model="initFilters.ownerId" class="select-box id-input" placeholder="사업자 ID" />
      </label>

      <label class="filter-label">
        정산 일시:
        <input type="date" v-model="initFilters.startDate" class="select-box date-input" />
        ~
        <input type="date" v-model="initFilters.endDate" class="select-box date-input" />
      </label>
    </template>
  </AdminListTemplate>
</template>

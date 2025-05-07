<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import { fetchSettlementList } from '@/api/admin.js'

// 페이지 제목
const props = defineProps({ pageTitle: String })

// 필터 상태 관리
const filters = ref({
  ownerId: '',
  startDate: '',
  endDate: ''
})

// 컬럼 정의
const columns = [
  { key: 'settlementId', label: '정산 ID' },
  { key: 'ownerId', label: '사업자 ID' },
  { key: 'ownerName', label: '사업자 이름' },
  { key: 'amount', label: '정산 금액', format: v => `${v.toLocaleString()}원` },
  { key: 'settledAt', label: '정산 일시' }
]

// API 호출 함수 (AdminListTemplate용 fetchFn 규격)
const fetchList = async ({ page = 1 }) => {
  try {
    const params = {
      userId: filters.value.ownerId || '',
      startDate: filters.value.startDate || '',
      endDate: filters.value.endDate || '',
      page
    }

    // null/빈 문자열 제거
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key]
    })

    const res = await fetchSettlementList(params)
    console.log('응답 데이터:', res)

    return {
      data: res.data?.data?.content || [],
      totalPages: res.data?.data?.totalPages || 1
    }
  } catch (error) {
    console.error('🚨 정산 내역 조회 실패:', error)
    return { data: [], totalPages: 1 }
  }
}
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchList"
    :columns="columns"
    :initFilters="filters"
    :pageTitle="props.pageTitle"
    :enableModal="false"
  >
    <template #filters>
      <label class="filter-label">
        사업자 ID:
        <input
          v-model="filters.ownerId"
          class="select-box id-input"
          placeholder="ID"
        />
      </label>

      <label class="filter-label">
        정산 일시:
        <input type="date" v-model="filters.startDate" class="select-box date-input" />
        ~
        <input type="date" v-model="filters.endDate" class="select-box date-input" />
      </label>
    </template>
  </AdminListTemplate>
</template>

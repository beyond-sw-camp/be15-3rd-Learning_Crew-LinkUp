<!-- src/features/admin/views/AccountListView.vue -->
<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'

const props = defineProps({ pageTitle: String })

// ✅ 실제 API 연결 (주석 처리)
/*
import { fetchAccountList } from '@/api/admin.js'
function fetchAccountList(params) {
  return api.get('/api/v1/common-service/accounts', { params })
}
*/

// ✅ 더미 데이터 기반 함수
function fetchAccountList({ authority = '', status = '', page = 1 }) {
  const dummyData = Array.from({ length: 10 }, (_, i) => ({
    accountId: i + 1,
    userId: `user${i + 1}`,
    authority: i % 2 === 0 ? 'MEMBER' : 'OWNER',
    status: ['PENDING', 'APPROVED', 'REJECTED'][i % 3],
    bankName: ['신한', '국민', '하나', '카카오'][i % 4],
    accountNumber: `110-${i + 1}23-456${i}`,
    holderName: `홍길동${i + 1}`,
    createdAt: '2024-05-01 10:00'
  }))

  const filtered = dummyData.filter(item => {
    const matchAuthority = !authority || item.authority === authority
    const matchStatus = !status || item.status === status
    return matchAuthority && matchStatus
  })

  return Promise.resolve({
    data: filtered,
    totalPages: 1
  })
}

// ✅ 컬럼 정의
const columns = [
  { key: 'accountId', label: '계좌 ID' },
  { key: 'userId', label: '사용자 ID' },
  { key: 'authority', label: '권한' },
  {
    key: 'status',
    label: '상태',
    format: v =>
      v === 'PENDING' ? '대기' :
        v === 'APPROVED' ? '승인' :
          v === 'REJECTED' ? '거절' : v
  },
  { key: 'bankName', label: '은행명' },
  { key: 'accountNumber', label: '계좌번호' },
  { key: 'holderName', label: '예금주명' },
  { key: 'createdAt', label: '등록일' }
]

// ✅ 초기 필터
const initFilters = {
  authority: '',
  status: ''
}
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchAccountList"
    :columns="columns"
    :initFilters="initFilters"
    :pageTitle="props.pageTitle"
    :enableModal="false"
  >
    <template #filters>
      <label class="filter-label">
        권한:
        <select v-model="initFilters.authority" class="select-box">
          <option value="">전체</option>
          <option value="MEMBER">회원</option>
          <option value="OWNER">사업자</option>
        </select>
      </label>

      <label class="filter-label">
        상태:
        <select v-model="initFilters.status" class="select-box">
          <option value="">전체</option>
          <option value="PENDING">대기</option>
          <option value="APPROVED">승인</option>
          <option value="REJECTED">거절</option>
        </select>
      </label>
    </template>
  </AdminListTemplate>
</template>

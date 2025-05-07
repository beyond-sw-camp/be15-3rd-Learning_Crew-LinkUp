<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import { fetchAccount } from '@/api/admin.js'  // 실제 API 연동

// 페이지 제목을 props로 전달받음
const props = defineProps({ pageTitle: String })

// 필터 상태 관리
const filters = ref({
  authority: '', // 권한 필터 (MEMBER, OWNER 등)
  status: ''     // 상태 필터 (PENDING, APPROVED 등)
})

const page = ref(1) // 현재 페이지 번호
const rows = ref([]) // 테이블에 표시될 데이터
const totalPages = ref(1) // 전체 페이지 수

// 검색 버튼 클릭 시 호출되는 함수
const search = async () => {
  console.log('검색 버튼 클릭됨', filters.value) // 필터 값 확인
  page.value = 1 // 페이지를 1로 리셋
  await fetchList() // 필터링된 데이터로 API 호출
}

// 계좌 내역 조회 함수
const fetchList = async () => {
  try {
    // 필터 값에 맞는 파라미터 설정
    const params = {
      authority: filters.value.authority || '', // 권한
      status: filters.value.status || '',       // 상태
      page: page.value || 1                     // 페이지 번호
    }

    console.log('필터링된 파라미터:', params) // 필터 값 확인

    // API 호출
    const res = await fetchAccount(params)

    // 응답 데이터 확인
    console.log('응답 데이터:', res)

    // 응답 데이터 처리
    if (res.data) {
      rows.value = res.data // 테이블에 표시될 데이터 저장
      totalPages.value = res.totalPages || 1 // 전체 페이지 수 저장
      console.log('데이터 할당:', rows.value)
    } else {
      console.error('잘못된 응답:', res)
      rows.value = []
      totalPages.value = 1
    }
  } catch (e) {
    console.error('API 요청 실패:', e)
    rows.value = []
    totalPages.value = 1
  }
}

// 테이블 컬럼 설정
const columns = [
  { key: 'accountId', label: '계좌 ID' },
  { key: 'userId', label: '사용자 ID' },
  { key: 'authority', label: '권한' },
  {
    key: 'status',
    label: '상태',
    format: (v) => {
      switch (v) {
        case 'PENDING': return '대기'
        case 'APPROVED': return '승인'
        case 'REJECTED': return '거절'
        default: return v
      }
    }
  },
  { key: 'bankName', label: '은행명' },
  { key: 'accountNumber', label: '계좌번호' },
  { key: 'holderName', label: '예금주명' },
  { key: 'createdAt', label: '등록일' }
]
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchList"
    :columns="columns"
    :initFilters="filters"
    :pageTitle="props.pageTitle"
    :enableModal="false"
  >
    <!-- 필터 영역 -->
    <template #filters>
      <label class="filter-label">
        권한:
        <select v-model="filters.authority" class="select-box">
          <option value="">전체</option>
          <option value="MEMBER">회원</option>
          <option value="OWNER">사업자</option>
        </select>
      </label>

      <label class="filter-label">
        상태:
        <select v-model="filters.status" class="select-box">
          <option value="">전체</option>
          <option value="PENDING">대기</option>
          <option value="APPROVED">승인</option>
          <option value="REJECTED">거절</option>
        </select>
      </label>
    </template>
  </AdminListTemplate>
</template>

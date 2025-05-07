<script setup>
import { ref, onMounted } from 'vue'
import { format } from 'date-fns'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import { fetchUserList } from '@/api/admin.js'  // 실제 API 연결

// 페이지 제목을 prop으로 받음
const props = defineProps({
  pageTitle: String
})

// 필터 상태
const filters = ref({
  authority: '',
  status: '',
  userId: ''
})

// 실제 API 연동: 사용자 목록 조회
const fetchUsers = async ({ page, authority, status, userId }) => {
  try {
    const params = {
      roleName: authority || undefined,  // 필터링할 역할 이름
      statusName: status || undefined,   // 필터링할 상태 이름
      userId: userId || undefined,       // 사용자 ID 필터
      page,
      size: 10                           // 페이지 크기 (고정값)
    }

    const response = await fetchUserList(params)

    // API 응답 구조에 맞게 처리
    return {
      data: response.data || [],
      totalPages: response.totalPages || 1
    }
  } catch (error) {
    console.error('사용자 목록 조회 실패:', error)
    return { data: [], totalPages: 0 }
  }
}

// 테이블 컬럼 정의
const columns = [
  { key: 'userId', label: '회원 ID' },
  { key: 'userName', label: '이름' },
  { key: 'nickname', label: '닉네임', format: v => v || '-' },
  { key: 'email', label: '이메일' },
  { key: 'roleName', label: '권한' },
  { key: 'pointBalance', label: '보유 포인트', format: v => `${v.toLocaleString()}P` },
  { key: 'contactNumber', label: '연락처' },
  { key: 'status', label: '계정 상태', format: v => v === 'NULL' ? '비활성화' : '활성화' }
]
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchUsers"
    :columns="columns"
    :initFilters="filters"
    :pageTitle="props.pageTitle"
  >
    <template #filters="{ filters }">
      <label class="filter-label">
        권한:
        <select v-model="filters.authority" class="select-box">
          <option value="">전체</option>
          <option value="USER">회원</option>
          <option value="BUSINESS">사업자</option>
          <option value="ADMIN">관리자</option>
        </select>
      </label>

      <label class="filter-label">
        상태:
        <select v-model="filters.status" class="select-box">
          <option value="">전체</option>
          <option value="NULL">활성화</option>
          <option value="DELETED">비활성화</option>
        </select>
      </label>

      <label class="filter-label">
        사용자 ID:
        <input v-model="filters.userId" class="select-box id-input" placeholder="ID" />
      </label>
    </template>
  </AdminListTemplate>
</template>

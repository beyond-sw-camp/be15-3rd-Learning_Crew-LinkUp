<script setup>
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'

// 페이지 제목을 prop으로 받음
const props = defineProps({
  pageTitle: String
})

// 실제 API는 연결 안함 (mock용)
function fetchUserList({ page, authority, status }) {
  const dummy = Array.from({ length: 10 }, (_, i) => ({
    userId: `U00${i + 1}`,
    userName: `홍길동${i + 1}`,
    nickname: `링크업${i + 1}`,
    email: `user${i + 1}@test.com`,
    authority: i % 3 === 0 ? 'ADMIN' : (i % 2 === 0 ? 'USER' : 'BUSINESS'),
    pointBalance: Math.floor(Math.random() * 10000),
    contactNumber: `010-1234-56${i}${i}`,
    status: i % 3 === 0 ? 'DELETED' : 'ACCEPTED'
  }))
  return Promise.resolve({
    data: dummy,
    totalPages: 3
  })
}

const columns = [
  { key: 'userId', label: '회원 ID' },
  { key: 'userName', label: '이름' },
  { key: 'nickname', label: '닉네임', format: v => v || '-' },
  { key: 'email', label: '이메일' },
  { key: 'authority', label: '권한' },
  { key: 'pointBalance', label: '보유 포인트', format: v => `${v.toLocaleString()}P` },
  { key: 'contactNumber', label: '연락처' },
  { key: 'status', label: '계정 상태', format: v => v === 'ACCEPTED' ? '활성화' : '비활성화' }
]

const initFilters = {
  authority: '',
  status: ''
}
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchUserList"
    :columns="columns"
    :initFilters="initFilters"
    :pageTitle="props.pageTitle"
  >
    <template #filters>
      <label class="filter-label">
        권한:
        <select v-model="initFilters.authority" class="select-box">
          <option value="">전체</option>
          <option value="USER">회원</option>
          <option value="BUSINESS">사업자</option>
          <option value="ADMIN">관리자</option>
        </select>
      </label>

      <label class="filter-label">
        상태:
        <select v-model="initFilters.status" class="select-box">
          <option value="">전체</option>
          <option value="ACCEPTED">활성화</option>
          <option value="DELETED">비활성화</option>
        </select>
      </label>


      <label class="filter-label">
        사용자 ID:
        <input v-model="initFilters.userId" class="select-box id-input" placeholder="ID" />
      </label>
    </template>
  </AdminListTemplate>
</template>

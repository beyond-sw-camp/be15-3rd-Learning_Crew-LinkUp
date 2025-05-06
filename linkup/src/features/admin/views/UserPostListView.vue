<!-- src/features/admin/views/UserPostListView.vue -->
<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'

const props = defineProps({ pageTitle: String })

// 게시글 조회 API (실제 연결 시 사용)
/*
import { fetchPostList } from '@/api/admin.js'
function fetchPostList(params) {
  return api.get('/api/v1/common-service/posts/list', { params })
}
*/

// 더미 데이터 (Mock)
function fetchPostList({ writerId = '', isDeleted = '', page = 1 }) {
  const dummy = Array.from({ length: 10 }, (_, i) => ({
    postId: `POST00${i + 1}`,
    writerId: `writer${i + 1}`,
    writerName: `작성자${i + 1}`,
    title: `게시글 제목 ${i + 1}`,
    createdAt: '2024-05-01',
    deletedAt: i % 3 === 0 ? '2024-05-02' : null,
    isDeleted: i % 3 === 0 ? 'Y' : 'N'
  }))

  const filtered = dummy.filter((item) => {
    const matchWriter = !writerId || item.writerId.includes(writerId)
    const matchDeleted = !isDeleted || item.isDeleted === isDeleted
    return matchWriter && matchDeleted
  })

  return Promise.resolve({
    data: filtered,
    totalPages: 1
  })
}

// 컬럼 정의
const columns = [
  { key: 'postId', label: '게시글 ID' },
  { key: 'writerId', label: '작성자 ID' },
  { key: 'writerName', label: '작성자 이름' },
  { key: 'title', label: '제목' },
  { key: 'createdAt', label: '생성일' },
  { key: 'deletedAt', label: '삭제일', format: v => v || '-' },
  { key: 'isDeleted', label: '공개 여부', format: v => (v === 'Y' ? '비공개' : '공개') },
  {
    key: 'detail',
    label: '상세보기',
    format: (_, row) => ({
      type: 'button',
      label: '보기',
      onClick: () => alert(`게시글 ${row.postId} 상세보기`)
    })
  }
]

// 필터 초기값
const initFilters = {
  writerId: '',
  isDeleted: ''
}
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchPostList"
    :columns="columns"
    :initFilters="initFilters"
    :pageTitle="props.pageTitle"
    :enableModal="false"
  >
    <template #filters>
      <label class="filter-label">
        작성자 ID:
        <input v-model="initFilters.writerId" class="select-box id-input" placeholder="ID" />
      </label>
      <label class="filter-label">
        공개 여부:
        <select v-model="initFilters.isDeleted" class="select-box">
          <option value="">전체</option>
          <option value="N">공개</option>
          <option value="Y">비공개</option>
        </select>
      </label>
    </template>
  </AdminListTemplate>
</template>

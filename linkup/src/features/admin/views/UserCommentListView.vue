<!-- src/features/admin/views/UserCommentListView.vue -->
<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'

const props = defineProps({ pageTitle: String })

// 실제 API (주석 처리)
/*
import { fetchCommentList } from '@/api/admin.js'

function fetchCommentList(params) {
  return api.get('/api/v1/common-service/comments', { params })
}
*/

// 더미 데이터로 대체
function fetchCommentList({ userId = '', isDeleted = '', page = 1 }) {
  const dummy = Array.from({ length: 10 }, (_, i) => ({
    commentId: `C00${i + 1}`,
    postId: `P00${i + 1}`,
    userId: `user${i + 1}`,
    userName: `작성자${i + 1}`,
    content: `댓글 내용 ${i + 1}`,
    createdAt: '2024-05-01',
    deletedAt: i % 4 === 0 ? '2024-05-02' : null,
    isDeleted: i % 4 === 0 ? 'Y' : 'N'
  }))

  const filtered = dummy.filter(item => {
    const matchUser = !userId || item.userId.includes(userId)
    const matchDeleted = !isDeleted || item.isDeleted === isDeleted
    return matchUser && matchDeleted
  })

  return Promise.resolve({
    data: filtered,
    totalPages: 1
  })
}

// 테이블 컬럼 정의
const columns = [
  { key: 'commentId', label: '댓글 ID' },
  { key: 'postId', label: '게시글 ID' },
  { key: 'userId', label: '작성자 ID' },
  { key: 'userName', label: '작성자 이름' },
  { key: 'content', label: '내용' },
  { key: 'createdAt', label: '작성일' },
  { key: 'deletedAt', label: '삭제일', format: v => v || '-' },
  { key: 'isDeleted', label: '공개 여부', format: v => (v === 'Y' ? '비공개' : '공개') }
]

// 필터 초기값
const initFilters = {
  userId: '',
  isDeleted: ''
}
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchCommentList"
    :columns="columns"
    :initFilters="initFilters"
    :pageTitle="props.pageTitle"
    :enableModal="false"
  >
    <template #filters>
      <label class="filter-label">
        작성자 ID:
        <input v-model="initFilters.userId" class="select-box id-input" placeholder="ID" />
      </label>
      <label class="filter-label">
        공개 여부:
        <select v-model="initFilters.isDeleted" class="select-box">
          <option value="">전체</option>
          <option value="N">공개</option>
          <option value="Y">비공개</option>
        </select>
      </label>
      <label class="filter-label">
        게시글 ID:
        <input v-model="initFilters.postId" class="select-box id-input" placeholder="ID" />
      </label>
    </template>
  </AdminListTemplate>
</template>

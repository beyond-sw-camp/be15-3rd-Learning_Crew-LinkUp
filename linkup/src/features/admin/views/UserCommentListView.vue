<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import { fetchAllComments } from '@/api/admin.js'  // 실제 API 연동

const props = defineProps({ pageTitle: String })

// 필터 초기값 설정
const initFilters = ref({
  userId: '',
  isDeleted: '',
  postId: ''
})

// API 연동 함수 - 댓글 목록 조회
async function fetchCommentListData({ page = 1, userId = '', isDeleted = '', postId = '' }) {
  try {
    const res = await fetchAllComments({
      page,
      userId,
      isDeleted,
      postId
    })
    console.log("응답 데이터:", res)  // 응답 데이터 확인


    return {
      data: res.data?.data?.postComments || [],  // 실제 API 응답 데이터 구조에 맞게 수정
      totalPages: res.data?.data?.pagination?.totalPages || 1  // 페이지 정보
    }
  } catch (error) {
    console.error('🚨 댓글 목록 조회 실패:', error)
    return { data: [], totalPages: 1 }
  }
}

// 테이블 컬럼 정의
const columns = [
  { key: 'commentId', label: '댓글 ID' },
  { key: 'postId', label: '게시글 ID' },
  { key: 'userId', label: '작성자 ID' },
  { key: 'nickname', label: '작성자 닉네임' },
  { key: 'commentContent', label: '내용' },
  { key: 'createdAt', label: '작성일' },
  { key: 'deletedAt', label: '삭제일', format: v => v || '-' },
  { key: 'isDeleted', label: '공개 여부', format: v => (v === 'Y' ? '비공개' : '공개') }
]
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchCommentListData"
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

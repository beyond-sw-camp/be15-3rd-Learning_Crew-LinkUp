<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from '@/features/admin/components/AdminFilter.vue'
import AdminTable from '@/features/admin/components/AdminTable.vue'
import Pagination from '@/components/common/Pagination.vue'
import { fetchCommentList } from '@/api/admin.js'
import '@/assets/css/admin-styles.css'

const props = defineProps({ pageTitle: String })

const filters = ref({ userId: '', isDeleted: '' })
const comments = ref([])
const page = ref(1)
const totalPages = ref(1)
const loading = ref(false)
const error = ref(null)

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const { data } = await fetchCommentList({
      userId: filters.value.userId,
      isDeleted: filters.value.isDeleted,
      page: page.value
    })
    comments.value = data.data
    totalPages.value = data.totalPages || 1
  } catch (e) {
    error.value = '데이터를 불러오는 데 실패했습니다.'
    comments.value = []
  } finally {
    loading.value = false
  }
}

const onSearch = () => {
  page.value = 1
  fetchData()
}

const changePage = (p) => {
  page.value = p
  fetchData()
}

onMounted(fetchData)
</script>

<template>
  <AdminFilter @search="onSearch" :title="pageTitle">
    <label class="filter-label">
      작성자 ID:
      <input type="text" v-model="filters.userId" class="select-box id-input" placeholder="ID" />
    </label>
    <label class="filter-label">
      공개 여부:
      <select v-model="filters.isDeleted" class="select-box">
        <option value="">전체</option>
        <option value="N">공개</option>
        <option value="Y">비공개</option>
      </select>
    </label>
  </AdminFilter>

  <!-- 로딩 중 -->
  <div v-if="loading">로딩 중...</div>

  <!-- 에러 발생 -->
  <div v-else-if="error">{{ error }}</div>

  <!-- 데이터 없음 -->
  <div v-else-if="comments.length === 0">불러올 데이터가 없습니다.</div>

  <!-- 정상 테이블 렌더링 -->
  <div v-else>
    <AdminTable>
      <template #thead>
        <tr>
          <th>댓글 ID</th>
          <th>게시글 ID</th>
          <th>작성자 ID</th>
          <th>작성자 이름</th>
          <th>내용</th>
          <th>작성일</th>
          <th>삭제일</th>
          <th>공개 여부</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="comment in comments" :key="comment.commentId">
          <td>{{ comment.commentId }}</td>
          <td>{{ comment.postId }}</td>
          <td>{{ comment.userId }}</td>
          <td>{{ comment.userName }}</td>
          <td>{{ comment.content }}</td>
          <td>{{ comment.createdAt }}</td>
          <td>{{ comment.deletedAt || '-' }}</td>
          <td>{{ comment.isDeleted === 'Y' ? '비공개' : '공개' }}</td>
        </tr>
      </template>
    </AdminTable>

    <Pagination :current-page="page" :total-pages="totalPages" @update:page="changePage" />
  </div>
</template>

<style scoped>
</style>

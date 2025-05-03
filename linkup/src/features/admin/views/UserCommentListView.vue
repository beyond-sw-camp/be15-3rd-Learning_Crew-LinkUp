<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from '@/features/admin/components/AdminFilter.vue'
import AdminTable from '@/features/admin/components/AdminTable.vue'
import Pagination from '@/features/admin/components/Pagination.vue'
import { fetchCommentList } from '@/api/admin.js'
import '@/assets/css/admin-styles.css'

const props = defineProps({ pageTitle: String })

const filters = ref({ userId: '', isDeleted: '' })
const requests = ref([])
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
    requests.value = data.data
    totalPages.value = data.totalPages || 1
  } catch (e) {
    error.value = '데이터를 불러오는 데 실패했습니다.'
    requests.value = []
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

  <div v-if="loading">로딩 중...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="requests.length === 0">불러올 데이터가 없습니다.</div>

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
        <tr v-for="req in requests" :key="req.commentId">
          <td>{{ req.commentId }}</td>
          <td>{{ req.postId }}</td>
          <td>{{ req.userId }}</td>
          <td>{{ req.userName }}</td>
          <td>{{ req.content }}</td>
          <td>{{ req.createdAt }}</td>
          <td>{{ req.deletedAt || '-' }}</td>
          <td>{{ req.isDeleted === 'Y' ? '비공개' : '공개' }}</td>
        </tr>
      </template>
    </AdminTable>

    <Pagination :current-page="page" :total-pages="totalPages" @update:page="changePage" />
  </div>
</template>

<style scoped>
</style>

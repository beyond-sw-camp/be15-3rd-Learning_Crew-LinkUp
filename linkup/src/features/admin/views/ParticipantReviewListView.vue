<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from '@/features/admin/components/AdminFilter.vue'
import AdminTable from '@/features/admin/components/AdminTable.vue'
import Pagination from '@/features/admin/components/Pagination.vue'
import { fetchParticipantReviewList } from '@/api/admin.js'
import '@/assets/css/admin-styles.css'

const props = defineProps({ pageTitle: String })

const filters = ref({
  searchType: 'meetingId',
  keyword: ''
})

const requests = ref([])
const page = ref(1)
const totalPages = ref(1)
const loading = ref(false)
const error = ref(null)

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const { data } = await fetchParticipantReviewList({
      ...filters.value,
      page: page.value
    })
    requests.value = data.data
    totalPages.value = data.totalPages || 1
  } catch (e) {
    error.value = '참가자 평가 정보를 불러오는 데 실패했습니다.'
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
      검색 기준:
      <select v-model="filters.searchType" class="select-box">
        <option value="meetingId">모임 ID</option>
        <option value="reviewerId">작성자 ID</option>
        <option value="revieweeId">대상자 ID</option>
      </select>
      <input type="text" v-model="filters.keyword" class="select-box id-input" placeholder="ID" />
    </label>
  </AdminFilter>

  <div v-if="loading">로딩 중...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="requests.length === 0">불러올 데이터가 없습니다.</div>

  <div v-else>
    <AdminTable>
      <template #thead>
        <tr>
          <th>리뷰 ID</th>
          <th>작성자 ID</th>
          <th>작성자</th>
          <th>대상자 ID</th>
          <th>대상자</th>
          <th>모임 ID</th>
          <th>평점</th>
          <th>작성일시</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="req in requests" :key="req.reviewId">
          <td>{{ req.reviewId }}</td>
          <td>{{ req.reviewerId }}</td>
          <td>{{ req.reviewerName }}</td>
          <td>{{ req.revieweeId }}</td>
          <td>{{ req.revieweeName }}</td>
          <td>{{ req.meetingId }}</td>
          <td>{{ req.score }}</td>
          <td>{{ req.createdAt }}</td>
        </tr>
      </template>
    </AdminTable>

    <Pagination :current-page="page" :total-pages="totalPages" @update:page="changePage" />
  </div>
</template>

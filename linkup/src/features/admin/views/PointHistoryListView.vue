<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from '@/features/admin/components/AdminFilter.vue'
import AdminTable from '@/features/admin/components/AdminTable.vue'
import Pagination from '@/components/common/Pagination.vue'
import { fetchPointHistoryList } from '@/api/admin.js'
import '@/assets/css/admin-styles.css'

const props = defineProps({ pageTitle: String })

const filters = ref({
  userId: '',
  authority: '',
  transactionType: '',
  startDate: '',
  endDate: ''
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
    const { data } = await fetchPointHistoryList({
      ...filters.value,
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
      사용자 ID:
      <input type="text" v-model="filters.userId" class="select-box id-input" placeholder="ID" />
    </label>
    <label class="filter-label">
      권한:
      <select v-model="filters.authority" class="select-box">
        <option value="">전체</option>
        <option value="MEMBER">회원</option>
        <option value="OWNER">사업자</option>
      </select>
    </label>
    <label class="filter-label">
      트랜잭션 유형:
      <select v-model="filters.transactionType" class="select-box">
        <option value="">전체</option>
        <option value="CHARGE">충전</option>
        <option value="PAYMENT">지불</option>
        <option value="REFUND">반환</option>
        <option value="WITHDRAW">환불</option>
      </select>
    </label>
    <label class="filter-label">
      조회 기간:
      <input type="date" v-model="filters.startDate" class="select-box date-input"> ~
      <input type="date" v-model="filters.endDate" class="select-box date-input">
    </label>
  </AdminFilter>

  <div v-if="loading">로딩 중...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="requests.length === 0">불러올 데이터가 없습니다.</div>

  <div v-else>
    <AdminTable>
      <template #thead>
        <tr>
          <th>ID</th>
          <th>사용자 ID</th>
          <th>사용자 이름</th>
          <th>권한</th>
          <th>금액</th>
          <th>유형</th>
          <th>일시</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="req in requests" :key="req.pointTransactionId">
          <td>{{ req.pointTransactionId }}</td>
          <td>{{ req.userId }}</td>
          <td>{{ req.userName }}</td>
          <td>{{ req.authority }}</td>
          <td>{{ req.amount > 0 ? '+' + req.amount.toLocaleString() : req.amount.toLocaleString() }}</td>
          <td>{{ req.transactionType }}</td>
          <td>{{ req.createdAt }}</td>
        </tr>
      </template>
    </AdminTable>

    <Pagination :current-page="page" :total-pages="totalPages" @update:page="changePage" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from '@/features/admin/components/AdminFilter.vue'
import AdminTable from '@/features/admin/components/AdminTable.vue'
import Pagination from '@/features/admin/components/Pagination.vue'
import { fetchAccountList } from '@/api/admin.js'
import '@/assets/css/admin-styles.css'

const props = defineProps({ pageTitle: String })

const filters = ref({
  authority: '',   // MEMBER | OWNER
  status: ''       // PENDING | APPROVED | REJECTED
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
    const { data } = await fetchAccountList({
      ...filters.value,
      page: page.value
    })
    requests.value = data.data
    totalPages.value = data.totalPages || 1
  } catch (e) {
    error.value = '계좌 정보를 불러오는 데 실패했습니다.'
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
  </AdminFilter>

  <div v-if="loading">로딩 중...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="requests.length === 0">불러올 데이터가 없습니다.</div>

  <div v-else>
    <AdminTable>
      <template #thead>
        <tr>
          <th>계좌 ID</th>
          <th>사용자 ID</th>
          <th>권한</th>
          <th>상태</th>
          <th>은행명</th>
          <th>계좌번호</th>
          <th>예금주명</th>
          <th>등록일</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="req in requests" :key="req.accountId">
          <td>{{ req.accountId }}</td>
          <td>{{ req.userId }}</td>
          <td>{{ req.authority }}</td>
          <td>
            {{ req.status === 'PENDING' ? '대기' :
              req.status === 'APPROVED' ? '승인' :
                  req.status === 'REJECTED' ? '거절' : req.status }}
          </td>
          <td>{{ req.bankName }}</td>
          <td>{{ req.accountNumber }}</td>
          <td>{{ req.holderName }}</td>
          <td>{{ req.createdAt }}</td>
        </tr>
      </template>
    </AdminTable>

    <Pagination
        :current-page="page"
        :total-pages="totalPages"
        @update:page="changePage"
    />
  </div>
</template>

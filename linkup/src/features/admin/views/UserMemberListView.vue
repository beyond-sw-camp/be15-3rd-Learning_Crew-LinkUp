<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from '@/features/admin/components/AdminFilter.vue'
import AdminTable from '@/features/admin/components/AdminTable.vue'
import Pagination from '@/components/common/Pagination.vue'
import { fetchUserList } from '@/api/admin.js'
import '@/assets/css/admin-styles.css'

const requests = ref([])
const totalPages = ref(1)
const page = ref(1)
const loading = ref(false)
const error = ref(null)

defineProps({ pageTitle: String })

const filters = ref({
  authority: '',  // USER, BUSINESS, ADMIN
  status: ''      // ACCEPTED, DELETED 등
})

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const { data } = await fetchUserList({
      authority: filters.value.authority,
      status: filters.value.status,
      page: page.value
    })
    requests.value = data.data
    totalPages.value = data.totalPages
  } catch (e) {
    error.value = '회원 정보를 불러오는 데 실패했습니다.'
    requests.value = []
  } finally {
    loading.value = false
  }
}

const onSearch = () => {
  page.value = 1
  fetchData()
}

const changePage = (newPage) => {
  page.value = newPage
  fetchData()
}

onMounted(fetchData)
</script>

<template>
  <div>
    <AdminFilter @search="onSearch" :title="pageTitle">
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
          <option value="ACCEPTED">활성화</option>
          <option value="DELETED">비활성화</option>
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
            <th>회원 ID</th>
            <th>이름</th>
            <th>닉네임</th>
            <th>이메일</th>
            <th>권한</th>
            <th>보유 포인트</th>
            <th>연락처</th>
            <th>계정 상태</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="req in requests" :key="req.userId">
            <td>{{ req.userId }}</td>
            <td>{{ req.userName }}</td>
            <td>{{ req.nickname || '-' }}</td>
            <td>{{ req.email }}</td>
            <td>{{ req.authority }}</td>
            <td>{{ req.pointBalance.toLocaleString() }}P</td>
            <td>{{ req.contactNumber }}</td>
            <td>
              {{ req.status === 'ACCEPTED' ? '활성화' :
                req.status === 'DELETED' ? '비활성화' : req.status }}
            </td>
          </tr>
        </template>
      </AdminTable>

      <Pagination
          :current-page="page"
          :total-pages="totalPages"
          @update:page="changePage"
      />
    </div>
  </div>
</template>

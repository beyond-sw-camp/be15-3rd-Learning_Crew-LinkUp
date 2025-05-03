<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from '@/components/common/AdminFilter.vue'
import AdminTable from '@/components/common/AdminTable.vue'
import Pagination from '@/components/common/Pagination.vue'
import { fetchUserList } from '@/api/admin.js'

const users = ref([])
const totalPages = ref(1)
const page = ref(1)

const filters = ref({
  authority: '',
  status: ''
})

const fetchUsers = async () => {
  const { data } = await fetchUserList({
    authority: filters.value.authority,
    status: filters.value.status,
    page: page.value
  })
  users.value = data.data
  totalPages.value = data.totalPages
}

const onSearch = () => {
  page.value = 1
  fetchUsers()
}

const changePage = (newPage) => {
  page.value = newPage
  fetchUsers()
}

onMounted(() => {
  fetchUsers()
})
</script>


<template>
  <div>
    <div class="main-header">
      <h1 class="page-title">회원 목록 조회</h1>
    </div>

    <AdminFilter @search="onSearch">
      <label class="filter-label">
        권한:
        <select v-model="filters.authority" class="select-box">
          <option value="">전체</option>
          <option value="MEMBER">회원</option>
          <option value="BUSINESS">사업자</option>
        </select>
      </label>
      <label class="filter-label">
        활성화 상태:
        <select v-model="filters.status" class="select-box">
          <option value="">전체</option>
          <option value="ACTIVE">활성화</option>
          <option value="INACTIVE">비활성화</option>
        </select>
      </label>
    </AdminFilter>

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
        <tr v-for="user in users" :key="user.userId">
          <td>{{ user.userId }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.nickname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.authority }}</td>
          <td>{{ user.point }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.status === 'ACTIVE' ? '활성화' : '비활성화' }}</td>
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


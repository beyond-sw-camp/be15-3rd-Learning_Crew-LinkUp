<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from '@/features/admin/components/AdminFilter.vue'
import AdminTable from '@/features/admin/components/AdminTable.vue'
import Pagination from '@/features/admin/components/Pagination.vue'
import ReportDetail from '@/features/admin/components/ReportDetail.vue'
import { format } from 'date-fns'

// API 주석처리: 실제 API 연동 시 아래 주석 해제
// import { fetchReportList, fetchReportTypes } from '@/api/admin.js'

// 더미 데이터 (실제 API 연동 전 임시)
// ⬇️ 이 부분이 더미 데이터입니다.
const reports = ref([
  {
    reportId: 11,
    reporterMemberId: 31,
    reporterName: '신가현',
    targetMemberId: 53,
    targetName: '차민규',
    reportType: '폭력적 또는 혐오스러운 콘텐츠',
    status: '처리완료',
    reason: '과도하게 폭력적인 언어가 사용되었습니다.',
    postId: 3,
    commentId: null,
    createdAt: '2025-04-09T10:50:00'
  }
])
const reportTypes = ref([{ reportTypeId: 6, reportType: '폭력적 또는 혐오스러운 콘텐츠' }])

const filters = ref({ status: '', reportTypeId: '' })
const page = ref(1)
const totalPages = ref(1)
const loading = ref(false)
const error = ref(null)
const modalOpen = ref(false)
const selectedReport = ref(null)

const onSearch = () => {
  page.value = 1
  fetchData()
}

const changePage = (p) => {
  page.value = p
  fetchData()
}

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    // 실제 API 연동 시 주석 해제
    // const { data } = await fetchReportList({ ...filters.value, page: page.value })
    // reports.value = data.reports
    // totalPages.value = data.pagination.totalPage
  } catch (e) {
    error.value = '신고 목록을 불러오는 데 실패했습니다.'
  } finally {
    loading.value = false
  }
}

const openModal = (report) => {
  selectedReport.value = report
  modalOpen.value = true
}

onMounted(() => {
  fetchData()
  // 실제 신고 유형 목록 API 호출 시 사용
  // const { data } = await fetchReportTypes()
  // reportTypes.value = data
})

const formatDate = (date) => format(new Date(date), 'yyyy-MM-dd HH:mm')
</script>
<template>
  <main class="admin-main">
    <AdminFilter @search="onSearch" title="신고 목록 조회">
      <label class="filter-label">
        상태:
        <select v-model="filters.status" class="select-box">
          <option value="">전체</option>
          <option value="처리중">처리중</option>
          <option value="완료">완료</option>
          <option value="기각">기각</option>
        </select>
      </label>
      <label class="filter-label">
        신고 유형:
        <select v-model="filters.reportTypeId" class="select-box">
          <option value="">전체</option>
          <option v-for="type in reportTypes" :key="type.reportTypeId" :value="type.reportTypeId">
            {{ type.reportType }}
          </option>
        </select>
      </label>
    </AdminFilter>

    <section v-if="loading">로딩 중...</section>
    <section v-else-if="error">{{ error }}</section>
    <section v-else-if="reports.length === 0">데이터가 없습니다.</section>

    <section v-else>
      <AdminTable>
        <template #thead>
          <tr>
            <th>신고 ID</th>
            <th>신고자 ID</th>
            <th>신고자 이름</th>
            <th>피신고자 ID</th>
            <th>피신고자 이름</th>
            <th>신고 유형</th>
            <th>상태</th>
            <th>신고 일시</th>
            <th>상세</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="report in reports" :key="report.reportId">
            <td>{{ report.reportId }}</td>
            <td>{{ report.reporterMemberId }}</td>
            <td>{{ report.reporterName }}</td>
            <td>{{ report.targetMemberId }}</td>
            <td>{{ report.targetName }}</td>
            <td>{{ report.reportType }}</td>
            <td>{{ report.status }}</td>
            <td>{{ formatDate(report.createdAt) }}</td>
            <td><a href="#" @click.prevent="openModal(report)">보기</a></td>
          </tr>
        </template>
      </AdminTable>
      <Pagination :current-page="page" :total-pages="totalPages" @update:page="changePage" />
    </section>

    <ReportDetail :model-value="modalOpen" :report="selectedReport" @update:modelValue="modalOpen = false" />
  </main>
</template>


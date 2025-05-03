<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from '@/features/admin/components/AdminFilter.vue'
import AdminTable from '@/features/admin/components/AdminTable.vue'
import Pagination from '@/features/admin/components/Pagination.vue'
import DetailViewer from '@/features/admin/components/DetailViewer.vue'
import { format } from 'date-fns'
import AdminButton from "@/features/admin/components/AdminButton.vue";

// API 주석처리: 실제 API 연동 시 아래 주석 해제
// import { fetchReportList, fetchReportTypes } from '@/api/admin.js'

// 더미 데이터 (실제 API 연동 전 임시)
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

const reportTypes = ref([
  { reportTypeId: 1, reportType: '유해하거나 위험한 행위' },
  { reportTypeId: 2, reportType: '아동 학대' },
  { reportTypeId: 3, reportType: '테러 조장' },
  { reportTypeId: 4, reportType: '괴롭힘 또는 폭력' },
  { reportTypeId: 5, reportType: '성적인 콘텐츠' },
  { reportTypeId: 6, reportType: '폭력적 또는 혐오스러운 콘텐츠' },
  { reportTypeId: 7, reportType: '증오 또는 악의적인 콘텐츠' },
  { reportTypeId: 8, reportType: '법적 문제' },
  { reportTypeId: 9, reportType: '잘못된 정보' },
  { reportTypeId: 10, reportType: '스팸 또는 혼동 유발 콘텐츠' }
])

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

const handleSanction = (action) => {
  console.log('처리 유형:', action, selectedReport.value)
  modalOpen.value = false // 처리 후 모달 닫기
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
  <main>
    <AdminFilter @search="onSearch" title="신고 목록 조회">
      <label class="filter-label">
        상태:
        <select v-model="filters.status" class="select-box">
          <option value="">전체</option>
          <option value="처리중">처리중</option>
          <option value="처리완료">완료</option>
          <option value="기각">기각</option>
        </select>
      </label>
      <label class="filter-label">
        신고 유형:
        <select v-model.number="filters.reportTypeId" class="select-box">
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

    <DetailViewer
        :model-value="modalOpen"
        title="신고 상세 정보"
        description="신고 대상과 사유를 확인하고 후속 조치를 진행할 수 있습니다."
        @update:modelValue="modalOpen = false"
    >
      <template #default>
        <!-- 신고자 / 피신고자 정보 -->
        <section class="modal-section" aria-labelledby="reporter-section-title">
          <header>
            <h3 class="section-title" id="reporter-section-title">신고자 / 피신고자</h3>
          </header>
          <dl class="info-grid">
            <div class="info-item">
              <dt class="label">신고자</dt>
              <dd class="value">{{ selectedReport?.reporterMemberId }} / {{ selectedReport?.reporterName }}</dd>
            </div>
            <div class="info-item">
              <dt class="label">피신고자</dt>
              <dd class="value">{{ selectedReport?.targetMemberId }} / {{ selectedReport?.targetName }}</dd>
            </div>
          </dl>
        </section>

        <!-- 신고 정보 -->
        <section class="modal-section" aria-labelledby="info-section-title">
          <header>
            <h3 class="section-title" id="info-section-title">신고 정보</h3>
          </header>
          <dl class="info-grid">
            <div class="info-item">
              <dt class="label">신고 유형</dt>
              <dd class="value">{{ selectedReport?.reportType }}</dd>
            </div>
            <div class="info-item">
              <dt class="label">상태</dt>
              <dd class="value">{{ selectedReport?.status }}</dd>
            </div>
            <div class="info-item">
              <dt class="label">신고 일시</dt>
              <dd class="value">{{ formatDate(selectedReport?.createdAt) }}</dd>
            </div>
            <div class="info-item" v-if="selectedReport?.postId">
              <dt class="label">관련 게시글 ID</dt>
              <dd class="value">{{ selectedReport?.postId }}</dd>
            </div>
            <div class="info-item" v-if="selectedReport?.commentId">
              <dt class="label">관련 댓글 ID</dt>
              <dd class="value">{{ selectedReport?.commentId }}</dd>
            </div>
          </dl>
        </section>

        <!-- 신고 사유 -->
        <section class="modal-section" aria-labelledby="reason-section-title">
          <header>
            <h3 class="section-title" id="reason-section-title">신고 사유</h3>
          </header>
          <article class="reason-box">
            {{ selectedReport?.reason }}
          </article>
        </section>
      </template>

      <template #footer>
        <nav class="modal-footer" aria-label="제재 처리 버튼 영역">
          <AdminButton type="reject" @click="handleSanction('REJECTED')">제재 처리</AdminButton>
          <AdminButton type="approve" @click="handleSanction('APPROVED')">제재 처리</AdminButton>
          <AdminButton type="secondary" @click="modalOpen = false">닫기</AdminButton>
        </nav>
      </template>
    </DetailViewer>

  </main>
</template>


<style scoped>
/* 뷰 페이지 전용 스타일이 필요한 경우 여기에 작성 */
</style>

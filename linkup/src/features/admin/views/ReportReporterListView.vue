<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import ReportDetailModal from '@/features/admin/components/ReportDetailModal.vue'
import { format } from 'date-fns'

const pageTitle = '신고자 목록 조회'

const filters = ref({ reporterId: '' })
const selectedReporter = ref(null)
const summaryInfo = ref([])
const reportRows = ref([])

const columns = [
  { key: 'reporterId', label: '신고자 ID' },
  { key: 'reporterName', label: '신고자 이름' },
  { key: 'reportCount', label: '신고 횟수' },
  { key: 'lastReportDate', label: '최근 신고일' },
  {
    key: 'detail',
    label: '신고 내역',
    format: (_, row) => ({
      type: 'button',
      label: '보기',
      onClick: () => openModal(row)
    })
  }
]

const allReporters = [
  { reporterId: 21, reporterName: '김지민', reportCount: 3, lastReportDate: '2025-04-01' },
  { reporterId: 22, reporterName: '박현서', reportCount: 1, lastReportDate: '2025-04-01' },
  { reporterId: 23, reporterName: '윤다현', reportCount: 2, lastReportDate: '2025-04-06' },
  { reporterId: 24, reporterName: '정하늘', reportCount: 1, lastReportDate: '2025-04-02' },
  { reporterId: 25, reporterName: '이준호', reportCount: 4, lastReportDate: '2025-04-06' }
]

async function fetchReporterList({ page, reporterId }) {
  const filtered = allReporters
    .filter(r => !reporterId || String(r.reporterId).includes(reporterId))
    .map(r => ({
      ...r,
      lastReportDate: format(new Date(r.lastReportDate), 'yyyy-MM-dd')
    }))
  return {
    data: filtered,
    totalPages: 1
  }
}

function openModal(row) {
  selectedReporter.value = row
  summaryInfo.value = [
    { label: '신고자 ID', value: row.reporterId },
    { label: '이름', value: row.reporterName },
    { label: '신고 횟수', value: row.reportCount },
    { label: '최근 신고일', value: row.lastReportDate }
  ]
  reportRows.value = [
    {
      reportId: 101,
      targetId: 45,
      targetName: '차민규',
      reportType: '욕설 및 비방',
      createdAt: '2025-04-01 10:15',
      status: '처리중'
    },
    {
      reportId: 115,
      targetId: 46,
      targetName: '한지우',
      reportType: '스팸 또는 혼동 유발 콘텐츠',
      createdAt: '2025-04-06 10:58',
      status: '처리중'
    }
  ]
}
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchReporterList"
    :columns="columns"
    :initFilters="filters"
    :pageTitle="pageTitle"
    :enableModal="true"
  >
    <!-- 필터 영역 -->
    <template #filters>
      <label class="filter-label">
        신고자 ID:
        <input v-model="filters.reporterId" class="select-box id-input" placeholder="id" />
      </label>
    </template>

    <!-- 모달 -->
    <template #modal>
      <ReportDetailModal
        v-if="selectedReporter"
        :model-value="true"
        :title="'신고자 신고 내역'"
        :description="'신고자의 상세 신고 기록을 확인할 수 있습니다.'"
        :summary="summaryInfo"
        :headers="['신고 ID', '피신고자 ID', '피신고자 이름', '신고 유형', '신고 일시', '상태']"
        :rows="reportRows"
        @update:modelValue="selectedReporter = null"
      />
    </template>
  </AdminListTemplate>
</template>

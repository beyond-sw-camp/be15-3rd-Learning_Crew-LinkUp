<script setup>
import { ref } from 'vue'
import { format } from 'date-fns'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import ReportDetailModal from '@/features/admin/components/ReportDetailModal.vue'

const pageTitle = '피신고자 목록 조회'

const filters = ref({
  isActive: '',
  searchType: '',
  searchKeyword: ''
})

const selectedRow = ref(null)
const reportRows = ref([])
const summaryInfo = ref([])

const fetchList = async ({ page, isActive, searchType, searchKeyword }) => {
  const dummy = [
    { reporteeId: 53, reporteeName: '차민규', reportScore: 340, reportCount: 5, lastReportDate: '2025-04-25T14:30:00', isActive: 'Y' },
    { reporteeId: 54, reporteeName: '한서윤', reportScore: 280, reportCount: 4, lastReportDate: '2025-04-22T11:00:00', isActive: 'Y' },
    { reporteeId: 55, reporteeName: '윤하진', reportScore: 190, reportCount: 3, lastReportDate: '2025-04-20T09:15:00', isActive: 'N' },
  ]

  const filtered = dummy.filter(row => {
    const keyword = String(filters.value.searchKeyword || '')
    const targetVal = filters.value.searchType ? String(row[filters.value.searchType] || '') : ''
    return (!filters.value.isActive || row.isActive === filters.value.isActive) &&
      (!filters.value.searchType || targetVal.includes(keyword))
  })

  return {
    data: filtered,
    totalPages: 1
  }
}

const columns = [
  { key: 'reporteeId', label: '피신고자 ID' },
  { key: 'reporteeName', label: '피신고자 이름' },
  { key: 'reportScore', label: '누적 신고 점수' },
  { key: 'reportCount', label: '신고 횟수' },
  {
    key: 'action',
    label: '신고 내역',
    format: (_, row) => ({
      type: 'button',
      label: '보기',
      onClick: () => openModal(row)
    })
  }
]

function openModal(row) {
  selectedRow.value = row
  summaryInfo.value = [
    { label: '피신고자 ID', value: row.reporteeId },
    { label: '피신고자 이름', value: row.reporteeName },
    { label: '신고 점수', value: row.reportScore },
    { label: '신고 횟수', value: row.reportCount },
    { label: '활성화 여부', value: row.isActive }
  ]

  reportRows.value = [
    {
      reportId: 201,
      reporterId: 31,
      reporterName: '김지민',
      reportType: '욕설 및 비방',
      createdAt: '2025-04-01 10:15',
      status: '처리중'
    },
    {
      reportId: 202,
      reporterId: 32,
      reporterName: '윤다현',
      reportType: '허위 정보 게시',
      createdAt: '2025-04-06 09:00',
      status: '처리완료'
    }
  ]
}

function handleSanction() {
  alert('제재 처리를 수행합니다.')
  selectedRow.value = null
}
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchList"
    :columns="columns"
    :initFilters="filters"
    :pageTitle="pageTitle"
    :enableModal="true"
  >
    <template #filters>
        <label class="filter-label">
          피신고자 ID:
          <input v-model="filters.reporteeId" class="select-box id-input" placeholder="id" />
        </label>
    </template>

    <template #modal>
      <ReportDetailModal
        v-if="selectedRow"
        v-model="selectedRow"
        :title="'피신고자 상세 정보'"
        :description="'해당 피신고자에 대한 신고 이력을 확인할 수 있습니다.'"
        :summary="summaryInfo"
        :headers="['신고 ID', '신고자 ID', '신고자 이름', '신고 유형', '신고 일시', '처리 상태']"
        :rows="reportRows"
        :showActionButton="true"
        action-label="제재 처리"
        @action="handleSanction"
      />
    </template>
  </AdminListTemplate>
</template>

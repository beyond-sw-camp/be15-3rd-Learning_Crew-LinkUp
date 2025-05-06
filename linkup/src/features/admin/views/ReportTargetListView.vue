<script setup>
import { reactive, ref } from 'vue'
import { format } from 'date-fns'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import ReportDetailModal from '@/features/admin/components/ReportDetailModal.vue'
import { fetchReportedTargetList, fetchTargetDetailById } from '@/api/admin.js'

const pageTitle = '신고 대상별 목록 조회'

const filters = reactive({
  isActive: '',
  searchType: '',
  searchKeyword: ''
})

const selectedRow = ref(null)
const reportRows = ref([])
const summaryInfo = ref([])

// 실제 API 호출
const fetchList = async ({ page, isActive, searchType, searchKeyword }) => {
  try {
    const params = {
      page,
      isActive: isActive || undefined,
      searchType: searchType || undefined,
      searchKeyword: searchKeyword || undefined
    }

    const res = await fetchReportedTargetList(params)
    return {
      data: res.data.targets || [],
      totalPages: res.data.pagination?.totalPage || 1
    }
  } catch (e) {
    console.error('🚨 신고 대상 목록 조회 실패:', e)
    return { data: [], totalPages: 1 }
  }
}

// 컬럼 정의
const columns = [
  { key: 'targetType', label: '대상 유형' },
  { key: 'targetId', label: '대상 ID' },
  { key: 'reportCount', label: '신고 횟수' },
  {
    key: 'lastReportDate',
    label: '최근 신고일',
    format: v => {
      const date = new Date(v)
      return isNaN(date.getTime()) ? '-' : format(date, 'yyyy-MM-dd HH:mm')
    }
  },
  { key: 'isActive', label: '활성화 여부' },
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

// 모달 열기 → 상세 API 호출
async function openModal(row) {
  try {
    const res = await fetchTargetDetailById(row.targetType, row.targetId)
    const reports = res.data.reports || []

    const formattedDate = format(new Date(row.lastReportDate), 'yyyy-MM-dd HH:mm')

    selectedRow.value = row
    summaryInfo.value = [
      { label: '대상 유형', value: row.targetType },
      { label: '대상 ID', value: row.targetId },
      { label: '신고 횟수', value: row.reportCount },
      { label: '최근 신고일', value: formattedDate },
      { label: '활성화 여부', value: row.isActive }
    ]

    reportRows.value = reports.map(r => ({
      reportId: r.reportId,
      reporterId: r.reporterId,
      reporterName: r.reporterName,
      reportType: r.reportType,
      createdAt: format(new Date(r.createdAt), 'yyyy-MM-dd HH:mm'),
      status: r.status
    }))
  } catch (e) {
    console.error('🚨 상세 정보 조회 실패:', e)
  }
}

// 제재 처리
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
        활성화 여부:
        <select v-model="filters.isActive" class="select-box">
          <option value="">전체</option>
          <option value="Y">활성화</option>
          <option value="N">비활성화</option>
        </select>
      </label>
      <label class="filter-label">
        검색 기준:
        <select v-model="filters.searchType" class="select-box">
          <option value="">선택</option>
          <option value="targetId">대상 ID</option>
        </select>
        <input
          v-model="filters.searchKeyword"
          class="select-box id-input"
          placeholder="ID"
        />
      </label>
    </template>

    <template #modal>
      <ReportDetailModal
        v-if="selectedRow"
        :model-value="selectedRow"
        @update:modelValue="selectedRow = $event"
        :title="'신고 대상 상세 정보'"
        :description="'해당 신고 대상에 대한 상세 신고 이력을 확인할 수 있습니다.'"
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

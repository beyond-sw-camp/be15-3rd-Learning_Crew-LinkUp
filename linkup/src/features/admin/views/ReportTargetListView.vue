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

const fetchList = async ({ page }) => {
  try {
    const res = await fetchReportedTargetList({
      page,
      isActive: filters.isActive || null,
      searchType: filters.searchType || undefined,
      searchKeyword: filters.searchKeyword || undefined
    })
    return {
      data: res.data.targetList || [],
      totalPages: res.data.pagination?.totalPage || 1
    }
  } catch (e) {
    console.error('🚨 신고 대상 목록 조회 실패:', e)
    return { data: [], totalPages: 1 }
  }
}

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

async function openModal(row) {
  try {
    const res = await fetchTargetDetailById(row.targetType, row.targetId)
    const reports = res.data.reportList || []

    selectedRow.value = row
    summaryInfo.value = [
      { label: '대상 유형', value: row.targetType },
      { label: '대상 ID', value: row.targetId },
      { label: '신고 횟수', value: row.reportCount },
      { label: '최근 신고일', value: format(new Date(row.lastReportDate), 'yyyy-MM-dd HH:mm') },
      { label: '활성화 여부', value: row.isActive }
    ]

    const statusMap = { 1: '처리중', 2: '완료', 3: '기각' }

    reportRows.value = reports.map(r => ({
      신고ID: r.reportId,
      신고자ID: r.reporterId,
      신고자이름: r.reporterName,
      신고유형: r.reportType,
      신고일시: format(new Date(r.createdAt), 'yyyy-MM-dd HH:mm'),
      처리상태: statusMap[r.statusId] || '-'
    }))
  } catch (e) {
    console.error('🚨 상세 정보 조회 실패:', e)
  }
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
    <!-- 필터 영역 -->
    <template #filters>
      <label class="filter-label" for="isActive">활성화 여부:</label>
      <select
        id="isActive"
        v-model="filters.isActive"
        class="select-box"
      >
        <option value="">전체</option>
        <option value="Y">활성화</option>
        <option value="N">비활성화</option>
      </select>

      <label class="filter-label" for="searchType">검색 기준:</label>
      <select id="searchType" v-model="filters.searchType" class="select-box">
        <option value="">선택</option>
        <option value="targetId">대상 ID</option>
      </select>

      <label class="filter-label sr-only" for="searchKeyword">검색어</label>
      <input
        id="searchKeyword"
        v-model="filters.searchKeyword"
        type="text"
        inputmode="text"
        class="select-box id-input"
        placeholder="ID"
      />
    </template>

    <!-- 모달 영역 -->
    <template #modal>
      <ReportDetailModal
        v-if="selectedRow"
        :model-value="true"
        @update:modelValue="selectedRow = null"
        title="신고 대상 상세 정보"
        description="해당 신고 대상에 대한 상세 신고 이력을 확인할 수 있습니다."
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

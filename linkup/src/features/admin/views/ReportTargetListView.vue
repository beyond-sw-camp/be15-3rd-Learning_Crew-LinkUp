<script setup>
import { reactive, ref } from 'vue'
import { format } from 'date-fns'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import ReportDetailModal from '@/features/admin/components/ReportDetailModal.vue'
import { fetchReportedTargetList, fetchTargetDetailById } from '@/api/admin.js'

const pageTitle = '신고 대상별 목록 조회'

const filters = reactive({
  isActive: '',
  targetType: '',
  targetId: ''
})

const selectedRow = ref(null)
const reportRows = ref([])
const summaryInfo = ref([])

const detailHeaders = [
  { key: 'reportId', label: '신고 ID' },
  { key: 'reporterId', label: '신고자 ID' },
  { key: 'reporterName', label: '신고자 이름' },
  { key: 'reportType', label: '신고 유형' },
  { key: 'createdAt', label: '신고 일시' },
  { key: 'status', label: '처리 상태' }
]

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
    format: (_, __, row) => ({
      type: 'button',
      label: '보기',
      onClick: (actualRow) => openModal(actualRow)
    })
  }
]

async function fetchList({ page }) {
  try {
    const res = await fetchReportedTargetList({
      page,
      isActive: filters.isActive || null,
      targetType: filters.targetType || null,
      targetId: filters.targetId !== '' ? Number(filters.targetId) : null
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

async function openModal(row) {
  const fixedRow = {
    targetType: row?.targetType ?? null,
    targetId: Number(row?.targetId),
    reportCount: row?.reportCount ?? 0,
    lastReportDate: row?.lastReportDate ?? '',
    isActive: row?.isActive ?? 'N'
  }

  if (!fixedRow.targetType || isNaN(fixedRow.targetId)) {
    console.warn('❌ targetType 또는 targetId가 잘못됨:', fixedRow)
    return
  }

  try {
    const res = await fetchTargetDetailById(fixedRow.targetType, fixedRow.targetId)
    const reports = res.data.reportList || []

    selectedRow.value = fixedRow
    summaryInfo.value = [
      { label: '대상 유형', value: fixedRow.targetType },
      { label: '대상 ID', value: fixedRow.targetId },
      { label: '신고 횟수', value: fixedRow.reportCount },
      {
        label: '최근 신고일',
        value: fixedRow.lastReportDate
          ? format(new Date(fixedRow.lastReportDate), 'yyyy-MM-dd HH:mm')
          : '-'
      },
      { label: '활성화 여부', value: fixedRow.isActive }
    ]

    const statusMap = { 1: '처리중', 2: '완료', 3: '기각' }

    reportRows.value = reports.map(r => ({
      reportId: r.reportId,
      reporterId: r.reporterId,
      reporterName: r.reporterName,
      reportType: r.reportType,
      createdAt: format(new Date(r.createdAt), 'yyyy-MM-dd HH:mm'),
      status: statusMap[r.statusId] || '-'
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
    <template #filters>
      <label class="filter-label" for="isActive">활성화 여부:</label>
      <select id="isActive" v-model="filters.isActive" class="select-box">
        <option value="">전체</option>
        <option value="Y">활성화</option>
        <option value="N">비활성화</option>
      </select>

      <label class="filter-label" for="targetType">대상 유형:</label>
      <select id="targetType" v-model="filters.targetType" class="select-box">
        <option value="">전체</option>
        <option value="USER">회원</option>
        <option value="POST">게시글</option>
        <option value="COMMENT">댓글</option>
      </select>

      <label class="filter-label sr-only" for="targetId">대상 ID</label>
      <input
        id="targetId"
        v-model="filters.targetId"
        type="text"
        inputmode="numeric"
        class="select-box id-input"
        placeholder="ID"
      />
    </template>

    <template #modal>
      <ReportDetailModal
        v-if="selectedRow"
        :model-value="true"
        @update:modelValue="selectedRow = null"
        title="신고 대상 상세 정보"
        description="해당 신고 대상에 대한 상세 신고 이력을 확인할 수 있습니다."
        :summary="summaryInfo"
        :headers="detailHeaders"
        :rows="reportRows"
        :showActionButton="true"
        action-label="제재 처리"
        @action="handleSanction"
      />
    </template>
  </AdminListTemplate>
</template>

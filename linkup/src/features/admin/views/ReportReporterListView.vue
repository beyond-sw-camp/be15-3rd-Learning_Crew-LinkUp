<script setup>
import { ref } from 'vue'
import { format } from 'date-fns'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import ReportDetailModal from '@/features/admin/components/ReportDetailModal.vue'
import {
  fetchReporterUserList,
  fetchReporterUserDetail
} from '@/api/admin.js'

const pageTitle = '신고자 목록 조회'
const filters = ref({ reporterId: '' })
const selectedReporter = ref(null)
const summaryInfo = ref([])
const reportRows = ref([])

const detailHeaders = [
  { key: 'reportId', label: '신고 ID' },
  { key: 'targetMemberId', label: '피신고자 ID' },
  { key: 'targetName', label: '피신고자 이름' },
  { key: 'reportType', label: '신고 유형' },
  { key: 'createdAt', label: '신고 일시' },
  { key: 'status', label: '상태' }
]

const columns = [
  { key: 'memberId', label: '신고자 ID' },
  { key: 'memberName', label: '신고자 이름' },
  { key: 'reportCount', label: '신고 횟수' },
  {
    key: 'lastReportDate',
    label: '최근 신고일',
    format: v => format(new Date(v), 'yyyy-MM-dd HH:mm')
  },
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

// 목록 조회 API
async function fetchReporterList({ page }) {
  try {
    const res = await fetchReporterUserList({
      reporterId: filters.value.reporterId || null,
      page
    })
    return {
      data: res.data.userList || [],
      totalPages: res.data.pagination?.totalPage || 1
    }
  } catch (e) {
    console.error('🚨 신고자 목록 로딩 실패:', e)
    return { data: [], totalPages: 1 }
  }
}

// 상세 조회
async function openModal(row) {
  try {
    const res = await fetchReporterUserDetail(row.memberId)
    const reports = res.data.reports || []

    selectedReporter.value = row
    summaryInfo.value = [
      { label: '신고자 ID', value: row.memberId },
      { label: '이름', value: row.memberName },
      { label: '신고 횟수', value: row.reportCount },
      { label: '최근 신고일', value: format(new Date(row.lastReportDate), 'yyyy-MM-dd HH:mm') }
    ]

    const statusMap = {
      1: '처리중',
      2: '완료',
      3: '기각'
    }

    reportRows.value = reports.map(r => ({
      reportId: r.reportId,
      targetMemberId: r.targetMemberId,
      targetName: r.targetName,
      reportType: r.reportType,
      createdAt: format(new Date(r.createdAt), 'yyyy-MM-dd HH:mm'),
      status: statusMap[r.statusId] || '-'
    }))
  } catch (e) {
    console.error('🚨 신고자 상세 조회 실패:', e)
  }
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
      <label class="filter-label" for="reporterId">신고자 ID:</label>
      <input
        id="reporterId"
        v-model="filters.reporterId"
        class="select-box id-input"
        placeholder="ID"
        type="text"
        inputmode="numeric"
      />
    </template>

    <!-- 상세 모달 -->
    <template #modal>
      <ReportDetailModal
        v-if="selectedReporter"
        :model-value="true"
        @update:modelValue="selectedReporter = null"
        title="신고자 신고 내역"
        description="신고자의 상세 신고 기록을 확인할 수 있습니다."
        :summary="summaryInfo"
        :headers="detailHeaders"
        :rows="reportRows"
      />
    </template>
  </AdminListTemplate>
</template>

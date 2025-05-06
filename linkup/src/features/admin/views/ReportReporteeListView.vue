<script setup>
import { ref } from 'vue'
import { format } from 'date-fns'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import ReportDetailModal from '@/features/admin/components/ReportDetailModal.vue'
import { fetchReporteeUserList, fetchReporteeUserDetail } from '@/api/admin.js'

const pageTitle = '피신고자 목록 조회'

const filters = ref({
  reporteeId: ''
})

const selectedRow = ref(null)
const reportRows = ref([])
const summaryInfo = ref([])

// 목록 API 호출
const fetchList = async ({ page, reporteeId }) => {
  try {
    const res = await fetchReporteeUserList({ reporteeId, page })
    return {
      data: res.data.userList || [],
      totalPages: res.data.pagination?.totalPage || 1
    }
  } catch (e) {
    console.error('🚨 피신고자 목록 조회 실패:', e)
    return { data: [], totalPages: 1 }
  }
}

// 상세 API 호출
async function openModal(row) {
  try {
    const res = await fetchReporteeUserDetail(row.memberId)
    const reports = res.data.reports || []

    selectedRow.value = row
    summaryInfo.value = [
      { label: '피신고자 ID', value: row.memberId },
      { label: '피신고자 이름', value: row.memberName },
      { label: '신고 점수', value: row.reportScore }
    ]

    reportRows.value = reports.map(r => ({
      신고ID: r.reportId,
      신고자ID: r.reporterMemberId,
      신고자이름: r.reporterName,
      신고유형: r.reportType,
      신고일시: format(new Date(r.createdAt), 'yyyy-MM-dd HH:mm'),
      처리상태: r.status
    }))
  } catch (e) {
    console.error('🚨 상세 조회 실패:', e)
  }
}

function handleSanction() {
  alert('제재 처리를 수행합니다.')
  selectedRow.value = null
}

const columns = [
  { key: 'memberId', label: '피신고자 ID' },
  { key: 'memberName', label: '피신고자 이름' },
  { key: 'reportScore', label: '누적 신고 점수' },
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
      <label class="filter-label" for="reporteeId">피신고자 ID:</label>
      <input
        id="reporteeId"
        v-model="filters.reporteeId"
        class="select-box id-input"
        placeholder="ID"
        type="text"
        inputmode="numeric"
      />
    </template>

    <!-- 상세 모달 -->
    <template #modal>
      <ReportDetailModal
        v-if="selectedRow"
        :model-value="true"
        @update:modelValue="selectedRow = null"
        title="피신고자 상세 정보"
        description="해당 피신고자에 대한 신고 이력을 확인할 수 있습니다."
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

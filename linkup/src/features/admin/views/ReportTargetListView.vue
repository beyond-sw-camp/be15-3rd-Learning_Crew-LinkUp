<!-- ✅ ReportTargetListView.vue -->
<script setup>
import { reactive, ref } from 'vue' // reactive로 수정
import { format } from 'date-fns'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import ReportDetailModal from '@/features/admin/components/ReportDetailModal.vue'

const pageTitle = '신고 대상별 목록 조회'

// ✅ 필터 값은 reactive로 선언 (v-model에 안정적으로 대응)
const filters = reactive({
  isActive: '',
  searchType: '',
  searchKeyword: ''
})

// 선택된 행 및 모달 정보
const selectedRow = ref(null)
const reportRows = ref([])
const summaryInfo = ref([])

// ✅ 안전한 fetch 함수
const fetchList = async ({ page, isActive, searchType, searchKeyword }) => {
  const dummy = [
    {
      targetType: 'USER',
      targetId: 101,
      reportCount: 3,
      lastReportDate: '2025-04-25T14:30:00',
      isActive: 'Y'
    },
    {
      targetType: 'POST',
      targetId: 102,
      reportCount: 2,
      lastReportDate: '2025-04-24T16:10:00',
      isActive: 'N'
    }
  ]

  const filtered = dummy.filter(row => {
    const targetValue = searchType ? String(row[searchType] ?? '') : ''
    return (!isActive || row.isActive === isActive) &&
      (!searchType || !searchKeyword || targetValue.includes(searchKeyword))
  })

  return { data: filtered, totalPages: 1 }
}

// 테이블 컬럼 정의
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

// 모달 열기
function openModal(row) {
  const date = new Date(row.lastReportDate)
  const formattedDate = isNaN(date.getTime()) ? '-' : format(date, 'yyyy-MM-dd HH:mm')

  selectedRow.value = row
  summaryInfo.value = [
    { label: '대상 유형', value: row.targetType },
    { label: '대상 ID', value: row.targetId },
    { label: '신고 횟수', value: row.reportCount },
    { label: '최근 신고일', value: formattedDate },
    { label: '활성화 여부', value: row.isActive }
  ]

  reportRows.value = [
    {
      reportId: 201,
      reporterId: 21,
      reporterName: '김지민',
      reportType: '욕설 및 비방',
      createdAt: '2025-04-01 10:15',
      status: '처리중'
    },
    {
      reportId: 202,
      reporterId: 22,
      reporterName: '윤다현',
      reportType: '허위 정보 게시',
      createdAt: '2025-04-06 09:00',
      status: '처리완료'
    }
  ]
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
    <!-- 필터 -->
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

    <!-- 신고 상세 모달 -->
    <template #modal>
      <!-- ✅ 명시적으로 model-value 사용 -->
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

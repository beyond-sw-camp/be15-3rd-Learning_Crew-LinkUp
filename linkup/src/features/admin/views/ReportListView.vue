<script setup>
import { ref, onMounted } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import DetailViewer from '@/features/admin/components/DetailViewer.vue'
import AdminButton from '@/features/admin/components/AdminButton.vue'
import { format } from 'date-fns'
import {
  fetchReportList,
  fetchReportDetail,
  fetchReportTypes,
  acceptReport,
  rejectReport
} from '@/api/admin.js'
// import { useToast } from 'vue-toastification'

// const toast = useToast()
const props = defineProps({ pageTitle: String })

// ---------------- 필터 및 상태 ----------------
const initFilters = ref({
  status: '',
  reportTypeId: ''
})
const reloadKey = ref(0)
const reportTypes = ref([])

const statusToId = {
  '처리중': 1,
  '완료': 2,
  '기각': 3
}
const idToStatus = {
  1: '처리중',
  2: '완료',
  3: '기각'
}

// ---------------- 신고 유형 동적 불러오기 ----------------
onMounted(async () => {
  try {
    const res = await fetchReportTypes()
    reportTypes.value = res.data.map(type => ({
      reportTypeId: type.id,
      reportType: type.name
    }))
  } catch (e) {
    // toast.error('신고 유형 목록을 불러오지 못했습니다.')
    reportTypes.value = []
  }
})

// ---------------- 목록 조회 함수 ----------------
async function loadReportList({ status, reportTypeId, page }) {
  try {
    const statusId = status && statusToId[status] ? statusToId[status] : null
    const res = await fetchReportList({
      statusId,
      reportTypeId: reportTypeId || null,
      page: page || 1
    })

    // statusId → status 문자열로 변환
    const list = (res.data.reports || []).map(report => ({
      ...report,
      status: idToStatus[report.statusId] ?? '-' // 추가
    }))

    return {
      data: list,
      totalPages: res.data.pagination?.totalPage || 1
    }
  } catch (error) {
    console.error('🚨 신고 목록 로딩 실패:', error)
    // toast.error('신고 목록을 불러오지 못했습니다.')
    return { data: [], totalPages: 1 }
  }
}

// ---------------- 상세 보기 상태 ----------------
const selected = ref(null)

async function openDetail(row) {
  try {
    const res = await fetchReportDetail(row.reportId)
    selected.value = {
      ...res.data,
      status: idToStatus[res.data.statusId] ?? '-' // 상세에도 변환 적용
    }
  } catch (e) {
    // toast.error('상세 정보를 불러오지 못했습니다.')
  }
}

// ---------------- 제재/허위 신고 처리 ----------------
async function handleSanction(action) {
  if (!selected.value) return

  try {
    const reportId = selected.value.reportId
    if (action === 'APPROVED') {
      await rejectReport(reportId)
      // toast.success('허위 신고로 처리되었습니다.')
    } else if (action === 'REJECTED') {
      await acceptReport(reportId)
      // toast.success('정상 신고로 제재가 등록되었습니다.')
    }

    selected.value = null
    reloadKey.value++
  } catch (e) {
    // toast.error('신고 처리 중 오류가 발생했습니다.')
  }
}

// ---------------- 컬럼 정의 ----------------
const columns = [
  { key: 'reportId', label: '신고 ID' },
  { key: 'reporterMemberId', label: '신고자 ID' },
  { key: 'reporterName', label: '신고자 이름' },
  { key: 'targetMemberId', label: '피신고자 ID' },
  { key: 'targetName', label: '피신고자 이름' },
  { key: 'reportType', label: '신고 유형' },
  { key: 'status', label: '상태' },
  {
    key: 'createdAt',
    label: '신고 일시',
    format: v => format(new Date(v), 'yyyy-MM-dd HH:mm')
  },
  {
    key: 'detail',
    label: '상세',
    format: (_, row) => ({
      type: 'button',
      label: '보기',
      onClick: () => openDetail(row)
    })
  }
]
</script>

<template>
  <AdminListTemplate
    :fetchFn="loadReportList"
    :columns="columns"
    :initFilters="initFilters"
    :pageTitle="props.pageTitle"
    :enableModal="true"
    :key="reloadKey"
  >
    <!-- 필터 영역 -->
    <template #filters>
      <label class="filter-label">
        상태:
        <select v-model="initFilters.status" class="select-box">
          <option value="">전체</option>
          <option value="처리중">처리중</option>
          <option value="완료">완료</option>
          <option value="기각">기각</option>
        </select>
      </label>
      <label class="filter-label">
        신고 유형:
        <select v-model.number="initFilters.reportTypeId" class="select-box">
          <option value="">전체</option>
          <option
            v-for="type in reportTypes"
            :key="type.reportTypeId"
            :value="type.reportTypeId"
          >
            {{ type.reportType }}
          </option>
        </select>
      </label>
    </template>

    <!-- 상세 모달 -->
    <template #modal>
      <DetailViewer
        v-if="selected"
        :model-value="true"
        @update:modelValue="() => (selected = null)"
        title="신고 상세 정보"
        description="신고 대상과 사유를 확인하고 후속 조치를 진행할 수 있습니다."
      >
        <template #default>
          <section class="modal-section">
            <h3 class="section-title">신고자 / 피신고자</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">신고자</span>
                <span class="value">{{ selected?.reporterMemberId }} / {{ selected?.reporterName }}</span>
              </div>
              <div class="info-item">
                <span class="label">피신고자</span>
                <span class="value">{{ selected?.targetMemberId }} / {{ selected?.targetName }}</span>
              </div>
            </div>
          </section>

          <section class="modal-section">
            <h3 class="section-title">신고 정보</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">신고 유형</span>
                <span class="value">{{ selected?.reportType }}</span>
              </div>
              <div class="info-item">
                <span class="label">상태</span>
                <span class="value">{{ selected?.status }}</span>
              </div>
              <div class="info-item">
                <span class="label">신고 일시</span>
                <span class="value">{{ format(new Date(selected?.createdAt), 'yyyy-MM-dd HH:mm') }}</span>
              </div>
              <div class="info-item" v-if="selected?.postId">
                <span class="label">게시글 ID</span>
                <span class="value">{{ selected?.postId }}</span>
              </div>
              <div class="info-item" v-if="selected?.commentId">
                <span class="label">댓글 ID</span>
                <span class="value">{{ selected?.commentId }}</span>
              </div>
            </div>
          </section>

          <section class="modal-section">
            <h3 class="section-title">신고 사유</h3>
            <div class="reason-box">{{ selected?.reason }}</div>
          </section>
        </template>

        <template #footer>
          <AdminButton type="reject" @click="() => handleSanction('REJECTED')">
            제재 처리
          </AdminButton>
          <AdminButton type="approve" @click="() => handleSanction('APPROVED')">
            허위 신고 처리
          </AdminButton>
          <AdminButton type="secondary" @click="() => (selected = null)">
            닫기
          </AdminButton>
        </template>
      </DetailViewer>
    </template>
  </AdminListTemplate>
</template>

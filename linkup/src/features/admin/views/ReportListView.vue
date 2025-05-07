<script setup>
import { ref, onMounted } from 'vue'
import { format } from 'date-fns'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import DetailViewer from '@/features/admin/components/DetailViewer.vue'
import AdminButton from '@/features/admin/components/AdminButton.vue'

import {
  fetchReportList,
  fetchReportDetail,
  fetchReportTypes,
  acceptReport,
  rejectReport
} from '@/api/admin.js'

const props = defineProps({ pageTitle: String })

const initFilters = ref({ status: '', reportTypeId: '' })
const reloadKey = ref(0)
const reportTypes = ref([])

const STATUS_OPTIONS = [
  { id: 1, label: '처리중' },
  { id: 2, label: '완료' },
  { id: 3, label: '기각' }
]
const statusToId = Object.fromEntries(STATUS_OPTIONS.map(s => [s.label, s.id]))
const idToStatus = Object.fromEntries(STATUS_OPTIONS.map(s => [s.id, s.label]))

onMounted(async () => {
  try {
    const res = await fetchReportTypes()
    reportTypes.value = res.data.map(type => ({
      reportTypeId: type.id,
      reportType: type.name
    }))
  } catch (e) {
    reportTypes.value = []
  }
})

async function loadReportList({ status, reportTypeId, page }) {
  try {
    const statusId = statusToId[status] || null
    const res = await fetchReportList({ statusId, reportTypeId, page })

    const list = (res.data.reports || []).map(r => ({
      ...r,
      status: idToStatus[r.statusId] ?? '-'
    }))

    return {
      data: list,
      totalPages: res.data.pagination?.totalPage || 1
    }
  } catch (e) {
    return { data: [], totalPages: 1 }
  }
}

const selected = ref(null)

async function openDetail(row) {
  try {
    const res = await fetchReportDetail(row.reportId)
    selected.value = {
      ...res.data,
      status: idToStatus[res.data.statusId] ?? '-'
    }
  } catch (e) {}
}

async function handleSanction(action) {
  if (!selected.value) return
  try {
    const reportId = selected.value.reportId
    if (action === 'APPROVED') {
      await rejectReport(reportId)
    } else if (action === 'REJECTED') {
      await acceptReport(reportId)
    }
    selected.value = null
    reloadKey.value++
  } catch (e) {}
}

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
      onClick: () => openDetail(row),
      ariaLabel: '신고 상세 보기'
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
    <!-- 필터 -->
    <template #filters>
      <label class="filter-label">
        상태:
        <select v-model="initFilters.status" class="select-box" aria-label="상태 필터">
          <option value="">전체</option>
          <option v-for="s in STATUS_OPTIONS" :key="s.id" :value="s.label">{{ s.label }}</option>
        </select>
      </label>

      <label class="filter-label">
        신고 유형:
        <select v-model.number="initFilters.reportTypeId" class="select-box" aria-label="신고 유형 필터">
          <option value="">전체</option>
          <option v-for="type in reportTypes" :key="type.reportTypeId" :value="type.reportTypeId">
            {{ type.reportType }}
          </option>
        </select>
      </label>
    </template>

    <!-- 모달 -->
    <template #modal>
      <DetailViewer
        v-if="selected"
        :model-value="true"
        @update:modelValue="() => (selected = null)"
        title="신고 상세 정보"
        description="신고 대상과 사유를 확인하고 후속 조치를 진행할 수 있습니다."
      >
        <template #default>
          <section class="modal-section" aria-labelledby="section1">
            <h3 id="section1" class="section-title">신고자 / 피신고자</h3>
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

          <section class="modal-section" aria-labelledby="section2">
            <h3 id="section2" class="section-title">신고 정보</h3>
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

          <section class="modal-section" aria-labelledby="section3">
            <h3 id="section3" class="section-title">신고 사유</h3>
            <div class="reason-box">{{ selected?.reason }}</div>
          </section>
        </template>

        <template #footer>
          <AdminButton type="reject" @click="() => handleSanction('REJECTED')">제재 처리</AdminButton>
          <AdminButton type="approve" @click="() => handleSanction('APPROVED')">허위 신고 처리</AdminButton>
          <AdminButton type="secondary" @click="() => (selected = null)">닫기</AdminButton>
        </template>
      </DetailViewer>
    </template>
  </AdminListTemplate>
</template>

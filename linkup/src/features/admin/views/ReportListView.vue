<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import DetailViewer from '@/features/admin/components/DetailViewer.vue'
import AdminButton from '@/features/admin/components/AdminButton.vue'
import { format } from 'date-fns'

const props = defineProps({ pageTitle: String })

const initFilters = {
  status: '',
  reportTypeId: ''
}

const reportTypes = [
  { reportTypeId: 1, reportType: '유해하거나 위험한 행위' },
  { reportTypeId: 6, reportType: '폭력적 또는 혐오스러운 콘텐츠' }
]

function fetchReportList({ status, reportTypeId }) {
  const dummy = [
    {
      reportId: 11,
      reporterMemberId: 31,
      reporterName: '신가현',
      targetMemberId: 53,
      targetName: '차민규',
      reportTypeId: 6,
      reportType: '폭력적 또는 혐오스러운 콘텐츠',
      status: '처리완료',
      reason: '과도하게 폭력적인 언어가 사용되었습니다.',
      postId: 3,
      commentId: null,
      createdAt: '2025-04-09T10:50:00'
    }
  ]

  const filtered = dummy.filter(r =>
    (!status || r.status === status) &&
    (!reportTypeId || r.reportTypeId === reportTypeId)
  )

  return Promise.resolve({
    data: filtered,
    totalPages: 1
  })
}

const selected = ref(null)

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
      onClick: () => (selected.value = row)
    })
  }
]

function handleSanction(action) {
  alert(`제재 처리됨: ${action}`)
  selected.value = null
}
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchReportList"
    :columns="columns"
    :initFilters="initFilters"
    :pageTitle="props.pageTitle"
    :enableModal="true"
  >
    <template #filters>
      <label class="filter-label">
        상태:
        <select v-model="initFilters.status" class="select-box">
          <option value="">전체</option>
          <option value="처리중">처리중</option>
          <option value="처리완료">완료</option>
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
                <span class="value">
                  {{ selected?.reporterMemberId }} / {{ selected?.reporterName }}
                </span>
              </div>
              <div class="info-item">
                <span class="label">피신고자</span>
                <span class="value">
                  {{ selected?.targetMemberId }} / {{ selected?.targetName }}
                </span>
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
                <span class="value">
                  {{ format(new Date(selected?.createdAt), 'yyyy-MM-dd HH:mm') }}
                </span>
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

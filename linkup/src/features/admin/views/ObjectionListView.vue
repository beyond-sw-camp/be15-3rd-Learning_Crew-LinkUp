<script setup>
import { ref } from 'vue'
import { format } from 'date-fns'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import DetailViewer from '@/features/admin/components/DetailViewer.vue'
import AdminButton from '@/features/admin/components/AdminButton.vue'

const pageTitle = '이의 제기 내역 조회'

const STATUS_MAP = {
  1: '대기',
  2: '승인',
  3: '거절'
}

const filters = ref({
  userId: '',
  statusId: ''
})

const selected = ref(null)

const fetchList = async ({ userId, statusId }) => {
  const dummy = [
    {
      objectionId: 2,
      penaltyId: 2,
      memberId: 48,
      userName: '오지현',
      statusId: 1,
      reason: '상대방도 먼저 도발해서 댓글을 단 상황입니다.',
      createdAt: '2025-04-09T14:10:00',
      penaltyInfo: {
        penaltyType: 'COMMENT',
        postId: null,
        commentId: 1,
        reviewId: null,
        reason: '폭력적인 언행이 포함된 댓글로 제재됨',
        isActive: 'Y',
        createdAt: '2025-04-09T11:10:00'
      }
    }
  ]

  const filtered = dummy.filter(o =>
    (!userId || String(o.memberId).includes(userId)) &&
    (!statusId || String(o.statusId) === String(statusId))
  )

  return { data: filtered, totalPages: 1 }
}

const columns = [
  { key: 'objectionId', label: '이의 제기 ID' },
  { key: 'memberId', label: '사용자 ID' },
  { key: 'userName', label: '사용자 이름' },
  { key: 'penaltyId', label: '제재 ID' },
  { key: 'reason', label: '사유' },
  {
    key: 'createdAt',
    label: '제기 일시',
    format: v => format(new Date(v), 'yyyy-MM-dd HH:mm')
  },
  {
    key: 'statusId',
    label: '상태',
    format: v => STATUS_MAP[v] || '-'
  },
  {
    key: 'action',
    label: '상세',
    format: (_, row) => ({
      type: 'button',
      label: '보기',
      onClick: () => (selected.value = row)
    })
  }
]

function close() {
  selected.value = null
}

function handleAccept() {
  alert('이의 제기를 승인하였습니다.')
  close()
}

function handleReject() {
  alert('이의 제기를 거절하였습니다.')
  close()
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
      <label class="filter-label">상태:
        <select v-model="filters.statusId" class="select-box">
          <option value="">전체</option>
          <option value="1">대기</option>
          <option value="2">승인</option>
          <option value="3">거절</option>
        </select>
      </label>
      <label class="filter-label">사용자 ID:
        <input v-model="filters.userId" class="select-box id-input" placeholder="ID" />
      </label>
    </template>

    <template #modal>
      <DetailViewer
        v-if="selected"
        :model-value="true"
        @update:modelValue="close"
        title="이의 제기 상세 정보"
        description="이의 제기 사유와 제재 내역을 확인하고 후속 조치를 진행할 수 있습니다."
      >
        <template #default>
          <section class="modal-section">
            <h3 class="section-title">사용자 정보</h3>
            <div class="info-grid">
              <div class="info-item"><span class="label">사용자 ID</span><span class="value">{{ selected.memberId }}</span></div>
              <div class="info-item"><span class="label">이름</span><span class="value">{{ selected.userName }}</span></div>
            </div>
          </section>

          <section class="modal-section">
            <h3 class="section-title">제재 정보</h3>
            <div class="info-grid">
              <div class="info-item"><span class="label">제재 ID</span><span class="value">{{ selected.penaltyId }}</span></div>
              <div class="info-item"><span class="label">유형</span><span class="value">{{ selected.penaltyInfo.penaltyType }}</span></div>
              <div class="info-item"><span class="label">관련 ID</span><span class="value">
                {{ selected.penaltyInfo.postId ?? selected.penaltyInfo.commentId ?? selected.penaltyInfo.reviewId ?? '-' }}
              </span></div>
              <div class="info-item"><span class="label">사유</span><span class="value">{{ selected.penaltyInfo.reason }}</span></div>
              <div class="info-item"><span class="label">상태</span><span class="value">{{ selected.penaltyInfo.isActive === 'Y' ? '활성' : '비활성' }}</span></div>
              <div class="info-item"><span class="label">제재 일시</span><span class="value">{{ format(new Date(selected.penaltyInfo.createdAt), 'yyyy-MM-dd HH:mm') }}</span></div>
            </div>
          </section>

          <section class="modal-section">
            <h3 class="section-title">이의 제기 사유</h3>
            <div class="reason-box">{{ selected.reason }}</div>
          </section>
        </template>

        <template #footer>
          <AdminButton type="approve" @click="handleAccept">승인</AdminButton>
          <AdminButton type="reject" @click="handleReject">거절</AdminButton>
          <AdminButton type="secondary" @click="close">닫기</AdminButton>
        </template>
      </DetailViewer>
    </template>
  </AdminListTemplate>
</template>

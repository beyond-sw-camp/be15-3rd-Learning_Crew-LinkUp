<script setup>
import { ref } from 'vue'
import { format } from 'date-fns'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import DetailViewer from '@/features/admin/components/DetailViewer.vue'
import AdminButton from '@/features/admin/components/AdminButton.vue'

const pageTitle = '제재 내역 조회'

const filters = ref({
  userId: '',
  penaltyType: '',
  statusId: ''
})

const selected = ref(null)

const statusMap = {
  1: '대기',
  2: '승인',
  3: '거절'
}

const fetchList = async ({ page, userId, penaltyType, statusId }) => {
  const dummy = [
    {
      penaltyId: 7,
      userId: 13,
      userName: '배은우',
      penaltyType: 'REVIEW',
      reason: '부적절한 내용 포함된 리뷰',
      createdAt: '2025-04-10 11:54:00',
      reviewId: 22,
      statusId: 1
    },
    {
      penaltyId: 6,
      userId: 53,
      userName: '차민규',
      penaltyType: 'COMMENT',
      reason: '협박성 표현이 포함된 댓글로 제재됨',
      createdAt: '2025-04-09 11:54:00',
      commentId: 3,
      statusId: 3
    }
  ]

  const filtered = dummy.filter(p =>
    (!userId || String(p.userId).includes(userId)) &&
    (!penaltyType || p.penaltyType === penaltyType) &&
    (!statusId || String(p.statusId) === String(statusId))
  )

  return { data: filtered, totalPages: 1 }
}

const columns = [
  { key: 'penaltyId', label: '패널티 ID' },
  { key: 'userId', label: '사용자 ID' },
  { key: 'userName', label: '사용자 이름' },
  { key: 'penaltyType', label: '유형' },
  { key: 'reason', label: '사유' },
  {
    key: 'createdAt',
    label: '일시',
    format: v => format(new Date(v), 'yyyy-MM-dd HH:mm')
  },
  {
    key: 'statusId',
    label: '상태',
    format: v => statusMap[v] || '-'
  },
  {
    key: 'action',
    label: '상세',
    format: (_, row) => ({
      type: 'button',
      label: '보기',
      onClick: () => selected.value = row
    })
  }
]

function close() {
  selected.value = null
}

function handleWithdraw() {
  alert('제재 철회 처리되었습니다.')
  close()
}

function handleConfirmPenalty() {
  alert('제재 확정 처리되었습니다.')
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
      <label class="filter-label">사용자 ID:
        <input v-model="filters.userId" class="select-box id-input" placeholder="ID" />
      </label>
      <label class="filter-label">제재 유형:
        <select v-model="filters.penaltyType" class="select-box">
          <option value="">전체</option>
          <option value="POST">POST</option>
          <option value="COMMENT">COMMENT</option>
          <option value="REVIEW">REVIEW</option>
        </select>
      </label>
      <label class="filter-label">상태:
        <select v-model="filters.statusId" class="select-box">
          <option value="">전체</option>
          <option value="1">대기</option>
          <option value="2">승인</option>
          <option value="3">거절</option>
        </select>
      </label>
    </template>

    <template #modal>
      <DetailViewer
        v-if="selected"
        :model-value="true"
        @update:modelValue="close"
        title="제재 상세 정보"
        description="해당 사용자에 대한 제재 이력을 확인할 수 있습니다."
      >
        <template #default>
          <section class="modal-section">
            <h3 class="section-title">사용자 정보</h3>
            <div class="info-grid">
              <div class="info-item"><span class="label">사용자 ID</span><span class="value">{{ selected.userId }}</span></div>
              <div class="info-item"><span class="label">이름</span><span class="value">{{ selected.userName }}</span></div>
            </div>
          </section>

          <section class="modal-section">
            <h3 class="section-title">제재 정보</h3>
            <div class="info-grid">
              <div class="info-item"><span class="label">패널티 ID</span><span class="value">{{ selected.penaltyId }}</span></div>
              <div class="info-item"><span class="label">유형</span><span class="value">{{ selected.penaltyType }}</span></div>
              <div class="info-item"><span class="label">일시</span><span class="value">{{ format(new Date(selected.createdAt), 'yyyy-MM-dd HH:mm') }}</span></div>
              <div class="info-item"><span class="label">상태</span><span class="value">{{ statusMap[selected.statusId] || '-' }}</span></div>
            </div>
          </section>

          <section class="modal-section">
            <h3 class="section-title">관련 콘텐츠</h3>
            <div class="info-grid">
              <div v-if="selected.postId" class="info-item"><span class="label">게시글 ID</span><span class="value">{{ selected.postId }}</span></div>
              <div v-if="selected.commentId" class="info-item"><span class="label">댓글 ID</span><span class="value">{{ selected.commentId }}</span></div>
              <div v-if="selected.reviewId" class="info-item"><span class="label">후기 ID</span><span class="value">{{ selected.reviewId }}</span></div>
              <div v-if="!selected.postId && !selected.commentId && !selected.reviewId">관련 콘텐츠 없음</div>
            </div>
          </section>

          <section class="modal-section">
            <h3 class="section-title">사유</h3>
            <div class="reason-box">{{ selected.reason }}</div>
          </section>
        </template>

        <template #footer>
          <AdminButton type="reject" @click="handleWithdraw">제재 철회</AdminButton>
          <AdminButton
            v-if="selected.penaltyType === 'REVIEW' && selected.statusId === 1"
            type="approve"
            @click="handleConfirmPenalty"
          >제재 확정</AdminButton>
          <AdminButton type="secondary" @click="close">닫기</AdminButton>
        </template>
      </DetailViewer>
    </template>
  </AdminListTemplate>
</template>
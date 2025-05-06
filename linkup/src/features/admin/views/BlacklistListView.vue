<script setup>
import { ref } from 'vue'
import { format } from 'date-fns'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import DetailViewer from '@/features/admin/components/DetailViewer.vue'
import AdminButton from '@/features/admin/components/AdminButton.vue'

const pageTitle = '블랙리스트 조회'

const filters = ref({
  userId: ''
})

const selected = ref(null)

const fetchBlacklistList = async ({ userId }) => {
  const dummy = [
    {
      memberId: 53,
      userName: '차민규',
      reason: '협박성 콘텐츠 작성으로 인한 서비스 이용 제한',
      createdAt: '2025-04-09T19:32:00'
    },
    {
      memberId: 54,
      userName: '서하늘',
      reason: '다수의 허위 신고 기록 및 반복된 제재 이력',
      createdAt: '2025-04-21T14:15:00'
    }
  ]

  const filtered = dummy.filter(b =>
    !userId || String(b.memberId).includes(userId)
  )

  return { data: filtered, totalPages: 1 }
}

const columns = [
  { key: 'memberId', label: '사용자 ID' },
  { key: 'userName', label: '사용자 이름' },
  { key: 'reason', label: '사유' },
  {
    key: 'createdAt',
    label: '등록 일시',
    format: v => format(new Date(v), 'yyyy-MM-dd HH:mm')
  },
  {
    key: 'action',
    label: '상세',
    format: (_, row) => ({
      type: 'button',
      label: '보기',
      onClick: () => openModal(row)
    })
  }
]

function openModal(row) {
  selected.value = row
}

function closeModal() {
  selected.value = null
}

function handleUnblock() {
  alert('블랙리스트 해제 처리되었습니다.')
  closeModal()
}
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchBlacklistList"
    :columns="columns"
    :initFilters="filters"
    :pageTitle="pageTitle"
    :enableModal="true"
  >
    <template #filters>
      <label class="filter-label">사용자 ID:
        <input v-model="filters.userId" class="select-box id-input" placeholder="ID" />
      </label>
    </template>

    <template #modal>
      <DetailViewer
        v-if="selected"
        :model-value="true"
        @update:modelValue="closeModal"
        title="블랙리스트 상세 정보"
        description="블랙리스트 대상의 상세 정보를 확인하고 후속 조치를 진행할 수 있습니다."
      >
        <template #default>
          <section class="modal-section">
            <h3 class="section-title">사용자 정보</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">사용자 ID</span>
                <span class="value">{{ selected.memberId }}</span>
              </div>
              <div class="info-item">
                <span class="label">이름</span>
                <span class="value">{{ selected.userName }}</span>
              </div>
            </div>
          </section>

          <section class="modal-section">
            <h3 class="section-title">블랙리스트 정보</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">등록 일시</span>
                <span class="value">{{ format(new Date(selected.createdAt), 'yyyy-MM-dd HH:mm') }}</span>
              </div>
            </div>
          </section>

          <section class="modal-section">
            <h3 class="section-title">사유</h3>
            <div class="reason-box">{{ selected.reason }}</div>
          </section>
        </template>

        <template #footer>
          <AdminButton type="reject" @click="handleUnblock">블랙리스트 해제</AdminButton>
          <AdminButton type="secondary" @click="closeModal">닫기</AdminButton>
        </template>
      </DetailViewer>
    </template>
  </AdminListTemplate>
</template>

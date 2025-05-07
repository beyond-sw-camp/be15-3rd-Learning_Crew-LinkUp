<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import AdminButton from '@/features/admin/components/AdminButton.vue'
import AdminModal from '@/features/admin/components/AdminModal.vue'
import { fetchAllOwners } from '@/api/admin.js'
import { format } from 'date-fns';  // 실제 API 연결

const props = defineProps({ pageTitle: String })

// 필터 상태
const filters = ref({
  status: '',
  userId: ''
})

// 모달 상태
const modalVisible = ref(false)
const modalData = ref(null)
const decision = ref('')
const rejectReason = ref('')

// 실제 API 연동: 사업자 권한 요청 목록 조회
const fetchRequests = async ({ page = 1, status = '', userId = '' }) => {
  try {
    const params = {
      statusName: status || undefined,  // 필터링할 상태 이름
      userId: userId || undefined,      // 사업자 ID
      page,
      size: 10                          // 페이지 크기
    }

    const response = await fetchAllOwners(params)

    // API 응답 구조에 맞게 처리
    return {
      data: response.data || [],
      totalPages: response.totalPages || 1
    }
  } catch (error) {
    console.error('사업자 권한 요청 목록 조회 실패:', error)
    return { data: [], totalPages: 0 }
  }
}

// 테이블 컬럼 정의
const columns = [
  { key: 'ownerId', label: '사업자 ID' },
  { key: 'ownerName', label: '이름' },
  {
    key: 'statusType',
    label: '상태',
    format: v => {
      switch (v) {
        case 'PENDING': return '대기'
        case 'ACCEPTED': return '승인'
        case 'REJECTED': return '거절'
        default: return v
      }
    }
  },
  {
    key: '등록증',
    label: '사업자 등록증',
    format: (_, row) => ({
      type: 'button',
      label: '보기',
      onClick: () => openModal(row)
    })
  },
  { key: 'authorizedAt', label: '처리일자',    format: v => v ? format(new Date(v), 'yyyy-MM-dd HH:mm') : '-' },
  { key: 'rejectionReason', label: '거절 사유', format: v => v || '-' }
]

// 모달 열기/닫기
function openModal(row) {
  modalData.value = row
  modalVisible.value = true
  decision.value = ''
  rejectReason.value = ''
  console.log('[DEBUG] modalData', modalData.value)
}
function closeModal() {
  modalVisible.value = false
  modalData.value = null
}

// 처리 버튼
function handleDecision() {
  if (!decision.value) return alert('처리 상태를 선택해주세요.')
  if (decision.value === 'REJECTED' && !rejectReason.value.trim()) {
    return alert('거절 사유를 입력해주세요.')
  }
  alert(`사용자 ${modalData.value.ownerId} ${decision.value === 'ACCEPTED' ? '승인' : '거절'} 처리되었습니다.`)
  closeModal()
}
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchRequests"
    :columns="columns"
    :initFilters="initFilters"
    :pageTitle="props.pageTitle"
    :enableModal="false"
  >
    <!-- 필터 영역 -->
    <template #filters="{ filters }">
      <label class="filter-label">
        상태:
        <select v-model="filters.status" class="select-box">
          <option value="">전체</option>
          <option value="PENDING">대기</option>
          <option value="ACCEPTED">승인</option>
          <option value="REJECTED">거절</option>
        </select>
      </label>
      <label class="filter-label">
        사업자 ID:
        <input v-model="filters.userId" class="select-box id-input" placeholder="ID" />
      </label>
    </template>

    <!-- 모달 -->
    <template #modal>
      <AdminModal v-model="modalVisible">
        <template #title>
          <h2 class="modal-title">사업자 등록 요청 상세</h2>
        </template>

        <div class="modal-left">
          <img
            :src="modalData?.business_registration_document_url || '/default-image.png'"
            alt="사업자 등록증"
            class="modal-image"
          />
        </div>

        <div class="modal-right">
          <p><strong>사업자 ID:</strong> {{ modalData?.ownerId }}</p>
          <p><strong>이름:</strong> {{ modalData?.ownerName }}</p>
<!--          <p><strong>이메일:</strong> {{ modalData?.email || '-' }}</p>-->

          <template v-if="modalData?.status !== 'PENDING'">
            <p><strong>상태:</strong>
              {{ modalData?.status === 'PENDING' ? '대기' : modalData?.status === 'ACCEPTED' ? '승인' : '거절' }}
            </p>
            <p><strong>처리일자:</strong> {{ modalData?.authorizedAt || '-' }}</p>
            <p><strong>거절 사유:</strong> {{ modalData?.rejectionReason || '-' }}</p>
          </template>

          <!-- 상태가 대기인 경우 처리 상태 선택 -->
          <template v-if="modalData?.status === 'PENDING'">
            <label class="modal-label">처리 상태:</label>
            <select v-model="decision" class="modal-select">
              <option value="">선택</option>
              <option value="ACCEPTED">승인</option>
              <option value="REJECTED">거절</option>
            </select>

            <label class="modal-label" v-if="decision === 'REJECTED'">거절 사유:</label>
            <input
              v-if="decision === 'REJECTED'"
              v-model="rejectReason"
              class="modal-input"
              placeholder="거절 사유 입력"
            />
          </template>
        </div>

        <template #footer>
          <AdminButton
            v-if="modalData?.status === 'PENDING'"
            type="approve"
            @click="handleDecision"
          >처리</AdminButton>
          <AdminButton type="secondary" @click="closeModal">닫기</AdminButton>
        </template>
      </AdminModal>
    </template>
  </AdminListTemplate>
</template>
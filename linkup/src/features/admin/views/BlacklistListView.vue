<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { format } from 'date-fns'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import {
  fetchBlacklist,
  fetchBlacklistDetail,
  unblockBlacklist
} from '@/api/admin.js'

// DetailViewer lazy import
const DetailViewer = defineAsyncComponent(() =>
  import('@/features/admin/components/DetailViewer.vue')
)

const pageTitle = '블랙리스트 조회'

// 필터 상태
const filters = ref({ userId: '' })

// 선택된 사용자 상세 정보
const selected = ref(null)

// 등록 일시 포맷
const createdAtFormatted = computed(() =>
  selected.value?.createdAt ? format(new Date(selected.value.createdAt), 'yyyy-MM-dd HH:mm') : ''
)

// 목록 API 호출
const fetchList = async ({ page, userId }) => {
  try {
    const res = await fetchBlacklist({ memberId: userId, page })
    return {
      data: res.data.blacklists || [],
      totalPages: res.data.pagination?.totalPage || 1
    }
  } catch {
    return { data: [], totalPages: 1 }
  }
}

// 상세 보기 열기
async function openModal(row) {
  try {
    const res = await fetchBlacklistDetail(row.memberId)
    selected.value = res.data
  } catch {
    // 오류 무시
  }
}

// 블랙리스트 해제 처리
async function handleUnblock() {
  try {
    await unblockBlacklist(selected.value.memberId)
    selected.value = null
  } catch {
    // 오류 무시
  }
}

// 모달 닫기
function closeModal() {
  selected.value = null
}

// 테이블 컬럼 정의
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

            <section class="modal-section">
              <h3 class="section-title">블랙리스트 정보</h3>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">등록 일시</span>
                  <span class="value">{{ createdAtFormatted }}</span>
                </div>
              </div>
            </section>

            <section class="modal-section">
              <h3 class="section-title">사유</h3>
              <div class="reason-box">{{ selected.reason }}</div>
            </section>
          </section>
        </template>

        <template #footer>
          <button class="admin-button reject" @click="handleUnblock">블랙리스트 해제</button>
          <button class="admin-button secondary" @click="closeModal">닫기</button>
        </template>
      </DetailViewer>
    </template>
  </AdminListTemplate>
</template>

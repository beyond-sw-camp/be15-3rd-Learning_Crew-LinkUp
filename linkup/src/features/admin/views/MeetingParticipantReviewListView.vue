<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'

const props = defineProps({ pageTitle: String })

// 초기 필터 상태
const initFilters = ref({
  searchType: 'meetingId',
  keyword: ''
})

// 더미 fetch 함수
function fetchParticipantReviewList({ searchType, keyword, page = 1 }) {
  const dummy = Array.from({ length: 10 }, (_, i) => ({
    reviewId: `R00${i + 1}`,
    reviewerId: `user${i + 1}`,
    reviewerName: `작성자 ${i + 1}`,
    revieweeId: `target${i + 1}`,
    revieweeName: `대상자 ${i + 1}`,
    meetingId: `M00${i + 1}`,
    score: (i % 5) + 1,
    createdAt: '2025-05-05 12:00'
  }))

  const filtered = dummy.filter(item => {
    if (!keyword) return true
    return item[searchType]?.includes(keyword)
  })

  return Promise.resolve({ data: filtered, totalPages: 1 })
}

// 컬럼 정의
const columns = [
  { key: 'reviewId', label: '리뷰 ID' },
  { key: 'reviewerId', label: '작성자 ID' },
  { key: 'reviewerName', label: '작성자' },
  { key: 'revieweeId', label: '대상자 ID' },
  { key: 'revieweeName', label: '대상자' },
  { key: 'meetingId', label: '모임 ID' },
  { key: 'score', label: '평점' },
  { key: 'createdAt', label: '작성일시' }
]
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchParticipantReviewList"
    :columns="columns"
    :initFilters="initFilters"
    :pageTitle="props.pageTitle"
  >
    <template #filters>
      <label class="filter-label">
        검색 기준:
        <select v-model="initFilters.searchType" class="select-box">
          <option value="meetingId">모임 ID</option>
          <option value="reviewerId">작성자 ID</option>
          <option value="revieweeId">대상자 ID</option>
        </select>
        <input type="text" v-model="initFilters.keyword" class="select-box id-input" placeholder="ID" />
      </label>
    </template>
  </AdminListTemplate>
</template>

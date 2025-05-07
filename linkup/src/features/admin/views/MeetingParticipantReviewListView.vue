<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import { fetchParticipantReviewList } from '@/api/admin.js'

const props = defineProps({ pageTitle: String })

// 필터 상태
const initFilters = ref({
  searchType: 'meetingId',
  keyword: ''
})

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

// API 연동 함수
async function fetchList({ page, searchType, keyword }) {
  try {
    const res = await fetchParticipantReviewList({
      searchType,
      searchKeyword: keyword,
      page
    })

    return {
      data: res.data.reviews || [],
      totalPages: res.data.pagination?.totalPage || 1
    }
  } catch (e) {
    console.error('🚨 참가자 평가 내역 조회 실패:', e)
    return { data: [], totalPages: 1 }
  }
}
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchList"
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
        <input
          type="text"
          v-model="initFilters.keyword"
          class="select-box id-input"
          placeholder="ID"
        />
      </label>
    </template>
  </AdminListTemplate>
</template>

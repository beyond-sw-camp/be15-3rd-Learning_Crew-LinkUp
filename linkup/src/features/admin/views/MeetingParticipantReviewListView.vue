<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import { fetchParticipantReviews } from '@/api/admin.js'

const props = defineProps({ pageTitle: String })

// 필터 상태 (검색 기준: 모임 ID, 작성자 ID, 대상자 ID)
const filters = ref({
  searchType: 'meetingId',  // 기본값: 모임 ID로 검색
  keyword: ''
})

// 컬럼 정의 (참가자 평가 내역)
const columns = [
  { key: 'reviewId', label: '리뷰 ID' },
  { key: 'reviewerId', label: '작성자 ID' },
  { key: 'reviewerNickname', label: '작성자' },
  { key: 'revieweeId', label: '대상자 ID' },
  { key: 'revieweeNickname', label: '대상자' },
  { key: 'meetingId', label: '모임 ID' },
  { key: 'score', label: '평점' },
  { key: 'createdAt', label: '작성일시' }
]

// API 연동 함수
async function fetchList({ page, searchType, keyword }) {
  try {
    const res = await fetchParticipantReviews({
      page,
      searchType,
      revieweeId: searchType === 'revieweeId' ? keyword : null,
      reviewerId: searchType === 'reviewerId' ? keyword : null,
      meetingId: searchType === 'meetingId' ? keyword : null
    })
    console.log("응답 데이터:", res)  // 응답 데이터 확인

    return {
      data: res.data.data.participantReviews || [],
      totalPages: res.data.data.pagination?.totalPage || 1
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
    :initFilters="filters"
    :pageTitle="props.pageTitle"
  >
    <template #filters>
      <label class="filter-label">
        검색 기준:
        <select v-model="filters.searchType" class="select-box">
          <option value="meetingId">모임 ID</option>
          <option value="reviewerId">작성자 ID</option>
          <option value="revieweeId">대상자 ID</option>
        </select>
        <input
          type="text"
          v-model="filters.keyword"
          class="select-box id-input"
          placeholder="ID"
        />
      </label>
    </template>
  </AdminListTemplate>
</template>

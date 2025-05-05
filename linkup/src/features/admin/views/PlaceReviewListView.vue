<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import AdminModal from '@/features/admin/components/AdminModal.vue'

const props = defineProps({ pageTitle: String })

// 필터 초기값
const initFilters = ref({
  searchType: 'writerId',
  keyword: '',
  isActive: ''
})

// 모달 상태
const isImageModalOpen = ref(false)
const imageUrl = ref('')

// 더미 API 함수
function fetchPlaceReviewList({ page = 1, searchType = 'writerId', keyword = '', isActive = '' }) {
  const dummy = [
    {
      reviewId: 101,
      writerId: 31,
      writerName: '풋살마스터',
      placeId: 24,
      placeName: '배드존 신대방',
      reviewScore: 5,
      reviewContent: '풋살장 넓고 공도 깨끗했어요. 다시 방문하고 싶어요.',
      reviewImageUrl: null,
      isActive: 'Y'
    },
    {
      reviewId: 102,
      writerId: 32,
      writerName: '볼링왕자',
      placeId: 27,
      placeName: '푸릇 볼링장',
      reviewScore: 4,
      reviewContent: '조금 좁긴 하지만 가격대비 만족했어요.',
      reviewImageUrl: 'https://cdn.pixabay.com/photo/2016/05/27/14/33/football-1419954_640.jpg',
      isActive: 'Y'
    }
  ]

  const filtered = dummy.filter(item => {
    const matchSearch = !keyword || String(item[searchType])?.includes(keyword)
    const matchActive = !isActive || item.isActive === isActive
    return matchSearch && matchActive
  })

  return Promise.resolve({ data: filtered, totalPages: 1 })
}

// 컬럼 정의
const columns = [
  { key: 'reviewId', label: '후기 ID' },
  { key: 'writerId', label: '작성자 ID' },
  { key: 'writerName', label: '작성자' },
  { key: 'placeId', label: '장소 ID' },
  { key: 'placeName', label: '장소 이름' },
  { key: 'reviewScore', label: '평점' },
  { key: 'reviewContent', label: '후기 내용' },
  { key: 'isActive', label: '삭제 여부', format: v => v === 'Y' ? '공개' : '비공개' },
  {
    key: 'image',
    label: '이미지',
    format: (_, row) => {
      return row.reviewImageUrl
        ? {
          type: 'button',
          label: '보기',
          onClick: () => {
            imageUrl.value = row.reviewImageUrl
            isImageModalOpen.value = true
          }
        }
        : '-'
    }
  }
]
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchPlaceReviewList"
    :columns="columns"
    :initFilters="initFilters"
    :pageTitle="props.pageTitle"
  >
    <template #filters>
      <label class="filter-label">
        검색 기준:
        <select v-model="initFilters.searchType" class="select-box">
          <option value="writerId">작성자 ID</option>
          <option value="placeId">장소 ID</option>
        </select>
        <input type="text" v-model="initFilters.keyword" class="select-box id-input" placeholder="ID" />
      </label>
      <label class="filter-label">
        삭제 여부:
        <select v-model="initFilters.isActive" class="select-box">
          <option value="">전체</option>
          <option value="Y">공개</option>
          <option value="N">비공개</option>
        </select>
      </label>
    </template>

    <template #modal>
      <AdminModal v-model="isImageModalOpen">
        <template #title>
          <h2 class="modal-title">장소 후기 이미지</h2>
        </template>
        <img :src="imageUrl" alt="후기 이미지" style="max-width: 100%; border-radius: 8px;" />
      </AdminModal>
    </template>
  </AdminListTemplate>
</template>
<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'

const props = defineProps({ pageTitle: String })

// 필터 초기값
const initFilters = {
  sportId: '',
  ownerId: '',
  isActive: ''
}

// 더미 종목 목록
const sportTypes = ref([
  { sportId: 'TENNIS', sportName: '테니스' },
  { sportId: 'SOCCER', sportName: '축구' },
  { sportId: 'BASKETBALL', sportName: '농구' }
])

// 더미 장소 목록 fetch 함수
function fetchPlaceList({ page = 1, sportId = '', ownerId = '', isActive = '' }) {
  const dummy = Array.from({ length: 10 }, (_, i) => ({
    placeId: `P00${i + 1}`,
    placeName: `장소 ${i + 1}`,
    address: `서울시 어딘가 ${i + 1}`,
    ownerId: `owner${i + 1}`,
    ownerName: `사업자 ${i + 1}`,
    sportName: i % 2 === 0 ? '테니스' : '축구',
    rating: (Math.random() * 5).toFixed(1),
    isActive: i % 2 === 0 ? 'Y' : 'N'
  }))

  const filtered = dummy.filter(p => {
    return (!sportId || p.sportName.includes(sportTypes.value.find(s => s.sportId === sportId)?.sportName)) &&
      (!ownerId || p.ownerId.includes(ownerId)) &&
      (!isActive || p.isActive === isActive)
  })

  return Promise.resolve({ data: filtered, totalPages: 1 })
}

// 테이블 컬럼 정의
const columns = [
  { key: 'placeId', label: '장소 ID' },
  { key: 'placeName', label: '장소 이름' },
  { key: 'address', label: '주소' },
  { key: 'ownerId', label: '사업자 ID' },
  { key: 'ownerName', label: '사업자 이름' },
  { key: 'sportName', label: '운동 종목' },
  { key: 'rating', label: '평점' },
  { key: 'isActive', label: '활성화', format: v => v === 'Y' ? '공개' : '비공개' },
  {
    key: '보기',
    label: '상세 보기',
    format: () => ({
      type: 'button',
      label: '보기',
      onClick: () => alert('상세 보기 클릭됨')
    })
  }
]
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchPlaceList"
    :columns="columns"
    :initFilters="initFilters"
    :pageTitle="props.pageTitle"
  >
    <template #filters>
      <label class="filter-label">
        운동 종목:
        <select v-model="initFilters.sportId" class="select-box">
          <option value="">전체</option>
          <option v-for="sport in sportTypes" :key="sport.sportId" :value="sport.sportId">
            {{ sport.sportName }}
          </option>
        </select>
      </label>
      <label class="filter-label">
        사업자 ID:
        <input type="text" v-model="initFilters.ownerId" class="select-box id-input" placeholder="ID" />
      </label>
      <label class="filter-label">
        활성화 상태:
        <select v-model="initFilters.isActive" class="select-box">
          <option value="">전체</option>
          <option value="Y">활성화</option>
          <option value="N">비활성화</option>
        </select>
      </label>
    </template>
  </AdminListTemplate>
</template>

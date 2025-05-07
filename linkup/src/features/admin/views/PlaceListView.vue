<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import { fetchPlaceList } from '@/api/admin.js'  // 실제 API 연동

// props
const props = defineProps({ pageTitle: String })

// 필터 초기값 설정
const initFilters = {
  sportId: '',
  ownerId: '',
  isActive: ''
}

// 운동 종목 목록
const sportTypes = ref([
  { sportId: 'TENNIS', sportName: '테니스' },
  { sportId: 'SOCCER', sportName: '축구' },
  { sportId: 'BASKETBALL', sportName: '농구' }
])

// API 연동 함수 - 장소 목록 조회
async function fetchPlaceListData({ page = 1, sportId = '', ownerId = '', isActive = '' }) {
  try {
    // API 요청
    const res = await fetchPlaceList({
      page,
      sportId,
      ownerId,
      isActive
    })
    console.log("응답 데이터:", res)  // 응답 데이터 확인

    return {
      data: res.data?.data?.adminPlaces || [],
      totalPages: res.data?.data?.pagination?.totalPages || 1
    }
  } catch (error) {
    console.error('🚨 장소 목록 조회 실패:', error)
    return { data: [], totalPages: 1 }
  }
}

// 테이블 컬럼 정의
const columns = [
  { key: 'placeId', label: '장소 ID' },
  { key: 'placeName', label: '장소 이름' },
  { key: 'address', label: '주소' },
  { key: 'ownerId', label: '사업자 ID' },
  { key: 'ownerName', label: '사업자 이름' },
  { key: 'sportName', label: '운동 종목' },
  { key: 'averageScore', label: '평점' },
  { key: 'isActive', label: '활성화', format: (v) => (v === 'Y' ? '공개' : '비공개') },
  {
    key: 'view',
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
    :fetchFn="fetchPlaceListData"
    :columns="columns"
    :initFilters="initFilters"
    :pageTitle="props.pageTitle"
  >
  <template #filters>
    <!-- 운동 종목 필터 -->
    <label class="filter-label">
      운동 종목:
      <select v-model="initFilters.sportId" class="select-box">
        <option value="">전체</option>
        <option v-for="sport in sportTypes" :key="sport.sportId" :value="sport.sportId">
          {{ sport.sportName }}
        </option>
      </select>
    </label>

    <!-- 사업자 ID 필터 -->
    <label class="filter-label">
      사업자 ID:
      <input
        type="text"
        v-model="initFilters.ownerId"
        class="select-box id-input"
        placeholder="ID"
      />
    </label>

    <!-- 활성화 상태 필터 -->
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

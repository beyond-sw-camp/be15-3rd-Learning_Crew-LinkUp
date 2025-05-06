<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'

// props
const props = defineProps({ pageTitle: String })

// 필터 초기값
const initFilters = {
  gender: '',
  ageGroup: '',
  level: '',
  sportName: '',
  status: '',
  startDate: '',
  endDate: ''
}

// 상태 라벨 → ENUM 매핑
const mapStatusLabelToEnum = (label) => {
  switch (label) {
    case '모집중': return 'PENDING'
    case '최소 모집 완료': return 'ACCEPTED'
    case '모집 완료': return 'REJECTED'
    case '진행 완료': return 'DONE'
    default: return ''
  }
}

// 더미 운동 종목 목록
const sportTypes = ref([
  { sportId: 'TENNIS', sportName: '테니스' },
  { sportId: 'BOWLING', sportName: '볼링' },
  { sportId: 'SOCCER', sportName: '축구' }
])

// 더미 API - fetchMeetingList
function fetchMeetingList(params) {
  const dummy = Array.from({ length: 10 }, (_, i) => ({
    meetingId: `M00${i + 1}`,
    meetingTitle: `모임 ${i + 1}`,
    leaderName: `리더 ${i + 1}`,
    sportName: i % 2 === 0 ? '테니스' : '볼링',
    date: '2025-05-05',
    startTime: '14:00',
    endTime: '16:00',
    gender: i % 2 === 0 ? 'M' : 'F',
    ageGroup: `${20 + i * 10}`,
    level: ['LV1', 'LV2', 'LV3'][i % 3],
    placeName: `장소 ${i + 1}`,
    customPlaceAddress: '',
    minUser: 4,
    maxUser: 10,
    statusLabel: ['모집중', '최소 모집 완료', '모집 완료', '진행 완료'][i % 4]
  }))

  const statusEnum = mapStatusLabelToEnum(params.status)
  const filtered = dummy.filter(item => {
    return (!params.gender || item.gender === params.gender) &&
      (!params.ageGroup || item.ageGroup === params.ageGroup) &&
      (!params.level || item.level === params.level) &&
      (!params.sportName || item.sportName.includes(params.sportName)) &&
      (!params.status || mapStatusLabelToEnum(item.statusLabel) === statusEnum)
  })

  return Promise.resolve({
    data: filtered,
    totalPages: 1
  })
}

// 컬럼 정의
const columns = [
  { key: 'meetingId', label: 'ID' },
  { key: 'meetingTitle', label: '제목' },
  { key: 'leaderName', label: '리더' },
  { key: 'sportName', label: '운동' },
  { key: 'date', label: '날짜' },
  { key: 'time', label: '시간', format: (_, row) => `${row.startTime} ~ ${row.endTime}` },
  { key: 'gender', label: '성별' },
  { key: 'ageGroup', label: '나이대' },
  { key: 'level', label: '레벨' },
  { key: 'placeName', label: '장소' },
  { key: 'users', label: '참여 인원', format: (_, row) => `${row.minUser} ~ ${row.maxUser}` },
  { key: 'statusLabel', label: '상태' },
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
    :fetchFn="fetchMeetingList"
    :columns="columns"
    :initFilters="initFilters"
    :pageTitle="props.pageTitle"
  >
    <template #filters>
      <label class="filter-label">
        성별:
        <select v-model="initFilters.gender" class="select-box">
          <option value="">전체</option>
          <option value="M">남성</option>
          <option value="F">여성</option>
        </select>
      </label>
      <label class="filter-label">
        나이대:
        <select v-model="initFilters.ageGroup" class="select-box">
          <option value="">전체</option>
          <option value="10">10대</option>
          <option value="20">20대</option>
          <option value="30">30대</option>
          <option value="40">40대</option>
          <option value="50">50대</option>
          <option value="60">60대</option>
          <option value="70">70대+</option>
        </select>
      </label>
      <label class="filter-label">
        레벨:
        <select v-model="initFilters.level" class="select-box">
          <option value="">전체</option>
          <option value="LV1">LV1</option>
          <option value="LV2">LV2</option>
          <option value="LV3">LV3</option>
        </select>
      </label>
      <label class="filter-label">
        운동 종목:
        <select v-model="initFilters.sportName" class="select-box">
          <option value="">전체</option>
          <option v-for="sport in sportTypes" :key="sport.sportId" :value="sport.sportName">
            {{ sport.sportName }}
          </option>
        </select>
      </label>
      <label class="filter-label">
        상태:
        <select v-model="initFilters.status" class="select-box">
          <option value="">전체</option>
          <option value="모집중">모집중</option>
          <option value="최소 모집 완료">최소 모집 완료</option>
          <option value="모집 완료">모집 완료</option>
          <option value="진행 완료">진행 완료</option>
        </select>
      </label>
      <label class="filter-label">
        조회 기간:
        <input type="date" v-model="initFilters.startDate" class="select-box date-input"> ~
        <input type="date" v-model="initFilters.endDate" class="select-box date-input">
      </label>
    </template>
  </AdminListTemplate>
</template>

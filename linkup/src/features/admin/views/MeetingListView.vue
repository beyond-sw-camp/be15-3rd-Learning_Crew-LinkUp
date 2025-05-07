<script setup>
import { ref } from 'vue'
import { fetchAdminMeetingList } from '@/api/admin.js'
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

// 운동 종목 더미 (실제 API 연동 시 대체 가능)
const sportTypes = ref([
  { sportId: 'TENNIS', sportName: '테니스' },
  { sportId: 'BOWLING', sportName: '볼링' },
  { sportId: 'SOCCER', sportName: '축구' }
])

// 컬럼 정의
const columns = [
  { key: 'meetingId', label: 'ID' },
  { key: 'meetingTitle', label: '제목' },
  { key: 'leaderName', label: '리더' },
  { key: 'sportName', label: '운동' },
  { key: 'date', label: '날짜' },
  {
    key: 'time',
    label: '시간',
    format: (_, row) => `${row.startTime} ~ ${row.endTime}`
  },
  { key: 'gender', label: '성별' },
  { key: 'ageGroup', label: '나이대' },
  { key: 'level', label: '레벨' },
  { key: 'placeName', label: '장소' },
  {
    key: 'users',
    label: '참여 인원',
    format: (_, row) => `${row.minUser} ~ ${row.maxUser}`
  },
  { key: 'statusLabel', label: '상태' },
  {
    key: 'view',
    label: '상세 보기',
    format: (_, row) => ({
      type: 'button',
      label: '보기',
      onClick: () => alert(`모임 상세 보기: ${row.meetingId}`)
      // TODO: openMeetingDetailModal(row.meetingId)
    })
  }
]

// API 연동
async function fetchMeetingList(params) {
  try {
    const res = await fetchAdminMeetingList(params)
    const list = res.data.meetings.map(m => ({
      meetingId: m.meetingId,
      meetingTitle: m.meetingTitle,
      leaderName: m.leaderNickname,
      sportName: m.sportName,
      date: m.date,
      startTime: m.startTime.slice(0, 5),
      endTime: m.endTime.slice(0, 5),
      gender: m.gender,
      ageGroup: m.ageGroup,
      level: m.level,
      placeName: m.placeName,
      customPlaceAddress: m.customPlaceAddress,
      minUser: m.minUser,
      maxUser: m.maxUser,
      statusLabel: m.statusName
    }))

    return {
      data: list,
      totalPages: res.data.pagination?.totalPage || 1
    }
  } catch (e) {
    console.error('🚨 모임 목록 조회 실패:', e)
    return { data: [], totalPages: 1 }
  }
}
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
          <option value="BOTH">혼성</option>
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
          <option
            v-for="sport in sportTypes"
            :key="sport.sportId"
            :value="sport.sportName"
          >
            {{ sport.sportName }}
          </option>
        </select>
      </label>

      <label class="filter-label">
        상태:
        <select v-model="initFilters.status" class="select-box">
          <option value="">전체</option>
          <option value="PENDING">모집중</option>
          <option value="ACCEPTED">최소 모집 완료</option>
          <option value="REJECTED">모집 완료</option>
          <option value="DONE">진행 완료</option>
        </select>
      </label>

      <label class="filter-label">
        조회 기간:
        <input type="date" v-model="initFilters.startDate" class="select-box date-input" />
        ~
        <input type="date" v-model="initFilters.endDate" class="select-box date-input" />
      </label>
    </template>
  </AdminListTemplate>
</template>

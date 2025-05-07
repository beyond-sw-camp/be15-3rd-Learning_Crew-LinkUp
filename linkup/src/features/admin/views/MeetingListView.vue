<script setup>
import { ref, reactive } from 'vue'
import { fetchMeetingList } from '@/api/admin.js'  // Adjusted to call fetchMeetingList API
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'

const props = defineProps({ pageTitle: String })

const filters = reactive({
  meetingGender: 'BOTH',
  ageGroups: '',
  levels: '',
  sportIds: '',
  statusIds: '',
  minDate: '',
  maxDate: ''
})

const sportTypes = ref([
  { id: '1', name: '기타 운동' },
  { id: '2', name: '축구' },
  { id: '3', name: '테니스' },
  { id: '4', name: '볼링' },
  { id: '5', name: '탁구' },
  { id: '6', name: '농구' },
  { id: '7', name: '골프' },
  { id: '8', name: '배드민턴' }
])

const statusOptions = ref([
  { id: 1, label: '모집중' },
  { id: 2, label: '최소 모집 완료' },
  { id: 3, label: '모집 완료' },
  { id: 4, label: '진행 완료' },
  { id: 5, label: '종료' }
])

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
    format: (_, row) => ({
      type: 'button',
      label: '보기',
      onClick: () => alert(`모임 상세 보기: ${row.meetingId}`)
    })
  }
]

const fetchAdminMeetingList = async ({ page }) => {
  try {
    const res = await fetchMeetingList({
      page,
      gender: filters.meetingGender || 'BOTH',
      ageGroups: filters.ageGroups.length ? filters.ageGroups : ['10', '20', '30', '40', '50', '60', '70+'],
      levels: filters.levels.length ? filters.levels : ['LV1', 'LV2', 'LV3'],
      sportIds: filters.sportIds.length ? filters.sportIds : [1, 2, 3, 4, 5, 6, 7, 8],
      statusIds: filters.statusIds.length ? filters.statusIds : [1, 2, 3, 4, 5],
      minDate: filters.minDate || null,
      maxDate: filters.maxDate || null
    })

    const meetings = res.data?.data?.meetings || []
    const pagination = res.data?.pagination || {}

    const list = meetings.map(m => ({
      meetingId: m.meetingId,
      meetingTitle: m.meetingTitle,
      leaderName: m.leaderNickname,
      sportName: m.sportName,
      date: m.date,
      startTime: m.startTime?.slice(0, 5),
      endTime: m.endTime?.slice(0, 5),
      gender: m.gender,
      ageGroup: m.ageGroup,
      level: m.level,
      placeName: m.placeName,
      customPlaceAddress: m.customPlaceAddress,
      minUser: m.minUser,
      maxUser: m.maxUser,
      statusLabel: m.statusName
    }))
    console.log("응답 데이터:", res)  // 응답 데이터 확인

    return {
      data: list,
      totalPages: pagination.totalPage || 1
    }
  } catch (e) {
    console.error('Error fetching meeting list:', e)
    return { data: [], totalPages: 1 }
  }
}
</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchAdminMeetingList"
    :columns="columns"
    :initFilters="filters"
    :pageTitle="props.pageTitle"
  >
    <template #filters="{ filters }">
      <label class="filter-label">성별:
        <select v-model="filters.meetingGender" class="select-box">
          <option value="BOTH">전체</option>
          <option value="MALE">남성</option>
          <option value="FEMALE">여성</option>
        </select>
      </label>

      <label class="filter-label">나이대:
        <select v-model="filters.ageGroups" class="select-box">
          <option value="">전체</option>
          <option value="10">10대</option>
          <option value="20">20대</option>
          <option value="30">30대</option>
          <option value="40">40대</option>
          <option value="50">50대</option>
          <option value="60">60대</option>
          <option value="70+">70대+</option>
        </select>
      </label>

      <label class="filter-label">레벨:
        <select v-model="filters.levels" class="select-box">
          <option value="">전체</option>
          <option value="LV1">LV1</option>
          <option value="LV2">LV2</option>
          <option value="LV3">LV3</option>
        </select>
      </label>

      <label class="filter-label">운동 종목:
        <select v-model="filters.sportIds" class="select-box">
          <option value="">전체</option>
          <option v-for="sport in sportTypes" :key="sport.id" :value="sport.id">
            {{ sport.name }}
          </option>
        </select>
      </label>

      <label class="filter-label">상태:
        <select v-model="filters.statusIds" class="select-box">
          <option value="">전체</option>
          <option v-for="s in statusOptions" :key="s.id" :value="s.id">{{ s.label }}</option>
        </select>
      </label>

      <label class="filter-label">조회 기간:
        <input type="date" v-model="filters.minDate" class="select-box date-input" /> ~
        <input type="date" v-model="filters.maxDate" class="select-box date-input" />
      </label>
    </template>
  </AdminListTemplate>
</template>

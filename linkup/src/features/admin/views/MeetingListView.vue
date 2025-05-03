<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from '@/features/admin/components/AdminFilter.vue'
import AdminTable from '@/features/admin/components/AdminTable.vue'
import Pagination from '@/features/admin/components/Pagination.vue'
import { fetchMeetingList, fetchSportTypes } from '@/api/admin.js'
import '@/assets/css/admin-styles.css'

const props = defineProps({ pageTitle: String })

const filters = ref({
  gender: '',
  ageGroup: '',
  level: '',
  sportId: '',
  status: '',
  startDate: '',
  endDate: ''
})

const requests = ref([])
const page = ref(1)
const totalPages = ref(1)
const loading = ref(false)
const error = ref(null)
const sportTypes = ref([])

const mapStatusLabelToEnum = (label) => {
  switch (label) {
    case '모집중': return 'PENDING'
    case '최소 모집 완료': return 'ACCEPTED'
    case '모집 완료': return 'REJECTED'
    case '진행 완료': return 'DONE'
    default: return ''
  }
}

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const { data } = await fetchMeetingList({
      ...filters.value,
      status: mapStatusLabelToEnum(filters.value.status),
      page: page.value
    })
    requests.value = data.data
    totalPages.value = data.totalPages || 1
  } catch (e) {
    error.value = '모임 정보를 불러오는 데 실패했습니다.'
    requests.value = []
  } finally {
    loading.value = false
  }
}

const fetchSports = async () => {
  try {
    const { data } = await fetchSportTypes()
    sportTypes.value = data
  } catch (e) {
    console.error('운동 종목 목록 로드 실패', e)
  }
}

const onSearch = () => {
  page.value = 1
  fetchData()
}

const changePage = (p) => {
  page.value = p
  fetchData()
}

onMounted(async () => {
  await fetchSports()
  await fetchData()
})
</script>

<template>
  <AdminFilter @search="onSearch" :title="pageTitle">
    <label class="filter-label">
      성별:
      <select v-model="filters.gender" class="select-box">
        <option value="">전체</option>
        <option value="M">남성</option>
        <option value="F">여성</option>
      </select>
    </label>
    <label class="filter-label">
      나이대:
      <select v-model="filters.ageGroup" class="select-box">
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
      <select v-model="filters.level" class="select-box">
        <option value="">전체</option>
        <option value="LV1">LV1</option>
        <option value="LV2">LV2</option>
        <option value="LV3">LV3</option>
      </select>
    </label>
    <label class="filter-label">
      운동 종목:
      <select v-model="filters.sportId" class="select-box">
        <option value="">전체</option>
        <option v-for="sport in sportTypes" :key="sport.sportId" :value="sport.sportId">
          {{ sport.sportName }}
        </option>
      </select>
    </label>
    <label class="filter-label">
      상태:
      <select v-model="filters.status" class="select-box">
        <option value="">전체</option>
        <option value="모집중">모집중</option>
        <option value="최소 모집 완료">최소 모집 완료</option>
        <option value="모집 완료">모집 완료</option>
        <option value="진행 완료">진행 완료</option>
      </select>
    </label>
    <label class="filter-label">
      조회 기간:
      <input type="date" v-model="filters.startDate" class="select-box date-input"> ~
      <input type="date" v-model="filters.endDate" class="select-box date-input">
    </label>
  </AdminFilter>

  <div v-if="loading">로딩 중...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="requests.length === 0">불러올 데이터가 없습니다.</div>

  <div v-else>
    <AdminTable>
      <template #thead>
        <tr>
          <th>ID</th>
          <th>제목</th>
          <th>리더</th>
          <th>운동</th>
          <th>날짜</th>
          <th>시간</th>
          <th>성별</th>
          <th>나이대</th>
          <th>레벨</th>
          <th>장소명</th>
          <th>참여 인원</th>
          <th>상태</th>
          <th>상세 보기</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="req in requests" :key="req.meetingId">
          <td>{{ req.meetingId }}</td>
          <td>{{ req.meetingTitle }}</td>
          <td>{{ req.leaderName }}</td>
          <td>{{ req.sportName }}</td>
          <td>{{ req.date }}</td>
          <td>{{ req.startTime }} ~ {{ req.endTime }}</td>
          <td>{{ req.gender }}</td>
          <td>{{ req.ageGroup }}</td>
          <td>{{ req.level }}</td>
          <td>{{ req.placeName || req.customPlaceAddress || '-' }}</td>
          <td>{{ req.minUser }} ~ {{ req.maxUser }}</td>
          <td>{{ req.statusLabel }}</td>
          <td><a href="#">보기</a></td>
        </tr>
      </template>
    </AdminTable>

    <Pagination :current-page="page" :total-pages="totalPages" @update:page="changePage" />
  </div>
</template>

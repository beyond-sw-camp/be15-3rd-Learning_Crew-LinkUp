<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from '@/features/admin/components/AdminFilter.vue'
import AdminTable from '@/features/admin/components/AdminTable.vue'
import Pagination from '@/features/admin/components/Pagination.vue'
import { fetchPlaceList, fetchSportTypes } from '@/api/admin.js'
import '@/assets/css/admin-styles.css'

const props = defineProps({ pageTitle: String })

const filters = ref({
  sportId: '',
  ownerId: '',
  isActive: ''
})

const places = ref([])
const page = ref(1)
const totalPages = ref(1)
const loading = ref(false)
const error = ref(null)
const sportTypes = ref([])

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const { data } = await fetchPlaceList({
      ...filters.value,
      page: page.value
    })
    places.value = data.data
    totalPages.value = data.totalPages || 1
  } catch (e) {
    error.value = '장소 정보를 불러오는 데 실패했습니다.'
    places.value = []
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
  <main>
    <AdminFilter @search="onSearch" :title="pageTitle">
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
        사업자 ID:
        <input type="text" v-model="filters.ownerId" class="select-box id-input" placeholder="ID" />
      </label>
      <label class="filter-label">
        활성화 상태:
        <select v-model="filters.isActive" class="select-box">
          <option value="">전체</option>
          <option value="Y">활성화</option>
          <option value="N">비활성화</option>
        </select>
      </label>
    </AdminFilter>

    <section v-if="loading">로딩 중...</section>
    <section v-else-if="error">{{ error }}</section>
    <section v-else-if="places.length === 0">불러올 데이터가 없습니다.</section>

    <section v-else>
      <AdminTable>
        <template #thead>
          <tr>
            <th>장소 ID</th>
            <th>장소 이름</th>
            <th>주소</th>
            <th>사업자 ID</th>
            <th>사업자 이름</th>
            <th>운동 종목</th>
            <th>평점</th>
            <th>활성화</th>
            <th>상세 보기</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="place in places" :key="place.placeId">
            <td>{{ place.placeId }}</td>
            <td>{{ place.placeName }}</td>
            <td>{{ place.address }}</td>
            <td>{{ place.ownerId }}</td>
            <td>{{ place.ownerName }}</td>
            <td>{{ place.sportName }}</td>
            <td>{{ place.rating }}</td>
            <td>{{ place.isActive === 'Y' ? '공개' : '비공개' }}</td>
            <td><a href="#">보기</a></td>
          </tr>
        </template>
      </AdminTable>

      <Pagination :current-page="page" :total-pages="totalPages" @update:page="changePage" />
    </section>
  </main>
</template>


<script setup>
import { reactive, watch, computed } from 'vue'
import SearchRegionDropdown from './SearchRegionDropdown.vue'
import SearchSportIcons from './SearchSportIcons.vue'

const props = defineProps({
  filters: Object,
  regionOptions: Array
})
const emit = defineEmits(['update:filters'])

const localFilters = reactive({ ...props.filters })

watch(() => props.filters, (newVal) => {
  Object.assign(localFilters, newVal)
})

function applyFilter() {
  emit('update:filters', { ...localFilters })
}
</script>

<template>
  <div class="filter-dropdown-panel">

    <div class="filter-title">
      <img src="@/assets/icons/meeting_and_place/sidebar-gear.svg" alt="상세 필터" width="20" height="20" />
      상세 조건 필터
    </div>

    <!-- 운동 종목 -->
    <div class="filter-group">

      <div class="filter-label">운동 종목</div>
      <div class="filter-chip-group">
        <button
          v-for="sport in ['풋살', '테니스', '탁구', '농구', '배드민턴', '기타']"
          :key="sport"
          class="filter-chip"
          :class="{ active: filters.sportType === sport }"
          @click="filters.sportType = sport"
        >
          {{ sport }}
        </button>
      </div>
    </div>

    <!-- 지역 -->
    <div class="filter-group">
      <label class="filter-label">지역</label>
      <SearchRegionDropdown v-model="localFilters.regionCode" :regions="regionOptions" />
    </div>

    <!-- 성별 -->
    <div class="filter-group">
      <label class="filter-label">성별</label>
      <div class="filter-chip-group">
        <button v-for="g in ['전체', '남성', '여성']" :key="g"
                :class="{ active: localFilters.gender === g }"
                class="filter-chip"
                @click="localFilters.gender = g">{{ g }}</button>
      </div>
    </div>

    <!-- 나이대 -->
    <div class="filter-group">
      <label class="filter-label">나이대</label>
      <div class="filter-chip-group">
        <button v-for="age in ['전체','10대','20대','30대','40대','50대','60대','70대+']"
                :key="age"
                :class="{ active: localFilters.ageGroup === age }"
                class="filter-chip"
                @click="localFilters.ageGroup = age">{{ age }}</button>
      </div>
    </div>

    <!-- 상태 -->
    <div class="filter-group">
      <label class="filter-label">상태</label>
      <div class="filter-chip-group">
        <button v-for="status in ['전체','모집중','최소 모집완료','모집완료','진행 완료']"
                :key="status"
                :class="{ active: localFilters.status === status }"
                class="filter-chip"
                @click="localFilters.status = status">{{ status }}</button>
      </div>
    </div>

    <!-- 날짜 -->
    <div class="filter-group">
      <label class="filter-label">날짜</label>
      <div class="meeting-filter-date">
        <input type="date" v-model="localFilters.startDate" />
        <span> ~ </span>
        <input type="date" v-model="localFilters.endDate" />
      </div>
    </div>

    <button class="filter-search-btn" @click="applyFilter">검색</button>
  </div>
</template>

<style scoped>

</style>

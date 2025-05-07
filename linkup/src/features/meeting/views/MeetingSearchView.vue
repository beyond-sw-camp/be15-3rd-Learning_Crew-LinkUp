<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import SearchSportIcons from '@/features/meeting/components/SearchSportIcons.vue'
import MapDisplay from '@/components/common/MapDisplay.vue'
import FilterDropdown from '@/features/meeting/components/FilterDropdown.vue'
import FloatingNav from '@/features/meeting/components/FloatingNav.vue'
import MeetingCard from '@/features/meeting/components/MeetingCard.vue'
import CreateMeetingModal from '@/features/meeting/views/CreateMeetingModal.vue';

import '@/assets/css/search-common.css'
import { useRouter } from 'vue-router';
import CreatedMeetingsModal from '@/features/meeting/views/CreatedMeetingsModal.vue';
import ParticipatingMeetingsModal from '@/features/meeting/views/ParticipatingMeetingsModal.vue';
import PendingMeetingsModal from '@/features/meeting/views/PendingMeetingsModal.vue';
import InterestedMeetingsModal from '@/features/meeting/views/InterestedMeetingsModal.vue';
import MeetingManageModal from '@/features/meeting/views/MeetingManageModal.vue';
import ParticipantsModal from '@/features/meeting/views/ParticipantsModal.vue';
import api from '@/api/axios.js';

const router = useRouter();

const showModal = reactive({
  create: false,
  created: false,
  participated: false,
  manage: false,
  participants: false,
  pending: false,
  interested: false
});


// 지역/운동 필터 데이터
const regionOptions = [
  { name: '서울특별시', code: 'seoul', children: [{ name: '강남구', code: 'gangnam' }, { name: '서초구', code: 'seocho' }, { name: '마포구', code: 'mapo' }] },
  { name: '경기도', code: 'gyeonggi', children: [{ name: '성남시', code: 'seongnam' }, { name: '수원시', code: 'suwon' }, { name: '고양시', code: 'goyang' }] }
]

const sportsList = [
  { type: 'football', label: '풋살', src: '@/assets/icons/sports/football.svg' },
  { type: 'tennis', label: '테니스', src: '@/assets/icons/sports/tennis.svg' },
  { type: 'basketball', label: '농구', src: '@/assets/icons/sports/basketball.svg' }
]

// 상태 관리
const selectedSport = ref('')
const meetings = ref([])
const isFloatingMinimized = ref(false)

const filters = reactive({
  sportType: '',
  regionCode: '',
  gender: '전체',
  ageGroup: '전체',
  skillLevel: '전체',
  status: '전체',
  startDate: '',
  endDate: ''
})

// 드롭다운 위치 관련
const filterDropdownOpen = ref(false)
const filterWrap = ref(null)
const dropdownStyle = ref({})

// 모임 리스트 더미 데이터


// const dummyMeetings = [
//   { id: 1, title: '강남 주말 풋살 모임', address: '서울 강남구 역삼동 123', status: '모집중', createdAt: '2025-05-01T10:00:00Z', thumbnailUrl: '' },
//   { id: 2, title: '서초구 평일 테니스', address: '서울 서초구 반포동 456', status: '모집완료', createdAt: '2025-04-28T14:30:00Z', thumbnailUrl: '' }
// ]

onMounted(() => {
  loadMeetings()
})

// function loadMeetings() {
//   meetings.value = dummyMeetings
// }
async function loadMeetings() {
  try {
    const resp = await api.get('/common-service/meetings');
    meetings.value = resp.data.data.meetings;
  } catch (error) {
    console.error('모임 데이터를 불러오는 중 오류 발생:', error);
  }
}

function onFilterApply(newFilters) {
  Object.assign(filters, newFilters)
  filterDropdownOpen.value = false
  loadMeetings()
}

function goToMeetingDetail(meetingId) {
  router.push(`/meetings/${meetingId}`);
}

function handleNavigate(action) {
  switch (action) {
    case 'myMeetings': console.log('내 모임 보기'); break
    case 'create': showModal.create = true; break
    case 'created': showModal.created = true; break
    case 'participated': showModal.participated = true; break
    case 'liked': showModal.interested = true; break
    case 'pending': showModal.pending = true; break
    // case 'createMeeting': console.warn('createMeeting 기능은 아직 구현되지 않았습니다.'); break
    case 'admin': console.warn('admin 기능은 아직 구현되지 않았습니다.'); break
    default: console.error(`알 수 없는 액션: ${action}`)
  }
}


function handleCreateModal(type) {
  if (type === 'reserved') {
    router.push('/places');
  }
  if (type === 'map') {
    // router.push('/meetings/create/custom');
    alert('준비중입니다');
  }
  showModal.create = false;
}

const selectedMeeting = ref(null);
function handleCreatedModal(meeting) {
  selectedMeeting.value = meeting;
  showModal.manage = true;
}

function handleManageModal() {
  showModal.manage = false;
}

function handleParticipatedModal(meeting) {
  selectedMeeting.value = meeting;
  showModal.participants = true;
}

function handleParticipantsModal() {
  showModal.participants = false;
}

function handlePendingModal() {

  showModal.participants = false;
}

function handleInterestedModal() {

  showModal.interested = false;
}

function toggleFilterDropdown() {
  filterDropdownOpen.value = !filterDropdownOpen.value
  if (filterDropdownOpen.value) {
    nextTick(() => {
      const btn = filterWrap.value?.querySelector('.filter-chip-button')
      if (btn) {
        dropdownStyle.value = {
          position: 'absolute',
          top: `${btn.offsetTop + btn.offsetHeight + 16}px`,
          left: `${btn.offsetLeft}px`,
          zIndex: 1000
        }
      }
    })
  }
}
</script>

<template>
  <div class="container">
    <!-- 사이드바 -->
    <div class="sidebar">
      <div class="filter-toggle-wrap" ref="filterWrap">
        <SearchSportIcons :sports="sportsList" v-model:selected="selectedSport" />

        <button class="filter-chip-button" @click="toggleFilterDropdown">
          <img src="@/assets/icons/meeting_and_place/filter.svg" alt="필터" width="16" height="16" />
          필터
        </button>

      </div>
        <div v-show="filterDropdownOpen" class="filter-dropdown-panel-num" :style="dropdownStyle">
          <FilterDropdown
            :filters="filters"
            :region-options="regionOptions"
            @update:filters="onFilterApply"
          />
        </div>

      <!-- 모임 카드 리스트 -->
      <MeetingCard v-for="meeting in meetings" :key="meeting.id" :meeting="meeting" @click="goToMeetingDetail" />
    </div>

    <!-- 지도 -->
    <div class="map-section">
      <MapDisplay :items="meetings" mapType="meeting" />
    </div>

    <!-- 플로팅 네비게이션 -->
    <FloatingNav
      :minimized="isFloatingMinimized"
      @toggle="isFloatingMinimized = !isFloatingMinimized"
      @navigate="handleNavigate"
    />
  </div>

    <!-- 모임 개설 모달 -->
    <CreateMeetingModal v-if="showModal.create" @close="showModal.create = false" @select="handleCreateModal"/>
    <!-- 개설한 모임 모달 -->
    <CreatedMeetingsModal v-if="showModal.created" @close="showModal.created = false" @select="handleCreatedModal" />
    <!-- 개설 모임 관리 모달 -->
    <MeetingManageModal :visible="showModal.manage" :meeting="selectedMeeting" @close="showModal.manage = false" @select="handleManageModal" />
    <!-- 참가한 모임 모달 -->
    <ParticipatingMeetingsModal v-if="showModal.participated" @close="showModal.participated = false" @select="handleParticipatedModal" />
    <!-- 참가자 목록 조회 모달 -->
    <ParticipantsModal :visible="showModal.participants" :meeting="selectedMeeting" @close="showModal.participants = false" @select="handleParticipantsModal"/>
    <!-- 참가 신청한 모임 모달 -->
    <PendingMeetingsModal v-if="showModal.pending" @close="showModal.pending = false" @select="handlePendingModal" />
    <!-- 찜한 모임 모달 -->
    <InterestedMeetingsModal v-if="showModal.interested" @close="showModal.interested = false" @select="handleInterestedModal" />

</template>


<style scoped>
.sidebar {
  width: 500px;
}

.container {
  display: flex;
  flex-direction: row;
}
</style>

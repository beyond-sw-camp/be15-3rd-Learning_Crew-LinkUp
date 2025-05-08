<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

import SearchSportIcons from '@/features/meeting/components/SearchSportIcons.vue';
import FilterDropdown from '@/features/meeting/components/FilterDropdown.vue';
import FloatingNav from '@/features/meeting/components/FloatingNav.vue';
import MeetingCard from '@/features/meeting/components/MeetingCard.vue';
import CreateMeetingModal from '@/features/meeting/views/CreateMeetingModal.vue';
import CreatedMeetingsModal from '@/features/meeting/views/CreatedMeetingsModal.vue';
import ParticipatingMeetingsModal from '@/features/meeting/views/ParticipatingMeetingsModal.vue';
import PendingMeetingsModal from '@/features/meeting/views/PendingMeetingsModal.vue';
import InterestedMeetingsModal from '@/features/meeting/views/InterestedMeetingsModal.vue';
import MeetingManageModal from '@/features/meeting/views/MeetingManageModal.vue';
import ParticipantsModal from '@/features/meeting/views/ParticipantsModal.vue';
import PlaceMap from '@/features/place/components/PlaceMap.vue'; // ✅ 새로 추가된 부분

// import '@/assets/css/search-common.css';
import { fetchMeetingList, getAllMeetings } from '@/api/meeting.js';

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

const allMeetings = ref([]);

const fetchAllMeetings = async () => {
  try {
    const res = await getAllMeetings();
    allMeetings.value = res;
  } catch (error) {
    console.error('전체 모임 목록 불러오기 실패', error);
  }
};

onMounted(() => {
  fetchAllMeetings();
  loadMeetings(true);
});

function resetModals() {
  Object.keys(showModal).forEach(key => {
    showModal[key] = false;
  });
}

const regionOptions = [
  { name: '서울특별시', code: 'seoul', children: [{ name: '강남구', code: 'gangnam' }, { name: '서초구', code: 'seocho' }, { name: '마포구', code: 'mapo' }] },
  { name: '경기도', code: 'gyeonggi', children: [{ name: '성남시', code: 'seongnam' }, { name: '수원시', code: 'suwon' }, { name: '고양시', code: 'goyang' }] }
];

const sportsList = [
  { type: 'football', label: '풋살', src: '@/assets/icons/sports/football.svg' },
  { type: 'tennis', label: '테니스', src: '@/assets/icons/sports/tennis.svg' },
  { type: 'basketball', label: '농구', src: '@/assets/icons/sports/basketball.svg' }
];

const selectedSport = ref('');
const meetings = ref([]);
const isFloatingMinimized = ref(true);

const filters = reactive({
  sportType: '',
  regionCode: '',
  gender: '전체',
  ageGroup: '전체',
  skillLevel: '전체',
  status: '전체',
  startDate: '',
  endDate: ''
});

const filterDropdownOpen = ref(false);
const filterWrap = ref(null);
const dropdownStyle = ref({});

function sanitizeFilters(filters) {
  const cleaned = {};
  for (const key in filters) {
    const value = filters[key];
    cleaned[key] = value === '전체' ? null : value;
  }
  return cleaned;
}

async function loadMeetings(isInitial = false) {
  try {
    const filterParams = isInitial ? {} : sanitizeFilters(filters);
    meetings.value = await fetchMeetingList(filterParams);

    console.log('[DEBUG] 불러온 meetings 개수:', meetings.value.length);
    console.log('[DEBUG] meetings 내용:', meetings.value);
  } catch (error) {
    console.error('모임 데이터를 불러오는 중 오류 발생:', error);
  }
}

function onFilterApply(newFilters) {
  Object.assign(filters, newFilters);
  filterDropdownOpen.value = false;
  loadMeetings();
}

function goToMeetingDetail(meeting) {
  const id = meeting.meetingId || meeting.id;
  router.push(`/meetings/${id}`);
}

function handleNavigate(action) {
  const map = {
    create: 'create',
    created: 'created',
    participated: 'participated',
    liked: 'interested',
    pending: 'pending',
  };

  if (Object.keys(map).includes(action)) {
    const key = map[action];
    const isAlreadyOpen = showModal[key];
    resetModals();
    showModal[key] = !isAlreadyOpen;
  } else if (action === 'myMeetings') {
    console.log('내 모임 보기');
  } else if (action === 'admin') {
    console.warn('admin 기능은 아직 구현되지 않았습니다.');
  } else {
    console.error(`알 수 없는 액션: ${action}`);
  }
}

function handleCreateModal(type) {
  if (type === 'reserved') {
    router.push('/places');
  }
  if (type === 'map') {
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
  showModal.pending = false;
}
function handleInterestedModal() {
  showModal.interested = false;
}

function toggleFilterDropdown() {
  filterDropdownOpen.value = !filterDropdownOpen.value;
  if (filterDropdownOpen.value) {
    nextTick(() => {
      const btn = filterWrap.value?.querySelector('.filter-chip-button');
      if (btn) {
        dropdownStyle.value = {
          position: 'absolute',
          top: `${btn.offsetTop + btn.offsetHeight + 16}px`,
          left: `${btn.offsetLeft}px`,
          zIndex: 1000
        };
      }
    });
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

      <div class="all-meeting-list">
        <h4>전체 모임</h4>
        <ul>
          <li
            v-for="meeting in allMeetings"
            :key="meeting.meetingId"
            style="margin: 4px 0; font-size: 14px;"
            @click="goToMeetingDetail(meeting)"
          >
            {{ meeting.title }}
          </li>
        </ul>
      </div>

      <MeetingCard
        v-for="meeting in meetings"
        :key="meeting.id"
        :meeting="meeting"
        @click="goToMeetingDetail(meeting)"
      />
    </div>

    <!-- 지도 영역 -->
    <div class="map-section">
      <PlaceMap :places="meetings" @select="goToMeetingDetail" />
    </div>

    <!-- 플로팅 네비게이션 -->
    <FloatingNav
      :minimized="isFloatingMinimized"
      @toggle="isFloatingMinimized = !isFloatingMinimized"
      @navigate="handleNavigate"
    />
  </div>

  <!-- 모달들 -->
  <CreateMeetingModal v-if="showModal.create" @close="showModal.create = false" @select="handleCreateModal" />
  <CreatedMeetingsModal v-if="showModal.created" @close="showModal.created = false" @select="handleCreatedModal" />
  <MeetingManageModal :visible="showModal.manage" :meeting="selectedMeeting" @close="showModal.manage = false" @select="handleManageModal" />
  <ParticipatingMeetingsModal v-if="showModal.participated" @close="showModal.participated = false" @select="handleParticipatedModal" />
  <ParticipantsModal :visible="showModal.participants" :meeting="selectedMeeting" @close="showModal.participants = false" @select="handleParticipantsModal" />
  <PendingMeetingsModal v-if="showModal.pending" @close="showModal.pending = false" @select="handlePendingModal" />
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
.map-section {
  flex: 1;
  height: 100vh;
}
</style>

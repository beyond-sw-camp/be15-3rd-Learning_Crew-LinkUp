<script setup>
const props = defineProps({
  minimized: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['toggle', 'navigate'])

function handleNavigate(type) {
  emit('navigate', type)
}
</script>

<template>
  <div :class="['floating-nav', { min: minimized }]">
    <!-- 축소 상태 -->
    <template v-if="minimized">
      <button class="nav-btn" @click="emit('toggle')" title="펼치기">
        <img src="@/assets/icons/meeting_and_place/sidebar-gear.svg" alt="펼치기" width="20" height="20" />
      </button>
    </template>

    <!-- 확장 상태 -->
    <template v-else>
      <!-- 상단: 모임 개설 -->
      <div class="nav-section">
        <button class="nav-btn" @click="handleNavigate('create')" title="모임 개설">
          <img src="../../../assets/icons/meeting_and_place/sidebar-create_meeting.svg" alt="모임 개설" width="24" height="24" />
        </button>
      </div>

      <hr />

      <!-- 중단: 관리 -->
      <div class="nav-section">
        <button class="nav-btn" @click="handleNavigate('created')" title="개설 모임 관리">
          <img src="@/assets/icons/meeting_and_place/sidebar-created_meetings.svg" alt="개설 모임" width="24" height="24" />
        </button>

        <button class="nav-btn" @click="handleNavigate('participated')" title="참가 모임 관리">
          <img src="@/assets/icons/meeting_and_place/sidebar-participated_meetings.svg" alt="참가 모임" width="24" height="24" />
        </button>

        <button class="nav-btn" @click="handleNavigate('pending')" title="참가 신청한 모임 조회">
          <img src="@/assets/icons/meeting_and_place/sidebar-pending_meetings.svg" alt="참가 신청 모임" width="24" height="24" />
        </button>

        <button class="nav-btn" @click="handleNavigate('liked')" title="찜한 모임">
          <img src="@/assets/icons/meeting_and_place/heart.svg" alt="찜한 모임" width="24" height="24" />
        </button>
      </div>

      <hr />

      <!-- 하단: 축소 -->
      <div class="nav-section">
        <button class="nav-btn" @click="emit('toggle')" title="접기">
          <img src="@/assets/icons/meeting_and_place/sidebar-gear.svg" alt="접기" width="20" height="20" />
        </button>
      </div>
    </template>
  </div>
</template>

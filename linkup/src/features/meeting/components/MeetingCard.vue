<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  meeting: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

function handleClick() {
  emit('click', props.meeting.id)
}

const defaultImg = 'https://cdn.pixabay.com/photo/2019/03/10/14/04/table-tennis-4046278_640.jpg'

function formatDate(iso) {
  const date = new Date(iso)
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }
  return date.toLocaleDateString('ko-KR', options)
}
</script>

<template>
  <article class="meeting-card" @click="handleClick">
    <!-- 썸네일 이미지 -->
    <figure class="meeting-img-wrapper">
      <img
        class="meeting-img"
        :src="meeting.thumbnailUrl || defaultImg"
        alt="모임 이미지"
      />
    </figure>

    <!-- 본문 정보 -->
    <section class="meeting-info">
      <header class="meeting-meta">
        <p class="date">
          <img src="@/assets/icons/meeting_and_place/date.svg" alt="달력" class="search-icon" />
          {{ formatDate(meeting.date) }}
        </p>
        <button class="bookmark" aria-label="찜하기">
          <img src="@/assets/icons/community/empty_heart.svg" alt="찜" class="search-icon" />
        </button>
      </header>


      <h3 class="title">{{ meeting.meetingTitle }}</h3>

      <p class="location">
        <img src="@/assets/icons/meeting_and_place/place.svg" alt="주소" class="search-icon" />
        {{ meeting.placeAddress }}
      </p>

      <p class="likes">
        <img src="@/assets/icons/meeting_and_place/heart.svg" alt="찜인원" class="search-icon" />
        {{ meeting.interestedCount || 0 }}명 찜
      </p>

      <p class="price" v-if="meeting.price !== undefined">
        <span class="material-symbols-outlined card">attach_money</span>
        <strong>{{ meeting.participationFee.toLocaleString() }}원</strong>
      </p>
    </section>
  </article>
</template>

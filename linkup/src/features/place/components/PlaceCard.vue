<script setup>
const props = defineProps({
  place: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      address: '',
      pricePerHour: 0,
      rating: 0,
      isBookmarked: false,
      thumbnailUrl: ''
    })
  }
})

const fallbackImage = 'https://via.placeholder.com/400x200?text=이미지+없음'

function formatPrice(value) {
  return new Intl.NumberFormat('ko-KR').format(value) + '원'
}
</script>


<template>
  <div class="place-card">
    <img :src="place.thumbnailUrl || fallbackImage" alt="장소 이미지" class="meeting-img" />
    <div class="place-info">
      <div class="place-title-row">
        <h3>{{ place.name }}</h3>
        <img src="@/assets/icons/meeting_and_place/heart.svg" alt="별점" class="search-icon" />
      </div>

      <p class="location">
        <img src="@/assets/icons/meeting_and_place/place.svg" alt="주소" class="search-icon" />
        {{ place.address }}
      </p>
      <p>
        <img src="@/assets/icons/meeting_and_place/dollar.svg" alt="가격" class="search-icon" />
        {{ formatPrice(place.pricePerHour) }}/시간
      </p>
      <div class="rating">
        <img src="@/assets/icons/meeting_and_place/heart.svg" alt="별점" class="search-icon" />
        {{ place.rating }}
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>

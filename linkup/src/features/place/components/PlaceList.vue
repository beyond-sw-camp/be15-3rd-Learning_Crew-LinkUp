<template>
  <div class="place-list">
    <PlaceCard
      v-for="(place, index) in places"
      :key="index"
      :image="place.image"
      :title="place.name"
      :address="place.address"
      :price="place.price"
      :rating="formatRating(place.reviewRating)"
      @click="$emit('select', place)"
    />
  </div>
</template>

<script setup>
import PlaceCard from './PlaceCard.vue';

defineProps({ places: Array });
defineEmits(['select']);

function formatRating(value) {
  const num = parseFloat(value);
  return isNaN(num) ? '0.0' : num.toFixed(1);
}
</script>

<style scoped>
.place-list {
  @apply flex flex-col gap-4 p-4 bg-white rounded-md shadow-sm h-full overflow-y-auto;
}
</style>

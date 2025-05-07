<template>
  <div class="place-list">
    <PlaceCard
      v-for="(place, index) in places"
      :key="index"
      :image="place.image"
      :title="place.name"
      :address="place.address"
      :price="place.price"
      :rating="place.reviewRating"
      :isFavorite="place.isFavorite"
      @click="$emit('select', place)"
      @toggle-favorite="$emit('toggle-favorite', place)"
    />
  </div>
</template>

<script setup>
import PlaceCard from './PlaceCard.vue';

defineProps({
  places: Array
});

defineEmits(['select', 'toggle-favorite']);
</script>

<style scoped>
.place-list {
  @apply flex flex-col gap-4 p-4 bg-white rounded-md shadow-sm h-full overflow-y-auto;
}
</style>

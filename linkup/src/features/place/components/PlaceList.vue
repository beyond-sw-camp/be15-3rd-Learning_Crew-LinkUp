<template>
  <div class="flex flex-col gap-4 w-full">
    <PlaceCard
      v-for="place in places"
      :key="place.placeId"
      :image="place.image"
      :title="place.name"
      :address="place.address"
      :price="place.price"
      :rating="place.reviewRating"
      :isFavorite="place.isFavorite"
      :showFavorite="showFavorite"
      @select="$emit('select', place)"
      @toggle-favorite="$emit('toggle-favorite', place)"
    />
  </div>
</template>

<script setup>
import PlaceCard from './PlaceCard.vue'

defineProps({
  places: Array,
  showFavorite: {
    type: Boolean,
    default: true
  }
});
</script>

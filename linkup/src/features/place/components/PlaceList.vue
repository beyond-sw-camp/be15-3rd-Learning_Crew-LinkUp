<!-- src/features/place/components/PlaceList.vue -->
<template>
  <div class="place-list">
    <PlaceCard
      v-for="(place, index) in places"
      :key="index"
      :image="place.image"
      :title="place.name"
      :address="place.address"
      :price="place.price"
      @click="$emit('select', place)"
    />
  </div>
</template>

<script setup>
import PlaceCard from './PlaceCard.vue';

defineProps({
  places: {
    type: Array,
    required: true
  }
});
defineEmits(['select']);
</script>

<style scoped>
.place-list {
  @apply flex flex-col gap-4 p-4 overflow-y-auto h-full;
}
</style>

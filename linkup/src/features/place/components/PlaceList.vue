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
defineProps({ places: Array });
defineEmits(['select']);
</script>

<style scoped>
.place-list {
  @apply flex flex-col gap-4 p-4 bg-white rounded-md shadow-sm h-full overflow-y-auto;
}
</style>